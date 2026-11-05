import type { Observation, Patient } from "fhir/r4";

import { formatBloodPressure } from "./blood-pressure";
import type {
  ConnectToServer,
  FhirServerConnection,
  ResourceLoader,
} from "./ports";

export const EXAMPLE_PATIENT = "assets/fhir/patient.json";
export const EXAMPLE_BLOOD_PRESSURE = "assets/fhir/blutdruck.json";

// Codes instead of texts, so every UI can choose its own wording and language.
export type ConnectionStatus =
  | "checking"
  | "not-configured"
  | "connecting"
  | "unreachable"
  | "saved"
  | "failed";

export interface VitalsState {
  readonly patient: Patient | null;
  readonly status: ConnectionStatus;
  readonly bloodPressure: string | null;
  readonly error: string | null;
}

export const INITIAL_STATE: VitalsState = {
  patient: null,
  status: "checking",
  bloodPressure: null,
  error: null,
};

// Patient first, because HAPI checks that Observation.subject points to an existing patient.
export async function seed(
  server: FhirServerConnection,
  patient: Patient,
  observation: Observation,
): Promise<void> {
  await server.save(patient);
  await server.save(observation);
}

// The whole demo flow without a UI framework. Angular, Vue and others only mirror its state.
export class VitalsSync {
  private state = INITIAL_STATE;
  private readonly listeners = new Set<(state: VitalsState) => void>();
  private readBaseUrl: (() => Promise<string | null>) | null = null;
  private baseUrl: string | null = null;
  private prepared = false;
  private running: Promise<void> | null = null;

  constructor(
    private readonly loader: ResourceLoader,
    private readonly connect: ConnectToServer,
  ) {}

  get current(): VitalsState {
    return this.state;
  }

  // Calls the listener now and after every change. Returns a function that ends the subscription.
  subscribe(listener: (state: VitalsState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  // Shows the example patient first, so the page is useful even without a server.
  start(readBaseUrl: () => Promise<string | null>): Promise<void> {
    this.readBaseUrl = readBaseUrl;
    return this.reconnect();
  }

  // A second call during a run returns the same run, because two parallel first PUTs can conflict on HAPI.
  reconnect(): Promise<void> {
    this.running ??= this.run().finally(() => (this.running = null));
    return this.running;
  }

  private async run(): Promise<void> {
    if (!this.prepared && !(await this.prepare())) {
      return;
    }
    await this.sync();
  }

  // Loads patient and server address. If that fails, the next reconnect() tries again.
  private async prepare(): Promise<boolean> {
    if (!this.readBaseUrl) {
      return false;
    }
    this.update({ status: "checking", error: null });
    try {
      this.update({
        patient: await this.loader.load<Patient>(EXAMPLE_PATIENT),
      });
      this.baseUrl = await this.readBaseUrl();
    } catch (error) {
      this.update({ status: "failed", error: errorMessage(error) });
      return false;
    }
    this.prepared = true;
    return true;
  }

  private async sync(): Promise<void> {
    const patient = this.state.patient;
    if (!patient) {
      return;
    }
    if (!this.baseUrl) {
      this.update({
        status: "not-configured",
        bloodPressure: null,
        error: null,
      });
      return;
    }
    this.update({ status: "connecting", bloodPressure: null, error: null });
    try {
      const server = this.connect(this.baseUrl);
      if (!(await server.isReachable())) {
        this.update({ status: "unreachable" });
        return;
      }
      const observation = await this.loader.load<Observation>(
        EXAMPLE_BLOOD_PRESSURE,
      );
      await seed(server, patient, observation);
      const saved = await server.read<Observation>(
        `Observation/${observation.id}`,
      );
      // Status and value change together, so a UI stays busy until the whole run has ended.
      this.update({
        status: "saved",
        bloodPressure: formatBloodPressure(saved),
      });
    } catch (error) {
      this.update({ status: "failed", error: errorMessage(error) });
    }
  }

  private update(change: Partial<VitalsState>): void {
    this.state = { ...this.state, ...change };
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// HTTP errors of Angular and fhirclient are not always Error instances, but they carry a message.
export function errorMessage(error: unknown): string {
  return error instanceof Object && "message" in error
    ? String(error.message)
    : String(error);
}

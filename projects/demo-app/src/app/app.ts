import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import type { Observation, Patient } from "fhir/r4";
import { FhirAssets, FhirServer } from "fhir-vitals";
import { firstValueFrom } from "rxjs";

interface AppConfig {
  fhirBaseUrl?: string | null;
}

// The only page of the demo: shows the example patient and syncs it with a FHIR server if one is configured.
@Component({
  selector: "app-root",
  templateUrl: "./app.html",
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly assets = inject(FhirAssets);
  private readonly server = inject(FhirServer);
  private fhirBaseUrl: string | null = null;

  protected readonly patient = signal<Patient | null>(null);
  protected readonly status = signal("wird geprüft …");
  protected readonly bloodPressure = signal("–");
  protected readonly connecting = signal(false);

  async ngOnInit(): Promise<void> {
    try {
      this.patient.set(
        await this.assets.load<Patient>("assets/fhir/patient.json"),
      );
      // Read at runtime, not at build time, so Docker can replace the file without a rebuild.
      const config = await firstValueFrom(
        this.http.get<AppConfig>("config.json", { cache: "no-store" }),
      );
      this.fhirBaseUrl = config.fhirBaseUrl || null;
    } catch (error) {
      this.status.set(errorMessage(error));
      return;
    }
    await this.connect();
  }

  protected async connect(): Promise<void> {
    // One run at a time, because two parallel first PUTs of the same id can conflict on HAPI.
    if (this.connecting()) {
      return;
    }
    this.connecting.set(true);
    this.bloodPressure.set("–");
    try {
      if (!this.fhirBaseUrl) {
        this.status.set("nicht konfiguriert");
        return;
      }
      this.status.set("wird verbunden …");
      this.server.connect(this.fhirBaseUrl);
      if (!(await this.server.isReachable())) {
        this.status.set("nicht erreichbar");
        return;
      }
      const patient = this.patient();
      if (!patient) {
        throw new Error("Patient aus den Assets fehlt");
      }
      const observation = await this.assets.load<Observation>(
        "assets/fhir/blutdruck.json",
      );
      await this.server.seed(patient, observation);
      this.status.set("verbunden, Patient und Blutdruck gespeichert");
      const saved = await this.server.read<Observation>(
        "Observation/blutdruck-01",
      );
      this.bloodPressure.set(formatBloodPressure(saved));
    } catch (error) {
      this.status.set(errorMessage(error));
    } finally {
      this.connecting.set(false);
    }
  }
}

// Builds "104/66 mm[Hg]" from the LOINC-coded components of the blood pressure panel.
function formatBloodPressure(observation: Observation): string {
  const quantity = (loinc: string) =>
    observation.component?.find((component) =>
      component.code.coding?.some((coding) => coding.code === loinc),
    )?.valueQuantity;
  const systolic = quantity("8480-6");
  const diastolic = quantity("8462-4");
  if (systolic?.value === undefined || diastolic?.value === undefined) {
    return "–";
  }
  return `${systolic.value}/${diastolic.value} ${systolic.code ?? ""}`.trim();
}

// HttpClient errors are not Error instances but still carry a message.
function errorMessage(error: unknown): string {
  return error instanceof Object && "message" in error
    ? String(error.message)
    : String(error);
}

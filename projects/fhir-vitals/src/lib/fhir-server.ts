import { Service } from "@angular/core";
import type {
  CapabilityStatement,
  FhirResource,
  Observation,
  Patient,
} from "fhir/r4";
import { FhirClient } from "fhirclient/browser";

// Optional connection to a FHIR server, kept apart so the app also runs without one.
@Service()
export class FhirServer {
  private client: FhirClient | null = null;

  connect(baseUrl: string): void {
    this.client = new FhirClient(baseUrl);
  }

  async isReachable(): Promise<boolean> {
    if (!this.client) {
      return false;
    }
    try {
      await this.client.fhirRequest<CapabilityStatement>("metadata");
      return true;
    } catch {
      return false;
    }
  }

  // PUT under the fixed id, so a second run updates instead of creating duplicates.
  save<T extends FhirResource>(resource: T): Promise<T> {
    return this.requireClient().update<T>(resource);
  }

  read<T extends FhirResource>(relativeUrl: string): Promise<T> {
    return this.requireClient().fhirRequest<T>(relativeUrl);
  }

  // Patient first, because HAPI checks that Observation.subject points to an existing patient.
  async seed(patient: Patient, observation: Observation): Promise<void> {
    await this.save(patient);
    await this.save(observation);
  }

  private requireClient(): FhirClient {
    if (!this.client) {
      throw new Error("Not connected, call connect() first");
    }
    return this.client;
  }
}

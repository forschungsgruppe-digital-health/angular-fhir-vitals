import type { CapabilityStatement, FhirResource } from "fhir/r4";
import type { ConnectToServer, FhirServerConnection } from "fhir-vitals/core";
import { FhirClient } from "fhirclient/browser";

// FHIR adapter for the server port, based on the SMART on FHIR client. Works in any UI framework.
export class FhirClientConnection implements FhirServerConnection {
  private readonly client: FhirClient;

  constructor(baseUrl: string) {
    this.client = new FhirClient(baseUrl);
  }

  async isReachable(): Promise<boolean> {
    try {
      await this.client.fhirRequest<CapabilityStatement>("metadata");
      return true;
    } catch {
      return false;
    }
  }

  // PUT under the fixed id, so a second run updates instead of creating duplicates.
  save<T extends FhirResource>(resource: T): Promise<T> {
    return this.client.update<T>(resource);
  }

  read<T extends FhirResource>(relativeUrl: string): Promise<T> {
    return this.client.fhirRequest<T>(relativeUrl);
  }
}

export const connectWithFhirClient: ConnectToServer = (baseUrl) =>
  new FhirClientConnection(baseUrl);

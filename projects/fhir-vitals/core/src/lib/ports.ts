import type { FhirResource } from "fhir/r4";

// Port for FHIR resources in static files. Angular implements it with HttpClient, other UIs with fetch.
export interface ResourceLoader {
  load<T extends FhirResource>(path: string): Promise<T>;
}

// Port for a FHIR server, so the core never depends on a concrete client library.
export interface FhirServerConnection {
  isReachable(): Promise<boolean>;
  save<T extends FhirResource>(resource: T): Promise<T>;
  read<T extends FhirResource>(relativeUrl: string): Promise<T>;
}

// Creates a connection for a base URL. The adapter package provides one based on fhirclient.
export type ConnectToServer = (baseUrl: string) => FhirServerConnection;

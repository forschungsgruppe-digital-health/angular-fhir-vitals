import type { FhirResource } from "fhir/r4";
import type { ResourceLoader } from "fhir-vitals/core";

// Loads FHIR resources from static files with the browser's fetch, for UIs without Angular's HttpClient.
export class FetchResourceLoader implements ResourceLoader {
  async load<T extends FhirResource>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}: ${path}`);
    }
    return (await response.json()) as T;
  }
}

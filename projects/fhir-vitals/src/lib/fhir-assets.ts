import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import type { FhirResource } from "fhir/r4";
import { firstValueFrom } from "rxjs";

// Loads example resources shipped with the app, so the page works without a FHIR server.
@Service()
export class FhirAssets {
  private readonly http = inject(HttpClient);

  load<T extends FhirResource>(path: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(path));
  }
}

import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import type { FhirResource } from "fhir/r4";
import type { ResourceLoader } from "fhir-vitals/core";
import { firstValueFrom } from "rxjs";

// Angular adapter for the loader port: uses HttpClient, so interceptors and HttpTestingController apply.
@Service()
export class FhirAssets implements ResourceLoader {
  private readonly http = inject(HttpClient);

  load<T extends FhirResource>(path: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(path));
  }
}

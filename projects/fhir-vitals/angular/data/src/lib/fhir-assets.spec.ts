import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import type { Patient } from "fhir/r4";

import { FhirAssets } from "./fhir-assets";

describe("FhirAssets", () => {
  let service: FhirAssets;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FhirAssets);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it("loads a resource from the given path", async () => {
    const patient: Patient = { resourceType: "Patient", id: "test" };

    const result = service.load<Patient>("assets/fhir/patient.json");
    http.expectOne("assets/fhir/patient.json").flush(patient);

    expect(await result).toEqual(patient);
  });
});

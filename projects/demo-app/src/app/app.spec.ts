import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import type { Patient } from "fhir/r4";

import { App } from "./app";

describe("App", () => {
  const patient: Patient = {
    resourceType: "Patient",
    id: "beispiel-01",
    name: [{ text: "Herr K." }],
  };

  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it("shows the patient and works without a FHIR server", async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    http.expectOne("assets/fhir/patient.json").flush(patient);
    await fixture.whenStable();
    http.expectOne("config.json").flush({ fhirBaseUrl: null });
    await fixture.whenStable();
    fixture.detectChanges();

    const page = (fixture.nativeElement as HTMLElement).textContent;
    expect(page).toContain("FHIR-Starter");
    expect(page).toContain("Herr K.");
    expect(page).toContain("Geschlecht–");
    expect(page).toContain("Status: nicht konfiguriert");
  });
});

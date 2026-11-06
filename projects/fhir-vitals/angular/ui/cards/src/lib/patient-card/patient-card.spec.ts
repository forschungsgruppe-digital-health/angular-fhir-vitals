import { TestBed } from "@angular/core/testing";
import type { Patient } from "fhir/r4";

import { PatientCard } from "./patient-card";

describe("PatientCard", () => {
  it("shows name, gender, birth date and identifier", async () => {
    const patient: Patient = {
      resourceType: "Patient",
      name: [{ text: "Herr K." }],
      gender: "male",
      birthDate: "1959",
      identifier: [{ value: "4711" }],
    };
    const fixture = TestBed.createComponent(PatientCard);
    fixture.componentRef.setInput("patient", patient);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const text = page.textContent;

    expect(page.querySelector("h2")?.textContent).toBe("Patient");
    expect(text).toContain("Herr K.");
    expect(text).toContain("male");
    expect(text).toContain("1959");
    expect(text).toContain("4711");
  });

  it("shows a dash for missing fields", async () => {
    const fixture = TestBed.createComponent(PatientCard);
    fixture.componentRef.setInput("patient", {
      resourceType: "Patient",
      name: [{ text: "Herr K." }],
    });
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      "Geschlecht–",
    );
  });
});

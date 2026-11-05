import { Component, input } from "@angular/core";
import type { Patient } from "fhir/r4";

// Shows a patient and nothing else: where the data comes from is decided by the app.
@Component({
  selector: "lib-patient-card",
  templateUrl: "./patient-card.html",
})
export class PatientCard {
  readonly patient = input<Patient | null>(null);
}

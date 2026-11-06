import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import type { Patient } from "fhir/r4";

// Shows a patient and nothing else: where the data comes from is decided by the app.
// The card comes from Angular Material, which is a suggestion and can be replaced.
@Component({
  selector: "lib-patient-card",
  imports: [MatCardModule],
  templateUrl: "./patient-card.html",
  styleUrl: "./patient-card.css",
})
export class PatientCard {
  readonly patient = input<Patient | null>(null);
}

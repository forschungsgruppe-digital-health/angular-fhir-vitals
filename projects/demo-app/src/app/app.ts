import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { VitalsFacade } from "fhir-vitals/angular/data";
import { VitalsDashboard } from "fhir-vitals/angular/dashboard";
import { PatientCard, ServerStatus } from "fhir-vitals/angular/ui";
import { firstValueFrom } from "rxjs";

interface AppConfig {
  fhirBaseUrl?: string | null;
}

// The only page of the demo. It connects the data layer with the UI components and holds no logic itself.
// VitalsDashboard appears only inside @defer, so Angular puts it with gridstack, Chart.js and
// Angular Material into a chunk of its own that loads later.
@Component({
  selector: "app-root",
  imports: [PatientCard, ServerStatus, VitalsDashboard],
  templateUrl: "./app.html",
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  protected readonly vitals = inject(VitalsFacade);

  ngOnInit(): Promise<void> {
    // Read at runtime, not at build time, so Docker can replace the file without a rebuild.
    return this.vitals.start(async () => {
      const config = await firstValueFrom(
        this.http.get<AppConfig>("config.json", { cache: "no-store" }),
      );
      return config.fhirBaseUrl || null;
    });
  }
}

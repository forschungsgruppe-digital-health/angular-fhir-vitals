import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { VitalsFacade } from "fhir-vitals/angular/data";
import { PatientCard, ServerStatus } from "fhir-vitals/angular/ui/cards";
import { VitalsDashboard } from "fhir-vitals/angular/ui/dashboard";
import { firstValueFrom } from "rxjs";

interface AppConfig {
  fhirBaseUrl?: string | null;
}

// The only page of the demo. It connects the data layer with the UI components and holds no logic itself.
// The frame is a toolbar from Angular Material, which is a suggestion and can be replaced.
// VitalsDashboard appears only inside @defer, so the app loads it when it becomes visible.
@Component({
  selector: "app-root",
  imports: [MatToolbar, PatientCard, ServerStatus, VitalsDashboard],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
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

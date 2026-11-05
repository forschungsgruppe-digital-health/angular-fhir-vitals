import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { VitalsFacade } from "fhir-vitals";
import { PatientCard, ServerStatus } from "fhir-vitals/ui";
import { firstValueFrom } from "rxjs";

interface AppConfig {
  fhirBaseUrl?: string | null;
}

// The only page of the demo. It connects the data layer with the UI components and holds no logic itself.
@Component({
  selector: "app-root",
  imports: [PatientCard, ServerStatus],
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

import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from "@angular/core/testing";
import type { Bundle, Observation, Patient } from "fhir/r4";

import { App } from "./app";

describe("App", () => {
  const patient: Patient = {
    resourceType: "Patient",
    id: "beispiel-01",
    name: [{ text: "Herr K." }],
  };
  const history: Bundle<Observation> = {
    resourceType: "Bundle",
    type: "collection",
    entry: [
      {
        resource: {
          resourceType: "Observation",
          status: "final",
          code: { text: "Blutdruck" },
          effectiveDateTime: "2026-06-01T07:35:00+02:00",
          component: [
            {
              code: { coding: [{ code: "8480-6" }] },
              valueQuantity: { value: 104 },
            },
            {
              code: { coding: [{ code: "8462-4" }] },
              valueQuantity: { value: 66 },
            },
          ],
        },
      },
    ],
  };

  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      // The test decides when the @defer block renders, instead of waiting for the viewport.
      deferBlockBehavior: DeferBlockBehavior.Manual,
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  // The flow sends its requests one after the other, so the test lets it run until the next one.
  async function answer(url: string, body: object): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve));
    http.expectOne(url).flush(body);
  }

  async function start() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    await answer("assets/fhir/patient.json", patient);
    await answer("assets/fhir/blutdruck-verlauf.json", history);
    await answer("config.json", { fhirBaseUrl: null });
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it("shows the patient and works without a FHIR server", async () => {
    const fixture = await start();

    const page = (fixture.nativeElement as HTMLElement).textContent;
    expect(page).toContain("FHIR-Starter");
    expect(page).toContain("Herr K.");
    expect(page).toContain("Geschlecht–");
    expect(page).toContain("Status: nicht konfiguriert");
  });

  it("shows a placeholder until the dashboard is loaded", async () => {
    const fixture = await start();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.textContent).toContain("Dashboard wird geladen …");
    expect(page.querySelector("lib-vitals-dashboard")).toBeNull();
  });

  it("shows the tile with the chart once the deferred block has loaded", async () => {
    const fixture = await start();
    const page = fixture.nativeElement as HTMLElement;

    const [dashboard] = await fixture.getDeferBlocks();
    await dashboard.render(DeferBlockState.Complete);
    await fixture.whenStable();

    expect(page.querySelector("h3")?.textContent?.trim()).toBe(
      "Blutdruckverlauf",
    );
    expect(page.querySelector("canvas")?.getAttribute("aria-label")).toContain(
      "1 Messung",
    );
    expect(page.textContent).not.toContain("Dashboard wird geladen …");
  });
});

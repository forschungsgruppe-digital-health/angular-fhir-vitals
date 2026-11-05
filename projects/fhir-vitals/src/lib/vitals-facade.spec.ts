import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import type { FhirResource, Patient } from "fhir/r4";
import type { FhirServerConnection } from "fhir-vitals/core";

import { CONNECT_TO_SERVER, VitalsFacade } from "./vitals-facade";

describe("VitalsFacade", () => {
  const patient: Patient = { resourceType: "Patient", id: "p1" };
  const unreachable: FhirServerConnection = {
    isReachable: () => Promise.resolve(false),
    save: <T extends FhirResource>(resource: T) => Promise.resolve(resource),
    read: <T extends FhirResource>() => Promise.reject<T>(new Error("unused")),
  };

  let facade: VitalsFacade;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        // A fake server adapter, so the test needs neither fhirclient nor a network.
        { provide: CONNECT_TO_SERVER, useValue: () => unreachable },
      ],
    });
    facade = TestBed.inject(VitalsFacade);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it("mirrors the state of the core flow as a signal", async () => {
    expect(facade.state().status).toBe("checking");

    const running = facade.start(() =>
      Promise.resolve("http://fhir.test/fhir"),
    );
    http.expectOne("assets/fhir/patient.json").flush(patient);
    await running;

    expect(facade.state().patient).toEqual(patient);
    expect(facade.state().status).toBe("unreachable");
  });

  it("keeps Angular busy while the flow waits outside of HttpClient", async () => {
    let stable = false;
    let answerConfig: () => void = () => undefined;
    const running = facade.start(
      () => new Promise((resolve) => (answerConfig = () => resolve(null))),
    );
    http.expectOne("assets/fhir/patient.json").flush(patient);
    TestBed.inject(ApplicationRef)
      .whenStable()
      .then(() => (stable = true));
    await new Promise((resolve) => setTimeout(resolve));

    expect(stable).toBeFalse();

    answerConfig();
    await running;
    await TestBed.inject(ApplicationRef).whenStable();
    expect(stable).toBeTrue();
  });

  it("passes reconnect() on to the core flow", async () => {
    const running = facade.start(() =>
      Promise.resolve("http://fhir.test/fhir"),
    );
    http.expectOne("assets/fhir/patient.json").flush(patient);
    await running;

    const reconnecting = facade.reconnect();
    expect(facade.state().status).toBe("connecting");
    await reconnecting;
    expect(facade.state().status).toBe("unreachable");
  });
});

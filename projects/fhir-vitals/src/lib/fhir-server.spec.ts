import { TestBed } from "@angular/core/testing";
import type { Observation, Patient } from "fhir/r4";
import { FhirClient } from "fhirclient/browser";

import { FhirServer } from "./fhir-server";

describe("FhirServer", () => {
  const patient: Patient = { resourceType: "Patient", id: "p1" };
  const observation: Observation = {
    resourceType: "Observation",
    id: "o1",
    status: "final",
    code: { text: "test" },
    subject: { reference: "Patient/p1" },
  };

  let service: FhirServer;

  beforeEach(() => {
    service = TestBed.inject(FhirServer);
  });

  it("is not reachable before connect()", async () => {
    expect(await service.isReachable()).toBeFalse();
  });

  it("is reachable when metadata answers", async () => {
    // Replaces the network call, so the test runs without a real server.
    spyOn(FhirClient.prototype, "fhirRequest").and.resolveTo({});
    service.connect("http://fhir.test/fhir");

    expect(await service.isReachable()).toBeTrue();
    expect(FhirClient.prototype.fhirRequest).toHaveBeenCalledWith("metadata");
  });

  it("returns false instead of throwing when metadata fails", async () => {
    spyOn(FhirClient.prototype, "fhirRequest").and.rejectWith(
      new Error("offline"),
    );
    service.connect("http://fhir.test/fhir");

    expect(await service.isReachable()).toBeFalse();
  });

  it("saves the observation only after the patient is stored", async () => {
    let storePatient: () => void = () => undefined;
    const save = spyOn(service, "save").and.returnValues(
      new Promise((resolve) => (storePatient = () => resolve(patient))),
      Promise.resolve(observation),
    );

    const seeding = service.seed(patient, observation);
    await Promise.resolve();
    expect(save).toHaveBeenCalledTimes(1);

    storePatient();
    await seeding;
    expect(save.calls.allArgs()).toEqual([[patient], [observation]]);
  });

  it("reads a resource by relative URL", async () => {
    spyOn(FhirClient.prototype, "fhirRequest").and.resolveTo(observation);
    service.connect("http://fhir.test/fhir");

    expect(await service.read<Observation>("Observation/o1")).toEqual(
      observation,
    );
    expect(FhirClient.prototype.fhirRequest).toHaveBeenCalledWith(
      "Observation/o1",
    );
  });

  it("refuses to save before connect()", () => {
    expect(() => service.save(patient)).toThrowError(/connect\(\)/);
  });
});

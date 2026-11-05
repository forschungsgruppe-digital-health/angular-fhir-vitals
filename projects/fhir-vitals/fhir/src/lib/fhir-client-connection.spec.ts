import type { Observation, Patient } from "fhir/r4";
import { FhirClient } from "fhirclient/browser";

import {
  connectWithFhirClient,
  FhirClientConnection,
} from "./fhir-client-connection";

describe("FhirClientConnection", () => {
  const patient: Patient = { resourceType: "Patient", id: "p1" };
  const observation: Observation = {
    resourceType: "Observation",
    id: "o1",
    status: "final",
    code: { text: "test" },
  };

  it("is reachable when metadata answers", async () => {
    // Replaces the network call, so the test runs without a real server.
    spyOn(FhirClient.prototype, "fhirRequest").and.resolveTo({});
    const connection = new FhirClientConnection("http://fhir.test/fhir");

    expect(await connection.isReachable()).toBeTrue();
    expect(FhirClient.prototype.fhirRequest).toHaveBeenCalledWith("metadata");
  });

  it("returns false instead of throwing when metadata fails", async () => {
    spyOn(FhirClient.prototype, "fhirRequest").and.rejectWith(
      new Error("offline"),
    );
    const connection = new FhirClientConnection("http://fhir.test/fhir");

    expect(await connection.isReachable()).toBeFalse();
  });

  it("saves with PUT through update()", async () => {
    const update = spyOn(FhirClient.prototype, "update").and.resolveTo();
    const connection = new FhirClientConnection("http://fhir.test/fhir");

    await connection.save(patient);

    expect(update).toHaveBeenCalledWith(patient);
  });

  it("reads a resource by relative URL", async () => {
    spyOn(FhirClient.prototype, "fhirRequest").and.resolveTo(observation);
    const connection = connectWithFhirClient("http://fhir.test/fhir");

    expect(await connection.read<Observation>("Observation/o1")).toEqual(
      observation,
    );
    expect(FhirClient.prototype.fhirRequest).toHaveBeenCalledWith(
      "Observation/o1",
    );
  });

  it("rejects a base URL without http(s)", () => {
    expect(() => connectWithFhirClient("localhost:8080/fhir")).toThrow();
  });
});

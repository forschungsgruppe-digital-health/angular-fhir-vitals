import type { Patient } from "fhir/r4";

import { FetchResourceLoader } from "./fetch-resource-loader";

describe("FetchResourceLoader", () => {
  const patient: Patient = { resourceType: "Patient", id: "p1" };

  it("loads a resource from the given path", async () => {
    // Replaces the network call, so the test needs no web server.
    spyOn(globalThis, "fetch").and.resolveTo(
      new Response(JSON.stringify(patient), { status: 200 }),
    );

    const result = await new FetchResourceLoader().load<Patient>(
      "assets/fhir/patient.json",
    );

    expect(result).toEqual(patient);
    expect(globalThis.fetch).toHaveBeenCalledWith("assets/fhir/patient.json");
  });

  it("reports a missing file", async () => {
    spyOn(globalThis, "fetch").and.resolveTo(
      new Response("", { status: 404, statusText: "Not Found" }),
    );

    await expectAsync(
      new FetchResourceLoader().load("assets/fhir/fehlt.json"),
    ).toBeRejectedWithError("404 Not Found: assets/fhir/fehlt.json");
  });
});

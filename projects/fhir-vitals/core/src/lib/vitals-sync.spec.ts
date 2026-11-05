import type { FhirResource, Observation, Patient } from "fhir/r4";

import type { FhirServerConnection, ResourceLoader } from "./ports";
import {
  EXAMPLE_BLOOD_PRESSURE,
  EXAMPLE_PATIENT,
  type VitalsState,
  VitalsSync,
} from "./vitals-sync";

describe("VitalsSync", () => {
  const patient: Patient = { resourceType: "Patient", id: "p1" };
  const observation: Observation = {
    resourceType: "Observation",
    id: "o1",
    status: "final",
    code: { text: "Blutdruck" },
    component: [
      {
        code: { coding: [{ code: "8480-6" }] },
        valueQuantity: { value: 104, code: "mm[Hg]" },
      },
      {
        code: { coding: [{ code: "8462-4" }] },
        valueQuantity: { value: 66, code: "mm[Hg]" },
      },
    ],
  };

  // Plain objects instead of real adapters: the core needs no framework and no server for its tests.
  const loader: ResourceLoader = {
    load: <T extends FhirResource>(path: string) =>
      Promise.resolve(
        (path === EXAMPLE_PATIENT ? patient : observation) as unknown as T,
      ),
  };

  function fakeServer(reachable: boolean): FhirServerConnection {
    return {
      isReachable: () => Promise.resolve(reachable),
      save: <T extends FhirResource>(resource: T) => Promise.resolve(resource),
      read: <T extends FhirResource>() =>
        Promise.resolve(observation as unknown as T),
    };
  }

  it("shows the patient and stops when no server is configured", async () => {
    const sync = new VitalsSync(loader, () => fakeServer(true));

    await sync.start(() => Promise.resolve(null));

    expect(sync.current.patient).toEqual(patient);
    expect(sync.current.status).toBe("not-configured");
  });

  it("reports an unreachable server", async () => {
    const sync = new VitalsSync(loader, () => fakeServer(false));

    await sync.start(() => Promise.resolve("http://fhir.test/fhir"));

    expect(sync.current.status).toBe("unreachable");
  });

  // Lets the flow run on until it waits for something the test holds back.
  const settle = () => new Promise((resolve) => setTimeout(resolve));

  it("saves the observation only after the patient is stored", async () => {
    const server = fakeServer(true);
    let storePatient: () => void = () => undefined;
    const save = spyOn(server, "save").and.callFake((resource) =>
      resource.resourceType === "Patient"
        ? new Promise((resolve) => (storePatient = () => resolve(resource)))
        : Promise.resolve(resource),
    );
    const sync = new VitalsSync(loader, () => server);

    const running = sync.start(() => Promise.resolve("http://fhir.test/fhir"));
    await settle();
    expect(save).toHaveBeenCalledTimes(1);

    storePatient();
    await running;
    expect(save.calls.allArgs()).toEqual([[patient], [observation]]);
  });

  it("reads the stored observation back and shows its value", async () => {
    const server = fakeServer(true);
    const read = spyOn(server, "read").and.callThrough();
    const sync = new VitalsSync(loader, () => server);

    await sync.start(() => Promise.resolve("http://fhir.test/fhir"));

    expect(read).toHaveBeenCalledWith("Observation/o1");
    expect(sync.current.status).toBe("saved");
    expect(sync.current.bloodPressure).toBe("104/66 mm[Hg]");
  });

  it("stays connecting until the value has been read back", async () => {
    let answer: () => void = () => undefined;
    const server: FhirServerConnection = {
      ...fakeServer(true),
      read: <T extends FhirResource>() =>
        new Promise<T>(
          (resolve) => (answer = () => resolve(observation as unknown as T)),
        ),
    };
    const sync = new VitalsSync(loader, () => server);

    const running = sync.start(() => Promise.resolve("http://fhir.test/fhir"));
    await settle();
    expect(sync.current.status).toBe("connecting");

    answer();
    await running;
    expect(sync.current.status).toBe("saved");
  });

  it("tries the loading step again after a failed start", async () => {
    let attempts = 0;
    const flaky: ResourceLoader = {
      load: <T extends FhirResource>(path: string) =>
        ++attempts === 1
          ? Promise.reject<T>(new Error("404 Not Found"))
          : loader.load<T>(path),
    };
    const sync = new VitalsSync(flaky, () => fakeServer(true));

    await sync.start(() => Promise.resolve(null));
    expect(sync.current.status).toBe("failed");
    expect(sync.current.error).toBe("404 Not Found");

    await sync.reconnect();
    expect(sync.current.patient).toEqual(patient);
    expect(sync.current.status).toBe("not-configured");
  });

  it("turns errors into a failed status with the message", async () => {
    const sync = new VitalsSync(loader, () => {
      throw new Error("ungültige Adresse");
    });

    await sync.start(() => Promise.resolve("localhost:8080/fhir"));

    expect(sync.current.status).toBe("failed");
    expect(sync.current.error).toBe("ungültige Adresse");
  });

  it("shares one run between parallel reconnects", async () => {
    let connects = 0;
    const sync = new VitalsSync(loader, () => {
      connects++;
      return fakeServer(true);
    });
    await sync.start(() => Promise.resolve("http://fhir.test/fhir"));
    connects = 0;

    await Promise.all([sync.reconnect(), sync.reconnect()]);

    expect(connects).toBe(1);
  });

  it("informs subscribers about every change", async () => {
    const seen: VitalsState["status"][] = [];
    const sync = new VitalsSync(loader, () => fakeServer(true));
    sync.subscribe((state) => seen.push(state.status));

    await sync.start(() => Promise.resolve("http://fhir.test/fhir"));

    expect(seen[0]).toBe("checking");
    expect(seen).toContain("connecting");
    expect(seen[seen.length - 1]).toBe("saved");
  });

  it("loads the example blood pressure from the assets", async () => {
    const load = spyOn(loader, "load").and.callThrough();
    const sync = new VitalsSync(loader, () => fakeServer(true));

    await sync.start(() => Promise.resolve("http://fhir.test/fhir"));

    expect(load).toHaveBeenCalledWith(EXAMPLE_BLOOD_PRESSURE);
  });
});

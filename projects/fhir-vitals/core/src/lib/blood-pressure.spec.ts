import type { Observation } from "fhir/r4";

import {
  formatBloodPressure,
  LOINC_DIASTOLIC,
  LOINC_SYSTOLIC,
} from "./blood-pressure";

describe("formatBloodPressure", () => {
  const component = (code: string, value: number) => ({
    code: { coding: [{ system: "http://loinc.org", code }] },
    valueQuantity: { value, code: "mm[Hg]" },
  });

  it("formats systolic and diastolic value with the unit", () => {
    const observation: Observation = {
      resourceType: "Observation",
      status: "final",
      code: { text: "Blutdruck" },
      component: [
        component(LOINC_SYSTOLIC, 104),
        component(LOINC_DIASTOLIC, 66),
      ],
    };

    expect(formatBloodPressure(observation)).toBe("104/66 mm[Hg]");
  });

  it("returns a dash when a value is missing", () => {
    const observation: Observation = {
      resourceType: "Observation",
      status: "final",
      code: { text: "Blutdruck" },
      component: [component(LOINC_SYSTOLIC, 104)],
    };

    expect(formatBloodPressure(observation)).toBe("–");
  });
});

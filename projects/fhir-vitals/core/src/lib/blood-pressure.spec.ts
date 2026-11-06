import type { Bundle, Observation } from "fhir/r4";

import {
  bloodPressureHistory,
  formatBloodPressure,
  LOINC_DIASTOLIC,
  LOINC_SYSTOLIC,
  toBloodPressurePoint,
} from "./blood-pressure";

const component = (code: string, value: number) => ({
  code: { coding: [{ system: "http://loinc.org", code }] },
  valueQuantity: { value, code: "mm[Hg]" },
});

const measurement = (
  effectiveDateTime: string | undefined,
  systolic: number,
  diastolic: number,
): Observation => ({
  resourceType: "Observation",
  status: "final",
  code: { text: "Blutdruck" },
  effectiveDateTime,
  component: [
    component(LOINC_SYSTOLIC, systolic),
    component(LOINC_DIASTOLIC, diastolic),
  ],
});

describe("formatBloodPressure", () => {
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

describe("toBloodPressurePoint", () => {
  it("takes time and both values of a measurement", () => {
    expect(
      toBloodPressurePoint(measurement("2026-06-01T07:35:00+02:00", 104, 66)),
    ).toEqual({
      effective: "2026-06-01T07:35:00+02:00",
      systolic: 104,
      diastolic: 66,
    });
  });

  it("uses the start of a period when there is no single time", () => {
    const observation: Observation = {
      ...measurement(undefined, 104, 66),
      effectivePeriod: { start: "2026-06-01T07:35:00+02:00" },
    };

    expect(toBloodPressurePoint(observation)?.effective).toBe(
      "2026-06-01T07:35:00+02:00",
    );
  });

  it("returns null without a readable time", () => {
    expect(toBloodPressurePoint(measurement(undefined, 104, 66))).toBeNull();
    expect(toBloodPressurePoint(measurement("gestern", 104, 66))).toBeNull();
  });

  it("returns null when a value is missing", () => {
    const observation: Observation = {
      ...measurement("2026-06-01T07:35:00+02:00", 104, 66),
      component: [component(LOINC_SYSTOLIC, 104)],
    };

    expect(toBloodPressurePoint(observation)).toBeNull();
  });
});

describe("bloodPressureHistory", () => {
  it("returns the measurements of a collection oldest first", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: [
        { resource: measurement("2026-06-01T07:35:00+02:00", 104, 66) },
        { resource: measurement("2026-05-26T07:40:00+02:00", 112, 72) },
        { resource: measurement("2026-05-31T08:10:00+02:00", 109, 69) },
      ],
    };

    expect(bloodPressureHistory(bundle).map((point) => point.systolic)).toEqual(
      [112, 109, 104],
    );
  });

  it("skips other resources and incomplete measurements", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: [
        { resource: { resourceType: "Patient", id: "beispiel-01" } },
        { resource: measurement(undefined, 120, 80) },
        {},
        { resource: measurement("2026-06-01T07:35:00+02:00", 104, 66) },
      ],
    };

    expect(bloodPressureHistory(bundle)).toEqual([
      { effective: "2026-06-01T07:35:00+02:00", systolic: 104, diastolic: 66 },
    ]);
  });

  it("reads the result of a server search the same way", () => {
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "searchset",
      total: 2,
      entry: [
        {
          fullUrl: "http://fhir.test/fhir/Observation/b",
          resource: measurement("2026-05-31T08:10:00+02:00", 109, 69),
          search: { mode: "match" },
        },
        {
          fullUrl: "http://fhir.test/fhir/Observation/a",
          resource: measurement("2026-05-30T08:05:00+02:00", 106, 68),
          search: { mode: "match" },
        },
      ],
    };

    expect(bloodPressureHistory(bundle).map((point) => point.systolic)).toEqual(
      [106, 109],
    );
  });

  it("returns an empty list for a bundle without entries", () => {
    expect(
      bloodPressureHistory({ resourceType: "Bundle", type: "searchset" }),
    ).toEqual([]);
  });
});

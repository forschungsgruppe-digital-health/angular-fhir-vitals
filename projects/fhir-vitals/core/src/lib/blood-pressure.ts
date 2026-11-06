import type { Bundle, Observation, Quantity } from "fhir/r4";

// LOINC codes of the blood pressure profile, kept in one place for every UI.
export const LOINC_SYSTOLIC = "8480-6";
export const LOINC_DIASTOLIC = "8462-4";

// One measurement as plain numbers, ready for charts and tables in any UI.
export interface BloodPressurePoint {
  // ISO date-time string as in FHIR, for example "2026-06-01T07:35:00+02:00".
  readonly effective: string;
  readonly systolic: number;
  readonly diastolic: number;
}

// Finds the value of the component with the given LOINC code in a blood pressure panel.
function componentQuantity(
  observation: Observation,
  loinc: string,
): Quantity | undefined {
  return observation.component?.find((component) =>
    component.code.coding?.some((coding) => coding.code === loinc),
  )?.valueQuantity;
}

// Builds "104/66 mm[Hg]" from the LOINC-coded components of a blood pressure panel.
export function formatBloodPressure(observation: Observation): string {
  const systolic = componentQuantity(observation, LOINC_SYSTOLIC);
  const diastolic = componentQuantity(observation, LOINC_DIASTOLIC);
  if (systolic?.value === undefined || diastolic?.value === undefined) {
    return "–";
  }
  return `${systolic.value}/${diastolic.value} ${systolic.code ?? ""}`.trim();
}

// One point of a blood pressure curve, or null when the time or a value is missing.
export function toBloodPressurePoint(
  observation: Observation,
): BloodPressurePoint | null {
  const effective =
    observation.effectiveDateTime ?? observation.effectivePeriod?.start;
  const systolic = componentQuantity(observation, LOINC_SYSTOLIC)?.value;
  const diastolic = componentQuantity(observation, LOINC_DIASTOLIC)?.value;
  if (
    effective === undefined ||
    Number.isNaN(Date.parse(effective)) ||
    systolic === undefined ||
    diastolic === undefined
  ) {
    return null;
  }
  return { effective, systolic, diastolic };
}

// All blood pressure measurements of a bundle, oldest first. A "collection" from the assets
// and a "searchset" from a server search have the same entries, so both give the same result.
export function bloodPressureHistory(bundle: Bundle): BloodPressurePoint[] {
  return (bundle.entry ?? [])
    .map((entry) => entry.resource)
    .filter(
      (resource): resource is Observation =>
        resource?.resourceType === "Observation",
    )
    .map((observation) => toBloodPressurePoint(observation))
    .filter((point): point is BloodPressurePoint => point !== null)
    .sort((a, b) => Date.parse(a.effective) - Date.parse(b.effective));
}

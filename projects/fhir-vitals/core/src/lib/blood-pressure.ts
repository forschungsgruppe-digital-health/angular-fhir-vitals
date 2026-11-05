import type { Observation } from "fhir/r4";

// LOINC codes of the blood pressure profile, kept in one place for every UI.
export const LOINC_SYSTOLIC = "8480-6";
export const LOINC_DIASTOLIC = "8462-4";

// Builds "104/66 mm[Hg]" from the LOINC-coded components of a blood pressure panel.
export function formatBloodPressure(observation: Observation): string {
  const quantity = (loinc: string) =>
    observation.component?.find((component) =>
      component.code.coding?.some((coding) => coding.code === loinc),
    )?.valueQuantity;
  const systolic = quantity(LOINC_SYSTOLIC);
  const diastolic = quantity(LOINC_DIASTOLIC);
  if (systolic?.value === undefined || diastolic?.value === undefined) {
    return "–";
  }
  return `${systolic.value}/${diastolic.value} ${systolic.code ?? ""}`.trim();
}

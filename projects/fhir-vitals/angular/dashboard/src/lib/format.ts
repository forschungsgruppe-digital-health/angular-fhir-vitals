import type { BloodPressurePoint } from "fhir-vitals/core";

// German formats in the browser's time zone for the chart tile: axis labels, tooltip and text alternative.
// Internal helper, not exported from the public API.
const DATE_TIME = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const SHORT_DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
});

// The blood pressure profile requires the UCUM unit mm[Hg] for both values.
export const UNIT = "mm[Hg]";

// An ISO date-time string as in FHIR or epoch milliseconds as used on the chart axis.
type Time = string | number;

// "01.06.2026, 07:35"
export const formatDateTime = (time: Time) => DATE_TIME.format(new Date(time));

// "01.06.2026"
export const formatDate = (time: Time) => DATE.format(new Date(time));

// "01.06." for axis labels.
export const formatShortDate = (time: Time) =>
  SHORT_DATE.format(new Date(time));

// "104/66", the unit is added where it is needed.
export const formatValues = (point: BloodPressurePoint) =>
  `${point.systolic}/${point.diastolic}`;

// "fhir-vitals/angular/dashboard": a minimal dashboard example with one tile. Its own entry point, because
// an app loads everything an entry point imports at once, and this one brings gridstack, Chart.js and
// Angular Material. These libraries are a suggestion and can be replaced.
export * from "./lib/blood-pressure-chart/blood-pressure-chart";
export * from "./lib/vitals-dashboard/vitals-dashboard";

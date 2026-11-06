import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import type { BloodPressurePoint } from "fhir-vitals/core";
import type { GridStackOptions } from "gridstack";
import {
  GridstackComponent,
  GridstackItemComponent,
} from "gridstack/dist/angular";

import { BloodPressureChart } from "../blood-pressure-chart/blood-pressure-chart";

// Minimal example: one fixed tile in a gridstack grid. Moving, resizing, adding, removing and saving
// tiles, and operating them by keyboard, are left to the workshop. gridstack, Angular Material and
// Chart.js are a suggestion and can be replaced.
@Component({
  selector: "lib-vitals-dashboard",
  imports: [
    GridstackComponent,
    GridstackItemComponent,
    MatCardModule,
    BloodPressureChart,
  ],
  templateUrl: "./vitals-dashboard.html",
  styleUrl: "./vitals-dashboard.css",
})
export class VitalsDashboard {
  // Oldest first, as VitalsState.history provides it.
  readonly history = input.required<readonly BloodPressurePoint[]>();

  protected readonly gridOptions: GridStackOptions = {
    column: 12,
    cellHeight: 80,
    margin: 8,
    // Fixed tile: no dragging and no resizing.
    staticGrid: true,
    // No animation when the column count changes, because gridstack ignores prefers-reduced-motion.
    animate: false,
    // At a grid width of 600 px or less the grid has one column, so the tile spans the full width.
    // layout "none" keeps x and w when the grid gets wider again, so the tile is 8 columns wide even
    // when the page starts in a narrow window. The default "moveScale" would stretch it to 12.
    columnOpts: { breakpoints: [{ w: 600, c: 1 }], layout: "none" },
  };
}

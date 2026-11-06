import { Component, computed, input, type Signal } from "@angular/core";
import {
  type ChartData,
  type ChartOptions,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { BloodPressurePoint } from "fhir-vitals/core";
import { BaseChartDirective, provideCharts } from "ng2-charts";

import {
  formatDate,
  formatDateTime,
  formatShortDate,
  formatValues,
  UNIT,
} from "../format";

type TimePoint = { x: number; y: number };

// True when the user asked the operating system for less motion. The chart then skips its animations.
const prefersReducedMotion = (): boolean =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const DAY = 24 * 60 * 60 * 1000;
// Checked for contrast against a light surface. Line style and point shape tell the series apart
// as well, so the chart never relies on colour alone.
const SYSTOLIC_COLOR = "#2a78d6";
const DIASTOLIC_COLOR = "#eb6834";
const GRID_COLOR = "rgba(0, 0, 0, 0.08)";

// Blood pressure over time as a line chart.
@Component({
  selector: "lib-blood-pressure-chart",
  imports: [BaseChartDirective],
  // Registered here instead of in the app: BaseChartDirective reads this configuration and calls
  // Chart.register(). So chart.js loads only together with the dashboard. A linear axis with epoch
  // milliseconds needs no date adapter.
  providers: [
    provideCharts({
      registerables: [
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        Legend,
        Tooltip,
      ],
    }),
  ],
  templateUrl: "./blood-pressure-chart.html",
  styleUrl: "./blood-pressure-chart.css",
})
export class BloodPressureChart {
  // Oldest first, as VitalsState.history provides it.
  readonly history = input.required<readonly BloodPressurePoint[]>();

  protected readonly data = computed<ChartData<"line", TimePoint[]>>(() => {
    const series = (value: (point: BloodPressurePoint) => number) =>
      this.history().map((point) => ({
        x: Date.parse(point.effective),
        y: value(point),
      }));
    return {
      datasets: [
        {
          label: "Systolisch",
          data: series((point) => point.systolic),
          borderColor: SYSTOLIC_COLOR,
          backgroundColor: SYSTOLIC_COLOR,
          borderWidth: 2,
          pointStyle: "circle",
          pointRadius: 4,
        },
        {
          label: "Diastolisch",
          data: series((point) => point.diastolic),
          borderColor: DIASTOLIC_COLOR,
          backgroundColor: DIASTOLIC_COLOR,
          borderWidth: 2,
          borderDash: [6, 4],
          pointStyle: "rect",
          pointRadius: 4,
        },
      ],
    };
  });

  // Annotated, because the declaration file cannot name the type chart.js infers here.
  protected readonly options: Signal<ChartOptions<"line">> = computed(() => ({
    responsive: true,
    // The tile decides the height, not the width of the canvas.
    maintainAspectRatio: false,
    animation: prefersReducedMotion() ? false : {},
    // The tooltip shows both values of the nearest point in time, like a crosshair.
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        // Ticks at multiples of one day after 1970-01-01 UTC, that is at 01:00 or 02:00 in Germany.
        type: "linear",
        ...this.singleDayRange(),
        ticks: {
          // Without measurements chart.js would label the axis with 01.01.1970.
          display: this.history().length > 0,
          stepSize: DAY,
          callback: (value) => formatShortDate(Number(value)),
        },
        grid: { color: GRID_COLOR },
      },
      y: {
        title: { display: true, text: UNIT },
        grid: { color: GRID_COLOR },
      },
    },
    plugins: {
      legend: {
        display: true,
        // A click on the legend does not hide a series, because that would work only with a mouse.
        onClick: () => undefined,
        labels: { usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const time = items.at(0)?.parsed.x;
            return typeof time === "number" ? formatDateTime(time) : "";
          },
          label: (item) =>
            `${item.dataset.label}: ${item.formattedValue} ${UNIT}`,
        },
      },
    },
  }));

  // With a single point in time chart.js would widen the axis by 5 % of the epoch value, that is by
  // years. Half a day on each side keeps the axis at a few days instead.
  private singleDayRange() {
    const times = this.history().map((point) => Date.parse(point.effective));
    const first = Math.min(...times);
    return times.length > 0 && first === Math.max(...times)
      ? { suggestedMin: first - DAY / 2, suggestedMax: first + DAY / 2 }
      : {};
  }

  // Text alternative for screen readers, because a canvas has no readable content.
  protected readonly summary = computed(() => {
    const history = this.history();
    const first = history.at(0);
    const last = history.at(-1);
    if (!first || !last) {
      return "Blutdruckverlauf: keine Messungen";
    }
    if (history.length === 1) {
      return `Blutdruckverlauf: 1 Messung am ${formatDate(last.effective)}, ${formatValues(last)} ${UNIT}`;
    }
    return `Blutdruckverlauf: ${history.length} Messungen vom ${formatDate(first.effective)} bis ${formatDate(last.effective)}, zuletzt ${formatValues(last)} ${UNIT}`;
  });
}

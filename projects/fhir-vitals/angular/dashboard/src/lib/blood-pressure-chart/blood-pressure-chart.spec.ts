import { TestBed } from "@angular/core/testing";
import {
  Chart,
  type ChartEvent,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import type { BloodPressurePoint } from "fhir-vitals/core";

import { BloodPressureChart } from "./blood-pressure-chart";

describe("BloodPressureChart", () => {
  // Local times, so the expected German texts hold in every time zone.
  const at = (month: number, day: number, hour: number, minute: number) =>
    new Date(2026, month - 1, day, hour, minute).toISOString();
  const history: BloodPressurePoint[] = [
    { effective: at(5, 26, 7, 40), systolic: 112, diastolic: 72 },
    { effective: at(5, 31, 8, 10), systolic: 109, diastolic: 69 },
    { effective: at(6, 1, 7, 35), systolic: 104, diastolic: 66 },
  ];

  // chart.js keeps registrations globally. Removing them first proves that the component
  // registers what it needs itself, without provideCharts() in the app or in this test.
  beforeEach(() =>
    Chart.unregister(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Legend,
      Tooltip,
    ),
  );

  async function render(points: readonly BloodPressurePoint[]) {
    const fixture = TestBed.createComponent(BloodPressureChart);
    const element = fixture.nativeElement as HTMLElement;
    // Wider than twice the height, so the default aspect ratio of 2 would not fit.
    element.style.height = "200px";
    element.style.width = "800px";
    fixture.componentRef.setInput("history", points);
    await fixture.whenStable();
    const canvas = element.querySelector("canvas")!;
    return { element, canvas, chart: Chart.getChart(canvas) };
  }

  it("draws a line chart without providers from the app", async () => {
    const { chart } = await render(history);

    expect(chart?.getDatasetMeta(0).type).toBe("line");
    expect(chart?.data.datasets.map((dataset) => dataset.label)).toEqual([
      "Systolisch",
      "Diastolisch",
    ]);
  });

  it("stays inside its box on the first render", async () => {
    const { canvas } = await render(history);

    expect(canvas.getBoundingClientRect().height).toBeLessThanOrEqual(200);
  });

  it("labels the time axis with short German dates", async () => {
    const { chart } = await render(history);
    const labels = chart?.scales["x"].ticks.map((tick) => tick.label) ?? [];

    expect(labels.length).toBeGreaterThan(0);
    labels.forEach((label) => expect(label).toMatch(/^\d\d\.\d\d\.$/));
  });

  it("describes the curve for screen readers", async () => {
    const { canvas } = await render(history);

    expect(canvas.getAttribute("role")).toBe("img");
    expect(canvas.getAttribute("aria-label")).toBe(
      "Blutdruckverlauf: 3 Messungen vom 26.05.2026 bis 01.06.2026, zuletzt 104/66 mm[Hg]",
    );
  });

  it("describes a single measurement on a short time axis", async () => {
    const { canvas, chart } = await render(history.slice(-1));
    const { min, max } = chart!.scales["x"];

    expect(canvas.getAttribute("aria-label")).toBe(
      "Blutdruckverlauf: 1 Messung am 01.06.2026, 104/66 mm[Hg]",
    );
    expect(max - min).toBeLessThanOrEqual(2 * 24 * 60 * 60 * 1000);
  });

  it("says so when there are no measurements and shows no dates", async () => {
    const { canvas, chart } = await render([]);

    expect(canvas.getAttribute("aria-label")).toBe(
      "Blutdruckverlauf: keine Messungen",
    );
    expect(chart?.options.scales?.["x"]?.ticks?.display).toBeFalse();
  });

  it("hides no series on a click on the legend", async () => {
    const { chart } = await render(history);
    const legend = chart!.legend!;
    legend.options.onClick.call(
      legend,
      {} as ChartEvent,
      legend.legendItems![1],
      legend,
    );

    expect(chart!.isDatasetVisible(1)).toBeTrue();
  });
});

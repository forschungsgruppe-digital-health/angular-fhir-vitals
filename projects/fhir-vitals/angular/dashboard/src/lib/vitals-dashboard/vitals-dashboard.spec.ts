import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import type { BloodPressurePoint } from "fhir-vitals/core";
import { GridstackComponent } from "gridstack/dist/angular";

import { VitalsDashboard } from "./vitals-dashboard";

describe("VitalsDashboard", () => {
  // Local times, so the expected German texts hold in every time zone.
  const at = (month: number, day: number, hour: number, minute: number) =>
    new Date(2026, month - 1, day, hour, minute).toISOString();
  const history: BloodPressurePoint[] = [
    { effective: at(5, 31, 8, 10), systolic: 109, diastolic: 69 },
    { effective: at(6, 1, 7, 35), systolic: 104, diastolic: 66 },
  ];

  // gridstack compares the width of the grid with the breakpoint at 600 px when it starts.
  async function render(width = 1000) {
    const fixture = TestBed.createComponent(VitalsDashboard);
    const element = fixture.nativeElement as HTMLElement;
    element.style.width = `${width}px`;
    fixture.componentRef.setInput("history", history);
    await fixture.whenStable();
    const gridstack = fixture.debugElement.query(
      By.directive(GridstackComponent),
    ).componentInstance as GridstackComponent;
    return { element, grid: gridstack.grid! };
  }

  it("shows exactly one tile with its title and the chart", async () => {
    const { element } = await render();

    expect(element.querySelectorAll("gridstack-item").length).toBe(1);
    expect(
      Array.from(element.querySelectorAll("h3"), (title) =>
        title.textContent?.trim(),
      ),
    ).toEqual(["Blutdruckverlauf"]);
    expect(element.querySelector("gridstack-item canvas")).not.toBeNull();
  });

  it("places the tile top left, 8 of 12 columns wide and 4 rows high", async () => {
    const { grid } = await render();
    const [{ x, y, w, h }] = grid.engine.nodes;

    expect(grid.getColumn()).toBe(12);
    expect({ x, y, w, h }).toEqual({ x: 0, y: 0, w: 8, h: 4 });
  });

  it("keeps the tile fixed without drag or resize handles and without animation", async () => {
    const { element, grid } = await render();
    const item = element.querySelector("gridstack-item")!;
    const classes = element.querySelector(".grid-stack")?.classList;
    // gridstack switches its animation on in a timeout after loading the tiles.
    await new Promise((resolve) => setTimeout(resolve));

    expect(grid.opts.staticGrid).toBeTrue();
    expect(classes).toContain("grid-stack-static");
    expect(classes).not.toContain("grid-stack-animate");
    expect(item.classList).toContain("ui-draggable-disabled");
    expect(item.classList).toContain("ui-resizable-disabled");
    expect(element.querySelector(".ui-resizable-handle")).toBeNull();
  });

  it("passes the history to the chart and its text alternative", async () => {
    const { element } = await render();

    expect(element.querySelector("canvas")?.getAttribute("aria-label")).toBe(
      "Blutdruckverlauf: 2 Messungen vom 31.05.2026 bis 01.06.2026, zuletzt 104/66 mm[Hg]",
    );
  });

  it("spans the full width at a grid width of 600 px or less", async () => {
    const { grid } = await render(560);

    // One column, and the tile is one column wide.
    expect(grid.getColumn()).toBe(1);
    expect(grid.engine.nodes[0].w).toBe(1);
  });

  it("gets its 8 columns back when a narrow grid grows wider", async () => {
    const { element, grid } = await render(560);
    element.style.width = "1000px";
    grid.onResize();
    const [{ x, y, w, h }] = grid.engine.nodes;

    expect(grid.getColumn()).toBe(12);
    expect({ x, y, w, h }).toEqual({ x: 0, y: 0, w: 8, h: 4 });
  });
});

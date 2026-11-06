import { TestBed } from "@angular/core/testing";
import { INITIAL_STATE, type VitalsState } from "fhir-vitals/core";

import { ServerStatus } from "./server-status";

describe("ServerStatus", () => {
  async function render(state: VitalsState) {
    const fixture = TestBed.createComponent(ServerStatus);
    fixture.componentRef.setInput("state", state);
    await fixture.whenStable();
    return fixture;
  }

  it("shows the German text and the blood pressure", async () => {
    const fixture = await render({
      ...INITIAL_STATE,
      status: "saved",
      bloodPressure: "104/66 mm[Hg]",
    });
    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).toContain(
      "Status: verbunden, Patient und Blutdruck gespeichert",
    );
    expect(text).toContain("Blutdruck vom Server: 104/66 mm[Hg]");
  });

  it("puts the status into a live region for screen readers", async () => {
    const fixture = await render({ ...INITIAL_STATE, status: "unreachable" });
    const live = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="status"]',
    );

    expect(live?.textContent).toBe("Status: nicht erreichbar");
  });

  it("shows the error message of a failed run", async () => {
    const fixture = await render({
      ...INITIAL_STATE,
      status: "failed",
      error: "offline",
    });

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      "Status: offline",
    );
  });

  it("asks the app to reconnect and ignores clicks while connecting", async () => {
    const fixture = await render({ ...INITIAL_STATE, status: "unreachable" });
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      "button",
    )!;
    let reconnects = 0;
    fixture.componentInstance.reconnect.subscribe(() => reconnects++);

    button.click();
    fixture.componentRef.setInput("state", {
      ...INITIAL_STATE,
      status: "connecting",
    });
    await fixture.whenStable();
    button.click();

    expect(reconnects).toBe(1);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    // Not natively disabled, so the button keeps the keyboard focus.
    expect(button.disabled).toBeFalse();
  });
});

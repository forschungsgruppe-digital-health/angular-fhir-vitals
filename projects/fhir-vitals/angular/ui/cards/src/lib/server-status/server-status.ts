import { Component, computed, input, output } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import type { ConnectionStatus, VitalsState } from "fhir-vitals/core";

// German wording for the status codes of fhir-vitals/core. Another UI may choose other texts.
const TEXTS: Record<ConnectionStatus, string> = {
  checking: "wird geprüft …",
  "not-configured": "nicht konfiguriert",
  connecting: "wird verbunden …",
  unreachable: "nicht erreichbar",
  saved: "verbunden, Patient und Blutdruck gespeichert",
  failed: "Fehler",
};

// Shows the server state and offers a reconnect; the app decides what a reconnect does.
// Card and button come from Angular Material, which is a suggestion and can be replaced.
@Component({
  selector: "lib-server-status",
  imports: [MatButton, MatCardModule],
  templateUrl: "./server-status.html",
})
export class ServerStatus {
  readonly state = input.required<VitalsState>();
  readonly reconnect = output<void>();

  protected readonly text = computed(() => {
    const state = this.state();
    return state.status === "failed" && state.error
      ? state.error
      : TEXTS[state.status];
  });
  protected readonly busy = computed(
    () =>
      this.state().status === "checking" ||
      this.state().status === "connecting",
  );

  // With disabledInteractive the button still receives clicks while it is disabled, so it checks busy itself.
  protected requestReconnect(): void {
    if (!this.busy()) {
      this.reconnect.emit();
    }
  }
}

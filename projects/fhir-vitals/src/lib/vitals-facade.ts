import {
  DestroyRef,
  inject,
  InjectionToken,
  PendingTasks,
  Service,
  signal,
} from "@angular/core";
import {
  type ConnectToServer,
  type VitalsState,
  VitalsSync,
} from "fhir-vitals/core";
import { connectWithFhirClient } from "fhir-vitals/fhir";

import { FhirAssets } from "./fhir-assets";

// Token instead of a direct call, so tests and apps can swap in another server adapter.
export const CONNECT_TO_SERVER = new InjectionToken<ConnectToServer>(
  "CONNECT_TO_SERVER",
  { factory: () => connectWithFhirClient },
);

// Angular face of VitalsSync: the flow stays in fhir-vitals/core, Angular only mirrors its state as a signal.
@Service()
export class VitalsFacade {
  private readonly sync = new VitalsSync(
    inject(FhirAssets),
    inject(CONNECT_TO_SERVER),
  );
  private readonly current = signal<VitalsState>(this.sync.current);
  private readonly pendingTasks = inject(PendingTasks);

  readonly state = this.current.asReadonly();

  constructor() {
    const unsubscribe = this.sync.subscribe((state) => this.current.set(state));
    inject(DestroyRef).onDestroy(unsubscribe);
  }

  start(readBaseUrl: () => Promise<string | null>): Promise<void> {
    return this.track(() => this.sync.start(readBaseUrl));
  }

  reconnect(): Promise<void> {
    return this.track(() => this.sync.reconnect());
  }

  // A pending task tells Angular, and fixture.whenStable() in tests, that the flow is still running.
  private async track(work: () => Promise<void>): Promise<void> {
    const done = this.pendingTasks.add();
    try {
      await work();
    } finally {
      done();
    }
  }
}

import { provideHttpClient, withFetch } from "@angular/common/http";
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withFetch() uses the browser's fetch API, like the fhirclient library does.
    provideHttpClient(withFetch()),
  ],
};

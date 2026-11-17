# 2 Randbedingungen

Teil der [Architektur von fhir-vitals](README.md).

## Versionen

Die Versionen richten sich nach dem Frontend des Patientenportals der Forschungsgruppe, also nach dem Teil, der im Browser läuft.
Gemeint ist das Repository `cross-hub-patientportal`, Ordner `apps/frontend`, Standardzweig mit Stand 27.08.2026.
Die Spalte „Portal“ nennt die installierten Paketversionen aus dessen `package-lock.json`.
Node.js, nginx und HAPI FHIR stammen aus `.nvmrc` und den Dockerfiles des Portals.
Die Versionen des Starters stammen von der npm-Registry, von nodejs.org und von Docker Hub, Stand 05.11.2026.
Die Zeilen für die vorgeschlagenen Pakete stammen vom 06.11.2026, auch die Spalte „Portal“.
Die beiden Zeilen zum Dev-Container stammen vom 17.11.2026, aus der Microsoft Container Registry und aus den Paketquellen von Debian 13, dem Linux-System im Image.

| Paket | Portal | Starter | Begründung |
|---|---|---|---|
| Angular (`core`, `common`, `compiler`, `forms`, `platform-browser`) | 22.0.5 | 22.2.4 (`~22.2.4`) | Abweichung. Sicherheitskorrekturen gibt es nur in 22.2. Der letzte Patch von 22.0 ist 22.0.8. Für diese Version meldete `npm audit` am 05.11.2026 insgesamt 41 Schwachstellen. Zwei davon sind kritisch. Betroffen ist auch `@angular/core`. Die Tilde hält den Starter auf 22.2. |
| Angular CLI | 22.0.5 | 22.2.6 (`~22.2.6`) | wie oben. Die Angular CLI 22.2.6 hat den Workspace mit `npx @angular/cli@22.2.6 new` angelegt. |
| Build-System | `@angular-devkit/build-angular` 22.0.5 | `@angular/build` 22.2.6 | Standard der CLI für neue Projekte, ohne Webpack |
| ng-packagr | 22.0.1 | 22.2.6 (`~22.2.6`) | passend zu Angular 22.2 |
| TypeScript | 6.0.3 | 6.0.3 (`~6.0.3`) | gleich. Angular 22.2 verlangt mindestens 6.0 und weniger als 6.1. |
| RxJS | 7.8.2 | 7.8.2 (`~7.8.0`) | gleich |
| zone.js | 0.16.2 | 0.16.3 (`~0.16.2`) | Das Portal nutzt zone.js, deshalb auch die Demo-App. Der Bereich `~0.16.2` entspricht dem Portal. Installiert ist der neuere Patch 0.16.3. |
| Testrunner | Karma 6.4.4, Jasmine 5.13.0 | Karma 6.4.4, Jasmine 5.13.0 | gleich |
| ESLint | ESLint 9.39.4, angular-eslint 22.0.0, typescript-eslint 8 | ESLint 10.14.0, angular-eslint 22.0.0, typescript-eslint 8.72.1 | Abweichung. Das ESLint-Team pflegt ESLint 9 seit dem 06.08.2026 nicht mehr. Die Regeln entsprechen denen des Portals. |
| Prettier | 3.9.4 ohne eigene Einstellungen | 3.9.10 mit Standardwerten | wie im Portal: doppelte Anführungszeichen, 80 Zeichen je Zeile. Der Bereich `^3.9.4` entspricht dem Portal. Installiert ist der neuere Patch 3.9.10. |
| @types/fhir | 0.0.44 | 0.0.44 | gleich |
| Angular Material und CDK (`@angular/material`, `@angular/cdk`) | 22.0.3 | 22.2.6 (`~22.2.6`) | Vorschlag für die Karten, die Toolbar der Demo-App und das Dashboard-Beispiel. Passend zu Angular 22.2, Tilde wie bei den anderen Angular-Paketen. Das Portal nutzt Angular Material ebenfalls. 22.2.6 war am 06.11.2026 die neueste Version. |
| gridstack | nicht genutzt | 14.1.0 (genau `14.1.0`) | Vorschlag für das Dashboard-Beispiel. Die Version ist ohne `^` festgelegt, weil die Hauptversionen schnell wechseln: 13.0.0 erschien am 19.07.2026, 14.0.0 am 21.09.2026. 14.1.0 erschien laut npm-Registry am 04.11.2026 und war am 06.11.2026 die neueste Version. |
| Chart.js (`chart.js`) | 4.5.1 | 4.6.1 (`^4.6.1`) | Vorschlag für das Dashboard-Beispiel. Dieselbe Hauptversion wie im Portal. 4.6.1 war am 06.11.2026 die neueste Version. |
| ng2-charts | 10.0.0 | 11.0.0 (`^11.0.0`) | Vorschlag für das Dashboard-Beispiel. Abweichung: 11.0.0 war am 06.11.2026 die neueste Version und verlangt Angular ab 22.0.0. Version 10.0.0 des Portals verlangt Angular ab 21.0.0. |
| `@fontsource/roboto` | nicht genutzt | 5.3.0 (`^5.3.0`) | Vorschlag für die Demo-App. Liefert die Schrift Roboto mit der App aus, statt sie von Google Fonts zu laden. 5.3.0 war am 06.11.2026 die neueste Version. |
| fhirclient | nicht genutzt | 3.0.1 | Das Portal nutzt einen eigenen FHIR-Zugang über `HttpClient`. Der Starter nutzt `fhirclient`, weil es ohne eigene Infrastruktur auskommt und später SMART App Launch kann. |
| Node.js | 22 (`.nvmrc`) | 22 (`.nvmrc`), Docker `node:22.23.4-alpine` | gleiche Hauptversion. Angular 22.2 verlangt Node.js `^22.22.3`, `^24.15.0` oder `>=26.0.0`. 22.23.4 war am 05.11.2026 die neueste 22er-Version. |
| npm | nicht festgelegt, Lock-Datei Version 3 | 10.9.8 (Feld `packageManager`), Lock-Datei Version 3 | gleiche Version der Lock-Datei |
| nginx | `nginx:1.31-alpine` | `nginx:1.31.8-alpine` | dieselbe Linie mit fester Version |
| HAPI FHIR | `hapiproject/hapi:v8.10.0-2` | `hapiproject/hapi:v8.12.0-2` | neueste Version am 05.11.2026 |
| Image des Dev-Containers | kein Dev-Container | `mcr.microsoft.com/devcontainers/javascript-node:5.2.6-22-trixie` | Node.js 22 wie `.nvmrc` auf Debian 13 „trixie“. 5.2.6 war am 17.11.2026 die neueste Version des Images. Es bringt Node.js 22.23.5 und npm 10.9.9 mit. `npm ci` lief damit ohne Warnung zum Feld `packageManager`, das 10.9.8 nennt. |
| Chromium und Java im Dev-Container | kein Dev-Container | Chromium 156.0.8078.79 und OpenJDK 21.0.13 aus Debian 13 | Das Dockerfile legt keine Version fest, denn Debian ersetzt ältere Versionen in seinen Paketquellen durch neue. Eine feste Version ließe den Bau nach dem nächsten Update scheitern. Der erste Bau auf einem Rechner holt so den aktuellen Stand mit den Sicherheitsupdates. Docker merkt sich danach das Ergebnis jedes Schritts und nutzt es bei einem Neubau wieder. FHIR tools braucht Java 17 oder neuer. |

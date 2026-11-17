# 9 Architekturentscheidungen

Teil der [Architektur von fhir-vitals](README.md).

## Vorschlag: Bibliotheken für Karten und Dashboard

Die Karten, die Toolbar der Demo-App und das Dashboard-Beispiel aus [Kapitel 5](05-bausteinsicht.md) nutzen Angular Material mit CDK.
Das Dashboard-Beispiel nutzt zusätzlich gridstack und Chart.js mit ng2-charts.
Die Schrift Roboto aus `@fontsource/roboto` gilt für die ganze Seite.
Diese Bibliotheken sind ein Vorschlag.
Sie sind installiert, damit die Beispiele laufen.
Im Softwareprojekt lassen sie sich durch andere ersetzen.
Stand der Angaben: 06.11.2026.
Versionen stammen von der npm-Registry, Lizenzen aus den Lizenzdateien der Pakete.

| Paket | Version | Lizenz | Aufgabe im Beispiel | Warum vorgeschlagen | Grenzen |
|---|---|---|---|---|---|
| Angular Material und CDK (`@angular/material`, `@angular/cdk`) | 22.2.6 | MIT | Karten „Patient“ und „FHIR-Server“, Karte um die Kachel, Knopf „Erneut verbinden“, Toolbar der Demo-App, fertiges Theme `azure-blue.css` | Das Patientenportal nutzt Angular Material ebenfalls. Es kommt vom Angular-Team und passt zu Angular 22.2. | Nur für Angular, denn beide Pakete setzen `@angular/core` voraus. Eine Oberfläche mit Vue kann sie nicht nutzen. Die Beispiele nutzen nur Karte, Knopf, Toolbar und ein fertiges Theme. |
| gridstack | 14.1.0 | MIT | Raster mit 12 Spalten, darin eine feste Kachel | Es bringt eigene Anbindungen für Angular, React und Vue mit, etwa `gridstack/dist/angular` und `gridstack/dist/vue`. Eine Oberfläche mit Vue kann deshalb dieselbe Bibliothek nutzen. | Kacheln lassen sich nicht per Tastatur verschieben. gridstack wertet Tasten nur während eines Zugs mit der Maus aus, etwa `Esc` zum Abbrechen. Es setzt keine Attribute wie `aria-label`, die einem Screenreader Rolle oder Zustand mitteilen. Die Hauptversionen wechseln schnell. Laut npm-Registry erschien 13.0.0 am 19.07.2026 und 14.0.0 am 21.09.2026. Deshalb ist die Version genau festgelegt. |
| Chart.js mit ng2-charts (`chart.js`, `ng2-charts`) | 4.6.1 und 11.0.0 | MIT | Liniendiagramm in der Kachel | Das Patientenportal nutzt dieselben beiden Pakete. | Chart.js zeichnet in ein Canvas. Jedes Diagramm braucht deshalb eine eigene Textalternative für Screenreader. |
| `@fontsource/roboto` | 5.3.0 | OFL-1.1 | Schrift Roboto für das Theme und die Demo-App | Die Schrift kommt vom eigenen Server statt von Google Fonts. So geht beim Seitenaufruf keine Anfrage an Google. | Eingebunden ist nur die Teilmenge `latin` in den Schriftstärken 400 und 500, also normal und mittel. |

**Alternativen mit freier Lizenz.**

- angular-gridster2 22.0.0 (MIT) ist ein Raster nur für Angular. Eine Oberfläche mit Vue könnte es nicht nutzen.
- Apache ECharts 6.1.0 (Apache-2.0) mit ngx-echarts 22.0.0 (MIT) zeichnet Diagramme wie Chart.js. ngx-echarts verlangt Angular ab 22.0.0.

**Wegen der Lizenz nicht geeignet.**

- PrimeNG 22 verlangt laut seiner Datei `LICENSE.md` einen Lizenzschlüssel, geprüft mit Version 22.1.4. Die kostenlose Community License schließt laut primeui.dev Universitäten und andere Bildungseinrichtungen als Organisation aus.
- Highcharts steht unter einer eigenen Lizenz der Firma Highsoft, dem Standard License Agreement, und nicht unter einer freien Lizenz wie MIT.
- Die kommerziellen Komponentensammlungen Kendo UI for Angular und Syncfusion verlangen einen Lizenzschlüssel. Die kostenlose Community License von Syncfusion schließt Organisationen aus, die sich aus Steuern finanzieren.

**Eine Bibliothek ersetzen.**
Die Schritte am Beispiel von gridstack:

1. Das Paket mit `npm uninstall gridstack` entfernen. In einer Kopie des Repositorys meldete npm am 06.11.2026 `removed 1 package, and audited 605 packages in 2s`. Danach brach `npx ng build fhir-vitals` mit `error TS2307: Cannot find module 'gridstack' or its corresponding type declarations.` in `vitals-dashboard.ts` ab. Die Meldungen zeigen so die Stellen, die sich ändern müssen.
2. Das neue Paket mit `npm install <paket>` installieren. npm meldet dann eine Zeile `added … packages`.
3. In `angular.json` unter `styles` die Zeile `gridstack/dist/gridstack.min.css` entfernen und, falls nötig, die CSS-Datei des neuen Pakets eintragen.
4. In `projects/fhir-vitals/package.json` die peerDependency und ihren Eintrag unter `peerDependenciesMeta` auf das neue Paket ändern.
5. In `eslint.config.js` das Muster `dashboardPackages` anpassen. Dann meldet `npm run lint` einen Import des neuen Pakets überall in der Bibliothek außer in `angular/ui/dashboard` als Fehler.
6. Die Komponenten in `projects/fhir-vitals/angular/ui/dashboard/src/lib` umbauen, dazu ihre Tests.
7. `npm run lint` und `npm test` ausführen. Die erwartete Ausgabe beschreibt [README, Abschnitt 4](../../README.md#4-befehle).

Für Angular Material gelten die Schritte sinngemäß, aber die Änderungen reichen weiter.
In `angular.json` betrifft das die Zeile `azure-blue.css`.
In `eslint.config.js` betrifft es die Regel für `@angular/material` in der Datenschicht.
Außer dem Dashboard ändern sich auch `PatientCard` und `ServerStatus` in `angular/ui/cards` sowie `app.ts`, `app.html`, `app.css` und `styles.css` der Demo-App.

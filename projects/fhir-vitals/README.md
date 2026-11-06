# fhir-vitals

Angular-Bibliothek für Vitalparameter über HL7 FHIR R4.

Sie besteht aus fünf Einstiegspunkten, also Teilpaketen mit eigenem Importnamen.
Eine Schicht ist ein Teil der Bibliothek mit einer festen Aufgabe, etwa der Ablauf, der Serverzugriff oder die Oberfläche.
Die Ordner folgen dem Prinzip „zuerst die Schicht, dann das Feature“.
Ein Feature ist ein abgegrenzter Teil einer Schicht mit eigener Aufgabe.
Die ganze Angular-Oberfläche liegt deshalb unter `angular/ui`, mit einem Einstiegspunkt je Feature.
Angular Material ist genauso aufgebaut, etwa mit `@angular/material/card`.

- `fhir-vitals/core` enthält den Ablauf `VitalsSync` und die Ports, ohne Angular und ohne Serverzugriff. Ein Port ist eine Schnittstelle, die beschreibt, was der Ablauf von außen braucht. `bloodPressureHistory()` macht aus einem FHIR-Bundle, also einer Sammlung von FHIR-Ressourcen, eine Liste von Blutdruckmessungen.
- `fhir-vitals/fhir` enthält Adapter für diese Ports mit fhirclient und mit fetch, ebenfalls ohne Angular. Ein Adapter setzt einen Port mit einer bestimmten Technik um.
- `fhir-vitals/angular/data` ist die Angular-Datenschicht mit `FhirAssets` und `VitalsFacade`. Die Facade ist ein einfacher Zugang für Komponenten. Sie bietet den Zustand des Ablaufs als Signal an, also als Wert, dessen Änderungen Angular verfolgt.
- `fhir-vitals/angular/ui/cards` enthält die Komponenten `PatientCard` und `ServerStatus`. Beide zeigen ihren Inhalt als Karte von Angular Material, also als umrandeten Kasten mit Überschrift und Inhalt. `ServerStatus` zeigt „Erneut verbinden“ als Knopf von Angular Material. Beide Komponenten bekommen ihre Daten über Inputs, also über Eigenschaften, die die einbindende Seite setzt. Angular Material ist ein Vorschlag und lässt sich austauschen.
- `fhir-vitals/angular/ui/dashboard` ist ein minimales Dashboard-Beispiel. `VitalsDashboard` zeigt eine feste Kachel, also ein Rechteck mit Titel und Inhalt, mit dem Blutdruckverlauf aus `BloodPressureChart`. Die Messwerte kommen über das Input `history`. Das Beispiel nutzt gridstack für das Raster, Chart.js über ng2-charts für das Diagramm und Angular Material für die Karte. Diese Bibliotheken sind ein Vorschlag und lassen sich austauschen.

Der Paketname `fhir-vitals` allein ist ein leerer Platzhalter.
Auch `fhir-vitals/angular` und `fhir-vitals/angular/ui` sind keine Einstiegspunkte.

## peerDependencies

Eine peerDependency ist ein Paket, das die Bibliothek voraussetzt, das aber die einbindende Anwendung selbst installiert.
Pflicht sind `fhirclient` und `@types/fhir`.
Optional sind `@angular/core`, `@angular/common`, `@angular/cdk`, `@angular/material`, `chart.js`, `gridstack` und `ng2-charts`.
npm installiert optionale peerDependencies nicht von selbst.
Eine App mit Vue, einem anderen Framework für Webanwendungen, die nur `fhir-vitals/core` und `fhir-vitals/fhir` nutzt, bekommt deshalb weder Angular noch die vorgeschlagenen Bibliotheken.
Eine Angular-App installiert für `angular/data` nur `@angular/core` und `@angular/common` selbst.
Für `angular/ui/cards` kommen `@angular/cdk` und `@angular/material` dazu.
Für `angular/ui/dashboard` kommen außerdem `chart.js`, `gridstack` und `ng2-charts` dazu.

## Globale Styles

Angular Material braucht ein Theme, also Farben, Schriften und Abstände für seine Komponenten.
Das gilt für die Karten in `angular/ui/cards` ebenso wie für die Kachel im Dashboard-Beispiel.
gridstack braucht im Dashboard-Beispiel eigene Styles für Elemente, für die die Styles einer Komponente nicht gelten.
In einer Angular-App stehen beide unter `styles` in `angular.json`.
Die Demo-App nutzt diese Einträge:

```json
"styles": [
  "@fontsource/roboto/latin-400.css",
  "@fontsource/roboto/latin-500.css",
  "@angular/material/prebuilt-themes/azure-blue.css",
  "gridstack/dist/gridstack.min.css",
  "projects/demo-app/src/styles.css"
]
```

Ohne `gridstack/dist/gridstack.min.css` füllt die Karte die Kachel nicht aus.
Die ebenfalls vorgeschlagene Schrift Roboto kommt aus dem Paket `@fontsource/roboto` vom eigenen Server statt von Google Fonts.

Aufbau, Regeln zwischen den Schichten, Befehle und Hintergründe stehen im [README des Repositorys](https://github.com/forschungsgruppe-digital-health/angular-fhir-vitals#readme).

Lizenz: Apache-2.0. Alle Beispieldaten sind synthetisch.

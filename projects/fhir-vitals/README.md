# fhir-vitals

Angular-Bibliothek für Vitalparameter über HL7 FHIR R4.

Sie besteht aus vier Einstiegspunkten, also Teilpaketen mit eigenem Importnamen:

- `fhir-vitals/core` enthält den Ablauf `VitalsSync` und die Ports, ohne Angular und ohne Serverzugriff. Ein Port ist eine Schnittstelle, die beschreibt, was der Ablauf von außen braucht.
- `fhir-vitals/fhir` enthält Adapter für diese Ports mit fhirclient und mit fetch, ebenfalls ohne Angular. Ein Adapter setzt einen Port mit einer bestimmten Technik um.
- `fhir-vitals/angular/data` ist die Angular-Datenschicht mit `FhirAssets` und `VitalsFacade`. Die Facade ist ein einfacher Zugang für Komponenten. Sie bietet den Zustand des Ablaufs als Signal an, also als Wert, dessen Änderungen Angular verfolgt.
- `fhir-vitals/angular/ui` enthält die Komponenten `PatientCard` und `ServerStatus`. Sie bekommen ihre Daten über Inputs, also über Eigenschaften, die die einbindende Seite setzt.

Der Paketname `fhir-vitals` allein ist ein leerer Platzhalter, und `fhir-vitals/angular` ist kein Einstiegspunkt.

Andere UI-Frameworks wie Vue können den Code von `fhir-vitals/core` und `fhir-vitals/fhir` nutzen.
Als npm-Paket bringt `fhir-vitals` aber noch Angular als peerDependency mit.
Eine peerDependency ist ein Paket, das die Bibliothek voraussetzt, das aber die einbindende Anwendung selbst installiert.

Aufbau, Regeln zwischen den Schichten, Befehle und Hintergründe stehen im [README des Repositorys](https://github.com/forschungsgruppe-digital-health/angular-fhir-vitals#readme).

Lizenz: Apache-2.0. Alle Beispieldaten sind synthetisch.

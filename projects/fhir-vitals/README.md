# fhir-vitals

Angular-Bibliothek für Vitalparameter über HL7 FHIR R4.

Ein Service ist eine Klasse mit Logik ohne eigene Oberfläche.
Assets sind statische Dateien, die eine Anwendung unverändert mit ausliefert.
Die Bibliothek enthält zwei Services:

- `FhirAssets` lädt Beispielressourcen als JSON aus den Assets der Anwendung.
- `FhirServer` verbindet sich mit einem FHIR-Server, wenn die Anwendung einen konfiguriert. Ohne Server läuft die Anwendung trotzdem. PUT speichert eine Ressource unter ihrer ID, GET liest sie.

Aufbau, Befehle und Hintergründe stehen im [README des Repositorys](https://github.com/forschungsgruppe-digital-health/angular-fhir-vitals#readme).

Lizenz: Apache-2.0. Alle Beispieldaten sind synthetisch.

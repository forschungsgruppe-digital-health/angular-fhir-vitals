# Architektur von fhir-vitals

Dieser Ordner beschreibt die Architektur des Starters nach arc42.
arc42 ist eine Vorlage für Architekturdokumentation mit zwölf festen Kapiteln.
Das Patientenportal ist eine Anwendung der Forschungsgruppe.
Es dokumentiert seine Architektur ebenfalls nach arc42.
Jedes Kapitel steht in einer eigenen Datei.
Die Kapitel 10 „Qualitätsanforderungen“ und 11 „Risiken und technische Schulden“ fehlen, weil es zu ihnen im Starter keine Inhalte gibt.
Wie sich die Demo-App starten und bedienen lässt, beschreibt das [README des Repositorys](../../README.md).
Die Kapitel 2 bis 4 nutzen Begriffe, die erst Kapitel 5 erklärt, etwa Asset, Schicht, Feature, Port, Adapter und Facade.
Das [Glossar](12-glossar.md) erklärt sie kurz.
Die Teile zu HAPI FHIR gehören zum nächsten Semester, siehe [README, Abschnitt 1](../../README.md#1-worum-es-geht).
Das betrifft vor allem die Kapitel 3 und 7.

| Datei | Inhalt |
|---|---|
| [01-einfuehrung-und-ziele.md](01-einfuehrung-und-ziele.md) | Zweck des Starters und Verweise auf das README |
| [02-randbedingungen.md](02-randbedingungen.md) | Versionen der Pakete und Werkzeuge, ausgerichtet am Patientenportal, mit Gründen für jede Abweichung |
| [03-kontextabgrenzung.md](03-kontextabgrenzung.md) | wer die Anfragen an Assets und HAPI FHIR schickt, Ursprünge und CORS zwischen Demo-App und HAPI FHIR |
| [04-loesungsstrategie.md](04-loesungsstrategie.md) | Facade, Port, Adapter und Ablauf aus Folie 73 des Vortrags „Technologiestack“ |
| [05-bausteinsicht.md](05-bausteinsicht.md) | Projektaufbau, Schichten und Einstiegspunkte, Karten, Dashboard-Beispiel und das Diagramm zum Zusammenspiel der Teile |
| [06-laufzeitsicht.md](06-laufzeitsicht.md) | was beim Start der Demo-App Schritt für Schritt passiert |
| [07-verteilungssicht.md](07-verteilungssicht.md) | wo Demo-App und HAPI FHIR laufen |
| [08-querschnittliche-konzepte.md](08-querschnittliche-konzepte.md) | Beispieldaten und ihre FHIR-Codes, Dev-Container und Werkzeuge |
| [09-architekturentscheidungen.md](09-architekturentscheidungen.md) | vorgeschlagene Bibliotheken, ihre Alternativen und wie sich eine Bibliothek ersetzen lässt |
| [12-glossar.md](12-glossar.md) | Erklärungen der Begriffe aus README und Architektur |

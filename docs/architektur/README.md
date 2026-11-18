# Architektur von fhir-vitals

Dieser Ordner beschreibt die Architektur des Starters nach arc42, einer Vorlage mit zwölf festen Kapiteln.
Das Patientenportal der Forschungsgruppe nutzt dieselbe Vorlage.
Jedes Kapitel steht in einer eigenen Datei.
Die Kapitel 10 „Qualitätsanforderungen“ und 11 „Risiken und technische Schulden“ fehlen, weil es zu ihnen im Starter keine Inhalte gibt.
Nach dem [Schnellstart im README](../../README.md#3-schnellstart) genügen für den Einstieg die Kapitel 4 bis 6.
Die übrigen Kapitel dienen zum Nachschlagen.
Teile zu HAPI FHIR gehören zum nächsten Semester und tragen den Hinweis „Nächstes Semester“, vor allem in den Kapiteln 3, 6, 7 und 8, siehe [README, Abschnitt 1](../../README.md#1-worum-es-geht).
Begriffe wie Port, Adapter und Facade erklärt das [Glossar](12-glossar.md).

| Datei | Inhalt |
|---|---|
| [01-einfuehrung-und-ziele.md](01-einfuehrung-und-ziele.md) | Zweck des Starters und Verweise auf das README |
| [02-randbedingungen.md](02-randbedingungen.md) | Versionen der Pakete und Werkzeuge, ausgerichtet am Patientenportal, mit Gründen für jede Abweichung |
| [03-kontextabgrenzung.md](03-kontextabgrenzung.md) | wer die Anfragen an Webserver und HAPI FHIR schickt, als Diagramm, dazu Ursprünge und CORS |
| [04-loesungsstrategie.md](04-loesungsstrategie.md) | Facade, Ablauf, Ports und Adapter aus Folie 73 des Vortrags „Technologiestack“, als Diagramm |
| [05-bausteinsicht.md](05-bausteinsicht.md) | Überblick mit Diagramm und Tabelle, Regeln zwischen den Schichten, wohin neuer Code gehört, Karten und Dashboard-Beispiel, ein neues UI-Feature anlegen, Bibliothek als npm-Paket und Projektaufbau |
| [06-laufzeitsicht.md](06-laufzeitsicht.md) | was beim Start der Demo-App passiert, als Diagramm mit kurzen Erläuterungen |
| [07-verteilungssicht.md](07-verteilungssicht.md) | wo Demo-App, Dev-Container und HAPI FHIR laufen und welche Ports sie belegen, als Diagramm |
| [08-querschnittliche-konzepte.md](08-querschnittliche-konzepte.md) | Beispieldaten und ihre FHIR-Codes, Dev-Container und Werkzeuge, Barrierefreiheit |
| [09-architekturentscheidungen.md](09-architekturentscheidungen.md) | vorgeschlagene Bibliotheken, ihre Alternativen und wie sich eine Bibliothek ersetzen lässt |
| [12-glossar.md](12-glossar.md) | Erklärungen der Begriffe aus README und Architektur |

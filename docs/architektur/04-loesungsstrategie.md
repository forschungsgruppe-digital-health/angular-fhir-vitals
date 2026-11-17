# 4 Lösungsstrategie

Teil der [Architektur von fhir-vitals](README.md).

Die Bibliothek zeigt die Architektur aus Folie 73 des Vortrags „Technologiestack“ an einem einzigen Beispiel, dem Blutdruck:

- **Facade:** `VitalsFacade` ist der einfache Zugang, über den Angular-Komponenten Vitalparameter anzeigen, ohne FHIR zu kennen.
- **Port:** `ResourceLoader` und `FhirServerConnection` in `fhir-vitals/core` beschreiben, was der Ablauf von außen braucht. Mit dem Port aus [README, Abschnitt 3](../../README.md#3-schnellstart), also einer Nummer wie 4200, hat dieser Begriff nichts zu tun.
- **FHIR-Adapter:** `FhirClientConnection` in `fhir-vitals/fhir` setzt den Port mit fhirclient um. Ein anderer Adapter kann später den FHIR-Zugang des Patientenportals nutzen.
- **Ablauf:** `VitalsSync` in `fhir-vitals/core` enthält den ganzen Ablauf der Demo, vom Laden der Beispieldaten bis zum Zurücklesen der gespeicherten Messung vom Server. Er hängt von keinem UI-Framework ab, damit auch eine Oberfläche mit Vue oder einem anderen Framework ihn nutzen kann.

Die Foliennummer steht unten auf jeder Folie und weicht von der Seitenzahl im PDF ab.

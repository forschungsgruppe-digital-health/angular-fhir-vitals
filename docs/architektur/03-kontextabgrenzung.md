# 3 Kontextabgrenzung

Teil der [Architektur von fhir-vitals](README.md).

Die Demo-App läuft vollständig im Browser.
Alle Anfragen an die Assets und an HAPI schickt deshalb der Browser.

Ein Ursprung ist die Kombination aus Protokoll, Rechnername und Port, etwa `http://localhost:4200`.
Seite und HAPI haben verschiedene Ursprünge, weil sie auf verschiedenen Ports laufen.
Der Browser lässt die Seite die Antworten von HAPI nur lesen, wenn HAPI das per CORS (Cross-Origin Resource Sharing) erlaubt.
Vor einem PUT fragt der Browser HAPI vorher um Erlaubnis.
HAPI erlaubt in der Voreinstellung des Images alle Ursprünge, auch `http://localhost:4200`.

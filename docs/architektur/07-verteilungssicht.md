# 7 Verteilungssicht

Teil der [Architektur von fhir-vitals](README.md).

Der Browser läuft immer auf dem eigenen Rechner.
Er lädt die Demo-App unter `http://localhost:4200`.
Auch die Anfragen an den FHIR-Server unter Port 8080 schickt er selbst.
In diesem Semester läuft dort noch kein FHIR-Server.
Docker und VS Code leiten Ports aus den Containern an den eigenen Rechner weiter, etwa Port 80 von nginx als Port 4200.
Gepunktete Pfeile funktionieren erst im nächsten Semester.

```mermaid
flowchart TB
  accTitle: Wo Demo-App und HAPI FHIR laufen
  accDescr: Der Browser auf dem eigenen Rechner lädt die Demo-App unter localhost:4200. Sie kommt entweder von nginx im Container demo-app oder vom Entwicklungsserver im Dev-Container, den VS Code weiterleitet. Der Container demo-app liest config.json als Bind-Mount aus dem Repository. Die FHIR-Anfragen schickt der Browser an localhost:8080. Dort antwortet erst im nächsten Semester HAPI FHIR. GitHub Pages betrifft nur die Betreuung.
  subgraph Host["Eigener Rechner"]
    Browser["Browser"]
    Config["config.json im Repository"]
    subgraph Docker["Docker"]
      Nginx["Container<br>demo-app: nginx"]
      DevServer["Dev-Container: Entwicklungsserver, weitergeleitet von VS Code"]
      Hapi["Container fhir: HAPI FHIR, nächstes Semester"]
    end
  end
  Pages["GitHub Pages, nur Betreuung"]
  Browser -- "localhost:4200" --> Nginx
  Browser -- "localhost:4200" --> DevServer
  Browser -. "localhost:8080" .-> Hapi
  Config -- "Bind-Mount" --> Nginx
  Browser --> Pages
```

Beide Wege zur Demo-App belegen Port 4200.
Deshalb den Container demo-app und den Dev-Container nicht gleichzeitig betreiben, siehe die [Frage zu Port 4200](../../README.md#warum-ist-port-4200-belegt) und die [Frage zur Seite aus dem Dev-Container](../../README.md#warum-lädt-die-seite-aus-dem-dev-container-nicht).
Auch ohne Container wie in [README, Abschnitt 3.5](../../README.md#35-ohne-container-nicht-empfohlen) belegt der Entwicklungsserver Port 4200.
GitHub Pages hat keinen FHIR-Server und betrifft nur die Betreuung, siehe [README, Abschnitt 4.4](../../README.md#44-für-die-betreuung-github-pages).
Wie Demo-App und HAPI FHIR starten, beschreiben [README, Abschnitt 3](../../README.md#3-schnellstart) und [README, Abschnitt 4](../../README.md#4-befehle).
Den Dev-Container beschreibt [Kapitel 8](08-querschnittliche-konzepte.md#dev-container-und-werkzeuge).

> [!NOTE]
> Nächstes Semester.
> Im Dev-Container meint `localhost` den Container.
> Die Seite aus dem Dev-Container erreicht HAPI trotzdem, denn die Anfragen schickt der Browser auf dem eigenen Rechner, siehe die [Frage zu `curl`](../../README.md#warum-erreicht-curl-im-dev-container-hapi-nicht).
> Ein Test dieser Kombination im Browser fehlt noch.

# 8 Querschnittliche Konzepte

Teil der [Architektur von fhir-vitals](README.md).

## Die Beispieldaten und ihre Codes

Die drei Beispieldateien `patient.json`, `blutdruck.json` und `blutdruck-verlauf.json` liegen unter `projects/demo-app/public/assets/fhir/` und sind im Browser als `assets/fhir/…` erreichbar.
Sie sind synthetisch und gehören zum Beispielpatienten Herrn K. aus dem Softwareprojekt.
Den Typ einer FHIR-Ressource nennt ihr Feld `resourceType`.

**`patient.json`** ist eine Ressource vom Typ [Patient](https://hl7.org/fhir/R4/patient.html) mit der festen ID `beispiel-01`.
Sie enthält eine Kennung `4711`, den Namen „Herr K.“, das Geschlecht `male` und das Geburtsjahr `1959`.

**`blutdruck.json`** ist eine Ressource vom Typ [Observation](https://hl7.org/fhir/R4/observation.html), also eine Messung oder Beobachtung, mit der festen ID `blutdruck-01`.
Sie folgt dem [Blutdruckprofil](https://hl7.org/fhir/R4/bp.html) aus FHIR R4, also einer Vorgabe für ihre Felder und Codes.
Codes sind hier feste Kennungen aus Codesystemen wie LOINC und UCUM, siehe [Glossar](12-glossar.md).

| Feld | Wert | Bedeutung |
|---|---|---|
| `meta.profile` | `http://hl7.org/fhir/StructureDefinition/bp` | Die Ressource erklärt, dass sie dem Blutdruckprofil folgt. |
| `category` | `vital-signs` | Die Messung gehört zu den [Vitalparametern](https://hl7.org/fhir/R4/observation-vitalsigns.html). |
| `code` | LOINC `85354-9` | das Blutdruck-Panel, englisch „Blood pressure panel with all children optional“ |
| `component[0].code` | LOINC `8480-6` | der systolische Wert, englisch „Systolic blood pressure“ |
| `component[1].code` | LOINC `8462-4` | der diastolische Wert, englisch „Diastolic blood pressure“ |
| `component[0].valueQuantity.code`, `component[1].valueQuantity.code` | UCUM `mm[Hg]` | die Einheit Millimeter Quecksilbersäule |
| `subject`, `performer` | `Patient/beispiel-01` | Die Messung gehört zu Herrn K., und er hat sie selbst gemessen. |
| `effectiveDateTime` | `2026-06-01T07:35:00+02:00` | Zeitpunkt der Messung |

Von den Feldern der Tabelle liest die Bibliothek nur die [LOINC](https://loinc.org)-Codes in `component`, die Werte in `valueQuantity` und den Zeitpunkt in `effectiveDateTime`.
Für die Anzeige „104/66 mm[Hg]“ liest sie außerdem die [UCUM](https://ucum.org)-Einheit des systolischen Werts.
Die übrigen Felder brauchen Server und andere Systeme.
Die Anzeigenamen der drei LOINC-Codes stimmen mit tx.fhir.org überein, einem Terminologieserver für Codesysteme wie LOINC.

**`blutdruck-verlauf.json`** ist ein [FHIR-Bundle](https://hl7.org/fhir/R4/bundle.html) vom Typ `collection`, also eine reine Sammlung anderer Ressourcen in der Liste `entry`.
Es enthält sieben Observations von Herrn K. vom 26.05. bis 01.06.2026, aufgebaut wie `blutdruck.json`.
Die letzte ist identisch mit `blutdruck.json`.
So endet das Diagramm mit dem Wert, den die Seite mit HAPI FHIR im nächsten Semester als „Blutdruck vom Server“ zeigt.

Jeder Eintrag hat neben `resource` ein Feld `fullUrl`, etwa `https://example.org/fhir/Observation/blutdruck-verlauf-01`.
`fullUrl` nennt die vollständige Adresse der Ressource im Eintrag.
`example.org` ist eine Adresse für Beispiele und kein echter FHIR-Server.

> [!NOTE]
> Nächstes Semester.
> Die FHIR-Operation `$validate` prüft eine Ressource auf dem Server gegen den Standard und gegen ihre Profile.
> Ohne `fullUrl` meldete sie für das Bundle 28 Fehler, etwa `Bundle entry missing fullUrl`.
> Auf dem lokalen HAPI FHIR 8.12.0 ergab sie am 05.11. und 06.11.2026 für alle drei Beispieldateien keine Fehler, auch für die Observation gegen das Blutdruckprofil.
> Die Warnungen betrafen nur die auf diesem Server unbekannten LOINC-Codes und die fehlende Narrative, also einen lesbaren Text im Feld `text`.

**Prüfen in Visual Studio Code.**
`.vscode/settings.json` ordnet allen JSON-Dateien unter `projects/*/public/assets/fhir/` das JSON-Schema von HL7 für FHIR R4 zu, also eine Beschreibung der erlaubten Felder und Werte.
VS Code prüft diese Dateien damit schon beim Tippen und schlägt Feldnamen und erlaubte Werte vor.
Ein Verstoß erscheint als gelbe Wellenlinie und in der Ansicht „Problems“.
Steht in `patient.json` bei `gender` zum Beispiel der Wert `mann`, lautet die Meldung `Value is not accepted. Valid values: "male", "female", "other", "unknown".`
Für die drei Beispieldateien gibt es keine Meldung.
Das Schema prüft nur den Aufbau einer Ressource, nicht das Blutdruckprofil und nicht die LOINC-Codes.

Das übernimmt die empfohlene Erweiterung FHIR tools mit dem offiziellen Validator von HL7.
Zum Prüfen eine Datei wie `patient.json` im Editor öffnen, in den Text rechtsklicken und „FHIR validate resource“ wählen.
Im Explorer links fehlt dieser Eintrag.
Beim ersten Mal meldet VS Code `The first time the jar validator must be downloaded. It may take a while!` und lädt den Validator, eine Datei von etwa 200 MB.
Danach zeigt das Terminal „Resource validation“ die Ausgabe des Validators.
Diese Angaben stammen aus dem Quelltext der Erweiterung und sind nicht geprüft.

VS Code lädt das Schema beim ersten Öffnen einer solchen Datei von hl7.org.
Die Prüfung gegen das Schema und die Erweiterung FHIR tools laufen nur in einem Ordner, dem VS Code vertraut.
Laut VS Code erscheint beim ersten Öffnen eines Ordners die Frage, ob die Autoren der Dateien vertrauenswürdig sind, siehe [README, Abschnitt 3.3](../../README.md#33-demo-app-weiterentwickeln-im-dev-container).
Ohne dieses Vertrauen öffnet VS Code den Ordner im eingeschränkten Modus, englisch Restricted Mode, und zeigt oben einen Hinweis mit dem Link „Manage“.
„Manage“ klicken und im folgenden Fenster „Trust“ wählen.
Danach verschwindet der Hinweis, und die Prüfung beginnt.

## Dev-Container und Werkzeuge

**Dev-Container.**
`.devcontainer/devcontainer.json` beschreibt den Dev-Container aus [README, Abschnitt 3.3](../../README.md#33-demo-app-weiterentwickeln-im-dev-container).
Sein Image entsteht aus `.devcontainer/Dockerfile` und bringt Node.js 22, Chromium und Java mit.
Das `Dockerfile` im Wurzelverzeichnis baut dagegen das Image der Demo-App mit nginx.
Kommentare in beiden Dateien begründen die Einstellungen.

| Einstellung | Wozu |
|---|---|
| `/etc/chromium.d/no-sandbox` im Image | Die Datei schaltet die Sandbox ab, mit der Chromium Webseiten vom übrigen System abschottet. Ohne diese Datei bricht Chromium mit `No usable sandbox!` ab, weil Docker einem Container die nötigen Rechte nicht gibt. Karma öffnet in diesem Browser nur die Tests des Projekts. |
| `CHROME_BIN` | Die Variable nennt Karma den Pfad zu Chromium. |
| `NODE_OPTIONS=--dns-result-order=ipv4first` | Node.js wählt damit `127.0.0.1` statt `::1`, siehe die [Frage zu 127.0.0.1](../../README.md#warum-zeigt-npm-start-im-dev-container-127001). |
| `mounts` | `node_modules` liegt in einem eigenen Volume, also einem Speicherbereich, den Docker selbst verwaltet. So ersetzen die Pakete für Linux nie die Pakete des eigenen Rechners. |
| `postCreateCommand` | Nach dem ersten Erstellen übergibt der Eintrag `node_modules` an den Benutzer `node` und führt dann `npm ci` aus. |
| `customizations.vscode` | VS Code installiert im Container die Erweiterungen aus `.vscode/extensions.json` außer Dev Containers. Prettier formatiert dort TypeScript, HTML und CSS beim Speichern wie `npm run format`. Außerhalb des Containers bleibt das aus. |
| `forwardPorts`, `portsAttributes` | VS Code leitet Port 4200 an den eigenen Rechner weiter. Port 9876 von Karma bleibt im Container. |

Am 17.11.2026 installierte VS Code 1.141.1 mit Dev Containers 0.473.0 unter macOS alle Erweiterungen der Liste im Container und leitete Port 4200 weiter.
Dass Prettier beim Speichern formatiert und Port 9876 im Container bleibt, ist nicht geprüft und stammt aus der Dokumentation von VS Code und der Spezifikation von `devcontainer.json`.
Ein Test unter Windows und Linux fehlt noch.

Docker legt für das Volume im Projektordner einen leeren Ordner `node_modules` an.
Unter Linux und WSL 2 kann er dem Administrator root gehören, und `npm ci` auf dem eigenen Rechner darf dann nicht hineinschreiben.
Bei geschlossenem Dev-Container entfernt `rmdir node_modules` den leeren Ordner.
Ein Test dafür fehlt noch.

**Zeilenenden.**
`.gitattributes` lässt Git alle Textdateien auf jedem System mit dem Zeilenende LF schreiben, wie `.editorconfig` und Prettier es erwarten.
Ohne diese Datei schreibt Git für Windows mit seiner Voreinstellung CRLF.
Laut Dokumentation von VS Code meldet Git im Dev-Container dann viele Dateien als geändert.

**Nutzungsdaten der Angular CLI.**
`"analytics": false` unter `cli` in `angular.json` sorgt wie im Patientenportal dafür, dass die Angular CLI keine Nutzungsdaten an das Angular-Team schickt.
Ohne diese Einstellung fragt die CLI bei Befehlen wie `ng generate` einmal, ob sie Nutzungsdaten schicken darf, und hält den Befehl bis zur Antwort an.
Die Frage beginnt mit `Would you like to share pseudonymous usage data about this project with the Angular Team at Google`.

## Barrierefreiheit

Angular Material, gridstack und Chart.js sind ein Vorschlag, siehe [Kapitel 9](09-architekturentscheidungen.md).
Die Demo-App, die Karten und das Dashboard-Beispiel setzen diese Punkte um:

- Die Überschriften folgen der Reihenfolge `h1` bis `h3`, siehe `app.html`, `patient-card.html`, `server-status.html` und `vitals-dashboard.html`.
- `<header>` und `<main>` sind Landmarken, zu denen ein Screenreader direkt springen kann, siehe `app.html`.
- Der Status trägt `role="status"` und ist damit eine Live-Region, also ein Bereich, dessen neuen Inhalt ein Screenreader von selbst vorliest, siehe `server-status.html`.
- „Erneut verbinden“ trägt `disabledInteractive`. Während eines Laufs setzt Angular Material deshalb statt `disabled` nur `aria-disabled="true"`, und der Knopf behält den Fokus, siehe `server-status.html` und `server-status.ts`.
- Das Diagramm im Canvas, einer Zeichenfläche aus Pixeln ohne lesbaren Text, hat `role="img"` und eine Textalternative in `aria-label`, siehe `blood-pressure-chart.html` und `blood-pressure-chart.ts`.
- Die beiden Reihen unterscheiden sich durch Linienart und Punktform und nicht nur durch die Farbe, siehe `blood-pressure-chart.ts`. Das verlangt Kriterium 1.4.1 „Use of Color“ der WCAG 2.2, der Richtlinien für barrierefreie Webinhalte.
- Ist im Betriebssystem die Einstellung für weniger Bewegung aktiv, zeichnet Chart.js ohne Animation. gridstack animiert nie, siehe `blood-pressure-chart.ts` und `vitals-dashboard.ts`.
- Ein Klick auf die Legende blendet keine Reihe aus, weil das nur mit der Maus ginge, siehe `blood-pressure-chart.ts`.

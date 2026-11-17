# 8 Querschnittliche Konzepte

Teil der [Architektur von fhir-vitals](README.md).

## Die Beispieldaten und ihre Codes

Die drei Beispieldateien `patient.json`, `blutdruck.json` und `blutdruck-verlauf.json` liegen unter `projects/demo-app/public/assets/fhir/` und sind im Browser als `assets/fhir/…` erreichbar.
Sie sind synthetisch und gehören zum Beispielpatienten Herrn K. aus dem Softwareprojekt.
Den Typ einer FHIR-Ressource nennt ihr Feld `resourceType`.

**`patient.json`** ist eine Ressource vom Typ [Patient](https://hl7.org/fhir/R4/patient.html) mit der festen ID `beispiel-01`.
Sie enthält eine Kennung `4711`, den Namen „Herr K.“, das Geschlecht `male` und das Geburtsjahr `1959`.

**`blutdruck.json`** ist eine Ressource vom Typ [Observation](https://hl7.org/fhir/R4/observation.html), also eine Messung oder Beobachtung, mit der festen ID `blutdruck-01`.
Sie folgt dem [Blutdruckprofil](https://hl7.org/fhir/R4/bp.html) aus FHIR R4.
Ein Profil legt fest, welche Felder und Codes eine Ressource für einen bestimmten Zweck haben muss.
Ein Code ist hier eine feste Kennung aus einem Codesystem, etwa `8480-6` für den systolischen Wert, und hat mit Programmcode nichts zu tun.
Mit dem Profil in Compose aus [README, Abschnitt 3](../../README.md#3-schnellstart) hat der Begriff Profil nichts zu tun.

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

[LOINC](https://loinc.org) ist ein internationales Codesystem für Messungen und Laborwerte.
[UCUM](https://ucum.org) ist ein Codesystem für Maßeinheiten.
Ein Terminologieserver kennt Codesysteme wie LOINC und prüft Codes und Anzeigenamen.
Die Anzeigenamen der drei LOINC-Codes stimmen mit den Angaben des Terminologieservers tx.fhir.org überein.
Von den Feldern der Tabelle liest die Bibliothek nur die LOINC-Codes in `component`, die Werte in `valueQuantity` und den Zeitpunkt in `effectiveDateTime`.
Für die Anzeige „104/66 mm[Hg]“ liest sie außerdem die Einheit des systolischen Werts.
Die übrigen Felder brauchen Server und andere Systeme.
HAPI prüft etwa, ob der Verweis in `subject` auf einen vorhandenen Patienten zeigt.

**`blutdruck-verlauf.json`** ist ein [FHIR-Bundle](https://hl7.org/fhir/R4/bundle.html), also eine Ressource vom Typ `Bundle`.
Sie sammelt andere Ressourcen in der Liste `entry`.
Mit den JavaScript-Dateien aus dem Build hat dieses Bundle nichts zu tun.
Das Feld `type` hat den Wert `collection`.
Eine `collection` ist eine reine Sammlung ohne Auftrag an einen Server.
Ein Suchergebnis vom Server hat dagegen den Typ `searchset`.
`bloodPressureHistory()` in `fhir-vitals/core` liest beide Typen gleich und sortiert die Messungen nach der Zeit, die älteste zuerst.
Das Bundle enthält sieben Observations von Herrn K., aufgebaut wie `blutdruck.json`, mit denselben Codes und derselben Einheit.
Die letzte ist identisch mit `blutdruck.json`.
So endet das Diagramm mit demselben Wert, den die Seite als „Blutdruck vom Server“ zeigt.

| ID | `effectiveDateTime` | systolisch | diastolisch |
|---|---|---|---|
| `blutdruck-verlauf-01` | `2026-05-26T07:40:00+02:00` | 112 | 72 |
| `blutdruck-verlauf-02` | `2026-05-27T07:30:00+02:00` | 108 | 70 |
| `blutdruck-verlauf-03` | `2026-05-28T07:45:00+02:00` | 115 | 74 |
| `blutdruck-verlauf-04` | `2026-05-29T07:35:00+02:00` | 110 | 71 |
| `blutdruck-verlauf-05` | `2026-05-30T08:05:00+02:00` | 106 | 68 |
| `blutdruck-verlauf-06` | `2026-05-31T08:10:00+02:00` | 109 | 69 |
| `blutdruck-01` | `2026-06-01T07:35:00+02:00` | 104 | 66 |

Jeder Eintrag hat neben `resource` ein Feld `fullUrl`, etwa `https://example.org/fhir/Observation/blutdruck-verlauf-01`.
`fullUrl` nennt die vollständige Adresse der Ressource im Eintrag.
`example.org` ist eine Adresse für Beispiele und kein echter FHIR-Server.
Ohne `fullUrl` meldete `$validate` (siehe unten) 28 Fehler, etwa `Bundle entry missing fullUrl`.

Die FHIR-Operation `$validate` prüft eine Ressource gegen den Standard und gegen ihre Profile.
Auf dem lokalen HAPI FHIR 8.12.0 ergab sie am 05.11.2026 für `patient.json` und `blutdruck.json` keine Fehler.
Es gab nur Warnungen: LOINC ist auf dem lokalen Server unbekannt, und beiden Ressourcen fehlt eine Narrative, also ein lesbarer Text im Feld `text`.
Das gilt auch bei der Prüfung der Observation gegen das Blutdruckprofil.
Am 06.11.2026 ergab `$validate` auf demselben Server auch für jede der sieben Observations aus `blutdruck-verlauf.json` keine Fehler.
Jede hatte vier Warnungen: drei zu den unbekannten LOINC-Codes und eine zur fehlenden Narrative.
Für das ganze FHIR-Bundle gab es ebenfalls keine Fehler und 28 Warnungen, 21 zu LOINC und 7 zur Narrative.

**Prüfen in Visual Studio Code.**
Ein JSON-Schema beschreibt, welche Felder und Werte eine JSON-Datei haben darf.
HL7 veröffentlicht ein solches Schema für alle Ressourcen von FHIR R4.
Die Datei `.vscode/settings.json` ordnet es allen JSON-Dateien unter `projects/*/public/assets/fhir/` zu.
Visual Studio Code prüft diese Dateien damit schon beim Tippen und schlägt Feldnamen und erlaubte Werte vor.
Ein Verstoß erscheint als Warnung, also mit gelber Wellenlinie und in der Ansicht „Probleme“ (englisch „Problems“).
Steht in `patient.json` bei `gender` zum Beispiel der Wert `mann`, lautet die Meldung `Value is not accepted. Valid values: "male", "female", "other", "unknown".`
Für die drei Beispieldateien gibt es keine Meldung.
VS Code lädt das Schema beim ersten Öffnen einer solchen Datei von hl7.org.
Dafür muss der Ordner als vertrauenswürdig gelten.
VS Code öffnet einen neuen Ordner zunächst im eingeschränkten Modus, englisch Restricted Mode, und zeigt oben einen Hinweis mit dem Link „Manage“.
In diesem Modus prüft VS Code die FHIR-Dateien nicht gegen das Schema, und die Erweiterung FHIR tools bleibt abgeschaltet.
„Manage“ klicken und im folgenden Fenster „Trust“ wählen.
Danach verschwindet der Hinweis, und die Prüfung beginnt.
Das Schema prüft nur den Aufbau einer Ressource.
Profile wie das Blutdruckprofil und die LOINC-Codes prüft es nicht.

Das übernimmt die empfohlene Erweiterung FHIR tools.
Ein Validator ist ein Programm, das eine Ressource gegen den Standard, ihre Profile und die Codesysteme prüft.
FHIR tools nutzt den offiziellen Validator von HL7 und braucht dafür Java 17 oder neuer.
Zum Prüfen eine Datei wie `patient.json` im Editor öffnen, in den Text rechtsklicken und „FHIR validate resource“ wählen.
Im Explorer links fehlt dieser Eintrag.
Beim ersten Mal meldet VS Code `The first time the jar validator must be downloaded. It may take a while!` und lädt den Validator, eine Datei von etwa 200 MB.
Danach öffnet sich das Terminal „Resource validation“ und zeigt die Ausgabe des Validators.
Diese Angaben stammen aus dem Quelltext der Erweiterung.
Die Erweiterung selbst lief für diese Dokumentation nicht.

## Dev-Container und Werkzeuge

**Dev-Container.**
`.devcontainer/devcontainer.json` beschreibt den Dev-Container aus Variante D in [README, Abschnitt 3](../../README.md#3-schnellstart).
Sein Image entsteht aus `.devcontainer/Dockerfile`.
Mit dem `Dockerfile` im Wurzelverzeichnis hat es nichts zu tun, denn dieses baut das Image der Demo-App mit nginx für die Auslieferung.
Das Image des Dev-Containers beruht auf `mcr.microsoft.com/devcontainers/javascript-node` mit Node.js 22.
Es ergänzt Chromium und Java aus den Paketen von Debian, dem Linux-System im Image.
Die Sandbox ist ein Schutz von Chromium, der Webseiten vom übrigen System abschottet.
Sie braucht Rechte, die Docker einem Container standardmäßig nicht gibt.
Ohne weitere Einstellung bricht Chromium im Container deshalb mit `No usable sandbox!` ab.
Die Datei `/etc/chromium.d/no-sandbox` im Image schaltet die Sandbox ab.
Karma öffnet in diesem Browser nur die Tests des Projekts.
`CHROME_BIN` nennt Karma den Pfad zu Chromium.

Der Ordner `node_modules` liegt im Dev-Container in einem eigenen Volume, also einem Speicherbereich, den Docker selbst verwaltet und in den Container einbindet.
So ersetzen die Pakete für Linux nie die Pakete des eigenen Rechners.
`docker volume ls` zeigt das Volume mit einem Namen wie `angular-fhir-vitals-node_modules-0r75pjv8…`.
Docker legt dafür im Projektordner einen leeren Ordner `node_modules` an.
Unter Linux und WSL 2 kann dieser Ordner dem Benutzer root gehören, also dem Administrator des Systems.
`npm ci` auf dem eigenen Rechner darf dann nicht hineinschreiben.
Bei geschlossenem Dev-Container entfernt `rmdir node_modules` den leeren Ordner.
Ein Test unter Linux und WSL 2 fehlt dafür noch.
Der Eintrag `postCreateCommand` in `devcontainer.json` nennt Befehle, die nach dem ersten Erstellen des Containers laufen.
Er übergibt zuerst den Ordner `node_modules` an den Benutzer `node` im Container und führt dann `npm ci` aus.

Der Eintrag `customizations.vscode` gilt nur für VS Code.
Dort stehen die Erweiterungen aus `.vscode/extensions.json` außer Dev Containers selbst und Einstellungen nur für den Container.
VS Code installiert diese Erweiterungen im Container von selbst.
Im Container formatiert Prettier außerdem TypeScript, HTML und CSS beim Speichern, wie `npm run format`.
Außerhalb des Containers bleibt das aus, weil diese Einstellungen nur in `.devcontainer/devcontainer.json` stehen.
Nur im Container ist die Erweiterung Prettier sicher installiert.
VS Code leitet Port 4200 an den eigenen Rechner weiter.
Port 9876 von Karma braucht nur der Browser im Container.
Deshalb leitet VS Code ihn nicht von selbst weiter.
Diese Angaben zu VS Code stammen aus der Dokumentation von VS Code und der Spezifikation von `devcontainer.json`.
Ein Test in VS Code selbst fehlt noch.

**Zeilenenden.**
Das Zeilenende ist das unsichtbare Zeichen am Ende jeder Zeile einer Textdatei.
Linux und macOS nutzen dafür das Zeichen LF (Line Feed, Zeilenvorschub).
Windows nutzt die zwei Zeichen CRLF (Carriage Return und Line Feed).
`.editorconfig` und Prettier erwarten LF.
`.gitattributes` lässt Git alle Textdateien auf jedem System mit LF in den Arbeitsordner schreiben.
Ohne diese Datei schreibt Git für Windows mit seiner Voreinstellung CRLF.
Laut Dokumentation von VS Code meldet Git im Dev-Container dann viele Dateien als geändert.

**Nutzungsdaten der Angular CLI.**
Ohne Einstellung fragt die Angular CLI bei Befehlen wie `ng generate` einmal, ob sie Nutzungsdaten an das Angular-Team schicken darf.
Die Frage beginnt mit `Would you like to share pseudonymous usage data about this project with the Angular Team at Google` und hält den Befehl an, bis eine Antwort kommt.
`"analytics": false` unter `cli` in `angular.json` schaltet das für dieses Projekt ab, wie im Patientenportal.
Die CLI fragt dann nicht und schickt keine Nutzungsdaten.

# FHIR-Starter: Angular-Bibliothek für Vitalparameter

Startpunkt für den Workshop WW2 (#WW26-MiHUB) der Forschungsgruppe Digital Health an der TU Dresden.

## 1 Worum es geht

Dieses Repository enthält `fhir-vitals`, eine Bibliothek mit wiederverwendbarem Code für das Web-Framework Angular, und die Demo-App `demo-app`, die diese Bibliothek nutzt.
Die Demo-App zeigt einen synthetischen, also erfundenen Patienten und speichert auf Wunsch eine Blutdruckmessung auf einem FHIR-Server, also einem Server für Gesundheitsdaten nach dem Standard HL7 FHIR R4.
Im Workshop entsteht daraus Schritt für Schritt eine Bibliothek für Vitalparameter, die sich später in ein Patientenportal einbinden lässt.
Weiter unten zeigt eine Kachel, also ein Rechteck mit Titel und Inhalt, den Blutdruckverlauf aus sieben synthetischen Messungen als Liniendiagramm.
Sie ist ein minimales Beispiel für das Dashboard, also die Übersicht aus Kacheln, die im Workshop entsteht.
Die Bibliotheken für die Oberfläche sind ein Vorschlag, siehe [Architektur, Kapitel 9](docs/architektur.md#9-architekturentscheidungen).
Einen groben Einstieg in HL7 FHIR und die genutzten Technologien gibt der Vortrag [„Technologiestack“](https://datashare.tu-dresden.de/s/bdotfGe69FRNRZe) aus dem Workshop.
Der Link läuft zu einem festen Datum ab.

Die Datei [`docs/architektur.md`](docs/architektur.md) beschreibt die Architektur nach arc42, einer Vorlage für Architekturdokumentation mit festen Kapiteln.
Dort stehen die Versionen, die Architektur im Überblick, der Aufbau des Repositorys mit dem Zusammenspiel der Teile, der Ablauf beim Start, die Beispieldaten, der Vorschlag für die Bibliotheken und das [Glossar](docs/architektur.md#12-glossar).
Verweise wie „Architektur, Kapitel 5“ führen in `docs/architektur.md`.
Zum Starten genügen die Abschnitte 2 und 3 dieses README.
Zum Verstehen des Codes dienen danach Abschnitt 4 und die Kapitel [4](docs/architektur.md#4-lösungsstrategie), [5](docs/architektur.md#5-bausteinsicht) und [6](docs/architektur.md#6-laufzeitsicht) der Architektur.
Abschnitt 4 erklärt Begriffe wie Einstiegspunkt, Komponente und Chunk, die diese Kapitel voraussetzen.
Abschnitt 5 dient zum Nachschlagen.

## 2 Voraussetzungen

Angular ist ein Framework für Webanwendungen, die im Browser laufen.
Angular-Code ist in TypeScript geschrieben, einer Erweiterung von JavaScript um Typen.
Die Angular CLI (Command Line Interface) ist das Kommandozeilenwerkzeug `ng`.
Sie legt Projekte und Bausteine an, baut sie und startet Tests.
Ein Build übersetzt den TypeScript-Code in JavaScript-Dateien für den Browser und legt sie im Ordner `dist` ab.
Unit-Tests prüfen einzelne Klassen automatisch, ohne die ganze App zu starten.

Docker startet Programme in Containern.
Ein Container ist ein abgeschotteter Prozess mit eigenem Dateisystem.
Er entsteht aus einem Image, einer Vorlage mit Betriebssystemteilen, Programmen und Dateien.
Docker Compose startet mehrere Container gemeinsam nach der Beschreibung in `compose.yaml`.

Ein Dev-Container ist ein Container, in dem die ganze Entwicklungsumgebung läuft.
Der Editor Visual Studio Code, kurz VS Code, öffnet den Projektordner darin und nutzt die Programme im Container.
Die Beschreibung steht im Ordner `.devcontainer`.

Welche Werkzeuge aus der Tabelle nötig sind, hängt von der Variante in Abschnitt 3 ab.
Variante A ohne Docker braucht Git, Node.js und einen Browser.
Für die Unit-Tests kommt Google Chrome oder Chromium dazu.
Die Varianten B und C mit Docker brauchen Git, Docker und einen Browser, aber kein Node.js auf dem eigenen Rechner.
Für die Befehle mit `npm` und `npx` aus Abschnitt 4 braucht es Node.js wie in Variante A oder den Dev-Container aus Variante D.
Variante D im Dev-Container braucht auf dem eigenen Rechner Git, Docker, einen Browser und VS Code mit der Erweiterung Dev Containers.
Unter Windows kommt WSL 2 dazu, mit dem Windows Linux ausführt, siehe Variante D in Abschnitt 3.

| Werkzeug | Version | Wozu |
|---|---|---|
| [Node.js](https://nodejs.org) | 22 ab 22.22.3, 24 ab 24.15.0 oder 26. Geprüft mit 22.22.3. Das Docker-Image nutzt 22.23.4 und der Dev-Container 22.23.5. | führt die Angular CLI, den Build und die Tests aus. Die Datei `.nvmrc` nennt die Hauptversion 22 für den Versionsmanager [nvm](https://github.com/nvm-sh/nvm). |
| npm | kommt mit Node.js, geprüft mit 10.9.8. Der Dev-Container nutzt 10.9.9. | installiert die Pakete, also fremde Programmbibliotheken aus der npm-Registry |
| [Git](https://git-scm.com) | aktuelle Version | lädt das Repository herunter |
| [Docker Desktop](https://docs.docker.com/desktop/) oder [Docker Engine](https://docs.docker.com/engine/install/) mit Compose | geprüft mit Docker 29.9.2 und Compose 5.6.1. Der Dev-Container lief mit Docker 29.9.3. | startet Demo-App und FHIR-Server in Containern und führt den Dev-Container aus |
| Google Chrome oder Chromium | aktuelle Version | führt die Unit-Tests aus, ohne ein Fenster zu öffnen. Für Chromium die Umgebungsvariable `CHROME_BIN` setzen, also einen benannten Wert, den das Terminal an jedes gestartete Programm weitergibt, siehe Abschnitt 5. Der Dev-Container bringt Chromium mit und setzt `CHROME_BIN` selbst. |
| Java, JRE oder JDK (optional) | 17 oder neuer, aufrufbar als `java` | nur für die Prüfung mit der Erweiterung FHIR tools, siehe [Architektur, Kapitel 8](docs/architektur.md#die-beispieldaten-und-ihre-codes) unter „Prüfen in Visual Studio Code“. `java -version` zeigt die installierte Version, zum Beispiel `openjdk version "25.0.2"`. Der Dev-Container bringt Java 21 mit. |
| [Visual Studio Code](https://code.visualstudio.com) (optional) | aktuelle Version | Editor. Beim Öffnen des Ordners schlägt er sieben Erweiterungen vor: Angular Language Service für Vorschläge und Fehlermeldungen in den HTML-Dateien dieses Repositorys, ESLint und Prettier für Prüfung und Format des Codes, EditorConfig für die Einstellungen aus `.editorconfig`, Markdown Preview Mermaid Support für das Diagramm in [Architektur, Kapitel 5](docs/architektur.md#wie-die-teile-zusammenspielen), FHIR tools für die Prüfung von FHIR-Ressourcen und Dev Containers für Variante D. Mermaid ist eine Textsprache für Diagramme. VS Code prüft außerdem die FHIR-Beispieldateien beim Tippen. Einen neuen Ordner öffnet VS Code zunächst im eingeschränkten Modus. Darin bleiben diese Prüfung und Erweiterungen wie FHIR tools abgeschaltet, bis der Ordner als vertrauenswürdig gilt, siehe [Architektur, Kapitel 8](docs/architektur.md#die-beispieldaten-und-ihre-codes) unter „Prüfen in Visual Studio Code“. |
| Erweiterung [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) für Visual Studio Code (optional) | aktuelle Version | öffnet das Projekt im Dev-Container, siehe Variante D in Abschnitt 3 |

Die installierte Node.js-Version zeigt `node -v`, zum Beispiel `v22.22.3`.

## 3 Schnellstart

Unter Windows für Variante D das Repository nicht hier klonen, sondern wie in Variante D beschrieben in WSL 2.

Zuerst das Repository klonen und in den Ordner wechseln:

```bash
git clone https://github.com/forschungsgruppe-digital-health/angular-fhir-vitals.git
cd angular-fhir-vitals
```

Git meldet `Cloning into 'angular-fhir-vitals'...`.
Danach gibt es den Ordner `angular-fhir-vitals` mit unter anderem `package.json` und `README.md`.

### Variante A: ohne Docker

`npm start` startet den Entwicklungsserver von Angular.
Er liefert die Demo-App auf Port 4200 aus und lädt die Seite nach jeder Änderung neu.
Ein Port ist eine Nummer, unter der ein Programm auf einem Rechner erreichbar ist.

```bash
npm ci
npm start
```

Die Ausgabe von `npm ci` beschreibt Abschnitt 4.
Die Warnungen `npm warn deprecated` darin und die Zeile `… moderate severity vulnerabilities` betreffen nur Entwicklungswerkzeuge, siehe Abschnitt 5.
Nach `npm start` erscheint `Local: http://localhost:4200/`.
Danach http://localhost:4200 im Browser öffnen.
`localhost` ist der Name, unter dem ein Rechner sich selbst erreicht.
Oben steht eine Toolbar, also eine Leiste über die ganze Breite, mit dem Titel „FHIR-Starter“.
Darunter nennt ein kurzer Text Angular Material, gridstack und Chart.js einen Vorschlag, der sich austauschen lässt.
Diese drei Bibliotheken liefern fertige Bausteine.
Angular Material liefert zum Beispiel Karten, also umrandete Kästen mit Überschrift und Inhalt.
gridstack ordnet Kacheln in einem Raster aus Spalten und Zeilen an, und Chart.js zeichnet die Diagramme.
Es folgen zwei solche Karten.
Die Karte „Patient“ zeigt Herrn K.
Die Karte „FHIR-Server“ zeigt den Status „nicht erreichbar“, weil kein FHIR-Server läuft.
In einem breiten Fenster stehen beide Karten nebeneinander.
In einem schmalen Fenster stehen sie untereinander.
Darunter folgt die Überschrift „Dashboard“ mit dem Satz „Minimales Beispiel mit einer festen Kachel.“
Danach erscheint die Kachel „Blutdruckverlauf“ mit dem Diagramm der Messungen vom 26.05. bis 01.06.2026.
`Strg+C` im Terminal beendet den Entwicklungsserver.

### Variante B: mit Docker, nur die Demo-App

Im Container liefert der Webserver nginx die gebauten Dateien der Demo-App aus.
nginx lauscht im Container auf Port 80.
Docker leitet Port 4200 des eigenen Rechners dorthin weiter.

```bash
docker compose up --build
```

Docker baut das Image und startet den Container.
Danach zeigt http://localhost:4200 dasselbe wie in Variante A.
`Strg+C` im Terminal stoppt den Container.

### Variante C: mit Docker und dem FHIR-Server HAPI FHIR

In `compose.yaml` gehört der Dienst `fhir` zum Compose-Profil `fhir`.
Compose startet und stoppt ihn nur, wenn der Befehl `--profile fhir` enthält.

```bash
docker compose --profile fhir up --build
```

Dieser Befehl startet zusätzlich den FHIR-Server [HAPI FHIR](https://hapifhir.io) auf http://localhost:8080.
HAPI braucht nach dem Start etwa 40 Sekunden.
Bis dahin zeigt die Seite „nicht erreichbar“.
Danach auf der Seite „Erneut verbinden“ klicken.
Die Seite meldet „verbunden, Patient und Blutdruck gespeichert“ und zeigt „Blutdruck vom Server: 104/66 mm[Hg]“.
mm[Hg] steht für Millimeter Quecksilbersäule, die übliche Einheit für den Blutdruck.

Zum Beenden in einem zweiten Terminal `docker compose --profile fhir down` ausführen.
Docker meldet dann für beide Container `Removed`.
Ohne `--profile fhir` läuft HAPI weiter, siehe Abschnitt 5.

### Variante D: im Dev-Container mit Visual Studio Code

Der Dev-Container bringt Node.js 22, Chromium für die Unit-Tests und Java für die Erweiterung FHIR tools mit.
Auf dem eigenen Rechner sind Git, Docker und VS Code mit der Erweiterung Dev Containers nötig.
Docker muss dabei laufen, unter macOS und Windows also Docker Desktop.

WSL 2 (Windows Subsystem for Linux) führt Linux unter Windows aus.
Unter Windows kommt WSL 2 mit einem Linux-System wie Ubuntu dazu.
Das Repository dort im Linux-Heimatordner `~` klonen und nicht unter `/mnt/c`, denn das gehört zum Dateisystem von Windows.
Laut Docker ist der Zugriff auf Dateien im Linux-Dateisystem deutlich schneller.
Nur dort erhalten Linux-Container außerdem Meldungen über Dateien, die Programme unter Windows ändern.
Wie VS Code einen Ordner aus WSL 2 im Dev-Container öffnet, beschreibt die [Dokumentation von VS Code](https://code.visualstudio.com/docs/devcontainers/containers#_open-a-wsl-2-folder-in-a-container-on-windows).
Ein Test unter Windows fehlt für dieses README noch.

1. Den Ordner `angular-fhir-vitals` in VS Code öffnen.
2. Mit `F1` oder `Strg+Umschalt+P`, unter macOS `Cmd+Umschalt+P`, die Befehlspalette öffnen, also die Eingabezeile für alle Befehle von VS Code. Dort `Dev Containers: Reopen in Container` wählen. Laut Dokumentation fragt VS Code vor dem Neuladen des Fensters, ob der Ordner vertrauenswürdig ist. Was ohne dieses Vertrauen abgeschaltet bleibt, beschreibt [Architektur, Kapitel 8](docs/architektur.md#die-beispieldaten-und-ihre-codes) unter „Prüfen in Visual Studio Code“.
3. Beim ersten Mal baut Docker das Image aus `.devcontainer/Dockerfile`. Dafür lädt Docker zuerst das Basis-Image, also das fertige Image, auf dem dieses Image aufbaut. Danach lädt Docker Chromium und Java. Dann führt der Container `npm ci` von selbst aus. Im Test dauerte das ein bis drei Minuten. Die Ausgabe enthielt `added 611 packages, and audited 612 packages in 2m` und `9 moderate severity vulnerabilities`, siehe Abschnitt 5. Erst nach dem Ende dieser Ausgabe mit Schritt 4 weitermachen.
4. Im Terminal von VS Code `npm start` ausführen. Dieses Terminal läuft im Container. Es zeigt dieselben sechs Zeilen `Built fhir-vitals…` und `Local: http://localhost:4200/` wie in Variante A. Nach dem Speichern einer Änderung baut der Entwicklungsserver neu. Bei einer Änderung in `app.html` meldete er im Test `Component update sent to client(s).`
5. http://localhost:4200 im Browser des eigenen Rechners öffnen. Laut Dokumentation leitet VS Code Port 4200 des Containers an den eigenen Rechner weiter. Erwartet wird dieselbe Seite wie in Variante A. Die Ansicht „Ports“ von VS Code zeigt unter „Forwarded Address“, wohin VS Code den Port weiterleitet.

Im Container gibt es kein Docker.
Dort meldet `docker compose` nur `docker: command not found`.
Befehle mit `docker compose` deshalb in einem zweiten Terminal des eigenen Rechners im Ordner `angular-fhir-vitals` ausführen.
Unter macOS ist das die App Terminal.
Unter Windows ist es das Terminal von Ubuntu in WSL 2.
Laufen dort noch die Varianten B oder C, sie zuerst mit `docker compose --profile fhir down` beenden, siehe Abschnitt 5.
Danach startet `docker compose --profile fhir up -d fhir` nur HAPI FHIR im Hintergrund, ohne die Demo-App mit nginx.
Compose meldet `Container angular-fhir-vitals-fhir-1 Started`.
Wie in Variante C ist HAPI nach etwa 40 Sekunden bereit.
Danach auf der Seite „Erneut verbinden“ klicken.
Erwartet wird dieselbe Meldung wie in Variante C.
Die Demo-App erreicht HAPI unter http://localhost:8080, denn der Browser läuft auf dem eigenen Rechner und nicht im Container.
Ein Test der Demo-App aus dem Dev-Container zusammen mit HAPI im Browser fehlt noch.
`docker compose --profile fhir down` stoppt HAPI wieder und meldet `Container angular-fhir-vitals-fhir-1 Removed`.

Nach einer Änderung an `package-lock.json` im Terminal von VS Code erneut `npm ci` ausführen.
Nach einer Änderung im Ordner `.devcontainer` baut `Dev Containers: Rebuild Container` aus der Befehlspalette den Container neu.
Hintergründe zum Dev-Container, etwa zum Ordner `node_modules` unter Linux und WSL 2, stehen in [Architektur, Kapitel 8](docs/architektur.md#dev-container-und-werkzeuge) unter „Dev-Container und Werkzeuge“.

## 4 Befehle

Alle Befehle im Wurzelverzeichnis des Repositorys ausführen.
`npm run <name>` startet ein npm-Skript, also einen Eintrag unter `scripts` in `package.json`, etwa `npm run lint`.
Für `npm start` und `npm test` genügt der Name ohne `run`.
`npx` startet ein Programm aus den installierten Paketen, etwa mit `npx ng` die Angular CLI.
Bei Variante D gehören die Befehle mit `docker` ins Terminal des eigenen Rechners, siehe Abschnitt 3.
Jeder Befehl in diesen Tabellen ist am 05.11.2026 mit den Versionen aus [Architektur, Kapitel 2](docs/architektur.md#2-randbedingungen) gelaufen.
Nach dem Einbau des Dashboard-Beispiels liefen am 06.11.2026 unter macOS erneut: `npm ci`, `npm start`, `npx ng build fhir-vitals`, `npx ng test fhir-vitals --watch=false`, `npm test`, `npm run lint`, `npm run format` und `npm run build`, dazu in einer Kopie des Repositorys der neue Befehl für Komponenten im Dashboard.
Nach dem Umzug der Komponenten nach `angular/ui/cards` und `angular/ui/dashboard` liefen am selben Tag erneut: `npx ng build fhir-vitals`, `npx ng test fhir-vitals --watch=false`, `npm test`, `npm run lint`, `npm run format` und `npm run build`.
In einer Kopie des Repositorys liefen dazu `npm start`, beide Befehle für neue Komponenten, der Befehl für UI-Services und der Build mit und ohne die neue Zeile in `public-api.ts`.
Nach dem Umbau der Karten und des Grundgerüsts der Demo-App mit Angular Material liefen am selben Tag erneut: `npx ng build fhir-vitals`, `npx ng test fhir-vitals --watch=false`, `npm test`, `npm run lint`, `npm run format` und `npm run build`.
Dazu lief die Demo-App im Entwicklungsserver, einmal zusammen mit HAPI FHIR aus dem Compose-Profil `fhir`.
Die [Dev Containers CLI](https://github.com/devcontainers/cli) ist ein Kommandozeilenwerkzeug, das Dev-Container ohne VS Code baut und startet.
Am 17.11.2026 liefen damit in Version 0.90.0 im Dev-Container unter macOS `npm ci`, `npm start`, `npm test`, `npm run lint`, `npm run format` und `npm run build`.
Die Ausgaben im Terminal glichen denen ohne Container direkt unter macOS.
Nur `npm ci` meldete wie der Docker-Build unter Linux 611 Pakete.
Am selben Tag startete `docker compose --profile fhir up -d fhir` in einer Kopie des Repositorys nur HAPI FHIR.
Weil Port 8080 belegt war, lief HAPI dabei über eine Zusatzdatei auf Port 18080.
Die Schritte in VS Code aus Variante D stammen aus der Dokumentation von VS Code.
Ein Test in VS Code und im Browser fehlt dafür noch.
Die Spalte „Was danach zu sehen ist“ gibt die tatsächliche Ausgabe wieder.

### a) Bibliothek entwickeln

**Befehle für den Alltag.**
Die Datei `package-lock.json` hält die genauen Versionen aller Pakete fest.
Ein Commit speichert einen Stand des Codes in der Versionsverwaltung Git.
ESLint prüft den Code auf Fehler und Regelverstöße, ohne ihn auszuführen.
Prettier formatiert den Code einheitlich.
Karma ist der Testrunner, also das Programm, das die Unit-Tests im Browser startet.
Die Tests selbst nutzen die Bibliothek Jasmine.
Die Bibliothek besteht aus fünf Einstiegspunkten, also Teilpaketen mit eigenem Importnamen wie `fhir-vitals/core` oder `fhir-vitals/angular/ui/cards`.
Jeder Einstiegspunkt gehört zu einer Schicht mit einer festen Aufgabe.
[Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht) beschreibt, was in welche Schicht gehört.
Ein Chunk ist eine JavaScript-Datei, die der Build der Demo-App erzeugt.
Initial Chunks lädt der Browser sofort beim Start.
Ein Lazy Chunk kommt erst später dazu, hier mit dem Dashboard.
Ein Budget in `angular.json` ist eine Obergrenze für die Größe.
Ab 500 kB für alle Initial Chunks zusammen gibt der Build eine Warnung aus.
Angular schreibt am Ende des Builds `Application bundle generation complete`.
Bundle meint dort die gebauten JavaScript-Dateien und nicht ein FHIR-Bundle aus [Architektur, Kapitel 8](docs/architektur.md#die-beispieldaten-und-ihre-codes).

| Befehl | Wirkung | Wann nötig | Was danach zu sehen ist |
|---|---|---|---|
| `npm ci` | installiert alle Pakete genau nach `package-lock.json` und löscht vorher einen vorhandenen Ordner `node_modules` | einmal nach dem Klonen und nach jeder Änderung an `package-lock.json` | Nach einigen Sekunden bis wenigen Minuten erscheint `added … packages`. Die Zahl hängt vom Betriebssystem ab. Am 06.11.2026 meldete npm unter macOS `added 605 packages, and audited 606 packages in 10s`. Unter Linux meldete der Docker-Build am selben Tag mit derselben `package-lock.json` `added 611 packages in 8s`. Davor stehen Warnungen `npm warn deprecated` zu `inflight`, `rimraf` und `glob`. Sie stammen aus dem Testrunner Karma. Danach folgt eine Zeile wie `9 moderate severity vulnerabilities`, siehe Abschnitt 5. Die Zahl ändert sich mit der Datenbank bekannter Schwachstellen, die npm bei jedem Lauf abfragt. Am 06.11.2026 meldete npm 14 und am 17.11.2026 noch 9. |
| `npm start` | baut die Bibliothek einmal und startet die Demo-App mit dem Entwicklungsserver | zum Ausprobieren | sechs Zeilen `Built fhir-vitals…`, eine für das Paket und eine je Einstiegspunkt, danach `Local: http://localhost:4200/`. Im Browser erscheint die Seite „FHIR-Starter“ mit der Kachel „Blutdruckverlauf“. Die Konsole des Browsers meldet dabei `NG0751`, siehe Abschnitt 5. `Strg+C` beendet den Entwicklungsserver. |
| Terminal 1: `npm run watch:lib` | baut die Bibliothek mit allen Einstiegspunkten bei jeder gespeicherten Änderung neu | beim Arbeiten an der Bibliothek, zusammen mit Terminal 2 | `Compilation complete. Watching for file changes...`. Nach jeder Änderung folgt ein neuer Block mit `Build at: …`. Der Neubau dauerte im Test 0,1 bis 0,2 Sekunden. |
| Terminal 2: `npm run start:app` | startet nur die Demo-App, ohne die Bibliothek zu bauen | zusammen mit Terminal 1 | `Local: http://localhost:4200/`. Nach einer Änderung in der Bibliothek erscheint `Page reload sent to client(s).`, und der Browser lädt die Seite selbst neu. Vom Speichern bis zum Neuladen verging im Test weniger als eine Sekunde, für Änderungen in `core` ebenso wie in `angular/ui`. |
| `npx ng build fhir-vitals` | baut das Paket mit allen fünf Einstiegspunkten einmal nach `dist/fhir-vitals` | vor `npm run start:app`, wenn `watch:lib` nicht läuft | Sechs Zeilen `Built …` für `fhir-vitals`, `fhir-vitals/core`, `fhir-vitals/fhir`, `fhir-vitals/angular/data`, `fhir-vitals/angular/ui/cards` und `fhir-vitals/angular/ui/dashboard`, dann `Built Angular Package`. Die Reihenfolge ergibt sich aus den Abhängigkeiten: `core` kommt immer vor den Schichten, die es nutzen, sonst kann sie wechseln. Der Ordner `dist/fhir-vitals/fesm2022` enthält je Einstiegspunkt eine Datei `.mjs` und eine `.mjs.map`, etwa `fhir-vitals-core.mjs` und `fhir-vitals-angular-ui-cards.mjs`. |
| `npx ng test fhir-vitals --watch=false` | testet alle Einstiegspunkte der Bibliothek, direkt aus den Quellen | nach Änderungen an der Bibliothek | `TOTAL: 52 SUCCESS`. Dafür muss die Bibliothek vorher nicht gebaut sein. |
| `npm test` | baut die Bibliothek und testet dann Bibliothek und Demo-App nacheinander, ohne Watch-Modus | vor jedem Commit | Die sechs Zeilen `Built fhir-vitals…`, dann zwei Blöcke: zuerst `TOTAL: 52 SUCCESS` für die Bibliothek, dann `TOTAL: 3 SUCCESS` für die Demo-App. Im zweiten Block stehen vier Warnungen `WARN [web-server]: 404: /base/media/roboto-latin-…`, siehe Abschnitt 5. |
| `npm run lint` | prüft den Code mit ESLint, auch die Regeln zwischen den Schichten aus [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht) | vor jedem Commit | nur die beiden Kopfzeilen `> angular-fhir-vitals@0.0.0 lint` und `> eslint .`. Folgt keine weitere Ausgabe, hat ESLint nichts zu beanstanden. |
| `npm run format` | formatiert TypeScript, HTML und CSS mit Prettier | vor jedem Commit | eine Zeile je Datei. `(unchanged)` heißt, dass die Datei schon passte. |
| `npm run build` | baut erst die Bibliothek, dann die Demo-App für die Auslieferung | vor einer Auslieferung ohne Docker | sechs Zeilen `Built fhir-vitals…`, dann eine Tabelle `Initial chunk files` mit der Zeile `Initial total` und `329.44 kB`, geschätzt `89.83 kB` bei der Übertragung. Darunter steht `Lazy chunk files` mit der Zeile `fhir-vitals-angular-ui-dashboard` und `271.24 kB`, geschätzt `76.38 kB`. Eine Warnung zum Budget erscheint nicht. Am Ende folgen `Application bundle generation complete` und `Output location: …/dist/demo-app`. |

**Neue Bausteine anlegen.**
Eine Komponente ist ein Baustein der Oberfläche aus TypeScript-Klasse, HTML-Template und CSS.
Das Template ist das HTML der Komponente mit Platzhaltern für ihre Daten.
Der Selektor einer Komponente ist der Name des HTML-Elements, mit dem eine Seite sie einbindet, etwa `<lib-vitals-card>`.
Ein Service ist eine Klasse mit Logik ohne eigene Oberfläche, etwa für Datenzugriffe.
Der Decorator `@Service()` ist eine Markierung über der Klasse.
Angular erzeugt einen so markierten Service selbst und gibt ihn an alle Klassen weiter, die ihn brauchen.
`sourceRoot` in `angular.json` nennt den Quellordner eines Projekts.
`ng generate` legt neue Dateien ohne `--path` unter diesem Ordner an.
Für die Bibliothek zeigt `sourceRoot` auf `projects/fhir-vitals/angular/data/src`, also in die Angular-Datenschicht.

| Befehl | Wirkung | Wann nötig | Was danach zu sehen ist |
|---|---|---|---|
| `npx ng generate service <name> --project fhir-vitals` | legt einen Angular-Service in der Angular-Datenschicht `fhir-vitals/angular/data` an | für Services, die Daten laden oder den Zustand der Daten halten, etwa weitere Datenzugriffe mit HttpClient, dem HTTP-Dienst von Angular | Zwei Zeilen `CREATE projects/fhir-vitals/angular/data/src/lib/<name>.ts` und `…/<name>.spec.ts`. Die Klasse trägt den Decorator `@Service()`. Logik, die auch andere UI-Frameworks brauchen, gehört dagegen als Datei ohne Decorator nach `core`, siehe [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht). |
| `npx ng generate service <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/cards/src/lib` | legt einen UI-Service, also einen Service nur für die Oberfläche, im Einstiegspunkt `fhir-vitals/angular/ui/cards` an | für Logik der Oberfläche, etwa zum Öffnen eines Dialogs, siehe [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht) | Zwei Zeilen `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/<name>.spec.ts` und `…/<name>.ts`, jeweils mit der Größe in Bytes. Mit dem Namen `dialog-opener` heißt die Klasse `DialogOpener` und trägt ebenfalls `@Service()`. |
| `npx ng generate component <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/cards/src/lib` | legt eine Komponente im Einstiegspunkt `fhir-vitals/angular/ui/cards` an | für neue Anzeigen, etwa eine Karte mit Messwerten | Vier Zeilen `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/<name>/<name>.css`, `.spec.ts`, `.ts` und `.html`, jeweils mit der Größe in Bytes. Mit dem Namen `vitals-card` heißt die Klasse `VitalsCard` und der Selektor `lib-vitals-card`. Ohne `--path` landet die Komponente in der Angular-Datenschicht, wo sie nicht hingehört. |
| `npx ng generate component <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/dashboard/src/lib` | legt eine Komponente im Einstiegspunkt `fhir-vitals/angular/ui/dashboard` an | für weitere Kacheln im Dashboard, siehe Abschnitt 6 | Vier Zeilen `CREATE projects/fhir-vitals/angular/ui/dashboard/src/lib/<name>/<name>.css`, `.spec.ts`, `.ts` und `.html`, jeweils mit der Größe in Bytes. Mit dem Namen `weight-chart` heißt die Klasse `WeightChart` und der Selektor `lib-weight-chart`. |
| neue Zeile in der Datei `src/public-api.ts` des Einstiegspunkts, zum Beispiel `export * from "./lib/vitals-card/vitals-card";` in `projects/fhir-vitals/angular/ui/cards/src/public-api.ts` | macht den neuen Baustein außerhalb der Bibliothek sichtbar | nach jedem neuen Service, jeder neuen Komponente und jeder neuen Datei in `core` oder `fhir` | Nach dem nächsten Build der Bibliothek klappt in der Demo-App `import { VitalsCard } from "fhir-vitals/angular/ui/cards";`. Ohne diese Zeile meldet der Build `TS2305: Module '"fhir-vitals/angular/ui/cards"' has no exported member 'VitalsCard'.` |

### b) Demo-App mit Docker, ohne HAPI FHIR

`compose.yaml` bindet die Datei `projects/demo-app/public/config.json` als Bind-Mount in den Container ein.
Der Container liest damit direkt die Datei auf dem eigenen Rechner.

| Befehl | Wirkung | Wann nötig | Was danach zu sehen ist |
|---|---|---|---|
| `docker compose up --build` | baut das Image und startet die Demo-App auf http://localhost:4200 | beim ersten Start und nach jeder Code-Änderung | Erst die Build-Schritte, dann Zeilen mit `demo-app-1 \|` und `nginx/1.31.8`. Die Seite zeigt Herrn K. und den Status „nicht erreichbar“. `Strg+C` stoppt den Container. |
| `docker compose up --build -d` | startet wie oben, aber im Hintergrund | wenn das Terminal frei bleiben soll | `Container angular-fhir-vitals-demo-app-1 Started` |
| `docker compose logs -f demo-app` | zeigt das Protokoll von nginx und folgt neuen Zeilen | zur Fehlersuche | je Seitenaufruf Zeilen wie `"GET /config.json HTTP/1.1" 200`. `Strg+C` beendet nur die Anzeige. |
| `docker compose ps` | zeigt laufende Container und ihre Ports | zur Kontrolle | eine Zeile `angular-fhir-vitals-demo-app-1 … Up … 127.0.0.1:4200->80/tcp` |
| `docker compose down` | stoppt und entfernt die Demo-App | zum Aufräumen | `Container angular-fhir-vitals-demo-app-1 Removed` und `Network angular-fhir-vitals_default Removed` |
| `projects/demo-app/public/config.json` im Editor ändern und speichern, dann die Seite neu laden | ändert die Adresse des FHIR-Servers ohne Neubau | um einen anderen Server zu nutzen oder ihn abzuschalten | Mit `{ "fhirBaseUrl": null }` oder `""` zeigt der Status „nicht konfiguriert“. Nach Code-Änderungen dagegen erneut mit `--build` starten. |

### c) Demo-App mit Docker und HAPI FHIR

Eine FHIR-Ressource ist ein Datensatz mit festem Aufbau, etwa `Patient` oder `Observation` für eine Messung.
Ein FHIR-Bundle ist eine Ressource vom Typ `Bundle`, die mehrere Ressourcen bündelt, etwa ein Suchergebnis.
Sein Feld `total` nennt die Zahl der Treffer.

| Befehl | Wirkung | Wann nötig | Was danach zu sehen ist |
|---|---|---|---|
| `docker compose --profile fhir up --build` | startet Demo-App und HAPI FHIR | für die Arbeit mit einem FHIR-Server | Zeilen mit `demo-app-1 \|` und `fhir-1 \|`. Nach etwa 40 Sekunden meldet HAPI `Started Application in … seconds`. |
| `docker compose --profile fhir logs -f fhir` | zeigt das Protokoll von HAPI und folgt neuen Zeilen | zur Fehlersuche, etwa wenn HAPI nicht startet | Zeilen mit `fhir-1 \|`. Bei jeder Anfrage erscheint eine Zeile `fhirtest.access`. `Strg+C` beendet nur die Anzeige. |
| `curl http://localhost:8080/fhir/metadata` | fragt die Selbstbeschreibung des Servers ab | um zu prüfen, ob HAPI bereit ist | Sobald HAPI bereit ist, JSON mit `"resourceType": "CapabilityStatement"`. Vorher meldet curl einen Verbindungsfehler. Danach auf der Seite „Erneut verbinden“ klicken. |
| http://localhost:8080 im Browser öffnen | öffnet die Weboberfläche von HAPI | um Ressourcen auf dem Server anzusehen | die Testoberfläche mit dem Titel „HAPI FHIR“ |
| `curl "http://localhost:8080/fhir/Observation?subject=Patient/beispiel-01"` | sucht alle Messungen des Beispielpatienten | um das Speichern zu prüfen | ein FHIR-Bundle mit `"total": 1` und der Observation `blutdruck-01`. Die sieben Messungen aus `blutdruck-verlauf.json` liegen nur in dieser Beispieldatei der Demo-App und nicht auf dem Server. |
| `docker compose --profile fhir down` | stoppt und entfernt beide Container. Ohne `--profile fhir` stoppt `docker compose down` nur die Demo-App, und der HAPI-Container läuft weiter. | zum Aufräumen | `Removed` für `fhir-1`, `demo-app-1` und das Netzwerk. Danach läuft kein Container des Projekts mehr. |

Hinweis für Windows: In Windows PowerShell 5.1 ist `curl` ein Alias für `Invoke-WebRequest` und versteht andere Parameter.
Dort `curl.exe` statt `curl` schreiben.
PowerShell 7 definiert diesen Alias nicht mehr.

### d) Demo-App auf GitHub Pages

GitHub Pages veröffentlicht statische Webseiten direkt aus einem Repository.
Statische Webseiten bestehen aus fertigen Dateien wie HTML, JavaScript und JSON, die der Server unverändert ausliefert.
GitHub Actions führt Workflows aus, also automatische Abläufe, die eine YAML-Datei im Repository beschreibt.
YAML ist ein Textformat für Einstellungen, das die Gliederung durch Einrückung ausdrückt.
Ein Workflow besteht aus Jobs, also Folgen von Schritten, die GitHub jeweils auf einem eigenen Rechner ausführt.
Jede Ausführung eines Workflows heißt Lauf.
Ein Push lädt neue Commits vom eigenen Rechner zu GitHub hoch.
`main` ist der Hauptzweig des Repositorys, englisch Branch.

Der Workflow `.github/workflows/pages.yml` hat zwei Jobs.
Der Job `build` baut bei jedem Push auf `main` die Bibliothek und die Demo-App.
Der Job `deploy` veröffentlicht danach die Demo-App unter https://forschungsgruppe-digital-health.github.io/angular-fhir-vitals/.
Pages liefert die App unter dem Unterpfad `/angular-fhir-vitals/` aus.
Deshalb baut der Workflow sie mit der Option `--base-href`, die Angular diesen Unterpfad mitteilt.

Auf Pages ist der FHIR-Server abgeschaltet.
Der Workflow ersetzt dafür `config.json` im fertigen Build durch `{ "fhirBaseUrl": null }`.
So schickt eine öffentliche Seite keine Anfragen an `localhost` auf dem Rechner der Besucher.
Chrome würde für solche Anfragen ab Version 142 um eine Erlaubnis bitten.
Die Datei `config.json` im Repository bleibt unverändert.

Vor dem ersten Push auf `main` einmalig in den Einstellungen des Repositorys unter Settings, Pages, „Build and deployment“ bei „Source“ den Eintrag „GitHub Actions“ auswählen.
Danach schlägt GitHub Vorlagen für Workflows vor.
Keine davon auswählen, denn `pages.yml` gibt es schon.
Steht bei „Source“ noch „Deploy from a branch“, läuft im Tab Actions bei jedem Push zusätzlich der Workflow „pages build and deployment“.
Die Pages-Adresse zeigt dann dieses README als Webseite statt der Demo-App.
Ist Pages ganz ausgeschaltet, scheitert der Job `build` im Schritt `actions/configure-pages` mit der Meldung `Get Pages site failed`, und der Job `deploy` läuft nicht.
In beiden Fällen die Einstellung nachholen und den Workflow „Deploy demo app to GitHub Pages“ neu starten.
Für einen gescheiterten Lauf geht das im Lauf selbst: im Menü „Re-run jobs“ den Eintrag „Re-run failed jobs“ wählen und im folgenden Dialog „Re-run jobs“ klicken.
Sonst den Workflow wie in der Tabelle unten von Hand starten.

| Befehl | Wirkung | Wann nötig | Was danach zu sehen ist |
|---|---|---|---|
| `git push` auf `main` | startet den Workflow „Deploy demo app to GitHub Pages“ | nach jeder Änderung, die online erscheinen soll | Im Tab Actions des Repositorys erscheint ein Lauf mit den Jobs `build` und `deploy`. Nach dem Lauf zeigt die Pages-Adresse Herrn K. und den Status „nicht konfiguriert“. |
| im Tab Actions links den Workflow „Deploy demo app to GitHub Pages“ wählen, „Run workflow“ klicken, den Branch `main` lassen und im aufgeklappten Feld erneut „Run workflow“ klicken | startet denselben Workflow von Hand | um ohne neuen Commit neu zu veröffentlichen | ein neuer Lauf mit denselben Jobs |

## 5 Typische Probleme

**Port belegt.**
Docker meldet `Bind for 127.0.0.1:8080 failed: port is already allocated`.
Der Entwicklungsserver meldet `Port 4200 is already in use. Use '--port' to specify a different port.`
Ein anderes Programm oder ein anderer Container nutzt dann den Port.
`docker ps` zeigt laufende Container und ihre Ports.
Unter macOS und Linux zeigt `lsof -i :8080` das Programm hinter dem Port.
Unter Windows zeigt `netstat -ano | findstr :8080` in der letzten Spalte die Prozessnummer.
`tasklist /fi "PID eq <nummer>"` nennt dazu das Programm.
Das andere Programm beenden oder den Container mit `docker stop <name>` anhalten.
`docker stop` gibt danach den Namen des Containers aus.
Statt das andere Programm zu beenden, lässt sich HAPI auch auf einen anderen Port legen.
Dafür in `compose.yaml` beim Dienst `fhir` unter `ports` den Eintrag `"127.0.0.1:8080:8080"` durch `"127.0.0.1:8081:8080"` ersetzen.
In `projects/demo-app/public/config.json` den Wert von `fhirBaseUrl` in `http://localhost:8081/fhir` ändern.
Danach HAPI wie in Variante C neu starten, mit dem Dev-Container wie in Variante D.
`docker compose --profile fhir ps` zeigt dann für HAPI `127.0.0.1:8081->8080/tcp`.
Überall, wo dieses README `localhost:8080` nennt, gilt dann `localhost:8081`.
Beide Änderungen nicht committen, denn sie gelten nur für den eigenen Rechner.

**HAPI noch nicht bereit.**
HAPI braucht nach dem Start etwa 40 Sekunden.
Bis dahin zeigt die Seite „nicht erreichbar“.
`curl http://localhost:8080/fhir/metadata` prüft den Stand.
Sobald JSON zurückkommt, auf der Seite „Erneut verbinden“ klicken.
`docker compose --profile fhir logs -f fhir` zeigt, ob HAPI noch startet.
Die Zeile `Started Application in … seconds` markiert das Ende.

**Bibliothek nicht gebaut.**
`npx ng build demo-app` meldet `Could not resolve "fhir-vitals/angular/data"`, `Could not resolve "fhir-vitals/angular/ui/cards"` und `Could not resolve "fhir-vitals/angular/ui/dashboard"`.
`npm run start:app` meldet stattdessen `TS2307: Cannot find module 'fhir-vitals/angular/ui/cards' or its corresponding type declarations.` und dieselbe Meldung für die beiden anderen Einstiegspunkte.
Der Ordner `dist/fhir-vitals` fehlt dann.
`npx ng build fhir-vitals` oder `npm run watch:lib` ausführen, oder gleich `npm start` nutzen.

**Falsche Node.js-Version.**
Die Angular CLI bricht ab mit `Node.js version … detected. The Angular CLI requires a minimum Node.js version of …`.
`node -v` zeigt die installierte Version.
Node.js 22 ab 22.22.3, 24 ab 24.15.0 oder 26 installieren.
Mit nvm unter macOS oder Linux genügen `nvm install` und `nvm use` im Projektordner, weil `.nvmrc` die Version vorgibt.
Danach zeigt `node -v` eine Version 22.

**HAPI läuft nach `docker compose down` weiter.**
`docker compose down` ohne `--profile fhir` stoppt nur die Demo-App.
Der HAPI-Container läuft weiter, und Docker meldet beim Netzwerk `Resource is still in use`.
Erst `docker compose --profile fhir down` stoppt beide.

**ESLint meldet `… import is restricted from being used by a pattern`.**
Ein Import verletzt eine Regel zwischen den Schichten aus [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht).
Die Meldung nennt den Grund, etwa `Die UI spricht nicht selbst mit Servern`.
Dasselbe gilt für Importe der vorgeschlagenen Pakete gridstack, Chart.js oder ng2-charts außerhalb von `angular/ui/dashboard`.
Den Code in die passende Schicht oder das passende Feature verschieben.
Ein Feature ist ein abgegrenzter Teil einer Schicht mit eigener Aufgabe und eigenem Einstiegspunkt, etwa `angular/ui/cards` oder `angular/ui/dashboard`.
Eine Komponente bekommt Daten dann über ein Input, also eine Eigenschaft, die die einbindende Seite setzt.
Die Demo-App holt die Daten über die Facade `VitalsFacade`.
Eine Facade ist ein einfacher Zugang für die Oberfläche, der die Einzelheiten dahinter verbirgt.
Danach zeigt `npm run lint` nur noch die beiden Kopfzeilen.

**Neue Komponente liegt in `angular/data` statt in `angular/ui`.**
`npx ng generate component` ohne `--path` legt die Komponente in der Angular-Datenschicht unter `angular/data/src/lib` an.
Die neuen Dateien löschen und den Befehl mit `--path projects/fhir-vitals/angular/ui/cards/src/lib` wiederholen, für eine Kachel mit `--path projects/fhir-vitals/angular/ui/dashboard/src/lib`.
Danach erscheinen vier Zeilen wie `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/vitals-card/vitals-card.css (0 bytes)`.

**Tests finden keinen Browser.**
Karma meldet `No binary for ChromeHeadless browser on your platform. Please, set "CHROME_BIN" env variable.`
Karma sucht von selbst nur nach Google Chrome.
Google Chrome installieren.
Für Chromium oder einen Browser an einem ungewöhnlichen Ort die Umgebungsvariable `CHROME_BIN` auf die ausführbare Datei setzen.
In den Kommandozeilen bash und zsh von Linux und macOS setzt `export CHROME_BIN=/usr/bin/chromium` die Variable für das laufende Terminal.
Der Befehl gibt nichts aus.
Der Pfad gilt für das Paket `chromium` von Debian.
Der Dev-Container setzt `CHROME_BIN` selbst.
Ohne diese Variable meldete Karma dort am 17.11.2026 genau diesen Fehler.

**`curl` im Dev-Container erreicht HAPI nicht.**
Im Terminal des Dev-Containers meldet `curl http://localhost:8080/fhir/metadata` den Fehler `curl: (7) Failed to connect to localhost port 8080 after 1 ms: Could not connect to server`.
`localhost` ist der Name, unter dem ein Rechner sich selbst erreicht.
Im Dev-Container meint `localhost` den Container, und HAPI läuft auf dem eigenen Rechner.
`curl` deshalb im Terminal des eigenen Rechners ausführen.
Die Demo-App im Browser betrifft das nicht, denn der Browser läuft auf dem eigenen Rechner.

**Port 4200 im Dev-Container und in Docker.**
Die Varianten B und C starten nginx auf Port 4200 des eigenen Rechners.
Die Weiterleitung von VS Code für den Entwicklungsserver im Dev-Container will ebenfalls Port 4200 des eigenen Rechners belegen.
Belegt nginx den Port schon, zeigt http://localhost:4200 weiter die Demo-App aus nginx, also den Stand ihres letzten Builds.
Beide deshalb nicht gleichzeitig betreiben.
Vor `Dev Containers: Reopen in Container` die Varianten B und C mit `docker compose --profile fhir down` beenden.
Docker meldet dann `Removed`.
Für HAPI allein genügt `docker compose --profile fhir up -d fhir`, siehe Variante D in Abschnitt 3.
Die Ansicht „Ports“ von VS Code zeigt unter „Forwarded Address“, wohin VS Code Port 4200 tatsächlich weiterleitet.
Diese Angaben zu VS Code stammen aus der Dokumentation von VS Code.
Ein Test in VS Code selbst fehlt noch.

**`config.json` im Container liefert 404.**
Manche Editoren speichern eine Datei, indem sie sie durch eine neue Datei ersetzen.
Der Bind-Mount hängt dann noch an der alten, gelöschten Datei.
nginx findet `config.json` im Container nicht mehr und antwortet mit 404.
`docker compose restart demo-app` bindet die neue Datei ein.
Docker meldet danach `Container angular-fhir-vitals-demo-app-1 Started`, und die Seite liest `config.json` wieder.

**Warnungen bei `npm ci`.**
Die Warnungen `npm warn deprecated` zu `inflight`, `rimraf` und `glob` stammen aus Karma 6.4.4.
Das Karma-Projekt entwickelt Karma nicht mehr weiter.
Das Patientenportal nutzt Karma trotzdem als Testrunner, deshalb auch dieser Starter.
Die Meldung `… moderate severity vulnerabilities` betrifft das Paket `minimatch` in der ESLint-Kette.
Am 17.11.2026 waren es 9 Meldungen.
Beides betrifft nur Entwicklungswerkzeuge und nicht den Code, der im Browser läuft.
`npm audit fix --force` nicht ausführen, weil es Pakete auf unpassende Versionen ändert.
Am 17.11.2026 schlug npm außerdem `npm audit fix` ohne `--force` vor.
Ein Probelauf mit `npm audit fix --dry-run` zeigte neuere Patches für die ESLint-Kette, etwa `add minimatch 11.0.9`.
`npm audit fix` ohne `--dry-run` ändert damit `package-lock.json`.
Solche Änderungen gehören in einen eigenen Commit, den alle anderen mit `npm ci` übernehmen.

**Daten auf HAPI sind nach einem Neustart weg.**
HAPI läuft hier ohne eigene Datenbank und hält die Daten im Arbeitsspeicher.
Nach jedem Neustart des Containers ist der Server leer.
Die Demo-App schreibt die Beispieldaten beim nächsten Start oder nach „Erneut verbinden“ neu.

**Die Karte füllt die Kachel nicht aus.**
Dann fehlt `gridstack/dist/gridstack.min.css` der vorgeschlagenen Bibliothek gridstack unter `styles` in `angular.json`.
In einem Build ohne diese Datei war die Kachel am 06.11.2026 bei 1024 Pixeln Fensterbreite zwar 320 Pixel hoch.
Die Karte darin war aber nur 204 Pixel hoch und das Diagramm nur 150 Pixel.
Mit der Datei füllt die Karte die Kachel bis auf den Rand von 8 Pixeln aus, und das Diagramm ist 250 Pixel hoch.
Die Zeile wieder eintragen, wie in [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht) unter „Globale Styles“ beschrieben.
Danach den Entwicklungsserver oder den Build neu starten.

**Statt der Kachel steht nur „Dashboard wird geladen …“.**
`@defer (on viewport)` lädt das Dashboard erst, wenn dieser Text sichtbar wird.
Auf kleinen Bildschirmen bis zur Überschrift „Dashboard“ scrollen.
Danach erscheint die Kachel.

**Konsole meldet `NG0751` bei `npm start`.**
Die Konsole des Browsers zeigt ``NG0751: Angular has detected that this application contains `@defer` blocks and the hot module replacement (HMR) mode is enabled. All `@defer` block dependencies will be loaded eagerly.``
HMR (Hot Module Replacement) tauscht geänderte Teile der App im Browser aus, ohne die ganze Seite neu zu laden.
Der Entwicklungsserver nutzt es, und dabei lädt Angular die Pakete des Dashboards sofort mit.
Die Meldung ist harmlos.
Der Build mit `npm run build`, den auch das Docker-Image nutzt, lädt das Dashboard erst später.

**`npm test` meldet `WARN [web-server]: 404: /base/media/roboto-latin-…`.**
Die Tests der Demo-App nutzen die globalen Styles aus `angular.json`, also die CSS-Dateien unter `styles`, die für die ganze Seite gelten.
Dazu gehört auch die vorgeschlagene Schrift Roboto aus `@fontsource/roboto`.
Der Testrunner Karma liefert die Schriftdateien im Test aber nicht aus.
Daher kommen vier Warnungen für `roboto-latin-400-normal` und `roboto-latin-500-normal`, je als `.woff2` und `.woff`.
Die Tests laufen trotzdem durch und enden mit `TOTAL: 3 SUCCESS`.

## 6 Weiterarbeiten in WW2

[Architektur, Kapitel 4](docs/architektur.md#4-lösungsstrategie) fasst die Architektur zusammen, an der sich die Weiterarbeit orientiert.
Die vorgeschlagenen Bibliotheken und ihre Alternativen beschreibt [Architektur, Kapitel 9](docs/architektur.md#9-architekturentscheidungen).

Weitere Schritte im Workshop:

- weitere Vitalparameter aus der [Vital-Signs-Übersicht](https://hl7.org/fhir/R4/observation-vitalsigns.html) ergänzen. Dazu kommen Codes und Formatierung nach `core`, eigene Beispieldateien unter `public/assets/fhir/` und eine Komponente in ein UI-Feature wie `angular/ui/cards`.
- für neue Ressourcen IDs mit mindestens einem Buchstaben wählen, etwa `puls-01`. HAPI lehnt in der Voreinstellung ein PUT mit rein numerischer ID ab.
- neue Komponenten mit `--path projects/fhir-vitals/angular/ui/cards/src/lib` anlegen und in `angular/ui/cards/src/public-api.ts` exportieren. Für ein neues Feature gelten die Schritte aus [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht) unter „Ein neues UI-Feature anlegen“.
- eine zweite Oberfläche mit Vue oder einem anderen Framework auf `fhir-vitals/core` und `fhir-vitals/fhir` aufbauen, siehe [Architektur, Kapitel 5](docs/architektur.md#5-bausteinsicht)
- `core` und `fhir` in eigene npm-Pakete auslagern, sobald eine andere Oberfläche sie als Paket installieren soll
- für Daten, die einen Neustart überleben, HAPI mit PostgreSQL betreiben. Folie 80 des Vortrags [„Technologiestack“](https://datashare.tu-dresden.de/s/bdotfGe69FRNRZe) zeigt die passende `compose.yaml`. Die Foliennummer steht unten auf der Folie und weicht von der Seitenzahl im PDF ab. Die Datei liegt hinter demselben Link im Ordner „Material Technologiestack/Beispiele“.
- später die Anmeldung über [SMART App Launch](https://hl7.org/fhir/smart-app-launch/) ergänzen. Das Paket `fhirclient` unterstützt diesen Ablauf mit OAuth 2.0, einem Standard für die Freigabe von Zugriffen.

**Ideen für das Dashboard im Workshop.**
Diese Punkte sind Hinweise und keine fertige Lösung.

- Kacheln verschiebbar und in der Größe änderbar machen. In gridstack schaltet `staticGrid: false` das Ziehen mit der Maus wieder ein.
- weitere Kachelarten ergänzen, etwa einen Pulsverlauf oder die letzte Messung in großen Ziffern. Neue Komponenten wie in Abschnitt 4 mit `--path projects/fhir-vitals/angular/ui/dashboard/src/lib` anlegen.
- das Layout, also die Anordnung der Kacheln mit Spalte, Zeile, Breite und Höhe, als JSON in `core` beschreiben. Zum Speichern einen Port in `core` und einen Adapter in `fhir` ergänzen, etwa für den Speicher des Browsers oder einen Server. Port meint hier eine Schnittstelle, die beschreibt, was der Ablauf in `core` von außen braucht, und nicht die Nummer aus Abschnitt 3. Ein Adapter setzt einen Port mit einer bestimmten Technik um, siehe [Architektur, Kapitel 4](docs/architektur.md#4-lösungsstrategie). So kann auch eine Oberfläche mit Vue dasselbe Layout nutzen.
- die Messwerte zusätzlich als Tabelle zeigen. Ein Screenreader, also ein Programm, das den Inhalt einer Seite vorliest, kann eine Tabelle Zelle für Zelle vorlesen. Die Tabelle ergänzt so die Textalternative des Diagramms, also den Text, der das Diagramm für Screenreader beschreibt.
- eine Bedienung ohne Ziehen anbieten, etwa Knöpfe „Nach links“ oder „Breiter“ an jeder Kachel. Die WCAG (Web Content Accessibility Guidelines) sind die Richtlinien des W3C, des Gremiums für Webstandards, für barrierefreie Webinhalte. Kriterium 2.5.7 „Dragging Movements“ der WCAG 2.2 verlangt für jede Funktion mit Ziehen einen Weg ohne Ziehen, etwa durch einfaches Klicken. Knöpfe funktionieren außerdem mit der Tastatur.
- schmale Fenster beachten. In der Ansicht mit einer Spalte meldet gridstack Positionen für eine Spalte. Im Test am 06.11.2026 hatte die Kachel bei 560 Pixeln Fensterbreite in gridstack die Breite 1 statt 8. Solche Positionen dürfen ein gespeichertes Layout mit 12 Spalten nicht überschreiben.

## 7 Sprachmodelle im Studium

Für das Studium stehen Sprachmodelle über Dienste der Hochschulen zur Verfügung.
Ein Sprachmodell erzeugt Text oder Code aus einer Eingabe, dem sogenannten Prompt.
Stand der Angaben: 05.11.2026.

**Chat AI in der Academic Cloud (GWDG).**
Chat AI ist ein Chat-Dienst der GWDG mit selbst betriebenen und externen Sprachmodellen.
Die Weboberfläche liegt unter https://chat-ai.academiccloud.de.
Die Anmeldung erfolgt mit einem Academic-Cloud-Konto, auch über den föderierten Login der eigenen Hochschule, sofern sie teilnimmt.
Laut GWDG speichert der Dienst bei den selbst betriebenen Modellen keine Chatverläufe auf dem Server.
Der Verlauf bleibt im eigenen Browser.
Anfragen an die OpenAI-Modelle leitet die GWDG laut Datenschutzhinweis an Microsoft (Azure) weiter.
Die externen Modelle stehen außerdem nur bestimmten Einrichtungen offen.
Für Arbeiten im Workshop deshalb die selbst betriebenen Modelle nutzen.
Quellen: [Dienstbeschreibung](https://academiccloud.de/services/chatai/), [Dokumentation](https://docs.hpc.gwdg.de/services/ai-services/chat-ai/index.html), [Datenschutz](https://datenschutz.gwdg.de/services/chatai).

**TUD:AI, die LLM-Dienste von ScaDS.AI Dresden/Leipzig.**
ScaDS.AI Dresden/Leipzig und das ZIH der TU Dresden betreiben die Dienste unter dem Namen TUD:AI.
Der Chat liegt unter https://chat.llm.scads.ai.
Die Programmierschnittstelle, kurz API, ist kompatibel zur OpenAI-API und hat die Basisadresse `https://llm.scads.ai/v1`.
Die [Dokumentation](https://llm.scads.ai/docs/) beschreibt Chat und API.
Der Dienst steht allen offen, die der TU Dresden oder ScaDS.AI Dresden/Leipzig angehören.
Für den Chat ist ein ZIH-Konto der TU Dresden nötig.
Für den Workshop gibt die Betreuung an der TU Dresden Zugang über ein Funktionslogin.
Bei Bedarf bei der Betreuung melden.
Laut Nutzungsrichtlinie gehören keine Daten in den Dienst, deren Schutzbedarf über „normal“ hinausgeht.
Laut Datenschutzerklärung speichert die API weder Anfragen noch Antworten, wohl aber Metadaten zu jeder Anfrage.
Die Chat-Oberfläche speichert Chats, bis die Nutzenden sie löschen.
Quellen: [Nutzungsrichtlinie](https://llm.scads.ai/docs/legal/usage-policy/german/), [Datenschutz API](https://llm.scads.ai/docs/legal/privacy-policy/api/german/), [Datenschutz Chat](https://llm.scads.ai/docs/legal/privacy-policy/chat-ui/german/).

Zugangsdaten und API-Keys nie ins Repository schreiben.
Sie gehören in eine lokale Datei `.env`, die `.gitignore` bereits ausschließt.

Regeln für die Nutzung:

- keine echten oder personenbezogenen Daten in Eingaben
- erzeugten Code lesen, verstehen und testen, bevor er ins Projekt kommt
- die Regeln der eigenen Hochschule und des Moduls zur Nutzung von KI beachten

## 8 Links

Stand aller Links: 05.11.2026.
Die Links zum FHIR-Bundle und zu `$validate` und die vier Gruppen „Karten und Dashboard: vorgeschlagene Bibliotheken“, „Barrierefreiheit“, „npm-Paket und Vue“ und „Alternativen und ihre Lizenzen“ sind vom 06.11.2026.
Die Gruppen „Workshop“ und „Dev-Container und Editor“ und der Link zu arc42 sind vom 17.11.2026.

**Workshop**

- Vortrag „Technologiestack“, mit Ablaufdatum: https://datashare.tu-dresden.de/s/bdotfGe69FRNRZe

**Angular und Werkzeuge**

- Angular: https://angular.dev
- Angular CLI: https://angular.dev/tools/cli
- Bibliotheken anlegen: https://angular.dev/tools/libraries/creating-libraries
- Signals: https://angular.dev/guide/signals
- Dependency Injection: https://angular.dev/guide/di
- `@Service()`: https://angular.dev/api/core/Service
- HttpClient: https://angular.dev/guide/http
- Testen mit Karma und Jasmine: https://angular.dev/guide/testing/karma
- TypeScript: https://www.typescriptlang.org/docs/
- RxJS: https://rxjs.dev
- ng-packagr: https://github.com/ng-packagr/ng-packagr
- Karma: https://karma-runner.github.io
- Jasmine: https://jasmine.github.io
- ESLint: https://eslint.org
- angular-eslint: https://github.com/angular-eslint/angular-eslint
- typescript-eslint: https://typescript-eslint.io
- Prettier: https://prettier.io
- Node.js: https://nodejs.org
- npm: https://docs.npmjs.com
- `npm ci`: https://docs.npmjs.com/cli/commands/npm-ci
- nvm: https://github.com/nvm-sh/nvm
- Git: https://git-scm.com
- Visual Studio Code: https://code.visualstudio.com
- arc42, Vorlage für Architekturdokumentation: https://arc42.org

**FHIR und Terminologie**

- HL7 FHIR R4: https://hl7.org/fhir/R4/
- FHIR R4 RESTful API: https://hl7.org/fhir/R4/http.html
- Ressource Patient: https://hl7.org/fhir/R4/patient.html
- Ressource Observation: https://hl7.org/fhir/R4/observation.html
- Vital Signs: https://hl7.org/fhir/R4/observation-vitalsigns.html
- Profil Blutdruck: https://hl7.org/fhir/R4/bp.html
- Profile in FHIR: https://hl7.org/fhir/R4/profiling.html
- Ressource Bundle: https://hl7.org/fhir/R4/bundle.html
- Operation `$validate`: https://hl7.org/fhir/R4/resource-operation-validate.html
- @types/fhir: https://www.npmjs.com/package/@types/fhir
- fhirclient: https://docs.smarthealthit.org/client-js/ und https://github.com/smart-on-fhir/client-js
- SMART App Launch: https://hl7.org/fhir/smart-app-launch/
- HAPI FHIR: https://hapifhir.io
- HAPI FHIR JPA Server Starter: https://github.com/hapifhir/hapi-fhir-jpaserver-starter
- Docker-Image von HAPI FHIR: https://hub.docker.com/r/hapiproject/hapi
- LOINC: https://loinc.org, Codes https://loinc.org/85354-9, https://loinc.org/8480-6 und https://loinc.org/8462-4
- UCUM: https://ucum.org

**Docker, nginx und Browser**

- Docker: https://docs.docker.com/get-started/
- Docker Compose: https://docs.docker.com/compose/
- Profile in Compose: https://docs.docker.com/compose/how-tos/profiles/
- Bind-Mounts: https://docs.docker.com/engine/storage/bind-mounts/
- nginx: https://nginx.org/en/docs/
- CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- curl unter Windows: https://learn.microsoft.com/en-us/windows/curl/

**GitHub Actions und Pages**

- GitHub Actions: https://docs.github.com/en/actions/get-started/understand-github-actions
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Quelle „GitHub Actions“ einstellen: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Zugriffe auf das lokale Netzwerk in Chrome: https://developer.chrome.com/blog/local-network-access
- Workflow von Hand starten: https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow
- Läufe neu starten: https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs

**Visual Studio Code und FHIR**

- JSON in VS Code und `json.schemas`: https://code.visualstudio.com/docs/languages/json
- Workspace Trust: https://code.visualstudio.com/docs/editing/workspaces/workspace-trust
- JSON-Schema von FHIR R4 (Download-Seite): https://hl7.org/fhir/R4/downloads.html
- Erweiterung FHIR tools: https://marketplace.visualstudio.com/items?itemName=Yannick-Lagger.vscode-fhir-tools und https://github.com/laggery/vscode-fhir-tools

**Dev-Container und Editor**

- Dev Containers in VS Code: https://code.visualstudio.com/docs/devcontainers/containers
- Erweiterung Dev Containers: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
- Dev Container Specification und `devcontainer.json`: https://containers.dev und https://containers.dev/implementors/json_reference/
- Image `javascript-node`: https://github.com/devcontainers/images/tree/main/src/javascript-node
- `node_modules` in einem Volume: https://code.visualstudio.com/remote/advancedcontainers/improve-performance
- Zeilenenden in Dev-Containern: https://code.visualstudio.com/docs/devcontainers/tips-and-tricks
- Ports aus dem Dev-Container weiterleiten: https://code.visualstudio.com/docs/devcontainers/containers#_forwarding-or-publishing-a-port
- Ordner aus WSL 2 im Dev-Container öffnen: https://code.visualstudio.com/docs/devcontainers/containers#_open-a-wsl-2-folder-in-a-container-on-windows
- Ansicht „Ports“ in VS Code: https://code.visualstudio.com/docs/debugtest/port-forwarding. Die Freigabe über Dev Tunnels ins Internet auf derselben Seite braucht dieses Projekt nicht.
- Dev Containers CLI: https://github.com/devcontainers/cli
- WSL 2 installieren: https://learn.microsoft.com/en-us/windows/wsl/install
- WSL 2 und Docker Desktop: https://docs.docker.com/desktop/features/wsl/best-practices/
- `.gitattributes`: https://git-scm.com/docs/gitattributes
- EditorConfig: https://editorconfig.org und https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Erweiterung ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Erweiterung Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Erweiterung Markdown Preview Mermaid Support: https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid
- Nutzungsdaten der Angular CLI: https://angular.dev/cli/analytics
- Karma und `CHROME_BIN`: https://github.com/karma-runner/karma-chrome-launcher

**Karten und Dashboard: vorgeschlagene Bibliotheken**

- gridstack: https://gridstackjs.com und https://github.com/gridstack/gridstack.js
- Angular-Anbindung von gridstack: https://github.com/gridstack/gridstack.js/tree/master/angular
- Chart.js: https://www.chartjs.org/docs/latest/
- Chart.js, Teile einzeln anmelden: https://www.chartjs.org/docs/latest/getting-started/integration.html
- Chart.js und Barrierefreiheit: https://www.chartjs.org/docs/latest/general/accessibility.html
- ng2-charts: https://github.com/valor-software/ng2-charts
- Angular Material: https://material.angular.dev
- Themes für Angular Material: https://material.angular.dev/guide/theming
- Karte von Angular Material: https://material.angular.dev/components/card/overview
- Knopf von Angular Material: https://material.angular.dev/components/button/overview
- Toolbar von Angular Material: https://material.angular.dev/components/toolbar/overview
- CSS-Grid: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout
- Fontsource Roboto: https://fontsource.org/fonts/roboto
- Fontsource installieren: https://fontsource.org/docs/getting-started/install
- `@defer`: https://angular.dev/guide/templates/defer
- Fehler `NG0751`: https://angular.dev/errors/NG0751

**Barrierefreiheit**

- WCAG 1.4.1 „Use of Color“: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html
- WCAG 2.5.7 „Dragging Movements“: https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion
- Live-Region mit `role="status"`: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role
- Landmarken: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/landmark_role

**npm-Paket und Vue**

- `peerDependenciesMeta`: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependenciesmeta
- `strict-peer-deps`: https://docs.npmjs.com/cli/v10/using-npm/config#strict-peer-deps
- `npm pack`: https://docs.npmjs.com/cli/v10/commands/npm-pack
- `npm uninstall`: https://docs.npmjs.com/cli/v10/commands/npm-uninstall
- Vue: https://vuejs.org
- esbuild: https://esbuild.github.io

**Alternativen und ihre Lizenzen**

- angular-gridster2: https://github.com/tiberiuzuld/angular-gridster2
- Apache ECharts: https://echarts.apache.org
- ngx-echarts: https://github.com/xieziyu/ngx-echarts
- PrimeUI Community License: https://primeui.dev/licenses/community
- Lizenz von Highcharts: https://www.highcharts.com/license
- Lizenzschlüssel für Kendo UI for Angular: https://www.telerik.com/kendo-angular-ui/components/licensing
- Lizenzschlüssel für Syncfusion: https://ej2.syncfusion.com/angular/documentation/licensing/overview
- Community License von Syncfusion: https://www.syncfusion.com/products/communitylicense

**Sprachmodelle im Studium**

- Chat AI: https://chat-ai.academiccloud.de, https://academiccloud.de/services/chatai/, https://docs.hpc.gwdg.de/services/ai-services/chat-ai/index.html, https://datenschutz.gwdg.de/services/chatai
- TUD:AI: https://chat.llm.scads.ai, https://llm.scads.ai/docs/, https://llm.scads.ai/docs/legal/usage-policy/german/, https://llm.scads.ai/docs/legal/privacy-policy/api/german/, https://llm.scads.ai/docs/legal/privacy-policy/chat-ui/german/

## 9 Lizenz

Der Code steht unter der Apache License 2.0, siehe `LICENSE`.
Die genutzten Pakete haben eigene Lizenzen, etwa `fhirclient` (Apache-2.0) und `@types/fhir` (MIT).
Die vorgeschlagenen Pakete für Karten und Dashboard-Beispiel stehen unter der MIT-Lizenz: `@angular/material`, `@angular/cdk`, `gridstack`, `chart.js` und `ng2-charts`.
Das gilt auch für die beiden Pakete, die npm mit ihnen installiert, `@kurkle/color` für `chart.js` und `es-toolkit` für `ng2-charts`.
Die Schrift Roboto aus `@fontsource/roboto` steht unter der SIL Open Font License 1.1 (OFL-1.1).
Sie erlaubt, die Schrift zusammen mit Software weiterzugeben, verbietet aber, die Schrift allein zu verkaufen.
Den Lizenztext enthält die Datei `node_modules/@fontsource/roboto/LICENSE`.

Alle Daten in diesem Repository sind synthetisch.
Es enthält keine echten Patientendaten.
In der Voreinstellung von `config.json` gehen schreibende FHIR-Anfragen nur an den lokalen HAPI FHIR.

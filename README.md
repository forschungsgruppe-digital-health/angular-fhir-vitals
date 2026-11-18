# FHIR-Starter: Angular-Bibliothek für Vitalparameter

Startpunkt für das Softwareprojekt #WW26-MiHUB der Forschungsgruppe Digital Health an der TU Dresden im Semester WW2.

**Inhalt**

1. [Worum es geht](#1-worum-es-geht)
2. [Voraussetzungen](#2-voraussetzungen)
3. [Schnellstart](#3-schnellstart)
4. [Befehle](#4-befehle)
5. [Häufige Fragen](#5-häufige-fragen)
6. [Sprachmodelle im Studium](#6-sprachmodelle-im-studium)
7. [Links](#7-links)
8. [Lizenz](#8-lizenz)

## 1 Worum es geht

Dieses Repository dient dem Einstieg in die Technologien des Softwareprojekts.
Es enthält zwei Projekte:

| Projekt | Ordner | Inhalt |
|---|---|---|
| Bibliothek `fhir-vitals` | `projects/fhir-vitals` | wiederverwendbarer Code für das Web-Framework Angular |
| Demo-App `demo-app` | `projects/demo-app` | eine Webanwendung, die die Bibliothek nutzt |

Die Demo-App zeigt einen synthetischen, also erfundenen Patienten und den Verlauf seines Blutdrucks als Diagramm.
Die Daten folgen dem Standard HL7 FHIR R4 für Gesundheitsdaten.
Das Diagramm steht in einer Kachel, einem minimalen Beispiel für das Dashboard des Softwareprojekts.
Die Bibliotheken für die Oberfläche sind ein Vorschlag, siehe [Architektur, Kapitel 9](docs/architektur/09-architekturentscheidungen.md).
Einen Einstieg in HL7 FHIR und die genutzten Technologien gibt der Vortrag „Technologiestack“.
Den Link zum Vortrag verschickt die Betreuung per E-Mail.

**Was in welches Semester gehört**

| Semester | Schwerpunkt | Teile dieses README |
|---|---|---|
| WW2, dieses Semester | Einstieg und Kennenlernen der Technologien | Abschnitte 2, 3.1 bis 3.5, 4.1, 4.2 und 5.1 bis 5.3 |
| nächstes Semester | der FHIR-Server HAPI FHIR und das Backend | Abschnitte 3.6, 4.3 und 5.4 |

Teile zum nächsten Semester beginnen mit dem Hinweis „Nächstes Semester“.
Abschnitt 4.4 betrifft nur die Betreuung.

**Wo was steht**

| Thema | Ort |
|---|---|
| Demo-App starten und weiterentwickeln | [Abschnitt 3](#3-schnellstart) |
| Befehle mit ihrer Ausgabe | [Abschnitt 4](#4-befehle) |
| Fehlermeldungen und ihre Lösungen | [Abschnitt 5](#5-häufige-fragen) |
| Aufbau des Codes und Ablauf beim Start | [Architektur, Kapitel 4 bis 6](docs/architektur/README.md) |
| Versionen der Werkzeuge | [Abschnitt 2.1](#21-werkzeuge) |
| Versionen der Pakete | [Architektur, Kapitel 2](docs/architektur/02-randbedingungen.md) |
| Teile der Bibliothek | [`projects/fhir-vitals/README.md`](projects/fhir-vitals/README.md) |
| Begriffe | [Glossar](docs/architektur/12-glossar.md) |

Der Ordner [`docs/architektur`](docs/architektur/README.md) beschreibt die Architektur nach der Vorlage arc42, mit einer Datei je Kapitel.
Verweise wie „Architektur, Kapitel 5“ führen dorthin.

## 2 Voraussetzungen

### 2.1 Werkzeuge

Welche Werkzeuge nötig sind, hängt vom Weg aus [Abschnitt 3](#3-schnellstart) ab.
Die Spalte „Nötig für“ nennt die Abschnitte.
Die Spalte „Version“ nennt die unter macOS geprüfte Version.
Einträge mit „nicht geprüft“ stammen aus der Dokumentation der Hersteller.
Sie nennen die Mindestversion, sofern der Hersteller eine angibt.
Dazu kommt ein Browser wie Firefox, Chrome, Edge oder Safari.
Befehle wie `git --version` gehören ins Terminal, siehe [2.2](#22-terminal-öffnen).

| Werkzeug | Version | Wozu | Nötig für |
|---|---|---|---|
| [Git](https://git-scm.com) | 2.50.1 | Git ist die Versionsverwaltung. Es lädt das Repository auf den eigenen Rechner. | alle Wege |
| [Docker Desktop](https://docs.docker.com/desktop/), unter Linux auch [Docker Engine](https://docs.docker.com/engine/install/) | Docker 29.9.3 mit Compose 5.7.0 | Docker startet Programme in Containern, also in abgeschotteten Prozessen mit eigenem Dateisystem. Docker Compose startet die Demo-App nach der Beschreibung in `compose.yaml`. Docker führt auch den Dev-Container aus. | 3.2 bis 3.4 und 3.6 |
| [Visual Studio Code](https://code.visualstudio.com), kurz VS Code | 1.141.1 | VS Code ist der empfohlene Editor. Im Dev-Container installiert er alle passenden Erweiterungen von selbst. | 3.3 und 3.4, optional in 3.5 |
| Erweiterung [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) für VS Code | 0.473.0 | Die Erweiterung öffnet den Projektordner im Dev-Container. Dieser Container enthält die ganze Entwicklungsumgebung mit Node.js 22, Chromium und Java. | 3.3 und 3.4 |
| WSL 2 mit Ubuntu, nur unter Windows | laut Docker ab 2.1.5, nicht geprüft | WSL 2 (Windows Subsystem for Linux) führt Linux unter Windows aus. Docker Desktop braucht es für Linux-Container. Unter Windows liegt das Repository im Dateisystem von Ubuntu. | alle Wege unter Windows |
| Erweiterung [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) für VS Code, nur unter Windows | nicht geprüft | Die Erweiterung öffnet in VS Code einen Ordner aus Ubuntu. | 3.3 und 3.4 unter Windows |
| [Node.js](https://nodejs.org) | 22.22.3 | Node.js führt die Angular CLI, den Build und die Tests aus. Angular 22.2 braucht Node.js 22 ab 22.22.3. Node.js bringt den Paketmanager npm 10 mit. Die Datei `.nvmrc` nennt die Version 22 für den Versionsmanager [nvm](https://github.com/nvm-sh/nvm). | nur 3.5 |
| Google Chrome oder Chromium | Google Chrome 157 | Der Browser führt die Unit-Tests aus, ohne ein Fenster zu öffnen. Für Chromium die Umgebungsvariable `CHROME_BIN` setzen, siehe [Frage](#warum-finden-die-tests-keinen-browser). | nur 3.5 |
| Java, JRE (Laufzeitumgebung) oder JDK (Entwicklungspaket) | laut FHIR tools ab 17, nicht geprüft | Nur die Erweiterung FHIR tools braucht Java. Sie prüft damit FHIR-Ressourcen, siehe [Architektur, Kapitel 8](docs/architektur/08-querschnittliche-konzepte.md#die-beispieldaten-und-ihre-codes). | optional in 3.5 |

**Einrichten unter Windows.**
Die Schritte stammen aus der Dokumentation von Microsoft, Docker und VS Code.
Ein Test unter Windows fehlt noch.

1. Im Startmenü „PowerShell“ eingeben und „Als Administrator ausführen“ wählen. Dort `wsl --install` ausführen und den Rechner neu starten. Der Befehl installiert WSL 2 mit Ubuntu.
2. Ubuntu im Startmenü öffnen. Beim ersten Start fragt Ubuntu nach einem Benutzernamen und einem Passwort für Linux. Der Benutzername besteht aus Kleinbuchstaben ohne Leerzeichen und Umlaute, etwa `max`. Laut Microsoft erscheinen beim Tippen des Passworts keine Zeichen. Git ist laut Microsoft in Ubuntu schon enthalten. `git --version` zeigt eine Zeile `git version …`. Git für Windows ist nicht nötig.
3. [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) installieren und starten. In Docker Desktop unter Settings, Resources, WSL Integration prüfen, dass Ubuntu eingeschaltet ist. Laut Docker gilt das von selbst für Ubuntu als Standard-Distribution, also als das Linux-System, das WSL ohne weitere Angabe startet.
4. VS Code unter Windows installieren und nicht in Ubuntu. Bei der Installation die Option „Add to PATH“ angekreuzt lassen. Danach in VS Code die Erweiterungen WSL und Dev Containers installieren. Zum Schluss alle Fenster von Ubuntu schließen und Ubuntu neu öffnen. Laut VS Code kennt erst ein neues Terminal den Befehl `code`. Schlägt Ubuntu bei `code .` einen Befehl mit `snap install` vor, diesen nicht ausführen. Er würde VS Code in Ubuntu installieren.

**Einrichten unter Linux.**
Ein Test unter Linux fehlt noch.

1. `git --version` prüft, ob Git installiert ist, und zeigt eine Zeile `git version …`. Fehlt Git, installiert `sudo apt install git` es unter Ubuntu.
2. Docker Engine mit dem Plugin für Compose nach der [Anleitung von Docker](https://docs.docker.com/engine/install/) installieren. Snap ist ein eigenes Paketformat von Ubuntu. Laut VS Code funktioniert Docker als Snap-Paket nicht mit Dev Containers. Deshalb Docker nicht aus dem App Center und nicht mit `sudo snap install docker` installieren, auch wenn das Terminal diesen Befehl vorschlägt.
3. Den eigenen Benutzer mit `sudo usermod -aG docker $USER` zur Gruppe `docker` hinzufügen und sich danach ab- und wieder anmelden. Der Befehl gibt nichts aus. `sudo` fragt nach dem eigenen Passwort. Auch dabei erscheinen keine Zeichen. Ohne diese Gruppe braucht jeder Befehl mit `docker` die Rechte von root, siehe [Frage](#warum-braucht-docker-unter-linux-sudo).
4. VS Code und die Erweiterung Dev Containers installieren.

**Einrichten unter macOS.**
Docker Desktop, VS Code und die Erweiterung Dev Containers installieren.
`git --version` zeigt die Version von Git, etwa `git version 2.50.1 (Apple Git-155)`.
Fehlt Git, bietet macOS beim ersten Aufruf an, die Command Line Tools von Apple mit Git zu installieren.
Dieser Fall ist nicht geprüft, denn im Test war Git schon installiert.

`docker compose version` prüft auf allen Systemen die Installation von Docker.
Unter Windows den Befehl im Terminal von Ubuntu ausführen, denn dort prüft er zugleich die WSL-Integration.
Unter macOS meldete der Befehl `Docker Compose version v5.7.0`.

### 2.2 Terminal öffnen

Ein Terminal nimmt Befehle in Textform entgegen.
Die Befehle in diesem README stehen in grauen Kästen.
Jede Zeile eingeben und mit der Eingabetaste bestätigen.

| System | Terminal | Öffnen |
|---|---|---|
| Windows | Ubuntu in WSL 2 | Im Startmenü „Ubuntu“ eingeben und die App öffnen. Hier laufen unter Windows alle Befehle für den eigenen Rechner, etwa `git`, `code .` und die Befehle D und H. Die Befehle B laufen im Terminal des Dev-Containers, siehe [3.3](#33-demo-app-weiterentwickeln-im-dev-container). Nur `netstat` und `tasklist` aus der [Frage zu Port 4200](#warum-ist-port-4200-belegt) laufen in PowerShell. |
| macOS | Terminal | `Cmd+Leertaste` öffnet die Suche Spotlight. Dort „Terminal“ eingeben und die Eingabetaste drücken. |
| Linux | Terminal der Desktop-Umgebung | Unter Ubuntu öffnet `Strg+Alt+T` das Terminal. Sonst im Menü der Anwendungen nach „Terminal“ suchen. Kopierten Text fügt dort `Strg+Umschalt+V` ein und nicht `Strg+V`. |
| VS Code | eingebautes Terminal | Im Menü „Terminal“ den Eintrag „New Terminal“ wählen. Ist das Fenster mit dem Dev-Container verbunden, läuft dieses Terminal im Container. Sonst läuft es auf dem eigenen Rechner. |

`Strg+C` beendet im Terminal ein laufendes Programm.
Auf der Tastatur eines Mac heißt diese Taste `control` oder `ctrl`.
`Cmd+C` kopiert unter macOS nur Text und beendet nichts.

## 3 Schnellstart

Alle Wege beginnen mit [3.1](#31-repository-klonen).
Danach geht es je nach Ziel weiter:

| Ziel | Abschnitt | Weg |
|---|---|---|
| Demo-App starten und ansehen | [3.2](#32-demo-app-starten-und-ansehen) | Docker Compose |
| Demo-App weiterentwickeln | [3.3](#33-demo-app-weiterentwickeln-im-dev-container) | Dev-Container in VS Code, empfohlen |
| Bibliothek weiterentwickeln | [3.4](#34-bibliothek-weiterentwickeln-im-dev-container) | Dev-Container in VS Code, empfohlen |
| ohne Docker arbeiten | [3.5](#35-ohne-container-nicht-empfohlen) | Node.js auf dem eigenen Rechner, nicht empfohlen |
| mit HAPI FHIR arbeiten | [3.6](#36-ausblick-auf-das-nächste-semester) | erst im nächsten Semester |

### 3.1 Repository klonen

Klonen lädt eine Kopie des Repositorys auf den eigenen Rechner.
Unter Windows im Terminal von Ubuntu klonen, siehe [2.2](#22-terminal-öffnen).
Das Repository liegt dann im Dateisystem von Linux.
Laut Docker greifen Container dort deutlich schneller auf die Dateien zu.
Nur dort erfahren sie außerdem von Dateien, die sich ändern.
Deshalb nicht unter `/mnt/c` klonen, denn dieser Ordner gehört zum Dateisystem von Windows.

```bash
cd ~
git clone https://github.com/forschungsgruppe-digital-health/angular-fhir-vitals.git
cd angular-fhir-vitals
```

`cd ~` wechselt in den eigenen Heimatordner und gibt nichts aus.
Git meldet `Cloning into 'angular-fhir-vitals'...`.
Danach enthält der Ordner `angular-fhir-vitals` unter anderem `package.json` und `README.md`.
`ls` listet sie auf.
Ein neues Terminal des eigenen Rechners beginnt nicht im Ordner des Repositorys.
`cd ~/angular-fhir-vitals` wechselt dorthin und gibt nichts aus.

### 3.2 Demo-App starten und ansehen

Für diesen Weg genügen Git, Docker und ein Browser.
Docker baut aus dem `Dockerfile` ein Image mit der fertigen Demo-App.
Ein Image ist eine Vorlage für Container.
Im Container liefert der Webserver nginx die Demo-App aus.

1. Docker Desktop starten. Unter Linux muss der Dienst von Docker Engine laufen. Laut Docker startet er unter Debian und Ubuntu nach der Installation von selbst.
2. Im Terminal im Ordner `angular-fhir-vitals` Befehl [D1](#42-auf-dem-eigenen-rechner-mit-docker) ausführen:

   ```bash
   docker compose up --build
   ```

   Docker baut zuerst das Image und lädt dafür beim ersten Mal Images und Pakete aus dem Internet. Danach erscheinen Zeilen mit `demo-app-1 |`, darunter eine mit `nginx/1.31.8`.
3. http://localhost:4200 im Browser öffnen. `localhost` ist der Name, unter dem ein Rechner sich selbst erreicht.
4. Zum Beenden im Terminal `Strg+C` drücken. Danach mit Befehl [D5](#42-auf-dem-eigenen-rechner-mit-docker) `docker compose down` den Container entfernen.

**Was die Seite zeigt:**

- oben die Toolbar „FHIR-Starter“ und einen Satz zu den vorgeschlagenen Bibliotheken
- die Karte „Patient“ mit Herrn K.
- die Karte „FHIR-Server“ mit dem Status „nicht erreichbar“. Das ist in diesem Semester richtig, denn es läuft kein FHIR-Server.
- die Überschrift „Dashboard“ und die Kachel „Blutdruckverlauf“ mit den Messungen vom 26.05. bis 01.06.2026

In einem breiten Fenster stehen die beiden Karten nebeneinander und in einem schmalen untereinander.
Nach einer Änderung am Code baut erst ein neuer Aufruf von D1 die Demo-App neu.
Zum Entwickeln eignet sich deshalb [3.3](#33-demo-app-weiterentwickeln-im-dev-container) besser.

### 3.3 Demo-App weiterentwickeln im Dev-Container

Dieser Weg ist für alle Änderungen am Code empfohlen.
Der Dev-Container bringt Node.js 22, Chromium für die Unit-Tests, Java und die Erweiterungen für VS Code mit.
Auf dem eigenen Rechner sind nur die Werkzeuge aus [2.1](#21-werkzeuge) für 3.3 nötig.
So arbeiten alle mit denselben Versionen.

**Dev-Container öffnen**

1. Docker Desktop starten. Unter Linux muss Docker Engine wie in 3.2 laufen.
2. Den Ordner in VS Code öffnen:
   - unter macOS und Linux in VS Code im Menü „File“ mit „Open Folder…“ den Ordner `angular-fhir-vitals` wählen
   - unter Windows im Terminal von Ubuntu erst `cd ~/angular-fhir-vitals` und dann `code .` ausführen. Laut VS Code installiert der Befehl beim ersten Mal den VS Code Server in Ubuntu. Danach zeigt die Statusleiste unten links einen Eintrag für WSL. Ein Test unter Windows fehlt noch.

   Laut VS Code erscheint beim ersten Öffnen eines Ordners die Frage, ob die Autoren der Dateien vertrauenswürdig sind. Dann „Yes, I trust the authors“ wählen. Die Frage kann auch erst vor dem Öffnen im Container kommen. Im Test unter macOS kam sie nicht.
3. Unten rechts meldet VS Code „Folder contains a Dev Container configuration file. Reopen folder to develop in a container (learn more).“ Dort „Reopen in Container“ klicken. „Clone in Volume“ nicht wählen, denn diese Schaltfläche legt eine zweite Kopie des Repositorys in Docker an. Fehlt der Hinweis, liegt er hinter der Glocke unten rechts, siehe [Frage](#wo-erscheint-der-hinweis-reopen-in-container). Den zweiten Hinweis zu den empfohlenen Erweiterungen schließen, denn er betrifft den eigenen Rechner.
4. Beim ersten Mal baut Docker das Image des Dev-Containers und führt danach `npm ci` aus. Unten links steht dabei „Opening Remote...“. Ein Klick auf „show log“ im Hinweis „Connecting to Dev Container (show log)“ zeigt den Fortschritt. Am Ende zeigt ein Terminal `added 611 packages, and audited 612 packages in 3m`, eine Zeile wie `9 moderate severity vulnerabilities` und „Done. Press any key to close the terminal.“ Die Schwachstellen erklärt die [Frage](#warum-meldet-npm-ci-warnungen-und-schwachstellen). Eine beliebige Taste schließt dieses Terminal.
5. Unten links steht jetzt „Dev Container: angular-fhir-vitals @ …“. Im Test unter macOS stand dort „Dev Container: angular-fhir-vitals @ des...“. Der Dev-Container ist bereit.

**Demo-App starten**

1. Im Menü „Terminal“ den Eintrag „New Terminal“ wählen. Dieses Terminal läuft im Container.
2. Befehl [B2](#41-im-dev-container) ausführen:

   ```bash
   npm start
   ```

   Nach sechs Zeilen `Built fhir-vitals…` erscheint `Local: http://127.0.0.1:4200/`, siehe [Frage](#warum-zeigt-npm-start-im-dev-container-127001).
3. http://localhost:4200 im Browser des eigenen Rechners öffnen. VS Code leitet Port 4200 aus dem Container dorthin weiter. Die Seite gleicht der aus [3.2](#32-demo-app-starten-und-ansehen). Die Ansicht „Ports“ im unteren Bereich von VS Code zeigt die Weiterleitung als Zeile „Demo-App (4200)“ mit `localhost:4200` unter „Forwarded Address“.

**Ändern und prüfen**

1. `projects/demo-app/src/app/app.html` öffnen, einen Text ändern und speichern. Der Entwicklungsserver meldet `Component update sent to client(s).` Der Browser zeigt die Änderung sofort.
2. `Strg+C` beendet den Entwicklungsserver.
3. Vor dem Abschluss einer Änderung [B3](#41-im-dev-container) `npm test` und [B4](#41-im-dev-container) `npm run lint` ausführen.

**Wo die Demo-App liegt**

| Datei | Inhalt |
|---|---|
| `projects/demo-app/src/app/app.html` | Template der Seite mit Toolbar, Karten und Dashboard |
| `projects/demo-app/src/app/app.ts` | Komponente der Seite. Sie holt die Daten über die Facade `VitalsFacade` der Bibliothek. |
| `projects/demo-app/src/app/app.css` | Styles der Seite, etwa für die Anordnung der Karten |
| `projects/demo-app/src/app/app.config.ts` | Einstellungen der App für den Start, etwa für HttpClient |
| `projects/demo-app/public/config.json` | Adresse des FHIR-Servers |
| `projects/demo-app/public/assets/fhir/` | synthetische Beispieldaten für Patient und Blutdruck |

Was beim Start der Demo-App passiert, beschreibt [Architektur, Kapitel 6](docs/architektur/06-laufzeitsicht.md).

**Anregungen zum Ausprobieren**

- Texte und Anordnung in `app.html` und `app.css` ändern
- ein anderes fertiges Theme von Angular Material wählen. Dazu in `angular.json` unter `styles` die Datei `azure-blue.css` etwa durch `rose-red.css` ersetzen und B2 neu starten.
- die Messwerte in `blutdruck-verlauf.json` ändern. Nur synthetische Werte eintragen.

**Dev-Container verlassen und neu bauen**

Ein Klick auf „Dev Container: angular-fhir-vitals“ unten links öffnet ein Menü.
„Reopen Folder Locally“ öffnet den Ordner wieder ohne Container.
„Rebuild Container“ baut den Container neu.
Das ist nach jeder Änderung im Ordner `.devcontainer` nötig.
VS Code meldet eine solche Änderung mit „Configuration file(s) changed: devcontainer.json. The container might need to be rebuilt to apply the changes.“
Nach einer Änderung an `package-lock.json` Befehl [B1](#41-im-dev-container) `npm ci` erneut ausführen.
Befehle mit `docker` laufen nicht im Container, siehe [Frage](#warum-meldet-das-terminal-docker-command-not-found).
Hintergründe zum Dev-Container stehen in [Architektur, Kapitel 8](docs/architektur/08-querschnittliche-konzepte.md#dev-container-und-werkzeuge).

### 3.4 Bibliothek weiterentwickeln im Dev-Container

Die Bibliothek `fhir-vitals` liegt in `projects/fhir-vitals`.
Sie besteht aus fünf Einstiegspunkten, also Teilpaketen mit eigenem Importnamen:

| Einstiegspunkt | Ordner unter `projects/fhir-vitals` | Inhalt |
|---|---|---|
| `fhir-vitals/core` | `core` | Ablauf und Ports, ohne Angular und ohne Serverzugriff |
| `fhir-vitals/fhir` | `fhir` | Adapter mit fhirclient für den FHIR-Server und mit fetch für statische Dateien |
| `fhir-vitals/angular/data` | `angular/data` | Angular-Datenschicht mit der Facade `VitalsFacade` |
| `fhir-vitals/angular/ui/cards` | `angular/ui/cards` | Karten `PatientCard` und `ServerStatus` |
| `fhir-vitals/angular/ui/dashboard` | `angular/ui/dashboard` | Dashboard-Beispiel mit der Kachel „Blutdruckverlauf“ |

Was in welche Schicht gehört, beschreibt [Architektur, Kapitel 5](docs/architektur/05-bausteinsicht.md#wohin-neuer-code-gehört).
Befehl [B4](#41-im-dev-container) `npm run lint` prüft die [Regeln zwischen den Schichten](docs/architektur/05-bausteinsicht.md#regeln-zwischen-den-schichten).
Die Begriffe Port, Adapter und Facade erklärt das [Glossar](docs/architektur/12-glossar.md).

**Mit mehreren Terminals arbeiten**

1. Den Dev-Container wie in [3.3](#33-demo-app-weiterentwickeln-im-dev-container) öffnen.
2. Im ersten Terminal [B7](#41-im-dev-container) `npm run watch:lib` ausführen. B7 meldet `Compilation complete. Watching for file changes...` und baut die Bibliothek nach jeder gespeicherten Änderung neu.
3. Mit dem Plus in der Ansicht „Terminal“ ein zweites Terminal öffnen. Dort [B8](#41-im-dev-container) `npm run start:app` ausführen. B8 startet die Demo-App wie B2, aber ohne die Bibliothek zu bauen.
4. Nach jeder Änderung an der Bibliothek meldet das zweite Terminal `Page reload sent to client(s).` Der Browser lädt die Seite dann neu.
5. Mit dem Plus in der Ansicht „Terminal“ ein drittes Terminal öffnen. Dort testet [B10](#41-im-dev-container) `npx ng test fhir-vitals --watch=false` nur die Bibliothek und endet mit `TOTAL: 52 SUCCESS`.
6. Vor dem Abschluss einer Änderung B7 und B8 mit `Strg+C` beenden. Danach B3 und B4 ausführen.

**Neue Bausteine anlegen**

Komponenten und Services legt die Angular CLI mit `ng generate` an, siehe B11 bis B14 in [4.1](#41-im-dev-container).
Ohne `--path` landen Komponenten in der Angular-Datenschicht, siehe [Frage](#warum-liegt-eine-neue-komponente-in-angulardata).
Danach den neuen Baustein in der Datei `src/public-api.ts` seines Einstiegspunkts exportieren, siehe B15.
Ein neues Feature unter `angular/ui` beschreibt [Architektur, Kapitel 5](docs/architektur/05-bausteinsicht.md#ein-neues-ui-feature-anlegen) unter „Ein neues UI-Feature anlegen“.

**Anregungen für dieses Semester**

[Architektur, Kapitel 4](docs/architektur/04-loesungsstrategie.md) fasst die Architektur zusammen, an der sich die Weiterarbeit orientiert.
Die vorgeschlagenen Bibliotheken und ihre Alternativen beschreibt [Architektur, Kapitel 9](docs/architektur/09-architekturentscheidungen.md).

- weitere Vitalparameter aus der [Vital-Signs-Übersicht](https://hl7.org/fhir/R4/observation-vitalsigns.html) ergänzen. Dazu kommen Codes und Formatierung nach `core`, eigene Beispieldateien nach `projects/demo-app/public/assets/fhir/` und eine Komponente in ein UI-Feature wie `angular/ui/cards`.
- eine zweite Oberfläche mit Vue oder einem anderen Framework auf `fhir-vitals/core` und `fhir-vitals/fhir` aufbauen, siehe [Architektur, Kapitel 5](docs/architektur/05-bausteinsicht.md#andere-ui-frameworks)
- `core` und `fhir` in eigene npm-Pakete auslagern, sobald eine andere Oberfläche sie als Paket installieren soll

### 3.5 Ohne Container (nicht empfohlen)

> [!WARNING]
> Dieser Weg braucht Node.js 22 und Google Chrome oder Chromium auf dem eigenen Rechner.
> Andere Projekte brauchen oft andere Versionen von Node.js.
> Daraus entstehen schnell Konflikte zwischen Versionen und Einstellungen.
> Der Dev-Container aus [3.3](#33-demo-app-weiterentwickeln-im-dev-container) vermeidet das.
> Diesen Weg deshalb nur nutzen, wenn Docker auf dem eigenen Rechner nicht läuft.

1. Node.js 22 ab 22.22.3 installieren. Mit [nvm](https://github.com/nvm-sh/nvm) unter macOS und Linux genügen im Projektordner `nvm install` und `nvm use`, weil `.nvmrc` die Version vorgibt. Laut nvm installiert `nvm install` dabei die neueste Version 22. `node -v` zeigt danach eine Zeile `v22.…`. Ein Test mit nvm fehlt noch.
2. Befehl [B1](#41-im-dev-container) `npm ci` ausführen. Unter macOS meldete npm `added 605 packages, and audited 606 packages in 10s`.
3. Befehl [B2](#41-im-dev-container) `npm start` ausführen. Nach sechs Zeilen `Built fhir-vitals…` erscheint `Local: http://localhost:4200/`.
4. http://localhost:4200 im Browser öffnen. Die Seite gleicht der aus [3.2](#32-demo-app-starten-und-ansehen).
5. Für [B3](#41-im-dev-container) `npm test` Google Chrome installieren. Für Chromium die Umgebungsvariable `CHROME_BIN` setzen, siehe [Frage](#warum-finden-die-tests-keinen-browser).

Alle Befehle aus [4.1](#41-im-dev-container) laufen ohne Container genauso.
Beim Öffnen des Ordners schlägt VS Code die Erweiterungen aus `.vscode/extensions.json` vor.
Ohne Container die vorgeschlagenen Erweiterungen mit „Install“ auf dem eigenen Rechner installieren.
Was VS Code in einem Ordner ohne Vertrauen abschaltet, beschreibt [Architektur, Kapitel 8](docs/architektur/08-querschnittliche-konzepte.md#die-beispieldaten-und-ihre-codes) unter „Prüfen in Visual Studio Code“.
Unter Windows ist dieser Weg nicht geprüft.

### 3.6 Ausblick auf das nächste Semester

> [!NOTE]
> Nächstes Semester.
> In diesem Semester lässt sich dieser Abschnitt überspringen.

**HAPI FHIR starten**

[HAPI FHIR](https://hapifhir.io) ist ein FHIR-Server, der hier in einem Container läuft.
In `compose.yaml` gehört der Dienst `fhir` zum Profil `fhir`.
Compose startet und stoppt ihn nur, wenn der Befehl `--profile fhir` enthält.

Zusammen mit der Demo-App aus [3.2](#32-demo-app-starten-und-ansehen) startet Befehl [H1](#43-nächstes-semester-hapi-fhir) beide Container:

```bash
docker compose --profile fhir up --build
```

HAPI braucht nach dem Start etwa 40 Sekunden, bis der Server unter http://localhost:8080 antwortet.
Danach auf der Seite „Erneut verbinden“ klicken.
Die Seite meldet dann „verbunden, Patient und Blutdruck gespeichert“ und zeigt „Blutdruck vom Server: 104/66 mm[Hg]“.
Zum Beenden in einem zweiten Terminal [H7](#43-nächstes-semester-hapi-fhir) `docker compose --profile fhir down` ausführen.
Docker meldet dann für beide Container `Removed`.

Zusammen mit dem Dev-Container aus [3.3](#33-demo-app-weiterentwickeln-im-dev-container) läuft nur HAPI in Docker:

1. Läuft noch die Demo-App aus 3.2, sie zuerst mit H7 beenden.
2. Im Terminal des eigenen Rechners [H2](#43-nächstes-semester-hapi-fhir) ausführen:

   ```bash
   docker compose --profile fhir up -d fhir
   ```

   Compose meldet `Container angular-fhir-vitals-fhir-1 Started`.
3. Im Dev-Container B2 `npm start` ausführen und die Seite öffnen. Die Demo-App erreicht HAPI unter http://localhost:8080, denn der Browser läuft auf dem eigenen Rechner. Nach etwa 40 Sekunden auf der Seite „Erneut verbinden“ klicken.
4. H7 stoppt HAPI wieder und meldet `Container angular-fhir-vitals-fhir-1 Removed`.

Ein Test dieser Kombination im Browser fehlt noch.
Weitere Befehle stehen in [4.3](#43-nächstes-semester-hapi-fhir). Probleme und Lösungen stehen in [5.4](#54-nächstes-semester-hapi-fhir).

**Weitere Schritte mit HAPI FHIR und dem Backend**

- für neue Ressourcen IDs mit mindestens einem Buchstaben wählen, etwa `puls-01`. HAPI lehnt in der Voreinstellung ein PUT mit rein numerischer ID ab.
- für Daten, die einen Neustart überleben, HAPI mit der Datenbank PostgreSQL betreiben. Folie 80 des Vortrags „Technologiestack“ zeigt die passende `compose.yaml`. Die Foliennummer steht unten auf der Folie und weicht von der Seitenzahl im PDF ab. Die Datei liegt hinter dem Link zum Vortrag im Ordner „Material Technologiestack/Beispiele“.
- optional und frühestens im nächsten Semester die Anmeldung über [SMART App Launch](https://hl7.org/fhir/smart-app-launch/) ergänzen. Das Paket `fhirclient` unterstützt diesen Ablauf mit OAuth 2.0, einem Standard für die Freigabe von Zugriffen.

**Ideen für das Dashboard**

Diese Punkte sind Hinweise und keine fertige Lösung.

- Kacheln verschiebbar und in der Größe änderbar machen. In gridstack schaltet `staticGrid: false` das Ziehen mit der Maus wieder ein.
- weitere Kachelarten ergänzen, etwa einen Pulsverlauf oder die letzte Messung in großen Ziffern. Neue Komponenten mit Befehl [B14](#41-im-dev-container) anlegen.
- das Layout, also die Anordnung der Kacheln mit Spalte, Zeile, Breite und Höhe, als JSON in `core` beschreiben. Zum Speichern einen Port in `core` und einen Adapter in `fhir` ergänzen, etwa für den Speicher des Browsers oder einen Server, siehe [Architektur, Kapitel 4](docs/architektur/04-loesungsstrategie.md). Port meint hier eine Schnittstelle der Architektur und keine Nummer wie 4200, siehe [Glossar](docs/architektur/12-glossar.md). So kann auch eine Oberfläche mit Vue dasselbe Layout nutzen.
- die Messwerte zusätzlich als Tabelle zeigen. Ein Screenreader, also ein Programm, das den Inhalt einer Seite vorliest, kann eine Tabelle Zelle für Zelle vorlesen. Die Tabelle ergänzt so die Textalternative des Diagramms, also den Text, der das Diagramm für Screenreader beschreibt.
- eine Bedienung ohne Ziehen anbieten, etwa Knöpfe „Nach links“ oder „Breiter“ an jeder Kachel. Kriterium 2.5.7 „Dragging Movements“ der WCAG 2.2, der Richtlinien für barrierefreie Webinhalte, verlangt für jede Funktion mit Ziehen einen Weg ohne Ziehen, etwa durch einfaches Klicken. Knöpfe funktionieren außerdem mit der Tastatur.
- schmale Fenster beachten. In der Ansicht mit einer Spalte meldet gridstack Positionen für eine Spalte. Im Test am 06.11.2026 hatte die Kachel bei 560 Pixeln Fensterbreite in gridstack die Breite 1 statt 8. Solche Positionen dürfen ein gespeichertes Layout mit 12 Spalten nicht überschreiben.

## 4 Befehle

Alle Befehle im Ordner `angular-fhir-vitals` ausführen, dem Wurzelverzeichnis des Repositorys.
Im Terminal des eigenen Rechners wechselt `cd ~/angular-fhir-vitals` dorthin, siehe [3.1](#31-repository-klonen).
Die Kennung in der ersten Spalte, etwa B2, dient als Ziel für Verweise aus anderen Teilen der Dokumentation.
Die Spalte „Ergebnis“ gibt die tatsächliche Ausgabe wieder.
Begriffe wie npm-Skript, npx, Einstiegspunkt und Chunk erklärt das [Glossar](docs/architektur/12-glossar.md).

| Tabelle | Kennungen | Wo ausführen |
|---|---|---|
| [4.1 Im Dev-Container](#41-im-dev-container) | B1 bis B15 | im Terminal von VS Code im Dev-Container oder ohne Container wie in 3.5 |
| [4.2 Auf dem eigenen Rechner mit Docker](#42-auf-dem-eigenen-rechner-mit-docker) | D1 bis D6 | im Terminal des eigenen Rechners, siehe [2.2](#22-terminal-öffnen) |
| [4.3 Nächstes Semester: HAPI FHIR](#43-nächstes-semester-hapi-fhir) | H1 bis H7 | im Terminal des eigenen Rechners |
| [4.4 Für die Betreuung: GitHub Pages](#44-für-die-betreuung-github-pages) | P1 und P2 | auf GitHub |

<details>
<summary>Wann und wo die Befehle geprüft wurden</summary>

- Am 05.11.2026 liefen alle Befehle mit den Versionen aus [Architektur, Kapitel 2](docs/architektur/02-randbedingungen.md).
- Am 06.11.2026 liefen unter macOS nach mehreren Umbauten erneut B1 bis B6, B9 und B10. In einer Kopie des Repositorys liefen dazu B12 bis B15. Die Demo-App lief dabei auch zusammen mit HAPI FHIR aus dem Profil `fhir`.
- Am 17.11.2026 liefen B1 bis B6 im Dev-Container unter macOS. Dafür diente die [Dev Containers CLI](https://github.com/devcontainers/cli) 0.90.0, ein Kommandozeilenwerkzeug, das Dev-Container ohne VS Code baut und startet. Die Ausgaben glichen denen ohne Container. Nur B1 meldete 611 statt 605 Pakete. H2 startete am selben Tag in einer Kopie des Repositorys nur HAPI FHIR. Weil Port 8080 belegt war, lief HAPI dabei über eine Zusatzdatei auf Port 18080.
- Danach kam `NODE_OPTIONS` in `devcontainer.json` dazu. Mit dieser Einstellung liefen am selben Tag B1 bis B10 erneut mit der Dev Containers CLI. B2 und B8 zeigten nun `Local: http://127.0.0.1:4200/`. B7 baute nach einer Änderung in `core` in 171 Millisekunden neu, und B8 meldete `Page reload sent to client(s).` Nach einer Änderung in `app.html` meldete B8 `Component update sent to client(s).` Die übrigen Ausgaben stimmten mit den Tabellen überein.
- Ebenfalls am 17.11.2026 liefen unter macOS in VS Code 1.141.1 mit der Erweiterung Dev Containers 0.473.0 die Schritte aus 3.3 bis zur Seite im Browser. Dabei zeigte B2 `Local: http://127.0.0.1:4200/`. Dazu liefen D2, D4 und D5.
- Ebenfalls am 17.11.2026 lief B10 ohne Container unter macOS mit Google Chrome 157.
- Unter Windows und Linux fehlt ein Test.

</details>

### 4.1 Im Dev-Container

| Kennung | Befehl | Wozu | Ergebnis |
|---|---|---|---|
| B1 | `npm ci` | Der Befehl installiert alle Pakete genau nach `package-lock.json` und löscht vorher einen vorhandenen Ordner `node_modules`. Er ist nach dem Klonen und nach jeder Änderung an `package-lock.json` nötig. Im Dev-Container läuft er beim ersten Start von selbst. | Im Dev-Container erscheint `added 611 packages, and audited 612 packages in …`. Ohne Container meldete npm unter macOS `added 605 packages, and audited 606 packages in 10s`. Davor stehen Warnungen `npm warn deprecated`. Danach folgt eine Zeile wie `9 moderate severity vulnerabilities`, siehe [Frage](#warum-meldet-npm-ci-warnungen-und-schwachstellen). |
| B2 | `npm start` | Der Befehl baut die Bibliothek einmal und startet die Demo-App mit dem Entwicklungsserver auf Port 4200. Nach jeder gespeicherten Änderung an der Demo-App baut der Server neu und aktualisiert die Seite im Browser. Änderungen an der Bibliothek übernimmt er nicht, denn er nutzt die gebaute Bibliothek aus `dist/fhir-vitals`. Dafür B7 und B8 nutzen, siehe [3.4](#34-bibliothek-weiterentwickeln-im-dev-container). | Sechs Zeilen `Built fhir-vitals…`, eine für das Paket und eine je Einstiegspunkt. Danach folgt im Dev-Container `Local: http://127.0.0.1:4200/` und ohne Container `Local: http://localhost:4200/`. Die Seite ist in beiden Fällen unter http://localhost:4200 erreichbar. Die Konsole des Browsers meldet `NG0751`, siehe [Frage](#was-bedeutet-ng0751-in-der-konsole-des-browsers). `Strg+C` beendet den Server. |
| B3 | `npm test` | Der Befehl baut die Bibliothek und testet dann Bibliothek und Demo-App nacheinander. Er ist vor jedem Commit nötig. | Die sechs Zeilen `Built fhir-vitals…`, dann `TOTAL: 52 SUCCESS` für die Bibliothek und `TOTAL: 3 SUCCESS` für die Demo-App. Im zweiten Block stehen vier Warnungen `WARN [web-server]: 404: /base/media/roboto-latin-…`, siehe [Frage](#warum-meldet-npm-test-warnungen-zu-roboto). |
| B4 | `npm run lint` | Der Befehl prüft den Code mit ESLint. Dazu gehören die Regeln zwischen den Schichten aus [Architektur, Kapitel 5](docs/architektur/05-bausteinsicht.md#regeln-zwischen-den-schichten). Er ist vor jedem Commit nötig. | Nur die beiden Kopfzeilen `> angular-fhir-vitals@0.0.0 lint` und `> eslint .`. Ohne weitere Ausgabe hat ESLint nichts zu beanstanden. |
| B5 | `npm run format` | Der Befehl formatiert TypeScript, HTML und CSS einheitlich mit Prettier. Im Dev-Container formatiert VS Code diese Dateien laut seiner Dokumentation schon beim Speichern. | Eine Zeile je Datei. `(unchanged)` heißt, dass die Datei schon passte. |
| B6 | `npm run build` | Der Befehl baut erst die Bibliothek und dann die Demo-App für die Auslieferung nach `dist/demo-app`. | Sechs Zeilen `Built fhir-vitals…`, dann die Tabelle `Initial chunk files` mit der Zeile `Initial total` und `329.44 kB`, geschätzt `89.83 kB` bei der Übertragung. Unter `Lazy chunk files` steht `fhir-vitals-angular-ui-dashboard` mit `271.24 kB`, geschätzt `76.38 kB`. Eine Warnung zum Budget erscheint nicht. Am Ende folgen `Application bundle generation complete` und `Output location: …/dist/demo-app`. |
| B7 | `npm run watch:lib` | Der Befehl baut die Bibliothek bei jeder gespeicherten Änderung neu. Er läuft in einem eigenen Terminal zusammen mit B8. | `Compilation complete. Watching for file changes...`. Nach jeder Änderung folgt ein Block mit `Build at: …`. Der Neubau dauerte im Test 0,1 bis 0,2 Sekunden. |
| B8 | `npm run start:app` | Der Befehl startet nur die Demo-App, ohne die Bibliothek zu bauen. Er läuft in einem zweiten Terminal zusammen mit B7. | `Local: …:4200/` wie bei B2. Nach einer Änderung in der Bibliothek erscheint `Page reload sent to client(s).` Der Browser lädt die Seite dann neu. Vom Speichern bis zum Neuladen verging im Test weniger als eine Sekunde. |
| B9 | `npx ng build fhir-vitals` | Der Befehl baut die Bibliothek mit allen fünf Einstiegspunkten einmal nach `dist/fhir-vitals`. Er ist vor B8 nötig, wenn B7 nicht läuft. | Sechs Zeilen `Built …` für `fhir-vitals`, `fhir-vitals/core`, `fhir-vitals/fhir`, `fhir-vitals/angular/data`, `fhir-vitals/angular/ui/cards` und `fhir-vitals/angular/ui/dashboard`, dann `Built Angular Package`. `core` kommt immer vor den Schichten, die es nutzen. |
| B10 | `npx ng test fhir-vitals --watch=false` | Der Befehl testet alle Einstiegspunkte der Bibliothek direkt aus den Quellen. Die Bibliothek muss dafür nicht gebaut sein. | `TOTAL: 52 SUCCESS` |

#### Neue Bausteine anlegen

`ng generate` legt Dateien ohne `--path` unter dem Ordner aus `sourceRoot` in `angular.json` an.
Für die Bibliothek ist das `projects/fhir-vitals/angular/data/src`, also die Angular-Datenschicht.

| Kennung | Befehl | Wozu | Ergebnis |
|---|---|---|---|
| B11 | `npx ng generate service <name> --project fhir-vitals` | Der Befehl legt einen Service in der Angular-Datenschicht `fhir-vitals/angular/data` an. Dorthin gehören Services, die Daten laden oder den Zustand der Daten halten. Logik, die auch andere Frameworks brauchen, gehört dagegen ohne Decorator nach `core`. | Zwei Zeilen `CREATE projects/fhir-vitals/angular/data/src/lib/<name>.ts` und `…/<name>.spec.ts`. Die Klasse trägt den Decorator `@Service()`. |
| B12 | `npx ng generate service <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/cards/src/lib` | Der Befehl legt einen UI-Service im Feature `fhir-vitals/angular/ui/cards` an. Ein UI-Service enthält Logik nur für die Oberfläche, etwa zum Öffnen eines Dialogs. | Zwei Zeilen `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/<name>.spec.ts` und `…/<name>.ts`, jeweils mit der Größe in Bytes. Mit dem Namen `dialog-opener` heißt die Klasse `DialogOpener` und trägt ebenfalls `@Service()`. |
| B13 | `npx ng generate component <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/cards/src/lib` | Der Befehl legt eine Komponente im Feature `fhir-vitals/angular/ui/cards` an, etwa eine Karte mit Messwerten. | Vier Zeilen `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/<name>/<name>.css`, `.spec.ts`, `.ts` und `.html`, jeweils mit der Größe in Bytes. Mit dem Namen `vitals-card` heißt die Klasse `VitalsCard` und der Selektor `lib-vitals-card`. |
| B14 | `npx ng generate component <name> --project fhir-vitals --path projects/fhir-vitals/angular/ui/dashboard/src/lib` | Der Befehl legt eine Komponente im Feature `fhir-vitals/angular/ui/dashboard` an, etwa eine weitere Kachel. | Vier Zeilen `CREATE projects/fhir-vitals/angular/ui/dashboard/src/lib/<name>/<name>.css`, `.spec.ts`, `.ts` und `.html`, jeweils mit der Größe in Bytes. Mit dem Namen `weight-chart` heißt die Klasse `WeightChart` und der Selektor `lib-weight-chart`. |
| B15 | Zeile in `src/public-api.ts` des Einstiegspunkts ergänzen, etwa `export * from "./lib/vitals-card/vitals-card";` in `projects/fhir-vitals/angular/ui/cards/src/public-api.ts` | Die Zeile macht einen neuen Baustein außerhalb der Bibliothek sichtbar. Sie ist nach jedem neuen Service, jeder neuen Komponente und jeder neuen Datei in `core` oder `fhir` nötig. | Nach dem nächsten Build der Bibliothek klappt in der Demo-App `import { VitalsCard } from "fhir-vitals/angular/ui/cards";`. Ohne die Zeile meldet der Build `TS2305: Module '"fhir-vitals/angular/ui/cards"' has no exported member 'VitalsCard'.` |

### 4.2 Auf dem eigenen Rechner mit Docker

`compose.yaml` bindet die Datei `projects/demo-app/public/config.json` als Bind-Mount in den Container ein.
Der Container liest damit direkt die Datei auf dem eigenen Rechner.

| Kennung | Befehl | Wozu | Ergebnis |
|---|---|---|---|
| D1 | `docker compose up --build` | Der Befehl baut das Image und startet die Demo-App auf http://localhost:4200. Er ist beim ersten Start und nach jeder Änderung am Code nötig. | Erst die Schritte des Builds, dann Zeilen mit `demo-app-1 \|`, darunter eine mit `nginx/1.31.8`. `Strg+C` stoppt den Container. |
| D2 | `docker compose up --build -d` | Der Befehl startet die Demo-App wie D1, aber im Hintergrund. Das Terminal bleibt so frei. | `Container angular-fhir-vitals-demo-app-1 Started` |
| D3 | `docker compose logs -f demo-app` | Der Befehl zeigt das Protokoll von nginx und folgt neuen Zeilen. Er hilft bei der Fehlersuche. | Je Seitenaufruf Zeilen wie `"GET /config.json HTTP/1.1" 200`. `Strg+C` beendet nur die Anzeige. |
| D4 | `docker compose ps` | Der Befehl zeigt die laufenden Container des Projekts und ihre Ports. | Eine Zeile `angular-fhir-vitals-demo-app-1 … Up … 127.0.0.1:4200->80/tcp` |
| D5 | `docker compose down` | Der Befehl stoppt und entfernt die Demo-App. | `Container angular-fhir-vitals-demo-app-1 Removed` und `Network angular-fhir-vitals_default Removed` |
| D6 | `projects/demo-app/public/config.json` im Editor ändern, speichern und die Seite neu laden | Die Datei nennt die Adresse des FHIR-Servers. Eine Änderung braucht keinen neuen Build. | Mit `{ "fhirBaseUrl": null }` oder `""` zeigt der Status „nicht konfiguriert“. |

### 4.3 Nächstes Semester: HAPI FHIR

> [!NOTE]
> Nächstes Semester.
> In diesem Semester lässt sich dieser Abschnitt überspringen.

Das Feld `total` eines FHIR-Bundles nennt die Zahl der Treffer.

| Kennung | Befehl | Wozu | Ergebnis |
|---|---|---|---|
| H1 | `docker compose --profile fhir up --build` | Der Befehl startet Demo-App und HAPI FHIR zusammen. | Zeilen mit `demo-app-1 \|` und `fhir-1 \|`. Nach etwa 40 Sekunden meldet HAPI `Started Application in … seconds`. |
| H2 | `docker compose --profile fhir up -d fhir` | Der Befehl startet nur HAPI FHIR im Hintergrund, etwa zum Dev-Container aus 3.3. | `Container angular-fhir-vitals-fhir-1 Started` |
| H3 | `docker compose --profile fhir logs -f fhir` | Der Befehl zeigt das Protokoll von HAPI und folgt neuen Zeilen. Er hilft, wenn HAPI nicht startet. | Zeilen mit `fhir-1 \|`. Bei jeder Anfrage erscheint eine Zeile `fhirtest.access`. `Strg+C` beendet nur die Anzeige. |
| H4 | `curl http://localhost:8080/fhir/metadata` | Der Befehl fragt die Selbstbeschreibung des Servers ab. So zeigt er, ob HAPI bereit ist. | Sobald HAPI bereit ist, JSON mit `"resourceType": "CapabilityStatement"`. Vorher meldet curl einen Verbindungsfehler. |
| H5 | http://localhost:8080 im Browser öffnen | Die Adresse öffnet die Weboberfläche von HAPI. Dort lassen sich die Ressourcen auf dem Server ansehen. | Die Testoberfläche mit dem Titel „HAPI FHIR“ |
| H6 | `curl "http://localhost:8080/fhir/Observation?subject=Patient/beispiel-01"` | Der Befehl sucht alle Messungen des Beispielpatienten. So lässt sich das Speichern prüfen. | Ein FHIR-Bundle mit `"total": 1` und der Observation `blutdruck-01`. Die sieben Messungen aus `blutdruck-verlauf.json` liegen nur in dieser Beispieldatei der Demo-App und nicht auf dem Server. |
| H7 | `docker compose --profile fhir down` | Der Befehl stoppt und entfernt alle Container des Projekts. Ohne `--profile fhir` läuft HAPI weiter. | `Removed` für `fhir-1`, `demo-app-1` und das Netzwerk. Danach läuft kein Container des Projekts mehr. |

In Windows PowerShell 5.1 ist `curl` ein Alias für `Invoke-WebRequest` und versteht andere Parameter.
Dort `curl.exe` statt `curl` schreiben.
Im Terminal von Ubuntu und in PowerShell 7 gilt das nicht.

### 4.4 Für die Betreuung: GitHub Pages

Dieser Teil betrifft nur die Betreuung, denn sie pflegt das Repository auf GitHub.
In diesem Semester arbeiten die Studierenden in einer Kopie auf dem eigenen Rechner und laden nichts zu GitHub hoch.
[GitHub Pages](docs/architektur/12-glossar.md) veröffentlicht statische Webseiten aus einem Repository.
Statische Webseiten bestehen aus fertigen Dateien wie HTML, JavaScript und JSON.

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

**Einmalig einrichten.**
Vor dem ersten Push auf `main` in den Einstellungen des Repositorys unter Settings, Pages, „Build and deployment“ bei „Source“ den Eintrag „GitHub Actions“ wählen.
Danach schlägt GitHub Vorlagen für Workflows vor.
Keine davon wählen, denn `pages.yml` gibt es schon.

**Fehler bei der Einrichtung.**

- „Source“ steht noch auf „Deploy from a branch“: Im Tab Actions läuft bei jedem Push zusätzlich der Workflow „pages build and deployment“. Die Pages-Adresse zeigt dann dieses README statt der Demo-App.
- Pages ist ganz ausgeschaltet: Der Job `build` scheitert im Schritt `actions/configure-pages` mit `Get Pages site failed`. Der Job `deploy` läuft dann nicht.

In beiden Fällen die Einstellung nachholen und den Workflow „Deploy demo app to GitHub Pages“ neu starten.
Für einen gescheiterten Lauf im Lauf selbst im Menü „Re-run jobs“ den Eintrag „Re-run failed jobs“ wählen und im folgenden Dialog „Re-run jobs“ klicken.
Sonst den Workflow wie mit P2 von Hand starten.

| Kennung | Befehl | Wozu | Ergebnis |
|---|---|---|---|
| P1 | `git push` auf `main` | Der Push startet den Workflow „Deploy demo app to GitHub Pages“. Er ist nach jeder Änderung nötig, die online erscheinen soll. | Im Tab Actions des Repositorys erscheint ein Lauf mit den Jobs `build` und `deploy`. Danach zeigt die Pages-Adresse Herrn K. und den Status „nicht konfiguriert“. |
| P2 | im Tab Actions links den Workflow „Deploy demo app to GitHub Pages“ wählen, „Run workflow“ klicken, den Branch `main` lassen und im aufgeklappten Feld erneut „Run workflow“ klicken | Die Schritte starten denselben Workflow von Hand. So lässt sich ohne neuen Commit neu veröffentlichen. | Ein neuer Lauf mit denselben Jobs |

## 5 Häufige Fragen

Die Fragen sind nach Themen gegliedert.
Jede Antwort nennt Meldung, Ursache und Lösung.

- [5.1 Installation und Start](#51-installation-und-start)
- [5.2 Anzeige im Browser](#52-anzeige-im-browser)
- [5.3 Entwickeln](#53-entwickeln)
- [5.4 Nächstes Semester: HAPI FHIR](#54-nächstes-semester-hapi-fhir)

### 5.1 Installation und Start

#### Warum erreicht `docker compose` Docker nicht?

- **Meldung:** `failed to connect to the docker API at unix://…/docker.sock; check if the path is correct and if the daemon is running`. Diese Meldung zeigte Docker 29.9.3 unter macOS, als unter der Adresse kein Docker lief. Unter Windows meldet das Terminal von Ubuntu stattdessen, dass es den Befehl `docker` nicht findet.
- **Ursache:** Docker Desktop läuft nicht. Unter Linux läuft der Dienst von Docker Engine nicht. Unter Windows kann auch die WSL-Integration für Ubuntu ausgeschaltet sein.
- **Lösung:** Docker Desktop starten und den Befehl wiederholen. Unter Windows in Docker Desktop unter Settings, Resources, WSL Integration Ubuntu einschalten und das Terminal von Ubuntu neu öffnen. Unter Linux startet laut Docker `sudo systemctl start docker` den Dienst. Ein Test unter Windows und Linux fehlt noch.

#### Warum meldet `docker compose` `no configuration file provided`?

- **Meldung:** `no configuration file provided: not found`
- **Ursache:** Das Terminal steht nicht im Ordner des Repositorys. Compose findet dann keine Datei `compose.yaml`.
- **Lösung:** `cd ~/angular-fhir-vitals` ausführen und den Befehl wiederholen.

#### Warum meldet `npm ci` Warnungen und Schwachstellen?

- **Meldung:** `npm warn deprecated` zu `inflight`, `rimraf` und `glob` und eine Zeile wie `9 moderate severity vulnerabilities`
- **Ursache:** Die Warnungen stammen aus dem Testrunner Karma 6.4.4. Das Karma-Projekt entwickelt Karma nicht mehr weiter. Das [Patientenportal](docs/architektur/12-glossar.md) nutzt Karma trotzdem, und der Starter folgt ihm darin. Die Schwachstellen betreffen das Paket `minimatch` in der Kette von ESLint. Beides betrifft nur Entwicklungswerkzeuge und nicht den Code, der im Browser läuft. Die Zahl der Schwachstellen ändert sich mit der Datenbank, die npm bei jedem Lauf abfragt. Am 06.11.2026 waren es 14 und am 17.11.2026 noch 9.
- **Lösung:** Nichts tun. `npm audit fix --force` nicht ausführen, weil es Pakete auf unpassende Versionen ändert. `npm audit fix` ohne `--force` ändert `package-lock.json`. Am 17.11.2026 zeigte ein Probelauf mit `npm audit fix --dry-run` neuere Patches für die Kette von ESLint, etwa `add minimatch 11.0.9`. Solche Änderungen gehören in einen eigenen Commit.

#### Wo erscheint der Hinweis „Reopen in Container“?

- **Meldung:** Nach dem Öffnen des Ordners fehlt der Hinweis „Folder contains a Dev Container configuration file.“
- **Ursache:** VS Code zeigt Hinweise unten rechts nur kurz. Danach liegen sie hinter der Glocke in der Statusleiste. Im Test unter macOS lagen beide Hinweise dort.
- **Lösung:** Auf die Glocke unten rechts klicken. Alternativ mit `F1` oder `Strg+Umschalt+P`, unter macOS `Cmd+Umschalt+P`, die [Befehlspalette](docs/architektur/12-glossar.md) öffnen und `Dev Containers: Reopen in Container` wählen. Fehlt dieser Befehl, ist die Erweiterung Dev Containers nicht installiert.

#### Warum meldet das Terminal `docker: command not found`?

- **Meldung:** Nach `docker compose` meldet das Terminal im Dev-Container `bash: docker: command not found`.
- **Ursache:** Ist das Fenster mit dem Dev-Container verbunden, läuft sein Terminal im Container. Dort gibt es kein Docker. Im Terminal von Ubuntu unter Windows hat eine ähnliche Meldung eine andere Ursache, siehe [Frage](#warum-erreicht-docker-compose-docker-nicht).
- **Lösung:** Befehle mit `docker` in einem Terminal des eigenen Rechners ausführen, siehe [2.2](#22-terminal-öffnen). Unter macOS ist das die App Terminal und unter Windows das Terminal von Ubuntu.

#### Warum braucht `docker` unter Linux `sudo`?

- **Meldung:** Ohne `sudo` bricht `docker` mit einer Meldung ab, die mit `permission denied while trying to connect to the` beginnt. Dev Containers kann den Container nicht starten. Der genaue Text ist unter Linux noch nicht geprüft.
- **Ursache:** Docker Engine erlaubt den Zugriff ohne `sudo` nur Mitgliedern der Gruppe `docker`. Laut VS Code braucht Dev Containers diese Mitgliedschaft.
- **Lösung:** `sudo usermod -aG docker $USER` ausführen und sich ab- und wieder anmelden. Laut Docker prüft `docker run hello-world` danach, ob Docker ohne `sudo` läuft. Ein Test unter Linux fehlt noch.

#### Warum ist Port 4200 belegt?

- **Meldung:** Der Entwicklungsserver meldet `Port 4200 is already in use. Use '--port' to specify a different port.` Hält ein anderer Container den Port, meldet Docker `Bind for 127.0.0.1:4200 failed: port is already allocated`. Diese Meldung trat im Test mit Port 8080 auf. Hält ein anderes Programm des eigenen Rechners den Port, etwa die Weiterleitung von VS Code, lautet die Meldung von Docker anders. Ein Test dafür fehlt noch.
- **Ursache:** Ein anderes Programm oder ein anderer Container nutzt den Port, etwa die Demo-App aus 3.2 oder ein zweiter Entwicklungsserver. Ein Port ist eine Nummer, unter der ein Programm auf einem Rechner erreichbar ist.
- **Lösung:** `docker ps` zeigt laufende Container mit ihren Ports in der Spalte PORTS, etwa `127.0.0.1:4200->80/tcp`. Unter macOS und Linux nennt `lsof -i :4200` in der Spalte COMMAND das Programm hinter dem Port. Unter Windows zeigt laut Microsoft `netstat -ano | findstr :4200` in PowerShell in der letzten Spalte die Prozessnummer. `tasklist /fi "PID eq <nummer>"` nennt dazu das Programm. Ein Test unter Windows fehlt noch. Das andere Programm beenden oder den Container mit `docker stop <name>` anhalten. `docker stop` gibt danach den Namen des Containers aus.

#### Warum zeigt `npm start` im Dev-Container `127.0.0.1`?

- **Meldung:** `npm start` zeigt im Dev-Container `Local: http://127.0.0.1:4200/` statt `Local: http://localhost:4200/`.
- **Ursache:** Im Image des Dev-Containers steht `localhost` zuerst für die IPv6-Adresse `::1`. Der Entwicklungsserver lauschte dann nur unter `[::1]:4200`. Die Weiterleitung von VS Code erreichte ihn dort nicht, und die Seite blieb leer. Deshalb setzt `devcontainer.json` die Umgebungsvariable `NODE_OPTIONS` auf `--dns-result-order=ipv4first`. Node.js wählt dann die IPv4-Adresse `127.0.0.1`.
- **Lösung:** Nichts tun. Im Browser des eigenen Rechners wie gewohnt http://localhost:4200 öffnen.

#### Warum lädt die Seite aus dem Dev-Container nicht?

- **Meldung:** http://localhost:4200 lädt nicht oder zeigt einen alten Stand der Demo-App.
- **Ursache:** Der Entwicklungsserver läuft nicht, oder die Demo-App aus 3.2 belegt Port 4200 noch. Im zweiten Fall zeigt der Browser den Stand des letzten Builds aus 3.2. Ein Test dieses Falls in VS Code fehlt noch.
- **Lösung:** Im Terminal des Dev-Containers prüfen, dass B2 läuft und `Local: http://127.0.0.1:4200/` zeigt. In der Ansicht „Ports“ prüfen, dass die Zeile „Demo-App (4200)“ unter „Forwarded Address“ `localhost:4200` nennt. Läuft die Demo-App aus 3.2 noch, sie im Terminal des eigenen Rechners mit D5 `docker compose down` beenden. Docker meldet dann `Removed`. Demo-App aus 3.2 und Dev-Container deshalb nicht gleichzeitig betreiben.

#### Warum liefert `config.json` im Container den Fehler 404?

- **Meldung:** Die Seite aus 3.2 findet `config.json` nicht. nginx antwortet mit 404.
- **Ursache:** Manche Editoren speichern eine Datei, indem sie sie durch eine neue Datei ersetzen. Der Bind-Mount hängt dann noch an der alten, gelöschten Datei.
- **Lösung:** `docker compose restart demo-app` bindet die neue Datei ein. Docker meldet danach `Container angular-fhir-vitals-demo-app-1 Started`, und die Seite liest `config.json` wieder.

#### Warum bricht die Angular CLI wegen der Node.js-Version ab?

- **Meldung:** `Node.js version … detected. The Angular CLI requires a minimum Node.js version of …`
- **Ursache:** Ohne Container nutzt die Angular CLI das Node.js des eigenen Rechners. Diese Version ist zu alt für Angular 22.2.
- **Lösung:** `node -v` zeigt die installierte Version. Node.js 22 ab 22.22.3 installieren. Mit nvm unter macOS oder Linux genügen `nvm install` und `nvm use` im Projektordner. Danach zeigt `node -v` eine Version 22. Der Dev-Container aus 3.3 bringt die passende Version schon mit.

#### Warum finden die Tests keinen Browser?

- **Meldung:** `No binary for ChromeHeadless browser on your platform. Please, set "CHROME_BIN" env variable.`
- **Ursache:** Ohne Container sucht der Testrunner Karma von selbst nur nach Google Chrome. Im Dev-Container setzt `devcontainer.json` die Variable `CHROME_BIN`. Ohne diese Variable meldete Karma dort am 17.11.2026 genau diesen Fehler.
- **Lösung:** Google Chrome installieren. Für Chromium oder einen Browser an einem ungewöhnlichen Ort die Umgebungsvariable `CHROME_BIN` auf die ausführbare Datei setzen. In den Terminals unter Linux und macOS setzt `export CHROME_BIN=/usr/bin/chromium` die Variable für das laufende Terminal. Der Befehl gibt nichts aus. Der Pfad gilt für das Paket `chromium` von Debian.

### 5.2 Anzeige im Browser

#### Warum zeigt die Karte „FHIR-Server“ „nicht erreichbar“?

- **Meldung:** Die Karte „FHIR-Server“ zeigt den Status „nicht erreichbar“.
- **Ursache:** Die Demo-App sucht einen FHIR-Server unter http://localhost:8080. In diesem Semester läuft dort keiner.
- **Lösung:** Nichts tun. Patient und Blutdruckverlauf kommen aus den Beispieldateien der Demo-App. HAPI FHIR kommt erst im nächsten Semester dazu, siehe [3.6](#36-ausblick-auf-das-nächste-semester).

#### Warum bleibt der Status bei „wird verbunden“?

- **Meldung:** Die Karte „FHIR-Server“ zeigt „wird verbunden …“ statt „nicht erreichbar“.
- **Ursache:** Ein anderes Programm belegt Port 8080, ist aber kein FHIR-Server. Im Test unter macOS lief dort ein anderes Projekt.
- **Lösung:** In diesem Semester nichts tun, denn Patient und Blutdruckverlauf erscheinen trotzdem. `docker ps` oder `lsof -i :8080` zeigt das Programm hinter dem Port, siehe [Frage](#warum-ist-port-4200-belegt).

#### Warum erscheint statt der Kachel nur „Dashboard wird geladen“?

- **Meldung:** Unter der Überschrift „Dashboard“ steht nur „Dashboard wird geladen …“.
- **Ursache:** `@defer (on viewport)` lädt das Dashboard erst, wenn dieser Text sichtbar wird.
- **Lösung:** Auf kleinen Bildschirmen bis zur Überschrift „Dashboard“ scrollen. Danach erscheint die Kachel.

#### Warum füllt die Karte die Kachel nicht aus?

- **Meldung:** Die Karte in der Kachel „Blutdruckverlauf“ und das Diagramm darin sind zu klein.
- **Ursache:** In `angular.json` fehlt unter `styles` die Datei `gridstack/dist/gridstack.min.css` der vorgeschlagenen Bibliothek gridstack. In einem Build ohne diese Datei war die Kachel am 06.11.2026 bei 1024 Pixeln Fensterbreite zwar 320 Pixel hoch. Die Karte darin war aber nur 204 Pixel hoch und das Diagramm nur 150 Pixel. Mit der Datei füllt die Karte die Kachel bis auf den Rand von 8 Pixeln aus, und das Diagramm ist 250 Pixel hoch.
- **Lösung:** Die Zeile wieder eintragen, wie im [README der Bibliothek](projects/fhir-vitals/README.md#globale-styles) unter „Globale Styles“ beschrieben. Danach den Entwicklungsserver oder den Build neu starten.

#### Was bedeutet `NG0751` in der Konsole des Browsers?

- **Meldung:** ``NG0751: Angular has detected that this application contains `@defer` blocks and the hot module replacement (HMR) mode is enabled. All `@defer` block dependencies will be loaded eagerly.``
- **Ursache:** HMR (Hot Module Replacement) tauscht geänderte Teile der App im Browser aus, ohne die ganze Seite neu zu laden. Der Entwicklungsserver nutzt es, und dabei lädt Angular die Pakete des Dashboards sofort mit.
- **Lösung:** Nichts tun. Die Meldung ist harmlos. In der App aus B6 `npm run build`, die auch das Docker-Image ausliefert, lädt der Browser das Dashboard erst, wenn es sichtbar wird.

### 5.3 Entwickeln

#### Warum findet der Build die Bibliothek nicht?

- **Meldung:** `npx ng build demo-app` meldet `Could not resolve "fhir-vitals/angular/data"` und dasselbe für `fhir-vitals/angular/ui/cards` und `fhir-vitals/angular/ui/dashboard`. `npm run start:app` meldet stattdessen `TS2307: Cannot find module 'fhir-vitals/angular/ui/cards' or its corresponding type declarations.` und dieselbe Meldung für die beiden anderen Einstiegspunkte.
- **Ursache:** Die Bibliothek ist nicht gebaut. Der Ordner `dist/fhir-vitals` fehlt.
- **Lösung:** B9 `npx ng build fhir-vitals` oder B7 `npm run watch:lib` ausführen oder gleich B2 `npm start` nutzen.

#### Warum meldet ESLint einen verbotenen Import?

- **Meldung:** `… import is restricted from being used by a pattern` mit einem Grund wie `Die UI spricht nicht selbst mit Servern`
- **Ursache:** Ein Import verletzt eine Regel zwischen den Schichten aus [Architektur, Kapitel 5](docs/architektur/05-bausteinsicht.md#regeln-zwischen-den-schichten). Dasselbe gilt für Importe der vorgeschlagenen Pakete gridstack, Chart.js oder ng2-charts außerhalb von `angular/ui/dashboard`.
- **Lösung:** Den Code in die passende Schicht oder das passende Feature verschieben. Eine Komponente bekommt Daten dann über ein Input, also eine Eigenschaft, die die einbindende Seite setzt. Die Demo-App holt die Daten über die Facade `VitalsFacade`. Danach zeigt B4 `npm run lint` nur noch die beiden Kopfzeilen.

#### Warum liegt eine neue Komponente in `angular/data`?

- **Meldung:** `npx ng generate component` legt die Dateien unter `projects/fhir-vitals/angular/data/src/lib` an.
- **Ursache:** Ohne `--path` nutzt die Angular CLI den Ordner aus `sourceRoot`, und der liegt in der Angular-Datenschicht.
- **Lösung:** Die neuen Dateien löschen und den Befehl wie B13 mit `--path projects/fhir-vitals/angular/ui/cards/src/lib` wiederholen, für eine Kachel wie B14. Danach erscheinen vier Zeilen wie `CREATE projects/fhir-vitals/angular/ui/cards/src/lib/vitals-card/vitals-card.css (0 bytes)`.

#### Warum meldet `npm test` Warnungen zu Roboto?

- **Meldung:** `WARN [web-server]: 404: /base/media/roboto-latin-…`
- **Ursache:** Die Tests der Demo-App nutzen die globalen Styles aus `angular.json`, also die CSS-Dateien unter `styles`, die für die ganze Seite gelten. Dazu gehört die vorgeschlagene Schrift Roboto aus `@fontsource/roboto`. Karma liefert die Schriftdateien im Test aber nicht aus. Daher kommen vier Warnungen für `roboto-latin-400-normal` und `roboto-latin-500-normal`, je als `.woff2` und `.woff`.
- **Lösung:** Nichts tun. Die Tests laufen trotzdem durch und enden mit `TOTAL: 3 SUCCESS`.

### 5.4 Nächstes Semester: HAPI FHIR

> [!NOTE]
> Nächstes Semester.
> In diesem Semester lässt sich dieser Abschnitt überspringen.

#### Warum ist Port 8080 belegt?

- **Meldung:** Docker meldet `Bind for 127.0.0.1:8080 failed: port is already allocated`.
- **Ursache:** Ein anderes Programm oder ein anderer Container nutzt Port 8080.
- **Lösung:** Das Programm wie in der [Frage zu Port 4200](#warum-ist-port-4200-belegt) finden und beenden. Alternativ HAPI auf einen anderen Port legen:
  1. In `compose.yaml` beim Dienst `fhir` unter `ports` den Eintrag `"127.0.0.1:8080:8080"` durch `"127.0.0.1:8081:8080"` ersetzen.
  2. In `projects/demo-app/public/config.json` den Wert von `fhirBaseUrl` in `http://localhost:8081/fhir` ändern.
  3. HAPI wie in [3.6](#36-ausblick-auf-das-nächste-semester) neu starten. `docker compose --profile fhir ps` zeigt dann für HAPI `127.0.0.1:8081->8080/tcp`.

  Überall, wo dieses README `localhost:8080` nennt, gilt dann `localhost:8081`.
  Beide Änderungen nicht committen, denn sie gelten nur für den eigenen Rechner.

#### Warum ist HAPI nach dem Start nicht erreichbar?

- **Meldung:** Die Karte „FHIR-Server“ zeigt weiter „nicht erreichbar“.
- **Ursache:** HAPI braucht nach dem Start etwa 40 Sekunden, bis der Server Anfragen beantwortet.
- **Lösung:** H4 `curl http://localhost:8080/fhir/metadata` prüft den Stand. Sobald JSON zurückkommt, auf der Seite „Erneut verbinden“ klicken. H3 zeigt, ob HAPI noch startet. Die Zeile `Started Application in … seconds` markiert das Ende.

#### Warum läuft HAPI nach `docker compose down` weiter?

- **Meldung:** Docker meldet beim Netzwerk `Resource is still in use`.
- **Ursache:** `docker compose down` ohne `--profile fhir` stoppt nur die Demo-App. Der Container von HAPI läuft weiter.
- **Lösung:** H7 `docker compose --profile fhir down` stoppt beide.

#### Warum erreicht `curl` im Dev-Container HAPI nicht?

- **Meldung:** `curl: (7) Failed to connect to localhost port 8080 after 1 ms: Could not connect to server`
- **Ursache:** Im Dev-Container meint `localhost` den Container. HAPI läuft aber auf dem eigenen Rechner.
- **Lösung:** `curl` im Terminal des eigenen Rechners ausführen. Die Demo-App im Browser betrifft das nicht, denn der Browser läuft auf dem eigenen Rechner.

#### Warum sind die Daten auf HAPI nach einem Neustart weg?

- **Meldung:** Nach einem Neustart des Containers ist der Server leer.
- **Ursache:** HAPI läuft hier ohne eigene Datenbank und hält die Daten im Arbeitsspeicher.
- **Lösung:** Die Demo-App schreibt die Beispieldaten beim nächsten Start oder nach „Erneut verbinden“ neu. Für dauerhafte Daten HAPI mit der Datenbank PostgreSQL betreiben, siehe [3.6](#36-ausblick-auf-das-nächste-semester).

## 6 Sprachmodelle im Studium

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
Für Arbeiten im Softwareprojekt deshalb die selbst betriebenen Modelle nutzen.
Quellen: [Dienstbeschreibung](https://academiccloud.de/services/chatai/), [Dokumentation](https://docs.hpc.gwdg.de/services/ai-services/chat-ai/index.html), [Datenschutz](https://datenschutz.gwdg.de/services/chatai).

**TUD:AI, die LLM-Dienste von ScaDS.AI Dresden/Leipzig.**
ScaDS.AI Dresden/Leipzig und das ZIH der TU Dresden betreiben die Dienste unter dem Namen TUD:AI.
Der Chat liegt unter https://chat.llm.scads.ai.
Die Programmierschnittstelle, kurz API, ist kompatibel zur OpenAI-API und hat die Basisadresse `https://llm.scads.ai/v1`.
Die [Dokumentation](https://llm.scads.ai/docs/) beschreibt Chat und API.
Der Dienst steht allen offen, die der TU Dresden oder ScaDS.AI Dresden/Leipzig angehören.
Für den Chat ist ein ZIH-Konto der TU Dresden nötig.
Für das Softwareprojekt gibt die Betreuung an der TU Dresden Zugang über ein Funktionslogin.
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

## 7 Links

Stand aller Links: 05.11.2026.
Die Links zum FHIR-Bundle und zu `$validate` und die vier Gruppen „Karten und Dashboard: vorgeschlagene Bibliotheken“, „Barrierefreiheit“, „npm-Paket und Vue“ und „Alternativen und ihre Lizenzen“ sind vom 06.11.2026.
Die Gruppen „Dev-Container und Editor“ und „Windows und Linux“ und der Link zu arc42 sind vom 17.11.2026.
Der Link zu Mermaid ist vom 18.11.2026.

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
- Ansicht „Ports“ in VS Code: https://code.visualstudio.com/docs/debugtest/port-forwarding. Die Freigabe über Dev Tunnels ins Internet auf derselben Seite braucht dieses Projekt nicht.
- Dev Containers CLI: https://github.com/devcontainers/cli
- `.gitattributes`: https://git-scm.com/docs/gitattributes
- EditorConfig: https://editorconfig.org und https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- Erweiterung ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Erweiterung Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Mermaid, die Textsprache der Diagramme in `docs/architektur`: https://mermaid.js.org
- Nutzungsdaten der Angular CLI: https://angular.dev/cli/analytics
- Karma und `CHROME_BIN`: https://github.com/karma-runner/karma-chrome-launcher

**Windows und Linux**

- WSL 2 installieren: https://learn.microsoft.com/en-us/windows/wsl/install
- Docker Desktop unter Windows installieren: https://docs.docker.com/desktop/setup/install/windows-install/
- Docker Desktop und WSL 2: https://docs.docker.com/desktop/features/wsl/
- WSL 2 und Docker Desktop, empfohlene Vorgehensweisen: https://docs.docker.com/desktop/features/wsl/best-practices/
- VS Code mit WSL: https://code.visualstudio.com/docs/remote/wsl
- Erweiterung WSL: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl
- Ordner aus WSL 2 im Dev-Container öffnen: https://code.visualstudio.com/docs/devcontainers/containers#_open-a-wsl-2-folder-in-a-container-on-windows
- Docker Engine unter Linux installieren: https://docs.docker.com/engine/install/
- Docker unter Linux ohne `sudo` nutzen: https://docs.docker.com/engine/install/linux-postinstall/

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

## 8 Lizenz

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

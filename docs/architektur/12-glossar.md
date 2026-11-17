# 12 Glossar

Teil der [Architektur von fhir-vitals](README.md).

| Begriff | Erklärung |
|---|---|
| Angular | ein Framework für Webanwendungen, die im Browser laufen |
| Angular CLI | das Kommandozeilenwerkzeug `ng` von Angular. Es legt Projekte und Bausteine an, baut sie und startet Tests. |
| TypeScript | eine Erweiterung von JavaScript um Typen. Angular-Code ist in TypeScript geschrieben. |
| Build | übersetzt den TypeScript-Code in JavaScript-Dateien für den Browser und legt sie im Ordner `dist` ab |
| Unit-Test | ein automatischer Test für eine einzelne Klasse oder Funktion, ohne die ganze App zu starten |
| Asset | eine statische Datei, die die App unverändert ausliefert, etwa JSON oder Bilder aus dem Ordner `public` |
| Bibliothek | ein Angular-Projekt mit wiederverwendbaren Services und Komponenten, das andere Anwendungen als Paket einbinden |
| Komponente | ein Baustein der Oberfläche aus TypeScript-Klasse, HTML-Template und CSS |
| Service | eine Klasse mit Logik ohne eigene Oberfläche, etwa für Datenzugriffe |
| Decorator | eine Markierung über einer Klasse wie `@Service()` oder `@Component()`. Angular erkennt daran, wie es die Klasse behandeln soll. |
| Dependency Injection | Angular erzeugt benötigte Objekte selbst und reicht sie weiter. Mit `inject(VitalsFacade)` holt sich eine Klasse den Service, statt ihn selbst zu bauen. |
| Einstiegspunkt | ein Teilpaket der Bibliothek mit eigenem Importnamen, etwa `fhir-vitals/core`, und eigener Datei `public-api.ts`. Der leere Platzhalter `fhir-vitals` zählt nicht dazu. |
| Public API | die öffentliche Schnittstelle eines Einstiegspunkts in `src/public-api.ts`. Nur was diese Datei exportiert, sehen andere Einstiegspunkte und Apps. |
| Trennung der Zuständigkeiten | englisch Separation of Concerns. Jeder Teil des Codes hat genau eine Aufgabe und kennt nur das, was er dafür braucht. |
| Schicht | ein Teil der Bibliothek mit einer festen Aufgabe, hier `core`, `fhir`, `angular/data` und `angular/ui`. Die Schicht `angular/ui` teilt sich in Features. |
| Feature | ein abgegrenzter Teil einer Schicht mit eigener Aufgabe und eigenem Einstiegspunkt, etwa `fhir-vitals/angular/ui/cards` oder `fhir-vitals/angular/ui/dashboard` |
| Direktive | ein Baustein ohne eigenes Template, der einem vorhandenen HTML-Element Verhalten gibt |
| UI-Service | ein Service nur für die Oberfläche, etwa zum Öffnen eines Dialogs. Er gehört in ein UI-Feature unter `angular/ui`, nicht nach `angular/data`. |
| Port (Architektur) | eine Schnittstelle, die beschreibt, was ein Ablauf von außen braucht, etwa das Speichern einer Ressource |
| Adapter | eine Umsetzung eines Ports mit einer bestimmten Technik, etwa `FhirClientConnection` mit fhirclient |
| Facade | ein einfacher Zugang für die Oberfläche, der die Einzelheiten dahinter verbirgt, hier `VitalsFacade` |
| Signal | ein Wert, dessen Änderungen Angular verfolgt. Die Seite aktualisiert sich, sobald ein Signal wie `state` der `VitalsFacade` einen neuen Wert bekommt. |
| Promise | ein Platzhalter für ein Ergebnis, das erst später feststeht, etwa die Antwort eines Servers. `await` wartet auf dieses Ergebnis. |
| zone.js | eine Bibliothek, die Angular Ereignisse wie Klicks oder Serverantworten meldet, damit Angular die Seite aktualisiert. Das Patientenportal nutzt sie. Die Demo-App übernimmt sie deshalb. |
| Entwicklungsserver | der Server, den `npm start` oder `npm run start:app` mit `ng serve` startet. Er liefert die App aus und lädt sie nach Änderungen neu. |
| FHIR-Ressource | ein Datensatz nach HL7 FHIR mit festem Aufbau, etwa `Patient` oder `Observation` |
| Profil | eine Vorgabe, welche Felder und Codes eine FHIR-Ressource für einen Zweck haben muss, etwa das Blutdruckprofil |
| Code (FHIR) | eine feste Kennung aus einem Codesystem wie LOINC oder UCUM, etwa `8480-6` für den systolischen Wert. Mit Programmcode hat er nichts zu tun. |
| LOINC | ein internationales Codesystem für Messungen und Laborwerte |
| UCUM | ein Codesystem für Maßeinheiten wie `mm[Hg]` |
| mm[Hg] | Millimeter Quecksilbersäule, die übliche Einheit für den Blutdruck. `mm[Hg]` ist ihr Code in UCUM. |
| REST | ein Stil für Schnittstellen über HTTP. Ein FHIR-Client liest Ressourcen mit GET und schreibt sie mit PUT unter `[Basis]/[Typ]/[id]`. |
| JSON | ein Textformat für strukturierte Daten aus Objekten, Listen und Werten |
| JSON-Schema | eine Beschreibung, welche Felder und Werte eine JSON-Datei haben darf. Editoren wie VS Code prüfen Dateien damit beim Tippen. |
| YAML | ein Textformat für Einstellungen, das die Gliederung durch Einrückung ausdrückt, etwa in `compose.yaml` und `pages.yml` |
| Workspace | ein Ordner mit mehreren Angular-Projekten und gemeinsamer Konfiguration in `angular.json` |
| peerDependency | ein Paket, das eine Bibliothek voraussetzt, das aber die einbindende Anwendung installiert |
| Backend | die Teile einer Anwendung, die auf einem Server laufen und nicht im Browser. Das Softwareprojekt arbeitet erst im nächsten Semester damit. |
| Frontend | die Teile einer Anwendung, die im Browser laufen. Die Demo-App ist ein reines Frontend. |
| Patientenportal | eine Anwendung der Forschungsgruppe im Repository `cross-hub-patientportal`. Nach seinem Frontend richten sich die Versionen des Starters, siehe [Kapitel 2](02-randbedingungen.md). |
| Container | ein laufender, abgeschotteter Prozess mit eigenem Dateisystem, gestartet aus einem Image |
| Image | eine Vorlage für Container mit Betriebssystemteilen, Programmen und Dateien |
| Docker | ein Werkzeug, das Programme aus Images in Containern startet. Unter Windows und macOS gehört es zu Docker Desktop. |
| Docker Compose | startet mehrere Container gemeinsam nach der Beschreibung in `compose.yaml` |
| nginx | ein Webserver. Im Image der Demo-App liefert er die gebauten Dateien aus. |
| Volume | ein Speicherbereich, den Docker selbst verwaltet und in Container einbindet. Compose führt Volumes und Bind-Mounts unter dem Schlüssel `volumes`. |
| Bind-Mount | eine Datei oder ein Ordner des eigenen Rechners, den Docker in einen Container einbindet. `compose.yaml` bindet so `config.json` ein. |
| HAPI FHIR | ein FHIR-Server. Compose startet ihn mit `--profile fhir` in einem Container auf Port 8080. Das Softwareprojekt arbeitet erst im nächsten Semester damit. |
| Profil in Compose | eine Gruppe von Diensten, die nur mit `--profile <name>` startet und stoppt. Der Dienst `fhir` gehört zum Profil `fhir`. |
| Port | eine Nummer, unter der ein Programm auf einem Rechner erreichbar ist, etwa 4200 für die Demo-App und 8080 für HAPI |
| Port-Weiterleitung | macht einen Port eines Containers auf dem eigenen Rechner erreichbar, etwa Port 80 von nginx als Port 4200 oder Port 4200 des Dev-Containers |
| localhost | der Name, unter dem ein Rechner sich selbst erreicht. Im Dev-Container meint `localhost` den Container und nicht den eigenen Rechner. |
| IPv4, IPv6 | zwei Arten von Adressen im Internet. `127.0.0.1` ist die IPv4-Adresse und `::1` die IPv6-Adresse für den eigenen Rechner. |
| Dev-Container | ein Container, in dem die ganze Entwicklungsumgebung läuft. Visual Studio Code öffnet den Projektordner darin. Die Beschreibung steht in `.devcontainer/devcontainer.json`. |
| Erweiterung | ein Zusatzprogramm für Visual Studio Code, etwa für Angular, ESLint oder FHIR |
| Befehlspalette | die Eingabezeile für alle Befehle von VS Code. `F1` oder `Strg+Umschalt+P` öffnet sie, unter macOS `Cmd+Umschalt+P`. |
| Statusleiste | die schmale Leiste am unteren Rand von VS Code. Links zeigt sie etwa „Dev Container: angular-fhir-vitals“ und rechts die Glocke für Hinweise. |
| Terminal | ein Programm, das Befehle in Textform entgegennimmt, etwa die App Terminal unter macOS oder Ubuntu unter Windows |
| Sandbox | ein Schutz von Chromium, der Webseiten vom übrigen System abschottet. Im Dev-Container ist sie abgeschaltet. Karma öffnet dort nur die Tests des Projekts. |
| WSL 2 | das Windows Subsystem for Linux. Es führt Linux-Systeme wie Ubuntu unter Windows aus. Docker Desktop nutzt es unter Windows. |
| Zeilenende | das unsichtbare Zeichen am Ende jeder Zeile einer Textdatei. Linux und macOS nutzen LF (Line Feed). Windows nutzt CRLF (Carriage Return und Line Feed). |
| Umgebungsvariable | ein benannter Wert, den das Betriebssystem oder das Terminal an jedes gestartete Programm weitergibt, etwa `CHROME_BIN` für Karma |
| Basis-Image | das fertige Image, auf dem ein eigenes Image aufbaut. In `.devcontainer/Dockerfile` nennt die Zeile `FROM` das Basis-Image. |
| root | der Administrator eines Linux-Systems mit allen Rechten |
| Node.js | eine Laufzeitumgebung für JavaScript außerhalb des Browsers. Sie führt die Angular CLI, den Build und die Tests aus. |
| npm | der Paketmanager von Node.js. Er installiert Pakete aus der npm-Registry in den Ordner `node_modules`. |
| `package-lock.json` | hält die genauen Versionen aller Pakete fest. `npm ci` installiert genau diese Versionen. |
| npm-Skript | ein Eintrag unter `scripts` in `package.json`, etwa `lint`. `npm run lint` startet ihn. Für `npm start` und `npm test` genügt der Name ohne `run`. |
| npx | startet ein Programm aus den installierten Paketen, etwa mit `npx ng` die Angular CLI aus `node_modules` |
| Karma | der Testrunner, also das Programm, das die Unit-Tests im Browser startet |
| Jasmine | die Bibliothek für die Unit-Tests. Sie liefert etwa `describe`, `it` und `expect`. |
| ESLint | prüft den Code auf Fehler und Regelverstöße, ohne ihn auszuführen. Hier prüft es auch die Regeln zwischen den Schichten. |
| Prettier | formatiert den Code einheitlich |
| Template | das HTML einer Komponente mit Platzhaltern für ihre Daten |
| Selektor | der Name des HTML-Elements, mit dem eine Seite eine Komponente einbindet, etwa `<lib-vitals-card>` |
| RxJS | eine Bibliothek für Datenströme. Angular nutzt sie etwa für die Antworten von HttpClient. |
| fhirclient | eine JavaScript-Bibliothek für den Zugriff auf FHIR-Server, hier im Adapter `FhirClientConnection` |
| fetch | die eingebaute Funktion des Browsers für HTTP-Anfragen |
| synthetische Daten | erfundene Daten, die echten Daten nur ähneln. Alle Daten in diesem Repository sind synthetisch. |
| InjectionToken | ein Schlüssel, unter dem Angular einen Wert ohne eigene Klasse bereitstellt, hier `CONNECT_TO_SERVER` in `projects/fhir-vitals/angular/data/src/lib/vitals-facade.ts` für den Adapter zum Server. Tests setzen dort einen anderen Adapter ein. |
| PendingTasks | ein Dienst von Angular, bei dem Code laufende Arbeiten anmeldet. `VitalsFacade` meldet dort ihren Ablauf an. Tests warten mit `whenStable()`, bis alle angemeldeten Arbeiten fertig sind. |
| DestroyRef | meldet, wenn Angular einen Service oder eine Komponente beendet. `VitalsFacade` meldet sich dann bei `VitalsSync` ab. |
| sourceRoot | der Eintrag in `angular.json`, der den Quellordner eines Projekts nennt. Ohne `--path` legt `ng generate` neue Dateien darunter an. |
| Bezeichner | der Name einer Klasse, Funktion oder Variablen im Code, etwa `VitalsFacade` |
| arc42 | eine Vorlage für Architekturdokumentation mit zwölf festen Kapiteln. Der Ordner `docs/architektur` folgt ihr. |
| Mermaid | eine Textsprache für Diagramme. GitHub zeigt den Block in [Kapitel 5](05-bausteinsicht.md#wie-die-teile-zusammenspielen) als Diagramm. Die Vorschau von Visual Studio Code zeigt ihn mit der Erweiterung Markdown Preview Mermaid Support. |
| GitHub Actions | ein Dienst von GitHub, der Workflows ausführt, etwa bei jedem Push |
| Workflow | ein automatischer Ablauf aus Jobs und Schritten, beschrieben in einer YAML-Datei unter `.github/workflows/`. Jede Ausführung heißt Lauf. |
| Job | eine Folge von Schritten in einem Workflow, die GitHub auf einem eigenen Rechner ausführt |
| Commit | ein gespeicherter Stand des Codes in der Versionsverwaltung Git |
| Repository | ein Projektordner mit seiner ganzen Geschichte in Git |
| Klonen | lädt eine Kopie eines Repositorys mit `git clone` auf den eigenen Rechner |
| Push | lädt neue Commits vom eigenen Rechner zu GitHub hoch |
| Branch | ein Entwicklungszweig in Git. `main` ist der Hauptzweig dieses Repositorys. |
| Restricted Mode | der eingeschränkte Modus von VS Code für Ordner, denen noch nicht vertraut wird. Erweiterungen und das Laden von Schemas sind dann abgeschaltet. |
| Validator | ein Programm, das eine FHIR-Ressource gegen den Standard, ihre Profile und die Codesysteme prüft |
| GitHub Pages | ein Dienst von GitHub, der statische Webseiten aus einem Repository veröffentlicht |
| CORS | eine Regel im Browser. Eine Seite darf Antworten von einem anderen Ursprung, etwa einem anderen Port, nur lesen, wenn der Server das erlaubt. Vor Anfragen wie PUT fragt der Browser den Server vorher um Erlaubnis. |
| Dashboard | eine Übersicht aus Kacheln. Der Starter enthält nur ein minimales Beispiel mit einer festen Kachel. Das eigentliche Dashboard entsteht im Softwareprojekt. |
| Kachel | ein Rechteck im Dashboard mit Titel und Inhalt, hier „Blutdruckverlauf“ |
| Raster | die Einteilung des Dashboards in Spalten und Zeilen, hier 12 Spalten und Zeilen von 80 Pixeln Höhe. Im Beispiel verwaltet es die vorgeschlagene Bibliothek gridstack. |
| Layout | die Anordnung der Kacheln mit Spalte, Zeile, Breite und Höhe. Das Beispiel hat nur eine feste Kachel und speichert kein Layout. |
| FHIR-Bundle | eine FHIR-Ressource vom Typ `Bundle`, die andere Ressourcen in der Liste `entry` sammelt. Der Typ `collection` ist eine reine Sammlung, der Typ `searchset` ein Suchergebnis. Nicht zu verwechseln mit den JavaScript-Dateien aus dem Build. |
| Chunk | eine JavaScript-Datei aus dem Build der App. Initial Chunks lädt der Browser sofort. Ein Lazy Chunk kommt später dazu. |
| Budget | eine Obergrenze für die Größe des Builds in `angular.json`. Ab 500 kB für alle Initial Chunks warnt der Build. |
| `@defer` | ein Block im Template, dessen Inhalt Angular in einen Lazy Chunk legt und erst später lädt, hier sobald der Platzhalter sichtbar wird |
| HMR | Hot Module Replacement. Der Entwicklungsserver tauscht geänderte Teile der App im Browser aus, ohne die ganze Seite neu zu laden. |
| Angular Material | eine Sammlung fertiger Komponenten wie Karten und Tabellen vom Angular-Team. Sie baut auf dem CDK (Component Dev Kit) auf. Im Beispiel ein Vorschlag. |
| Theme | Farben, Schriften und Abstände der Material-Komponenten, hier das fertige Theme `azure-blue.css` |
| Karte | ein umrandeter Kasten mit Überschrift und Inhalt, hier `mat-card` von Angular Material für „Patient“, „FHIR-Server“ und die Kachel |
| Toolbar | eine Leiste über die ganze Breite der Seite, hier `mat-toolbar` mit dem Titel „FHIR-Starter“ |
| CSS-Variable | ein benannter Wert in CSS, dessen Name mit zwei Bindestrichen beginnt, etwa `--mat-sys-surface`. `var(--mat-sys-surface)` liest ihn aus. |
| Token | eine CSS-Variable, aus der eine Material-Komponente Farben oder Abstände liest, etwa `--mat-toolbar-container-background-color` |
| CSS-Grid | eine Anordnung in Spalten und Zeilen, die der Browser selbst verteilt. `app.css` stellt so die beiden Karten nebeneinander oder untereinander. |
| rem | eine Längeneinheit in CSS, die sich nach der Grundschrift des Browsers richtet. Bei der üblichen Grundschrift sind 1rem 16 Pixel. |
| Fokus | das Element der Seite, das gerade Eingaben von der Tastatur empfängt |
| Attribut | eine Zusatzangabe in einem HTML-Element, etwa `role="status"` oder `appearance="outlined"` |
| aria-disabled | ein Attribut, das einem Screenreader meldet, dass ein Element gesperrt ist. Anders als beim Attribut `disabled` behält das Element dabei den Fokus. |
| Live-Region | ein Bereich der Seite, dessen neuen Inhalt ein Screenreader von selbst vorliest, ohne den Fokus zu verschieben. Hier der Status mit `role="status"`. |
| Landmarke | ein Bereich der Seite wie `<header>` oder `<main>`, zu dem ein Screenreader direkt springen kann |
| gridstack | eine Bibliothek, die Kacheln in einem Raster anordnet. Sie kann Kacheln auch verschiebbar machen. Das Beispiel nutzt das nicht. Im Beispiel ein Vorschlag. |
| Chart.js, ng2-charts | Chart.js zeichnet Diagramme. ng2-charts bindet Chart.js an Angular an. Im Beispiel ein Vorschlag. |
| optionale peerDependency | eine peerDependency, die das Feld `peerDependenciesMeta` mit `"optional": true` markiert. npm installiert sie nicht von selbst. |
| Paketdatei | eine Datei `.tgz`, die `npm pack` aus einem Paket erzeugt. Sie lässt sich wie ein Paket aus der npm-Registry installieren. |
| Modul | eine einzelne JavaScript-Datei mit eigenen Importen und Exporten |
| esbuild | ein Build-Werkzeug, das JavaScript- und TypeScript-Dateien mit ihren Importen zu einer Datei zusammenfasst |
| Screenreader | ein Programm, das den Inhalt einer Seite vorliest oder in Braille ausgibt |
| Canvas | eine Zeichenfläche aus Pixeln im Browser. Im Beispiel zeichnet die vorgeschlagene Bibliothek Chart.js dort das Diagramm. Ein Screenreader kann den Inhalt nicht lesen. |
| Textalternative | ein Text, der einen nicht lesbaren Inhalt wie ein Diagramm für Screenreader beschreibt, hier im Attribut `aria-label` |
| Tooltip | ein kleines Feld, das beim Zeigen mit der Maus Werte oder Hinweise anzeigt |
| WCAG | die Web Content Accessibility Guidelines des W3C, des Gremiums für Webstandards. Sie sind Richtlinien für barrierefreie Webinhalte. |

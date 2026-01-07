# Join – Projektinfos

## 1) Beschreibung
- **Pitch:**  
  „Join“ ist ein leichtgewichtiges Kanban-Board für den Alltag: Aufgaben anlegen, priorisieren und per Drag-and-Drop zwischen Spalten bewegen – ohne Einlernzeit.

- **Zielgruppe:**  
  Alle, die Tasks übersichtlich in To-Do / In-Progress / Done organisieren möchten – ideal für Solo-Projekte und kleine Teams.

- **Hauptfeatures:**  
  - Drag-and-Drop zwischen Spalten (To-Do, In-Progress, Done).
  - Aufgaben mit Titel, Beschreibung, Fälligkeitsdatum, Priorität und Tags.
  - Erstellen, Bearbeiten, Löschen; Suche & Filter nach Status/Tag.
  - Persistenz im Browser (LocalStorage); funktioniert offline.
  - Responsive UI für Desktop & Mobil.

- **Tech-Stack (FE/BE/DB/Auth/Cloud):**  
  - FE: HTML5, CSS/SCSS, JavaScript
  - BE: –
  - DB: – (Persistenz via LocalStorage)
  - Auth: –
  - Cloud/Hosting: GitHub Pages
  - Tooling: npm

- **Status & Lizenz:**  
  - **Status:** Stable (v1.0.0)
  - **Lizenz (Code):** MIT License
    ```
    MIT License

    Copyright (c) 2025 David Pyritz

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    ```

   - **Lizenz (Assets):** Alle grafischen und audiovisuellen Assets im Verzeichnis `/assets` unterliegen der Lizenz **Creative Commons BY-NC 4.0**.  
    - **BY:** Namensnennung erforderlich – © <David Pyritz>, 2025  
    - **NC:** Keine kommerzielle Nutzung
  
    Ausnahmen und Drittanbieter-Assets (mit Original-Lizenzen) sind in `/assets/README.md` aufgeführt.

---

## 2) Dev-Setup

- **Voraussetzungen (Node/Docker/…):**  
  - Moderner Browser (Chrome, Firefox, Edge, Safari)  
  - **Optional:** Node.js ≥ 18 (für lokalen Dev-Server)

- **Installation:**  
  - Ohne Installation: ZIP von GitHub laden **oder** Repo klonen  
  - Mit lokalem Server (empfohlen bei ES-Modules/CORS):  
    ```bash
    git clone https://github.com/DavidPyritz/Join.git
    cd Join
    ```

- **Start (Dev):**
  - **Variante A – direkt im Browser:** `index.html` doppelklicken und starten
  - **Variante B – lokaler Dev-Server (Node):**  
    ```bash
    # einfacher statischer Server
    npx serve .
    # oder alternativ
    npx http-server -c-1 .
    ```
    Anschließend die ausgegebene URL im Browser öffnen (z. B. `http://localhost:3000`).

- **Build:**  
  Nicht erforderlich (statische Dateien)

- **Tests:**  
  Keine automatisierten Tests vorhanden

- **Lint/Format:**  
  Nicht konfiguriert (optional Prettier/ESLint)

- **DB/Migrations/Seed (falls relevant):**  
  Nicht benötigt

- **ENV-Variablen (Name = Erklärung):**  
  Keine

- **Beispiel `.env` (ohne Geheimnisse):**  
  Nicht erforderlich

- **API-URL(s):**  
  Keine (läuft komplett im Browser)

---

## 3) Zusammenarbeit

- **Issues & PRs:**  
  Issues willkommen; kleine PRs nach Absprache.
  
- **Branch-Namen:**  
  `main`

- **Commits:**  
   update readme“, „delete Join Checklist“, „Create License“, „first commit“

- **Code-Style/Tools:**  
  Plain JS/HTML/CSS;

- **Tests/CI:**  
  Keine

- **Reviews:**  
  Maintainer-Review

- **Roadmap/Kommunikation:**  
  GitHub Issues

- **Code of Conduct / Security:**  
  Respektvoll; Sicherheitslücken ohne Details per Issue oder Mail melden.

---

## 4) Links

- **Live-Demo:** Keine
- **Backend/API:** Keine
- **Doku/Swagger:** Keine (Coming soon)
- **Design/Figma:** „Coming soon".
- **Roadmap/Board:** *(optional)*
- **Changelog:** Coming soon
- **License:** [MIT License](https://github.com/DavidPyritz/ElPolloLoco/blob/main/LICENSE)
- **Kontakt:** [david.pyritz@gmail.com](mailto:david.pyritz@gmail.com) · [LinkedIn](https://www.linkedin.com/in/david-pyritz-b967b6198)



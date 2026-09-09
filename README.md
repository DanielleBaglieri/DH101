# Danielle Baglieri • DH101 Critical Making Portfolio & Resume

Welcome to the repository for **Danielle Baglieri's Digital Humanities 101: Critical Making in the Age of AI** semester portfolio.

This project features a sleek, modern, accessible web interface documenting 13 weeks of critical making experiments, theoretical reflection logs, core ethics statements, and a professional curriculum vitae (resume).

---

## 🌐 Live Website & Structure

- **Portfolio Homepage:** [`index.html`](index.html) — Modern editorial showcase with hero introduction, interactive makes gallery, reflections hub, and statements.
- **Curriculum Vitae / Resume:** [`resume.html`](resume.html) and integrated at [`index.html#resume`](index.html#resume) — Dedicated, printable CV space featuring education, DH/computational skills, project history, and leadership.
- **Styles & Scripts:** Clean zero-dependency implementation using modern CSS3 (`css/style.css`) and vanilla JavaScript (`js/main.js`).

---

## 📁 Repository Directory Overview

```text
├── index.html              # Main website portal with interactive UI and embedded resume
├── resume.html             # Standalone, print-optimized resume / CV page
├── css/
│   └── style.css           # Modern CSS styling (dark/light themes, glassmorphism, @media print)
├── js/
│   └── main.js             # Theme toggle, live filters, project modal, and print triggers
├── makes/                  # Weekly hands-on critical making markdown files (Weeks 01–13)
├── reflections/            # Weekly theoretical reflections and reading responses (Weeks 01–13)
├── pages/                  # Course pages (About Me, AI Policy, Accessibility, Sustainability)
└── ai-log/                 # AI prompt logs and attribution records
```

---

## 🚀 Viewing the Website

### Option 1: Live via GitHub Pages
Once GitHub Pages is enabled for the repository (Settings > Pages > Deploy from a branch > `main` / `root`), the website is immediately available online at:
```
https://daniellebaglieri.github.io/DH101/
```

### Option 2: Local Viewing
Simply open [`index.html`](index.html) directly in any modern web browser (Chrome, Safari, Firefox, Edge).

Alternatively, launch a lightweight local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 📄 Customizing Your Resume & Profile

- To update your resume information, you can edit the content inside [`resume.html`](resume.html) and the `#resume` section of [`index.html`](index.html).
- To print or save your CV as a PDF, click the **Print / Save PDF** button on either page or press `Cmd + P` / `Ctrl + P`. The print stylesheet is pre-formatted for standard letter paper.

---

## ⚖️ Ethics & Accessibility
This portfolio is built with commitment to:
- **Accessibility:** High contrast ratios, semantic HTML5 landmarks, visible focus rings, responsive typography.
- **Transparency:** Explicit documentation of tools, AI assistance, and authorial decision-making.
- **Sustainability:** Zero-dependency static architecture with minimal carbon and compute overhead.
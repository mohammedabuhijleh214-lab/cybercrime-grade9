# CYBERCRIME — Digital Investigation

**الجريمة الإلكترونية** · Interactive educational experience for Grade 9 Digital Skills (Jordan).

This is a classroom-ready static website: cinematic intro, clear teaching, interactive labs, a short scenario, and a final mission quiz — designed for roughly **8–15 minutes** of presentation (longer if the class plays the game).

## Topic

Cybercrime awareness aligned with the Grade 9 Digital Skills lesson:

- Definition of cybercrime
- Seven cybercrime types from the textbook
- Deep dives: Hacking, Phishing & Fraud, Ransomware
- Jordan Cybercrime Law (educational overview)
- Prevention / Stay Safe
- Interactive scenario + final quiz

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Cairo, Outfit, IBM Plex Mono) with system fallbacks

No backend, database, API keys, or build step.

## How to run locally

1. Open the project folder.
2. Open `index.html` in a modern browser  
   **or** serve the folder with any static server, for example:

```bash
# Python
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

3. Visit `http://localhost:8080` (or the URL your server prints).

## How to deploy to GitHub Pages

1. Create a GitHub repository and push this project to it.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**.
4. Choose branch `main` (or `master`) and folder `/ (root)`.
5. Save. After a minute, the site will be available at:

`https://<your-username>.github.io/<repo-name>/`

Because this is a static site with relative paths (`css/`, `js/`), it works on GitHub Pages without extra configuration.

## Classroom tips

- Start with the cinematic intro, then click **START INVESTIGATION**.
- Use the top progress bar to jump between sections if needed.
- Pause after definition, case files, phishing lab, law, scenario, and quiz questions to ask the class.
- All attack examples are **safe simulations** — no real malware, phishing pages, or malicious links.

## Legal note

Jordanian law details in the LAW section refer to **Cybercrime Law No. 17 of 2023** (Official Gazette issue **5874**, 13/8/2023; **41** articles), with links to official government sources. Content is for education only, not legal advice.

## Project structure

```
/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
└── README.md
```

## Authors / purpose

School project — Digital Skills Grade 9 · Jordan.

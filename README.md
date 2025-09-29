Readme
Heart in Action — uOttawa (Production-Ready Static Site)

1) Files to edit the most:

data/site.json — fundraising goal + raised + KPI numbers
data/events.json — list of events (auto-rendered cards)
data/members.json — founders (auto-rendered cards)
assets/ — images (logo, event photos, member photos)
You don’t have to touch HTML or JavaScript to update content.

2) Deploy via GitHub website (no local tools)

Createed a GitHub repo.
Click Add file → Create new file and make each of these files with the exact names:
index.html 
events.html
members.html
style.css
app.js
data/site.json
data/events.json
data/members.json
(Optional) Create an assets/ folder and upload your logo.png, event photos, and member photos.
Commit the files.
Go to Settings → Pages → set Branch: main and Folder: / (root) → Save.
Your site URL will appear at the top of the Pages section.

3) Update the goal/progress bar

Open data/site.json on GitHub and click Edit. Change the numbers:

{
  "goal": 5000,
  "raised": 1000,
  "eventsRun": 1,
  "volunteers": 10
}
Commit the change — the Home page updates automatically.

4) Add more events

Edit data/events.json and duplicate an object like this:

{
  "title": "New Event",
  "date": "2025-10-10",
  "location": "SITE Atrium",
  "image": "assets/my-event.jpg",
  "description": "Short summary for the event page."
}
5) Update founders

Edit data/members.json. Replace placeholders with real info and add photo filenames you’ve uploaded into assets/.

6) Brand & polish

Colors are in :root of style.css (design tokens). Adjust there.
Add a transparent logo.png in assets/ to match your Instagram branding.
For nicer link previews, keep the meta tags in each HTML file.
7) How it works (quick tech overview)

No frameworks: Pure HTML/CSS/JS keeps it fast and GitHub-Pages friendly.
app.js fetches JSON files and renders:
Home: fundraising progress + KPIs
Events: list of event cards
Members: founder cards
Accessibility: Skip link, visible focus rings, ARIA on progress bar.
Performance: Lazy-loaded images, minimal JS, CSS-only layout.
Need help? Post updates here in ChatGPT and I’ll iterate with you.




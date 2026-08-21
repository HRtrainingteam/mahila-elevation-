# Mahila Elevation

Beautiful responsive landing page and post-webinar lead form for the Mahila Elevation initiative.

## Website

GitHub Pages can serve the site directly from the repository root.

## Google Sheet connection

1. Create a Google Sheet.
2. Open **Extensions → Apps Script**.
3. Copy `Code.gs` into the Apps Script project.
4. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the Sheet ID.
5. Run `setupSheet()` once and approve permissions.
6. Deploy the Apps Script as a **Web app**.
7. Execute as **Me** and allow access to **Anyone**.
8. Copy the Web App URL.
9. Open `script.js` and replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.
10. Commit the change.

The form stores timestamp, name, mobile, email, selected financial service, specific requirement, consent and source in the `Mahila Elevation Leads` sheet.

## GitHub Pages

Repository → **Settings → Pages** → **Deploy from a branch** → `main` → `/ (root)` → Save.

## Privacy

The form collects personal information. Before public launch, confirm the wording of the consent notice, data-retention process and organizational privacy requirements.
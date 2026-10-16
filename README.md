# ISAC’26 Egyptian-Themed Website

A responsive static website for the Inter-School Announcing Competition, built with HTML, CSS, and vanilla JavaScript. It is designed for GitHub Pages.

## Files

- `index.html` — main landing page
- `style.css` — visual design, responsive layout, and modal styling
- `app.js` — competition cards, filters, navigation, and demo registration modal
- `config.js` — event date, email, social link, and registration mode
- `rules.html` — starter rules and regulations page
- `assets/` — put your own artwork and images here

## Before publishing

1. Open `config.js`.
2. Replace `replace-with-official-email@example.com` with the official ISAC email.
3. Replace `socialUrl` with the actual official social profile URL.
4. Verify the event date and every competition category.
5. Ask the organising committee to approve the text in `rules.html`.
6. Connect a real registration provider before collecting contestant information. The current form is demo-only and does not save or transmit data.

## Run locally

You can open `index.html` directly in a browser. For a more realistic local preview, use Visual Studio Code with the Live Server extension and choose **Open with Live Server**.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `isac26-website`.
2. Upload all files and the `assets` folder to the repository root. Keep the filenames and folder structure intact.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the deployment to finish. GitHub will show the public website URL in the Pages section.

If the repository is named `isac26-website`, the URL normally looks like:
`https://YOUR-GITHUB-USERNAME.github.io/isac26-website/`

## Updating the site

Edit the files in GitHub using the pencil icon or upload updated files. Each commit to the publishing branch triggers a new deployment.

## Important security note

GitHub Pages is static hosting. Never place API secrets, passwords, private keys, or database credentials in `config.js` or other browser-delivered files. A production registration/login system needs a properly configured backend or third-party registration service.

# RelixZoon — official website

A fast static website (plain HTML, CSS and JavaScript). No build step, no frameworks,
no paid services, no external libraries. Fonts are self-hosted (Unbounded and Hanken Grotesk, SIL Open Font License).
It doesn't connect to the RelixZoon app's database, accounts or payment systems.

## Files

```
index.html              the homepage
404.html                "page not found" page (used automatically by GitHub Pages)
robots.txt
.nojekyll               tells GitHub Pages to serve files as-is
assets/
  js/config.js          <- EDIT THIS: links, logo, artwork, screenshots, socials
  js/main.js            site behaviour (menu, tabs, animated sound wave)
  css/styles.css        styles; brand colours are at the top
  brand/                put the approved logo here
  artwork/              put section artwork here
  screenshots/          put real app screenshots here
  og/og-image.jpg       image shown when the site is shared on social media
  fonts/                self-hosted fonts
```

## Before going live

1. **Brand pink** — open `assets/css/styles.css` and change `--pink` (and `--pink-deep`, a darker shade)
   at the top to the official RelixZoon hex values. Everything updates automatically.
   Also update `#FF1F8E` near the end of `assets/js/main.js` (fallback only) if you like.
2. **Logo** — add files to `assets/brand/` and set `logo.src` in `config.js`.
3. **Links** — fill in `links` in `config.js` (app URL, artist registration, privacy, terms, contact email).
   Anything left empty shows a "coming soon" state instead of a broken link.
4. **Domain** — in `index.html`, replace every `https://YOUR-DOMAIN/` with your real address
   so social-media previews work.
5. **Release strategy wording** — check the one-line descriptions of Exclusive, RelixZoon First
   and Same-Day Worldwide in `index.html` match your product policy.

## Publish with GitHub Pages (no coding needed)

1. On GitHub, create a new repository (e.g. `relixzoon-website`) — keep it separate from the app repository.
2. Click **Add file → Upload files**, drag in **everything inside this folder** (including the `assets` folder
   and the `.nojekyll` file), then click **Commit changes**.
   - Hidden file tip: if `.nojekyll` doesn't upload, create it with **Add file → Create new file**, name it `.nojekyll`, leave it empty.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, and click **Save**.
4. After a minute your site is live at `https://<your-username>.github.io/relixzoon-website/`.
5. Custom domain (e.g. relixzoon.com): in **Settings → Pages → Custom domain**, enter the domain and follow
   GitHub's DNS instructions. Tick **Enforce HTTPS** once available.

Note: `404.html` uses root paths (`/assets/...`), which work on a custom domain. On a
`github.io/<repo>/` address the 404 page will appear unstyled until a custom domain is set.

## Updating later

Upload a new artwork file with the same name to replace the old one; nothing else changes.
To add a new file, upload it, then add its path in `assets/js/config.js` and commit.

## Preview locally

Open a terminal in this folder and run `python3 -m http.server`, then visit http://localhost:8000.

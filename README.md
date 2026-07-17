# UCGEO Website

Website for the **University of Chicago Geographic Studies Club (UCGEO)** — weekly meetings, field trips, guest lectures, GIS and career programming, and community partnerships.

## Live site (stopgap)

Until `ucgeo.org` DNS is pointed at GitHub Pages, the site is published at:

**https://noahdlee519.github.io/ucgeo-website/**

## Local preview

Open `index.html` in a browser, or serve the repo root with any static server:

```bash
npx --yes serve .
```

## Deploy

This is a static site (no build step). Pushing to `main` runs [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) and publishes to GitHub Pages.

**One-time setup (repo admin):** GitHub → **Settings** → **Pages** → **Source** = **GitHub Actions**. No secrets are required.

## Custom domain (`ucgeo.org`) — for the domain owner

When DNS can be updated, wire the apex domain to this repo:

1. At the DNS host, add **A records** for `@` / `ucgeo.org` to GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. (Optional) Add a **CNAME** for `www` → `noahdlee519.github.io`.
3. In this repo, add a root file named `CNAME` whose only contents are:
   ```
   ucgeo.org
   ```
4. In GitHub → **Settings** → **Pages**, set **Custom domain** to `ucgeo.org`, wait for DNS to verify, then enable **Enforce HTTPS**.

After the custom domain is live, the `github.io` URL will redirect to `ucgeo.org`.

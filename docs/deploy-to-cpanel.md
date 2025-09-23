## Deploying the ATICOM site to cPanel (Step by Step)

This project is a Vite + React static site that consumes Supabase. Deployment to cPanel is done by building locally and uploading the compiled files to your hosting account. Follow these steps.

### 1) Prerequisites
- cPanel credentials and access to `public_html` (or an addon domain/subdomain document root)
- Node.js 18+ locally
- Your Supabase project URL and anon key

### 2) Set environment variables for a production build
Create a `.env.production` file at the project root with your real values:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Notes:
- These values are baked into the static bundle at build time.
- Do not commit secrets; the anon key is public by design, but keep service keys out of the client.

### 3) Optional: configure base path if deploying to a subdirectory
If the site will be served from `https://domain.com/aticom` (subfolder), set the base in `vite.config.ts`:

```ts
// vite.config.ts
export default defineConfig({
  base: '/aticom/', // change or remove if deploying at domain root
  // ...existing config
})
```

If deploying at the domain root (`https://domain.com`), leave `base` as default (`'/'`).

### 4) Install dependencies and build
From your machine in the project root:

```bash
npm ci
npm run build
```

This produces a `dist/` folder with static assets ready for hosting.

### 5) Prepare SPA routing (.htaccess)
To support client-side routing (React Router) on cPanel/Apache, add an `.htaccess` file inside the `dist/` folder with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

If deploying to a subfolder, change `RewriteBase /` to `RewriteBase /SUBFOLDER/`.

### 6) Upload to cPanel
Choose ONE method below.

#### A) File Manager (quickest)
1. Zip the `dist/` folder contents (not the folder itself) into `site.zip`.
2. In cPanel > File Manager, navigate to the document root:
   - Root domain: `public_html/`
   - Subdomain/addon domain: that domain’s document root
3. Upload `site.zip` and extract it. Ensure `index.html` is directly inside the document root (or chosen subfolder).

#### B) FTP/SFTP
1. Connect to your hosting with your FTP/SFTP client.
2. Upload all files from `dist/` into the document root (or subfolder).

#### C) Git Version Control (if enabled on your host)
1. Push the repo to a remote (GitHub/GitLab).
2. In cPanel > Git Version Control, create a repository that pulls your repo.
3. Add a post-deploy script (cPanel or manual SSH) to run `npm ci && npm run build` and copy `dist/` to the document root. This requires SSH and Node on the server; many shared hosts don’t support this.

### 7) Verify
- Visit your domain and test navigation between routes.
- Open the browser console; ensure there are no 404s for assets.

### 8) Common issues and fixes
- White page or 404 when refreshing a route:
  - Ensure `.htaccess` from step 5 is present where `index.html` is located.
  - If in a subfolder, ensure `RewriteBase /SUBFOLDER/` matches the path.

- Assets or links loading under the wrong path:
  - If deploying to a subfolder, set `base` in `vite.config.ts` (step 3) and rebuild.

- Supabase requests failing:
  - Confirm `.env.production` values are correct and you rebuilt after changes.
  - Check that your Supabase CORS settings allow your production domain.

### 9) Updating the site later
1. Pull latest changes locally
2. Update `.env.production` if needed
3. `npm ci && npm run build`
4. Upload the new `dist/` files and overwrite existing ones

### 10) Directory quick reference
- Domain root deployment: upload `dist/*` into `public_html/`
- Subdomain/addon domain: upload into that domain’s document root
- Subfolder deployment: create `public_html/your-subfolder/` and upload `dist/*` there

That’s it! Your Vite React site should be live on cPanel.



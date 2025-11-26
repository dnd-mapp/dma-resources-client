# @dnd-mapp/dma-resources-client

Prebuilt Angular application for the **D&D Mapp Resources Client**.

This package contains the **compiled static assets** (HTML, JS, CSS, assets) produced by the Angular build. It is intended to be consumed by other services or deployment pipelines that want to embed or serve the application without building it from source.

> Source repository: https://github.com/dnd-mapp/dma-resources-client

---

## What’s in this package?

After installation, you’ll find the app bundle under:

```text
node_modules/@dnd-mapp/dma-resources-client/
 ├─ browser/
 │   ├─ media/
 │   │   └─ *.woff2
 │   ├─ favicon.ico
 │   ├─ index.html
 │   ├─ main.js
 │   └─ styles.css
 ├─ 3rdpartylicenses.txt
 ├─ LICENSE
 ├─ package.json
 ├─ README.md
 └─ prerendered-routes.json
  ...
```

The exact filenames are build‑generated (hashes for cache busting), but the structure is the same as `dist/dma-resources-client` from the Angular CLI.

This is **not** an Angular library with exported modules/components; it is a fully built SPA meant to be served as static files.

---

## Installation

Configure your npm client to use GitHub Packages for this scope:

```text
@dnd-mapp:registry=https://npm.pkg.github.com
```

Then install with your preferred package manager, for example, with pnpm:

```bash
pnpm add @dnd-mapp/dma-resources-client
```

Or with npm:

```bash
npm install @dnd-mapp/dma-resources-client
```

---

## Usage

### 1. As static assets in a backend service

In a Node/Express (or similar) service you can copy or serve the files from `node_modules/@dnd-mapp/dma-resources-client`.

**Option A – copy on build/deploy**

In your backend’s build/deploy step:

```bash
cp -R node_modules/@dnd-mapp/dma-resources-client/browser ./public/client
```

Then configure your server to serve `./public/client` as static content (for example, `/app` path).

**Option B – serve directly from `node_modules` (dev only)**

For development, you can configure your server to serve the directory directly from `node_modules`, e.g.:

```typescript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const client = path.join(
    __dirname,
    'node_modules',
    '@dnd-mapp',
    'dma-resources-client',
    'browser'
);

app.use('/app', express.static(client));

app.get('/app/*', (_req, res) => {
  res.sendFile(path.join(client, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
```

---

## Versioning

The package versions follow the tags in the source repository, for example:

- Git tag `v1.2.3` → package version `1.2.3`

Each published version corresponds to a specific build of the Angular application.

Breaking frontend changes will be reflected by a **major** version bump.

---

## Configuration & Environment

This package ships a **prebuilt** bundle. Runtime configuration is done via environment files baked into the build.

If you need environment‑specific behavior (e.g., API URLs), typical options are:

- Build multiple variants (e.g. `prod`, `staging`) and publish them as different packages or tags.
- Use a runtime config file (e.g. `assets/config.json`) that your backend rewrites or serves dynamically.

Refer to the main repository for detailed configuration documentation.

---

## Building & Publishing (maintainers)

The package is built and published from GitHub Actions. High‑level steps:

1. Install dependencies with pnpm.
2. Run `pnpm build`.
3. Run `pnpm pre-publish`.
4. Run `pnpm publish` from `dist/dma-resources-client` to GitHub Packages.

For the exact workflow, see the [release](./.github/workflows/release.yml) workflow in the main repo.

---

## License

This package is distributed under the same license as the main repository. See the [LICENSE](../LICENSE) file in the root of the source repository.

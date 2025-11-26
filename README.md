# D&D Mapp: Resources Client

[![Angular](https://img.shields.io/badge/Angular-application-dd0031?logo=angular&logoColor=white)](https://angular.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vitest](https://img.shields.io/badge/tests-vitest-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/e2e-Playwright-45ba4b?logo=microsoft-playwright&logoColor=white)](https://playwright.dev/)
[![CI Workflow Status](https://img.shields.io/github/actions/workflow/status/dnd-mapp/dma-resources-client/push-main.yml?branch=main&logo=github&label=CI)](https://github.com/dnd-mapp/dma-resources-client/actions/workflows/push-main.yml)

**Repository:** `dnd-mapp/dma-resources-client`  
**Short name:** D&D Mapp – Resources Client

This is the administrative web client for the [D&D Mapp: Resources Server](https://github.com/dnd-mapp/dma-resources-server).

The client allows admins to:

- Manage static game resources used by the D&D Mapp platform
- Inspect and filter server logs
- Configure the Resources server

A Docker image for this client is available; find the [README](./.docker/README.md) at `.docker/README.md` for container usage and deployment.

> **Note**  
> This project is intentionally **unlicensed**. The author reserves all rights. See the [LICENSE](./LICENSE) file for details.

---

## Table of Contents

- [Prerequisites](#prerequisites)
    - [Tool management via mise](#tool-management-via-mise)
    - [Node.js and pnpm versions](#nodejs-and-pnpm-versions)
- [Getting Started](#getting-started)
    - [Clone the repository](#clone-the-repository)
    - [Install toolchain with mise](#install-toolchain-with-mise)
    - [Install dependencies](#install-dependencies)
- [Development](#development)
    - [Available scripts](#available-scripts)
- [mkcert & HTTPS Setup](#mkcert--https-setup)
    - [1. Install mkcert](#1-install-mkcert)
        - [macOS](#macos)
        - [Windows](#windows)
    - [2. Configure hostnames](#2-configure-hostnames)
        - [macOS hosts file](#macos-hosts-file)
        - [Windows hosts file](#windows-hosts-file)
    - [3. Create a local CA and trust it](#3-create-a-local-ca-and-trust-it)
    - [4. Generate TLS certificate and key](#4-generate-tls-certificate-and-key)
    - [5. Trust the certificate in browsers](#5-trust-the-certificate-in-browsers)
- [Testing](#testing)
    - [Unit tests with Vitest](#unit-tests-with-vitest)
    - [End-to-end tests with Playwright](#end-to-end-tests-with-playwright)
- [Linting & Formatting](#linting--formatting)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
- [Docker](#docker)
- [License](#license)

---

## Prerequisites

### Tool management via mise

This project uses [mise](https://github.com/jdx/mise) as a tool version manager to keep Node.js and pnpm versions consistent across environments.

The repository includes a `.tool-versions` file that declares required tool versions. At minimum, you should have:

- `node` **v24.x**
- `pnpm` **v10.x**

#### Install mise

Follow the official instructions for your platform: https://mise.jdx.dev/getting-started.html

Once installed, ensure mise is available in your shell:

```bash
mise --version
```

### Node.js and pnpm versions

With mise installed, tools will be installed and activated based on `.tool-versions`.

Inside the project directory:

```bash
# Install tools defined in .tool-versions (Node 24, pnpm 10, etc.)
mise install

# Print active tool versions
mise current
```

After `mise install`, `node` and `pnpm` will be available in your shell (you may need to restart your terminal session depending on your shell configuration).

#### VS Code

Install the following extensions:

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier – Code formatter** (esbenp.prettier-vscode)
- **Angular Language Service** (Angular.ng-template)

#### JetBrains IDEs (WebStorm, IntelliJ, etc.)

- Enable **ESLint**:  
  `Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint`
- Enable **Prettier**:  
  `Preferences | Languages & Frameworks | JavaScript | Prettier`
- Optionally, set Prettier as the default formatter and enable "On Save" actions for reformatting and fixing ESLint problems.

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/dnd-mapp/dma-resources-client.git
cd dma-resources-client
```

### Install toolchain with mise

From the project root:

```bash
mise install
```

This installs the correct versions of Node.js and pnpm as defined in `.tool-versions`.

### Install dependencies

```bash
pnpm install
```

---

## Development

### Available scripts

The following scripts are available via `pnpm`:

- `pnpm start` – start the development server
- `pnpm build` – build the production bundle
- `pnpm test` – run unit tests (Vitest)
- `pnpm e2e` – run E2E tests (Playwright)
- `pnpm lint`  – run linting (ESLint, potentially including style checks)
- `pnpm format:check` - run prettier to check formatting 

Some typical workflows:

```bash
# Start dev server
pnpm start

# Production build
pnpm build

# Run unit tests
pnpm test

# Run E2E tests
pnpm e2e

# Lint sources
pnpm lint
```

---

## mkcert & HTTPS Setup

The steps below let you serve the app locally over **HTTPS** using:

- `localhost`
- `localhost.resources.dndmapp.dev`

You will:

1. Install `mkcert`
2. Configure hostnames in your OS hosts file
3. Create and trust a local certificate authority (CA)
4. Generate a certificate (`cert.pem`) and key (`key.pem`)
5. Ensure browsers trust the certificate

> **Security note**  
> Certificates and keys generated here are **for local development only**. Never use them in production and do not commit them to version control.

---

### 1. Install mkcert

Official docs: <https://github.com/FiloSottile/mkcert>

#### macOS

Using Homebrew:

```bash
brew install mkcert
brew install nss      # only needed if you use Firefox
```

Verify installation:

```bash
mkcert -version
```

#### Windows

Using Chocolatey (run **PowerShell as Administrator**):

```powershell
choco install mkcert -y
choco install nss -y   # only needed if you use Firefox
```

Verify:

```powershell
mkcert -help
```

If you don't use Chocolatey, download a Windows binary from the GitHub Releases page and place it in a directory on your `PATH`.

---

### 2. Configure hostnames

We want `localhost.resources.dndmapp.dev` to resolve to `127.0.0.1`.

#### macOS hosts file

1. Open Terminal.
2. Edit `/etc/hosts` with elevated permissions:

   ```bash
   sudo nano /etc/hosts
   ```

3. Add the following line (or extend an existing `127.0.0.1` line):

   ```text
   127.0.0.1   localhost localhost.resources.dndmapp.dev
   ```

4. Save and exit (<kbd>Ctrl</kbd>+<kbd>O</kbd>, <kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>X</kbd> in nano).

#### Windows hosts file

1. Open **Notepad as Administrator**:
    - Press Start, type "Notepad."
    - Right-click **Notepad** → **Run as administrator**.
2. In Notepad, open:

   ```text
   C:\Windows\System32\drivers\etc\hosts
   ```

3. Add this line:

   ```text
   127.0.0.1   localhost localhost.resources.dndmapp.dev
   ```

4. Save the file.

---

### 3. Create a local CA and trust it

`mkcert` uses a local CA to sign your development certificates.

From the project root (or any directory):

```bash
mkcert -install
```

This will:

- Generate a local root CA
- Install it into the system trust store
- Install it into browser trust stores (where supported)

You may be prompted for administrative credentials.

> If you ever need to remove the CA, refer to mkcert’s documentation; you can manually delete the root certificate from your system’s keychain / trust store.

---

### 4. Generate TLS certificate and key

From the project root (recommended so paths are straightforward):

```bash
mkcert -key-file key.pem -cert-file cert.pem \
  localhost localhost.resources.dndmapp.dev
```

This will create:

- `cert.pem` – certificate (for both hostnames)
- `key.pem` – private key

> **Important**
> - The `cert.pem` and `key.pem` files are added to `.gitignore` and they **never** should be committed.
> - Keep `key.pem` private.

Example `.gitignore` snippet:

```gitignore
cert.pem
key.pem
```

Now configure your dev server (see [Running the dev server over HTTPS](#running-the-dev-server-over-https)) to use these files.

---

### 5. Trust the certificate in browsers

Most Chromium-based browsers (Chrome, Edge) and Safari rely on the system trust store, so once `mkcert -install` has run successfully, certificates issued by the local CA should be trusted automatically.

If you still see SSL warnings:

#### macOS (system & Safari / Chrome / Edge)

1. Open **Keychain Access**.
2. Under **System** or **System Roots**, locate the mkcert root CA (name will include `mkcert`).
3. Double-click the certificate:
    - Expand **Trust**
    - Set **When using this certificate** to **Always Trust**
4. Close the window; you may be prompted for your password.
5. Restart browsers.

#### Windows (system & Chrome / Edge)

1. Press **Win + R**, type `mmc` and hit Enter.
2. Go to **File → Add/Remove Snap-in**.
3. Add **Certificates** for **Computer account** → **Local computer**.
4. Under **Trusted Root Certification Authorities → Certificates**, locate the mkcert root CA.
5. Ensure it is present and not expired; if missing, re-run:

   ```powershell
   mkcert -install
   ```

6. Restart browsers.

#### Firefox

Firefox may use its own certificate store:

- If `mkcert` was installed with `nss` support, and you ran `mkcert -install`,
  the CA is usually imported automatically.
- Otherwise, in Firefox:
    1. Go to `about:preferences#privacy`
    2. Scroll to **Certificates** → **View Certificates…**
    3. Import the mkcert root CA from the location shown by:

       ```bash
       mkcert -CAROOT
       ```

    4. Check **Trust this CA to identify websites** when importing.

After this, visiting:

- https://localhost:4400/app/
- https://localhost.resources.dndmapp.dev:4400/app/

should no longer show invalid certificate warnings.

---

## Testing

### Unit tests with Vitest

The project uses [Vitest](https://vitest.dev/) for unit testing.

Run all unit tests:

```bash
pnpm test
```

You can typically run Vitest in watch mode:

```bash
pnpm test:dev
```

### End-to-end tests with Playwright

Playwright is used to run E2E browser tests.

Common workflow:

1. Ensure dependencies and browsers are installed:

   ```bash
   playwright install
   ```

2. Start the dev server (ideally over HTTPS as configured):

   ```bash
   pnpm start
   ```

3. In another terminal, run e2e tests (command name may vary):

   ```bash
   pnpm e2e
   ```

Refer to the [E2E documentation](./e2e/README.md) for more info and configuration.

---

## Linting & Formatting

### Prettier

Prettier is used for consistent code formatting.

To check formatting, run:

```bash
pnpm format:check
```

To fix formatting issues, run:

```bash
pnpm format:write
```

Ensure your editor is configured to:

- Use Prettier as the default formatter
- Format on save where possible

### ESLint

ESLint is used to enforce coding standards and detect potential issues.

Run linting:

```bash
pnpm lint
```

Many issues can be automatically fixed:

```bash
pnpm lint -- --fix
```

---

## Docker

A Docker image for this client is available.

Consult [`.docker/README.md`](./.docker/README.md) for:

- Building the Docker image
- Running the container (ports, environment variables)
- Integration with `dma-resources-server`

---

## License

This project is **not** open source. It is intentionally unlicensed and all rights are reserved by the author. See the [LICENSE](./LICENSE) file for the full text.

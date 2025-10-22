# Tábor Oskar Web

Web aplication with Next.js for Tábor Oskar.

Summer camp Tábor Oskar offers adventure, games and fun in the beautiful nature near Rokycany for children of all ages. Every summer we organize several camps with a varied program.

## Development

### Installation

#### Windows

1. Get [Node.js](https://nodejs.org/en/download).
2. Install typescript and dependencies via `npm`.

   ```cmd
   npm install -g typescript
   npm ci
   ```

3. Setup [environment](wiki/environment.md).

#### Debian/Ubuntu

1. Install [Node.js using nvm](https://nodejs.org/en/download/package-manager). The instructions change slightly with each new version of nvm or node.js, so refer to the provided link. Do not install node.js from APT, as it only contains severely outdated versions.

2. Install typescript and dependencies via `npm`.

   ```cmd
   npm install -g typescript
   npm ci
   ```

3. Setup [environment](wiki/environment.md).

### Startup

Start a server:

```bash
npm run dev
```

> Alternatively you can use `yarn dev`, `pnpm dev` or `bun dev`.

## Wiki

- [Environment](wiki/environment.md)
- [Dependecies](wiki/dependecies.md)
- [Guides](wiki/guides.md)
- [Harvester](wiki/harvester.md)

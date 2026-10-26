# Agents

How the repo is set up for [Claude Code](https://claude.com/claude-code).

## Instructions

- `CLAUDE.md` - project map, conventions, working style. Loaded every session.
- `.claude/*.md` - details the agent reads on demand (components, testing, environment, notes). Written terse, for the agent, not for humans.
- `harvester/CLAUDE.md` - scraper notes.

Keep them short. Update them when a convention changes, otherwise the agent follows the old one.

## Plugins

Enabled for the project in `.claude/settings.json`.

- `typescript-lsp` - type-aware navigation and diagnostics. If it reports a missing language server, run `npm install -g typescript-language-server typescript`.
- `context7` - current docs for Next.js, MUI, Prisma, Auth.js.
- `security-guidance` - checks edits and diffs for vulnerabilities. Reports only, blocks nothing. Costs extra tokens every turn; disable it from `/plugin` if too noisy.

## Usage and cost

[CodeBurn](https://github.com/getagentseal/codeburn) shows where Claude Code tokens and cost go, per task, model and project. It reads local session transcripts, no API key or account needed. Requires Node.js 20+.

```bash
npx codeburn
```

Run it in your own terminal, outside Claude Code, on the machine where you use Claude Code.

## Sandbox

Optional: run the agent in a [Docker sandbox](https://docs.docker.com/ai/sandboxes/) (`sbx`), a Linux container on your host. Commands below run on the host, `<name>` is the sandbox name (`$SANDBOX_NAME` inside it).

### Workspace mode

- **Direct** (default): the host working tree is mounted, edits and commits show up on both sides immediately. The sandbox is Linux and the host Windows, so the agent must not touch `node_modules` in the shared tree. It runs and tests in a separate copy instead, see `.claude/environment.md`.
- **Clone** (`--clone`): the sandbox gets its own git clone, nothing is shared. Its commits reach the host with `git fetch sandbox-<name>` (only while the sandbox is up) or by pushing to GitHub. Unpushed, unfetched commits are lost when the sandbox is removed.

### Network

Outbound traffic is filtered. A blocked request returns HTTP 403 with the reason in the body.

```bash
sbx policy log                               # recent connections and block reasons
sbx policy ls                                # active rules
sbx policy allow network <domain>[,<domain>] # allow domains
```

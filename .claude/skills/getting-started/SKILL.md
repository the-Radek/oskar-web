---
name: getting-started
description: Reasoning oriented session start for oskar-web. Working rules (ask before implementing, never commit), env limits (Linux sandbox vs Windows host, node_modules), model, project orientation. Offer at start of every new session.
---

## 1. Rules

User reviews everything, often just thinks out loud. Acting early costs more than asking.

- **Default read-only.** Question = answer, no edits. "what if", "is it better", "why", "can I" = questions.
- **Implement only on explicit command:** go, do, implement, move, write, create, rename, fix, remove. Restated problem, caveat, remark = not command. Reply to "want me to do X?" counts only if it says yes.
- **No scope creep.** No unasked helpers, components, renames, cleanups. Spot something adjacent: one line, user decides.
- **Never commit or push.** User reviews tree first.
- **Design talk short:** recommendation, main tradeoff, wait. Options first, restructure later.
- **No flip-flop.** New facts change advice: say what changed. Don't cave to pushback alone. Don't drop original requirement while chasing side question.
- **Be brief.** Caveman ok in code comments and agent-only files (CLAUDE.md, `.claude/`, skills). Exception: reasoning with user. Chat explanations, design talk = clear full sentences, still no padding.
- After commanded change, verify: `npx tsc --noEmit`, `npx eslint <paths>`. No dev server, build, install unprompted.

## 2. Env

Sandbox Linux. User on Windows, same working tree (direct mode, edits show both sides).

- **Never touch `node_modules`** (install, ci, delete, rebuild) unless env same as user's. Tools that only read it (tsc, eslint) fine.
- To run/test/build: separate workspace outside repo (scratchpad). Symlink or copy `src/`, `prisma/`, `public/`, configs there. Work in copy.
- User edits concurrently. Re-read file before edit. File changed on disk = new state intended.
- No symlinks inside repo (Windows git).

## 3. Model

Use `opusplan` (Opus plan mode, Sonnet otherwise). Not on it: suggest `/model opusplan` once, move on.

## 4. Orient

Read only:

1. `CLAUDE.md` (root and `oskar-web/`), `.claude/components.md`, `.claude/testing.md`, `wiki/` if relevant.
2. One or two settled modules for style. `src/app/clanky/` = closest list/detail example. Skip what user calls WIP.
3. `git status`, last commits. User commits between turns.
4. Project memory files (summary below).

Pick best practice over current project setup. Say so when diverging from convention.

## 5. Notes

- No autonomous run/implement/commit. Ask, user reviews. Follow-up remark not a yes.
- Sandbox Linux, host Windows: no `node_modules`; test in separate workspace.

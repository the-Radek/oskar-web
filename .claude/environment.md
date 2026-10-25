# Environment

Sandbox Linux. User on Windows, same working tree (direct mode, edits show both sides).

- Never touch `node_modules` (install, ci, delete, rebuild) unless env same as user's. Tools that only read it (tsc, eslint) fine.
- To run/test/build: separate workspace outside repo (scratchpad). Symlink or copy `src/`, `prisma/`, `public/`, configs there. Work in copy.
- Dev server, build, install, tests: fine in the separate workspace when useful to verify a change.
- User edits and commits concurrently. Re-read file before edit; changed on disk = new state intended. Unsure: `git show HEAD:<path>`.
- Moving code: verbatim, change only what the move needs, flag deviations in one line. Never rebuild a file from memory.
- No symlinks inside repo (Windows git).

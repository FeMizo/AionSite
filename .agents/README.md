# Design skills for AionSite

Project-scoped copies for Claude Code (`.claude/skills/`) and Codex (`.agents/skills/`): Impeccable, frontend-design, and UI/UX Pro Max.

Source revisions and the Impeccable engine checksum are recorded in `design-skills.lock.json`. Licenses are included with each skill. Existing global installations remain installed and backed up outside this repository.

UI/UX Pro Max uses only Python's standard library. Resolve `<skill-base-dir>` in its examples to the directory of the loaded skill. On this Windows machine its instructions point to the existing isolated Python; on another machine select a working Python 3 interpreter.

Impeccable includes its Windows launcher and checksum manifest. Its downloaded engine stays in the user's cache, not Git. No hooks, account credentials or global agent settings are committed.

Use the active runtime's skill invocation. Installing these files does not publish a site or grant permission to run external project actions.

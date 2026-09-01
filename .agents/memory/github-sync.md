---
name: GitHub repository sync
description: Safe handling when a GitHub repository already contains an unrelated starter commit.
---

When the local project and the GitHub repository have unrelated histories, preserve both histories with a merge commit before pushing; do not force-push unless the user explicitly requests replacement.

**Why:** Repositories created from GitHub templates or with an initial README can reject the first push even when the local project is otherwise complete. A force-push could silently remove that remote history.

**How to apply:** Fetch the target branch, inspect the remote-only commits and files, merge with `--allow-unrelated-histories`, resolve only intentional overlaps, then push normally.
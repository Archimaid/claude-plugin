---
description: Validate archimate-beta diagrams and fix the errors
argument-hint: [files or directories, default .]
---

Run `npx --yes archimaid validate $ARGUMENTS`. With no arguments, validate `.`; the CLI searches `.mmd`, `.mermaid`, `.md` and `.markdown` files and skips non-ArchiMate Mermaid diagrams.

For each error, open the reported `file:line:column`, fix it using the archimaid skill, and validate again until the run passes. Report warnings without changing them unless the fix is unambiguous. Summarise what you changed per file.

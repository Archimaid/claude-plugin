---
description: Draft an ArchiMate diagram from a description and validate it
argument-hint: <what the diagram should show> [output path]
---

Use the archimaid skill to create an ArchiMate 3.2 diagram for this request:

$ARGUMENTS

1. If the request names an output path, write there. Otherwise, write a new `.mmd` file with a kebab-case name derived from the subject, in the project's existing diagrams or docs folder if there is one.
2. If the request refers to code, services or documents in this project, read them first so the elements match real names.
3. Pick a layout: the default architecture layout for cross-layer views, `direction LR` for small chains.
4. Validate with `npx --yes archimaid validate <file>` and fix every error until it passes.
5. Report the file path and the elements and relationships you modelled. List any relationship you're unsure ArchiMate 3.2 permits so the user can check it.

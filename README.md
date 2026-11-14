# Archimaid plugin for Claude Code

Write ArchiMate® 3.2 diagrams as text with Claude. This plugin teaches Claude Code the [Archimaid](https://archimaid.org) `archimate-beta` Mermaid syntax and checks every diagram it writes.

## Install

```text
/plugin marketplace add Archimaid/claude-plugin
/plugin install archimaid@archimaid
```

You need Node.js 22.12 or later. The plugin runs the `archimaid` CLI from your project's `node_modules` if it's installed there, and from `npx` otherwise.

## What you get

| Component | What it does |
| --- | --- |
| `archimaid` skill | Syntax, all 60 element types and 11 relationship types, layouts, nesting, notes, links and rendering. Claude loads it when you ask for an ArchiMate or enterprise architecture diagram. |
| `/archimaid:diagram <description> [path]` | Drafts a diagram from a description, using names from your codebase, and validates it. |
| `/archimaid:validate [paths]` | Validates `.mmd` files and Markdown `mermaid` blocks, then fixes the errors. |
| Validation hook | After Claude writes or edits a `.mmd`, `.mermaid` or Markdown file that contains `archimate-beta`, it runs `archimaid validate` and sends any errors back to Claude to fix. |

## Example

```text
/archimaid:diagram how the checkout service supports order fulfilment, from the customer to the database
```

Try the syntax in your browser at [try.archimaid.org](https://try.archimaid.org).

## Other agents

`skills/archimaid/` is a standard [Agent Skill](https://agentskills.io). Copy the folder into another agent's skills directory to use it there, for example `.codex/skills/` or `.cursor/skills/`.

## Maintaining

`skills/archimaid/references/reference.md` and `skills/archimaid/examples/` are copied from the [archimaid](https://github.com/Archimaid/archimaid) package. Update them when a release changes the catalogue or the syntax, and bump `version` in `.claude-plugin/plugin.json`.

## Licence

MIT. ArchiMate® is a registered trademark of The Open Group. Archimaid is an independent project, not affiliated with or endorsed by The Open Group.

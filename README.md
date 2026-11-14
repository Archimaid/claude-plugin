# Archimaid plugin for Claude Code

Write ArchiMate® 3.2 diagrams as text with Claude. This plugin teaches Claude Code the [Archimaid](https://archimaid.org) `archimate-beta` Mermaid syntax and has it validate every diagram it writes.

## Install

```text
/plugin marketplace add Archimaid/claude-plugin
/plugin install archimaid@archimaid
```

You need Node.js 22.12 or later. Claude validates diagrams with `npx archimaid validate`, which uses the version in your project if `archimaid` is installed there.

## What you get

| Component | What it does |
| --- | --- |
| `archimaid` skill | Syntax, all 60 element types and 11 relationship types, layouts, nesting, notes, links and rendering. Claude loads it when you ask for an ArchiMate or enterprise architecture diagram. |
| `/archimaid:diagram <description> [path]` | Drafts a diagram from a description, using names from your codebase, and validates it. |
| `/archimaid:validate [paths]` | Validates `.mmd` files and Markdown `mermaid` blocks, then fixes the errors. |

## Example

```text
/archimaid:diagram how the checkout service supports order fulfilment, from the customer to the database
```

Try the syntax in your browser at [try.archimaid.org](https://try.archimaid.org).

## Other agents

`skills/archimaid/` is a standard [Agent Skill](https://agentskills.io). Copy the folder into another agent's skills directory to use it there, for example `.codex/skills/` or `.cursor/skills/`.

## Maintaining

`skills/archimaid/references/reference.md` is copied from the [archimaid](https://github.com/Archimaid/archimaid) package, and `skills/archimaid/references/examples.md` collects its example diagrams. The plugin ships Markdown, JSON and PNG files only, because the Claude directory accepts other file types only from Verified organizations. Update both references when a release changes the catalogue or the syntax, and bump `version` in `.claude-plugin/plugin.json`.

## Privacy

The plugin collects no data and has no hooks, MCP servers or telemetry. See the [privacy policy](https://archimaid.org/privacy).

## Licence

MIT. ArchiMate® is a registered trademark of The Open Group. Archimaid is an independent project, not affiliated with or endorsed by The Open Group.

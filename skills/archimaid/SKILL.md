---
name: archimaid
description: Write, validate and render ArchiMate® 3.2 diagrams as text in the archimate-beta Mermaid syntax. Use when the user asks for an ArchiMate diagram, an enterprise architecture view (business, application, technology layers, capabilities, motivation), or edits .mmd files or Markdown mermaid blocks that start with archimate-beta.
---

# Archimaid

Archimaid adds ArchiMate 3.2 to Mermaid as the `archimate-beta` diagram type. Write diagrams as plain text, check them with the `archimaid` CLI, and render them to SVG.

## Workflow

1. Decide which ArchiMate elements and relationships the view needs. Model meaning with element types and relationships, not with notes.
2. Write the diagram in a `.mmd` file, or in a fenced `mermaid` block in Markdown.
3. Validate it and fix every error, then validate again:
   ```sh
   npx --yes archimaid validate path/to/diagram.mmd
   ```
   Use `-` to validate standard input. Problems print as `file:line:column: message`. Warnings start with `warning:` and don't fail the run.
4. Check that ArchiMate 3.2 permits each relationship between its source and target types (Appendix B). The validator doesn't check this yet.
5. Render an SVG when the target host can't load the plugin, such as GitHub Markdown (see Rendering).

## Syntax

Start with `archimate-beta` and put one declaration on each line.

```text
archimate-beta
  direction LR
  accTitle: Order management
  accDescr: The order management suite contains a billing component.

  element applicationComponent suite "Order management suite" {
    element applicationComponent billing "Billing"
  }
  description billing "Handles invoicing."
  click billing href "https://wiki.example.com/billing" "Open the billing runbook"

  suite *-- billing
  note review "Confirm retry behaviour" on suite
```

- **Elements:** `element <type> <id> "Name"`. The 60 type keys (`businessProcess`, `applicationComponent`, `node`, …) are listed in [references/reference.md](references/reference.md). Read it whenever you're unsure of a key.
- **IDs:** unique, start with a letter or underscore, and contain letters, digits, underscores and hyphens.
- **Strings:** JSON-style double quotes, never empty. Use `\n` for a line break. Long names wrap automatically.
- **Accessibility:** always add `accTitle:`. Add `accDescr:`, or `accDescr { … }` for several lines.
- **Frontmatter:** a leading YAML block between `---` lines is allowed, for example `config: { theme: dark }`.

### Relationships

Shorthand: `<source> <connector> <target>`, with an optional `: "Label"`. The left endpoint is always the model source.

| Connector | Relationship |
| --- | --- |
| `*--` | composition |
| `o--` | aggregation |
| `@==>` | assignment |
| `..\|>` | realization |
| `-->` | serving |
| `..` / `<..` / `..>` / `<..>` | access: unspecified / read / write / readWrite |
| `-.->` | influence |
| `---` / `--/` | association: undirected / directed |
| `==>` | triggering |
| `-.=>` | flow |
| `--\|>` | specialization |

- `manage <.. order` means *manage reads order*: the accessor is on the left.
- An ID at the start of a statement is never read as the `o--` glyph. Write `o o-- b`, not `o--b`.
- Don't repeat an identical shorthand line.
- Long form: `relationship <type> <id> <source> -> <target>`, optionally followed by `access read|write|readWrite|unspecified` or `directed`, then `label "Text"`. Use the long form when another declaration must reference the relationship's ID.

### Nesting

- Declare children inside `element … {` and `}`, each on its own line. Blocks nest and can hold elements, descriptions, relationships, notes, `nest` and `click`, but not diagram settings.
- Nesting needs no relationship. When exactly one parent-child relationship supports nesting, the enclosure represents it and its line is hidden. Composition, aggregation, assignment, realization and access point from parent to child. Specialization points from child to parent.
- `nest <child> in <parent> [via <relationshipId>]` is the line form. Use `via` when several relationships could support the nesting. Each child has one visual parent, and nesting must not form a cycle.

### Notes and links

- `note <id> "Text"` declares a standalone note. Append `on <elementId>` to attach it to an element. Notes can be relationship endpoints.
- `click <id> href "<url>" ["Tooltip"] [_blank|_self|_parent|_top]` links an element. URLs must be http, https, mailto or relative. Without a tooltip, hovering shows the `description`.

### Layout

- Default, or `layout architecture`: layers top to bottom (Strategy, Business, Application, Technology and Physical, Implementation & Migration), with Motivation at the top near what it connects to. Prefer this for cross-layer views.
- `layout framework`: the same layers, with fixed Passive Structure, Behavior and Active Structure columns and Motivation on the right.
- `layout graph`, or `direction TB|BT|LR|RL` on its own: relationship-driven placement. Prefer this for small single-layer views and chains.

### Out of scope

Junctions, relationships as endpoints, alternative figures, viewpoints and model exchange aren't supported. Don't invent syntax for them. Say so and use the closest supported construct.

## Rendering

Rendering needs Playwright Chromium in the project:

```sh
npm install --save-dev archimaid mermaid playwright
npx playwright install chromium
npx archimaid render diagram.mmd diagram.svg --theme default --background theme
```

For hosts that don't register the plugin (GitHub, GitLab), commit the `.mmd` source next to the SVG and embed the SVG: `![Title](diagram.svg)`.

For a web page, register the plugin with Mermaid 12.3 or later:

```js
import mermaid from 'mermaid';
import { archimate } from 'archimaid';

mermaid.initialize({ startOnLoad: false, securityLevel: 'strict' });
await mermaid.registerExternalDiagrams([archimate]);
```

To check syntax quickly with the user, point them at the browser playground: https://try.archimaid.org

## Examples

[references/examples.md](references/examples.md) has three complete, valid diagrams:

- **Order management:** assignment, realization, serving and read access
- **Cross-layer relationships:** architecture layout with nested claims processing
- **Nested components:** composition, attached and standalone notes, cross-boundary flows

> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Features of Markdown parsers and linters, and markdownifico's scope

The answer to [#6](https://github.com/izkreny/markdownifico/issues/6): what each CommonMark parser in the reference tree and each Markdown linter in the owner's survey offers, and which of those features markdownifico ships in its first release, later, or never. markdownifico is a parser, a linter and an HTML renderer, so all three kinds of feature are in scope for the decision.

Every cell was read on 2026-10-23 at the version its column header names. The survey this extends, of Markdown linters and Ruby Markdown parsers from 2026-09 and rechecked 2026-10, compared five markdownlint rules, maintenance and parsers; the rows here are the features it did not compare.

## How the cells were read

- **Parsers** are the reference tree's CommonMark clones at their release tags, plus commonmarker as its own column, since it exposes only part of the comrak version it bundles (it pins comrak 0.56, one release behind the comrak column).
- **Linters** were shallow-cloned at the versions the survey rechecked on 2026-10-23; mdl was read from its reference clone at its tag. goldmark-lint released 0.6.1 on the same day, after the survey's recheck, and is read here at 0.6.0.
- **A linter's dialect cells describe what the linter turns on**, not everything its parser library could do: mado runs comrak with only tables and frontmatter enabled, so its task-list cell is `no`.
- **Extended autolinks count only when the parser makes the link.** Several linters find bare URLs with a regex inside their bare-URL rule; that is a rule, not the dialect, and those cells are `no`.
- Subagents gathered the cells against one row list, each citing a permalink at the tag. The orchestrating session re-read the cited source of every cell the scope decision below rests on and of every `readme` cell, and settled the cells a subagent could not, from the dependency that owns the answer: kramdown 2.5.2 for mdl, tree-sitter-md 0.3.2 for quickmark, and unified-args 11.0.1 and unified-engine 11.2.2 for remark-lint as remark-cli runs it.
- **Every `yes` and `no` cell was then checked against code** by a second set of subagents, docs and READMEs not counting as evidence, and every cell that had cited prose now cites the code that confirmed it; the spec-version cells cite the spec file each test suite runs. That pass corrected nine cells, each re-read in code before it changed.

**Legend.** `yes`: the tool's code, or its docs other than the README, show it. `readme`: only the README claims it. `no`: code and docs were read and it is absent. `n/a`: the row does not apply to the tool's job, such as a rule count for a parser or a fix shape for a linter that does not fix. In the column and end-position rows, `offset` means a byte offset into the source rather than a line and column. A word or number after the comma qualifies the cell; anything longer is in the tool's note below the table.

## The table

<!-- freeze-columns: 2 -->
| Group | Feature | cmark 0.31.2 | cmark-gfm 0.29.0.gfm.13 | commonmark.js 0.31.2 | commonmark-java 0.31.0 | comrak 0.57.0 | commonmarker 2.10.1 | markd 0.6.0 | goldmark 2.1.8 | pulldown-cmark 0.13.0 | md4c 0.6.0 | markdownlint-cli2 0.24.0 | rumdl 0.3.0 | mdl 0.18.1 | pymarkdownlnt 0.9.41 | quickmark 1.1.0 | gomarklint 3.3.2 | goldmark-lint 0.6.0 | mdsmith 0.57.0 | mado 0.3.2 | remark-lint 10.0.1 | mdmend 1.0.2 | Vale 3.25.1 | contextlint 1.1.1 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dialects | CommonMark spec version | yes, 0.31.2 | yes, GFM 0.29 | yes, 0.31.2 | yes, 0.31.2 | yes, 0.31.2 | yes, GFM 0.29 | yes, 0.29 | yes, 0.31.2 | yes, 0.31.2 | yes, 0.31.2 | readme | yes, 0.31.2 | no | readme, 0.29.2 | readme | no | readme | no | readme | readme | readme | no | no |
| Dialects | GFM tables | no | yes | no | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | no | yes | yes | yes | yes, plugin | yes | yes | yes |
| Dialects | GFM task lists | no | yes | no | yes | yes | yes | yes | yes | yes | yes | no | yes | no | yes | yes | no | yes | yes | no | yes, plugin | no | yes | yes |
| Dialects | GFM strikethrough | no | yes | no | yes | yes | yes | yes | yes | yes | yes | no | yes | no | yes | no | no | yes | yes | no | yes, plugin | no | yes | yes |
| Dialects | GFM extended autolinks | no | yes | no | yes | yes | yes | yes | yes | no | yes | yes | no | no | yes | no | no | no | no | no | yes, plugin | no | yes | yes |
| Dialects | Footnotes | no | yes | no | yes | yes | yes | no | yes | yes | yes | yes | yes | yes | no | no | no | yes | yes | no | yes, plugin | yes | yes | yes |
| Dialects | Frontmatter | no | no | no | yes, parsed | yes, skipped | yes, skipped | no | no | yes, skipped | no | yes, skipped | yes, skipped | yes, skipped | yes, parsed | yes, skipped | yes, skipped | yes, skipped | yes, parsed | yes, skipped | yes, plugin | yes, two rules | yes, parsed | no |
| Dialects | Math | no | no | no | no | yes | yes | no | no | yes | yes | yes | yes | yes | no | no | no | no | yes | no | yes, plugin | no | yes | no |
| Dialects | Other extensions | yes, smart quotes | yes, tagfilter | yes, smart quotes | yes, 4 modules | yes, many | yes, many | yes, alerts, emoji | yes, deflists, ids | yes, many | yes, many | yes, directives | yes, many | yes, kramdown | yes, tagfilter | no | no | no | yes, many | no | yes, plugins | no | yes, MDX, MyST | no |
| Rules | Built-in rule count | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes, 53 | yes, 89 | yes, 39 | yes, 57 | yes, 52 | yes, 23 | yes, 53 | yes, 74 | yes, 38 | yes, 80 | yes, 57 | yes, 4 | yes, 21 |
| Rules | markdownlint `MD###` ids | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes, partial | yes | yes, partial | yes | no | yes | no | yes, partial | no | yes | no | no |
| Rules | Inline disable comments | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes, markdownlint | no | yes, own | no | yes, own | yes, markdownlint | no | no | yes, own | no | yes, own | no |
| Fixing | Autofix | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes | yes | yes | no | no | yes | yes | no | no | yes | yes | yes, LSP only |
| Fixing | Fix shape | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes, patch | yes, both | yes, patch | yes, both | n/a | n/a | yes, patch | yes, patch | n/a | n/a | yes, patch | yes, patch | yes, patch |
| Fixing | Dry run or diff | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | no | yes | no | no | n/a | n/a | yes | yes | n/a | n/a | yes | yes | no |
| Output | HTML | yes | yes | yes | yes | yes | yes | yes | yes | yes | yes | n/a | n/a | n/a | yes, internal | n/a | n/a | n/a | yes, library | n/a | n/a | n/a | n/a | n/a |
| Output | CommonMark back out | yes | yes | no | yes | yes | yes | no | no | no | no | n/a | n/a | n/a | yes, internal | n/a | n/a | n/a | n/a | n/a | yes, plugin | n/a | n/a | n/a |
| Output | AST dump | yes, XML | yes, XML | yes, XML | no | yes, XML | yes, inspect | no | yes | yes, events | no | yes, API | no | no | no | no | no | no | yes, API | no | yes, JSON | n/a | no | no |
| Output | Other renderers | yes, man, LaTeX | yes, man, LaTeX, text | no | yes, text | no | no | no | no | no | no | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| Output | Lint report formats | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes, JSON, SARIF, JUnit | yes, JSON, SARIF, JUnit, GitHub | yes, JSON, SARIF | yes, text only | yes, text only | yes, JSON | yes, JSON, SARIF, JUnit, GitHub | yes, JSON, SARIF | yes, text only | yes, text only | yes, JSON, SARIF | yes, JSON | yes, JSON |
| Positions | On nodes | yes | yes | yes, blocks only | yes | yes | yes | yes, blocks only | yes, offset | yes, offset | no | yes | yes | yes | yes | yes | no | yes | yes | yes | yes | no | yes | yes |
| Positions | With columns | yes | yes | yes, blocks only | yes | yes | yes | yes, blocks only | yes, offset | yes, offset | no | yes | yes | no | yes | yes | no | yes, offset | yes, offset | yes | yes | no | yes | no |
| Positions | With end positions | yes | yes | yes, blocks only | yes, as length | yes | yes | yes, blocks only | yes, offset | yes, offset | no | yes | yes | no | no | yes | no | yes, offset | yes, offset | yes | yes | no | yes, same line | no |
| Positions | On findings, line and column | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes, if ranged | yes | no, line only | yes | yes | no, line only | yes | yes | yes | yes | yes, mostly column 1 | yes | no, line only |
| Configuration | Config file formats | n/a, code only | n/a, code only | n/a, code only | n/a, code only | yes, CLI args file | n/a, code only | n/a, code only | n/a, code only | n/a, code only | n/a, code only | yes, JSON, YAML, TOML, JS | yes, TOML | yes, Ruby DSL | yes, JSON, YAML, TOML | yes, TOML | yes, JSON | yes, JSON, YAML | yes, YAML | yes, TOML | yes, JSON, YAML, JS | yes, YAML, JSON | yes, INI | yes, JSON |
| Configuration | Reads `.markdownlint.*` | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes | no | no | no | no | yes | no, import only | no | no | yes, JSON only | no | no |
| Configuration | Per-directory config | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes | no | no | yes | no | no | no | no | yes | no | no | no |
| Plugins | Parser extension API | no | yes | no | yes | no | no | no | yes | no | no | yes, markdown-it only | no | no | no | no | n/a | no | yes | no | yes | n/a | no | no |
| Plugins | Custom rule API | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | yes | yes, library | yes | yes | no | no | yes, library | no | no | yes | yes, library | yes | yes, library |
| Plugins | Plugin discovery | n/a | yes, by name | n/a | no, code only | no, code only | no, code only | no, code only | no, code only | no, code only | n/a | yes, name or path | no, code only | yes, path | yes, path | n/a | n/a | no, code only | no, code only | n/a | yes, name or path | no, code only | yes, name or path | no |

## What a cell cannot hold

### Parsers

- **cmark**: no extensions beyond smart punctuation; GFM lives in the cmark-gfm fork. Its XML renderer is the AST dump, and man and LaTeX are its other renderers.
- **cmark-gfm**: tests against the GFM spec 0.29, which is built on CommonMark 0.29, not 0.31. Tables, strikethrough, autolinks, task lists and the tagfilter are registered syntax extensions attached by name; footnotes are a core option flag instead.
- **commonmark.js**: source positions on block nodes only: lib/blocks.js gives every block a start line and column, and lib/inlines.js creates inline nodes without one. Its XML renderer is the AST dump.
- **commonmark-java**: positions are source spans of line, column, input offset and length, so an end is computed rather than stored. Its ten extension modules include YAML frontmatter, parsed by a built-in YAML subset parser; the four outside GFM are alerts, heading anchors, image attributes and `++ins++`. No tree dump beyond a per-node `toString()`.
- **comrak**: the spec is a submodule pinned at 0.31.2, and its CI also runs the GFM spec. Every extension beyond the GFM set is off by default, among them alerts, description lists, wikilinks, heading ids, superscript, subscript, underline and spoilers. Plugins exist for rendering only, such as syntax highlighting; nothing adds syntax.
- **commonmarker**: its own suite runs the GFM spec 0.29 fixture, while the comrak 0.56 it wraps targets 0.31.2. From comrak 0.56 it does not expose the attribute extensions, `phoenix_heex`, the URL rewriters, the broken-link callback, `tasklist_in_table`, the list-style and figure render options, the heading and code-fence render plugins other than syntax highlighting, and XML output. Every node carries start and end line and column through `source_position`.
- **markd**: tests against CommonMark 0.29. Every GFM feature waits on its `gfm` option; autolinks, emoji and the tagfilter are separate options. Positions are on block nodes only, and footnote examples in its fixtures are marked pending with no code behind them.
- **goldmark**: the spec fixture has no version field but holds the 652 examples of spec 0.31.2, the version the README names. Positions are byte offsets with no line or column: a start through `Pos()`, and a start and stop through a block's `Source()` segments and a text node's value index. No Markdown renderer exists, although the README calls the tree a CST; frontmatter and math are third-party extensions only.
- **pulldown-cmark**: a pull parser emitting events, not a tree, so its positions are the byte ranges of an offset iterator, with no line or column. No extended autolinks and no tagfilter; `ENABLE_GFM` turns on GitHub alerts. Its `--dry-run` only counts events, and the events print (`-e`) is the AST dump.
- **md4c**: a streaming callback parser that builds no tree, so it has no positions and no dump. Its extension set is the widest here: tables, task lists, strikethrough, autolinks, footnotes, LaTeX math, wikilinks, underline, superscript, subscript, highlight, insert, spoilers and admonitions. The XHTML output is a variant of the HTML renderer.

### Linters

- **markdownlint-cli2** (with markdownlint 0.42.0): the library holds the rules and the micromark parser, with GFM tables, footnotes and autolink literals, math and directives on; task lists and strikethrough are not among its extensions. Frontmatter is removed before parsing and handed to rules as `frontMatterLines`. Fixes are character edits from each finding's `fixInfo`, applied and re-linted by the CLI. A finding has a column only when its rule reports a range. Config is `.markdownlint-cli2.*` for the run and `.markdownlint.*` for rules, in JSON, JSONC, YAML, TOML or JavaScript, merged per directory; custom rules and output formatters load by module name or path. Syntax plugins can be added only to the markdown-it parser it hands to custom rules, through `markdownItPlugins`; the micromark parser its own rules use takes none.
- **rumdl**: it builds on pulldown-cmark 0.13.4, a patch release past the pulldown-cmark column. Rules MD001 to MD059 follow markdownlint and MD060 onward are its own. Its parser is pulldown-cmark with tables, footnotes, strikethrough, task lists, math, GitHub alerts, smart punctuation, heading attributes, definition lists, superscript, subscript and wikilinks on; frontmatter is detected by its own code in YAML, TOML or JSON. Bare URLs are found by rule MD034, not by the parser, and rules see a line table and element lists rather than a node tree. Most fixes are byte ranges, while a few rules return the whole document rewritten. Custom rules are possible through the Rust library only.
- **mdl**: parses with a subclass of kramdown's own parser, not its GFM parser, so tables, footnotes, math and definition lists come from kramdown syntax, and task lists, strikethrough and extended autolinks are absent. Findings carry a line only. Config, styles and rulesets are Ruby files.
- **pymarkdownlnt**: the 0.29.2 claim is in an old README kept under `docs/`, and its tests cite the GFM spec. Every extension, tables and frontmatter included, is off until enabled in config. A single `fix` run applies line fixes as patches and token fixes by re-rendering. Its HTML and Markdown transforms serve its own tests and fixes rather than a user-facing renderer.
- **quickmark**: tree-sitter-md's block grammar only, which knows tables and task-list markers; no inline pass, so rules that need inline detail scan lines with regexes. 52 rules under markdownlint ids. Config is found per directory up to `.git`.
- **gomarklint**: no Markdown parser, a line scanner that marks code, HTML and comments, so most dialect and position cells are `no`. Its docs claim YAML and TOML frontmatter; only `---` is handled.
- **goldmark-lint**: builds on goldmark 2.1.6, two patch releases behind the goldmark column, and enables goldmark's table, strikethrough, task-list and footnote parsers and nothing else. 53 rules under markdownlint ids; fixes are per-rule rewrites of the source text, frontmatter excluded. It reads markdownlint's config files and inline comments, `markdownlint-configure-file` included. Rules are added through its Go library, not the CLI.
- **mdsmith**: two parsers in a vendored goldmark fork. Rules walk the canonical one, CommonMark plus `<?...?>` processing instructions; the dialect cells answer for the flavor parser beside it, which detects GFM, footnotes, math and more. Its spec corpus tests were removed, so no version is pinned. Rule ids are its own `MDS###`; `mdsmith init --from-markdownlint` converts a markdownlint config once.
- **mado**: comrak 0.54 with tables and frontmatter on and every other extension at its default, off. 38 rules under markdownlint ids, of which the README marks MD003, MD007, MD020, MD027 and MD032 unstable. No inline disables and no fix.
- **remark-lint**: 80 rule packages on remark and unified. It adds no syntax itself: tables, task lists, strikethrough, autolinks and footnotes come from remark-gfm, math from remark-math, frontmatter from remark-frontmatter. It has no autofix; `remark --output` re-serialises the whole document through remark-stringify, which formats rather than fixes. remark-cli's `--tree-out` dumps the tree as JSON, and its config cascades per directory.
- **mdmend**: no Markdown parser, rules over lines and regexes, so its dialect cells mean a rule looks for the construct. Of its 57 rules, 40 declare a fix. Only two rules recognise a leading frontmatter block, and 65 of the 79 places that set a finding's column set it to 1. Any JSON config it reads is markdownlint's schema, from .markdownlint.json, and no other markdownlint config file.

### For contrast

- **Vale**: a prose linter on goldmark with GFM on, which lints the rendered HTML and maps positions back to the source; frontmatter fields are parsed and linted. Its own config is INI only. Its four built-in rules matter less than the YAML styles it loads by name from its styles path or downloads as packages. `vale fix` prints suggestions as JSON and writes only with `--apply`.
- **contextlint**: checks tables, section order, cross-file references and checklists, and leaves syntax to markdownlint. remark-gfm is on, but no rule reads its nodes. Fixes exist in its language server only, and its core package exports `runRules` and the `Rule` type for rules of a library user's own; the CLI loads none.

## Scope

The first two lists sort what markdownifico wants by how much is known about building it. A first-release feature gets its full technical detail, its acceptance criteria and the design it rests on, before it is built; a later one goes in as a draft issue, the feature and the tools that have it, with no plan yet for building it. How the features divide into issues is decided when they are written, and the third list is what gets none.

### First release

1. **CommonMark 0.31.2, the whole spec suite.** cmark, commonmark.js, commonmark-java, comrak, pulldown-cmark and md4c all run 0.31.2's tests, and goldmark claims it; the parsers still on 0.29 are the ones a reader has to correct for.
2. **GFM and footnotes, in the core.** The GFM spec 0.29's tables, task list items, strikethrough, extended autolinks and disallowed raw HTML, and footnotes, which GitHub renders though that spec leaves them out. cmark-gfm, commonmark-java, comrak, commonmarker, goldmark and md4c parse the first four and footnotes, and every Markdown linter with a parser has tables: a table read as plain CommonMark lints as paragraphs. Conformance adds the GFM spec's own examples to CommonMark's. GFM, footnotes and math are built on the parser's own extension points rather than wired into it, so the first release proves the design #3's extensibility ADR decides, how a dialect plugs in, before that API is offered to anyone else.
3. **Math, in the core.** `$…$` inline and `$$` blocks, the syntax GitHub renders, read like a code span and a fenced code block so their content stays raw and `$x_1$` is never taken for emphasis. comrak, commonmarker, pulldown-cmark and md4c ship it behind an option, and markdownlint-cli2 parses it unconditionally beside its GFM extensions, so markdownifico has to as well to report the same findings on the same files. No spec suite covers it, so its tests come from comrak's and micromark's own.
4. **The HTML renderer.** Every parser column has one, and the spec's test runner compares HTML, so conformance cannot be shown without it.
5. **Start and end line and column on every node, inline nodes included.** cmark, cmark-gfm, comrak and commonmarker have all of it. commonmark.js and markd stop at blocks, goldmark and pulldown-cmark keep byte offsets with no lines or columns, and md4c nothing. Findings with a column and later patch fixes both need it, and it cannot be retrofitted cheaply. Each node also keeps the markers it was written with, a list's bullet or delimiter, emphasis `*` or `_`, a heading's `#` or underline, one byte each as cmark keeps `bullet_char`, so a Markdown writer added later never loses the author's style.
6. **Findings with line and column, as text, JSON, SARIF, JUnit and GitHub annotations.** Every linter but mdl, gomarklint and contextlint reports a column, markdownlint-cli2 when the rule gives a range, and JSON is the format every tool past a text-only report offers. markdownlint-cli2, rumdl and goldmark-lint emit SARIF and JUnit for CI, rumdl and goldmark-lint GitHub annotations too, and mdl, mdsmith and mdmend emit SARIF; each is a formatter over the same findings, so the findings model is designed once for all of them.
7. **Frontmatter recognised, its lines kept for rules, and parsed as YAML.** Every linter but contextlint recognises it, markdownlint hands the lines to rules as `frontMatterLines`, and pymarkdownlnt, mdsmith, Vale and commonmark-java also parse it, which a rule checking its keys needs. One call parses it on both engines: CRuby's `Psych.safe_load` runs libyaml, a C library, and Spinel bundles a pure-Ruby `psych` package that answers what `Psych.safe_load` answers, so neither needs psych-pure, which #2 found Spinel refuses. Spinel's package has no `Psych.parse` or node API, so a key's line comes from the frontmatter lines rather than from the YAML tree.
8. **Every markdownlint rule, under its `MD###` id.** The 53 rules of markdownlint 0.42.0, the set markdownlint-cli2 runs, with markdownlint-cli2's findings on a shared corpus as the reference, as #3's conformance note describes. markdownlint-cli2, mdl, quickmark, goldmark-lint and mdmend use the ids, rumdl, pymarkdownlnt and mado use them in part, and only gomarklint, mdsmith and remark-lint, among the Markdown linters, have schemes of their own. The ids are what lets a project switch without rewriting its config and comments. #3 asks whether the rule set follows these ids; this list says yes for the first release, and #3's ADR decides how. MD051 among them needs heading anchors built as GitHub builds them, lowercase, punctuation other than `-` and `_` dropped and spaces made hyphens, so the first release computes an anchor from each heading's text: a function the rules call, not syntax the parser reads.
9. **A rule API, with custom rules loaded by name or path from config.** markdownlint-cli2, mdl, pymarkdownlnt, remark-lint and Vale load rules from config; rumdl, goldmark-lint, mdmend and contextlint take them only through their libraries, and the rest take none. #3's extensibility ADR, with skills-guru's rules as its test case, decides the shape.
10. **Inline disable comments in markdownlint's syntax.** markdownlint-cli2, rumdl and goldmark-lint read `<!-- markdownlint-disable -->`; the linters with a syntax of their own make every existing comment dead on arrival.
11. **Reading .markdownlint.json, .jsonc, .yaml and .yml.** markdownlint-cli2, rumdl and goldmark-lint read them, and mdmend reads the JSON one. #3 asks the same question as for the ids, and the same answer holds.
12. **An AST dump.** cmark, cmark-gfm, commonmark.js and comrak print XML, goldmark and commonmarker pretty-print, remark-cli prints JSON. A rule author needs to see the tree a rule walks, and #2's harness already compared parsers by printing it.

### Later, as draft issues

1. **Autofix as patches, with a dry run or diff.** Every fixing linter here patches, with pymarkdownlnt's token fixes and a few rumdl rules the only ones that rewrite the whole document; rumdl, goldmark-lint, mdsmith and mdmend show fixes without writing them. It waits on the positions of the first release.
2. **Publishing the parser extension API to other gems.** Its design is #3's and the first release's own GFM, footnotes and math already use it; what waits is making it a public, documented API that outside gems can build on. cmark-gfm, commonmark-java, goldmark, mdsmith and remark have one, and markdownlint-cli2 has one for the markdown-it parser its custom rules can use; the other parsers add syntax only by changing their own code.
3. **Per-directory config.** markdownlint-cli2, rumdl, quickmark and remark-lint apply a config to its subtree.
4. **GitHub alerts**, through the extension API. comrak, commonmark-java, markd, pulldown-cmark and rumdl parse them.
5. **psych-pure for frontmatter, once Spinel compiles it.** Its `Psych::Pure.parse` gives a YAML syntax tree, so a rule can point at the exact key and value, and it keeps comments and parses exactly to YAML 1.2, none of which Spinel's bundled `psych` offers. The two blockers #2 found are to be reported upstream to psych-pure: its `require "delegate"`, a library Spinel does not provide, and its `class Parser < StringScanner`, which Spinel refuses and suggests replacing with a scanner held in an instance variable.
6. **A CommonMark writer.** cmark, cmark-gfm, commonmark-java, comrak and commonmarker render the tree back to Markdown; among the linters only remark does, through remark-stringify. It is one more renderer over the same tree, and because the first release keeps every node's markers it can write an author's own style back, or a fixed one, lists `-`, emphasis `*`, headings `#`, provided it switches markers between adjacent lists, since a changed bullet starts a new list. It serves formatting and conversion, never fixes, which patch.

### Never

1. **Renderers other than HTML.** cmark and cmark-gfm render man and LaTeX, cmark-gfm and commonmark-java plain text. HTML is in scope for conformance; other formats are a converter's job, and no linter here offers one.
2. **Fixes that re-render the document.** A re-rendered fix rewrites lines the author did not ask about, which is why the fixing linters here patch instead, bar pymarkdownlnt's token fixes and a few rumdl rules; a patch needs the positions, not a writer. The CommonMark writer itself is in the later list, for formatting rather than fixing.
3. **Rule ids and config formats of its own, or config written as code.** mdsmith's `MDS###`, mdl's Ruby `.mdlrc` and markdownlint-cli2's .cjs and .mjs files each keep a project from moving between tools; config stays data that other tools and editors can read.
4. **Prose rules and cross-file reference checks.** They are Vale's and contextlint's jobs, and both run beside a Markdown linter rather than inside one.
5. **The long tail of extensions in the core**: wikilinks, definition lists, attributes, emoji, spoilers, highlight and the like. Each is in a minority of the parsers and in almost none of the linters' enabled sets; the extension API is the place for them, written by whoever needs one.

## Sources

Each tool links its repository at the tag, then one line per row that is not `n/a`, citing the file and line that decided the cell; a citation from another repository, such as a dependency's, names that repository after the link.

### cmark 0.31.2

[repository](https://github.com/commonmark/cmark/tree/0.31.2) at 0.31.2

- CommonMark spec version: [spec.txt#L4](https://github.com/commonmark/cmark/blob/0.31.2/test/spec.txt#L4)
- GFM tables: [cmark.h#L36-L66](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66)
- GFM task lists: [cmark.h#L36-L66](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66)
- GFM strikethrough: [cmark.h#L36-L66](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66)
- GFM extended autolinks: [inlines.c](https://github.com/commonmark/cmark/blob/0.31.2/src/inlines.c)
- Footnotes: [cmark.h#L36-L66](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66)
- Frontmatter: [blocks.c](https://github.com/commonmark/cmark/blob/0.31.2/src/blocks.c)
- Math: [cmark.h#L36-L66](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66)
- Other extensions: [cmark.h#L642](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L642)
- HTML: [html.c#L329](https://github.com/commonmark/cmark/blob/0.31.2/src/html.c#L329)
- CommonMark back out: [commonmark.c#L466](https://github.com/commonmark/cmark/blob/0.31.2/src/commonmark.c#L466)
- AST dump: [xml.c#L209](https://github.com/commonmark/cmark/blob/0.31.2/src/xml.c#L209)
- Other renderers: [man.c#L279](https://github.com/commonmark/cmark/blob/0.31.2/src/man.c#L279)
- On nodes: [node.h#L70](https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L70)
- With columns: [node.h#L71](https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L71)
- With end positions: [node.h#L72-L73](https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L72-L73)
- Parser extension API: [cmark.h](https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h)

### cmark-gfm 0.29.0.gfm.13

[repository](https://github.com/github/cmark-gfm/tree/0.29.0.gfm.13) at 0.29.0.gfm.13

- CommonMark spec version: [spec.txt#L1-L3](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/test/spec.txt#L1-L3)
- GFM tables: [table.c#L853](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/table.c#L853)
- GFM task lists: [tasklist.c#L143](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/tasklist.c#L143)
- GFM strikethrough: [strikethrough.c#L144](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/strikethrough.c#L144)
- GFM extended autolinks: [autolink.c#L495](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/autolink.c#L495)
- Footnotes: [cmark-gfm.h#L753](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/cmark-gfm.h#L753-L755)
- Frontmatter: [blocks.c](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/blocks.c)
- Math: [core-extensions…#L11](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/core-extensions.c#L11-L19)
- Other extensions: [tagfilter.c#L56](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/tagfilter.c#L56)
- HTML: [html.c#L472](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/html.c#L472)
- CommonMark back out: [commonmark.c#L507](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/commonmark.c#L507)
- AST dump: [xml.c#L162](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/xml.c#L162)
- Other renderers: [main.c#L48-L50](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/main.c#L48-L50)
- On nodes: [node.h#L75](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L75)
- With columns: [node.h#L76](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L76)
- With end positions: [node.h#L77-L78](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L77-L78)
- Parser extension API: [cmark-gfm-exte…#L275](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/cmark-gfm-extension_api.h#L275)
- Plugin discovery: [registry.c#L54](https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/registry.c#L54)

### commonmark.js 0.31.2

[repository](https://github.com/commonmark/commonmark.js/tree/0.31.2) at 0.31.2

- CommonMark spec version: [spec.txt#L4](https://github.com/commonmark/commonmark.js/blob/0.31.2/test/spec.txt#L4)
- GFM tables: [index.js#L11-L15](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15)
- GFM task lists: [index.js#L11-L15](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15)
- GFM strikethrough: [inlines.js](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js)
- GFM extended autolinks: [inlines.js](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js)
- Footnotes: [node.js#L1-L30](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/node.js#L1-L30)
- Frontmatter: [blocks.js](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js)
- Math: [blocks.js](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js)
- Other extensions: [inlines.js#L786](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js#L786)
- HTML: [html.js#L34](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/render/html.js#L34)
- CommonMark back out: [index.js#L11-L15](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15)
- AST dump: [commonmark#L70](https://github.com/commonmark/commonmark.js/blob/0.31.2/bin/commonmark#L70)
- Other renderers: [xml.js#L12](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/render/xml.js#L12)
- On nodes: [node.js#L69-L76](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/node.js#L69-L76)
- With columns: [blocks.js#L104-L107](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js#L104-L107), [inlines.js#L93](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js#L93)
- With end positions: [blocks.js#L906](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js#L906)
- Parser extension API: [index.js#L11-L15](https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15)

### commonmark-java 0.31.0

[repository](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0) at commonmark-parent-0.31.0

- CommonMark spec version: [spec.txt#L4](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-test-util/src/main/resources/spec.txt#L4)
- GFM tables: [TablesExtension…#L44](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-gfm-tables/src/main/java/org/commonmark/ext/gfm/tables/TablesExtension.java#L44)
- GFM task lists: [TaskListItemsEx…#L31](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-task-list-items/src/main/java/org/commonmark/ext/task/list/items/TaskListItemsExtension.java#L31)
- GFM strikethrough: [StrikethroughEx…#L61](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-gfm-strikethrough/src/main/java/org/commonmark/ext/gfm/strikethrough/StrikethroughExtension.java#L61)
- GFM extended autolinks: [AutolinkExtensi…#L30](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-autolink/src/main/java/org/commonmark/ext/autolink/AutolinkExtension.java#L30)
- Footnotes: [FootnotesExtens…#L52](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-footnotes/src/main/java/org/commonmark/ext/footnotes/FootnotesExtension.java#L52)
- Frontmatter: [YamlFrontMatter…#L53](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-yaml-front-matter/src/main/java/org/commonmark/ext/front/matter/YamlFrontMatterExtension.java#L53)
- Math: [repository](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0)
- Other extensions: [commonmark-ext-gfm-…](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-gfm-alerts), [commonmark-ext-head…](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-heading-anchor), [commonmark-ext-imag…](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-image-attributes), [commonmark-ext-ins/](https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-ins)
- HTML: [HtmlRenderer.ja…#L20](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/html/HtmlRenderer.java#L20)
- CommonMark back out: [MarkdownRendere…#L28](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/markdown/MarkdownRenderer.java#L28)
- AST dump: [Node.java#L154](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/Node.java#L154)
- Other renderers: [TextContentRend…#L11](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/text/TextContentRenderer.java#L11)
- On nodes: [SourceSpan.java#L30](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L30)
- With columns: [SourceSpan.java#L32](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L32-L35)
- With end positions: [SourceSpan.java#L95](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L95)
- Parser extension API: [Parser.java#L296](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/parser/Parser.java#L296)
- Plugin discovery: [Parser.java#L169](https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/parser/Parser.java#L169)

### comrak 0.57.0

[repository](https://github.com/kivikakk/comrak/tree/v0.57.0) at v0.57.0

- CommonMark spec version: [cibuild#L20](https://github.com/kivikakk/comrak/blob/v0.57.0/script/cibuild#L20), [README.md#L12](https://github.com/kivikakk/comrak/blob/v0.57.0/README.md#L12)
- GFM tables: [options.rs#L59](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L59)
- GFM task lists: [options.rs#L91](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L91)
- GFM strikethrough: [options.rs#L45](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L45)
- GFM extended autolinks: [options.rs#L72](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L72)
- Footnotes: [options.rs#L151](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L151)
- Frontmatter: [options.rs#L239](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L239)
- Math: [options.rs#L304](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L304)
- Other extensions: [main.rs#L193-L225](https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L193-L225)
- HTML: [lib.rs#L93](https://github.com/kivikakk/comrak/blob/v0.57.0/src/lib.rs#L93)
- CommonMark back out: [lib.rs#L89](https://github.com/kivikakk/comrak/blob/v0.57.0/src/lib.rs#L89)
- AST dump: [main.rs#L183-L190](https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L183-L190)
- Other renderers: [main.rs#L183-L190](https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L183-L190)
- On nodes: [nodes.rs#L845](https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L845)
- With columns: [nodes.rs#L945-L951](https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L945-L951)
- With end positions: [nodes.rs#L891-L896](https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L891-L896)
- Config file formats: [main.rs#L259-L286](https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L259-L286)
- Parser extension API: [options.rs#L1419](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L1419-L1476)
- Plugin discovery: [options.rs#L1419](https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L1419-L1476)

### commonmarker 2.10.1

[repository](https://github.com/gjtorikian/commonmarker/tree/v2.10.1) at v2.10.1

- CommonMark spec version: [spec.txt#L1-L4](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/test/fixtures/upstream/spec.txt#L1-L4)
- GFM tables: [options.rs#L158](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L158)
- GFM task lists: [options.rs#L164](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L164)
- GFM strikethrough: [options.rs#L155](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L155)
- GFM extended autolinks: [options.rs#L161](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L161)
- Footnotes: [options.rs#L176](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L176)
- Frontmatter: [options.rs#L185-L194](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L185-L194)
- Math: [options.rs#L195](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L195)
- Other extensions: [config.rb#L34-L63](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/config.rb#L34-L63)
- HTML: [commonmarker.rb#L33](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker.rb#L33-L43)
- CommonMark back out: [node.rb#L81-L90](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/node.rb#L81-L90)
- AST dump: [inspect.rb#L9-L56](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/node/inspect.rb#L9-L56)
- Other renderers: [node.rs#L1336-L1341](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L1336-L1341)
- On nodes: [node.rs#L706-L719](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L706-L719)
- With columns: [node.rs#L710-L714](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L710-L714)
- With end positions: [node.rs#L715-L716](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L715-L716)
- Parser extension API: [options.rs](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs), [plugins/](https://github.com/gjtorikian/commonmarker/tree/v2.10.1/ext/commonmarker/src/plugins)
- Plugin discovery: [config.rb#L67-L72](https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/config.rb#L67-L72)

### markd 0.6.0

[repository](https://github.com/icyleaf/markd/tree/v0.6.0) at v0.6.0

- CommonMark spec version: [spec.txt#L1-L5](https://github.com/icyleaf/markd/blob/v0.6.0/spec/fixtures/spec.txt#L1-L5), [markd_spec.cr#L3-L4](https://github.com/icyleaf/markd/blob/v0.6.0/spec/markd_spec.cr#L3-L4)
- GFM tables: [table.cr#L9](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rules/table.cr#L9)
- GFM task lists: [list.cr#L85-L93](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rules/list.cr#L85-L93)
- GFM strikethrough: [inline.cr#L46-L47](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/inline.cr#L46-L47)
- GFM extended autolinks: [options.cr#L72-L75](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/options.cr#L72-L75)
- Footnotes: [gfm-extensions…#L705](https://github.com/icyleaf/markd/blob/v0.6.0/spec/fixtures/gfm-extensions.txt#L705-L707)
- Frontmatter: [block.cr#L9-L21](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21)
- Math: [options.cr#L1-L96](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/options.cr#L1-L96)
- Other extensions: [rule.cr#L108](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rule.cr#L108)
- HTML: [markd.cr#L10-L33](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd.cr#L10-L33)
- CommonMark back out: [html_renderer.cr#L1](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/renderers/html_renderer.cr#L1-L5)
- AST dump: [node.cr#L134-L146](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/node.cr#L134-L146)
- Other renderers: [renderer.cr#L1-L70](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/renderer.cr#L1-L70)
- On nodes: [node.cr#L63](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/node.cr#L63)
- With columns: [block.cr#L243-L245](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L243-L245)
- With end positions: [block.cr#L213-L216](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L213-L216)
- Parser extension API: [block.cr#L9-L21](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21)
- Plugin discovery: [block.cr#L9-L21](https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21)

### goldmark 2.1.8

[repository](https://github.com/yuin/goldmark/tree/v2.1.8) at v2.1.8

- CommonMark spec version: [commonmark_test…#L23](https://github.com/yuin/goldmark/blob/v2.1.8/commonmark_test.go#L23-L25)
- GFM tables: [table.go#L512](https://github.com/yuin/goldmark/blob/v2.1.8/extension/table.go#L512)
- GFM task lists: [tasklist.go#L246](https://github.com/yuin/goldmark/blob/v2.1.8/extension/tasklist.go#L246)
- GFM strikethrough: [strikethrough.…#L127](https://github.com/yuin/goldmark/blob/v2.1.8/extension/strikethrough.go#L127)
- GFM extended autolinks: [linkify.go#L228](https://github.com/yuin/goldmark/blob/v2.1.8/extension/linkify.go#L228)
- Footnotes: [footnote.go#L722](https://github.com/yuin/goldmark/blob/v2.1.8/extension/footnote.go#L722)
- Frontmatter: [package.go#L1-L2](https://github.com/yuin/goldmark/blob/v2.1.8/extension/package.go#L1-L2)
- Math: [package.go#L1-L2](https://github.com/yuin/goldmark/blob/v2.1.8/extension/package.go#L1-L2)
- Other extensions: [definition_lis…#L250](https://github.com/yuin/goldmark/blob/v2.1.8/extension/definition_list.go#L250)
- HTML: [html.go#L237](https://github.com/yuin/goldmark/blob/v2.1.8/renderer/html/html.go#L237)
- CommonMark back out: [renderer.go#L1-L60](https://github.com/yuin/goldmark/blob/v2.1.8/renderer/renderer.go#L1-L60)
- AST dump: [ast.go#L541](https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L541)
- Other renderers: [renderer.go#L171](https://github.com/yuin/goldmark/blob/v2.1.8/renderer/renderer.go#L171-L172)
- On nodes: [ast.go#L48-L50](https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L48-L50)
- With columns: [ast.go#L48-L50](https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L48-L50), [value.go#L653-L660](https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L653-L660)
- With end positions: [block.go#L43-L48](https://github.com/yuin/goldmark/blob/v2.1.8/ast/block.go#L43-L48), [value.go#L14-L17](https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L14-L17), [value.go#L653-L660](https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L653-L660)
- Parser extension API: [parser.go#L701-L776](https://github.com/yuin/goldmark/blob/v2.1.8/parser/parser.go#L701-L776)
- Plugin discovery: [parser.go#L619](https://github.com/yuin/goldmark/blob/v2.1.8/parser/parser.go#L619)

### pulldown-cmark 0.13.0

[repository](https://github.com/pulldown-cmark/pulldown-cmark/tree/v0.13.0) at v0.13.0

- CommonMark spec version: [spec.txt#L1-L6](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/third_party/CommonMark/spec.txt#L1-L6)
- GFM tables: [lib.rs#L651](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L651)
- GFM task lists: [lib.rs#L670](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L670)
- GFM strikethrough: [lib.rs#L669](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L669)
- GFM extended autolinks: [lib.rs#L645-L737](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L645-L737)
- Footnotes: [lib.rs#L668](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L668)
- Frontmatter: [lib.rs#L691-L695](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L691-L695)
- Math: [lib.rs#L718](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L718)
- Other extensions: [lib.rs#L678-L735](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L678-L735)
- HTML: [html.rs#L1-L40](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/html.rs#L1-L40)
- CommonMark back out: [lib.rs#L84-L86](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L84-L86)
- AST dump: [main.rs#L45-L58](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/main.rs#L45-L58)
- Other renderers: [Cargo.toml#L53-L84](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/Cargo.toml#L53-L84)
- On nodes: [parse.rs#L2161-L2171](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2161-L2171)
- With columns: [parse.rs#L2167-L2168](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2167-L2168)
- With end positions: [parse.rs#L2185-L2187](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2185-L2187)
- Parser extension API: [extensions.md#L1-L22](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/guide/src/dev/extensions.md#L1-L22)
- Plugin discovery: [parse.rs#L266](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L266)

### md4c 0.6.0

[repository](https://github.com/mity/md4c/tree/v0.6.0) at v0.6.0

- CommonMark spec version: [spec.txt#L4](https://github.com/mity/md4c/blob/v0.6.0/test/spec.txt#L4)
- GFM tables: [md4c.h#L393](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L393)
- GFM task lists: [md4c.h#L396](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L396)
- GFM strikethrough: [md4c.h#L394](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L394)
- GFM extended autolinks: [md4c.h#L388-L395](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L388-L395)
- Footnotes: [md4c.h#L405](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L405)
- Frontmatter: [md4c.h](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h)
- Math: [md4c.h#L397](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L397)
- Other extensions: [md4c.h#L386-L408](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L386-L408)
- HTML: [md4c-html.c#L618](https://github.com/mity/md4c/blob/v0.6.0/src/md4c-html.c#L618)
- CommonMark back out: [md4c.h#L427-L470](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L427-L470)
- AST dump: [md4c.h#L451-L458](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458)
- Other renderers: [md2html.c#L242](https://github.com/mity/md4c/blob/v0.6.0/md2html/md2html.c#L242)
- On nodes: [md4c.h#L451-L458](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458)
- With columns: [md4c.h#L312](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L312)
- With end positions: [md4c.h#L451-L458](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458)
- Parser extension API: [md4c.h#L427-L470](https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L427-L470)

### markdownlint-cli2 0.24.0

[repository](https://github.com/DavidAnson/markdownlint-cli2/tree/v0.24.0) at v0.24.0

- CommonMark spec version: [README.md#L28](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/README.md#L28) (markdownlint)
- GFM tables: [micromark-parse…#L72](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L72) (markdownlint)
- GFM task lists: [micromark-parse…#L68](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L68-L74) (markdownlint)
- GFM strikethrough: [micromark-parse…#L68](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L68-L74) (markdownlint)
- GFM extended autolinks: [micromark-parse…#L70](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L70) (markdownlint)
- Footnotes: [micromark-parse…#L71](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L71) (markdownlint)
- Frontmatter: [markdownlint.m…#L124](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L124-L142) (markdownlint)
- Math: [micromark-parse…#L73](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L73) (markdownlint)
- Other extensions: [micromark-parse…#L25](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L25-L34) (markdownlint)
- Built-in rule count: [rules.mjs#L59-L116](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/rules.mjs#L59-L116) (markdownlint)
- markdownlint `MD###` ids: [md001.mjs#L9](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/md001.mjs#L9) (markdownlint)
- Inline disable comments: [helpers.cjs#L27](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/helpers/helpers.cjs#L27) (markdownlint), [markdownlint.m…#L353](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L353-L373) (markdownlint)
- Autofix: [markdownlint-c…#L984](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L984-L985)
- Fix shape: [markdownlint.…#L1206](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L1206-L1215) (markdownlint)
- Dry run or diff: [markdownlint-c…#L248](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L248-L283)
- AST dump: [markdownlint.m…#L485](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L485-L489) (markdownlint)
- Lint report formats: [markdownlint-cli2-f…](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-json/markdownlint-cli2-formatter-json.js), [markdownlint-cli2-f…](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-sarif/markdownlint-cli2-formatter-sarif.js), [markdownlint-cli2-f…](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-junit/markdownlint-cli2-formatter-junit.js)
- On nodes: [markdownlint.d…#L268](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L268-L275) (markdownlint)
- With columns: [markdownlint.d…#L272](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L272-L275) (markdownlint)
- With end positions: [markdownlint.d…#L276](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L276-L283) (markdownlint)
- On findings, line and column: [markdownlint.d…#L674](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L674-L680) (markdownlint)
- Config file formats: [markdownlint-c…#L173](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L173-L174)
- Reads `.markdownlint.*`: [markdownlint-c…#L315](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L315-L320)
- Per-directory config: [markdownlint-c…#L661](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L661-L685)
- Parser extension API: [markdownlint-c…#L755](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L755-L762)
- Custom rule API: [markdownlint.mjs#L22](https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L22) (markdownlint)
- Plugin discovery: [markdownlint-c…#L600](https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L600-L609)

### rumdl 0.3.0

[repository](https://github.com/rvben/rumdl/tree/v0.3.0) at v0.3.0

- CommonMark spec version: [spec.txt#L1-L6](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.4/pulldown-cmark/third_party/CommonMark/spec.txt#L1-L6) (pulldown-cmark)
- GFM tables: [parser_options.…#L15](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L15)
- GFM task lists: [parser_options.…#L18](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L18)
- GFM strikethrough: [parser_options.…#L17](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L17)
- GFM extended autolinks: [lib.rs#L646-L735](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.4/pulldown-cmark/src/lib.rs#L646-L735) (pulldown-cmark)
- Footnotes: [parser_options.…#L16](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L16)
- Frontmatter: [front_matter_u…#L202](https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/front_matter_utils.rs#L202)
- Math: [parser_options.…#L21](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L21)
- Other extensions: [parser_options.…#L19](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L19-L26), [lib.rs#L719-L722](https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.4/pulldown-cmark/src/lib.rs#L719-L722) (pulldown-cmark)
- Built-in rule count: [mod.rs#L218](https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/mod.rs#L218)
- markdownlint `MD###` ids: [mod.rs#L220](https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/mod.rs#L220)
- Inline disable comments: [inline_config.rs#L6](https://github.com/rvben/rumdl/blob/v0.3.0/src/inline_config.rs#L6)
- Autofix: [cli_types.rs#L158](https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L158)
- Fix shape: [fix_coordinator…#L36](https://github.com/rvben/rumdl/blob/v0.3.0/src/fix_coordinator.rs#L36-L40), [fix_coordinato…#L835](https://github.com/rvben/rumdl/blob/v0.3.0/src/fix_coordinator.rs#L835-L844)
- Dry run or diff: [cli_types.rs#L164](https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L164)
- AST dump: [main.rs#L109](https://github.com/rvben/rumdl/blob/v0.3.0/src/main.rs#L109)
- Lint report formats: [cli_types.rs#L444](https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L444)
- On nodes: [types.rs#L7](https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L7)
- With columns: [types.rs#L257](https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L257)
- With end positions: [types.rs#L253](https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L253)
- On findings, line and column: [rule.rs#L38](https://github.com/rvben/rumdl/blob/v0.3.0/src/rule.rs#L38)
- Config file formats: [types.rs#L818](https://github.com/rvben/rumdl/blob/v0.3.0/src/config/types.rs#L818)
- Reads `.markdownlint.*`: [types.rs#L825](https://github.com/rvben/rumdl/blob/v0.3.0/src/config/types.rs#L825)
- Per-directory config: [loading.rs#L1769](https://github.com/rvben/rumdl/blob/v0.3.0/src/config/loading.rs#L1769)
- Parser extension API: [parser_options.…#L13](https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L13)
- Custom rule API: [rule.rs#L206](https://github.com/rvben/rumdl/blob/v0.3.0/src/rule.rs#L206)
- Plugin discovery: [lib.rs#L265](https://github.com/rvben/rumdl/blob/v0.3.0/src/lib.rs#L265)

### mdl 0.18.1

[repository](https://github.com/markdownlint/markdownlint/tree/v0.18.1) at v0.18.1

- CommonMark spec version: [kramdown_parser.…#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9)
- GFM tables: [kramdown.rb#L75-L81](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81) (kramdown)
- GFM task lists: [kramdown_parser.…#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9), [kramdown.rb#L75-L81](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81) (kramdown)
- GFM strikethrough: [kramdown_parser.…#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9), [kramdown.rb#L75-L81](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81) (kramdown)
- GFM extended autolinks: [kramdown_parser.…#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9), [kramdown.rb#L79-L81](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L79-L81) (kramdown)
- Footnotes: [kramdown.rb#L75-L77](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L77) (kramdown)
- Frontmatter: [doc.rb#L30](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L30)
- Math: [kramdown.rb#L75-L80](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L80) (kramdown)
- Other extensions: [kramdown.rb#L75-L78](https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L78) (kramdown)
- Built-in rule count: [rules.rb#L16](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L16)
- markdownlint `MD###` ids: [rules.rb#L16](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L16)
- Inline disable comments: [rules.rb#L718](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L718)
- Autofix: [cli.rb#L123](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L123)
- Fix shape: [rules.rb#L194](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L194)
- Dry run or diff: [cli.rb#L123](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L123)
- AST dump: [view_markdown.rb#L7](https://github.com/markdownlint/markdownlint/blob/v0.18.1/tools/view_markdown.rb#L7)
- Lint report formats: [cli.rb#L129](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L129)
- On nodes: [doc.rb#L130](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L130)
- With columns: [doc.rb#L130](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L130)
- With end positions: [sarif.rb#L78](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/formatters/sarif.rb#L78)
- On findings, line and column: [mdl.rb#L129](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl.rb#L129)
- Config file formats: [cli.rb#L155-L158](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L155-L158)
- Reads `.markdownlint.*`: [cli.rb#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L9)
- Per-directory config: [cli.rb#L198](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L198)
- Parser extension API: [kramdown_parser.…#L9](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9)
- Custom rule API: [ruleset.rb#L9-L12](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/ruleset.rb#L9-L12)
- Plugin discovery: [cli.rb#L93](https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L93)

### pymarkdownlnt 0.9.41

[repository](https://github.com/jackdewinter/pymarkdown/tree/v0.9.41) at v0.9.41

- CommonMark spec version: [old_README.md#L46](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/docs/old_README.md#L46)
- GFM tables: [markdown_tables…#L22](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/markdown_tables.py#L22)
- GFM task lists: [task_list_items…#L33](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/task_list_items.py#L33)
- GFM strikethrough: [markdown_strike…#L22](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/markdown_strikethrough.py#L22)
- GFM extended autolinks: [extended_autoli…#L46](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/extended_autolinks.py#L46)
- Footnotes: [extension_manag…#L78](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78)
- Frontmatter: [front_matter_e…#L185](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/front_matter_extension.py#L185)
- Math: [extension_manag…#L78](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78)
- Other extensions: [extension_manag…#L78](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78)
- Built-in rule count: [rule_md_001.py#L42](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugins/rule_md_001.py#L42)
- markdownlint `MD###` ids: [rule_md_051.py#L102](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugins/rule_md_051.py#L102)
- Inline disable comments: [pragma_token.py#L205](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/pragma_token.py#L205)
- Autofix: [file_scan_hel…#L1264](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/file_scan_helper.py#L1264)
- Fix shape: [file_scan_hel…#L1092](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/file_scan_helper.py#L1092)
- Dry run or diff: [main.py#L124](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/main.py#L124)
- HTML: [transform_to_gf…#L21](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/transform_gfm/transform_to_gfm.py#L21)
- CommonMark back out: [transform_to_ma…#L53](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/transform_markdown/transform_to_markdown.py#L53)
- AST dump: [markdown_token…#L123](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L123)
- Lint report formats: [main_presentati…#L62](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/general/main_presentation.py#L62)
- On nodes: [markdown_token…#L170](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L170)
- With columns: [markdown_token…#L177](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L177)
- With end positions: [markdown_token.…#L75](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L75)
- On findings, line and column: [plugin_scan_fai…#L18](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/plugin_scan_failure.py#L18)
- Config file formats: [application_con…#L44](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L44-L50)
- Reads `.markdownlint.*`: [application_con…#L45](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L45)
- Per-directory config: [application_con…#L29](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L29-L58)
- Parser extension API: [extension_manag…#L78](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78)
- Custom rule API: [rule_plugin.py#L21](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/rule_plugin.py#L21)
- Plugin discovery: [plugin_manager…#L114](https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/plugin_manager.py#L114)

### quickmark 1.1.0

[repository](https://github.com/ekropotin/quickmark/tree/quickmark-cli%401.1.0) at quickmark-cli@1.1.0

- CommonMark spec version: [README.md#L18](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/README.md#L18)
- GFM tables: [md056.rs#L117](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md056.rs#L117)
- GFM task lists: [grammar.js#L374](https://github.com/tree-sitter-grammars/tree-sitter-markdown/blob/v0.3.2/tree-sitter-markdown/grammar.js#L374) (tree-sitter-markdown)
- GFM strikethrough: [linter.rs#L3](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3)
- GFM extended autolinks: [md034.rs#L45](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md034.rs#L45)
- Footnotes: [linter.rs#L3](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3)
- Frontmatter: [md041.rs#L74](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md041.rs#L74)
- Math: [linter.rs#L3](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3)
- Other extensions: [linter.rs#L312](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L312)
- Built-in rule count: [mod.rs#L81](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/mod.rs#L81)
- markdownlint `MD###` ids: [md001.rs#L82](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md001.rs#L82)
- Inline disable comments: [linter.rs#L343](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L343)
- Autofix: [main.rs#L21](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L21)
- AST dump: [main.rs#L21](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L21)
- Lint report formats: [main.rs#L147](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L147)
- On nodes: [linter.rs#L112](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L112)
- With columns: [linter.rs#L64](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L64)
- With end positions: [linter.rs#L18](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L18)
- On findings, line and column: [main.rs#L151](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L151)
- Config file formats: [mod.rs#L253](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L253)
- Reads `.markdownlint.*`: [mod.rs#L253](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L253)
- Per-directory config: [mod.rs#L242](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L242)
- Parser extension API: [linter.rs#L312](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L312)
- Custom rule API: [mod.rs#L81](https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/mod.rs#L81)

### gomarklint 3.3.2

[repository](https://github.com/shinagawa-web/gomarklint/tree/v3.3.2) at v3.3.2

- CommonMark spec version: [inline.go#L48](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48)
- GFM tables: [preprocess.go#L19](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24)
- GFM task lists: [preprocess.go#L19](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24)
- GFM strikethrough: [inline.go#L48](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48)
- GFM extended autolinks: [inline.go#L48](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48)
- Footnotes: [preprocess.go#L19](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24)
- Frontmatter: [reader.go#L16-L20](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/file/reader.go#L16-L20)
- Math: [preprocess.go#L19](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24)
- Other extensions: [html.go#L36](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/html.go#L36)
- Built-in rule count: [config.go#L16-L38](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/config.go#L16-L38)
- markdownlint `MD###` ids: [config.go#L12-L42](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/config.go#L12-L42)
- Inline disable comments: [disable_commen…#L144](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/linter/disable_comment.go#L144-L153)
- Autofix: [root.go#L43-L45](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/cmd/root.go#L43-L45)
- AST dump: [preprocess.go#L5-L10](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L5-L10)
- Lint report formats: [app.go#L73-L77](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/app/app.go#L73-L77)
- On nodes: [preprocess.go#L5-L10](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L5-L10)
- With columns: [heading_level.go#L10](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L10-L16)
- With end positions: [heading_level.go#L10](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L10-L16)
- On findings, line and column: [heading_level.go#L12](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L12)
- Config file formats: [root.go#L43](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/cmd/root.go#L43)
- Reads `.markdownlint.*`: [load.go#L10](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/load.go#L10)
- Per-directory config: [merge.go#L15-L23](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/merge.go#L15-L23)
- Custom rule API: [doc.go#L1-L6](https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/doc.go#L1-L6)

### goldmark-lint 0.6.0

[repository](https://github.com/mrueg/goldmark-lint/tree/v0.6.0) at v0.6.0

- CommonMark spec version: [README.md#L398](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/README.md#L398)
- GFM tables: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- GFM task lists: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- GFM strikethrough: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- GFM extended autolinks: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- Footnotes: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- Frontmatter: [lint.go#L284](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L284)
- Math: [lint.go#L155](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155)
- Other extensions: [lint.go#L154](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L154)
- Built-in rule count: [defaults.go#L11](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/defaults.go#L11)
- markdownlint `MD###` ids: [md001.go#L19](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/md001.go#L19)
- Inline disable comments: [lint.go#L362](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L362)
- Autofix: [lint.go#L142](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L142)
- Fix shape: [md018.go#L23](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/md018.go#L23)
- Dry run or diff: [main.go#L135](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/main.go#L135)
- AST dump: [lint.go#L160](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L160)
- Lint report formats: [main.go#L102](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/main.go#L102)
- On nodes: [lint.go#L48](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L48)
- With columns: [helpers.go#L18](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/helpers.go#L18)
- With end positions: [helpers.go#L298](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/helpers.go#L298)
- On findings, line and column: [lint.go#L36](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L36)
- Config file formats: [config.go#L41](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L41)
- Reads `.markdownlint.*`: [config.go#L46](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L46)
- Per-directory config: [config.go#L55](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L55)
- Parser extension API: [lint.go#L154](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L154)
- Custom rule API: [lint.go#L15](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L15)
- Plugin discovery: [lint.go#L104](https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L104)

### mdsmith 0.57.0

[repository](https://github.com/jeduden/mdsmith/tree/v0.57.0) at v0.57.0

- CommonMark spec version: [corpus_test.go#L7](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/parser/corpus_test.go#L7)
- GFM tables: [parser.go#L23](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L23)
- GFM task lists: [parser.go#L25](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L25)
- GFM strikethrough: [parser.go#L24](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L24)
- GFM extended autolinks: [detect.go#L610](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/detect.go#L610)
- Footnotes: [parser.go#L26](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L26)
- Frontmatter: [frontmatter.go#L17](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/frontmatter.go#L17)
- Math: [parser.go#L30](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L30)
- Other extensions: [feature.go#L8](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/feature.go#L8)
- Built-in rule count: [all.go#L19](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19)
- markdownlint `MD###` ids: [all.go#L19](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19)
- Inline disable comments: [rule.go#L5-L10](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/rule.go#L5-L10)
- Autofix: [rule.go#L14](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/rule.go#L14)
- Fix shape: [rule.go#L59](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/notrailingspaces/rule.go#L59)
- Dry run or diff: [fix.go#L171-L173](https://github.com/jeduden/mdsmith/blob/v0.57.0/cmd/mdsmith/fix.go#L171-L173)
- HTML: [markdown.go#L47](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/markdown.go#L47)
- AST dump: [ast.go#L136](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/ast/ast.go#L136)
- Lint report formats: [main.go#L161](https://github.com/jeduden/mdsmith/blob/v0.57.0/cmd/mdsmith/main.go#L161)
- On nodes: [ast.go#L162](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/ast/ast.go#L162)
- With columns: [segment.go#L13](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/text/segment.go#L13)
- With end positions: [segment.go#L16](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/text/segment.go#L16)
- On findings, line and column: [diagnostic.go#L67](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/lint/diagnostic.go#L67)
- Config file formats: [load.go#L19](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/config/load.go#L19)
- Reads `.markdownlint.*`: [parse.go#L21](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/markdownlint/parse.go#L21)
- Per-directory config: [load.go#L245](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/config/load.go#L245)
- Parser extension API: [parser.go#L70](https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L70)
- Custom rule API: [registry.go#L6](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/registry.go#L6)
- Plugin discovery: [all.go#L19](https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19)

### mado 0.3.2

[repository](https://github.com/akiomik/mado/tree/v0.3.2) at v0.3.2

- CommonMark spec version: [README.md#L7](https://github.com/akiomik/mado/blob/v0.3.2/README.md#L7)
- GFM tables: [document.rs#L43](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L43)
- GFM task lists: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- GFM strikethrough: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- GFM extended autolinks: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- Footnotes: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- Frontmatter: [document.rs#L42](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L42)
- Math: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- Other extensions: [document.rs#L41-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44)
- Built-in rule count: [rule.rs#L52-L91](https://github.com/akiomik/mado/blob/v0.3.2/src/rule.rs#L52-L91)
- markdownlint `MD###` ids: [md001.rs#L14-L17](https://github.com/akiomik/mado/blob/v0.3.2/src/rule/md001.rs#L14-L17)
- Inline disable comments: [linter.rs#L21-L28](https://github.com/akiomik/mado/blob/v0.3.2/src/service/linter.rs#L21-L28)
- Autofix: [command.rs#L16-L32](https://github.com/akiomik/mado/blob/v0.3.2/src/command.rs#L16-L32)
- AST dump: [command.rs#L14-L38](https://github.com/akiomik/mado/blob/v0.3.2/src/command.rs#L14-L38)
- Lint report formats: [output.rs#L10-L16](https://github.com/akiomik/mado/blob/v0.3.2/src/output.rs#L10-L16)
- On nodes: [md001.rs#L43](https://github.com/akiomik/mado/blob/v0.3.2/src/rule/md001.rs#L43)
- With columns: [document.rs#L91-L93](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L91-L93)
- With end positions: [document.rs#L94](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L94)
- On findings, line and column: [violation.rs#L8-L12](https://github.com/akiomik/mado/blob/v0.3.2/src/violation.rs#L8-L12)
- Config file formats: [config.rs#L24-L25](https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L24-L25)
- Reads `.markdownlint.*`: [config.rs#L34-L52](https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L34-L52)
- Per-directory config: [config.rs#L34-L52](https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L34-L52)
- Parser extension API: [document.rs#L40-L44](https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L40-L44)
- Custom rule API: [rule.rs#L52-L91](https://github.com/akiomik/mado/blob/v0.3.2/src/rule.rs#L52-L91)

### remark-lint 10.0.1

[repository](https://github.com/remarkjs/remark-lint/tree/10.0.1) at 10.0.1

- CommonMark spec version: [readme.md#L610-L613](https://github.com/remarkjs/remark-lint/blob/10.0.1/readme.md#L610-L613)
- GFM tables: [index.js#L8](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-table-pipes/index.js#L8)
- GFM task lists: [index.js#L14](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-checkbox-character-style/index.js#L14)
- GFM strikethrough: [index.js#L7-L8](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-strikethrough-marker/index.js#L7-L8)
- GFM extended autolinks: [index.js#L1-L9](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-no-literal-urls/index.js#L1-L9)
- Footnotes: [index.js#L94](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-definition-case/index.js#L94)
- Frontmatter: [index.js#L211-L213](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-no-missing-blank-lines/index.js#L211-L213)
- Math: [index.js#L288](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-maximum-line-length/index.js#L288)
- Other extensions: [test.js#L402-L406](https://github.com/remarkjs/remark-lint/blob/10.0.1/test.js#L402-L406)
- Built-in rule count: [package.json#L126](https://github.com/remarkjs/remark-lint/blob/10.0.1/package.json#L126-L209)
- markdownlint `MD###` ids: [index.js#L83-L86](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-final-newline/index.js#L83-L86)
- Inline disable comments: [index.js#L56-L57](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint/index.js#L56-L57)
- Autofix: [schema.js#L24-L200](https://github.com/unifiedjs/unified-args/blob/11.0.1/lib/schema.js#L24-L200) (unified-args)
- CommonMark back out: [index.js#L27-L40](https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-stringify/lib/index.js#L27-L40) (remark)
- AST dump: [schema.js#L165-L169](https://github.com/unifiedjs/unified-args/blob/11.0.1/lib/schema.js#L165-L169) (unified-args)
- Lint report formats: [log.js#L28-L50](https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/file-set-pipeline/log.js#L28-L50) (unified-engine)
- On nodes: [index.js#L193](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-emphasis-marker/index.js#L193)
- With columns: [index.js#L96](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-final-newline/index.js#L96)
- With end positions: [index.js#L297](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-maximum-line-length/index.js#L297)
- On findings, line and column: [index.js#L378-L381](https://github.com/vfile/vfile-reporter/blob/8.1.1/lib/index.js#L378-L381) (vfile-reporter)
- Config file formats: [configuration.js#L97](https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/configuration.js#L97-L106) (unified-engine)
- Reads `.markdownlint.*`: [cli.js](https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-cli/cli.js) (remark)
- Per-directory config: [find-up.js#L172-L178](https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/find-up.js#L172-L178) (unified-engine)
- Parser extension API: [index.js#L39-L40](https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-parse/lib/index.js#L39-L40) (remark)
- Custom rule API: [index.js#L39](https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/unified-lint-rule/lib/index.js#L39)
- Plugin discovery: [configuration.…#L423](https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/configuration.js#L423-L426) (unified-engine)

### mdmend 1.0.2

[repository](https://github.com/mohitmishra786/mdmend/tree/v1.0.2) at v1.0.2

- CommonMark spec version: [README.md#L327](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/README.md#L327)
- GFM tables: [md055_table_pip…#L93](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md055_table_pipes.go#L93)
- GFM task lists: [rule.go#L27](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L27)
- GFM strikethrough: [md037_emphasis_…#L19](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md037_emphasis_spaces.go#L19)
- GFM extended autolinks: [md034_bare_url.…#L22](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md034_bare_url.go#L22)
- Footnotes: [md066_footnotes…#L55](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md066_footnotes.go#L55)
- Frontmatter: [md024_duplicat…#L190](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md024_duplicate_heading.go#L190-L196)
- Math: [rule.go#L27](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L27)
- Other extensions: [flavor.go#L106](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/flavor.go#L106)
- Built-in rule count: [registry.go#L12](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/registry.go#L12)
- markdownlint `MD###` ids: [registry.go#L12](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/registry.go#L12)
- Inline disable comments: [linter.go#L24](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/linter/linter.go#L24)
- Autofix: [fixer.go#L29](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/fixer/fixer.go#L29)
- Fix shape: [md009_trailing_…#L36](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md009_trailing_spaces.go#L36)
- Dry run or diff: [main.go#L160](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/cmd/mdmend/main.go#L160)
- Lint report formats: [main.go#L106](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/cmd/mdmend/main.go#L106)
- On nodes: [rule.go#L32](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L32)
- With columns: [rule.go#L32](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L32)
- With end positions: [rule.go#L5](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L5)
- On findings, line and column: [rule.go#L5-L12](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L5-L12)
- Config file formats: [config.go#L14](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/config.go#L14)
- Reads `.markdownlint.*`: [markdownlint.go#L20](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/markdownlint.go#L20)
- Per-directory config: [config.go#L10](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/config.go#L10)
- Custom rule API: [rules.go#L55](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/pkg/mdmend/rules.go#L55)
- Plugin discovery: [rules.go#L55](https://github.com/mohitmishra786/mdmend/blob/v1.0.2/pkg/mdmend/rules.go#L55)

### Vale 3.25.1

[repository](https://github.com/vale-cli/vale/tree/v3.25.1) at v3.25.1

- CommonMark spec version: [md.go#L20-L31](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L20-L31)
- GFM tables: [md.go#L22](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22)
- GFM task lists: [md.go#L22](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22)
- GFM strikethrough: [md.go#L22](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22)
- GFM extended autolinks: [md.go#L22](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22)
- Footnotes: [md.go#L23](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L23)
- Frontmatter: [metadata.go#L15-L48](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/metadata.go#L15-L48)
- Math: [math.go#L14-L24](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/math.go#L14-L24)
- Other extensions: [lint.go#L334-L345](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/lint.go#L334-L345)
- Built-in rule count: [definition.go#L133](https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L133-L185)
- markdownlint `MD###` ids: [definition.go#L136](https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L136)
- Inline disable comments: [file.go#L747-L780](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/file.go#L747-L780)
- Autofix: [apply.go#L41-L47](https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/apply.go#L41-L47)
- Fix shape: [apply.go#L172-L185](https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/apply.go#L172-L185)
- Dry run or diff: [command.go#L120-L148](https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/command.go#L120-L148)
- AST dump: [command.go#L58-L116](https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/command.go#L58-L116)
- Lint report formats: [common.go#L14-L21](https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/common.go#L14-L21)
- On nodes: [alert.go#L20-L41](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L20-L41)
- With columns: [alert.go#L24](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L24)
- With end positions: [alert.go#L24](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L24)
- On findings, line and column: [alert.go#L20-L41](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L20-L41)
- Config file formats: [config.go#L74-L87](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/config.go#L74-L87)
- Reads `.markdownlint.*`: [config.go#L74-L87](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/config.go#L74-L87)
- Per-directory config: [source.go#L180-L205](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/source.go#L180-L205)
- Parser extension API: [md.go#L20-L31](https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L20-L31)
- Custom rule API: [definition.go#L119](https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L119-L132)
- Plugin discovery: [ini.go#L26-L28](https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/ini.go#L26-L28)

### contextlint 1.1.1

[repository](https://github.com/nozomi-koborinai/contextlint/tree/v1.1.1) at v1.1.1

- CommonMark spec version: [parser.ts#L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81)
- GFM tables: [parser.ts#L97](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L97)
- GFM task lists: [parser.ts#L129](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L129)
- GFM strikethrough: [parser.ts#L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81)
- GFM extended autolinks: [parser.ts#L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81)
- Footnotes: [parser.ts#L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81)
- Frontmatter: [parser.ts#L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81)
- Math: [package.json#L30-L37](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/package.json#L30-L37)
- Other extensions: [package.json#L30-L37](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/package.json#L30-L37)
- Built-in rule count: [registry.ts#L36-L56](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/registry.ts#L36-L56)
- markdownlint `MD###` ids: [tbl-001.ts#L17](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rules/tbl-001.ts#L17)
- Inline disable comments: [rule.ts#L40-L62](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rule.ts#L40-L62)
- Autofix: [code-actions.ts#L16](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/lsp-server/src/code-actions.ts#L16-L32)
- Fix shape: [code-actions.ts#L60](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/lsp-server/src/code-actions.ts#L60-L66)
- Dry run or diff: [index.ts#L64-L67](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/index.ts#L64-L67)
- AST dump: [index.ts#L61-L75](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/index.ts#L61-L75)
- Lint report formats: [shared.ts#L24-L31](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/commands/shared.ts#L24-L31)
- On nodes: [parser.ts#L93](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L93)
- With columns: [parser.ts#L18-L51](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L18-L51)
- With end positions: [parser.ts#L18-L51](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L18-L51)
- On findings, line and column: [rule.ts#L5-L17](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rule.ts#L5-L17)
- Config file formats: [config.ts#L5](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L5)
- Reads `.markdownlint.*`: [config.ts#L5](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L5)
- Per-directory config: [config.ts#L39-L48](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L39-L48)
- Parser extension API: [parser.ts#L80-L81](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L80-L81)
- Custom rule API: [index.ts#L12-L19](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/index.ts#L12-L19)
- Plugin discovery: [registry.ts#L61-L68](https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/registry.ts#L61-L68)


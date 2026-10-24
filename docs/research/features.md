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
| Group         | Feature                      | cmark 0.31.2      | cmark-gfm 0.29.0.gfm.13 | commonmark.js 0.31.2 | commonmark-java 0.31.0 | comrak 0.57.0      | commonmarker 2.10.1 | markd 0.6.0        | goldmark 2.1.8     | pulldown-cmark 0.13.0 | md4c 0.6.0     | markdownlint-cli2 0.24.0  | rumdl 0.3.0                     | mdl 0.18.1       | pymarkdownlnt 0.9.41  | quickmark 1.1.0 | gomarklint 3.3.2 | goldmark-lint 0.6.0             | mdsmith 0.57.0   | mado 0.3.2     | remark-lint 10.0.1  | mdmend 1.0.2         | Vale 3.25.1       | contextlint 1.1.1 |
|---------------|------------------------------|-------------------|-------------------------|----------------------|------------------------|--------------------|---------------------|--------------------|--------------------|-----------------------|----------------|---------------------------|---------------------------------|------------------|-----------------------|-----------------|------------------|---------------------------------|------------------|----------------|---------------------|----------------------|-------------------|-------------------|
| Dialects      | CommonMark spec version      | yes, 0.31.2       | yes, GFM 0.29           | yes, 0.31.2          | yes, 0.31.2            | yes, 0.31.2        | yes, GFM 0.29       | yes, 0.29          | yes, 0.31.2        | yes, 0.31.2           | yes, 0.31.2    | readme                    | yes, 0.31.2                     | no               | readme, 0.29.2        | readme          | no               | readme                          | no               | readme         | readme              | readme               | no                | no                |
| Dialects      | GFM tables                   | no                | yes                     | no                   | yes                    | yes                | yes                 | yes                | yes                | yes                   | yes            | yes                       | yes                             | yes              | yes                   | yes             | no               | yes                             | yes              | yes            | yes, plugin         | yes                  | yes               | yes               |
| Dialects      | GFM task lists               | no                | yes                     | no                   | yes                    | yes                | yes                 | yes                | yes                | yes                   | yes            | no                        | yes                             | no               | yes                   | yes             | no               | yes                             | yes              | no             | yes, plugin         | no                   | yes               | yes               |
| Dialects      | GFM strikethrough            | no                | yes                     | no                   | yes                    | yes                | yes                 | yes                | yes                | yes                   | yes            | no                        | yes                             | no               | yes                   | no              | no               | yes                             | yes              | no             | yes, plugin         | no                   | yes               | yes               |
| Dialects      | GFM extended autolinks       | no                | yes                     | no                   | yes                    | yes                | yes                 | yes                | yes                | no                    | yes            | yes                       | no                              | no               | yes                   | no              | no               | no                              | no               | no             | yes, plugin         | no                   | yes               | yes               |
| Dialects      | Footnotes                    | no                | yes                     | no                   | yes                    | yes                | yes                 | no                 | yes                | yes                   | yes            | yes                       | yes                             | yes              | no                    | no              | no               | yes                             | yes              | no             | yes, plugin         | yes                  | yes               | yes               |
| Dialects      | Frontmatter                  | no                | no                      | no                   | yes, parsed            | yes, skipped       | yes, skipped        | no                 | no                 | yes, skipped          | no             | yes, skipped              | yes, skipped                    | yes, skipped     | yes, parsed           | yes, skipped    | yes, skipped     | yes, skipped                    | yes, parsed      | yes, skipped   | yes, plugin         | yes, two rules       | yes, parsed       | no                |
| Dialects      | Math                         | no                | no                      | no                   | no                     | yes                | yes                 | no                 | no                 | yes                   | yes            | yes                       | yes                             | yes              | no                    | no              | no               | no                              | yes              | no             | yes, plugin         | no                   | yes               | no                |
| Dialects      | Other extensions             | yes, smart quotes | yes, tagfilter          | yes, smart quotes    | yes, 4 modules         | yes, many          | yes, many           | yes, alerts, emoji | yes, deflists, ids | yes, many             | yes, many      | yes, directives           | yes, many                       | yes, kramdown    | yes, tagfilter        | no              | no               | no                              | yes, many        | no             | yes, plugins        | no                   | yes, MDX, MyST    | no                |
| Rules         | Built-in rule count          | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes, 53                   | yes, 89                         | yes, 39          | yes, 57               | yes, 52         | yes, 23          | yes, 53                         | yes, 74          | yes, 38        | yes, 80             | yes, 57              | yes, 4            | yes, 21           |
| Rules         | markdownlint `MD###` ids     | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes, partial                    | yes              | yes, partial          | yes             | no               | yes                             | no               | yes, partial   | no                  | yes                  | no                | no                |
| Rules         | Inline disable comments      | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes, markdownlint               | no               | yes, own              | no              | yes, own         | yes, markdownlint               | no               | no             | yes, own            | no                   | yes, own          | no                |
| Fixing        | Autofix                      | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes                             | yes              | yes                   | no              | no               | yes                             | yes              | no             | no                  | yes                  | yes               | yes, LSP only     |
| Fixing        | Fix shape                    | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes, patch                | yes, patch                      | yes, patch       | yes, both             | n/a             | n/a              | yes, patch                      | yes, patch       | n/a            | n/a                 | yes, patch           | yes, patch        | yes, patch        |
| Fixing        | Dry run or diff              | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | no                        | yes                             | no               | no                    | n/a             | n/a              | yes                             | yes              | n/a            | n/a                 | yes                  | yes               | no                |
| Output        | HTML                         | yes               | yes                     | yes                  | yes                    | yes                | yes                 | yes                | yes                | yes                   | yes            | n/a                       | n/a                             | n/a              | yes, internal         | n/a             | n/a              | n/a                             | yes, library     | n/a            | n/a                 | n/a                  | n/a               | n/a               |
| Output        | CommonMark back out          | yes               | yes                     | no                   | yes                    | yes                | yes                 | no                 | no                 | no                    | no             | n/a                       | n/a                             | n/a              | yes, internal         | n/a             | n/a              | n/a                             | n/a              | n/a            | yes, plugin         | n/a                  | n/a               | n/a               |
| Output        | AST dump                     | yes, XML          | yes, XML                | yes, XML             | no                     | yes, XML           | yes, inspect        | no                 | yes                | yes, events           | no             | yes, API                  | no                              | no               | no                    | no              | no               | no                              | yes, API         | no             | yes, JSON           | n/a                  | no                | no                |
| Output        | Other renderers              | yes, man, LaTeX   | yes, man, LaTeX, text   | no                   | yes, text              | no                 | no                  | no                 | no                 | no                    | no             | n/a                       | n/a                             | n/a              | n/a                   | n/a             | n/a              | n/a                             | n/a              | n/a            | n/a                 | n/a                  | n/a               | n/a               |
| Output        | Lint report formats          | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes, JSON, SARIF, JUnit   | yes, JSON, SARIF, JUnit, GitHub | yes, JSON, SARIF | yes, text only        | yes, text only  | yes, JSON        | yes, JSON, SARIF, JUnit, GitHub | yes, JSON, SARIF | yes, text only | yes, text only      | yes, JSON, SARIF     | yes, JSON         | yes, JSON         |
| Positions     | On nodes                     | yes               | yes                     | yes, blocks only     | yes                    | yes                | yes                 | yes, blocks only   | yes, offset        | yes, offset           | no             | yes                       | yes                             | yes              | yes                   | yes             | no               | yes                             | yes              | yes            | yes                 | no                   | yes               | yes               |
| Positions     | With columns                 | yes               | yes                     | yes, blocks only     | yes                    | yes                | yes                 | yes, blocks only   | yes, offset        | yes, offset           | no             | yes                       | yes                             | no               | yes                   | yes             | no               | yes, offset                     | yes, offset      | yes            | yes                 | no                   | yes               | no                |
| Positions     | With end positions           | yes               | yes                     | yes, blocks only     | yes, as length         | yes                | yes                 | yes, blocks only   | yes, offset        | yes, offset           | no             | yes                       | yes                             | no               | no                    | yes             | no               | yes, offset                     | yes, offset      | yes            | yes                 | no                   | yes, same line    | no                |
| Positions     | On findings, line and column | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes, if ranged            | yes                             | no, line only    | yes                   | yes             | no, line only    | yes                             | yes              | yes            | yes                 | yes, mostly column 1 | yes               | no, line only     |
| Configuration | Config file formats          | n/a, code only    | n/a, code only          | n/a, code only       | n/a, code only         | yes, CLI args file | n/a, code only      | n/a, code only     | n/a, code only     | n/a, code only        | n/a, code only | yes, JSON, YAML, TOML, JS | yes, TOML                       | yes, Ruby DSL    | yes, JSON, YAML, TOML | yes, TOML       | yes, JSON        | yes, JSON, YAML                 | yes, YAML        | yes, TOML      | yes, JSON, YAML, JS | yes, YAML, JSON      | yes, INI          | yes, JSON         |
| Configuration | Reads `.markdownlint.*`      | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes                             | no               | no                    | no              | no               | yes                             | no, import only  | no             | no                  | yes, JSON only       | no                | no                |
| Configuration | Per-directory config         | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes                             | no               | no                    | yes             | no               | no                              | no               | no             | yes                 | no                   | no                | no                |
| Plugins       | Parser extension API         | no                | yes                     | no                   | yes                    | no                 | no                  | no                 | yes                | no                    | no             | yes, markdown-it only     | no                              | no               | no                    | no              | n/a              | no                              | yes              | no             | yes                 | n/a                  | no                | no                |
| Plugins       | Custom rule API              | n/a               | n/a                     | n/a                  | n/a                    | n/a                | n/a                 | n/a                | n/a                | n/a                   | n/a            | yes                       | yes, library                    | yes              | yes                   | no              | no               | yes, library                    | no               | no             | yes                 | yes, library         | yes               | yes, library      |
| Plugins       | Plugin discovery             | n/a               | yes, by name            | n/a                  | no, code only          | no, code only      | no, code only       | no, code only      | no, code only      | no, code only         | n/a            | yes, name or path         | no, code only                   | yes, path        | yes, path             | n/a             | n/a              | no, code only                   | no, code only    | n/a            | yes, name or path   | no, code only        | yes, name or path | no                |

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

### First release

1. **CommonMark 0.31.2, the whole spec suite.** cmark, commonmark.js, commonmark-java, comrak, pulldown-cmark and md4c all run 0.31.2's tests, and goldmark claims it; the parsers still on 0.29 are the ones a reader has to correct for.
2. **The HTML renderer.** Every parser column has one, and the spec's test runner compares HTML, so conformance cannot be shown without it.
3. **Start and end line and column on every node, inline nodes included.** cmark, cmark-gfm, comrak and commonmarker have all of it. commonmark.js and markd stop at blocks, goldmark and pulldown-cmark keep byte offsets with no lines or columns, and md4c nothing. Findings with a column and later patch fixes both need it, and it cannot be retrofitted cheaply.
4. **Findings with line and column, as text and JSON.** Every linter but mdl, gomarklint and contextlint reports a column, markdownlint-cli2 when the rule gives a range, and JSON is the format every tool past a text-only report offers.
5. **Frontmatter recognised and skipped, with its lines kept for rules.** Every linter but contextlint recognises it; markdownlint hands the lines to rules as `frontMatterLines`, which is how a rule can check frontmatter without a YAML parser.
6. **Built-in rules under markdownlint's `MD###` ids, starting with those that need no extension.** markdownlint-cli2, mdl, quickmark, goldmark-lint and mdmend use the ids, rumdl, pymarkdownlnt and mado use them in part, and only gomarklint, mdsmith and remark-lint, among the Markdown linters, have schemes of their own. The ids are what lets a project switch without rewriting its config and comments. #3 asks whether the rule set follows these ids; this list says yes for the first release, and #3's ADR decides how.
7. **Inline disable comments in markdownlint's syntax.** markdownlint-cli2, rumdl and goldmark-lint read `<!-- markdownlint-disable -->`; the linters with a syntax of their own make every existing comment dead on arrival.
8. **Reading .markdownlint.json, .jsonc, .yaml and .yml.** markdownlint-cli2, rumdl and goldmark-lint read them, and mdmend reads the JSON one. #3 asks the same question as for the ids, and the same answer holds.
9. **An AST dump.** cmark, cmark-gfm, commonmark.js and comrak print XML, goldmark and commonmarker pretty-print, remark-cli prints JSON. A rule author needs to see the tree a rule walks, and #2's harness already compared parsers by printing it.

### Later

1. **GFM: tables, task lists, strikethrough, extended autolinks and footnotes.** cmark-gfm, commonmark-java, comrak, commonmarker, goldmark and md4c parse all five, and every Markdown linter with a parser has tables. A table read as plain CommonMark lints as paragraphs, so this is the first feature after the first release, and it arrives through the extension API rather than in the core.
2. **Autofix as patches, with a dry run or diff.** Every fixing linter here patches, with pymarkdownlnt's token fixes and a few rumdl rules the only ones that rewrite the whole document; rumdl, goldmark-lint, mdsmith and mdmend show fixes without writing them. It waits on the positions of the first release.
3. **A custom rule API, loaded by name or path from config.** markdownlint-cli2, mdl, pymarkdownlnt, remark-lint and Vale load rules from config; rumdl, goldmark-lint, mdmend and contextlint take them only through their libraries, and the rest take none. #3's extensibility ADR, with skills-guru's rules as its test case, decides the shape.
4. **A public parser extension API.** cmark-gfm, commonmark-java, goldmark, mdsmith and remark have one, and markdownlint-cli2 has one for the markdown-it parser its custom rules can use; the other parsers add syntax only by changing their own code. GFM goes through it first, before it is published.
5. **Per-directory config.** markdownlint-cli2, rumdl, quickmark and remark-lint apply a config to its subtree.
6. **SARIF, JUnit and GitHub annotation reports.** markdownlint-cli2, rumdl and goldmark-lint have most of them, and mdl, mdsmith and mdmend have SARIF.
7. **Math and GitHub alerts**, through the extension API. comrak, commonmarker, pulldown-cmark, md4c, markdownlint-cli2, rumdl, mdl, mdsmith and Vale parse math; comrak, commonmark-java, markd, pulldown-cmark and rumdl parse alerts.
8. **Frontmatter parsed as YAML for rules that check its keys.** pymarkdownlnt, mdsmith, Vale and commonmark-java parse it; rumdl checks key order without building a tree.

### Never

1. **Renderers other than HTML.** cmark and cmark-gfm render man and LaTeX, cmark-gfm and commonmark-java plain text. HTML is in scope for conformance; other formats are a converter's job, and no linter here offers one.
2. **Fixes that re-render the document, and a Markdown writer to make them.** A re-rendered fix rewrites lines the author did not ask about, which is why the fixing linters here patch instead, bar pymarkdownlnt's token fixes and a few rumdl rules; a patch needs the positions, not a writer. remark's `--output` and the CommonMark renderers of cmark, comrak and commonmarker serve formatting, which is a formatter's job.
3. **Rule ids and config formats of its own, or config written as code.** mdsmith's `MDS###`, mdl's Ruby `.mdlrc` and markdownlint-cli2's .cjs and .mjs files each keep a project from moving between tools; config stays data that other tools and editors can read.
4. **Prose rules and cross-file reference checks.** They are Vale's and contextlint's jobs, and both run beside a Markdown linter rather than inside one.
5. **The long tail of extensions in the core**: wikilinks, definition lists, attributes, emoji, spoilers, highlight and the like. Each is in a minority of the parsers and in almost none of the linters' enabled sets; the extension API is the place for them, written by whoever needs one.

## Sources

Each tool links its tree at the tag, then one line per row that is not `n/a`, citing the file and line that decided the cell.

### cmark 0.31.2

https://github.com/commonmark/cmark/tree/0.31.2

- CommonMark spec version: https://github.com/commonmark/cmark/blob/0.31.2/test/spec.txt#L4
- GFM tables: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66
- GFM task lists: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66
- GFM strikethrough: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66
- GFM extended autolinks: https://github.com/commonmark/cmark/blob/0.31.2/src/inlines.c
- Footnotes: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66
- Frontmatter: https://github.com/commonmark/cmark/blob/0.31.2/src/blocks.c
- Math: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L36-L66
- Other extensions: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h#L642
- HTML: https://github.com/commonmark/cmark/blob/0.31.2/src/html.c#L329
- CommonMark back out: https://github.com/commonmark/cmark/blob/0.31.2/src/commonmark.c#L466
- AST dump: https://github.com/commonmark/cmark/blob/0.31.2/src/xml.c#L209
- Other renderers: https://github.com/commonmark/cmark/blob/0.31.2/src/man.c#L279
- On nodes: https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L70
- With columns: https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L71
- With end positions: https://github.com/commonmark/cmark/blob/0.31.2/src/node.h#L72-L73
- Parser extension API: https://github.com/commonmark/cmark/blob/0.31.2/src/cmark.h

### cmark-gfm 0.29.0.gfm.13

https://github.com/github/cmark-gfm/tree/0.29.0.gfm.13

- CommonMark spec version: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/test/spec.txt#L1-L3
- GFM tables: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/table.c#L853
- GFM task lists: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/tasklist.c#L143
- GFM strikethrough: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/strikethrough.c#L144
- GFM extended autolinks: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/autolink.c#L495
- Footnotes: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/cmark-gfm.h#L753-L755
- Frontmatter: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/blocks.c
- Math: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/core-extensions.c#L11-L19
- Other extensions: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/extensions/tagfilter.c#L56
- HTML: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/html.c#L472
- CommonMark back out: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/commonmark.c#L507
- AST dump: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/xml.c#L162
- Other renderers: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/main.c#L48-L50
- On nodes: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L75
- With columns: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L76
- With end positions: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/node.h#L77-L78
- Parser extension API: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/cmark-gfm-extension_api.h#L275
- Plugin discovery: https://github.com/github/cmark-gfm/blob/0.29.0.gfm.13/src/registry.c#L54

### commonmark.js 0.31.2

https://github.com/commonmark/commonmark.js/tree/0.31.2

- CommonMark spec version: https://github.com/commonmark/commonmark.js/blob/0.31.2/test/spec.txt#L4
- GFM tables: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15
- GFM task lists: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15
- GFM strikethrough: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js
- GFM extended autolinks: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js
- Footnotes: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/node.js#L1-L30
- Frontmatter: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js
- Math: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js
- Other extensions: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js#L786
- HTML: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/render/html.js#L34
- CommonMark back out: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15
- AST dump: https://github.com/commonmark/commonmark.js/blob/0.31.2/bin/commonmark#L70
- Other renderers: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/render/xml.js#L12
- On nodes: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/node.js#L69-L76
- With columns: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js#L104-L107, https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/inlines.js#L93
- With end positions: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/blocks.js#L906
- Parser extension API: https://github.com/commonmark/commonmark.js/blob/0.31.2/lib/index.js#L11-L15

### commonmark-java 0.31.0

https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0

- CommonMark spec version: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-test-util/src/main/resources/spec.txt#L4
- GFM tables: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-gfm-tables/src/main/java/org/commonmark/ext/gfm/tables/TablesExtension.java#L44
- GFM task lists: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-task-list-items/src/main/java/org/commonmark/ext/task/list/items/TaskListItemsExtension.java#L31
- GFM strikethrough: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-gfm-strikethrough/src/main/java/org/commonmark/ext/gfm/strikethrough/StrikethroughExtension.java#L61
- GFM extended autolinks: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-autolink/src/main/java/org/commonmark/ext/autolink/AutolinkExtension.java#L30
- Footnotes: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-footnotes/src/main/java/org/commonmark/ext/footnotes/FootnotesExtension.java#L52
- Frontmatter: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark-ext-yaml-front-matter/src/main/java/org/commonmark/ext/front/matter/YamlFrontMatterExtension.java#L53
- Math: https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0
- Other extensions: https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-gfm-alerts, https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-heading-anchor, https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-image-attributes, https://github.com/commonmark/commonmark-java/tree/commonmark-parent-0.31.0/commonmark-ext-ins
- HTML: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/html/HtmlRenderer.java#L20
- CommonMark back out: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/markdown/MarkdownRenderer.java#L28
- AST dump: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/Node.java#L154
- Other renderers: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/renderer/text/TextContentRenderer.java#L11
- On nodes: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L30
- With columns: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L32-L35
- With end positions: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/node/SourceSpan.java#L95
- Parser extension API: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/parser/Parser.java#L296
- Plugin discovery: https://github.com/commonmark/commonmark-java/blob/commonmark-parent-0.31.0/commonmark/src/main/java/org/commonmark/parser/Parser.java#L169

### comrak 0.57.0

https://github.com/kivikakk/comrak/tree/v0.57.0

- CommonMark spec version: https://github.com/kivikakk/comrak/blob/v0.57.0/script/cibuild#L20, https://github.com/kivikakk/comrak/blob/v0.57.0/README.md#L12
- GFM tables: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L59
- GFM task lists: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L91
- GFM strikethrough: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L45
- GFM extended autolinks: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L72
- Footnotes: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L151
- Frontmatter: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L239
- Math: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L304
- Other extensions: https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L193-L225
- HTML: https://github.com/kivikakk/comrak/blob/v0.57.0/src/lib.rs#L93
- CommonMark back out: https://github.com/kivikakk/comrak/blob/v0.57.0/src/lib.rs#L89
- AST dump: https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L183-L190
- Other renderers: https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L183-L190
- On nodes: https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L845
- With columns: https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L945-L951
- With end positions: https://github.com/kivikakk/comrak/blob/v0.57.0/src/nodes.rs#L891-L896
- Config file formats: https://github.com/kivikakk/comrak/blob/v0.57.0/src/main.rs#L259-L286
- Parser extension API: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L1419-L1476
- Plugin discovery: https://github.com/kivikakk/comrak/blob/v0.57.0/src/parser/options.rs#L1419-L1476

### commonmarker 2.10.1

https://github.com/gjtorikian/commonmarker/tree/v2.10.1

- CommonMark spec version: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/test/fixtures/upstream/spec.txt#L1-L4
- GFM tables: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L158
- GFM task lists: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L164
- GFM strikethrough: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L155
- GFM extended autolinks: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L161
- Footnotes: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L176
- Frontmatter: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L185-L194
- Math: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs#L195
- Other extensions: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/config.rb#L34-L63
- HTML: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker.rb#L33-L43
- CommonMark back out: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/node.rb#L81-L90
- AST dump: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/node/inspect.rb#L9-L56
- Other renderers: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L1336-L1341
- On nodes: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L706-L719
- With columns: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L710-L714
- With end positions: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/node.rs#L715-L716
- Parser extension API: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/ext/commonmarker/src/options.rs, https://github.com/gjtorikian/commonmarker/tree/v2.10.1/ext/commonmarker/src/plugins
- Plugin discovery: https://github.com/gjtorikian/commonmarker/blob/v2.10.1/lib/commonmarker/config.rb#L67-L72

### markd 0.6.0

https://github.com/icyleaf/markd/tree/v0.6.0

- CommonMark spec version: https://github.com/icyleaf/markd/blob/v0.6.0/spec/fixtures/spec.txt#L1-L5, https://github.com/icyleaf/markd/blob/v0.6.0/spec/markd_spec.cr#L3-L4
- GFM tables: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rules/table.cr#L9
- GFM task lists: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rules/list.cr#L85-L93
- GFM strikethrough: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/inline.cr#L46-L47
- GFM extended autolinks: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/options.cr#L72-L75
- Footnotes: https://github.com/icyleaf/markd/blob/v0.6.0/spec/fixtures/gfm-extensions.txt#L705-L707
- Frontmatter: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21
- Math: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/options.cr#L1-L96
- Other extensions: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/rule.cr#L108
- HTML: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd.cr#L10-L33
- CommonMark back out: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/renderers/html_renderer.cr#L1-L5
- AST dump: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/node.cr#L134-L146
- Other renderers: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/renderer.cr#L1-L70
- On nodes: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/node.cr#L63
- With columns: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L243-L245
- With end positions: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L213-L216
- Parser extension API: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21
- Plugin discovery: https://github.com/icyleaf/markd/blob/v0.6.0/src/markd/parsers/block.cr#L9-L21

### goldmark 2.1.8

https://github.com/yuin/goldmark/tree/v2.1.8

- CommonMark spec version: https://github.com/yuin/goldmark/blob/v2.1.8/commonmark_test.go#L23-L25
- GFM tables: https://github.com/yuin/goldmark/blob/v2.1.8/extension/table.go#L512
- GFM task lists: https://github.com/yuin/goldmark/blob/v2.1.8/extension/tasklist.go#L246
- GFM strikethrough: https://github.com/yuin/goldmark/blob/v2.1.8/extension/strikethrough.go#L127
- GFM extended autolinks: https://github.com/yuin/goldmark/blob/v2.1.8/extension/linkify.go#L228
- Footnotes: https://github.com/yuin/goldmark/blob/v2.1.8/extension/footnote.go#L722
- Frontmatter: https://github.com/yuin/goldmark/blob/v2.1.8/extension/package.go#L1-L2
- Math: https://github.com/yuin/goldmark/blob/v2.1.8/extension/package.go#L1-L2
- Other extensions: https://github.com/yuin/goldmark/blob/v2.1.8/extension/definition_list.go#L250
- HTML: https://github.com/yuin/goldmark/blob/v2.1.8/renderer/html/html.go#L237
- CommonMark back out: https://github.com/yuin/goldmark/blob/v2.1.8/renderer/renderer.go#L1-L60
- AST dump: https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L541
- Other renderers: https://github.com/yuin/goldmark/blob/v2.1.8/renderer/renderer.go#L171-L172
- On nodes: https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L48-L50
- With columns: https://github.com/yuin/goldmark/blob/v2.1.8/ast/ast.go#L48-L50, https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L653-L660
- With end positions: https://github.com/yuin/goldmark/blob/v2.1.8/ast/block.go#L43-L48, https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L14-L17, https://github.com/yuin/goldmark/blob/v2.1.8/text/value.go#L653-L660
- Parser extension API: https://github.com/yuin/goldmark/blob/v2.1.8/parser/parser.go#L701-L776
- Plugin discovery: https://github.com/yuin/goldmark/blob/v2.1.8/parser/parser.go#L619

### pulldown-cmark 0.13.0

https://github.com/pulldown-cmark/pulldown-cmark/tree/v0.13.0

- CommonMark spec version: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/third_party/CommonMark/spec.txt#L1-L6
- GFM tables: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L651
- GFM task lists: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L670
- GFM strikethrough: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L669
- GFM extended autolinks: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L645-L737
- Footnotes: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L668
- Frontmatter: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L691-L695
- Math: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L718
- Other extensions: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L678-L735
- HTML: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/html.rs#L1-L40
- CommonMark back out: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L84-L86
- AST dump: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/main.rs#L45-L58
- Other renderers: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/Cargo.toml#L53-L84
- On nodes: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2161-L2171
- With columns: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2167-L2168
- With end positions: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L2185-L2187
- Parser extension API: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/guide/src/dev/extensions.md#L1-L22
- Plugin discovery: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/parse.rs#L266

### md4c 0.6.0

https://github.com/mity/md4c/tree/v0.6.0

- CommonMark spec version: https://github.com/mity/md4c/blob/v0.6.0/test/spec.txt#L4
- GFM tables: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L393
- GFM task lists: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L396
- GFM strikethrough: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L394
- GFM extended autolinks: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L388-L395
- Footnotes: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L405
- Frontmatter: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h
- Math: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L397
- Other extensions: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L386-L408
- HTML: https://github.com/mity/md4c/blob/v0.6.0/src/md4c-html.c#L618
- CommonMark back out: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L427-L470
- AST dump: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458
- Other renderers: https://github.com/mity/md4c/blob/v0.6.0/md2html/md2html.c#L242
- On nodes: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458
- With columns: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L312
- With end positions: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L451-L458
- Parser extension API: https://github.com/mity/md4c/blob/v0.6.0/src/md4c.h#L427-L470

### markdownlint-cli2 0.24.0

https://github.com/DavidAnson/markdownlint-cli2/tree/v0.24.0

- CommonMark spec version: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/README.md#L28
- GFM tables: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L72
- GFM task lists: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L68-L74
- GFM strikethrough: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L68-L74
- GFM extended autolinks: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L70
- Footnotes: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L71
- Frontmatter: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L124-L142
- Math: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L73
- Other extensions: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/micromark-parse.mjs#L25-L34
- Built-in rule count: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/rules.mjs#L59-L116
- markdownlint `MD###` ids: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/md001.mjs#L9
- Inline disable comments: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/helpers/helpers.cjs#L27, https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L353-L373
- Autofix: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L984-L985
- Fix shape: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L1206-L1215
- Dry run or diff: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L248-L283
- AST dump: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L485-L489
- Lint report formats: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-json/markdownlint-cli2-formatter-json.js, https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-sarif/markdownlint-cli2-formatter-sarif.js, https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/formatter-junit/markdownlint-cli2-formatter-junit.js
- On nodes: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L268-L275
- With columns: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L272-L275
- With end positions: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L276-L283
- On findings, line and column: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.d.mts#L674-L680
- Config file formats: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L173-L174
- Reads `.markdownlint.*`: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L315-L320
- Per-directory config: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L661-L685
- Parser extension API: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L755-L762
- Custom rule API: https://github.com/DavidAnson/markdownlint/blob/v0.42.0/lib/markdownlint.mjs#L22
- Plugin discovery: https://github.com/DavidAnson/markdownlint-cli2/blob/v0.24.0/markdownlint-cli2.mjs#L600-L609

### rumdl 0.3.0

https://github.com/rvben/rumdl/tree/v0.3.0

- CommonMark spec version: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.4/pulldown-cmark/third_party/CommonMark/spec.txt#L1-L6
- GFM tables: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L15
- GFM task lists: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L18
- GFM strikethrough: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L17
- GFM extended autolinks: https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.4/pulldown-cmark/src/lib.rs#L646-L735
- Footnotes: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L16
- Frontmatter: https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/front_matter_utils.rs#L202
- Math: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L21
- Other extensions: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L19-L26, https://github.com/pulldown-cmark/pulldown-cmark/blob/v0.13.0/pulldown-cmark/src/lib.rs#L719-L722
- Built-in rule count: https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/mod.rs#L218
- markdownlint `MD###` ids: https://github.com/rvben/rumdl/blob/v0.3.0/src/rules/mod.rs#L220
- Inline disable comments: https://github.com/rvben/rumdl/blob/v0.3.0/src/inline_config.rs#L6
- Autofix: https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L158
- Fix shape: https://github.com/rvben/rumdl/blob/v0.3.0/src/rule.rs#L79
- Dry run or diff: https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L164
- AST dump: https://github.com/rvben/rumdl/blob/v0.3.0/src/main.rs#L109
- Lint report formats: https://github.com/rvben/rumdl/blob/v0.3.0/src/cli_types.rs#L444
- On nodes: https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L7
- With columns: https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L257
- With end positions: https://github.com/rvben/rumdl/blob/v0.3.0/src/lint_context/types.rs#L253
- On findings, line and column: https://github.com/rvben/rumdl/blob/v0.3.0/src/rule.rs#L38
- Config file formats: https://github.com/rvben/rumdl/blob/v0.3.0/src/config/types.rs#L818
- Reads `.markdownlint.*`: https://github.com/rvben/rumdl/blob/v0.3.0/src/config/types.rs#L825
- Per-directory config: https://github.com/rvben/rumdl/blob/v0.3.0/src/config/loading.rs#L1769
- Parser extension API: https://github.com/rvben/rumdl/blob/v0.3.0/src/utils/parser_options.rs#L13
- Custom rule API: https://github.com/rvben/rumdl/blob/v0.3.0/src/rule.rs#L206
- Plugin discovery: https://github.com/rvben/rumdl/blob/v0.3.0/src/lib.rs#L265

### mdl 0.18.1

https://github.com/markdownlint/markdownlint/tree/v0.18.1

- CommonMark spec version: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9
- GFM tables: https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81
- GFM task lists: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9, https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81
- GFM strikethrough: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9, https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L81
- GFM extended autolinks: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9, https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L79-L81
- Footnotes: https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L77
- Frontmatter: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L30
- Math: https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L80
- Other extensions: https://github.com/gettalong/kramdown/blob/REL_2_5_2/lib/kramdown/parser/kramdown.rb#L75-L78
- Built-in rule count: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L16
- markdownlint `MD###` ids: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L16
- Inline disable comments: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L718
- Autofix: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L123
- Fix shape: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/rules.rb#L194
- Dry run or diff: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L123
- AST dump: https://github.com/markdownlint/markdownlint/blob/v0.18.1/tools/view_markdown.rb#L7
- Lint report formats: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L129
- On nodes: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L130
- With columns: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/doc.rb#L130
- With end positions: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/formatters/sarif.rb#L78
- On findings, line and column: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl.rb#L129
- Config file formats: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L155-L158
- Reads `.markdownlint.*`: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L9
- Per-directory config: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L198
- Parser extension API: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/kramdown_parser.rb#L9
- Custom rule API: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/ruleset.rb#L9-L12
- Plugin discovery: https://github.com/markdownlint/markdownlint/blob/v0.18.1/lib/mdl/cli.rb#L93

### pymarkdownlnt 0.9.41

https://github.com/jackdewinter/pymarkdown/tree/v0.9.41

- CommonMark spec version: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/docs/old_README.md#L46
- GFM tables: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/markdown_tables.py#L22
- GFM task lists: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/task_list_items.py#L33
- GFM strikethrough: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/markdown_strikethrough.py#L22
- GFM extended autolinks: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/extended_autolinks.py#L46
- Footnotes: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78
- Frontmatter: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/front_matter_extension.py#L185
- Math: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78
- Other extensions: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78
- Built-in rule count: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugins/rule_md_001.py#L42
- markdownlint `MD###` ids: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugins/rule_md_051.py#L102
- Inline disable comments: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extensions/pragma_token.py#L205
- Autofix: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/file_scan_helper.py#L1264
- Fix shape: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/file_scan_helper.py#L1092
- Dry run or diff: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/main.py#L124
- HTML: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/transform_gfm/transform_to_gfm.py#L21
- CommonMark back out: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/transform_markdown/transform_to_markdown.py#L53
- AST dump: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L123
- Lint report formats: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/general/main_presentation.py#L62
- On nodes: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L170
- With columns: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L177
- With end positions: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/tokens/markdown_token.py#L75
- On findings, line and column: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/plugin_scan_failure.py#L18
- Config file formats: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L44-L50
- Reads `.markdownlint.*`: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L45
- Per-directory config: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/application_configuration_helper.py#L29-L58
- Parser extension API: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/extension_manager/extension_manager.py#L78
- Custom rule API: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/rule_plugin.py#L21
- Plugin discovery: https://github.com/jackdewinter/pymarkdown/blob/v0.9.41/pymarkdown/plugin_manager/plugin_manager.py#L114

### quickmark 1.1.0

https://github.com/ekropotin/quickmark/tree/quickmark-cli%401.1.0

- CommonMark spec version: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/README.md#L18
- GFM tables: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md056.rs#L117
- GFM task lists: https://github.com/tree-sitter-grammars/tree-sitter-markdown/blob/v0.3.2/tree-sitter-markdown/grammar.js#L374
- GFM strikethrough: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3
- GFM extended autolinks: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md034.rs#L45
- Footnotes: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3
- Frontmatter: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md041.rs#L74
- Math: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L3
- Other extensions: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L312
- Built-in rule count: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/mod.rs#L81
- markdownlint `MD###` ids: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/md001.rs#L82
- Inline disable comments: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L343
- Autofix: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L21
- AST dump: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L21
- Lint report formats: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L147
- On nodes: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L112
- With columns: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L64
- With end positions: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L18
- On findings, line and column: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-cli/src/main.rs#L151
- Config file formats: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L253
- Reads `.markdownlint.*`: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L253
- Per-directory config: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/config/mod.rs#L242
- Parser extension API: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/linter.rs#L312
- Custom rule API: https://github.com/ekropotin/quickmark/blob/quickmark-cli%401.1.0/crates/quickmark-core/src/rules/mod.rs#L81

### gomarklint 3.3.2

https://github.com/shinagawa-web/gomarklint/tree/v3.3.2

- CommonMark spec version: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48
- GFM tables: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24
- GFM task lists: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24
- GFM strikethrough: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48
- GFM extended autolinks: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/inline.go#L48
- Footnotes: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24
- Frontmatter: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/file/reader.go#L16-L20
- Math: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L19-L24
- Other extensions: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/html.go#L36
- Built-in rule count: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/config.go#L16-L38
- markdownlint `MD###` ids: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/config.go#L12-L42
- Inline disable comments: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/linter/disable_comment.go#L144-L153
- Autofix: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/cmd/root.go#L43-L45
- AST dump: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L5-L10
- Lint report formats: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/app/app.go#L73-L77
- On nodes: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/preprocess/preprocess.go#L5-L10
- With columns: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L10-L16
- With end positions: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L10-L16
- On findings, line and column: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/rule/heading_level.go#L12
- Config file formats: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/cmd/root.go#L43
- Reads `.markdownlint.*`: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/load.go#L10
- Per-directory config: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/internal/config/merge.go#L15-L23
- Custom rule API: https://github.com/shinagawa-web/gomarklint/blob/v3.3.2/doc.go#L1-L6

### goldmark-lint 0.6.0

https://github.com/mrueg/goldmark-lint/tree/v0.6.0

- CommonMark spec version: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/README.md#L398
- GFM tables: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- GFM task lists: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- GFM strikethrough: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- GFM extended autolinks: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- Footnotes: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- Frontmatter: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L284
- Math: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L155
- Other extensions: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L154
- Built-in rule count: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/defaults.go#L11
- markdownlint `MD###` ids: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/md001.go#L19
- Inline disable comments: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L362
- Autofix: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L142
- Fix shape: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/md018.go#L23
- Dry run or diff: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/main.go#L135
- AST dump: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L160
- Lint report formats: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/main.go#L102
- On nodes: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L48
- With columns: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/helpers.go#L18
- With end positions: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/rules/helpers.go#L298
- On findings, line and column: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L36
- Config file formats: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L41
- Reads `.markdownlint.*`: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L46
- Per-directory config: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/cmd/goldmark-lint/config.go#L55
- Parser extension API: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L154
- Custom rule API: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L15
- Plugin discovery: https://github.com/mrueg/goldmark-lint/blob/v0.6.0/lint/lint.go#L104

### mdsmith 0.57.0

https://github.com/jeduden/mdsmith/tree/v0.57.0

- CommonMark spec version: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/parser/corpus_test.go#L7
- GFM tables: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L23
- GFM task lists: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L25
- GFM strikethrough: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L24
- GFM extended autolinks: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/detect.go#L610
- Footnotes: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L26
- Frontmatter: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/frontmatter.go#L17
- Math: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L30
- Other extensions: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/feature.go#L8
- Built-in rule count: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19
- markdownlint `MD###` ids: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19
- Inline disable comments: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/rule.go#L5-L10
- Autofix: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/rule.go#L14
- Fix shape: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/notrailingspaces/rule.go#L59
- Dry run or diff: https://github.com/jeduden/mdsmith/blob/v0.57.0/cmd/mdsmith/fix.go#L171-L173
- HTML: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/markdown.go#L47
- AST dump: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/ast/ast.go#L136
- Lint report formats: https://github.com/jeduden/mdsmith/blob/v0.57.0/cmd/mdsmith/main.go#L161
- On nodes: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/ast/ast.go#L162
- With columns: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/text/segment.go#L13
- With end positions: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/goldmark/text/segment.go#L16
- On findings, line and column: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/lint/diagnostic.go#L67
- Config file formats: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/config/load.go#L19
- Reads `.markdownlint.*`: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/markdownlint/parse.go#L21
- Per-directory config: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/config/load.go#L245
- Parser extension API: https://github.com/jeduden/mdsmith/blob/v0.57.0/pkg/markdown/flavor/parser.go#L70
- Custom rule API: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rule/registry.go#L6
- Plugin discovery: https://github.com/jeduden/mdsmith/blob/v0.57.0/internal/rules/all/all.go#L19

### mado 0.3.2

https://github.com/akiomik/mado/tree/v0.3.2

- CommonMark spec version: https://github.com/akiomik/mado/blob/v0.3.2/README.md#L7
- GFM tables: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L43
- GFM task lists: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- GFM strikethrough: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- GFM extended autolinks: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- Footnotes: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- Frontmatter: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L42
- Math: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- Other extensions: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L41-L44
- Built-in rule count: https://github.com/akiomik/mado/blob/v0.3.2/src/rule.rs#L52-L91
- markdownlint `MD###` ids: https://github.com/akiomik/mado/blob/v0.3.2/src/rule/md001.rs#L14-L17
- Inline disable comments: https://github.com/akiomik/mado/blob/v0.3.2/src/service/linter.rs#L21-L28
- Autofix: https://github.com/akiomik/mado/blob/v0.3.2/src/command.rs#L16-L32
- AST dump: https://github.com/akiomik/mado/blob/v0.3.2/src/command.rs#L14-L38
- Lint report formats: https://github.com/akiomik/mado/blob/v0.3.2/src/output.rs#L10-L16
- On nodes: https://github.com/akiomik/mado/blob/v0.3.2/src/rule/md001.rs#L43
- With columns: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L91-L93
- With end positions: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L94
- On findings, line and column: https://github.com/akiomik/mado/blob/v0.3.2/src/violation.rs#L8-L12
- Config file formats: https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L24-L25
- Reads `.markdownlint.*`: https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L34-L52
- Per-directory config: https://github.com/akiomik/mado/blob/v0.3.2/src/config.rs#L34-L52
- Parser extension API: https://github.com/akiomik/mado/blob/v0.3.2/src/document.rs#L40-L44
- Custom rule API: https://github.com/akiomik/mado/blob/v0.3.2/src/rule.rs#L52-L91

### remark-lint 10.0.1

https://github.com/remarkjs/remark-lint/tree/10.0.1

- CommonMark spec version: https://github.com/remarkjs/remark-lint/blob/10.0.1/readme.md#L610-L613
- GFM tables: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-table-pipes/index.js#L8
- GFM task lists: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-checkbox-character-style/index.js#L14
- GFM strikethrough: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-strikethrough-marker/index.js#L7-L8
- GFM extended autolinks: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-no-literal-urls/index.js#L1-L9
- Footnotes: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-definition-case/index.js#L94
- Frontmatter: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-no-missing-blank-lines/index.js#L211-L213
- Math: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-maximum-line-length/index.js#L288
- Other extensions: https://github.com/remarkjs/remark-lint/blob/10.0.1/test.js#L402-L406
- Built-in rule count: https://github.com/remarkjs/remark-lint/blob/10.0.1/package.json#L126-L209
- markdownlint `MD###` ids: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-final-newline/index.js#L83-L86
- Inline disable comments: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint/index.js#L56-L57
- Autofix: https://github.com/unifiedjs/unified-args/blob/11.0.1/lib/schema.js#L24-L200
- CommonMark back out: https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-stringify/lib/index.js#L27-L40
- AST dump: https://github.com/unifiedjs/unified-args/blob/11.0.1/lib/schema.js#L165-L169
- Lint report formats: https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/file-set-pipeline/log.js#L28-L50
- On nodes: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-emphasis-marker/index.js#L193
- With columns: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-final-newline/index.js#L96
- With end positions: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/remark-lint-maximum-line-length/index.js#L297
- On findings, line and column: https://github.com/vfile/vfile-reporter/blob/8.1.1/lib/index.js#L378-L381
- Config file formats: https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/configuration.js#L97-L106
- Reads `.markdownlint.*`: https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-cli/cli.js
- Per-directory config: https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/find-up.js#L172-L178
- Parser extension API: https://github.com/remarkjs/remark/blob/remark-cli%4012.0.1/packages/remark-parse/lib/index.js#L39-L40
- Custom rule API: https://github.com/remarkjs/remark-lint/blob/10.0.1/packages/unified-lint-rule/lib/index.js#L39
- Plugin discovery: https://github.com/unifiedjs/unified-engine/blob/11.2.2/lib/configuration.js#L423-L426

### mdmend 1.0.2

https://github.com/mohitmishra786/mdmend/tree/v1.0.2

- CommonMark spec version: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/README.md#L327
- GFM tables: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md055_table_pipes.go#L93
- GFM task lists: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L27
- GFM strikethrough: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md037_emphasis_spaces.go#L19
- GFM extended autolinks: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md034_bare_url.go#L22
- Footnotes: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md066_footnotes.go#L55
- Frontmatter: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md024_duplicate_heading.go#L190-L196
- Math: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L27
- Other extensions: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/flavor.go#L106
- Built-in rule count: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/registry.go#L12
- markdownlint `MD###` ids: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/registry.go#L12
- Inline disable comments: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/linter/linter.go#L24
- Autofix: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/fixer/fixer.go#L29
- Fix shape: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/md009_trailing_spaces.go#L36
- Dry run or diff: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/cmd/mdmend/main.go#L160
- Lint report formats: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/cmd/mdmend/main.go#L106
- On nodes: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L32
- With columns: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L32
- With end positions: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L5
- On findings, line and column: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/rules/rule.go#L5-L12
- Config file formats: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/config.go#L14
- Reads `.markdownlint.*`: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/markdownlint.go#L20
- Per-directory config: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/internal/config/config.go#L10
- Custom rule API: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/pkg/mdmend/rules.go#L55
- Plugin discovery: https://github.com/mohitmishra786/mdmend/blob/v1.0.2/pkg/mdmend/rules.go#L55

### Vale 3.25.1

https://github.com/vale-cli/vale/tree/v3.25.1

- CommonMark spec version: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L20-L31
- GFM tables: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22
- GFM task lists: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22
- GFM strikethrough: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22
- GFM extended autolinks: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L22
- Footnotes: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L23
- Frontmatter: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/metadata.go#L15-L48
- Math: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/math.go#L14-L24
- Other extensions: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/lint.go#L334-L345
- Built-in rule count: https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L133-L185
- markdownlint `MD###` ids: https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L136
- Inline disable comments: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/file.go#L747-L780
- Autofix: https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/apply.go#L41-L47
- Fix shape: https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/apply.go#L172-L185
- Dry run or diff: https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/command.go#L120-L148
- AST dump: https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/command.go#L58-L116
- Lint report formats: https://github.com/vale-cli/vale/blob/v3.25.1/cmd/vale/common.go#L14-L21
- On nodes: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L20-L41
- With columns: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L24
- With end positions: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L24
- On findings, line and column: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/alert.go#L20-L41
- Config file formats: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/config.go#L74-L87
- Reads `.markdownlint.*`: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/config.go#L74-L87
- Per-directory config: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/source.go#L180-L205
- Parser extension API: https://github.com/vale-cli/vale/blob/v3.25.1/internal/lint/md.go#L20-L31
- Custom rule API: https://github.com/vale-cli/vale/blob/v3.25.1/internal/check/definition.go#L119-L132
- Plugin discovery: https://github.com/vale-cli/vale/blob/v3.25.1/internal/core/ini.go#L26-L28

### contextlint 1.1.1

https://github.com/nozomi-koborinai/contextlint/tree/v1.1.1

- CommonMark spec version: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81
- GFM tables: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L97
- GFM task lists: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L129
- GFM strikethrough: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81
- GFM extended autolinks: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81
- Footnotes: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81
- Frontmatter: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L81
- Math: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/package.json#L30-L37
- Other extensions: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/package.json#L30-L37
- Built-in rule count: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/registry.ts#L36-L56
- markdownlint `MD###` ids: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rules/tbl-001.ts#L17
- Inline disable comments: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rule.ts#L40-L62
- Autofix: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/lsp-server/src/code-actions.ts#L16-L32
- Fix shape: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/lsp-server/src/code-actions.ts#L60-L66
- Dry run or diff: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/index.ts#L64-L67
- AST dump: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/index.ts#L61-L75
- Lint report formats: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/cli/src/commands/shared.ts#L24-L31
- On nodes: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L93
- With columns: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L18-L51
- With end positions: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L18-L51
- On findings, line and column: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/rule.ts#L5-L17
- Config file formats: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L5
- Reads `.markdownlint.*`: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L5
- Per-directory config: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/config.ts#L39-L48
- Parser extension API: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/parser.ts#L80-L81
- Custom rule API: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/index.ts#L12-L19
- Plugin discovery: https://github.com/nozomi-koborinai/contextlint/blob/v1.1.1/packages/core/src/registry.ts#L61-L68


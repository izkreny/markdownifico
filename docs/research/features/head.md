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

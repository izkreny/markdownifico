> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Plan: can Spinel compile the parser (#2)

The issue holds the question, the time box and the technical notes; this plan says how the prototype is built and judged. The deliverable in the repository is `docs/research/spinel.md` (new), plus two entries in `docs/research/reference-gems.md`. The prototype, its harness and the examples it runs live in the session's working folder and are thrown away, as the issue says.

## Approach

- **An existing parser is tried first.** motion-markdown-it, a pure-Ruby port of markdown-it that #1's survey did not cover, is cloned into the reference tree as `parsers/digitalmoksha_motion-markdown-it` and given one `spinel --emit-types` compile; psych-pure gets the same, for the three questions the issue's 2026-10-23 comment asks.
- **The prototype is a block parser written for the subset**, modelled on the commonmark.js block algorithm as markd ports it to Crystal, one rule per block type, with the tree walked iteratively as the issue's notes ask. It reads Markdown on stdin and prints its block tree on stdout, so the binary needs nothing beyond strings and `puts`.
- **A harness under CRuby compares three outputs per example**: commonmarker's tree, the prototype run by `ruby`, and the prototype compiled by Spinel. That classifies every failure: a mismatch under both is parser logic, a mismatch only in the binary is Spinel's.
- **The printout is block structure and lines.** Block types and their nesting; heading level; list bullet or ordered, start number, tight or loose; code block info string and literal; and each block's start and end line, following comrak's convention that trailing blank lines lie outside a block's range. Inline nodes are dropped, so paragraph and heading text is not compared.
- **The clock starts at this plan's commit.** Past 24 hours, the work stops and the no-go is written with the rate reached.

## Steps

- Check the clock against this plan commit's timestamp before each step below; past 24 hours, skip to writing `docs/research/spinel.md` (new) as a no-go.
- Clone motion-markdown-it into the reference tree over SSH, compile it with `spinel --emit-types`, and record each refusal with its line.
- Compile psych-pure with `spinel --emit-types` and record what its `require "psych"`, its `StringScanner` subclass, its `method_missing` and its `define_method` met.
- Dump the 222 in-scope examples from the spec clone, and write the harness and the printout under CRuby, with commonmarker as the reference.
- Write the block parser prototype, run it under CRuby, and compile it with Spinel until it builds or a refusal is recorded as blocking.
- Run the three-way comparison over the 222 examples and record the pass rate per section and each failure's class.
- Write `docs/research/spinel.md` (new): the versions used, what compiled, what was rewritten for the subset, whether the `RUBY_ENGINE` guard was needed, which regexp and YAML limits were hit, the motion-markdown-it and psych-pure results, the pass rate, and the go or no-go.
- Add psych-pure and motion-markdown-it to `docs/research/reference-gems.md` under *Also in the reference tree*, with psych-pure's compile result.

## Verification

- `python3 <skill-dir>/scripts/plan-check.py docs/plans/2026-10-23_GHI-2_spinel-parser.md`
- `python3 <skill-dir>/scripts/docs-check.py --plans docs/plans docs`
- The harness runs to completion over all 222 examples and writes the per-section report, exiting 0 whatever the rate.
- The harness, fed one deliberately wrong printout, reports that example as a mismatch and exits non-zero.
- A consistency check that exits 0 only when every clone in the reference tree's Ruby folders has an entry in `docs/research/reference-gems.md` and every entry has a clone.

None of these can say whether the go or no-go is right, or whether the prototype was a fair attempt at the subset: that is the owner's reading of `docs/research/spinel.md` (new), which names every failure so it can be argued with.

## Open questions

None.

## Settled

- **Which examples count:** 222 of CommonMark spec 0.31.2, from the sections Tabs, Precedence, Thematic breaks, ATX headings, Setext headings, Indented code blocks, Fenced code blocks, Paragraphs, Blank lines, Block quotes, List items and Lists, less examples 310 and 311, which need an HTML block, and 319, which needs a link reference definition.
- **What a match is:** equal printouts of block structure and lines, as under *Approach*; inline text is not compared.
- **What a go is:** all 222 matching within the time box. Anything less is a no-go, reported with the rate per section and each failure explained.
- **How the time box is measured:** 24 hours from this plan's commit timestamp.
- **The reference:** commonmarker 2.10.1 under CRuby, installed by the owner into their Ruby, since the issue defines the pass check against it.
- **motion-markdown-it:** tried before the prototype, per the issue's rule that an existing pure-Ruby parser goes first, and cloned into the reference tree.
- **`docs/research/reference-gems.md`:** gets psych-pure and motion-markdown-it only. The new CommonMark folder of the reference tree is recorded on #3 instead, since that doc covers the Ruby gems.

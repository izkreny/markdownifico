> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Spinel and a CommonMark block parser

The answer to [#2](https://github.com/izkreny/markdownifico/issues/2): can [Spinel](https://github.com/matz/spinel) compile a pure-Ruby CommonMark block parser into a native binary whose block tree matches commonmarker's? Every fact below was checked on 2026-10-23. The prototype, the harness and the patched gems lived outside this repository and are thrown away, as the issue asks.

## Answer

**Go.** A block parser written for Spinel's subset compiles with no refusal and no widened slot, and its binary matches commonmarker's block tree on all 222 in-scope spec examples, printing exactly what the same source prints under CRuby on every one. It needed no `RUBY_ENGINE` guard, hit none of Spinel's regexp or YAML limits, and one rewrite for the subset: a string buffer unfrozen with `+""`.

An existing parser gets close too: motion-markdown-it, with 29 lines added or removed across seven files and a flat entry file, builds and matches 220 of 222, also without one binary-only difference. Its patches are the better map of what the subset costs a gem that was not written for it.

## What was run

| Part           | Version                                                                       |
|----------------|-------------------------------------------------------------------------------|
| Spinel         | `spinel 2026.09.12+12405 (907e5556f) [gcc 16.2.1 (cc)]`, built from master    |
| Reference      | commonmarker 2.10.1, which wraps comrak 0.56, under Ruby 4.0.7                |
| Examples       | CommonMark spec 0.31.2, commonmark-spec at `8a5f764`                          |
| Models read    | commonmark.js at `8988869`, comrak at `0b465a9`                               |

**The examples** are the spec's sections for the block types the issue names, Thematic breaks, ATX headings, Setext headings, Indented code blocks, Fenced code blocks, Paragraphs, Block quotes, List items and Lists, plus Tabs, Precedence and Blank lines, which test block structure too: 225 examples, less 310 and 311, which need an HTML block, and 319, which needs a link reference definition, so 222.

**A match** is an equal printout of the block tree: block types and their nesting, heading level, list bullet or ordered with its start and tightness, a code block's info string and literal, and each block's start and end line as commonmarker's source positions give them. Inline nodes are dropped, so paragraph and heading text is not compared; the document's own range is left out, since it only restates the input's length.

**The harness** runs under CRuby and compares three printouts per example: commonmarker's, the candidate run by `ruby`, and the candidate compiled by Spinel. A mismatch under both is the parser's logic and a mismatch only in the binary is Spinel's. Fed commonmarker's own printout it reports 0 of 222 mismatched and exits 0; with one example's printout corrupted it reports exactly that example and exits 1.

## The prototype

About 750 lines: plain classes with typed fields, `case` dispatch on the block type instead of a table of lambdas, `while` loops and hand-written character scanning instead of regexps, and an explicit stack wherever the tree is walked, as the issue's notes on matz/spinel#2948 advise. The block rules are a port of commonmark.js's lib/blocks.js, without HTML blocks and link reference definitions.

- **Compile.** `spinel blocks.rb --emit-types` exits 0 with no diagnostics at all: no refusal, and not one parameter or return widened to untyped. The build takes 2.4 s and gives a 502 KB binary that links only libc and libm.
- **The one rewrite.** The node's content buffer started as `""`, which compiled and then raised `FrozenError` on its first `<<`: Spinel treats string literals as frozen where CRuby without the magic comment does not. `+""` fixed it.
- **Speed.** On a 326 KB input, the 222 examples repeated, the binary takes 0.02 to 0.04 s against CRuby's 0.20 s.
- **Result.** 222 of 222 match, with no difference between the binary and CRuby on any example.

The first version was a faithful commonmark.js port and scored 219: it failed 259, 262 and 315, every one on an item's or a list's end line, while the binary still agreed with CRuby everywhere. commonmark.js ends an item at its last child; comrak, which commonmarker wraps, ends a block on the line before the one that closes it, repairs column-0 ends when a list closes, widens each list to its widest descendant at the end, and lets a new block close only the containers that cannot hold it, so an item can close after its own list did. Ported from comrak's src/parser/mod.rs, those rules took the prototype to 222. One consequence worth knowing for any tool that reports lines from commonmarker: in 259 and 315 it reports an item ending one line after its own list.

## motion-markdown-it

Version 13.0.1 at `37443f7`, the pure-Ruby port of markdown-it, with its runtime gems mdurl-rb at `6d5202e`, uc.micro-rb at `6b6da1b` and linkify-it-rb at `b3a52a7`. Each step below is what the compiler or the binary reported and what got it past:

1. **Runtime gems.** With `--require-gate` the compile stops at `require "linkify-it-rb"`. The three gems were cloned and put on the path with `-I`.
2. **rules_inline/autolink.rb:8.** `EMAIL_RE` contains `#$\%`, which Ruby reads as an interpolated `$\`, and Spinel refuses the global read. This is a latent bug in the gem: under CRuby `$\` is nil, so the interpolation removes `#`, `$` and the backslash from the character class, and an address containing `#` or `$` no longer matches. Escaped as `\#\$%`.
3. **The entry file.** motion-markdown-it.rb wraps its requires in `if defined?(Motion::Project::Config) … else … end`, and through it Spinel reports `MDUrl::Url` and `UNICODE_PUNCT_RE` as defined nowhere, refuses a `slice` at rules_core/linkify.rb:76, and leaves a refusal at index.rb:33. A flat entry file holding the same requires compiles past all four. Reduced afterwards with `spinel-reduce` to three files: a dead `if defined?(…)` branch that requires a file, which itself requires two files inside its own `defined?` conditional, loses the last of those, and mdurl-rb and uc.micro-rb are both shaped that way.
4. **linkify-it-rb/index.rb:161.** `schemaError(name, val)` calls a local lambda as if it were a method, a latent bug that would raise `NoMethodError` under CRuby if reached. Changed to `schemaError.call`.
5. **mdurl-rb/encode.rb:83.** It uses `CGI` without requiring it, relying on CRuby having loaded it; Spinel asks for `require "cgi"`, which was added.
6. **C that does not compile.** Spinel accepted the program twice and generated C that gcc rejected: `state.pending += state.src[state.pos]` at parser_inline.rb:140 adds a boxed value to a String (an added `.to_s` still failed; `state.pending = state.pending + … .to_s` compiled), and `domain.split(".") rescue []` at common/simpleidn.rb:216 and 233 assigns an empty literal typed as an Integer array to a String array. The `rescue []` was dropped.
7. **Missing methods at run time.** The binary raised `NoMethodError` for `merge!` in linkify-it-rb, whose `Linkify#initialize(schemas = {}, options = {})` builds `{}.merge!(DEFAULT_SCHEMAS).merge!(schemas)`; reduced afterwards, a `{}` default parameter is the trigger, `def mk(extra = {}) = {}.merge!(extra)` failing where `mk({})` works, and the `merge!` also patched at common/utils.rb:13 turned out not to need it. A `gsub` on a String taken from linkify-it-rb's hash of mixed Strings and Regexps at index.rb:129 failed the same way, and is not reduced. The `merge!` calls became loops, and the `Linkify` instance, which the CommonMark preset never uses, is skipped behind `if RUBY_ENGINE == "spinel"`: the escape hatch, needed here and not in the prototype.

The result, through a printer of its block tokens that runs inside the binary: a 1.97 MB binary built in 23 s, matching 220 of 222, with no binary-only difference. The two failures, 259 and 315, are the comrak end-line convention above, which markdown-it's line maps do not follow. The patches are 29 lines added or removed across seven files. None of the C failures or the entry-file behaviour was reported upstream.

## psych-pure

Version 0.3.1 at `901859e`, for the three questions the 2026-10-23 comment on #2 asks:

1. **`require "psych"`** resolves to Spinel's bundled package, as do `pp`, `strscan` and `stringio`. `require "delegate"` does not: under `--require-gate` it is the first refusal, and without the gate a warning.
2. **`class Parser < StringScanner`** at lib/psych/pure.rb:930 is refused, subclassing StringScanner not being supported yet, and Spinel suggests holding a StringScanner in an instance variable instead. The refusal stops the compile even with `--defer-refusals`.
3. **The `method_missing`** at lib/psych/pure.rb:243 **and the `define_method`** at line 4080 were not reached, since the compile stops at the subclass. Answering them means rewriting the 3,200-line parser around a held scanner first.

## Recommendation

Keep the zero-runtime binary on the table: #3's ADR can keep the gem's core inside Spinel's subset at a known cost. What the two candidates say that cost is:

1. **Code shaped like the prototype compiles cleanly**: typed classes, `case` dispatch, loops, no regexps and no metaprogramming gave zero refusals and zero widened slots.
2. **What compiles can still fail, so refusals are not the whole check.** motion-markdown-it's options hashes, lambda rule tables and mixed-value hashes widened 855 slots, and the first C failure sat on a widened value, but the `merge!` `NoMethodError` and the `rescue []` C failure needed nothing widened. So CI runs `spinel --emit-types`, which reports each widened slot as well as each refusal, beside building the binary and comparing its output with CRuby's, never instead of it.
3. **String buffers start unfrozen**, with `+""` or `String.new`, since Spinel freezes literals.
4. **Requires stay unconditional and relative**, in a flat entry file, which mise's `spinel:` backend wants anyway.
5. **Source positions follow comrak's rules** wherever they must agree with commonmarker; commonmark.js's differ on item and list ends.

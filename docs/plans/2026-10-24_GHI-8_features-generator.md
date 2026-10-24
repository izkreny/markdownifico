> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Plan: commit the features table generator (#8)

`docs/research/features.md` was assembled in #6 by a script outside the repository: a data file holds the tools, every cell and the hand-picked citations, two prose files hold the text above and below the table, and the script writes the table and the sources block between them. This branch moves those pieces into `docs/research/features/` (new), cut loose from the session folder they were written in, so the next cell change is an edit to the data and a rerun.

## What moves, and what stays behind

- **Moves:** the data file as `docs/research/features/matrix.py` (new), the prose as `docs/research/features/head.md` (new) and `docs/research/features/tail.md` (new), the script as `docs/research/features/gen.py` (new), and the table-shape check as `docs/research/features/table_shape.py` (new).
- **Stays behind:** the subagents' raw gather output, about 200 KB, which the script reads today for every cell whose citation the data file does not carry. Those citations are copied into the data file's `SOURCES` first, so the fallback and the file it reads both go.
- **Stays behind:** the one-off helpers from the gathering, the backup copies, and anything naming a local clone path, since the repository is public.
- **Changes in the script:** it resolves every path from its own location and writes `docs/research/features.md` itself, in place of the intermediate table and sources files and the shell concatenation that joined them.

## Order

The move lands first and on its own, proven byte-identical: with the data and prose unchanged, the regenerated `docs/research/features.md` matches `main`'s exactly. Only then does a second commit add the generated-file comment the issue asks for, so the comparison is never muddied by an edit made on purpose.

## Steps

- Copy every citation the script currently takes from the raw gather output into `SOURCES` in the data file, and drop the fallback from the script.
- Move the data, prose, script and check into `docs/research/features/` (new), with every path resolved from the script's own directory and no absolute path left.
- Regenerate `docs/research/features.md` and confirm it is byte-identical to `main`'s; commit the move.
- Add a comment above the H1 in `docs/research/features/head.md` (new) saying the doc is generated and which files to edit, regenerate the doc, rebuild `docs/research/features.html` with `docs/html/build.sh`, and commit.
- Add `docs/research/features/test_table_shape.py` (new), which derives a copy with one cell blanked and a copy with one sources block removed from the real doc and asserts the check fails on each, and watch it fail once against a check broken on purpose.

## Verification

- `python3 <skill-dir>/scripts/plan-check.py docs/plans/2026-10-24_GHI-8_features-generator.md`
- `python3 <skill-dir>/scripts/docs-check.py --plans docs/plans docs`
- `python3 docs/research/features/gen.py && git diff --exit-code docs/research/features.md` exits 0 on the final branch, so the committed doc is what the committed sources produce.
- `git grep -nE '/home/|/tmp/' -- docs/research/features/` exits 1, having first been seen matching on the session folder's copy of the script.
- `python3 docs/research/features/table_shape.py docs/research/features.md` exits 0.
- `python3 docs/research/features/test_table_shape.py` exits 0, and exits non-zero with the check's cell pattern loosened to accept a blank cell.
- `docs/html/build.sh docs/research/features.md`, then `git diff --exit-code docs/research/features.html` exits 0.

None of these say the table is still true: the cells are #6's, unchanged here, and a regenerated doc that matches byte for byte proves only that nothing moved by accident.

## Open questions

None.

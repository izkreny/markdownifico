> 🤖 Written by AI --- read/modified by izkreny! 🤓

# Plan: pick reference Ruby gems (#1)

The issue holds the question, the folders, the selection criteria and the method; this plan only says how the work is split and checked. The deliverable in the repository is `docs/research/reference-gems.md` (new). The clones and their update script live outside the repository, in the owner's existing reference-clone tree, so none of them appear in this diff.

## Approach

- **Gathering is fanned out, judging is not.** Candidate lists and the per-repository fact checks are network-bound and mechanical, so they run in subagents, one per group of folders. The reading score and the final pick of 10 per folder stay in the orchestrating session, so the same judge scores every folder.
- **Facts come from one script.** A throwaway script posts every candidate to the Ruby Toolbox compare endpoint, at most 100 permalinks a call, and a second pass reads each survivor's repository through the GitHub API for a CI workflow, a CHANGELOG and a licence. Both scripts live in the session's working folder, not in this repository: the doc records the method and the dated facts, and the scripts are not part of the gem.
- **Reading happens on shallow clones in scratch space**, so only the picks reach the reference tree, as full clones named `<owner>_<repo>`.
- **Spinel flags are checked against Spinel's own limitations document**, read from its repository on the day, and each flag names what in the gem's core it rests on.
- **The update script is the existing one with its root changed**, since that script already walks two levels deep, which is exactly the folder-then-clone layout here.

## Steps

- Read Spinel's limitations document and record the subset as checked.
- Gather 15 to 20 candidates per folder from the four sources the issue names.
- Filter every candidate through the Ruby Toolbox compare endpoint, then check CI, CHANGELOG and licence in each survivor's repository; cut what fails.
- Shallow-clone the survivors to scratch and score each on the five reading points; flag Spinel candidates.
- Pick at most 10 per folder and write `docs/research/reference-gems.md` (new), picks and rejects with reasons, every fact dated.
- Clone the picks into the reference tree, one folder per category.
- Write the update script for that tree and its `update-all` link, and prove it on a fixture with one clean, one dirty and one dead-remote clone.

## Verification

- `python3 <skill-dir>/scripts/plan-check.py docs/plans/2026-10-21_GHI-1_reference-gems.md`
- `python3 <skill-dir>/scripts/docs-check.py --plans docs/plans docs`
- A consistency check that exits 0 only when every pick in the doc has a clone directory in its folder and every clone directory has a pick.
- `update-examples-ruby` exits 0 with `failed: 0`, and its fixture run exits 1 with one each of updated, skipped and failed.

None of these can say whether the picks are the right ones: that is the owner's reading of the doc, and the rejects list is there so it can be argued with.

## Open questions

None.

## Settled

- **Where the filter scripts live:** in the session's working folder, not in this repository, because the issue asks for the findings and the clones, not a tool.
- **What a folder with fewer than 10 qualifying gems gets:** fewer than 10. The issue says at most 10, and padding a folder with a gem that failed a criterion defeats the criteria.

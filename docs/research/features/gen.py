"""Writes docs/research/features.md from matrix.py, head.md and tail.md."""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from matrix import TOOLS, ROWS, SOURCES  # noqa: E402

MAX = 20


def label(url):
    m = re.match(r"https://github\.com/([^/]+/[^/]+)/(blob|tree)/[^/]+/?([^#]*)(?:#L(\d+)(?:-L(\d+))?)?", url)
    if not m:
        return url[:MAX]
    _, kind, path, a, b = m.groups()
    if not path:
        return "repository"
    name = path.rstrip("/").rsplit("/", 1)[-1] + ("/" if kind == "tree" else "")
    for frag in ([f"#L{a}-L{b}"] if b else []) + ([f"#L{a}"] if a else [""]):
        if len(name + frag) <= MAX:
            return name + frag
    frag = f"#L{a}" if a else ""
    return name[:MAX - len(frag) - 1] + "…" + frag


def cite(url, repo):
    link_repo = re.match(r"https://github\.com/([^/]+/[^/]+)/", url).group(1)
    text = f"[{label(url)}]({url})"
    return text if link_repo == repo else f"{text} ({link_repo.split('/')[1]})"


def main():
    grid = []
    for n, g, f, cells in ROWS:
        c = [x.strip() for x in cells.split(" | ")]
        assert len(c) == len(TOOLS), (n, len(c))
        grid.append((n, g, f, c))
    head = ["Group", "Feature"] + [t[1] for t in TOOLS]

    def line(r):
        return "| " + " | ".join(r) + " |"

    table = [line(head), "|" + "|".join("---" for _ in head) + "|"] + [line([g, f] + c) for n, g, f, c in grid]
    src = []
    missing = []
    for i, (key, name, repo, tag) in enumerate(TOOLS):
        src.append(f"### {name}\n")
        src.append(f"[repository](https://github.com/{repo}/tree/{tag.replace('@', '%40')}) at {tag}\n")
        for n, g, f, c in grid:
            if c[i].startswith("n/a"):
                continue
            links = SOURCES.get((key, n))
            if not links:
                missing.append((key, n, c[i]))
                continue
            src.append(f"- {f}: " + ", ".join(cite(l, repo) for l in links))
        src.append("")
    if missing:
        for m in missing:
            print("no citation:", m, file=sys.stderr)
        return 1
    parts = [
        (HERE / "head.md").read_text(encoding="utf-8"),
        "\n".join(table) + "\n",
        (HERE / "tail.md").read_text(encoding="utf-8"),
        "\n".join(src) + "\n",
    ]
    (HERE.parent / "features.md").write_text("".join(parts), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""Table-shape check for docs/research/features.md.

Exits 0 only when the feature table's every tool cell is a legend value,
every tool column header names a version, and every tool column has a
heading under ## Sources. Exits 1 and lists each problem otherwise.
"""
import re
import sys

LABEL_COLUMNS = 2  # Group, Feature
CELL = re.compile(r"^(yes|readme|no|n/a)(, .+)?$")
VERSION = re.compile(r"\d+\.\d+")


def table_rows(lines):
    """The first markdown table after the '## The table' heading."""
    start = next(i for i, l in enumerate(lines) if l.strip() == "## The table")
    rows = []
    for line in lines[start + 1:]:
        if line.startswith("|"):
            rows.append(line)
        elif rows:
            break
    return rows


def cells(row):
    # WHY: a cell may hold an escaped pipe (\|), so split on unescaped pipes only.
    parts = re.split(r"(?<!\\)\|", row.strip())
    return [p.strip() for p in parts[1:-1]]


def source_headings(lines):
    start = next(i for i, l in enumerate(lines) if l.strip() == "## Sources")
    found = set()
    for line in lines[start + 1:]:
        if line.startswith("## "):
            break
        if line.startswith("### "):
            found.add(line[4:].strip())
    return found


def main(path):
    lines = open(path, encoding="utf-8").read().splitlines()
    problems = []
    try:
        rows = table_rows(lines)
    except StopIteration:
        print(f"{path}: no '## The table' heading")
        return 1
    if len(rows) < 3:
        print(f"{path}: no table under '## The table'")
        return 1
    header = cells(rows[0])
    tools = header[LABEL_COLUMNS:]
    for tool in tools:
        if not VERSION.search(tool):
            problems.append(f"column '{tool}': header names no version")
    for row in rows[2:]:
        row_cells = cells(row)
        feature = row_cells[1] if len(row_cells) > 1 else "?"
        if len(row_cells) != len(header):
            problems.append(f"row '{feature}': {len(row_cells)} cells, header has {len(header)}")
            continue
        for tool, cell in zip(tools, row_cells[LABEL_COLUMNS:]):
            if not CELL.match(cell):
                problems.append(f"row '{feature}', column '{tool}': '{cell}' is not a legend value")
    try:
        sources = source_headings(lines)
    except StopIteration:
        sources = set()
        problems.append("no '## Sources' heading")
    for tool in tools:
        if tool not in sources:
            problems.append(f"column '{tool}': no '### {tool}' heading under ## Sources")
    for p in problems:
        print(f"{path}: {p}")
    print(f"table-shape: {len(tools)} columns, {len(rows) - 2} rows, {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))

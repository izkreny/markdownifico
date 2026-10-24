"""The table-shape check passes on docs/research/features.md and fails on copies broken from it."""
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
DOC = HERE.parent / "features.md"
CHECK = HERE / "table_shape.py"


def run(text):
    with tempfile.TemporaryDirectory() as tmp:
        path = Path(tmp) / "features.md"
        path.write_text(text, encoding="utf-8")
        return subprocess.run([sys.executable, str(CHECK), str(path)], capture_output=True, text=True).returncode


class TableShape(unittest.TestCase):
    def setUp(self):
        self.text = DOC.read_text(encoding="utf-8")

    def test_the_doc_passes(self):
        self.assertEqual(run(self.text), 0)

    def test_a_blank_cell_fails(self):
        row = next(l for l in self.text.splitlines() if l.startswith("| Dialects"))
        cells = row.split(" | ")
        cells[2] = ""
        self.assertEqual(run(self.text.replace(row, " | ".join(cells), 1)), 1)

    def test_a_missing_sources_block_fails(self):
        broken = re.sub(r"^### cmark 0\.31\.2\n", "", self.text, count=1, flags=re.M)
        self.assertNotEqual(broken, self.text)
        self.assertEqual(run(broken), 1)


if __name__ == "__main__":
    unittest.main()

"""gen.py refuses a citation it cannot label, naming the cell, and leaves the doc alone."""
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import gen  # noqa: E402

DOC = HERE.parent / "features.md"


class Citations(unittest.TestCase):
    def test_cite_refuses_a_link_off_github(self):
        with self.assertRaisesRegex(ValueError, "spec.commonmark.org"):
            gen.cite("https://spec.commonmark.org/0.31.2/", "commonmark/cmark")

    def test_main_refuses_without_writing(self):
        before = DOC.read_bytes()
        key = next(k for k in gen.SOURCES if k[0] == "cmark")
        saved = gen.SOURCES[key]
        gen.SOURCES[key] = ["https://spec.commonmark.org/0.31.2/"]
        try:
            self.assertEqual(gen.main(), 1)
        finally:
            gen.SOURCES[key] = saved
        self.assertEqual(DOC.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()

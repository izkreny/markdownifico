#!/usr/bin/env bash
# Usage: docs/html/build.sh <markdown-file>...
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
assets="$here/../assets"
for md in "$@"; do
  html="${md%.md}.html"
  rel=$(python3 -c 'import os, sys; print(os.path.relpath(sys.argv[1], os.path.dirname(os.path.abspath(sys.argv[2]))))' "$assets" "$html")
  pandoc -f gfm -t html5 --standalone --wrap=none \
    --template "$here/template.html" --lua-filter "$here/plain.lua" \
    -V assets="$rel" -o "$html" "$md"
  echo "built $html"
done

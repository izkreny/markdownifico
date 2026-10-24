local has_mermaid = false

local function freeze_marker(block)
  if block and block.t == "RawBlock" and block.format == "html" then
    return block.text:match("^%s*<!%-%-%s*freeze%-columns:%s*(%d+)%s*%-%->%s*$")
  end
end

-- WHY: a table's frozen columns depend on what it holds, so the count comes from a comment written above it, which GitHub does not render.
-- WHY: the inner div is the scroll container, so the figure can carry the fullscreen button outside the scrolling area.
function Blocks(blocks)
  local out = pandoc.List()
  for i, block in ipairs(blocks) do
    if block.t == "Table" then
      local count = freeze_marker(blocks[i - 1])
      local open = count and string.format('<figure data-freeze-columns="%s">', count) or "<figure>"
      out:insert(pandoc.RawBlock("html", open .. "\n<div>"))
      out:insert(block)
      out:insert(pandoc.RawBlock("html", "</div>\n</figure>"))
    elseif not (freeze_marker(block) and blocks[i + 1] and blocks[i + 1].t == "Table") then
      out:insert(block)
    end
  end
  return out
end

function CodeBlock(block)
  if block.classes[1] ~= "mermaid" then
    return nil
  end
  has_mermaid = true
  local escaped = block.text:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")
  return pandoc.RawBlock("html", '<pre class="mermaid">\n' .. escaped .. "\n</pre>")
end

-- WHY: the docs carry no YAML title, so the tab title comes from the H1.
function Pandoc(doc)
  if not doc.meta.pagetitle then
    for _, block in ipairs(doc.blocks) do
      if block.t == "Header" and block.level == 1 then
        doc.meta.pagetitle = pandoc.utils.stringify(block)
        break
      end
    end
  end
  if has_mermaid then
    doc.meta.mermaid = true
  end
  return doc
end

return {
  { Blocks = Blocks, CodeBlock = CodeBlock },
  { Pandoc = Pandoc },
}

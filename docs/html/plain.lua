local has_mermaid = false

-- WHY: the inner div is the scroll container, so the figure can carry the fullscreen button outside the scrolling area.
function Table(tbl)
  return {
    pandoc.RawBlock("html", "<figure>\n<div>"),
    tbl,
    pandoc.RawBlock("html", "</div>\n</figure>"),
  }
end

-- WHY: Simple.css wraps long strings only in paragraphs and headings, so a bare URL in a list item needs its own break points.
local function breakable(text)
  local inlines = {}
  for part, slash in text:gmatch("([^/]*)(/?)") do
    if part ~= "" then table.insert(inlines, pandoc.Str(part)) end
    if slash ~= "" then
      table.insert(inlines, pandoc.Str("/"))
      table.insert(inlines, pandoc.RawInline("html", "<wbr>"))
    end
  end
  return inlines
end

function Link(link)
  local text = pandoc.utils.stringify(link.content)
  if text ~= link.target then
    return nil
  end
  local path = link.target:match("^https://github%.com/[^/]+/[^/]+/blob/[^/]+/(.+)$")
  link.content = breakable(path or text)
  return link
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
  { Table = Table, CodeBlock = CodeBlock, Link = Link },
  { Pandoc = Pandoc },
}

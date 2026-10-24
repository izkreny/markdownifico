function freeze(table, count) {
  const header = table.tHead?.rows[0];
  if (!header) return;
  let left = 0;
  for (let col = 0; col < count; col++) {
    for (const row of table.rows) {
      const cell = row.cells[col];
      cell.dataset.frozen = "";
      cell.style.left = `${left}px`;
    }
    left += header.cells[col].getBoundingClientRect().width;
  }
}

function addFullscreen(figure) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Fullscreen";
  button.addEventListener("click", () => {
    if (document.fullscreenElement === figure) document.exitFullscreen();
    else figure.requestFullscreen();
  });
  document.addEventListener("fullscreenchange", () => {
    button.textContent = document.fullscreenElement === figure ? "Exit fullscreen" : "Fullscreen";
  });
  figure.prepend(button);
}

for (const figure of document.querySelectorAll("main > figure")) {
  const scroller = figure.querySelector(":scope > div");
  const table = scroller?.querySelector(":scope > table");
  if (!table) continue;
  if (table.scrollWidth > scroller.clientWidth) figure.dataset.wide = "";
  freeze(table, Number(figure.dataset.freezeColumns ?? 0));
  addFullscreen(figure);
}

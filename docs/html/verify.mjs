const page = new URL(process.argv[2], `file://${process.cwd()}/`).href;
const version = await (await fetch("http://127.0.0.1:9222/json/version")).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, (m) => (m.error ? reject(new Error(`${method}: ${m.error.message}`)) : resolve(m.result)));
    ws.send(JSON.stringify({ id: n, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const s = (method, params) => send(method, params, sessionId);
const evaluate = async (expression, userGesture = false) => {
  const r = await s("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true, userGesture });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? "evaluate failed");
  return r.result.value;
};
const WIDTH = 1920;
const HEIGHT = 1080;

async function open(scheme) {
  await s("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false });
  await s("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: scheme }] });
  await s("Page.navigate", { url: page });
  await evaluate(`new Promise((r) => { const done = () => setTimeout(r, 400); document.readyState === "complete" ? done() : addEventListener("load", done); })`);
}

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}  ${detail}`);
};
// WHY: Chromium may report colours as oklab(), so transparency is read from the alpha component, whatever the space.
const transparent = (c) => c === "transparent" || /\/\s*0\)$|,\s*0\)$/.test(c);

for (const scheme of ["light", "dark"]) {
  await open(scheme);
  const layout = await evaluate(`(() => {
    const p = document.querySelector("main > p");
    const fig = document.querySelector("main > figure");
    return {
      text: Math.round(p.getBoundingClientRect().width),
      figure: Math.round(fig.getBoundingClientRect().width),
      wide: fig.hasAttribute("data-wide"),
      page: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
    };
  })()`);
  const tag = `wide table, ${scheme}`;
  check(`${tag}: text column stays narrow`, layout.text <= 730, `p=${layout.text}px`);
  check(`${tag}: marked wide, kept to the text width`, layout.wide && Math.abs(layout.figure - layout.text) <= 1, `figure=${layout.figure}px text=${layout.text}px`);
  check(`${tag}: no page-level horizontal scroll`, layout.page <= layout.viewport, `page=${layout.page} viewport=${layout.viewport}`);

  const frozen = await evaluate(`(async () => {
    const box = document.querySelector("main > figure > div");
    const row = box.querySelector("tbody tr:nth-child(2)");
    const th = box.querySelector("thead th:nth-child(5)");
    const at = (el) => { const r = el.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top)]; };
    const before = { c1: at(row.cells[0]), c2: at(row.cells[1]), c3: at(row.cells[2]), th: at(th) };
    box.scrollLeft = box.scrollWidth;
    box.scrollTop = 300;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const after = { c1: at(row.cells[0]), c2: at(row.cells[1]), c3: at(row.cells[2]), th: at(th) };
    return {
      before, after,
      scrolled: [box.scrollLeft, box.scrollTop],
      bg1: getComputedStyle(row.cells[0]).backgroundColor,
      bg2: getComputedStyle(row.cells[1]).backgroundColor,
      thBg: getComputedStyle(th).backgroundColor,
    };
  })()`);
  const { before: b, after: a } = frozen;
  check(`${tag}: box scrolled both ways`, frozen.scrolled[0] > 300 && frozen.scrolled[1] > 100, `scroll=${frozen.scrolled}`);
  check(`${tag}: first column frozen`, a.c1[0] === b.c1[0], `left ${b.c1[0]} -> ${a.c1[0]}`);
  check(`${tag}: second column frozen`, a.c2[0] === b.c2[0], `left ${b.c2[0]} -> ${a.c2[0]}`);
  check(`${tag}: control, third column scrolls away (expected)`, b.c3[0] - a.c3[0] === frozen.scrolled[0], `left ${b.c3[0]} -> ${a.c3[0]}, scrolled ${frozen.scrolled[0]}`);
  check(`${tag}: header row frozen`, a.th[1] === b.th[1], `top ${b.th[1]} -> ${a.th[1]}`);
  check(`${tag}: frozen cells opaque`, !transparent(frozen.bg1) && !transparent(frozen.bg2) && !transparent(frozen.thBg), `c1=${frozen.bg1} c2=${frozen.bg2} th=${frozen.thBg}`);

  // WHY: a synthetic CDP mouse event missed the button in headless runs; click() under userGesture is the same handler with user activation.
  const label = await evaluate(`(() => { const b = document.querySelector("main > figure > button"); const t = b.textContent; b.click(); return t; })()`, true);
  const btn = { text: label };
  await evaluate(`new Promise((r) => setTimeout(r, 500))`);
  const fs = await evaluate(`(() => {
    const fig = document.querySelector("main > figure");
    const box = fig.querySelector(":scope > div");
    return { isFig: document.fullscreenElement === fig, label: fig.querySelector("button").textContent, box: Math.round(box.getBoundingClientRect().height), screen: innerHeight };
  })()`);
  check(`${tag}: button opens fullscreen`, btn.text === "Fullscreen" && fs.isFig && fs.label === "Exit fullscreen", `fullscreen=${fs.isFig} label=${fs.label}`);
  check(`${tag}: fullscreen table fills the screen`, fs.box >= fs.screen - 120, `box=${fs.box}px screen=${fs.screen}px`);
  await evaluate(`document.fullscreenElement ? document.exitFullscreen() : null`);
}

await open("light");
const narrow = await evaluate(`(() => { const f = document.querySelectorAll("main > figure")[1]; const p = document.querySelector("main > p"); return { wide: f.hasAttribute("data-wide"), w: Math.round(f.getBoundingClientRect().width), text: Math.round(p.getBoundingClientRect().width), scroll: f.querySelector(":scope > div").scrollWidth, client: f.querySelector(":scope > div").clientWidth, frozen: f.querySelectorAll("[data-frozen]").length, rows: f.querySelectorAll("tr").length }; })()`);
check("narrow table: wraps inside the text column", !narrow.wide && Math.abs(narrow.w - narrow.text) <= 1 && narrow.scroll <= narrow.client, `wide=${narrow.wide} figure=${narrow.w}px scroll=${narrow.scroll} client=${narrow.client}`);
check("narrow table: freezes one column", narrow.frozen === narrow.rows, `frozen cells=${narrow.frozen} rows=${narrow.rows}`);

for (const scheme of ["light", "dark"]) {
  await open(scheme);
  const m = await evaluate(`new Promise((r) => {
    const t0 = Date.now();
    const poll = () => {
      const svg = document.querySelector("pre.mermaid svg");
      if (svg?.querySelector(".node") || Date.now() - t0 > 8000) return r({ svg: !!svg, nodes: svg ? svg.querySelectorAll(".node").length : 0 });
      setTimeout(poll, 100);
    };
    poll();
  })`);
  check(`mermaid ${scheme}: renders an SVG with 3 nodes`, m.svg && m.nodes === 3, `svg=${m.svg} nodes=${m.nodes}`);
}

await send("Target.closeTarget", { targetId });
ws.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);

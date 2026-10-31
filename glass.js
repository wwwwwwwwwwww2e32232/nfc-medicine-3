// ===== Liquid Glass (Apple iOS 26 스타일) =====
// 1) 빛 방향: 커서/기기 기울기에 따라 유리 가장자리 반사가 움직임 (모든 브라우저)
// 2) 렌즈 굴절: 유리 가장자리에서 뒤 배경이 휘어 보이는 효과 (Chromium 계열 — 안드로이드 Chrome, PC Chrome/Edge)
//    iPhone Safari 는 SVG 백드롭 필터를 지원하지 않아 블러+림 유리로 자동 대체됨
(function () {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- 1. 빛 방향 ----------
  if (!reduce) {
    let raf = 0, ang = 135;
    const apply = () => { raf = 0; root.style.setProperty("--la", ang.toFixed(1) + "deg"); };
    const set = a => { ang = a; if (!raf) raf = requestAnimationFrame(apply); };
    addEventListener("pointermove", e => set(135 + (e.clientX / innerWidth - .5) * 50 + (e.clientY / innerHeight - .5) * 20), { passive: true });
    addEventListener("deviceorientation", e => { if (e.gamma != null) set(135 + Math.max(-30, Math.min(30, e.gamma)) * 1.2); }, { passive: true });
  }

  // ---------- 2. 렌즈 굴절 ----------
  const ua = navigator.userAgent;
  const chromium = /Chrome\/\d+/.test(ua) && !/iPhone|iPad|iPod/.test(ua) && !/Firefox/.test(ua);
  if (!chromium || matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

  // 요소 종류별: 가장자리 두께, 굴절 세기(가장자리 두께의 1.3배 이하 — 그 이상이면 뒤 내용이 접혀 사라짐), 나머지 백드롭 효과
  const KINDS = [
    { sel: ".dock .in",  bezel: 33, scale: 44, rest: "blur(1.5px) saturate(190%) brightness(1.05)" },
    { sel: ".stepper",   bezel: 24, scale: 32, rest: "blur(1.5px) saturate(190%) brightness(1.06)" },
    { sel: ".badge",     bezel: 14, scale: 18, rest: "blur(1.5px) saturate(190%) brightness(1.06)" },
    { sel: ".card",      bezel: 34, scale: 44, rest: "blur(7px) saturate(185%)" },
  ];

  const NS = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(NS, "svg");
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.setAttribute("aria-hidden", "true");
  defs.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  document.body.appendChild(defs);

  const state = new WeakMap();
  let seq = 0;

  // 둥근 사각형 SDF(안쪽 음수)
  function sdf(x, y, hw, hh, r) {
    const qx = Math.abs(x) - (hw - r), qy = Math.abs(y) - (hh - r);
    const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
    return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
  }

  // 가장자리에서 안쪽을 끌어와 휘어 보이게 하는 변위 맵
  function makeMap(w, h, r, bezel) {
    const k = Math.min(1, 360 / Math.max(w, h));            // 큰 카드는 해상도 낮춰 계산
    const W = Math.max(8, Math.round(w * k)), H = Math.max(8, Math.round(h * k));
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), img = g.createImageData(W, H), d = img.data;
    const hw = w / 2, hh = h / 2, rr = Math.min(r, hw, hh), b = Math.min(bezel, hw, hh);
    for (let j = 0; j < H; j++) {
      const y = (j + .5) / k - hh;
      for (let i = 0; i < W; i++) {
        const x = (i + .5) / k - hw, p = (j * W + i) * 4;
        const dist = sdf(x, y, hw, hh, rr), depth = -dist;
        let R = 128, G = 128;
        if (depth > 0 && depth < b) {
          const t = 1 - depth / b;
          const mag = t * t * (1.6 - .6 * t);                  // 가장자리에서 급격히 휘는 볼록 렌즈 곡선
          let nx = sdf(x + .5, y, hw, hh, rr) - sdf(x - .5, y, hw, hh, rr);
          let ny = sdf(x, y + .5, hw, hh, rr) - sdf(x, y - .5, hw, hh, rr);
          const n = Math.hypot(nx, ny) || 1; nx /= n; ny /= n;
          R = 128 - nx * mag * 127; G = 128 - ny * mag * 127;
        }
        d[p] = R; d[p + 1] = G; d[p + 2] = 128; d[p + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    return c.toDataURL();
  }

  function build(el, kind) {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (w < 4 || h < 4) return;
    let s = state.get(el);
    if (s && s.w === w && s.h === h) return;
    const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
    if (!s) {
      s = { id: "lg" + (++seq) };
      const f = document.createElementNS(NS, "filter");
      f.setAttribute("id", s.id);
      f.setAttribute("filterUnits", "userSpaceOnUse");
      f.setAttribute("color-interpolation-filters", "sRGB");
      f.innerHTML = '<feImage result="m" preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="m" xChannelSelector="R" yChannelSelector="G"/>';
      defs.appendChild(f); s.f = f; s.el = el;
      state.set(el, s); live.add(s);
    }
    s.w = w; s.h = h;
    const f = s.f, im = f.firstChild, dm = f.lastChild;
    ["x", "y"].forEach(a => { f.setAttribute(a, 0); im.setAttribute(a, 0); });
    f.setAttribute("width", w); f.setAttribute("height", h);
    im.setAttribute("width", w); im.setAttribute("height", h);
    im.setAttribute("href", makeMap(w, h, Math.min(r, h / 2, w / 2), kind.bezel));
    dm.setAttribute("scale", kind.scale);
    const v = "url(#" + s.id + ") " + kind.rest;
    el.style.backdropFilter = v; el.style.webkitBackdropFilter = v;
  }

  const live = new Set();
  const ro = new ResizeObserver(es => es.forEach(e => { const s = state.get(e.target); if (s) build(e.target, s.kind); }));

  function scan() {
    KINDS.forEach(kind => document.querySelectorAll(kind.sel).forEach(el => {
      const s = state.get(el);
      if (!s) { build(el, kind); const n = state.get(el); if (n) { n.kind = kind; ro.observe(el); } }
    }));
    live.forEach(s => { if (!s.el.isConnected) { s.f.remove(); ro.unobserve(s.el); live.delete(s); } });
  }

  let t = 0;
  new MutationObserver(() => { clearTimeout(t); t = setTimeout(scan, 60); }).observe(document.body, { childList: true, subtree: true });
  scan();
  addEventListener("load", scan);
})();

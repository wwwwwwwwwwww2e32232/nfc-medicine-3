// ===== 공통 기능: 기록 저장/불러오기, 방문자 ID, QR 생성 =====
(function () {
  const CFG = window.APP_CONFIG || {};
  const DEMO = !CFG.API_URL;
  const LS = "nfcmed_";

  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }
  function visitorId() {
    let v = localStorage.getItem(LS + "vid");
    if (!v) { v = uid(); localStorage.setItem(LS + "vid", v); }
    return v;
  }
  function device() {
    const u = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(u)) return "iOS";
    if (/Android/i.test(u)) return "Android";
    return "PC/기타";
  }
  function baseUrl() {
    if (CFG.BASE_URL) return CFG.BASE_URL.replace(/\/?$/, "/");
    return location.origin + location.pathname.replace(/[^/]*$/, "");
  }
  function tagUrl(tagId, src) {
    return baseUrl() + "?t=" + encodeURIComponent(tagId) + "&s=" + src;
  }

  // ---- 데모 모드 저장소 (localStorage) ----
  const local = {
    get(k) { try { return JSON.parse(localStorage.getItem(LS + k) || "[]"); } catch (e) { return []; } },
    set(k, v) { localStorage.setItem(LS + k, JSON.stringify(v)); },
    push(k, row) { const a = local.get(k); a.push(row); local.set(k, a); },
  };

  async function post(data) {
    if (DEMO) {
      const now = new Date().toISOString();
      if (data.action === "visit") local.push("visits", { time: now, tag: data.tag, src: data.src, vid: data.vid, device: data.device });
      else if (data.action === "survey") local.push("surveys", Object.assign({ time: now, tag: data.tag, src: data.src, vid: data.vid }, data.answers));
      else if (data.action === "addTag") {
        const tags = local.get("tags").filter(t => t.id !== data.id);
        tags.push({ id: data.id, name: data.name, type: data.type, created: now });
        local.set("tags", tags);
      } else if (data.action === "delTag") local.set("tags", local.get("tags").filter(t => t.id !== data.id));
      return { ok: true, demo: true };
    }
    const res = await fetch(CFG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async function getAll() {
    if (DEMO) return { ok: true, demo: true, visits: local.get("visits"), surveys: local.get("surveys"), tags: local.get("tags") };
    const res = await fetch(CFG.API_URL + "?action=all&_=" + Date.now());
    return res.json();
  }
  async function getTags() {
    if (DEMO) return local.get("tags");
    const res = await fetch(CFG.API_URL + "?action=tags&_=" + Date.now());
    const j = await res.json();
    return j.tags || [];
  }

  // QR 이미지 (data URL)
  function qrDataUrl(text, cell) {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    return qr.createDataURL(cell || 6, 2);
  }
  function qrSvg(text) {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  window.App = {
    CFG, DEMO, visitorId, device, baseUrl, tagUrl, post, getAll, getTags, qrDataUrl, qrSvg, esc, local, uid,
  };
})();

// ===== SVG 아이콘 & 약 일러스트 (이모지 대신 사용) =====
(function () {
  const P = {
    nfc: '<path d="M6 8.5a8 8 0 0 1 0 7"/><path d="M9.5 6a12 12 0 0 1 0 12"/><path d="M13 3.5a16 16 0 0 1 0 17"/><circle cx="3" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    spark: '<path d="M12 3c.4 3.9 2.1 5.6 6 6-3.9.4-5.6 2.1-6 6-.4-3.9-2.1-5.6-6-6 3.9-.4 5.6-2.1 6-6Z"/><path d="M18.5 15.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z"/>',
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 10.5V6a1.5 1.5 0 0 1 3 0v7.5a6.5 6.5 0 0 1-6.5 6.5h-.6a6 6 0 0 1-4.6-2.2L3 15a1.6 1.6 0 0 1 2.4-2.1L8 15"/>',
    alert: '<path d="M12 3.5 2.8 19.2a1 1 0 0 0 .9 1.5h16.6a1 1 0 0 0 .9-1.5L12 3.5Z"/><path d="M12 10v4.5M12 17.5h.01"/>',
    trash: '<path d="M4 7h16M9.5 7V4.8c0-.4.4-.8.8-.8h3.4c.4 0 .8.4.8.8V7M6.5 7l.9 12.2a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5L17.5 7"/><path d="M10 11v6M14 11v6"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    map: '<path d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevL: '<path d="m15 5-7 7 7 7"/>',
    chevR: '<path d="m9 5 7 7-7 7"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    brain: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6 1c0 2-2.8 2.4-2.8 4M12 17.5h.01"/>',
    form: '<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/>',
    leaf: '<path d="M5 19c0-8 5-13.5 15-14-.4 9.8-5.7 15-13.5 15"/><path d="M5 19c3-4 6-6.5 9-8"/>',
    book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    box: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.3 9.2A1.8 1.8 0 0 0 6.3 21h11.4a1.8 1.8 0 0 0 1.6-2.8L14 9V3"/><path d="M7.5 15h9"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z"/>',
  };
  window.I = function (name, size, sw) {
    return '<svg class="ico" width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || "") + "</svg>";
  };

  // ---- 약 일러스트 (실제 제형에 맞춤) ----
  const SH = '<filter id="dsh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#1b2433" flood-opacity=".22"/></filter>';
  const caplet = (x, y, r) =>
    '<g transform="translate(' + x + " " + y + ") rotate(" + r + ')"><rect x="-17" y="-8" width="34" height="16" rx="8" fill="url(#cap)"/><rect x="-12" y="-5.5" width="22" height="3.6" rx="1.8" fill="#fff"/><path d="M0 -7.5v15" stroke="#d9dde3" stroke-width="1.2"/></g>';
  window.ILLU = {
    // 타이레놀: 은박(PTP) 시트 + 흰색 길쭉한 코팅정
    pill:
      '<svg viewBox="0 0 120 120" class="illu" aria-hidden="true"><defs>' + SH +
      '<linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f5f8"/><stop offset=".4" stop-color="#b9c2cd"/><stop offset=".52" stop-color="#e8ecf1"/><stop offset=".7" stop-color="#a9b3bf"/><stop offset="1" stop-color="#8e99a6"/></linearGradient>' +
      '<linearGradient id="cap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e3e7ec"/></linearGradient>' +
      '<radialGradient id="bub" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#dfe5ec" stop-opacity=".55"/></radialGradient></defs>' +
      '<g filter="url(#dsh)" transform="rotate(-14 60 60)"><rect x="22" y="18" width="70" height="86" rx="10" fill="url(#foil)" stroke="#8e99a6" stroke-width=".8"/><rect x="25" y="21" width="64" height="80" rx="8" fill="none" stroke="#fff" stroke-opacity=".55"/>' +

      [0, 1, 2].map(i => '<rect x="31" y="' + (34 + i * 23) + '" width="52" height="18" rx="9" fill="url(#bub)" stroke="#fff" stroke-width="1.4"/><path d="M37 ' + (37 + i * 23) + 'h20" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"/>').join("") +
      caplet(57, 43, 0) + caplet(57, 66, 0) + "</g>" +
      '<ellipse cx="86" cy="104" rx="17" ry="3.5" fill="#1b2433" opacity=".14"/><g filter="url(#dsh)">' + caplet(86, 94, -24) + "</g></svg>",
    // 판콜에이: 갈색 유리 소형병 + 금색 캡
    liquid:
      '<svg viewBox="0 0 120 120" class="illu" aria-hidden="true"><defs>' + SH +
      '<linearGradient id="amb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b300c"/><stop offset=".3" stop-color="#b9631f"/><stop offset=".55" stop-color="#d98a3d"/><stop offset="1" stop-color="#5e2a0a"/></linearGradient>' +
      '<linearGradient id="gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8892e"/><stop offset=".45" stop-color="#ffe29a"/><stop offset="1" stop-color="#9c7020"/></linearGradient>' +
      '<linearGradient id="lab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#eef2fb"/></linearGradient></defs>' +
      '<g filter="url(#dsh)"><rect x="47" y="12" width="26" height="18" rx="3" fill="url(#gold)"/>' +
      [0, 1, 2, 3, 4].map(i => '<path d="M' + (50 + i * 5) + ' 14v14" stroke="#8a6418" stroke-opacity=".35" stroke-width="1.2"/>').join("") +
      '<path d="M50 30h20v6c0 2 4 3 6 5 3 3 4 6 4 10v48a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V51c0-4 1-7 4-10 2-2 6-3 6-5Z" fill="url(#amb)"/>' +
      '<rect x="40" y="58" width="40" height="32" fill="url(#lab)"/><rect x="40" y="58" width="40" height="7" fill="#3e63dd"/>' +
      '<path d="M47 73h26M47 80h16" stroke="#3e63dd" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M45 46c1-3 3-5 5-6M45 96V95" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<rect x="44" y="50" width="4" height="50" rx="2" fill="#fff" opacity=".18"/></g></svg>',
    // 후시딘: 알루미늄 연고 튜브
    ointment:
      '<svg viewBox="0 0 120 120" class="illu" aria-hidden="true"><defs>' + SH +
      '<linearGradient id="tube" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9dde4"/><stop offset=".35" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef0f4"/><stop offset="1" stop-color="#c3c9d2"/></linearGradient>' +
      '<linearGradient id="tcap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b2a8c"/><stop offset=".45" stop-color="#a26ee0"/><stop offset="1" stop-color="#4f2379"/></linearGradient></defs>' +
      '<g filter="url(#dsh)" transform="rotate(-32 60 62)"><path d="M37 16h46v4l-2 52c-.3 5-6 9-13 11H52c-7-2-12.7-6-13-11l-2-52Z" fill="url(#tube)"/>' +
      '<path d="M35 10h50v9H35Z" fill="#c9ced6"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(i => '<path d="M' + (38 + i * 6.2) + ' 10v9" stroke="#9aa2ad" stroke-width="1"/>').join("") +
      '<path d="M38.4 36h43.2l-1 22H39.4Z" fill="url(#tcap)"/><path d="M47 47h26" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="53" y="82" width="14" height="5" rx="1.5" fill="#cfd4dc"/><rect x="45" y="86" width="30" height="24" rx="5" fill="url(#tcap)"/>' +
      [0, 1, 2, 3].map(i => '<path d="M' + (51 + i * 6) + ' 89v18" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>').join("") +
      '<path d="M44 24v8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g></svg>',
    // 홈: 폰을 약 상자에 대는 장면
    tap:
      '<svg viewBox="0 0 240 160" class="illu" aria-hidden="true"><defs>' + SH +
      '<linearGradient id="phn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a3344"/><stop offset="1" stop-color="#0e131c"/></linearGradient>' +
      '<linearGradient id="scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8f3ea"/><stop offset="1" stop-color="#9ec5ff"/></linearGradient>' +
      '<linearGradient id="bx" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6eaf0"/></linearGradient></defs>' +
      '<ellipse cx="98" cy="150" rx="70" ry="6" fill="#1b2433" opacity=".1"/>' +
      '<g filter="url(#dsh)"><path d="M36 52 52 36h126l-12 16Z" fill="#f6f8fb"/><path d="M166 52l12-16v94l-12 16Z" fill="#d4dae2"/><rect x="30" y="52" width="136" height="94" rx="6" fill="url(#bx)"/><path d="M30 62a10 10 0 0 1 10-10h116a10 10 0 0 1 10 10v6H30Z" fill="#e9edf2"/>' +
      '<rect x="30" y="68" width="136" height="16" fill="#e5484d" opacity=".92"/><rect x="44" y="96" width="58" height="8" rx="4" fill="#2a3344" opacity=".8"/><rect x="44" y="110" width="40" height="6" rx="3" fill="#8592a6" opacity=".7"/>' +
      '<rect x="44" y="124" width="30" height="10" rx="5" fill="#0fa08f" opacity=".18"/>' +
      '<circle cx="136" cy="114" r="17" fill="#fff" stroke="#0fa08f" stroke-width="2" stroke-dasharray="4 3"/><path d="M131 109a6 6 0 0 1 0 10M135 106a10 10 0 0 1 0 16M139 103a14 14 0 0 1 0 22" stroke="#0fa08f" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>' +
      '<g class="tap-wave" stroke="#0fa08f" stroke-width="2.2" fill="none" opacity=".8"><circle cx="136" cy="114" r="24"/><circle cx="136" cy="114" r="32" opacity=".5"/></g>' +
      '<ellipse cx="140" cy="124" rx="14" ry="4" fill="#0e131c" opacity=".18"/><g class="tap-ph"><g filter="url(#dsh)" transform="translate(-8 4) rotate(-16 170 80)"><rect x="146" y="22" width="54" height="100" rx="12" fill="url(#phn)"/><rect x="150" y="27" width="46" height="90" rx="9" fill="url(#scr)"/>' +
      '<rect x="166" y="30" width="14" height="4" rx="2" fill="#0e131c"/><rect x="156" y="46" width="34" height="6" rx="3" fill="#fff" opacity=".92"/><rect x="156" y="56" width="24" height="4" rx="2" fill="#fff" opacity=".7"/><rect x="156" y="100" width="34" height="11" rx="5.5" fill="#0fa08f"/></g></g></svg>',
  };
})();

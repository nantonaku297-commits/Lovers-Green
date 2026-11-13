(function () {
  const C = window.SITE_CONFIG || {};
  const EVENTS = (window.EVENTS || []).slice();
  const SERIES = window.SERIES || [];
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Nav ----------
  const toggle = $(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );

  // ---------- Config ----------
  document.querySelectorAll("[data-config]").forEach((el) => (el.textContent = C[el.dataset.config] || ""));
  $("#year").textContent = new Date().getFullYear();
  const mail = $("#email-link");
  mail.textContent = C.email; mail.href = "mailto:" + C.email;
  if (C.epkUrl) { const e = $("#epk"); e.hidden = false; e.querySelector("a").href = C.epkUrl; }
  if (C.features && C.features.tickets) $("#tickets").hidden = false;

  // ---------- Events ----------
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const toDate = (e) => new Date(e.date + "T" + (e.open || "00:00") + ":00");
  const upcoming = EVENTS.filter((e) => new Date(e.date + "T23:59:59") >= today).sort((a, b) => toDate(a) - toDate(b));
  const past = EVENTS.filter((e) => new Date(e.date + "T23:59:59") < today).sort((a, b) => toDate(b) - toDate(a));
  const WD = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  function eventItem(e, isPast) {
    const d = new Date(e.date + "T00:00:00");
    const md = String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
    const badge = e.type === "own" ? '<span class="badge badge-own">主催</span>' : '<span class="badge badge-guest">出演</span>';
    const meta = [e.open && "OPEN " + e.open, e.venue, e.city, e.price].filter(Boolean).map(esc).join(" / ");
    const lineup = e.lineup && e.lineup.length ? "<br>Lineup: " + e.lineup.map(esc).join(", ") : "";
    const acts = [];
    if (!isPast && e.ticketUrl && C.features && C.features.tickets) acts.push(`<a class="btn btn-primary" href="${esc(e.ticketUrl)}" target="_blank" rel="noopener">チケット</a>`);
    if (e.infoUrl) acts.push(`<a class="btn btn-ghost" href="${esc(e.infoUrl)}" target="_blank" rel="noopener">詳細</a>`);
    return `<li class="event">
      <div class="event-date"><span class="md">${md}</span><span class="y">${d.getFullYear()} ${WD[d.getDay()]}</span></div>
      <div><p class="event-title">${badge}${esc(e.title)}</p><p class="event-meta">${meta}${lineup}</p>${e.note ? `<p class="event-note">${esc(e.note)}</p>` : ""}</div>
      <div class="event-actions">${acts.join("")}</div>
      ${e.flyer ? `<a href="${esc(e.flyer)}" target="_blank" rel="noopener"><img class="event-flyer" src="${esc(e.flyer)}" alt="${esc(e.title)} flyer" loading="lazy"></a>` : ""}
    </li>`;
  }
  function renderEvents(which) {
    const list = which === "past" ? past : upcoming;
    $("#event-list").innerHTML = list.length
      ? list.map((e) => eventItem(e, which === "past")).join("")
      : `<li class="empty">${which === "past" ? "過去のイベントはまだありません。" : "次回の予定は近日発表します。SNSをフォローしてお待ちください。"}</li>`;
  }
  document.querySelectorAll(".filter button").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".filter button").forEach((x) => x.classList.toggle("is-active", x === b));
      renderEvents(b.dataset.filter);
    })
  );
  const startTab = upcoming.length ? "upcoming" : "past";
  document.querySelectorAll(".filter button").forEach((x) => x.classList.toggle("is-active", x.dataset.filter === startTab));
  renderEvents(startTab);

  // Flyer archive (新しい順)
  $("#flyers").innerHTML = EVENTS.filter((e) => e.flyer)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((e) => `<a href="${esc(e.flyer)}" target="_blank" rel="noopener"><img src="${esc(e.flyer)}" alt="${esc(e.title)}" loading="lazy"><span>${esc(e.date.replace(/-/g, "."))}</span></a>`)
    .join("");

  // Next event + countdown
  const next = upcoming[0];
  if (next) {
    const box = $("#next-event");
    box.hidden = false;
    box.innerHTML = `<b>NEXT</b><span>${esc(next.date.replace(/-/g, "."))} ${esc(next.title)} @ ${esc(next.venue)}</span><span class="countdown" id="cd"></span>`;
    const tick = () => {
      const ms = toDate(next) - new Date();
      if (ms <= 0) { $("#cd").textContent = "TONIGHT"; return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
      $("#cd").textContent = `${d}D ${String(h).padStart(2, "0")}H ${String(m).padStart(2, "0")}M`;
    };
    tick(); setInterval(tick, 30000);
  }

  // Structured data (Googleの検索結果にイベントが出やすくなる)
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "MusicGroup", name: C.name, genre: "Reggae", sameAs: Object.values(C.sns || {}).filter(Boolean) },
      ...upcoming.map((e) => ({
        "@type": "MusicEvent", name: e.title, startDate: e.date + "T" + (e.open || "00:00"),
        eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: e.venue, address: e.city },
        performer: (e.lineup || []).map((n) => ({ "@type": "PerformingGroup", name: n })),
        ...(e.ticketUrl ? { offers: { "@type": "Offer", url: e.ticketUrl } } : {})
      }))
    ]
  };
  const s = document.createElement("script");
  s.type = "application/ld+json"; s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);

  // ---------- Series ----------
  $("#series").innerHTML = SERIES.map((x) =>
    `<article class="card"><span class="freq">${esc(x.freq)}</span><h3>${esc(x.name)}</h3><p>${esc(x.desc)}</p></article>`
  ).join("");

  // ---------- Mix ----------
  const mixes = C.mixEmbeds || [];
  $("#mixes").innerHTML = mixes.length
    ? mixes.map((u) => `<iframe loading="lazy" allow="autoplay" src="${esc(u)}" title="Mix"></iframe>`).join("")
    : '<div class="placeholder">Mix 準備中。SoundCloud / Mixcloud の埋め込みURLを config.js に追加すると表示されます。</div>';

  // ---------- SNS ----------
  const ICON = {
    instagram: ["Instagram", "M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.3 2.3 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15 2 14.7 2 12 2z"],
    x: ["X", "M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"],
    tiktok: ["TikTok", "M16.6 2h-3.3v13.4a2.9 2.9 0 11-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 105.3 6.2V8.6a7.6 7.6 0 004.4 1.4V6.7a4.4 4.4 0 01-4.4-4.7z"],
    youtube: ["YouTube", "M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.6 12 31 31 0 001 16.8a3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-4.8 31 31 0 00-.4-4.8zM9.7 15V9l5.8 3-5.8 3z"],
    soundcloud: ["SoundCloud", "M1 15.5l.4-2.5-.4-2.6c0-.1-.1-.2-.2-.2s-.2.1-.2.2L.2 13l.4 2.5c0 .1.1.2.2.2s.2-.1.2-.2zm2.2 1.3l.5-3.8-.5-3.9c0-.1-.1-.2-.2-.2s-.2.1-.2.2L2.4 13l.4 3.8c0 .1.1.2.2.2s.2-.1.2-.2zm2.3.3l.4-4.1-.4-5.5c0-.2-.1-.3-.3-.3s-.3.1-.3.3l-.4 5.5.4 4.1c0 .2.1.3.3.3s.3-.1.3-.3zm2.3 0l.4-4.1-.4-6.3c0-.2-.2-.4-.4-.4s-.4.2-.4.4l-.3 6.3.3 4.1c0 .2.2.4.4.4s.4-.2.4-.4zm2.4 0l.3-4.1-.3-7.6c0-.3-.2-.5-.5-.5s-.5.2-.5.5L9.2 13l.3 4.1c0 .3.2.5.5.5s.5-.2.5-.5zm9.2-7.6c-.4 0-.8.1-1.2.2A5.4 5.4 0 0013.1 5c-.4 0-.8.1-1.1.2-.2.1-.2.2-.2.4v11.6c0 .2.2.4.4.4h7.6a3.2 3.2 0 000-6.4z"],
    mixcloud: ["Mixcloud", "M20.5 9.2a5 5 0 00-9.6-1.5 3.9 3.9 0 00-5 3.7v.2A3.4 3.4 0 006.4 18h12.4a4.1 4.1 0 001.7-8.8zm-1.7 7.3H6.4a1.9 1.9 0 010-3.8h.9l-.1-1.3a2.4 2.4 0 014.6-1l.7 1.5.6-1.6a3.5 3.5 0 016.7 1l.1.8.7.3a2.6 2.6 0 01-1.8 4.1z"],
    line: ["LINE", "M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s6-3.5 8.2-6.1C21.6 14.5 22 12.8 22 11c0-4.4-4.5-8-10-8zM8.3 13.4H6.4c-.3 0-.5-.2-.5-.5V9.1c0-.3.2-.5.5-.5s.5.2.5.5v3.3h1.4c.3 0 .5.2.5.5s-.2.5-.5.5zm2 -.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9.1c0-.3.2-.5.5-.5s.5.2.5.5v3.8zm4.6 0c0 .2-.1.4-.3.5h-.2c-.2 0-.3-.1-.4-.2l-1.9-2.6v2.3c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9.1c0-.2.1-.4.3-.5h.2c.2 0 .3.1.4.2l1.9 2.6V9.1c0-.3.2-.5.5-.5s.5.2.5.5v3.8zm3.1-2.4c.3 0 .5.2.5.5s-.2.5-.5.5h-1.4v.9H18c.3 0 .5.2.5.5s-.2.5-.5.5h-1.9c-.3 0-.5-.2-.5-.5V9.1c0-.3.2-.5.5-.5H18c.3 0 .5.2.5.5s-.2.5-.5.5h-1.4v.9H18z"]
  };
  const links = Object.entries(C.sns || {}).filter(([, u]) => u);
  const snsHtml = links.map(([k, u]) =>
    `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${ICON[k][0]}"><svg viewBox="0 0 24 24"><path d="${ICON[k][1]}"/></svg><span>${ICON[k][0]}</span></a>`
  ).join("");
  $("#sns").innerHTML = snsHtml || '<p class="small">SNSアカウントは準備中です。</p>';
  $("#sns-footer").innerHTML = snsHtml;


  // ---------- Rental ----------
  const R = C.rental;
  if (R) {
    $("#rental-lead").textContent = R.lead || "";
    $("#rental-scenes").innerHTML = (R.scenes || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const priceRow = (x) => `<li><span class="pl-name">${esc(x.name)}<small>${esc(x.detail || "")}</small></span><span class="pl-dots"></span><b>${esc(x.price)}</b></li>`;
    $("#rental-sets").innerHTML = (R.sets || []).map(priceRow).join("");
    $("#rental-items").innerHTML = (R.items || []).map(priceRow).join("");
    if (R.pa) {
      $("#rental-pa-price").textContent = R.pa.price || "";
      $("#rental-pa-desc").textContent = R.pa.desc || "";
      $("#rental-pa").innerHTML = (R.pa.items || []).map((x) => `<li>${esc(x)}</li>`).join("");
    }
    $("#rental-for").innerHTML = (R.forWho || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const photos = R.photos || [];
    $("#rental-photos").innerHTML = photos.length
      ? photos.map((p) => `<a href="${esc(p.src)}" target="_blank" rel="noopener"><img src="${esc(p.src)}" alt="${esc(p.alt || "機材写真")}" loading="lazy"></a>`).join("")
      : ["Speaker", "DJ Controller", "Mixer"].map((t) => `<div class="photo-soon"><b>${t}</b><span>写真 準備中</span></div>`).join("");
    const dm = $("#rental-dm");
    if (R.dm) dm.href = R.dm; else dm.remove();
    $("#rental-note").textContent = R.note || "";
  } else {
    $("#rental").hidden = true;
  }

  // 「フォームで問い合わせる」で依頼の種類を自動選択
  document.querySelectorAll("[data-booking-type]").forEach((a) =>
    a.addEventListener("click", () => {
      const sel = document.querySelector('#booking-form select[name="type"]');
      if (sel) sel.value = a.dataset.bookingType;
    })
  );

  // ---------- Instagram ----------
  const ig = (C.sns || {}).instagram;
  if (ig) { $("#ig-phone").href = ig; $("#ig-handle").href = ig; }

  // ---------- Booking form ----------
  const form = $("#booking-form"), status = $("#form-status");
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    if (!C.formEndpoint) {
      const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${C.email}?subject=${encodeURIComponent("[Booking] " + data.get("type"))}&body=${encodeURIComponent(body)}`;
      return;
    }
    status.textContent = "送信中...";
    try {
      const r = await fetch(C.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!r.ok) throw 0;
      form.reset();
      status.textContent = "送信しました。数日以内にご連絡します。";
    } catch {
      status.textContent = "送信できませんでした。お手数ですがメールでご連絡ください。";
    }
  });
})();

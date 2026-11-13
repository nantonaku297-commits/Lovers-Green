// ===== HERO：トラック × フライヤーのスクロール演出 =====
// スクロール量に合わせて道路と看板（フライヤー）が流れ、トラックが走っているように見せる。
// フライヤーは events.js の EVENTS から古い順に自動で並びます。
(function () {
  const section = document.getElementById("drive");
  if (!section) return;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const track = $("drive-track"), road = $("drive-road"), palms = $("drive-palms");
  const truck = $("drive-truck"), title = $("drive-title"), caption = $("drive-caption");
  const endBox = $("drive-end"), bar = $("drive-bar"), hint = $("drive-hint");
  const wheels = truck.querySelectorAll(".wheel");

  const shows = (window.EVENTS || []).filter((e) => e.flyer).sort((a, b) => a.date.localeCompare(b.date));
  const n = shows.length;

  track.innerHTML = shows.map((e, i) => `
    <figure class="board" data-i="${i}">
      <div class="board-frame"><img src="${esc(e.flyer)}" alt="${esc(e.title)}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></div>
      <figcaption><b>No.${String(i + 1).padStart(2, "0")}</b>${esc(e.date.replace(/-/g, "."))}</figcaption>
    </figure>`).join("");
  const boards = [...track.querySelectorAll(".board")];

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches || !n) { section.classList.add("is-static"); return; }

  // スクロールの長さ：フライヤー1枚につき画面0.45枚分
  const setHeight = () => { section.style.height = `${Math.round((1.5 + n * 0.45) * 100)}svh`; };
  setHeight();

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const T_START = 0.05, T_END = 0.86;   // フライヤーが流れる区間
  const INTRO_MS = 1900;
  let introStart = performance.now();
  let vw = 0, vh = 0, gap = 0, bw = 0, wheelR = 0, lastActive = -1, ticking = false;

  function measure() {
    vw = window.innerWidth; vh = window.innerHeight;
    bw = boards[0].offsetWidth;
    gap = bw + Math.max(40, vw * 0.06);
    boards.forEach((b, i) => (b.style.left = `${i * gap}px`));
    // SVG上のタイヤ半径46 → 画面上のpx
    wheelR = 46 * (truck.querySelector("svg").getBoundingClientRect().width / 1400) || 20;
    update();
  }

  function setCaption(i) {
    if (i === lastActive) return;
    lastActive = i;
    boards.forEach((b, k) => b.classList.toggle("is-active", k === i));
    if (i < 0) { caption.classList.remove("is-on"); return; }
    const e = shows[i];
    const place = [e.venue, e.city].filter(Boolean).join(" / ");
    caption.innerHTML = `<span class="cap-no">No.${String(i + 1).padStart(2, "0")}<em>/ ${String(n).padStart(2, "0")}</em></span>
      <span class="cap-date">${esc(e.date.replace(/-/g, "."))}</span>
      <span class="cap-title">${esc(e.title)}</span>${place ? `<span class="cap-place">${esc(place)}</span>` : ""}`;
    caption.classList.add("is-on");
  }

  function update() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - vh;
    const p = clamp(-rect.top / (total || 1));
    const t = clamp((p - T_START) / (T_END - T_START));

    // 看板の列：最初は画面の右外、最後は左外へ
    const travel = vw + (n - 1) * gap + bw + 60;
    const x = vw - t * travel;
    track.style.transform = `translate3d(${x}px,0,0)`;
    road.style.backgroundPositionX = `${x}px`;
    palms.style.backgroundPositionX = `${x * 0.35}px`;

    // 最後はトラックが右へ走り去る
    const exit = smooth(T_END + 0.02, 1, p);
    const k = clamp((performance.now() - introStart) / INTRO_MS);
    const intro = (1 - k) ** 3; // 1→0 で減速しながら到着
    const truckX = exit * exit * vw * 1.1 - intro * vw * 0.95;
    truck.style.setProperty("--tx", `${truckX}px`);
    const deg = ((-x + truckX) / wheelR) * (180 / Math.PI);
    wheels.forEach((w) => (w.style.transform = `rotate(${deg}deg)`));

    // 画面の右寄りを通過中のフライヤーを強調
    const focus = vw * (vw < 700 ? 0.5 : 0.62);
    // 最後に通過したフライヤーを表示し続ける（間が空いても消えない）
    let active = -1;
    if (t > 0 && t < 0.985) {
      boards.forEach((b, i) => { if (x + i * gap + bw / 2 <= focus + gap * 0.5) active = i; });
    }
    setCaption(active);

    title.style.opacity = 1 - smooth(0.005, 0.05, p);
    title.style.transform = `translateY(${-smooth(0, 0.06, p) * 40}px)`;
    hint.style.opacity = 1 - smooth(0.0, 0.03, p);
    const endOn = smooth(T_END + 0.05, 0.99, p);
    endBox.style.opacity = endOn;
    endBox.style.transform = `translateY(${(1 - endOn) * 30}px)`;
    endBox.style.pointerEvents = endOn > 0.6 ? "auto" : "none";
    bar.style.transform = `scaleX(${p})`;
    section.classList.toggle("is-moving", t > 0 && t < 1);
  }

  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { setHeight(); measure(); });
  window.addEventListener("load", measure);
  measure();
  // 最初にトラックが左から走ってくる（タイヤも回る）
  introStart = performance.now();
  const introLoop = () => { update(); if (performance.now() - introStart < INTRO_MS + 50) requestAnimationFrame(introLoop); };
  requestAnimationFrame(introLoop);
})();

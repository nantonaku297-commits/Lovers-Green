// ===== 試作：ベースで揺れる波形とスピーカー =====
// 音は鳴らさず、ワンドロップ（約76BPM、3拍目にキック）のリズムで画面だけ揺らす。
// スクロールの勢いでも少し大きく揺れる。config.js の features.bassFx=false で非表示。
(function () {
  const C = window.SITE_CONFIG || {};
  const box = document.getElementById("bass");
  if (!box || !(C.features && C.features.bassFx)) return;
  box.hidden = false;

  const wall = document.getElementById("bass-wall");
  const SPEAKERS = window.innerWidth < 700 ? 4 : 6;
  wall.innerHTML = Array.from({ length: SPEAKERS }, (_, i) =>
    `<div class="cab${i % 3 === 1 ? " cab-top" : ""}"><span class="cone cone-s"></span><span class="cone cone-l"></span></div>`
  ).join("");

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const canvas = document.getElementById("bass-wave");
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, visible = false, lastY = window.scrollY, push = 0;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);

  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible) requestAnimationFrame(loop);
  }).observe(box);

  window.addEventListener("scroll", () => {
    push = Math.min(1, push + Math.abs(window.scrollY - lastY) / 600);
    lastY = window.scrollY;
  }, { passive: true });

  const BEAT = 60 / 76;
  // ベースラインの8分音符ごとの強さ（2小節）
  const LINE = [1, 0, .6, .8, 0, .7, .5, 0, 1, 0, .6, 0, .9, .6, .4, 0];
  const COLORS = ["#a9d8e8", "#f5b4c8", "#f2b632"];

  function loop(now) {
    if (!visible) return;
    const s = now / 1000;
    const inBar = (s % (BEAT * 4)) / BEAT;          // 0〜4
    const kick = Math.exp(-Math.max(0, inBar - 2) * 7) * (inBar >= 2 ? 1 : 0); // 3拍目
    const step = Math.floor(s / (BEAT / 2)) % LINE.length;
    const stepT = (s % (BEAT / 2)) / (BEAT / 2);
    const bass = LINE[step] * Math.exp(-stepT * 3.5);
    push *= 0.94;
    const energy = Math.min(1.4, kick * 0.9 + bass * 0.5 + push * 0.6);

    box.style.setProperty("--kick", kick.toFixed(3));
    box.style.setProperty("--bass", bass.toFixed(3));

    ctx.clearRect(0, 0, w, h);
    const mid = h / 2;
    COLORS.forEach((c, k) => {
      ctx.beginPath();
      ctx.lineWidth = k === 2 ? 3 : 2;
      ctx.strokeStyle = c;
      ctx.globalAlpha = k === 2 ? 0.95 : 0.55;
      const amp = (h * 0.38) * (0.25 + energy) * (1 - k * 0.18);
      for (let x = 0; x <= w; x += 4) {
        const u = x / w;
        const env = Math.sin(Math.PI * u);           // 両端は細く
        const y = mid
          + Math.sin(u * 9 + s * 2.2 + k) * amp * 0.55 * env
          + Math.sin(u * 23 - s * 3.1 + k * 2) * amp * 0.25 * env * (0.4 + kick)
          + Math.sin(u * 51 + s * 7) * amp * 0.08 * env * bass;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
})();

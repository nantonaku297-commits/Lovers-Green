// ===== スケジュール =====
// 1件ずつ追加するだけで、日付が過ぎたものは自動で「Past」に移ります。
// type: "own"（主催）/ "guest"（出演）
// ticketUrl: 将来の前売り券リンク。空なら非表示。
window.EVENTS = [
  {
    date: "2026-12-12",
    open: "22:00",
    title: "サンプル：LOVER'S GREEN NIGHT vol.1",
    venue: "会場名（仮）",
    city: "Tokyo",
    type: "own",
    lineup: ["LOVER'S GREEN", "Guest DJ"],
    price: "Door ¥2,500 / 1D",
    ticketUrl: "",
    infoUrl: "",
    note: "これはサンプルです。events.js を編集して差し替えてください。"
  },
  {
    date: "2027-01-18",
    open: "18:00",
    title: "サンプル：ゲスト出演イベント",
    venue: "会場名（仮）",
    city: "Yokohama",
    type: "guest",
    lineup: ["LOVER'S GREEN", "and more"],
    price: "",
    ticketUrl: "",
    infoUrl: "",
    note: ""
  },
  {
    date: "2026-10-03",
    open: "21:00",
    title: "サンプル：過去のイベント",
    venue: "会場名（仮）",
    city: "Tokyo",
    type: "own",
    lineup: ["LOVER'S GREEN"],
    price: "",
    ticketUrl: "",
    infoUrl: "",
    note: ""
  }
];

// ===== 主催イベントシリーズの紹介 =====
window.SERIES = [
  {
    name: "LOVER'S GREEN NIGHT",
    desc: "自分たちのサウンドで一晩を組み立てる主催パーティー。ルーツからダンスホールまで。",
    freq: "不定期開催"
  },
  {
    name: "Sunday Roots（仮）",
    desc: "昼間に気軽に遊べるデイイベント。初めてレゲエに触れる人にも来てほしい場。",
    freq: "企画中"
  }
];

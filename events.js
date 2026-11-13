// ===== スケジュール =====
// 1件ずつ追加するだけで、日付が過ぎたものは自動で「Past」に移ります。
// type: "own"（主催）/ "guest"（出演）
// flyer: flyersフォルダの画像。空なら非表示。
// ticketUrl: 将来の前売り券リンク。空なら非表示。
window.EVENTS = [
  {
    date: "2024-09-14", open: "19:30", close: "21:30",
    title: "Lover's Green DJ Cruising Party vol.1",
    venue: "みなとみらい ぷかり桟橋", city: "Yokohama", type: "own",
    lineup: ["YUKI", "RAKU", "and more"],
    note: "Photo: Yuto / Tokiharu / Ryunosuke",
    price: "¥12,000（Drink Free / 120名限定）",
    flyer: "flyers/2024-09-14.jpg"
  },
  {
    date: "2024-11-02", open: "18:00", close: "23:00",
    title: "LOVER'S GREEN vol.2 DJ Halloween Party",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["Raku", "Rin", "Taneto", "Takeru", "Yuki", "3cats"],
    note: "Photo: Yuto / Tokiharu / Ryunosuke",
    price: "Door F ¥2,500 / M ¥3,000",
    flyer: "flyers/2024-11-02.jpg"
  },
  {
    date: "2025-02-07", open: "20:00", close: "25:00",
    title: "LOVER'S GREEN MUSIC PARTY",
    venue: "PALMNY HOUSE", city: "Chigasaki", type: "own",
    lineup: ["Sweety Dogg", "Seed Man", "Dengg"],
    price: "",
    flyer: "flyers/2025-02-07.jpg"
  },
  {
    date: "2025-03-01", open: "17:00", close: "22:30",
    title: "LOVER'S GREEN MUSIC PARTYYY -Be Happy-",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["Sweetydogg", "Luna", "Yzn", "Kosa (LIVE)", "3cats", "Seedman & F.P Journey", "Raku"],
    price: "",
    flyer: "flyers/2025-03-01.jpg"
  },
  {
    date: "2025-04-25", open: "17:30", close: "22:00",
    title: "LOVER'S GREEN",
    venue: "楽園（ブランチ茅ヶ崎2 1F）", city: "Chigasaki", type: "own",
    lineup: ["Seedman", "Raku", "HIGH SOUND", "Goodmawning"],
    price: "¥4,000",
    note: "Special Guest Live / Used & Flea Market: Tsukihi, Sakaken / Food: Bistro楽, 楽園 / Photo: Yuto",
    flyer: "flyers/2025-04-25.jpg"
  },
  {
    date: "2025-08-09", open: "17:00", close: "22:45",
    title: "LOVER'S GREEN",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["Youth of Roots (Band Live Showcase)", "Seedman", "Raku", "High Sound", "Goodmawning", "Sweetydogg", "Zion"],
    note: "Photo: Yuto",
    price: "¥3,500",
    flyer: "flyers/2025-08-09.jpg"
  },
  {
    date: "2025-09-20", open: "15:00", close: "22:15",
    title: "LOVER'S GREEN 1st Anniversary Dance Party",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["KING LIFE STAR (Special Guest)", "Sweetydogg", "K3", "yui", "Luna", "yuzan", "zion", "4CATS", "Kippei", "Seedman", "Raku"],
    price: "¥3,000",
    note: "Live Paint: Ken / Photo: Yuto, Dara",
    flyer: "flyers/2025-09-20.jpg"
  },
  {
    date: "2026-01-17", open: "14:00", close: "22:00",
    title: "LOVER'S GREEN ネオトキワ未来ツアー横浜編",
    venue: "BACKYARD Brooklyn Park Yokohama", city: "Yokohama", type: "own",
    lineup: ["Neo Tokiwa (Special Guest Live)", "Wency", "ruca with Yuten", "KING LIFE STAR (Sound System)", "Ace Souljah fr Cool Runnings", "Yuzan", "Sweetydogg", "Zion fr Cool Runnings", "Seedman", "High Sound", "Luna", "Kippei"],
    note: "Neo Tokiwa: Zendaman, SOMAJI, Jr.SANTA, ARIWA, Yoppy, U the Star, Tanzi",
    price: "¥2,500（14:00-15:00 限定100名）/ ¥4,000",
    flyer: "flyers/2026-01-17.jpg"
  },
  {
    date: "2026-07-04", open: "16:00", close: "23:00",
    title: "LOVER'S GREEN",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["ZENDAMAN ONEDER (Special Guest Live)", "Narse (Live)", "Sweetydogg", "kippei", "YZN", "Father Bros", "CLUCHAUS", "IBJ", "MAPO"],
    note: "MC: Zion, Seedman / PA & System: 三四音響 / Food: Bistro楽",
    price: "¥3,000（16:00-18:00）/ ¥3,500（18:00-）",
    flyer: "flyers/2026-07-04.jpg"
  },
  {
    date: "2026-10-10", open: "16:00", close: "23:00",
    title: "LOVER'S GREEN 2",
    venue: "Frequency Chigasaki", city: "Chigasaki", type: "own",
    lineup: ["Youth of Roots (Special Guest)", "Yoppy (Special Guest)", "King Life Star", "Madmyaz", "Lover's Green Sound", "IBJ", "Kippei", "YZN", "Zion"],
    price: "¥3,500（Lover's Green IG Follower）",
    note: "Sound System: 三四音響 / Photo: Shunsuke, Sousuke / Supported by HABUSH",
    flyer: "flyers/2026-10-10.jpg"
  },
  {
    date: "2026-11-09", open: "16:00", close: "21:00",
    title: "GREEN MONDAY グリマン",
    venue: "", city: "", type: "own",
    lineup: ["Lovers Green & Friends"],
    price: "ADM ¥1,000",
    note: "21:00からLounge Time",
    flyer: "flyers/2026-11-09.jpg"
  }
];

// ===== 主催イベントシリーズの紹介 =====
window.SERIES = [
  {
    name: "LOVER'S GREEN",
    desc: "Frequency Chigasakiを中心に開いているメインパーティー。ゲストのライブとDJ / サウンドで夕方から夜まで。",
    freq: "Main Party"
  },
  {
    name: "DJ Cruising Party",
    desc: "横浜みなとみらいの船上で開いたクルージングパーティー。LOVER'S GREENの始まりのイベント。",
    freq: "Since 2024"
  },
  {
    name: "GREEN MONDAY",
    desc: "Lovers Green & Friendsによる月曜のパーティー。",
    freq: "Monday Party"
  }
];

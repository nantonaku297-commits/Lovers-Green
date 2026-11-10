// ===== サイト全体の設定 =====
// ここを書き換えるだけでSNSリンクや連絡先が全ページに反映されます。
window.SITE_CONFIG = {
  name: "LOVER'S GREEN",
  tagline: "Reggae Sound System & DJ",
  base: "Tokyo, Japan", // 活動拠点（未確定）

  // 問い合わせ先メール（フォームが使えない時の予備）
  email: "booking@example.com",

  // Formspree（https://formspree.io）で発行したエンドポイント。
  // 空のままだとフォーム送信時にメールアプリが開きます。
  formEndpoint: "",

  // SNS。空欄のものは表示されません。
  sns: {
    instagram: "",
    x: "",
    tiktok: "",
    youtube: "",
    soundcloud: "",
    mixcloud: "",
    line: ""
  },

  // Mixの埋め込み（SoundCloud / Mixcloud の埋め込みURL）。空なら準備中表示。
  mixEmbeds: [
    // "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/xxxx/xxxx"
  ],

  // プレスキット（EPK）のPDFなど。空なら非表示。
  epkUrl: "",

  // 将来機能のフラグ
  features: {
    tickets: false // trueにするとチケット欄が表示されます
  }
};

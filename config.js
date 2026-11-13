// ===== サイト全体の設定 =====
// ここを書き換えるだけでSNSリンクや連絡先が全ページに反映されます。
window.SITE_CONFIG = {
  name: "LOVER'S GREEN",
  tagline: "Reggae Sound System & DJ",
  base: "From Chigasaki, Shonan",

  // 問い合わせ先メール（フォームが使えない時の予備）
  email: "loversgreen0914@gmail.com",

  // Formspree（https://formspree.io）で発行したエンドポイント。
  // 空のままだとフォーム送信時にメールアプリが開きます。
  formEndpoint: "",

  // SNS。空欄のものは表示されません。
  sns: {
    instagram: "https://www.instagram.com/lovers__green/",
    x: "",
    tiktok: "https://www.tiktok.com/@lovers__green",
    youtube: "",
    soundcloud: "",
    mixcloud: "",
    line: ""
  },

  // Mixの埋め込み（SoundCloud / Mixcloud の埋め込みURL）。空なら準備中表示。
  mixEmbeds: [
    // "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/xxxx/xxxx"
  ],

  // Instagramのリール動画。URLを追加するとMix欄に並びます。
  videos: [
    "https://www.instagram.com/reel/Dbpd-C0RRCP/"
  ],

  // プレスキット（EPK）のPDFなど。空なら非表示。
  epkUrl: "",

  // ===== 機材レンタル =====
  // 料金や機材を変えたらここを書き換えるだけでサイトに反映されます。
  rental: {
    lead: "Lover's GreenのサウンドシステムとDJ機材をレンタルしています。小さなパーティーから大きなイベントまで、はじめの一歩をサポートします。",
    scenes: ["イベント・パーティー", "野外でのDJ", "プライベート利用"],
    sets: [
      { name: "DJセット", detail: "DDJ-REV5 + MG10XU + マイク", price: "¥10,000" },
      { name: "フルセット", detail: "スピーカー2台 + DDJ-REV5 + MG10XU + マイク", price: "¥15,000" }
    ],
    items: [
      { name: "スピーカー 1台", detail: "Mackie Thump212XT", price: "¥4,000" },
      { name: "スピーカー 2台セット", detail: "Mackie Thump212XT", price: "¥7,000" },
      { name: "DJコントローラー", detail: "Pioneer DJ DDJ-REV5", price: "¥7,000" },
      { name: "ミキサー", detail: "YAMAHA MG10XU", price: "¥3,000" },
      { name: "マイク", detail: "SHURE SM58SE", price: "¥2,000" }
    ],
    pa: {
      price: "レンタル料金に +¥15,000 / 1日",
      desc: "Lover's Greenが当日の音響をサポートします。",
      items: ["機材の搬入・設置・接続", "音出しチェック・音量調整", "イベント中のPA（音響オペレーション）", "終了後の撤収"]
    },
    forWho: [
      "イベントを主催していて、音響を追加したい",
      "プライベートヴィラやレンタルスペースでパーティーをしたい",
      "自分たちでイベントをやってみたい",
      "DJを始めてみたい",
      "機材はないけど音を鳴らしたい"
    ],
    // 機材の写真。rentalフォルダに画像を入れて { src: "rental/xxx.jpg", alt: "説明" } の形で追加。
    // 空の間は「準備中」の枠が表示されます。
    photos: [],
    dm: "https://ig.me/m/lovers__green",
    note: "料金はすべて1日あたり。機材単体のレンタルもOK。設営・PAサポートもご相談ください。"
  },

  // 将来機能のフラグ
  features: {
    tickets: false, // trueにするとチケット欄が表示されます
    bassFx: true    // 試作中の「ベースで揺れる波形とスピーカー」。不要ならfalse
  }
};

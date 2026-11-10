# LOVER'S GREEN Official Website

Reggae Sound System & DJ「LOVER'S GREEN」の公式サイト。GitHub Pagesで公開する静的サイトです。

## 更新方法

| やりたいこと | 編集するファイル |
|---|---|
| イベントを追加・変更 | `events.js` の `EVENTS` |
| 主催イベントの紹介 | `events.js` の `SERIES` |
| SNSリンク・メール・Mix | `config.js` |
| 文章（About など） | `index.html` |
| 色・デザイン | `style.css` |

日付が過ぎたイベントは自動で「Past」に移動します。

## 問い合わせフォーム

1. https://formspree.io で無料登録し、フォームを作成
2. 発行されたURL（`https://formspree.io/f/xxxx`）を `config.js` の `formEndpoint` に貼る

未設定の間は、送信ボタンでメールアプリが開きます。

## 将来の機能（前売券・予約）

- `config.js` の `features.tickets` を `true` にする
- 各イベントの `ticketUrl` に販売ページ（Peatix、ZAIKO、e+ など）のURLを入れる

これでスケジュールに「チケット」ボタンが出ます。

## 公開（GitHub Pages）

Settings → Pages → Branch を `main` / `/ (root)` にして Save。

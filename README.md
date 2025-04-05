# MarkXdown 📝

**MarkXdown** は、X（旧Twitter）の投稿とそのリプライ、画像や動画リンクを含めて抽出し、Markdown形式で保存・コピーできる Chrome 拡張機能です。

---

## 🔧 主な機能

- 投稿ページを開いた状態で拡張機能を起動すると：
  - 投稿本文と全リプライを取得
  - 添付画像を Markdown の `![]()` 形式で埋め込み
  - 動画付き投稿は、サムネイル画像と投稿リンクを表示
- コピー & `.md` 形式でダウンロード保存が可能

---

## 🚀 使い方

1. このリポジトリをクローン or ダウンロード
2. Chrome の `拡張機能` ページへアクセス（`chrome://extensions/`）
3. 右上の「デベロッパーモード」を ON
4. 「パッケージ化されていない拡張機能を読み込む」 → `MarkXdown` フォルダを選択
5. Xの投稿詳細ページを開いて、拡張機能アイコンをクリック！

---

## 🖼 出力例（Markdown）

```markdown
今日の海、最高だった🌊

![](https://pbs.twimg.com/media/sample1.jpg)

---

これはバズりそうな動画！

![](https://pbs.twimg.com/amplify_video_thumb/sample_video.jpg)
[動画はこちら](https://x.com/username/status/1234567890123456789)
```

---

📂 ファイル構成

MarkXdown/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
└── icon.png

---

📌 注意点

- X（Twitter）は DOM 構造が頻繁に変わるため、動作しなくなる可能性があります。その際は popup.js のセレクタを更新してください。
- 動画の埋め込みそのものはMarkdownでは不可能なため、サムネイルとリンクで対応しています。
- 非公開アカウントの投稿やログイン状態に依存するリプライは取得できない場合があります。

---

✅ 今後の予定（アイデア募集中）

- 投稿の時刻や投稿者情報の埋め込み
- 画像や動画のローカル保存
- Obsidian向けテンプレート対応

---

📜 ライセンス

MIT License

---

🙌 作者

ayumu

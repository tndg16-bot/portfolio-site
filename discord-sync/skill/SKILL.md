# Discord Sync Skill

## 概要
朝9:00と夜21:00に自動チェックインし、今日の振り返りを促してObsidianに自動記録するスキルです。

## 目標
- 10分/日節約
- Discordでの定期的なチェックインを自動化
- 振り返りをObsidianに自動保存

## 機能
1. **朝のチェックイン (9:00)**
   - Discordチャンネルに朝の挨拶メッセージを送信
   - 今日の予定を振り返るよう促す

2. **夜の振り返り (21:00)**
   - Discordチャンネルに夜の挨拶メッセージを送信
   - 今日の振り返りを促す

3. **Obsidianへの自動保存**
   - ユーザーの返信をキャプチャ
   - Obsidianのdaily notesに追記

## 使用方法

### 手動実行
```bash
node index.js
```

### Cronジョブ設定
```json
{
  "name": "discord-sync",
  "schedule": "0 9,21 * * *",
  "command": "node portfolio-site/discord-sync/skill/index.js",
  "enabled": true,
  "description": "Discord自動チェックインとObsidian同期",
  "timezone": "Asia/Tokyo"
}
```

## 設定ファイル (config.json)
```json
{
  "dailyNotesPath": "D:/AntigravityVault/daily",
  "discordChannel": "#秘書さんの部屋",
  "morningMessage": "🌅 おはようございます！今日の予定を振り返りましょう。",
  "eveningMessage": "🌙 おやすみなさい！今日の振り返りをしましょう。",
  "checkInTimes": ["09:00", "21:00"],
  "timezone": "Asia/Tokyo"
}
```

## 環境変数
- `OBSIDIAN_DAILY_NOTES_PATH`: Obsidianのdaily notesパス（config.jsonで上書き可能）
- `DISCORD_CHANNEL_ID`: DiscordチャンネルID（オプション）

## テスト
```bash
# テスト実行
node test.js
```

## 依存関係
- Node.js >= 18
- fs (ファイルシステム)
- message API (Discord送信)
- cron-schedule (オプション、cronジョブ管理)

## エラーハンドリング
- ファイル書き込みエラー: ログに記録して続行
- Discord送信エラー: リトライ処理（最大3回）
- 設定ファイル読み込みエラー: デフォルト値を使用

## ログ
実行ログは `logs/discord-sync.log` に出力されます。

## トラブルシューティング
### メッセージが送信されない
- DiscordチャンネルIDを確認
- ボットの権限を確認

### Obsidianに保存されない
- daily notesパスを確認
- ファイル書き込み権限を確認
- 今日の日付のファイルが存在するか確認

## ライセンス
MIT

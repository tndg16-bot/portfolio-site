# リポジトリ関係性ガイド

このドキュメントでは、`portfolio-site` リポジトリと関連リポジトリの関係性について説明します。

## 📁 リポジトリ構成

本山貴大の開発プロジェクトは以下のような構成になっています：

```
tndg16-bot/
├── papa                    # メインのObsidian Vault（ノート・ドキュメント）
├── portfolio-site          # ポートフォリオサイト ← このリポジトリ
├── nihongo-ai              # 日本語学習AIアプリ
├── gamified-mandala-chart  # ゲーミフィケーション曼荼羅チャート
├── kindle-pdf-extension    # Kindle PDF キャプチャ拡張機能
└── gamified-mandala        # ゲーミフィケーション曼荼羅アプリ
```

## 🔗 `papa` リポジトリとの関係

### `papa` リポジトリとは

`papa` はObsidian Vaultとして機能するメインリポジトリで、以下を含みます：

- **ノート・ドキュメント**: 知識管理、日記、学習ノート
- **Apps/ ディレクトリ**: 各アプリケーションのサブモジュール参照
- **チームルール**: `TEAM_RULES.md`, `CLAUDE.md` などのAIエージェント運用規則

### ディレクトリ構造

ローカル環境では以下のように配置されています：

```
C:\Users\chatg\Obsidian Vault\papa\
├── Apps/
│   ├── portfolio/           # ← このリポジトリのローカルクローン
│   ├── nihongo-ai/
│   ├── gamified-mandala-chart/
│   └── ...
├── CLAUDE.md
├── TEAM_RULES.md
└── （その他のノート・ドキュメント）
```

### 注意点

- `Apps/` 内の各ディレクトリは**独立したGitリポジトリ**です
- `papa` リポジトリはこれらをサブモジュールとして参照していません（シンプルなディレクトリ配置）
- 各アプリは独自のリモートリポジトリ（GitHub）にプッシュされます

## 🎯 このリポジトリ（portfolio-site）の役割

### 独立したプロジェクト

- **GitHub リモート**: `https://github.com/tndg16-bot/portfolio-site.git`
- **デプロイ先**: Vercel (自動デプロイ)
- **本番URL**: https://takahiro-motoyama.vercel.app

### ローカルでの配置

```
c:\Users\chatg\Obsidian Vault\papa\Apps\portfolio\
```

## 🔄 ワークフロー

### 開発フロー

1. `papa/Apps/portfolio/` で開発
2. `portfolio-site` リポジトリにコミット
3. GitHub にプッシュ
4. Vercel で自動デプロイ

### 共通ルールの参照

全プロジェクトは `papa` リポジトリの以下のルールに従います：

- `TEAM_RULES.md` - AIエージェントチームの運用規則
- `CLAUDE.md` - Claude Codeプロジェクトガイドライン

これらのファイルは `papa` リポジトリにあり、全サブプロジェクトで共有されます。

## 📋 関連リポジトリ一覧

| リポジトリ | 説明 | URL |
|-----------|------|-----|
| papa | メインVault（ノート・ドキュメント） | `tndg16-bot/papa` |
| portfolio-site | ポートフォリオサイト | `tndg16-bot/portfolio-site` |
| nihongo-ai | 日本語学習AIアプリ | `tndg16-bot/nihongo-ai` |
| gamified-mandala-chart | 曼荼羅チャート | `tndg16-bot/gamified-mandala-chart` |
| kindle-pdf-extension | Kindle PDF拡張 | `tndg16-bot/kindle-pdf-extension` |

## ⚠️ 注意事項

### やってはいけないこと

- ❌ `papa` リポジトリ内から `Apps/portfolio` を直接コミットしない
- ❌ 他プロジェクトのファイルをこのリポジトリに混ぜない
- ❌ 環境変数や機密情報をコミットしない

### やるべきこと

- ✅ 各プロジェクトは独立してGit管理
- ✅ 共通ルールは `papa` リポジトリを参照
- ✅ Issue・PRはプロジェクトごとに管理

## 🔧 トラブルシューティング

### Q: Gitが混乱している場合

```bash
# 現在のリモートを確認
git remote -v

# 正しいリモートに設定
git remote set-url origin https://github.com/tndg16-bot/portfolio-site.git
```

### Q: 親ディレクトリ（papa）と競合する場合

`papa` と `portfolio` は完全に独立したGitリポジトリです。
`papa` の `.gitignore` に `Apps/` が含まれていることを確認してください。

---

*このガイドは `papa` リポジトリとの関係性を明確にするために作成されました。*

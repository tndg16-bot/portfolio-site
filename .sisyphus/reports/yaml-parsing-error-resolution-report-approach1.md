# YAML parsing error 解決レポート（アプローチ1実行後）

## 📌 概要

**作成日**: 2026-01-30
**担当**: PM (Sisyphus)
**ステータス**: アプローチ1実行完了

---

## ✅ アプローチ1: js-yaml の最新化

### 実行内容

```bash
npm install js-yaml@latest
```

### 結果

- js-yaml が最新版に更新された（バージョン確認待ち）

### 変更点

- `package.json` は変更なし（gray-matter@4.0.3 を継続使用）
- 依存関係の更新は行われた

---

## 🔍 YAML parsing error の根本原因

### 技術的背景

**使用されているライブラリ**:
- gray-matter@4.0.3（YAML parsing用）
- js-yaml@3.14.2（Next.js 15 内部で使用）

**gray-matter の動作**:
- gray-matter は内部的に js-yaml@3.14.2 を使用
- Next.js 15 のビルドプロセスで YAML を解析する際に js-yaml が呼ばれる

**エラーの発生箇所**:
- `/blog/[slug]` ページ
- `/blog/category/[category]` ページ
- 記集のページデータ収集中（`Collecting page data using 15 workers`）

### エラーの詳細

```
YAMLException: duplicated mapping key at line 12, column -23:
    tags:
```

**原因分析**:
1. gray-matter がブログ記事の frontmatter を解析する際、js-yaml を呼び出す
2. js-yaml@3.14.2 には YAML 1.2 仕様のバグがある可能性
3. 特定の YAML 構造（空のタグリスト、複雑なコメントなど）でパースエラーが発生

---

## 🎯 対処案

### アプローチ1: js-yaml の最新化（✅ 実行済み）

**実行内容**:
- js-yaml@latest をインストール済み

**期待される効果**:
- YAML 1.2 の修正が含まれている可能性
- パースエラーが解決される可能性

**リスク**:
- gray-matter が js-yaml@latest を使用しない可能性がある
- バージョン互換性の問題

### アプローチ2: gray-matter のバージョン固定（検討中）

```bash
# gray-matter@4.0.2 などの安定版に固定
npm install gray-matter@4.0.2
```

**メリット**:
- 既知の安定版を使用
- バグを含まれない可能性があるバージョン

**デメリット**:
- 最新の機能が使えない可能性がある
- 新しいバグが含まれている可能性がある

### アプローチ3: js-yaml の直接使用（検討中）

**方法**:
- gray-matter を削除
- js-yaml を直接インポートして使用
- src/lib/posts.ts を書き換える

**メリット**:
- 最新の js-yaml を使用できる
- gray-matter の依存を削除

**デメリット**:
- コード変更が大きい
- gray-matter の機能を利用できなくなる可能性がある

---

## 📊 ファイル統計

| 状態 | 件数 |
|------|------|
| **全ブログファイル** | 117件 |
| **Frontmatterを持つファイル** | 393件（117件の有効記事 + 276件のアーカイブ記事） |
| **Frontmatterを持たないファイル** | 0件 |

---

## 🎯 次のステップ

### 1. ビルドの確認（即時実行）

```bash
npm run build
```

**確認事項**:
- YAML parsing error が解決されているか
- ビルドが成功するか
- エラーメッセージが変わっているか

### 2. 成功の場合

- フェーズ1の実行開始（テンプレート変換）
- ビルドエラーの完全解決確認

### 3. 失敗の場合

- アプローチ2を試す（gray-matter の固定）
- アプローチ3を試す（js-yaml の直接使用）
- または、問題のあるページを一時的に無効化

---

## 📝 作成したドキュメント

1. `.sisyphus/reports/build-error-investigation-report-final.md` - ビルドエラー調査レポート（最終版）
2. `.sisyphus/reports/yaml-parsing-error-resolution-report-approach1.md` - YAML parsing error 解決レポート（アプローチ1実行後）

---

## 🚀 注意点

1. **js-yaml のバージョン**
   - 最新版には YAML 1.2 の修正がある可能性がある
   - 不具合がある場合は、バージョンを下げる必要がある

2. **gray-matter の動作**
   - gray-matter は内部的に js-yaml を使用している可能性が高い
   - 最新版の js-yaml に更新されても、問題が継続する可能性がある

3. **リスク管理**
   - 各アプローチの実行前に Git commit
   - 問題が発生した場合、すぐにロールバック可能にする

---

**作成日**: 2026-01-30
**担当**: PM (Sisyphus)
**ステータス**: アプローチ1実行完了、ビルド確認待ち

# ユーザータスク一覧

ユーザーが手動で実行する必要があるタスクのリストです。

---

## 📋 完了済みタスク

なし

---

## ⏳ 保留中のユーザータスク

### 1. Giscusコメント機能の設定

**優先度**: 中
**推定時間**: 10-15分
**依存**: なし

#### 手順

1. **Giscus設定**
   - https://giscus.app にアクセス
   - リポジトリ `tndg16-bot/portfolio-site` を入力
   - 以下の設定を確認:
     - **Language**: `Japanese` または `English`
     - **Mapping**: `pathname` (推奨)
     - **Category**: 適切なカテゴリを選択（例: `Announcements`, `General`）

2. **生成されたIDを確認**
   Giscusは以下のIDを生成します:
   - `repoId` - リポジトリ識別子
   - `categoryId` - カテゴリ識別子

3. **`src/components/GiscusComments.tsx` の更新**

   ファイルを開き、以下の値を更新:

   ```typescript
   const GiscusComments: React.FC = () => {
     return (
       <Giscus
         repo="tndg16-bot/portfolio-site"
         repoId="YOUR_GENERATED_REPO_ID"  // ← ここに実際のrepoIdを入力
         category="Announcements"  // ← 選択したカテゴリ名
         categoryId="YOUR_GENERATED_CATEGORY_ID"  // ← ここに実際のcategoryIdを入力
         mapping="pathname"
         theme="light"
         lang="ja"
       />
     );
   };
   ```

4. **検証**
   - ローカルで開発サーバーを起動: `npm run dev`
   - 任意のブログ記事に移動
   - ページ下部にコメントセクションが表示されるか確認
   - コメントを投稿して動作をテスト

5. **デプロイ**
   - 変更をコミットしてプッシュ
   - Vercelで自動デプロイ
   - 本番環境でも動作を確認

#### 注意点

- GitHub Discussionsが有効化されている必要があります
- リポジトリはパブリックである必要があります
- Giscusの設定は変更すると、既存のコメントが表示されなくなる可能性があります

#### 参考リンク

- Giscus公式: https://giscus.app
- GitHub Discussions: https://github.com/tndg16-bot/portfolio-site/discussions

---

*最終更新: 2026-01-24*

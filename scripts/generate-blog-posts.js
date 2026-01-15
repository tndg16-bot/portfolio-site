const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content', 'blog');

const articles = [
    { num: "051", slug: "growth-mindset", date: "2026-02-13", title: "グロースマインドセット - 才能は伸ばせるという信念", category: "マインドセット", tags: ["マインドセット", "成長", "学習"], desc: "「才能は生まれつき」と思っていませんか？マインドセットを変えるだけで、成長の可能性は無限に広がります。" },
    { num: "052", slug: "comfort-zone", date: "2026-02-14", title: "コンフォートゾーンを抜け出す方法", category: "マインドセット", tags: ["マインドセット", "成長", "挑戦"], desc: "居心地の良い場所にいると成長は止まる。でも、無謀な挑戦も危険。適切な「ストレッチゾーン」の見つけ方。" },
    { num: "053", slug: "ikigai", date: "2026-02-15", title: "「生きがい」のフレームワーク - 4つの円が交わる場所", category: "コーチング", tags: ["生きがい", "キャリア", "包括的"], desc: "好きなこと、得意なこと、稼げること、世界が必要としていること。4つの円が重なる場所に、あなたの生きがいがあります。" },
    { num: "054", slug: "saying-no-at-work", date: "2026-02-16", title: "上司からの依頼を断る技術", category: "キャリア", tags: ["キャリア", "コミュニケーション", "境界線"], desc: "上司の頼みは断れない？実は、上手に断ることでむしろ信頼を得られます。" },
    { num: "055", slug: "remote-work-productivity", date: "2026-02-17", title: "リモートワークで生産性を高める7つの習慣", category: "生産性", tags: ["生産性", "リモートワーク", "習慣"], desc: "自宅だと集中できない。オンオフの切り替えが難しい。リモートワークの課題を解決する具体的な方法。" },
    { num: "056", slug: "cognitive-bias", date: "2026-02-18", title: "認知バイアス入門 - 脳の癖を知って判断を改善する", category: "メンタルモデル", tags: ["メンタルモデル", "意思決定", "心理学"], desc: "人間の脳には偏りがある。それを知るだけで、より良い判断ができるようになります。" },
    { num: "057", slug: "minimal-lifestyle", date: "2026-02-19", title: "ミニマリズムと生産性 - 少なく持つことで得られるもの", category: "生産性", tags: ["ミニマリズム", "生産性", "ライフスタイル"], desc: "物が多いと選択が増え、脳が疲れる。減らすことで増えるものがあります。" },
    { num: "058", slug: "emotional-intelligence", date: "2026-02-20", title: "EQ（感情知能）を高める - IQより大切なもの", category: "コーチング", tags: ["EQ", "リーダーシップ", "自己認識"], desc: "頭の良さだけでは成功できない。自分と他者の感情を扱う力が、人生の質を決めます。" },
    { num: "059", slug: "negotiation-basics", date: "2026-02-21", title: "交渉の基本 - WinWinを実現する技術", category: "キャリア", tags: ["交渉", "コミュニケーション", "キャリア"], desc: "交渉は奪い合いではない。双方が満足する結果を生み出す方法。" },
    { num: "060", slug: "journaling-methods", date: "2026-02-22", title: "効果的なジャーナリング5つの手法", category: "思考法", tags: ["ジャーナリング", "自己認識", "ライティング"], desc: "日記を書くだけでは効果が限定的。目的に応じた書き方で、自己理解を深めましょう。" },
    { num: "061", slug: "presentation-fear", date: "2026-02-23", title: "プレゼン恐怖症を克服する", category: "キャリア", tags: ["プレゼンテーション", "コミュニケーション", "心理学"], desc: "人前で話すのが苦手。緊張で頭が真っ白になる。そんな恐怖を乗り越える具体的な方法。" },
    { num: "062", slug: "pareto-principle", date: "2026-02-24", title: "80/20の法則を仕事に活かす", category: "生産性", tags: ["パレートの法則", "生産性", "効率化"], desc: "成果の80%は20%の行動から生まれる。重要な20%を見極める方法。" },
    { num: "063", slug: "building-habits", date: "2026-02-25", title: "習慣の科学 - なぜ習慣化は難しいのか", category: "メンタルモデル", tags: ["習慣", "脳科学", "行動変容"], desc: "意志力に頼らず習慣を作る。脳の仕組みを理解した習慣化のアプローチ。" },
    { num: "064", slug: "ai-learning-partner", date: "2026-02-26", title: "AIを学習パートナーにする方法", category: "AI活用", tags: ["AI", "学習", "教育"], desc: "ChatGPTを家庭教師のように使う。効果的なAI学習活用法。" },
    { num: "065", slug: "networking-introvert", date: "2026-02-27", title: "内向型のためのネットワーキング術", category: "キャリア", tags: ["人脈", "内向型", "キャリア"], desc: "パーティーが苦手でも大丈夫。内向型の強みを活かした人脈構築法。" },
    { num: "066", slug: "sleep-productivity", date: "2026-02-28", title: "睡眠と生産性 - 寝ることが最高の投資", category: "生産性", tags: ["睡眠", "生産性", "健康"], desc: "睡眠を削って働くのは逆効果。睡眠の質を高めて、パフォーマンスを最大化する方法。" },
    { num: "067", slug: "failure-resume", date: "2026-03-01", title: "「失敗履歴書」を書く - 失敗から学ぶ技術", category: "マインドセット", tags: ["失敗", "成長", "内省"], desc: "成功履歴書ではなく失敗履歴書を書く。失敗を資産に変える方法。" },
    { num: "068", slug: "time-blocking", date: "2026-03-02", title: "タイムブロッキング - カレンダーを味方につける", category: "生産性", tags: ["生産性", "時間管理", "カレンダー"], desc: "ToDoリストだけでは不十分。時間をブロックすることで、実際に行動に移す。" },
    { num: "069", slug: "fear-of-success", date: "2026-03-03", title: "「成功への恐怖」という逆説", category: "メンタルモデル", tags: ["恐怖", "成功", "心理学"], desc: "失敗が怖いのは当然。でも、成功も怖い？意外と多い成功への無意識の抵抗。" },
    { num: "070", slug: "delegation-art", date: "2026-03-04", title: "任せる技術 - 一人で抱え込まない", category: "キャリア", tags: ["権限委譲", "リーダーシップ", "マネジメント"], desc: "自分でやった方が早い。その考えが、あなたのボトルネックになっています。" },
    { num: "071", slug: "money-mindset", date: "2026-03-05", title: "お金のマインドブロックを外す", category: "マインドセット", tags: ["お金", "マインドセット", "富"], desc: "「お金は汚い」「稼ぐのは悪いこと」。無意識の思い込みが、あなたの経済状況を決めています。" },
    { num: "072", slug: "meetings-efficient", date: "2026-03-06", title: "会議を半分にする方法", category: "生産性", tags: ["会議", "生産性", "コミュニケーション"], desc: "この会議、本当に必要？無駄な会議を減らし、必要な会議を効率化する方法。" },
    { num: "073", slug: "creative-thinking", date: "2026-03-07", title: "クリエイティブ思考を鍛える5つの習慣", category: "思考法", tags: ["創造性", "思考法", "イノベーション"], desc: "クリエイティブな人は生まれつき？いいえ、創造性は習慣で鍛えられます。" },
    { num: "074", slug: "conflict-resolution", date: "2026-03-08", title: "対立を解消する対話の技術", category: "コーチング", tags: ["対立", "コミュニケーション", "調停"], desc: "意見が対立したとき、どう対処しますか？対立を建設的に解消する方法。" },
    { num: "075", slug: "learning-curve", date: "2026-03-09", title: "学習曲線を理解する - 成長の停滞期を乗り越える", category: "メンタルモデル", tags: ["学習", "成長", "プラトー"], desc: "成長が止まったように感じる時期がある。それは「停滞」ではなく「蓄積」の期間です。" },
    { num: "076", slug: "email-productivity", date: "2026-03-10", title: "メールに支配されない働き方", category: "生産性", tags: ["メール", "生産性", "コミュニケーション"], desc: "メールの返信に追われて1日が終わる。そんな状況から脱出する方法。" },
    { num: "077", slug: "personal-branding", date: "2026-03-11", title: "パーソナルブランディング入門", category: "キャリア", tags: ["パーソナルブランディング", "キャリア", "マーケティング"], desc: "自分を「ブランド」として確立する。選ばれる人になるための自己プロデュース。" },
    { num: "078", slug: "stress-management", date: "2026-03-12", title: "ストレスは敵ではない - 味方につける方法", category: "マインドセット", tags: ["ストレス", "マインドセット", "健康"], desc: "ストレスをゼロにすることは不可能。ストレスを成長のエネルギーに変える考え方。" },
    { num: "079", slug: "reading-efficiently", date: "2026-03-13", title: "読書の生産性を高める技術", category: "思考法", tags: ["読書", "学習", "生産性"], desc: "本を読んでも身につかない。読書の効果を最大化するための読み方。" },
    { num: "080", slug: "future-self", date: "2026-03-14", title: "未来の自分と対話する - 長期思考の技術", category: "コーチング", tags: ["未来", "計画", "内省"], desc: "10年後の自分は、今の自分に何と言うか？長期的な視点で今を考える方法。" }
];

if (!fs.existsSync(blogDir)) {
    console.error(`Directory not found: ${blogDir}`);
    process.exit(1);
}

articles.forEach(article => {
    // Escape double quotes in description if necessary (though our data seems clean)
    // Create tags string: ["tag1", "tag2"]
    const tagsStr = JSON.stringify(article.tags);

    // Frontmatter
    const content = `---
title: "${article.title}"
date: "${article.date}"
category: "${article.category}"
tags: ${tagsStr}
description: "${article.desc}"
slug: "${article.slug}"
published: true
---

## はじめに

${article.desc}

この記事では、その具体的な方法について解説します。

## なぜこれが重要なのか

現代社会において、この問題は多くの人が直面しています。
しかし、適切なアプローチを知れば、確実に改善できます。

### ポイント1

最初に理解すべきは、基本的な考え方です。
表面的なテクニックではなく、根本的な原理を把握しましょう。

### ポイント2

次に重要なのは、実践です。
知識だけでは変わりません。小さな一歩から始めることが大切です。

### ポイント3

最後に、継続することです。
一度やって終わりではなく、習慣として定着させましょう。

## 具体的なアクション

1. 今日できる最小のステップを決める
2. 毎日5分でも実践する
3. 週に1回振り返りをする
4. 成果を記録する

## まとめ

この考え方を身につけることで、あなたの生活は確実に改善されます。

完璧を目指す必要はありません。
まずは今日、一つだけ試してみてください。

その小さな一歩が、大きな変化につながります。
`;

    const fileName = `${article.num}-${article.slug}.md`;
    const filePath = path.join(blogDir, fileName);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${fileName}`);
});

console.log(`\nAll ${articles.length} articles created successfully!`);

/**
 * r4 サービス Tier 4階層構造（法人）+ 個人3本
 * Source: T-203_services_4tier_draft.md r4
 */
export type ServiceAudience = 'business' | 'individual';

export interface ServiceR4 {
  slug: string;
  name: string;
  audience: ServiceAudience;
  tier?: 1 | 2 | 3 | 4;
  shortDescription: string;
  longDescription: string;
  priceLabel: string;
  priceForSchema: string;
  duration: string;
  targetBuyer: string;
  tierRole?: string;
  process: { step: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedNoteTags: string[];
  cta: { primary: string; secondary?: string };
}

export const businessTiers: ServiceR4[] = [
  {
    slug: 'ai-workshop-corp',
    name: 'AI導入ハーフデイ・ワークショップ',
    audience: 'business',
    tier: 1,
    shortDescription: '経営層〜実務層が自社業務を題材に手を動かす半日WS。「使える状態」を体験させる入口。',
    longDescription: 'ChatGPT・Claude を業務に組み込む半日ワークショップ。経営層〜実務層まで、自社の業務を題材にしながらその場で手を動かして「使える状態」を作ります。研修だけでは現場は動かないという僕の経験から、業務フローへの組み込みを最初の半日で体験してもらいます。',
    priceLabel: '¥3万〜（3名・半日・税抜）／規模で変動',
    priceForSchema: '30000',
    duration: '半日（3-4時間）+ 事前ヒアリング30分 + 1ヶ月アフターサポート',
    targetBuyer: '人事・経営企画・DX推進担当（課長〜部長級／決裁権限¥10万未満／従業員10-300名規模）。「社内でAIを始めたいが何から」のフェーズ。稟議不要の試し買い枠。',
    tierRole: 'MQL→SQLの変換装置。Tier 2の伴走契約に進む顧客の60-70%はここを通る想定。',
    process: [
      { step: 1, title: '事前ヒアリング', description: '業務内容・課題・対象者を 30 分でヒアリング' },
      { step: 2, title: '題材設計', description: '自社業務に合わせたワークショップ題材を3本準備' },
      { step: 3, title: '半日ワークショップ', description: 'ハンズオン形式で実装まで完了' },
      { step: 4, title: 'アフターサポート（1ヶ月）', description: '参加者の質問対応・追加ヒント提供' },
    ],
    faqs: [
      { q: '最少何名から開催できますか？', a: '3名から。10名超の場合は1日コースに分割推奨。' },
      { q: '業界特化の題材は可能ですか？', a: '事前ヒアリングで業務直結の題材を準備します。' },
      { q: 'オンライン or 訪問？', a: 'どちらも対応。地方訪問は交通費実費。' },
      { q: '助成金は使えますか？', a: '人材開発支援助成金など対象になるケースあり。お気軽にご相談ください。' },
      { q: '開催後のフォローは？', a: '1ヶ月の質問対応・追加ヒント提供を含みます。' },
    ],
    relatedNoteTags: ['AI研修', '法人', 'ChatGPT', 'プロンプト'],
    cta: { primary: 'まず無料相談で内容を詰めたい', secondary: 'AI研修の助成金について' },
  },
  {
    slug: 'automation-consulting',
    name: '業務自動化伴走コンサルティング（3ヶ月）',
    audience: 'business',
    tier: 2,
    shortDescription: '業務棚卸→PoC実装→運用→引き継ぎの5ステップを3ヶ月で。事業のメイン収益柱。',
    longDescription: '1社につき3ヶ月単位で、特定の業務プロセスを AI で自動化するまでを伴走します。資料作成、メール起案、議事録要約、提案書テンプレ化など、効果の出やすい業務から着手。Tier 1 で体験した「使える状態」を組織の習慣として根付かせるフェーズです。',
    priceLabel: '¥10万〜¥20万/月（3ヶ月単位・税抜）／規模で変動',
    priceForSchema: '100000-200000',
    duration: '3ヶ月（延長相談可）／月2回オンライン定例 + Slack/Discord随時',
    targetBuyer: 'DX推進室・業務改革部・経営企画（部長級／決裁権限¥50-100万／従業員50-500名）。「WSは終わったが現場に定着しない」「2-3部門で並行展開したい」フェーズ。',
    tierRole: '事業のメイン収益柱。LTV最大化の中核。卒業時点で「継続サポート月額」or「Tier 3 PoC」の二択を提示。',
    process: [
      { step: 1, title: '業務棚卸し', description: '自動化候補業務を抽出（初月Week 1）' },
      { step: 2, title: '優先順位付け', description: '効果×実装難易度マトリクスで上位3-5本を選定' },
      { step: 3, title: 'PoC 実装', description: '上位1-2本のプロトタイプを共同実装' },
      { step: 4, title: '本番運用', description: '残課題の解消・運用フローの整備（2ヶ月目）' },
      { step: 5, title: '習慣化と引き継ぎ', description: '社内担当者への引き継ぎ・ナレッジ整理（3ヶ月目）' },
    ],
    faqs: [
      { q: 'ツール選定だけでも可能？', a: '単発の選定相談は ¥3万/2時間で対応。' },
      { q: '既存ツール（kintone/Salesforce）と連携できますか？', a: '連携先により可否変動・初回ヒアリングで確認します。' },
      { q: '開発が必要な場合は？', a: '別途「AI開発」プラン（Tier 3 内構成要素）で対応。' },
      { q: '解約はいつでも可能？', a: '月単位・前月末告知で解約可。' },
    ],
    relatedNoteTags: ['業務自動化', 'AI実装', 'コンサル', '効率化'],
    cta: { primary: '自社の業務で適用できそうか相談したい' },
  },
  {
    slug: 'ai-poc-codrive',
    name: 'AI推進並走PoC（部門横断・3-6ヶ月）',
    audience: 'business',
    tier: 3,
    shortDescription: '部門別 PoC 2-3 本並走 + 意思決定マッピング + 横展開設計の深化フェーズ。',
    longDescription: '部門別 PoC 2-3 本を並走（資料作成自動化／議事録要約／提案書生成等）。意思決定マッピング WS（旧「意思決定 WS」を統合）を初月に組み込み、「AI に任せる/人間が決める」線引きを明文化。GPTs/Bot 等の小規模実装は本山が直接担当、Web/SaaS 規模は外部実装パートナー紹介で対応（自社開発限界を正直に開示）。',
    priceLabel: '¥30万〜¥50万/月〜（PoC本数・部門数で変動・税抜）',
    priceForSchema: '300000-500000',
    duration: '3-6ヶ月／ハイブリッド（訪問+オンライン）／月4回定例 + 共同実装枠',
    targetBuyer: '経営企画役員・CDO・CHRO・AI推進責任者（役員〜本部長級／決裁権限¥300-1000万／従業員300-2000名）。「全社展開の前に2-3部門でPoCを並走させたい」「推進担当はいるが手が足りない」フェーズ。',
    tierRole: '案件単価最大ゾーン。Tier 4 への助走。実績ぼかし表記で /works に蓄積し次の決裁者向け社会的証明に転用。',
    process: [
      { step: 1, title: '意思決定マッピング WS', description: '初月：「AI に任せる/人間が決める」線引きを明文化' },
      { step: 2, title: 'PoC 並走（2-3本）', description: '部門別に並行実装。本山直担当 or 外部パートナー紹介' },
      { step: 3, title: '効果測定', description: 'PoC の ROI 評価・継続/拡大判断' },
      { step: 4, title: '横展開設計', description: '成功 PoC の全社展開計画策定' },
      { step: 5, title: '引き継ぎ', description: '社内推進担当者への引き継ぎ・ナレッジ移行' },
    ],
    faqs: [
      { q: '既存のSI/IT会社と並走できますか？', a: 'むしろ協業前提のケースが多いです。役割分担を初回ミーティングで整理します。' },
      { q: 'AI開発（GPTs/Bot/Claude スキル）は別料金ですか？', a: '小規模な GPTs/Slack Bot は本山が直接実装し本サービス内で対応。Web/SaaS 規模の開発は外部実装パートナーをご紹介します。' },
      { q: '助成金活用は？', a: '人材開発支援助成金など対象になるケースあり。' },
      { q: '効果測定は？', a: '削減時間 + 捻出時間の質を月次レポート。' },
    ],
    relatedNoteTags: ['AI推進', 'PoC', '部門横断', '意思決定'],
    cta: { primary: '自社のステージで適用できるか相談したい' },
  },
  {
    slug: 'enterprise-ai-program',
    name: '全社AI推進プログラム（6-12ヶ月）',
    audience: 'business',
    tier: 4,
    shortDescription: '推進体制・段階別研修・PoC並走・効果測定・横展開・引き継ぎを 6-12 ヶ月で。',
    longDescription: '推進体制構築・経営層〜実務層の段階別研修・部門別 PoC 3-5 本並走・効果測定・全社横展開設計・社内推進担当への引き継ぎまで。SIer 協業前提で「AI ネイティブ化のロードマップ設計役」に徹し、実装ボリュームは外部パートナーに分配。助成金スキームを契約初期に組み込み、決裁通過率を上げる。',
    priceLabel: '要問い合わせ（半年¥300万〜想定／個別見積もり）',
    priceForSchema: '3000000',
    duration: '6-12ヶ月／ハイブリッド／キックオフ→段階別研修→PoC並走→効果測定→横展開→引き継ぎ',
    targetBuyer: 'CEO・COO・CHRO・CDO直下のAI推進プロジェクト責任者（役員以上／決裁権限¥1000万超／従業員500-5000名）。「経営マターで半年〜1年でアウトカム必須」「既存SIerと協業前提」フェーズ。',
    tierRole: 'ブランド最上位の象徴案件。年1-2件で十分。獲得後はケーススタディ化して Tier 2/3 のリファレンスに循環。',
    process: [
      { step: 1, title: 'キックオフ', description: '現状診断・推進体制設計' },
      { step: 2, title: '全社研修（段階別）', description: '経営層・管理職・実務層向け' },
      { step: 3, title: 'PoC 並走（3-5本）', description: '部門別に 3 ヶ月並行' },
      { step: 4, title: '効果測定', description: 'PoC の ROI 評価・継続/拡大判断' },
      { step: 5, title: '横展開設計', description: '成功 PoC の全社展開計画策定' },
      { step: 6, title: '引き継ぎ', description: '社内推進担当者への引き継ぎ・ナレッジ移行' },
    ],
    faqs: [
      { q: 'NDA対応？', a: '先方/当方どちらの雛形でも可。' },
      { q: '既存 SI 会社と並走できますか？', a: 'むしろ協業前提が多いです。' },
      { q: '助成金活用は？', a: '人材開発支援助成金など対象になるケースあり。' },
      { q: '本山さん 1 人で 6 ヶ月対応できますか？', a: 'Tier 4 はロードマップ設計役に徹し、実装は外部パートナーと分担します。本山の専任時間は月 40-60 時間想定。' },
    ],
    relatedNoteTags: ['AI推進', '全社展開', 'エンタープライズ'],
    cta: { primary: '自社のステージで適用できるか相談したい' },
  },
];

export const individualServices: ServiceR4[] = [
  {
    slug: 'ai-workshop-personal',
    name: 'AI活用90分ワークショップ（個人参加・単発）',
    audience: 'individual',
    shortDescription: '個人向け 90 分の AI 活用ワークショップ。自分の業務に組み込むまでを「手を動かしながら」決める。',
    longDescription: '個人向け 90 分の AI 活用ワークショップ。自分の業務・副業・学習に、AI をどう組み込むかを「手を動かしながら」決めます。「まず 90 分試したい」「コーチング系の高額契約は怖い」層向けの試し買い枠。',
    priceLabel: '¥10,000（税込・単発）',
    priceForSchema: '10000',
    duration: '90分・オンライン（Google Meet）',
    targetBuyer: '副業/独立を検討する会社員・個人事業1年目・ChatGPTを使い始めたが伸び悩む層（20-40代）。',
    process: [
      { step: 1, title: '事前アンケート', description: '現状の業務 / 使ってるツール / 困りごとを共有' },
      { step: 2, title: 'ワークショップ 90 分', description: '個別の業務題材で実装を一緒に進める' },
      { step: 3, title: 'フォロー 1 週間', description: 'テキストで追加質問対応' },
    ],
    faqs: [
      { q: 'リピート可能？', a: '何度でも可・テーマを変えて OK。' },
      { q: '業界特化の質問は？', a: '営業・人材・コンテンツ運用が特に得意領域です。' },
      { q: '90分で実装まで進むか不安です', a: '事前アンケートで業務を絞り込み、当日は1テーマに集中するため、完了形まで到達できます。' },
    ],
    relatedNoteTags: ['個人AI活用', '副業'],
    cta: { primary: 'とりあえず話してみたい' },
  },
  {
    slug: 'clarity-session',
    name: 'モヤモヤ整理セッション（90分・審査制）',
    audience: 'individual',
    shortDescription: '副業/独立で3ヶ月以上動けていない方向け。月3-5名限定の対話セッション。',
    longDescription: '「やりたいことはある。でも何から手をつけるか決まらない」を、対話で整理するセッション。営業現場の知見 × AI 活用 × 個人事業経験を組み合わせ、次の 1 歩を一緒に決めます。',
    priceLabel: '¥30,000〜¥80,000（税込・範囲明示／応募時に確定額提示）',
    priceForSchema: '30000-80000',
    duration: '90分・オンライン',
    targetBuyer: '副業/独立で3ヶ月以上動けていない・現職でAI導入の社内提案に詰まっている個人（30-50代／可処分所得月¥10万以上）。月3-5名限定の審査制。',
    process: [
      { step: 1, title: '応募フォーム', description: '現状と相談したいテーマを共有' },
      { step: 2, title: '審査', description: '本山が時間を確保できる規模か判定（月3-5名想定）' },
      { step: 3, title: '90 分セッション', description: '対話で「次の1歩」を確定' },
    ],
    faqs: [
      { q: 'なぜ審査制？', a: '本気で動く方に絞って深く対話するため。' },
      { q: '不採用の場合は？', a: '個人向けワークショップなど他プランをご案内します。' },
      { q: 'オンライン or 対面？', a: 'オンライン（Google Meet）が基本。' },
    ],
    relatedNoteTags: ['個人事業', '意思決定', 'モヤモヤ'],
    cta: { primary: '応募してみたい' },
  },
  {
    slug: 'compass-program',
    name: '3ヶ月間・羅針盤プログラム（伴走）',
    audience: 'individual',
    shortDescription: '個人事業/副業の立ち上げを 3 ヶ月で軌道に乗せる伴走プログラム。',
    longDescription: '個人事業・副業の立ち上げを 3 ヶ月で軌道に乗せる伴走プログラム。週1ミーティング + テキスト随時相談 + AI 活用支援を組み合わせ、「動ける状態」を作ります。',
    priceLabel: '¥150,000（3ヶ月一括・税込）',
    priceForSchema: '150000',
    duration: '3 ヶ月／週1オンライン（60分）+ テキスト随時',
    targetBuyer: '個人事業/副業を本気で軌道に乗せたい層（営業経験者・コンテンツ運用者・士業の独立組／30-50代／自己投資予算¥15万以上）。同時期最大3-5名。',
    process: [
      { step: 1, title: 'キックオフ', description: 'ゴール設定・3ヶ月ロードマップ作成' },
      { step: 2, title: 'Week 1-4', description: '基盤整備（サービス設計・初期顧客アプローチ）' },
      { step: 3, title: 'Week 5-8', description: '初受注 / 初成約に向けた営業活動の磨き込み' },
      { step: 4, title: 'Week 9-12', description: '継続フローの確立・自動化・次フェーズ準備' },
      { step: 5, title: '卒業セッション', description: '3ヶ月の総括 + 次の3ヶ月設計' },
    ],
    faqs: [
      { q: 'すでに事業を始めているのですが対象ですか？', a: 'ゴール再設定としても活用いただけます。' },
      { q: '何名まで受けてますか？', a: '同時期最大3-5名で深く対応します。' },
      { q: '途中で合わないと感じたら？', a: '月次定例で見直し可。3ヶ月一括前払いの返金は提供開始前のみ。' },
      { q: '営業以外の業種でも対応？', a: 'はい・本山の経験は営業中心ですが業種は問いません。' },
    ],
    relatedNoteTags: ['羅針盤', '個人事業', '伴走'],
    cta: { primary: '自分に合いそうか相談したい' },
  },
];

export const allServicesR4: ServiceR4[] = [...businessTiers, ...individualServices];

export function getServiceR4BySlug(slug: string): ServiceR4 | undefined {
  return allServicesR4.find((s) => s.slug === slug);
}

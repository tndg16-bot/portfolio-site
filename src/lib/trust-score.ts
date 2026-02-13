/**
 * 信頼スコアの計算ロジック（Trust Score Calculation Logic）
 * Issue #84: 信頼獲得型の案件獲得戦略
 */

// ==========================
// 1. 列挙型（Enums）
// ==========================

export enum ActivityType {
  CONTENT_VIEW = 'content_view',
  SESSION_ATTENDED = 'session_attended',
  FEATURE_USED = 'feature_used',
  EMAIL_SENT = 'email_sent',
  FORM_SUBMITTED = 'form_submitted',
}

export enum FeedbackType {
  SATISFACTION = 'satisfaction',
  NPS = 'nps',
  OPEN_RATE = 'open_rate',
  REPORT_SUBMITTED = 'report_submitted',
  FEEDBACK_PROVIDED = 'feedback_provided',
}

export enum ContractStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ReferralBusinessOwnerType {
  BUSINESS_OWNER = 'business_owner',
  INDIVIDUAL = 'individual',
}

export enum TrustLevel {
  LEVEL_1_LOWEST = 1,
  LEVEL_2_LOW = 2,
  LEVEL_3_STANDARD = 3,
  LEVEL_4_HIGH = 4,
  LEVEL_5_HIGHEST = 5,
}

export type TrustTrend = 'stable' | 'growing' | 'declining';
export type TrustDirection = 'up' | 'down' | 'none';

// ==========================
// 2. データ型（Interfaces）
// ==========================

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  timestamp: Date;
  details?: Record<string, unknown>;
}

export interface Feedback {
  id: string;
  userId: string;
  type: FeedbackType;
  score: number;
  timestamp: Date;
}

export interface Satisfaction extends Feedback {
  type: FeedbackType.SATISFACTION;
  score: number;
}

export interface NpsScore extends Feedback {
  type: FeedbackType.NPS;
  score: number;
}

export interface OpenRate extends Feedback {
  type: FeedbackType.OPEN_RATE;
  rate: number;
}

export interface ReportSubmitted extends Feedback {
  type: FeedbackType.REPORT_SUBMITTED;
  score: number;
}

export interface FeedbackProvided extends Feedback {
  type: FeedbackType.FEEDBACK_PROVIDED;
  score: number;
}

export interface Contract {
  id: string;
  userId: string;
  amount: number;
  startDate: Date;
  endDate?: Date;
  status: ContractStatus;
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeId: string;
  qualityScore: number;
  businessOwnerType: ReferralBusinessOwnerType;
  timestamp: Date;
}

export interface TrustScoreHistory {
  id: string;
  userId: string;
  activityScore: number;
  relationshipScore: number;
  qualityScore: number;
  revenueScore: number;
  referralScore: number;
  totalTrustScore: number;
  trustLevel: TrustLevel;
  recordedAt: Date;
}

export interface TrustScoreHistoryItem {
  date: string;
  score: number;
  level: number;
}

export interface TrustScoreAnalysis {
  trend: TrustTrend;
  growthRate: number;
  averageScore: number;
  currentScore: number;
  direction: TrustDirection;
}

export interface SegmentationRecommendation {
  segment: string;
  actions: string[];
  message: string;
}

export interface TrustScoreReport {
  summary: {
    currentScore: number;
    averageScore: number;
    growthRate: number;
    trend: string;
    direction: string;
  };
  segmentation: SegmentationRecommendation;
  recommendations: string[];
}

export interface ExportData {
  format: 'csv';
  headers: string[];
  rows: unknown[];
}

export interface TrustScoreData {
  userId: string;
  trustScore: number;
  trustLevel: number;
  history: TrustScoreHistoryItem[];
}

// ==========================
// 3. 計算関数（Calculation Functions）
// ==========================

/**
 * 活動スコア（Activity Score）の計算
 */
export function calculateActivityScore(activities: Activity[]): number {
  const contentViews = activities.filter(a => a.type === ActivityType.CONTENT_VIEW).length;
  const sessionAttendances = activities.filter(a => a.type === ActivityType.SESSION_ATTENDED).length;
  const featureUsage = activities.filter(a => a.type === ActivityType.FEATURE_USED).length;

  const contentViewScore = Math.min((contentViews / 30) * 100, 100);
  const sessionAttendanceScore = Math.min((sessionAttendances / 3) * 100, 100);
  const featureUsageScore = Math.min((featureUsage / 20) * 100, 100);

  return Math.round((contentViewScore + sessionAttendanceScore + featureUsageScore) / 3);
}

/**
 * 関係スコア（Relationship Score）の計算
 */
export function calculateRelationshipScore(feedbacks: Feedback[], emailCount: number): number {
  const reportsSubmitted = feedbacks.filter(f => f.type === FeedbackType.REPORT_SUBMITTED) as ReportSubmitted[];
  const feedbackProvided = feedbacks.filter(f => f.type === FeedbackType.FEEDBACK_PROVIDED) as FeedbackProvided[];

  const communicationFrequencyScore = Math.min((emailCount / 30) * 100, 100);
  const reportsSubmittedScore = Math.min((reportsSubmitted.length / 4) * 100, 100);
  const feedbackProvidedScore = Math.min((feedbackProvided.length / 5) * 100, 100);

  return Math.round((communicationFrequencyScore + reportsSubmittedScore + feedbackProvidedScore) / 3);
}

/**
 * 品質スコア（Quality Score）の計算
 */
export function calculateQualityScore(satisfactions: Satisfaction[], npsScores: NpsScore[], openRates: OpenRate[]): number {
  const averageSatisfaction = satisfactions.length > 0
    ? satisfactions.reduce((sum, s) => sum + s.score, 0) / satisfactions.length
    : 0;

  const averageNps = npsScores.length > 0
    ? npsScores.reduce((sum, n) => sum + n.score, 0) / npsScores.length
    : 0;

  const averageOpenRate = openRates.length > 0
    ? openRates.reduce((sum, o) => sum + o.rate, 0) / openRates.length
    : 0;

  const satisfactionScore = (averageSatisfaction / 5) * 100;
  const npsScore = ((averageNps + 100) / 2) * 100;
  const openRateScore = (averageOpenRate / 80) * 100;

  return Math.round((satisfactionScore + npsScore + openRateScore) / 3);
}

/**
 * 収益スコア（Revenue Score）の計算
 */
export function calculateRevenueScore(contracts: Contract[]): number {
  const contractAmount = contracts.reduce((sum, c) => sum + (c.amount || 0), 0);
  const contractPeriod = contracts.reduce((sum, c) => {
    const startDate = new Date(c.startDate);
    const endDate = c.endDate ? new Date(c.endDate) : new Date();
    const months = Math.ceil((endDate.getTime() - startDate.getTime()) / (30 * 24 * 60 * 60 * 1000));
    return sum + months;
  }, 0);

  const amountScore = Math.min((contractAmount / 500000) * 100, 100);
  const periodScore = Math.min((contractPeriod / 12) * 100, 100);

  return Math.round((amountScore + periodScore) / 2);
}

/**
 * 紹介スコア（Referral Score）の計算
 */
export function calculateReferralScore(referrals: Referral[]): number {
  const referralCount = referrals.length;
  const averageQuality = referrals.length > 0
    ? referrals.reduce((sum, r) => sum + r.qualityScore, 0) / referrals.length
    : 0;

  const businessOwnerReferrals = referrals.filter(r => r.businessOwnerType === ReferralBusinessOwnerType.BUSINESS_OWNER).length;

  const referralCountScore = Math.min((referralCount / 3) * 100, 100);
  const qualityScore = averageQuality;
  const businessOwnerScore = businessOwnerReferrals > 0 ? 100 : 50;

  return Math.round((referralCountScore + qualityScore + businessOwnerScore) / 3);
}

/**
 * 全体の信頼スコアの計算（Total Trust Score Calculation）
 */
export function calculateTotalTrustScore(
  activityScore: number,
  relationshipScore: number,
  qualityScore: number,
  revenueScore: number,
  referralScore: number
): number {
  const weightedScore =
    (activityScore * 0.3) +
    (relationshipScore * 0.3) +
    (qualityScore * 0.2) +
    (revenueScore * 0.1) +
    (referralScore * 0.1);

  return Math.min(Math.round(weightedScore), 100);
}

/**
 * 信頼レベルの判定（Trust Level Determination）
 */
export function determineTrustLevel(trustScore: number): TrustLevel {
  if (trustScore >= 80) return TrustLevel.LEVEL_5_HIGHEST;
  if (trustScore >= 60) return TrustLevel.LEVEL_4_HIGH;
  if (trustScore >= 40) return TrustLevel.LEVEL_3_STANDARD;
  if (trustScore >= 20) return TrustLevel.LEVEL_2_LOW;
  return TrustLevel.LEVEL_1_LOWEST;
}

/**
 * 信頼スコア履歴の作成（Trust Score History Creation）
 */
export function createTrustScoreHistory(
  userId: string,
  activityScore: number,
  relationshipScore: number,
  qualityScore: number,
  revenueScore: number,
  referralScore: number,
  totalTrustScore: number,
  trustLevel: TrustLevel
): TrustScoreHistory {
  return {
    id: crypto.randomUUID(),
    userId,
    activityScore,
    relationshipScore,
    qualityScore,
    revenueScore,
    referralScore,
    totalTrustScore,
    trustLevel,
    recordedAt: new Date(),
  };
}

/**
 * 信頼スコアの更新トリガー（Trust Score Update Trigger）
 */
export async function updateTrustScore(
  userId: string,
  eventType: ActivityType | FeedbackType,
  details?: Record<string, unknown>
): Promise<TrustScoreHistory> {
  // Currently unused (mock implementation)
  void eventType;
  void details;

  // TODO: データベースから現在の活動データ、フィードバック、契約、紹介を取得
  // TODO: 各スコアを再計算
  // TODO: 全体の信頼スコアを計算
  // TODO: 信頼レベルを判定
  // TODO: 新しい履歴レコードを作成
  // TODO: 履歴をデータベースに保存

  const mockActivityScore = 90;
  const mockRelationshipScore = 80;
  const mockQualityScore = 75;
  const mockRevenueScore = 100;
  const mockReferralScore = 100;

  const totalTrustScore = calculateTotalTrustScore(
    mockActivityScore,
    mockRelationshipScore,
    mockQualityScore,
    mockRevenueScore,
    mockReferralScore
  );

  const trustLevel = determineTrustLevel(totalTrustScore);

  return createTrustScoreHistory(
    userId,
    mockActivityScore,
    mockRelationshipScore,
    mockQualityScore,
    mockRevenueScore,
    mockReferralScore,
    totalTrustScore,
    trustLevel
  );
}

/**
 * 信頼スコアの初期化（Trust Score Initialization）
 */
export function initializeTrustScore(userId: string): TrustScoreHistory {
  const initialActivityScore = 0;
  const initialRelationshipScore = 0;
  const initialQualityScore = 0;
  const initialRevenueScore = 0;
  const initialReferralScore = 0;

  const totalTrustScore = calculateTotalTrustScore(
    initialActivityScore,
    initialRelationshipScore,
    initialQualityScore,
    initialRevenueScore,
    initialReferralScore
  );

  const trustLevel = determineTrustLevel(totalTrustScore);

  return createTrustScoreHistory(
    userId,
    initialActivityScore,
    initialRelationshipScore,
    initialQualityScore,
    initialRevenueScore,
    initialReferralScore,
    totalTrustScore,
    trustLevel
  );
}

/**
 * 信頼スコアの増減トリガー（Trust Score Bonus/Penalty）
 */
export function addTrustScoreBonus(trustScore: number, bonus: number): number {
  return Math.min(trustScore + bonus, 100);
}

export function subtractTrustScorePenalty(trustScore: number, penalty: number): number {
  return Math.max(trustScore - penalty, 0);
}

/**
 * 信頼スコアの分析（Trust Score Analysis）
 */
export function analyzeTrustScoreTrend(history: TrustScoreHistory[]): TrustScoreAnalysis {
  if (history.length === 0) {
    return {
      trend: 'stable' as TrustTrend,
      growthRate: 0,
      averageScore: 0,
      currentScore: 0,
      direction: 'none' as TrustDirection,
    };
  }

  const sortedHistory = [...history].sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime());
  const firstScore = sortedHistory[0].totalTrustScore;
  const currentScore = sortedHistory[sortedHistory.length - 1].totalTrustScore;

  const growthRate = ((currentScore - firstScore) / firstScore) * 100;
  const averageScore = sortedHistory.reduce((sum, h) => sum + h.totalTrustScore, 0) / sortedHistory.length;

  let trend: TrustTrend = 'stable';
  if (growthRate > 5) {
    trend = 'growing';
  } else if (growthRate < -5) {
    trend = 'declining';
  }

  let direction: TrustDirection = 'none';
  if (growthRate > 0) {
    direction = 'up';
  } else if (growthRate < 0) {
    direction = 'down';
  }

  return {
    trend,
    growthRate,
    averageScore,
    currentScore,
    direction,
  };
}

/**
 * セグメンテーションの提案（Segmentation Recommendations）
 */
export function recommendTrustSegmentation(trustLevel: TrustLevel): SegmentationRecommendation {
  if (trustLevel === TrustLevel.LEVEL_5_HIGHEST) {
    return {
      segment: 'VIP',
      actions: ['プレミア機能の提供', '優先サポート', 'リファラルインセンティブ'],
      message: '信頼関係が非常に強固。紹介・リピートの獲得が容易。',
    };
  }

  if (trustLevel === TrustLevel.LEVEL_4_HIGH) {
    return {
      segment: 'High Value',
      actions: ['新規機能の先行提供', '定期的なフォローアップ'],
      message: '信頼関係が強固。紹介・リピートの獲得が可能。',
    };
  }

  if (trustLevel === TrustLevel.LEVEL_3_STANDARD) {
    return {
      segment: 'Standard',
      actions: ['標準的なサポート', '定期的なニュースレター'],
      message: '信頼関係が良好。紹介・リピートの獲得にチャンスあり。',
    };
  }

  if (trustLevel === TrustLevel.LEVEL_2_LOW) {
    return {
      segment: 'Onboarding',
      actions: ['オンボーディングの強化', 'コンテンツの提供'],
      message: '信頼関係が構築中。紹介・リピートの獲得に時間が必要。',
    };
  }

  return {
    segment: 'New Customer',
    actions: ['ウェルカムの提供', '関係構築の開始'],
    message: '信頼関係が構築できていない。紹介・リピートの獲得が困難。',
  };
}

/**
 * エクスポート・インターフェース（Utility Functions）
 */
export function exportTrustScoreData(history: TrustScoreHistory[]): ExportData {
  return {
    format: 'csv',
    headers: ['userId', 'activityScore', 'relationshipScore', 'qualityScore', 'revenueScore', 'referralScore', 'totalTrustScore', 'trustLevel', 'recordedAt'],
    rows: history.map(h => [
      h.userId,
      h.activityScore,
      h.relationshipScore,
      h.qualityScore,
      h.revenueScore,
      h.referralScore,
      h.totalTrustScore,
      h.trustLevel,
      h.recordedAt.toISOString(),
    ]),
  };
}

/**
 * 信頼スコアレポートの生成（Generate Trust Score Report）
 */
export function generateTrustScoreReport(history: TrustScoreHistory[]): TrustScoreReport {
  const analysis = analyzeTrustScoreTrend(history);

  return {
    summary: {
      currentScore: analysis.currentScore,
      averageScore: analysis.averageScore,
      growthRate: analysis.growthRate,
      trend: analysis.trend,
      direction: analysis.direction,
    },
    segmentation: recommendTrustSegmentation(analysis.currentScore),
    recommendations: generateTrustScoreRecommendations(analysis),
  };
}

/**
 * 信頼スコアの改善提案の生成（Generate Trust Score Improvement Recommendations）
 */
function generateTrustScoreRecommendations(analysis: TrustScoreAnalysis): string[] {
  const recommendations: string[] = [];

  if (analysis.trend === 'declining') {
    recommendations.push('信頼スコアが低下傾向にあります。コミュニケーションの頻度を増やしてください。');
    recommendations.push('コンテンツの品質を見直してください。');
  }

  if (analysis.growthRate < 10) {
    recommendations.push('信頼スコアの成長率が低いです。より価値のあるコンテンツやサービスを提供してください。');
  }

  if (analysis.averageScore < 40) {
    recommendations.push('平均信頼スコアが低いです。オンボーディングプロセスを見直してください。');
  }

  return recommendations;
}

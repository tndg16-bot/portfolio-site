import { NextResponse } from 'next/server';

// @ts-ignore - Prisma Client will be generated after running `npx prisma generate`
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================
// 1. 信頼スコアの取得（GET /api/trust-score/:userId）
// ==========================

export async function getTrustScoreHandler(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // データベースから最新の信頼スコアと履歴を取得
    const trustScoreHistory = await prisma.trustScoreHistory.findMany({
      where: { userId },
      orderBy: { recordedAt: 'desc' },
      take: 10, // 最新10件のみ取得
    });

    if (trustScoreHistory.length === 0) {
      // 初期データがない場合、初期データを作成
      const initialData = {
        userId,
        activityScore: 0,
        relationshipScore: 0,
        qualityScore: 0,
        revenueScore: 0,
        referralScore: 0,
        totalTrustScore: 0,
        trustLevel: 1,
        recordedAt: new Date(),
      };

      await prisma.trustScoreHistory.create({
        data: initialData,
      });

      return NextResponse.json({
        success: true,
        data: initialData,
        message: '信頼スコアを初期化しました',
      });
    }

    // 最新の信頼スコア
    const latestScore = trustScoreHistory[0];

    // 履歴を日付順に並べ替え
    const sortedHistory = [...trustScoreHistory].sort((a, b) =>
      a.recordedAt.getTime() - b.recordedAt.getTime()
    );

    return NextResponse.json({
      success: true,
      data: {
        userId,
        trustScore: latestScore.totalTrustScore,
        trustLevel: latestScore.trustLevel,
        history: sortedHistory,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching trust score:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '信頼スコアの取得に失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ==========================
// 2. 信頼スコアの再計算トリガー（POST /api/trust-score/recalculate/:userId）
// ==========================

export async function recalculateTrustScoreHandler(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();

    const { triggerEvent } = body;

    if (!triggerEvent) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'triggerEvent が必須です',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // TODO: データベースから現在の活動データ、フィードバック、契約、紹介を取得
    // TODO: 各スコアを再計算
    // TODO: 全体の信頼スコアを計算
    // TODO: 信頼レベルを判定
    // TODO: 新しい履歴レコードを作成
    // TODO: 履歴をデータベースに保存

    // モックデータ（初期化）
    const mockActivityScore = 90;
    const mockRelationshipScore = 80;
    const mockQualityScore = 75;
    const mockRevenueScore = 100;
    const mockReferralScore = 100;

    // 計算用のデータ（現在のスコアの取得を想定）
    // const currentScoreHistory = await prisma.trustScoreHistory.findFirst({
    //   where: { userId },
    //   orderBy: { recordedAt: 'desc' }
    // });

    const totalTrustScore = Math.round(
      (mockActivityScore * 0.3) +
        (mockRelationshipScore * 0.3) +
        (mockQualityScore * 0.2) +
        (mockRevenueScore * 0.1) +
        (mockReferralScore * 0.1)
    );

    const trustLevel = totalTrustScore >= 80 ? 5 : totalTrustScore >= 60 ? 4 : totalTrustScore >= 40 ? 3 : totalTrustScore >= 20 ? 2 : 1;

    const newHistory = await prisma.trustScoreHistory.create({
      data: {
        userId,
        activityScore: mockActivityScore,
        relationshipScore: mockRelationshipScore,
        qualityScore: mockQualityScore,
        revenueScore: mockRevenueScore,
        referralScore: mockReferralScore,
        totalTrustScore,
        trustLevel,
        recordedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        userId,
        totalTrustScore,
        trustLevel,
        recordedAt: newHistory.recordedAt.toISOString(),
      },
      message: '信頼スコアを更新しました',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating trust score:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '信頼スコアの更新に失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ==========================
// 3. 信頼スコアの履歴エクスポート（GET /api/trust-score/:userId/export）
// ==========================

export async function exportTrustScoreHistoryHandler(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // データベースから履歴を取得
    const trustScoreHistory = await prisma.trustScoreHistory.findMany({
      where: { userId },
      orderBy: { recordedAt: 'asc' },
    });

    if (trustScoreHistory.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TRUST_SCORE_HISTORY_NOT_FOUND',
            message: '信頼スコア履歴が見つかりませんでした',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // CSV形式のヘッダー
    const headers = [
      'recordedAt',
      'activityScore',
      'relationshipScore',
      'qualityScore',
      'revenueScore',
      'referralScore',
      'totalTrustScore',
      'trustLevel',
    ];

    // CSV形式のデータ行
    const rows: string[][] = trustScoreHistory.map((h) => [
      h.recordedAt.toISOString(),
      String(h.activityScore),
      String(h.relationshipScore),
      String(h.qualityScore),
      String(h.revenueScore),
      String(h.referralScore),
      String(h.totalTrustScore),
      String(h.trustLevel),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="trust_score_history_${userId}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting trust score history:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '信頼スコア履歴のエクスポートに失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ==========================
// 4. 信頼スコアのレポート生成（GET /api/trust-score/:userId/report）
// ==========================

export async function generateTrustScoreReportHandler(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // データベースから履歴を取得
    const trustScoreHistory = await prisma.trustScoreHistory.findMany({
      where: { userId },
      orderBy: { recordedAt: 'asc' },
    });

    if (trustScoreHistory.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TRUST_SCORE_HISTORY_NOT_FOUND',
            message: '信頼スコア履歴が見つかりませんでした',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    const latestScore = trustScoreHistory[trustScoreHistory.length - 1].totalTrustScore;

    return NextResponse.json({
      success: true,
      data: {
        userId,
        report: {
          summary: {
            currentScore: latestScore,
            averageScore: latestScore, // 簡略化
            growthRate: 0, // 簡略化
            trend: 'stable',
            direction: 'none',
          },
        },
        history: trustScoreHistory.map((h) => ({
          date: h.recordedAt.toISOString(),
          score: h.totalTrustScore,
          level: h.trustLevel,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating trust score report:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '信頼スコアレポートの生成に失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// ==========================
// Route Handlers Export
// ==========================

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  return getTrustScoreHandler(request, { params });
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  return recalculateTrustScoreHandler(request, { params });
}

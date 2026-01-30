import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================
// インライン型定義（Inline Type Definitions）
// ==========================

export enum TrustLevel {
  LEVEL_1_LOWEST = 1,
  LEVEL_1_LOW = 1,
  LEVEL_2_LOW = 2,
  LEVEL_3_STANDARD = 3,
  LEVEL_4_HIGH = 4,
  LEVEL_5_HIGHEST = 5,
}

export interface TrustScoreHistoryDB {
  id: string;
  userId: string;
  activityScore: number;
  relationshipScore: number;
  qualityScore: number;
  revenueScore: number;
  referralScore: number;
  totalTrustScore: number;
  trustLevel: number;
  recordedAt: Date;
}

// ==========================
// 1. 信頼スコアの取得（GET /api/trust-score/:userId）
// ==========================

export async function getTrustScoreHandler(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    // データベースから最新の信頼スコアと履歴を取得
    const trustScoreHistory = await prisma.trustScoreHistory.findMany({
      where: { userId },
      orderBy: { recordedAt: 'desc' as const },
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

    return NextResponse.json({
      success: true,
      data: {
        userId,
        trustScore: latestScore.totalTrustScore,
        trustLevel: latestScore.trustLevel,
        scores: {
          activity: latestScore.activityScore,
          relationship: latestScore.relationshipScore,
          quality: latestScore.qualityScore,
          revenue: latestScore.revenueScore,
          referral: latestScore.referralScore,
        },
        history: trustScoreHistory,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching trust score:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR' as const,
          message: '信頼スコアの取得に失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 as const }
    );
  }
}

// ==========================
// 2. 信頼スコアの再計算トリガー（POST /api/trust-score/recalculate/:userId）
// ==========================

export async function recalculateTrustScoreHandler(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    const body = await request.json() as any;

    const { triggerEvent, details } = body;

    if (!triggerEvent) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST' as const,
            message: 'triggerEventが必須です',
          },
        } as any,
        timestamp: new Date().toISOString(),
      } as any,
      { status: 400 as const }
    );
    }

    // モックデータ（初期化）
    const mockActivityScore = 90;
    const mockRelationshipScore = 80;
    const mockQualityScore = 75;
    const mockRevenueScore = 100;
    const mockReferralScore = 100;

    const totalTrustScore = Math.min(
      (mockActivityScore * 0.3) +
      (mockRelationshipScore * 0.3) +
      (mockQualityScore * 0.2) +
      (mockRevenueScore * 0.1) +
      (mockReferralScore * 0.1),
      100
    );

    let trustLevel = 1;
    if (totalTrustScore >= 20) trustLevel = 2;
    if (totalTrustScore >= 40) trustLevel = 3;
    if (totalTrustScore >= 60) trustLevel = 4;
    if (totalTrustScore >= 80) trustLevel = 5;

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
      } as any,
      message: '信頼スコアを更新しました',
      timestamp: new Date().toISOString(),
    } as any,
    });
  } catch (error) {
    console.error('Error updating trust score:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR' as const,
          message: '信頼スコアの更新に失敗しました',
          details: error instanceof Error ? error.message : String(error),
        },
      } as any,
      timestamp: new Date().toISOString(),
      } as any,
      { status: 500 as const }
    );
  }
}

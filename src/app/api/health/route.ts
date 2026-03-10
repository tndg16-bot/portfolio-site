import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'tndg16-bot';

interface HealthCheck {
    status: 'ok' | 'degraded' | 'error';
    timestamp: string;
    checks: {
        github: {
            status: 'ok' | 'error' | 'unknown';
            tokenConfigured: boolean;
            owner: string;
            error?: string;
        };
    };
}

export async function GET() {
    const health: HealthCheck = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        checks: {
            github: {
                status: 'unknown',
                tokenConfigured: !!GITHUB_TOKEN,
                owner: GITHUB_OWNER,
            },
        },
    };

    try {
        // GitHub API疎通確認
        const url = `https://api.github.com/users/${GITHUB_OWNER}`;
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        const response = await fetch(url, { headers, cache: 'no-store' });

        if (response.ok) {
            health.checks.github.status = 'ok';
        } else {
            health.checks.github.status = 'error';
            health.status = 'degraded';
        }
    } catch (error) {
        health.checks.github.status = 'error';
        health.status = 'error';
        health.checks.github.error = error instanceof Error ? error.message : String(error);
    }

    const statusCode = health.status === 'ok' ? 200 : health.status === 'degraded' ? 200 : 503;

    return NextResponse.json(health, { status: statusCode });
}

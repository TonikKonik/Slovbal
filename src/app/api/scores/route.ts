import { NextRequest, NextResponse } from 'next/server';
import { Difficulty } from '@/types';

const VALID_DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, tries, won, difficulty } = body;

    if (!session_id || typeof tries !== 'number' || typeof won !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty' },
        { status: 400 }
      );
    }

    try {
      const { query } = await import('@/lib/db');
      const today = new Date().toISOString().slice(0, 10);

      await query(
        `INSERT INTO scores (session_id, date, tries, won, difficulty)
         VALUES ($1, $2, $3, $4, $5)`,
        [session_id, today, tries, won, difficulty]
      );
    } catch {
      // Database unavailable - silently fail, score tracking is non-critical
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

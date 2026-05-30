import { NextRequest, NextResponse } from 'next/server';
import { Difficulty } from '@/types';
import { getWordForDate } from '@/lib/words';

const VALID_DIFFICULTIES: Difficulty[] = ['lehka', 'stredni', 'tezka'];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const difficultyParam = searchParams.get('difficulty');

  if (!difficultyParam || !VALID_DIFFICULTIES.includes(difficultyParam as Difficulty)) {
    return NextResponse.json(
      { error: 'Invalid difficulty. Use lehka, stredni, or tezka.' },
      { status: 400 }
    );
  }

  const difficulty = difficultyParam as Difficulty;
  const today = new Date();

  // Try database first
  try {
    const { query } = await import('@/lib/db');
    const todayStr = today.toISOString().slice(0, 10);

    const rows = await query<{ word: string }>(
      'SELECT word FROM daily_word WHERE date = $1 AND difficulty = $2 LIMIT 1',
      [todayStr, difficulty]
    );

    if (rows.length > 0) {
      return NextResponse.json({ word: rows[0].word, difficulty, source: 'db' });
    }

    // Try to insert today's word from fallback list
    const fallbackWord = getWordForDate(today, difficulty);
    try {
      await query(
        'INSERT INTO daily_word (date, word, difficulty) VALUES ($1, $2, $3) ON CONFLICT (date, difficulty) DO NOTHING',
        [todayStr, fallbackWord, difficulty]
      );
    } catch {
      // Ignore insert errors
    }

    return NextResponse.json({ word: fallbackWord, difficulty, source: 'generated' });
  } catch {
    // Database unavailable - use fallback
    const word = getWordForDate(today, difficulty);
    return NextResponse.json({ word, difficulty, source: 'fallback' });
  }
}

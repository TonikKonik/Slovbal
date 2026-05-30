import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.SLOVBAL_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('No database connection string provided');
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = getPool();
  const result = await client.query(text, params);
  return result.rows as T[];
}

export async function initDB(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS words (
      id SERIAL PRIMARY KEY,
      word VARCHAR(10) NOT NULL,
      length INTEGER NOT NULL,
      UNIQUE(word)
    );

    CREATE TABLE IF NOT EXISTS daily_word (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      word VARCHAR(10) NOT NULL,
      difficulty VARCHAR(10) NOT NULL,
      UNIQUE(date, difficulty)
    );

    CREATE TABLE IF NOT EXISTS scores (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(50) NOT NULL,
      date DATE NOT NULL,
      tries INTEGER NOT NULL,
      won BOOLEAN NOT NULL,
      difficulty VARCHAR(10) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await query(sql);
}

export default getPool;

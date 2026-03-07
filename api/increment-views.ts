import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sql) {
    return res.status(503).json({ error: 'DATABASE_URL is not configured in Vercel environment variables.' });
  }

  try {
    // Ensure table exists (since server.ts init doesn't run on Vercel)
    await sql`
      CREATE TABLE IF NOT EXISTS stats (
        key TEXT PRIMARY KEY,
        value INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const result = await sql`
      INSERT INTO stats (key, value) VALUES ('view_count', 1)
      ON CONFLICT (key) DO UPDATE SET value = stats.value + 1
      RETURNING value
    `;
    return res.status(200).json({ views: result[0].value });
  } catch (err: any) {
    console.error("Failed to increment views:", err);
    return res.status(500).json({ error: "Failed to increment views" });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!sql) {
      return res.status(503).json({ error: 'DATABASE_URL is not configured in Vercel environment variables.' });
    }

    // Ensure table exists (since server.ts init doesn't run on Vercel)
    await sql`
      CREATE TABLE IF NOT EXISTS stats (
        key TEXT PRIMARY KEY,
        value INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    let views = 0;
    const result = await sql`SELECT value FROM stats WHERE key = 'view_count'`;
    views = result[0]?.value || 0;
    
    // Fetch Google Scholar Citations (with caching if Neon is enabled)
    let citations = 0;
    const CACHE_KEY = "citations_count";

    if (sql) {
      const result = await sql`
        SELECT value, updated_at FROM stats 
        WHERE key = ${CACHE_KEY} 
        AND updated_at > NOW() - INTERVAL '24 hours'
      `;
      if (result.length > 0) {
        citations = result[0].value;
      }
    }

    if (citations === 0) {
      try {
        const scholarUrl = "https://scholar.google.com/citations?user=AGbCZG4AAAAJ&hl=en";
        const response = await fetch(scholarUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          }
        });
        const html = await response.text();
        const match = html.match(/<td class="gsc_rsb_std">(\d+)<\/td>/);
        if (match && match[1]) {
          citations = parseInt(match[1]);
          
          // Cache the result
          if (sql) {
            await sql`
              INSERT INTO stats (key, value, updated_at) 
              VALUES (${CACHE_KEY}, ${citations}, NOW())
              ON CONFLICT (key) DO UPDATE SET value = ${citations}, updated_at = NOW()
            `;
          }
        }
      } catch (e) {
        console.error("Failed to fetch scholar citations:", e);
      }
    }

    return res.status(200).json({ 
      views,
      citations
    });
  } catch (err: any) {
    console.error("Failed to fetch stats:", err);
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
}

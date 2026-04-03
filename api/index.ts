import express from "express";
import { Resend } from "resend";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

// API Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, message, view } = req.body;

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: "Email service not configured." });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "pleakley9@gmail.com",
      subject: `New Contact from ${view} View: ${name}`,
      replyTo: email,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>View:</strong> ${view}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/increment-views", async (req, res) => {
  try {
    if (!sql) return res.status(503).json({ error: "Database not configured" });
    const result = await sql`
      INSERT INTO stats (key, value) VALUES ('view_count', 1)
      ON CONFLICT (key) DO UPDATE SET value = stats.value + 1
      RETURNING value
    `;
    res.json({ views: result[0].value });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment views" });
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    if (!sql) return res.status(503).json({ error: "Database not configured" });
    
    const result = await sql`SELECT value FROM stats WHERE key = 'view_count'`;
    const views = result[0]?.value || 0;
    
    let citations = 0;
    const CACHE_KEY = "citations_count";

    const cacheResult = await sql`
      SELECT value, updated_at FROM stats 
      WHERE key = ${CACHE_KEY} 
      AND updated_at > NOW() - INTERVAL '24 hours'
    `;
    if (cacheResult.length > 0) {
      citations = cacheResult[0].value;
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
          await sql`
            INSERT INTO stats (key, value, updated_at) 
            VALUES (${CACHE_KEY}, ${citations}, NOW())
            ON CONFLICT (key) DO UPDATE SET value = ${citations}, updated_at = NOW()
          `;
        }
      } catch (e) {
        console.error("Scholar fetch error:", e);
      }
    }

    res.json({ views, citations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default app;

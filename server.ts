import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import path from "path";
import { kv } from "@vercel/kv";
import Redis from "ioredis";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Unified Redis Client Setup
let redisClient: any = null;
let redisType: 'vercel-kv' | 'ioredis' | 'none' = 'none';

if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redisClient = kv;
  redisType = 'vercel-kv';
  console.log("Using Vercel KV (REST API) for persistence.");
} else if (process.env.KV_URL || process.env.KV_REDIS_URL) {
  try {
    redisClient = new Redis(process.env.KV_URL || process.env.KV_REDIS_URL || "");
    redisType = 'ioredis';
    console.log("Using standard Redis (ioredis) for persistence via single URL.");
  } catch (err) {
    console.error("Failed to initialize ioredis:", err);
  }
}

if (redisType === 'none') {
  console.log("No Redis configuration found. Falling back to local SQLite.");
}

// Initialize SQLite Database (Fallback for local dev)
const db = new Database("portfolio.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS stats (
    key TEXT PRIMARY KEY,
    value INTEGER DEFAULT 0
  )
`);

// Ensure view_count exists in SQLite
const insert = db.prepare('INSERT OR IGNORE INTO stats (key, value) VALUES (?, ?)');
insert.run('view_count', 0);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message, view } = req.body;

    console.log(`Contact form submission received from ${view} view`);

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing in environment variables");
      return res.status(503).json({ 
        error: "Email service not configured. Please ensure RESEND_API_KEY is added to the environment variables." 
      });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields: name, email, and message are all required." });
    }

    try {
      console.log(`Attempting to send email via Resend to pleakley9@gmail.com...`);
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

      if (error) {
        console.error("Resend API Error:", error);
        return res.status(500).json({ 
          error: `Resend API Error: ${error.message}. Please check if your Resend account is active and the API key is valid.` 
        });
      }

      console.log("Email sent successfully:", data?.id);
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      console.error("Unexpected Server Error:", err);
      res.status(500).json({ error: `Internal server error: ${err.message || 'Unknown error'}` });
    }
  });

  // View Counter increment
  app.post("/api/increment-views", async (req, res) => {
    try {
      if (redisType !== 'none') {
        const views = await redisClient.incr("view_count");
        res.json({ views });
      } else {
        const update = db.prepare('UPDATE stats SET value = value + 1 WHERE key = ?');
        update.run('view_count');
        const get = db.prepare('SELECT value FROM stats WHERE key = ?');
        const row = get.get('view_count') as { value: number };
        res.json({ views: row.value });
      }
    } catch (err) {
      console.error("Failed to increment views:", err);
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  // Get Stats (Views + Citations)
  app.get("/api/stats", async (req, res) => {
    try {
      let views = 0;
      if (redisType !== 'none') {
        const val = await redisClient.get("view_count");
        views = parseInt(val?.toString() || "0");
      } else {
        const get = db.prepare('SELECT value FROM stats WHERE key = ?');
        const row = get.get('view_count') as { value: number };
        views = row.value;
      }
      
      // Fetch Google Scholar Citations (with caching if Redis is enabled)
      let citations = 0;
      const CACHE_KEY = "citations_count";
      const CACHE_TTL = 3600 * 24; // 24 hours

      if (redisType !== 'none') {
        const cached = await redisClient.get(CACHE_KEY);
        if (cached !== null) {
          citations = parseInt(cached.toString());
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
            if (redisType !== 'none') {
              if (redisType === 'vercel-kv') {
                await redisClient.set(CACHE_KEY, citations, { ex: CACHE_TTL });
              } else {
                await redisClient.set(CACHE_KEY, citations, "EX", CACHE_TTL);
              }
            }
          }
        } catch (e) {
          console.error("Failed to fetch scholar citations:", e);
        }
      }

      res.json({ 
        views,
        citations
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
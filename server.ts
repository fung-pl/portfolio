import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Neon Database Setup
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

if (sql) {
  console.log("Neon PostgreSQL persistence is ENABLED.");
  // Initialize table
  (async () => {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS stats (
          key TEXT PRIMARY KEY,
          value INTEGER DEFAULT 0,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      await sql`INSERT INTO stats (key, value) VALUES ('view_count', 0) ON CONFLICT (key) DO NOTHING`;
    } catch (err) {
      console.error("Failed to initialize Neon table:", err);
    }
  })();
} else {
  console.warn("DATABASE_URL not found. Persistence features (views/citations) will not work.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Serve static files from the public directory
  app.use(express.static("public"));

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
      if (!sql) {
        return res.status(503).json({ error: "Database not configured" });
      }
      const result = await sql`
        INSERT INTO stats (key, value) VALUES ('view_count', 1)
        ON CONFLICT (key) DO UPDATE SET value = stats.value + 1
        RETURNING value
      `;
      res.json({ views: result[0].value });
    } catch (err) {
      console.error("Failed to increment views:", err);
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  // Get Stats (Views + Citations)
  app.get("/api/stats", async (req, res) => {
    try {
      if (!sql) {
        return res.status(503).json({ error: "Database not configured" });
      }
      
      const result = await sql`SELECT value FROM stats WHERE key = 'view_count'`;
      const views = result[0]?.value || 0;
      
      // Fetch Google Scholar Citations (with caching if Neon is enabled)
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
            
            // Cache the result
            await sql`
              INSERT INTO stats (key, value, updated_at) 
              VALUES (${CACHE_KEY}, ${citations}, NOW())
              ON CONFLICT (key) DO UPDATE SET value = ${citations}, updated_at = NOW()
            `;
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

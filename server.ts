import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

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

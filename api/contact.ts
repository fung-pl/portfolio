import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, view } = req.body;

  console.log(`Contact form submission received from ${view} view via Vercel Serverless Function`);

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
    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error("Unexpected Server Error:", err);
    return res.status(500).json({ error: `Internal server error: ${err.message || 'Unknown error'}` });
  }
}

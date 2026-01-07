import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/send-email", async (req, res) => {
  console.log("Received request:", req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // safe default sender
      to: process.env.YOUR_GMAIL,
      subject: "New Contact Form Message",
      html: `
  <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">
    <div style="background:#4F46E5; padding:16px; text-align:center; color:#fff;">
      <h1 style="margin:0;">📩 New Portfolio Inquiry</h1>
    </div>
    <div style="padding:20px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:4px solid #4F46E5; padding-left:12px; margin:12px 0; color:#444;">
        ${message.replace(/\n/g, "<br>")}
      </blockquote>
    </div>
    <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;">
    <div style="padding:0 20px; font-size:12px; color:#888;">
      <p>This message was sent via your portfolio website.</p>
      <p>&copy; ${new Date().getFullYear()} Owolabi Feolami</p>
    </div>
  </div>
`,
    });

    console.log("Email sent:", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

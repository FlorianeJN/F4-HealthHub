// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // parse any JSON payload if needed:
  const { to, subject, html } = await request.json();

  // configure transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ADDRESS, // your@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD, // the 16-char app password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to,
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send failed:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

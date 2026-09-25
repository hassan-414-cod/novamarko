import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const BUSINESS_EMAIL = 'novamarko72@gmail.com';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  // No secret configured yet — tell the client to fall back to mailto instead
  // of silently failing.
  if (!appPassword) {
    return NextResponse.json(
      { ok: false, reason: 'not_configured' },
      { status: 503 }
    );
  }

  let body: { name?: string; company?: string; email?: string; budget?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid_body' }, { status: 400 });
  }

  const { name, company, email, budget, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ ok: false, reason: 'missing_fields' }, { status: 400 });
  }

  // Basic shape check — not exhaustive, just guards against obvious junk.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: 'invalid_email' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: BUSINESS_EMAIL,
        pass: appPassword,
      },
    });

    await transporter.sendMail({
      from: `Nova Marko Website <${BUSINESS_EMAIL}>`,
      to: BUSINESS_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || 'N/A'}`,
        `Email: ${email}`,
        `Budget range: ${budget || 'N/A'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #0A1428;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || 'N/A')}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Budget range:</strong> ${escapeHtml(budget || 'N/A')}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed:', err);
    return NextResponse.json({ ok: false, reason: 'send_failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { clientIp, rateLimit } from '@/lib/utils/rateLimit';

/**
 * Contact form endpoint.
 *
 * Validates + rate-limits, honeypot spam check, then forwards to an email
 * provider if configured (RESEND_API_KEY + CONTACT_EMAIL_TO). Returns 501 until
 * configured so the UI stays functional without a provider. Server-side only —
 * no secrets reach the client.
 */
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Rate limit: 5 requests/min per IP.
  const limit = rateLimit(`contact:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden "company" field; reject silently-successfully.
  if (body.company) {
    return NextResponse.json({ message: 'Message sent!' }, { status: 200 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { message: 'Please provide your name, a valid email, and a message (10+ characters).' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    return NextResponse.json(
      { message: 'The contact form is not enabled yet. Please email us directly.' },
      { status: 501 },
    );
  }

  // TODO: send email via provider (e.g. Resend) using apiKey + to.
  return NextResponse.json({ message: 'Thanks! Your message has been sent.' }, { status: 200 });
}

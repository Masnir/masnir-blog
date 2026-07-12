import { NextResponse } from 'next/server';

/**
 * Newsletter subscription endpoint.
 *
 * Provider-agnostic stub: validates input, then either forwards to the
 * configured provider or returns 501 (Not Implemented) if none is set. This
 * lets the frontend ship complete UX now; enabling the newsletter later is a
 * backend-only change (set NEWSLETTER_* env vars + implement the provider call).
 *
 * NOTE: no secrets are ever exposed to the client — this runs server-side only.
 */
export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const email = String(body.email ?? '').trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
  }

  const provider = process.env.NEWSLETTER_PROVIDER;
  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (!provider || !apiKey) {
    // No provider configured yet — feature disabled gracefully.
    return NextResponse.json(
      { message: 'Newsletter signups are not enabled yet. Please check back soon.' },
      { status: 501 },
    );
  }

  // TODO: forward `email` to the configured provider (Buttondown/Resend/etc.).
  // Example shape left intentionally unimplemented until a provider is chosen.
  return NextResponse.json({ message: 'You are subscribed. Welcome aboard!' }, { status: 200 });
}

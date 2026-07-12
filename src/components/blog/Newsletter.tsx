'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Newsletter signup. Posts to /api/newsletter (a serverless stub that returns
 * 501 until a provider is configured). The UX is fully wired so enabling the
 * newsletter later is a backend-only change.
 */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string };
      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? 'You are subscribed. Welcome aboard!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message ?? 'Subscription is not available yet.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-subtle p-8 sm:p-10">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-fg sm:text-3xl">
          Stay ahead of the threat curve
        </h2>
        <p className="mt-3 text-muted">
          Get new research, tutorials, and security analysis from Masnir delivered to your inbox. No
          spam, unsubscribe anytime.
        </p>

        {status === 'success' ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm font-medium text-success">
            <CheckIcon className="h-4 w-4" /> {message}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-12 flex-1 rounded-lg border border-border bg-bg px-4 text-fg placeholder:text-muted focus-visible:border-accent"
            />
            <Button type="submit" size="lg" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </form>
        )}

        {status === 'error' && <p className="mt-3 text-sm text-danger">{message}</p>}
      </div>
    </div>
  );
}

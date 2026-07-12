'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/icons';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Contact form. Posts to /api/contact (serverless stub returning 501 until an
 * email provider is configured). Includes a honeypot field for basic spam
 * resistance; real validation/rate-limiting lives server-side.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      message: form.get('message'),
      company: form.get('company'), // honeypot — must stay empty
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { message?: string };
      setStatus(res.ok ? 'success' : 'error');
      setMessage(data.message ?? (res.ok ? 'Message sent!' : 'Contact form is not available yet.'));
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please email us directly.');
    }
  };

  if (status === 'success') {
    return (
      <p className="inline-flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm font-medium text-success">
        <CheckIcon className="h-4 w-4" /> {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-fg placeholder:text-muted focus-visible:border-accent"
        />
      </div>
      {/* Honeypot: visually hidden; bots fill it, humans don't. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </Button>
        {status === 'error' && <span className="text-sm text-danger">{message}</span>}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-lg border border-border bg-bg px-4 text-fg placeholder:text-muted focus-visible:border-accent"
      />
    </div>
  );
}

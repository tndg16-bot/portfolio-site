'use client';
import Script from 'next/script';
import { useState } from 'react';
import { Analytics } from '@/lib/r4/events';

declare global {
  interface Window {
    turnstile?: {
      getResponse: (id?: string) => string;
      reset: (id?: string) => void;
    };
  }
}

export function ContactFormR4() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const formData = new FormData(e.currentTarget);
    const turnstileToken = window.turnstile?.getResponse() ?? '';
    if (!turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      setStatus('error');
      setErrorMsg('CAPTCHA を完了してください。');
      return;
    }
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company') ?? '',
      inquiry_type: formData.get('inquiry_type'),
      body: formData.get('body'),
      turnstileToken,
    };
    try {
      const res = await fetch('/api/r4/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
        Analytics.formSubmit(
          'contact',
          payload.inquiry_type as 'business' | 'individual' | 'general'
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg((data as { error?: string }).error ?? '送信に失敗しました。');
        window.turnstile?.reset();
      }
    } catch {
      setStatus('error');
      setErrorMsg('ネットワークエラー。時間を置いて再度お試しください。');
      window.turnstile?.reset();
    }
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-w-3 text-wagashi-charcoal">
        <div>
          <label htmlFor="name" className="block text-sm font-serif text-wagashi-aizumi">
            お名前 <span className="text-wagashi-ginshu">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-w-1 w-full border-b border-wagashi-indigo bg-transparent py-w-1 outline-none focus:border-wagashi-vermilion"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-serif text-wagashi-aizumi">
            メールアドレス <span className="text-wagashi-ginshu">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-w-1 w-full border-b border-wagashi-indigo bg-transparent py-w-1 outline-none focus:border-wagashi-vermilion"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-serif text-wagashi-aizumi">
            会社名（任意）
          </label>
          <input
            id="company"
            name="company"
            className="mt-w-1 w-full border-b border-wagashi-indigo bg-transparent py-w-1 outline-none focus:border-wagashi-vermilion"
          />
        </div>
        <div>
          <label htmlFor="inquiry_type" className="block text-sm font-serif text-wagashi-aizumi">
            お問い合わせ種別 <span className="text-wagashi-ginshu">*</span>
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            required
            className="mt-w-1 w-full border-b border-wagashi-indigo bg-transparent py-w-1 outline-none focus:border-wagashi-vermilion"
          >
            <option value="business">法人サービスについて</option>
            <option value="individual">個人サービスについて</option>
            <option value="general">その他</option>
          </select>
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-serif text-wagashi-aizumi">
            お問い合わせ内容 <span className="text-wagashi-ginshu">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={6}
            className="mt-w-1 w-full border-b border-wagashi-indigo bg-transparent py-w-1 outline-none focus:border-wagashi-vermilion"
          />
        </div>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        ) : null}
        <div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-sm bg-wagashi-vermilion px-w-3 py-w-2 text-white disabled:opacity-50"
          >
            {status === 'submitting' ? '書いています…' : 'お問い合わせを送る'}
          </button>
        </div>
        {status === 'success' ? (
          <p className="text-wagashi-indigo" role="status">
            お受けしました。お返事は1営業日以内に。
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="text-wagashi-vermilion" role="alert">
            {errorMsg}
          </p>
        ) : null}
      </form>
    </>
  );
}

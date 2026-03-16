import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-japan-indigo/10 bg-japan-indigo/5 pb-20 md:pb-0">
      {/* 3-Column Links */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">サービス</h4>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/services" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">個人向けサービス</Link>
              </li>
              <li>
                <Link href="/services" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">法人向けサービス</Link>
              </li>
              <li>
                <Link href="/services" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">AI開発支援</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Content */}
          <div>
            <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">コンテンツ</h4>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/blog" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">ブログ</Link>
              </li>
              <li>
                <Link href="/projects" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">実績・作品集</Link>
              </li>
              <li>
                <Link href="/faq" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">よくある質問</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-bold text-japan-indigo uppercase tracking-wider mb-4">お問い合わせ</h4>
            <ul className="space-y-1 text-sm text-zinc-600">
              <li>
                <Link href="/contact" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">無料相談予約</Link>
              </li>
              <li>
                <a
                  href="https://lin.ee/VAYurUv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors"
                >
                  LINE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-japan-indigo/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p className="tracking-wide">&copy; 2026 TAKAHIRO MOTOYAMA</p>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/privacy" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">プライバシーポリシー</Link>
            <Link href="/legal" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-japan-indigo transition-colors">特定商取引法に基づく表記</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

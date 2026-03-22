import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-default bg-surface-section pb-20 md:pb-0">
      {/* 3-Column Links */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-sm font-bold text-text-strong uppercase tracking-wider mb-4">サービス</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>
                <Link href="/services#individual" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">個人の方へ</Link>
              </li>
              <li>
                <Link href="/services#corporate" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">法人の方へ</Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">料金の目安</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Content */}
          <div>
            <h4 className="text-sm font-bold text-text-strong uppercase tracking-wider mb-4">実績</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>
                <Link href="/case-studies" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">導入事例</Link>
              </li>
              <li>
                <Link href="/projects" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">開発プロジェクト</Link>
              </li>
              <li>
                <Link href="/blog" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">ブログ</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-bold text-text-strong uppercase tracking-wider mb-4">お問い合わせ</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>
                <Link href="/contact" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">30分無料診断</Link>
              </li>
              <li>
                <a
                  href="https://lin.ee/VAYurUv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors"
                >
                  LINE
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-default">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p className="tracking-wide">&copy; 2026 TAKAHIRO MOTOYAMA</p>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/privacy" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">プライバシーポリシー</Link>
            <Link href="/legal" className="inline-flex items-center min-h-[48px] md:min-h-0 py-2 md:py-0 hover:text-text-strong transition-colors">特定商取引法に基づく表記</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

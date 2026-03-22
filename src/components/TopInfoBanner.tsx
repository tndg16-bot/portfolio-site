interface TopInfoBannerProps {
  title?: string;
  message: string;
}

export default function TopInfoBanner({
  title = "ご案内",
  message,
}: TopInfoBannerProps) {
  return (
    <section className="w-full max-w-4xl px-4 mb-8">
      <div className="glass-panel rounded-2xl border border-japan-indigo/10 bg-surface-alt px-4 py-3 md:px-6 md:py-4">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <p className="text-xs font-semibold tracking-wide text-japan-indigo/80">
            {title}
          </p>
          <p className="text-sm leading-relaxed text-text-primary">{message}</p>
        </div>
      </div>
    </section>
  );
}

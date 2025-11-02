export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-white/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} 菲利斯猫社区 · Felis Cat Orbit</p>
        <div className="flex gap-4">
          <a className="hover:text-white" href="https://t.me/feilipusichina/" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a className="hover:text-white" href="https://x.com/HandlerNau54075/" target="_blank" rel="noreferrer">
            X (Twitter)
          </a>
          <a className="hover:text-white" href="mailto:hello@feliscat.space">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}







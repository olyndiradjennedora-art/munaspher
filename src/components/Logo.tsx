export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 drop-shadow-md">
        <defs>
          <radialGradient id="og2" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#4AB8D8" stopOpacity=".95" />
            <stop offset="70%" stopColor="#1E7FA8" stopOpacity=".8" />
            <stop offset="100%" stopColor="#125C7A" stopOpacity=".6" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#og2)" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="#F26522" strokeWidth="2" transform="rotate(20 100 100)" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="#1E7FA8" strokeWidth="2" transform="rotate(-30 100 100)" />
        <ellipse cx="100" cy="100" rx="58" ry="90" fill="none" stroke="#4AB8D8" strokeWidth="1.2" opacity=".7" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="58" ry="90" fill="none" stroke="#F26522" strokeWidth="1.2" opacity=".45" transform="rotate(-55 100 100)" />
        <circle cx="100" cy="100" r="15" fill="#4AB8D8" opacity=".98" />
        <circle cx="100" cy="100" r="7" fill="#fff" />
        <circle cx="100" cy="10" r="5" fill="#F26522" />
        <circle cx="190" cy="100" r="5" fill="#F26522" />
        <circle cx="100" cy="190" r="5" fill="#F26522" />
        <circle cx="10" cy="100" r="5" fill="#F26522" />
        <circle cx="158" cy="36" r="4.5" fill="#4AB8D8" opacity=".8" />
        <circle cx="164" cy="164" r="4.5" fill="#4AB8D8" opacity=".8" />
        <circle cx="36" cy="164" r="4.5" fill="#4AB8D8" opacity=".8" />
        <circle cx="36" cy="36" r="4.5" fill="#4AB8D8" opacity=".8" />
      </svg>
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold text-base tracking-wider uppercase" style={{ fontFamily: 'var(--font-display)' }}>
          <span className="text-orange-500">MUNA'</span><span className="text-blue-400">SPHERE-RCA</span>
        </span>
        <span className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide text-center text-blue-300">DARE TO TAKE ACTION</span>
      </div>
    </div>
  );
}

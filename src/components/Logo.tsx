export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <defs>
          <radialGradient id="og2" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#4AB8D8" stopOpacity=".95" />
            <stop offset="70%" stopColor="#1E7FA8" stopOpacity=".8" />
            <stop offset="100%" stopColor="#125C7A" stopOpacity=".5" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#og2)" strokeWidth="1.5" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="#F26522" strokeWidth="1.8" transform="rotate(20 100 100)" />
        <ellipse cx="100" cy="100" rx="90" ry="34" fill="none" stroke="#1E7FA8" strokeWidth="1.8" transform="rotate(-30 100 100)" />
        <ellipse cx="100" cy="100" rx="58" ry="90" fill="none" stroke="#4AB8D8" strokeWidth="1" opacity=".6" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="58" ry="90" fill="none" stroke="#F26522" strokeWidth="1" opacity=".35" transform="rotate(-55 100 100)" />
        <circle cx="100" cy="100" r="13" fill="#4AB8D8" opacity=".9" />
        <circle cx="100" cy="100" r="6.5" fill="#fff" />
        <circle cx="100" cy="10" r="5" fill="#F26522" />
        <circle cx="190" cy="100" r="5" fill="#F26522" />
        <circle cx="100" cy="190" r="5" fill="#F26522" />
        <circle cx="10" cy="100" r="5" fill="#F26522" />
        <circle cx="158" cy="36" r="4" fill="#4AB8D8" opacity=".7" />
        <circle cx="164" cy="164" r="4" fill="#4AB8D8" opacity=".7" />
        <circle cx="36" cy="164" r="4" fill="#4AB8D8" opacity=".7" />
        <circle cx="36" cy="36" r="4" fill="#4AB8D8" opacity=".7" />
      </svg>
      <span className="font-bold text-lg tracking-wider uppercase" style={{ fontFamily: 'var(--font-display)' }}>
        MUNA'SPHERE-RCA
      </span>
    </div>
  );
}

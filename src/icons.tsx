import type { CSSProperties } from "react";
import type { Motif } from "./data";

type IconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function Lotus({ size = 48, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden>
      <path
        d="M32 8c3 7.2 10 12 18 13-2.6 10.2-9.6 18.2-18 21.6C23.6 39.2 16.6 31.2 14 21 22 20 29 15.2 32 8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M32 18c1.8 4 5.6 6.6 10 7.2-1.4 5.6-5.4 10-10 11.8-4.6-1.8-8.6-6.2-10-11.8 4.4-.6 8.2-3.2 10-7.2z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="28.5" r="3.2" fill="currentColor" />
      <path d="M16 48c5.2-3.4 10.6-5.2 16-5.2S42.8 44.6 48 48" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 53c4-2 8-3 12-3s8 1 12 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function OmMark({ size = 72, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={className} style={style} aria-hidden>
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.15" opacity="0.45" />
      <circle cx="40" cy="40" r="31" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
      <text
        x="40"
        y="50"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Noto Serif Devanagari, serif"
        fontSize="36"
        fontWeight="600"
      >
        ॐ
      </text>
    </svg>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 12" fill="none" aria-hidden>
      <path d="M8 6h78" stroke="currentColor" strokeWidth="1" />
      <path d="M134 6h78" stroke="currentColor" strokeWidth="1" />
      <path d="M110 6l-6-4 6 4-6 4 6-4h0l6-4-6 4 6 4-6-4z" fill="currentColor" />
      <circle cx="110" cy="6" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function ChariotScene({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 200" fill="none" aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8D2A8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1C2740" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" />
      <path d="M0 148c40-18 80-22 120-10 32 10 58 8 88-8 36-20 72-18 112 4v66H0V148z" fill="#1C2740" opacity="0.12" />
      <path d="M24 150l8-22 10 6 6-16 12 10 4-8 14 14" stroke="#1C2740" strokeWidth="1.2" opacity="0.35" />
      <path d="M248 128l6-18h10l4 18" stroke="#1C2740" strokeWidth="1.1" opacity="0.4" />
      <path d="M258 110v-16" stroke="#1C2740" strokeWidth="1.1" opacity="0.4" />
      <circle cx="252" cy="148" r="10" stroke="#B8954A" strokeWidth="1.3" />
      <circle cx="286" cy="148" r="10" stroke="#B8954A" strokeWidth="1.3" />
      <path d="M252 148h34" stroke="#1C2740" strokeWidth="1.4" />
      <path d="M258 148v-22h20v8l12 4" stroke="#1C2740" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="268" cy="118" r="5" stroke="#1C2740" strokeWidth="1.2" />
      <path d="M272 116c8-2 14-8 16-16" stroke="#1C2740" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="276" cy="122" r="5.5" stroke="#1C2740" strokeWidth="1.2" />
      <path d="M40 168c28-6 70-8 140 0 40 4 80 2 140 8" stroke="#B8954A" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export function FluteKrishna({ size = 160, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" className={className} fill="none" aria-hidden>
      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <path
        d="M80 38c8 0 16 10 16 24 0 8-3 14-7 18 10 6 18 18 18 32 0 6-2 12-6 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="80" cy="50" r="12" stroke="currentColor" strokeWidth="1.6" />
      <path d="M68 50c0-10 4-18 12-22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M54 86h72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 86v4M74 86v4M86 86v4M98 86v4M110 86v4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M70 78c-10 8-14 22-8 34 8 14 28 18 40 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M92 128c8 10 18 16 28 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function MotifMark({ motif, size = 28 }: { motif: Motif; size?: number }) {
  if (motif === "lotus") return <Lotus size={size} />;
  if (motif === "flute") return <FluteKrishna size={size} />;
  if (motif === "chariot") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="9" cy="22" r="4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="23" cy="22" r="4" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 22h14M12 22V12h10l4 6" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="16" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (motif === "conch") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M18 6c6 2 10 8 8 14-2 8-12 10-16 6C6 22 8 12 14 8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 12c2 1 4 4 3 7" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (motif === "wheel") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16 6v20M6 16h20M9 9l14 14M23 9L9 23" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (motif === "tree") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 28V14" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="12" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M12 28h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (motif === "peacock") {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M10 22c0-8 4-14 12-16 2 6-2 12-8 14" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="22" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 22c-4 2-6 6-4 8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 6l2 6h6l-5 4 2 6-5-3.5L11 22l2-6-5-4h6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function SreeoTiles({ size = 26, dropIn = false }: { size?: number; dropIn?: boolean }) {
  const tiles = ["#22d3ee", "#7c4dff", "#ff6b9a", "#ffb703"];
  return (
    <div className={`sreeo-tiles ${dropIn ? "drop" : ""}`} aria-hidden>
      {tiles.map((c, i) => (
        <span key={c} className="sreeo-tile" style={{ background: c, width: size, height: size, animationDelay: `${i * 90}ms` }} />
      ))}
    </div>
  );
}

export const Glyph = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19h12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v2M12 19v2M4.5 4.5l1.5 1.5M18 18l1.5 1.5M3 12h2M19 12h2M4.5 19.5 6 18M18 6l1.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  bookmark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4h10a1 1 0 0 1 1 1v16l-6-3.5L6 21V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19.5c1.6-3.4 4-5 7-5s5.4 1.6 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6.5v11l10-5.5L8 6.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 6h3.5v12H7zM13.5 6H17v12h-3.5z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="6.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11.2 15 7.4M8 12.8l7 4.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 4h8l4 4v12H7V4z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 4v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  headphones: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13" width="4.5" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="16.5" y="13" width="4.5" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

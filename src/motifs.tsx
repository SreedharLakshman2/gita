import type { CSSProperties } from "react";

type MarkProps = {
  className?: string;
  style?: CSSProperties;
};

export function PeacockMotif({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={`motif peacock-motif ${className ?? ""}`} style={style} aria-hidden>
      <g className="peacock-fan">
        <path
          d="M32 62C12 52 2 30 14 6c12 12 16 32 18 56z"
          fill="#0c4f49"
          stroke="#e8c96a"
          strokeWidth="1.5"
        />
        <path
          d="M32 62C52 52 62 30 50 6C38 18 34 38 32 62z"
          fill="#0c4f49"
          stroke="#e8c96a"
          strokeWidth="1.5"
        />
        <path
          d="M32 62C18 42 18 14 32 2c14 12 14 40 0 60z"
          fill="#1a7a72"
          stroke="#e8c96a"
          strokeWidth="1.6"
        />
        <ellipse cx="18" cy="24" rx="8.5" ry="10.5" fill="#e8c96a" />
        <ellipse cx="18" cy="24" rx="5.2" ry="6.6" fill="#163a6b" />
        <circle cx="18" cy="21.6" r="2.1" fill="#f7edd0" />
        <ellipse cx="32" cy="16" rx="9.5" ry="11.5" fill="#e8c96a" />
        <ellipse cx="32" cy="16" rx="5.8" ry="7.2" fill="#163a6b" />
        <circle cx="32" cy="13.4" r="2.4" fill="#f7edd0" />
        <ellipse cx="46" cy="24" rx="8.5" ry="10.5" fill="#e8c96a" />
        <ellipse cx="46" cy="24" rx="5.2" ry="6.6" fill="#163a6b" />
        <circle cx="46" cy="21.6" r="2.1" fill="#f7edd0" />
      </g>
      <ellipse cx="32" cy="57" rx="8" ry="5.5" fill="#1c2740" stroke="#e8c96a" strokeWidth="1.4" />
    </svg>
  );
}

export function BansuriMotif({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={`motif bansuri-motif ${className ?? ""}`} style={style} aria-hidden>
      <g className="bansuri-note n1">
        <ellipse cx="48" cy="11" rx="4.6" ry="3.2" fill="#e8c96a" />
        <path d="M52.4 11V2.2" stroke="#e8c96a" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M52.4 2.2c4.2.8 6.2 2.6 6.2 4.4" fill="none" stroke="#e8c96a" strokeWidth="1.5" />
      </g>
      <g className="bansuri-note n2">
        <ellipse cx="56.5" cy="22" rx="3.4" ry="2.4" fill="#f0ddb0" />
        <path d="M59.7 22V14.4" stroke="#f0ddb0" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <g className="bansuri-sway">
        <g transform="rotate(-32 32 36)">
          <rect x="1" y="31" width="62" height="10" rx="5" fill="#5c4214" />
          <rect x="2.5" y="32.3" width="59" height="7.4" rx="3.7" fill="#e8c96a" />
          <rect x="6" y="33" width="52" height="2.2" rx="1" fill="#f7edd0" opacity="0.45" />
          <rect x="12" y="30.4" width="2.2" height="11.2" rx="0.7" fill="#3d2c10" />
          <rect x="32" y="30.4" width="2.2" height="11.2" rx="0.7" fill="#3d2c10" />
          <rect x="50" y="30.4" width="2.2" height="11.2" rx="0.7" fill="#3d2c10" />
          <ellipse cx="6" cy="36" rx="3.4" ry="6.2" fill="#d4b56a" stroke="#3d2c10" strokeWidth="0.9" />
          <ellipse cx="5.4" cy="36" rx="1.3" ry="2.4" fill="#1c2740" />
          <circle cx="19" cy="36" r="1.55" fill="#1c2740" />
          <circle cx="25.5" cy="36" r="1.55" fill="#1c2740" />
          <circle cx="39.5" cy="36" r="1.55" fill="#1c2740" />
          <circle cx="45.8" cy="36" r="1.55" fill="#1c2740" />
          <circle cx="57.2" cy="36" r="1.15" fill="#1c2740" />
        </g>
      </g>
    </svg>
  );
}

export function LotusMotif({ className, style }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={`motif lotus-motif ${className ?? ""}`} style={style} aria-hidden>
      <g className="lotus-bloom">
        <path d="M32 56C16 46 10 32 16 18c10 8 14 18 16 38z" fill="#8a3544" stroke="#e8c96a" strokeWidth="1.2" />
        <path d="M32 56C48 46 54 32 48 18c-10 8-14 18-16 38z" fill="#8a3544" stroke="#e8c96a" strokeWidth="1.2" />
        <path d="M32 56C21 42 20 24 32 8c12 16 11 34 0 48z" fill="#c45c68" stroke="#e8c96a" strokeWidth="1.25" />
        <path d="M20 52C12 40 16 26 28 18c2 12 2 24-8 34z" fill="#e8c96a" />
        <path d="M44 52C52 40 48 26 36 18c-2 12-2 24 8 34z" fill="#e8c96a" />
        <ellipse cx="32" cy="48" rx="6.5" ry="4" fill="#f7edd0" />
      </g>
    </svg>
  );
}

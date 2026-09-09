import type { ReactNode } from "react";
import { SacredMark } from "./art";
import { Brand } from "./brand";
import { Glyph } from "./icons";
import { useStore, type TabId } from "./store";

export function StatusBar() {
  return (
    <div className="status" aria-hidden>
      <span className="status-time">9:41</span>
      <span className="status-island" />
      <span className="status-icons">
        <svg viewBox="0 0 18 12" width="17" height="11">
          <rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.6" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.6" fill="currentColor" />
          <rect x="13.5" y="0.5" width="3" height="11.5" rx="0.6" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 16 12" width="15" height="11">
          <path d="M1 8.2c2.6-3 5.8-4.5 9.4-4.5 1.4 0 2.7.2 4 .7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4.2 9.6c1.6-1.8 3.6-2.6 5.8-2.6.9 0 1.7.1 2.5.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="10.6" cy="10.4" r="1.15" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 27 12" width="25" height="12">
          <rect x="0.6" y="1" width="22" height="10" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <rect x="2" y="2.4" width="16.5" height="7.2" rx="1.4" fill="currentColor" />
          <rect x="23.4" y="4" width="1.8" height="4" rx="0.6" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

export function HomeIndicator() {
  return <div className="home-bar" aria-hidden />;
}

export function BottomNav() {
  const { tab, setTab } = useStore();
  const items: { id: TabId; label: string; lottie: "lotus" | "peacock" | "flute" | "glow"; icon: ReactNode }[] = [
    { id: "home", label: "Home", lottie: "lotus", icon: Glyph.home },
    { id: "gita", label: "Gita", lottie: "peacock", icon: Glyph.book },
    { id: "daily", label: "Daily", lottie: "glow", icon: Glyph.sun },
    { id: "bookmarks", label: "Saved", lottie: "peacock", icon: Glyph.bookmark },
    { id: "profile", label: "Profile", lottie: "flute", icon: Glyph.person },
  ];
  return (
    <nav className="tabbar" aria-label="Main">
      {items.map((item) => {
        const on = tab === item.id;
        return (
          <button
            key={item.id}
            className={`tab ${on ? "on" : ""}`}
            onClick={() => setTab(item.id)}
            type="button"
            aria-current={on ? "page" : undefined}
          >
            <span className={`tab-icon ${on && item.lottie !== "glow" ? "has-motif" : ""}`}>
              {on && item.lottie !== "glow" ? (
                <SacredMark name={item.lottie} className="tab-motif" />
              ) : (
                item.icon
              )}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function Phone({
  children,
  dark = true,
  label,
  onOpen,
}: {
  children: ReactNode;
  dark?: boolean;
  label?: string;
  onOpen?: () => void;
}) {
  return (
    <figure className={`device ${dark ? "is-dark" : ""}`}>
      {label ? <figcaption className="device-label">{label}</figcaption> : null}
      <div
        className="bezel"
        data-theme={dark ? "dark" : "light"}
        onClick={onOpen}
        onKeyDown={(e) => {
          if (onOpen && (e.key === "Enter" || e.key === " ")) onOpen();
        }}
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
      >
        <div className="screen">{children}</div>
      </div>
    </figure>
  );
}

export function AppShell({
  children,
  nav = true,
  parchment = false,
}: {
  children: ReactNode;
  nav?: boolean;
  parchment?: boolean;
}) {
  const { dark } = useStore();
  return (
    <div className={`app-shell ${parchment ? "parchment" : ""}`} data-theme={dark ? "dark" : "light"}>
      <StatusBar />
      <div className="app-body">{children}</div>
      {nav ? <BottomNav /> : null}
      <HomeIndicator />
    </div>
  );
}

export function GoldBtn({
  children,
  onClick,
  ghost,
  wide,
}: {
  children: ReactNode;
  onClick?: () => void;
  ghost?: boolean;
  wide?: boolean;
}) {
  return (
    <button className={`gold-btn ${ghost ? "ghost" : ""} ${wide ? "wide" : ""}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function Back({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button className="icon-btn back-btn" type="button" onClick={onClick} aria-label={label}>
      {Glyph.back}
    </button>
  );
}

export function IconBtn({
  children,
  onClick,
  label,
  active,
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button className={`icon-btn ${active ? "active" : ""}`} type="button" onClick={onClick} aria-label={label}>
      {children}
    </button>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="meter" aria-hidden>
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function Pad({ n }: { n: number }) {
  return <span className="chap-no">{String(n).padStart(2, "0")}</span>;
}

export function StudioMark() {
  return (
    <div className="studio-foot">
      <span className="studio-name">{Brand.studio}</span>
      <span className="studio-copy">{Brand.copyright}</span>
    </div>
  );
}

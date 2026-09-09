import { Brand } from "./brand";
import { BOOK_EDITIONS, CHAPTERS } from "./data";
import { Lotus, MotifMark, SreeoTiles } from "./icons";
import { ActiveScreen } from "./screens";
import { StoreProvider, type ScreenId, type TabId } from "./store";
import { Phone } from "./ui";

type Freeze = {
  screen: ScreenId;
  dark?: boolean;
  lang?: "en" | "ta" | "hi" | "sa";
  chapter?: number;
  verse?: number;
  tab?: TabId;
};

const FLOW: { label: string; freeze: Freeze }[] = [
  { label: "01  Sreeo splash", freeze: { screen: "sreeo" } },
  { label: "02  Splash", freeze: { screen: "splash" } },
  { label: "03  Onboarding", freeze: { screen: "onboard" } },
  { label: "04  Home", freeze: { screen: "home", tab: "home" } },
  { label: "05  Chapters", freeze: { screen: "chapters", tab: "gita" } },
  { label: "06  Chapter", freeze: { screen: "chapter", chapter: 2, verse: 1, tab: "gita" } },
  { label: "07  Verse reader", freeze: { screen: "verse", chapter: 2, verse: 47 } },
  { label: "08  Language", freeze: { screen: "language", tab: "profile" } },
  { label: "09  Daily verse", freeze: { screen: "daily", tab: "daily" } },
  { label: "10  Audio", freeze: { screen: "audio", chapter: 2, verse: 47 } },
  { label: "11  Bookmarks", freeze: { screen: "bookmarks", tab: "bookmarks" } },
  { label: "12  Search", freeze: { screen: "search" } },
  { label: "13  Profile", freeze: { screen: "profile", tab: "profile" } },
  { label: "14  Dark mode", freeze: { screen: "verse", chapter: 2, verse: 47, dark: true } },
];

export function DesignBoard({ onOpen }: { onOpen: (freeze: Freeze) => void }) {
  return (
    <div className="board">
      <aside className="board-side">
        <Lotus size={64} className="gold-icon" />
        <p className="board-kicker">Sreeo Studio</p>
        <h1>Bhagavad Gita</h1>
        <p className="board-tag">Timeless Wisdom. Modern Life.</p>
        <GoldMini />
        <ul className="board-feats">
          <li>Multiple languages</li>
          <li>Beautiful book experience</li>
          <li>Audio &amp; chanting</li>
          <li>Daily wisdom</li>
          <li>Bookmarks &amp; notes</li>
          <li>Dark mode</li>
        </ul>
        <p className="board-quote">The journey within begins here.</p>
        <button className="gold-btn wide" type="button" onClick={() => onOpen({ screen: "sreeo" })}>
          Open live prototype
        </button>
        <div className="board-studio">
          <SreeoTiles size={12} />
          <span>{Brand.studio}</span>
          <small>{Brand.copyright}</small>
        </div>
      </aside>

      <div className="board-main">
        <header className="board-hero">
          <p>App Store–ready product design</p>
          <h2>Gita — complete user journey</h2>
          <p>
            Splash → Onboarding → Home → Chapters → Chapter → Verse → Language → Audio → Bookmarks → Search →
            Profile
          </p>
        </header>

        <div className="board-grid">
          {FLOW.map((item) => (
            <StoreProvider key={item.label} freeze={item.freeze}>
              <Phone label={item.label} dark={item.freeze.dark} onOpen={() => onOpen(item.freeze)}>
                <ActiveScreen />
              </Phone>
            </StoreProvider>
          ))}
        </div>

        <section className="board-block">
          <h3>Beautiful scripture collection</h3>
          <div className="edition-row">
            {BOOK_EDITIONS.map((ed) => (
              <article key={ed.id} className="edition" style={{ background: ed.tone }}>
                <MotifMark motif={ed.id === "audio" ? "flute" : ed.id === "daily" ? "tree" : "lotus"} size={28} />
                <strong>{ed.title}</strong>
                <span>{ed.line}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="board-block">
          <h3>Eighteen chapters</h3>
          <div className="mini-covers">
            {CHAPTERS.map((ch) => (
              <div key={ch.number} className="mini-cover" style={{ background: ch.accent }}>
                <span>{String(ch.number).padStart(2, "0")}</span>
                <small>{ch.saTitle.split(" ")[0]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="board-block flow-row">
          <h3>User flow</h3>
          <ol>
            <li>Sreeo splash</li>
            <li>Gita emblem</li>
            <li>Language</li>
            <li>Home</li>
            <li>Chapters</li>
            <li>Reader</li>
            <li>Audio</li>
            <li>Saved</li>
            <li>Search</li>
            <li>Profile</li>
          </ol>
        </section>

        <footer className="board-end">
          <Lotus size={36} className="gold-icon" />
          <p>Let the Gita be your guide.</p>
        </footer>
      </div>
    </div>
  );
}

function GoldMini() {
  return (
    <svg className="rule left" viewBox="0 0 180 10" fill="none" aria-hidden>
      <path d="M0 5h72" stroke="#B8954A" strokeWidth="1" />
      <circle cx="84" cy="5" r="2" fill="#B8954A" />
      <path d="M96 5h84" stroke="#B8954A" strokeWidth="1" />
    </svg>
  );
}

export type { Freeze };

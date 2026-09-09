import { useEffect, useMemo, useState } from "react";
import { Brand, LANGUAGES, READER_TABS, type LangId } from "./brand";
import {
  CHAPTERS,
  CONTINUE_KEY,
  SEARCH_CHIPS,
  VERSES,
  chapterByNumber,
  meaning,
  nextVerse,
  prevVerse,
  verseAt,
  versesForChapter,
} from "./data";
import {
  ChariotScene,
  FluteKrishna,
  Glyph,
  GoldRule,
  Lotus,
  MotifMark,
  OmMark,
  SreeoTiles,
} from "./icons";
import { langLabel, speak, stopSpeak, useStore } from "./store";
import { AppShell, Back, GoldBtn, IconBtn, Pad, Progress, StudioMark } from "./ui";

export function ActiveScreen() {
  const { screen } = useStore();
  switch (screen) {
    case "sreeo":
      return <SreeoSplash />;
    case "splash":
      return <GitaSplash />;
    case "onboard":
      return <Onboarding />;
    case "home":
      return <Home />;
    case "chapters":
      return <Chapters />;
    case "chapter":
      return <ChapterDetail />;
    case "verse":
      return <VerseReader />;
    case "language":
      return <LanguageScreen />;
    case "daily":
      return <DailyVerse />;
    case "audio":
      return <AudioReader />;
    case "bookmarks":
      return <Bookmarks />;
    case "search":
      return <SearchScreen />;
    case "profile":
      return <Profile />;
    default:
      return <Home />;
  }
}

export function SreeoSplash() {
  const { go } = useStore();
  useEffect(() => {
    const t = window.setTimeout(() => go("splash"), 2200);
    return () => window.clearTimeout(t);
  }, [go]);

  return (
    <AppShell nav={false} parchment>
      <button className="splash sreeo-splash" type="button" onClick={() => go("splash")} aria-label="Continue">
        <div className="mandala" aria-hidden />
        <div className="splash-center">
          <SreeoTiles size={28} dropIn />
          <div className="sreeo-word">{Brand.studio}</div>
          <GoldRule className="rule" />
          <div className="sreeo-app">{Brand.full}</div>
          <div className="sreeo-divine">Divine reading · inner quiet</div>
        </div>
        <div className="splash-foot">
          <SreeoTiles size={10} />
          <StudioMark />
        </div>
      </button>
    </AppShell>
  );
}

export function GitaSplash() {
  const { go, onboarded } = useStore();
  useEffect(() => {
    const t = window.setTimeout(() => go(onboarded ? "home" : "onboard"), 2600);
    return () => window.clearTimeout(t);
  }, [go, onboarded]);

  return (
    <AppShell nav={false} parchment>
      <button className="splash gita-splash" type="button" onClick={() => go("onboard")} aria-label="Begin">
        <div className="grain" aria-hidden />
        <div className="splash-center">
          <Lotus size={72} className="gold-icon" />
          <OmMark size={108} className="om-mark" />
          <h1 className="display">{Brand.full}</h1>
          <GoldRule className="rule" />
          <p className="kicker">{Brand.splashLine}</p>
        </div>
        <div className="splash-foot">
          <span className="whisper">A Sreeo Studio manuscript</span>
          <StudioMark />
        </div>
      </button>
    </AppShell>
  );
}

export function Onboarding() {
  const { lang, setLang, completeOnboarding } = useStore();
  return (
    <AppShell nav={false} parchment>
      <div className="page onboard">
        <div className="onboard-art">
          <ChariotScene className="chariot" />
          <div className="art-caption">Kurukshetra · a quiet hour before the teaching</div>
        </div>
        <h1 className="display sm">Discover the Wisdom of the Gita</h1>
        <p className="lede">Read, listen and reflect on the timeless teachings of Lord Krishna.</p>
        <p className="section-label">Choose a language to begin</p>
        <div className="lang-row">
          {LANGUAGES.slice(0, 6).map((l) => (
            <button
              key={l.id}
              type="button"
              className={`chip ${lang === l.id ? "on" : ""}`}
              onClick={() => setLang(l.id)}
            >
              {l.native}
            </button>
          ))}
        </div>
        <GoldBtn wide onClick={completeOnboarding}>
          Begin Reading
        </GoldBtn>
        <button className="text-link" type="button" onClick={() => completeOnboarding()}>
          Original Sanskrit is always available
        </button>
      </div>
    </AppShell>
  );
}

export function Home() {
  const { go, openVerse, dailyVerse, continueVerse, lang } = useStore();
  return (
    <AppShell>
      <div className="page home">
        <header className="home-head">
          <div>
            <p className="greet">
              Namaste <span aria-hidden>🙏</span>
            </p>
            <h1>Continue your journey</h1>
          </div>
          <button className="avatar-btn" type="button" onClick={() => go("profile")} aria-label="Profile">
            <Lotus size={22} />
          </button>
        </header>

        <button className="search-fake" type="button" onClick={() => go("search")}>
          <span className="tab-icon">{Glyph.search}</span>
          Search verses, chapters or keywords
        </button>

        <article className="daily-card">
          <button type="button" className="card-hit" onClick={() => go("daily")}>
            <div className="card-kicker">Daily Verse</div>
            <div className="card-meta">
              Chapter {dailyVerse.chapter} · Verse {dailyVerse.verse}
            </div>
            <p className="sa-line">{dailyVerse.sa.split("\n")[0]}</p>
            <p className="mean-line">{meaning(dailyVerse, lang === "sa" ? "en" : lang)}</p>
          </button>
          <div className="row-btns">
            <GoldBtn onClick={() => openVerse(dailyVerse.chapter, dailyVerse.verse)}>Read Verse</GoldBtn>
            <GoldBtn ghost onClick={() => openVerse(dailyVerse.chapter, dailyVerse.verse, "audio")}>
              Listen
            </GoldBtn>
          </div>
        </article>

        <section>
          <div className="row-between">
            <h2>Continue Reading</h2>
            <span className="muted">18%</span>
          </div>
          <button className="continue-card" type="button" onClick={() => openVerse(continueVerse.chapter, continueVerse.verse)}>
            <div className="book-spine" />
            <div className="continue-copy">
              <strong>
                Chapter {CONTINUE_KEY.chapter}
              </strong>
              <span>
                {chapterByNumber(2).saTitle} · Verse {CONTINUE_KEY.verse}
              </span>
              <Progress value={18} />
            </div>
            <span className="tab-icon">{Glyph.chevron}</span>
          </button>
        </section>

        <section>
          <h2>Explore the Gita</h2>
          <div className="explore-grid">
            <button type="button" className="explore" onClick={() => go("chapters")}>
              <MotifMark motif="lotus" />
              <b>18 Chapters</b>
              <span>700 verses</span>
            </button>
            <button type="button" className="explore" onClick={() => go("daily")}>
              <span className="tab-icon">{Glyph.sun}</span>
              <b>Daily Wisdom</b>
              <span>A verse each dawn</span>
            </button>
            <button type="button" className="explore" onClick={() => openVerse(2, 47, "audio")}>
              <span className="tab-icon">{Glyph.headphones}</span>
              <b>Audio</b>
              <span>Recitation</span>
            </button>
            <button type="button" className="explore" onClick={() => go("bookmarks")}>
              <span className="tab-icon">{Glyph.bookmark}</span>
              <b>Bookmarks</b>
              <span>Your leaves</span>
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export function Chapters() {
  const { openChapter } = useStore();
  return (
    <AppShell>
      <div className="page">
        <header className="page-head">
          <h1 className="display sm">{Brand.full}</h1>
          <p className="kicker">18 Chapters · 700 Verses</p>
          <GoldRule className="rule left" />
        </header>
        <div className="shelf">
          {CHAPTERS.map((ch) => (
            <button key={ch.number} className="book-card" type="button" onClick={() => openChapter(ch.number)}>
              <div className="cover" style={{ background: ch.accent }}>
                <MotifMark motif={ch.motif} size={22} />
                <Pad n={ch.number} />
              </div>
              <div className="book-copy">
                <strong>{ch.saTitle}</strong>
                <span className="sa-mini">{ch.sa}</span>
                <span className="muted">{ch.en}</span>
                <span className="tiny">{ch.verses} verses</span>
                <Progress value={ch.number === 2 ? 18 : ch.number === 1 ? 40 : 0} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function ChapterDetail() {
  const { chapter, openVerse, go } = useStore();
  const ch = chapterByNumber(chapter);
  const list = versesForChapter(ch.number);
  return (
    <AppShell>
      <div className="page">
        <div className="row-between">
          <Back onClick={() => go("chapters")} />
          <span className="muted">Bhagavad Gita</span>
          <span className="spacer" />
        </div>
        <div className="chapter-hero" style={{ background: ch.accent }}>
          <MotifMark motif={ch.motif} size={36} />
          <p className="kicker light">Chapter {ch.number}</p>
          <h1 className="display sm light">{ch.saTitle}</h1>
          <p className="sa-line light">{ch.sa}</p>
          <p className="lede light">{ch.description}</p>
          <div className="row-btns">
            <GoldBtn onClick={() => list[0] && openVerse(ch.number, list[0].verse)}>Start Reading</GoldBtn>
            <GoldBtn ghost onClick={() => list[0] && openVerse(ch.number, list[0].verse, "audio")}>
              Listen
            </GoldBtn>
          </div>
        </div>
        <div className="row-between tight">
          <h2>Verses</h2>
          <span className="muted">{ch.verses} in this chapter</span>
        </div>
        <div className="verse-list">
          {list.map((v) => (
            <button key={`${v.chapter}.${v.verse}`} className="verse-row" type="button" onClick={() => openVerse(v.chapter, v.verse)}>
              <span className="vno">
                {v.chapter}.{v.verse}
              </span>
              <span className="vpreview">{v.en}</span>
              <span className="tab-icon">{Glyph.chevron}</span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function VerseReader() {
  const store = useStore();
  const v = store.currentVerse;
  const ch = chapterByNumber(v.chapter);
  const tab = store.readerLang;
  const body =
    tab === "sa" ? v.sa : tab === "en" ? v.en : tab === "ta" ? v.ta : tab === "hi" ? v.hi : meaning(v, tab);
  const prev = prevVerse(v.chapter, v.verse);
  const next = nextVerse(v.chapter, v.verse);

  return (
    <AppShell nav={false} parchment>
      <div className="page reader" style={{ fontSize: `${store.textScale}em` }}>
        <div className="reader-top">
          <Back onClick={() => store.go("chapter")} />
          <div className="center-meta">
            <span>
              Chapter {v.chapter} · Verse {v.verse}
            </span>
            <small>{ch.saTitle}</small>
          </div>
          <IconBtn label="Share" onClick={() => store.go("audio")}>
            {Glyph.share}
          </IconBtn>
        </div>
        <div className="lang-tabs">
          {READER_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? "on" : ""}
              onClick={() => store.setReaderLang(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <article className="leaf">
          <GoldRule className="rule" />
          {tab === "sa" ? (
            <>
              <p className="sa-hero">{v.sa}</p>
              <h3>Transliteration</h3>
              <p className="iast">{v.iast}</p>
              <h3>English Meaning</h3>
              <p className="meaning">{v.en}</p>
              <h3>Tamil Meaning</h3>
              <p className="meaning ta">{v.ta}</p>
            </>
          ) : (
            <p className={`meaning hero-mean ${tab === "ta" ? "ta" : ""} ${tab === "hi" ? "deva" : ""}`}>
              {body}
            </p>
          )}
          <GoldRule className="rule" />
        </article>
        <div className="reader-bar">
          <IconBtn
            label="Previous"
            onClick={() => prev && store.openVerse(prev.chapter, prev.verse)}
          >
            {Glyph.back}
          </IconBtn>
          <IconBtn
            label="Play audio"
            onClick={() => store.openVerse(v.chapter, v.verse, "audio")}
          >
            {Glyph.play}
          </IconBtn>
          <IconBtn
            label="Bookmark"
            active={store.isBookmarked(v.chapter, v.verse)}
            onClick={() => store.toggleBookmark(v.chapter, v.verse)}
          >
            {Glyph.bookmark}
          </IconBtn>
          <IconBtn label="Next" onClick={() => next && store.openVerse(next.chapter, next.verse)}>
            {Glyph.next}
          </IconBtn>
        </div>
      </div>
    </AppShell>
  );
}

export function LanguageScreen() {
  const { lang, setLang, go } = useStore();
  return (
    <AppShell>
      <div className="page">
        <header className="page-head">
          <h1 className="display sm">Choose Your Language</h1>
          <p className="lede">Original Sanskrit is always available.</p>
        </header>
        <div className="lang-grid">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`lang-card ${lang === l.id ? "on" : ""}`}
              onClick={() => setLang(l.id)}
            >
              <b>{l.native}</b>
              <span>{l.english}</span>
            </button>
          ))}
        </div>
        <GoldBtn wide onClick={() => go("home")}>
          Continue in {langLabel(lang)}
        </GoldBtn>
      </div>
    </AppShell>
  );
}

export function DailyVerse() {
  const { dailyVerse, openVerse, lang } = useStore();
  const v = dailyVerse;
  return (
    <AppShell>
      <div className="page daily">
        <div className="sunrise" aria-hidden />
        <p className="kicker">Today’s Wisdom</p>
        <h1 className="display sm">A verse for this hour</h1>
        <article className="wisdom-card">
          <div className="card-meta">
            Chapter {v.chapter} · Verse {v.verse}
          </div>
          <p className="sa-hero">{v.sa}</p>
          <GoldRule className="rule" />
          <p className="meaning">{meaning(v, lang === "sa" ? "en" : lang)}</p>
          {v.reflection ? (
            <>
              <h3>Reflection</h3>
              <p className="lede">{v.reflection}</p>
            </>
          ) : null}
          <GoldBtn wide onClick={() => openVerse(v.chapter, v.verse)}>
            Read in Context
          </GoldBtn>
        </article>
      </div>
    </AppShell>
  );
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

export function AudioReader() {
  const store = useStore();
  const v = store.currentVerse;
  const ch = chapterByNumber(v.chapter);
  const list = versesForChapter(v.chapter);
  const text = store.lang === "sa" ? v.iast : meaning(v, store.lang);

  useEffect(() => {
    if (store.playing) speak(text, store.lang === "sa" ? "sa" : store.lang, store.speed);
    else stopSpeak();
    return () => stopSpeak();
  }, [store.playing, store.speed, text, store.lang, v.chapter, v.verse]);

  const prev = prevVerse(v.chapter, v.verse);
  const next = nextVerse(v.chapter, v.verse);

  return (
    <AppShell nav={false}>
      <div className="page audio">
        <div className="reader-top">
          <Back onClick={() => store.go("verse")} />
          <div className="center-meta">
            <span>
              Chapter {v.chapter} · Verse {v.verse}
            </span>
            <small>{ch.saTitle}</small>
          </div>
          <span className="spacer" />
        </div>
        <div className="audio-art">
          <FluteKrishna size={168} className="gold-icon" />
        </div>
        <h1 className="display sm center">{ch.enTitle}</h1>
        <p className="center muted">
          {v.chapter}.{v.verse}
        </p>
        <div className={`wave ${store.playing ? "on" : ""}`} aria-hidden>
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${i * 40}ms` }} />
          ))}
        </div>
        <div className="audio-ctrls">
          <IconBtn label="Previous" onClick={() => prev && store.openVerse(prev.chapter, prev.verse, "audio")}>
            {Glyph.back}
          </IconBtn>
          <button
            className="play-orb"
            type="button"
            aria-label={store.playing ? "Pause" : "Play"}
            onClick={() => store.setPlaying(!store.playing)}
          >
            {store.playing ? Glyph.pause : Glyph.play}
          </button>
          <IconBtn label="Next" onClick={() => next && store.openVerse(next.chapter, next.verse, "audio")}>
            {Glyph.next}
          </IconBtn>
        </div>
        <div className="speed-row">
          {SPEEDS.map((s) => (
            <button key={s} type="button" className={store.speed === s ? "on" : ""} onClick={() => store.setSpeed(s)}>
              {s}x
            </button>
          ))}
        </div>
        <label className="lang-select">
          Language
          <select value={store.lang} onChange={(e) => store.setLang(e.target.value as LangId)}>
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.native}
              </option>
            ))}
          </select>
        </label>
        <h2>Verses in this chapter</h2>
        <div className="mini-list">
          {list.map((item) => (
            <button
              key={item.verse}
              type="button"
              className={item.verse === v.verse ? "on" : ""}
              onClick={() => store.openVerse(item.chapter, item.verse, "audio")}
            >
              {item.chapter}.{item.verse}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export function Bookmarks() {
  const store = useStore();
  const [tab, setTab] = useState<"verses" | "chapters" | "favorites">("verses");
  const verses = store.bookmarks.filter((b) => (tab === "favorites" ? b.favorite : true));
  const chapterMarks = CHAPTERS.filter((c) => store.bookmarks.some((b) => b.chapter === c.number));

  return (
    <AppShell>
      <div className="page">
        <header className="page-head">
          <h1 className="display sm">My Bookmarks</h1>
        </header>
        <div className="seg">
          {(["verses", "chapters", "favorites"] as const).map((id) => (
            <button key={id} type="button" className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
              {id[0].toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
        {tab === "chapters" ? (
          <div className="shelf">
            {chapterMarks.map((ch) => (
              <button key={ch.number} className="book-card" type="button" onClick={() => store.openChapter(ch.number)}>
                <div className="cover" style={{ background: ch.accent }}>
                  <Pad n={ch.number} />
                </div>
                <div className="book-copy">
                  <strong>{ch.saTitle}</strong>
                  <span className="muted">{ch.en}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="saved-list">
            {verses.map((b) => {
              const found = verseAt(b.chapter, b.verse) ?? store.dailyVerse;
              return (
                <article key={`${b.chapter}.${b.verse}`} className="saved-card">
                  <button type="button" className="saved-main" onClick={() => store.openVerse(b.chapter, b.verse)}>
                    <div className="card-meta">
                      Chapter {b.chapter} · Verse {b.verse}
                    </div>
                    <p>{found.en}</p>
                    <div className="saved-meta">
                      <span>{langLabel(store.lang)}</span>
                      <span>{b.savedAt}</span>
                    </div>
                  </button>
                  <div className="swipe-actions">
                    <button type="button" onClick={() => store.toggleBookmark(b.chapter, b.verse)}>
                      Delete
                    </button>
                    <button type="button" className="share" onClick={() => store.openVerse(b.chapter, b.verse, "audio")}>
                      Share
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function SearchScreen() {
  const { search, setSearch, openVerse, openChapter, go } = useStore();
  const q = search.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!q) return [];
    return VERSES.filter(
        (v) =>
          v.en.toLowerCase().includes(q) ||
          v.iast.toLowerCase().includes(q) ||
          v.sa.includes(search) ||
          v.ta.includes(search) ||
          v.hi.includes(search) ||
          `chapter ${v.chapter}`.includes(q) ||
          String(v.verse).includes(q)
      )
      .slice(0, 12);
  }, [q, search]);

  const chapterHits = q
    ? CHAPTERS.filter(
        (c) =>
          c.en.toLowerCase().includes(q) ||
          c.saTitle.toLowerCase().includes(q) ||
          c.sa.includes(search) ||
          String(c.number) === q
      )
    : [];

  return (
    <AppShell>
      <div className="page">
        <div className="reader-top">
          <Back onClick={() => go("home")} />
          <h1 className="inline-title">Search</h1>
          <span className="spacer" />
        </div>
        <label className="search-box">
          <span className="tab-icon">{Glyph.search}</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verses, chapters or keywords"
            autoCapitalize="off"
          />
        </label>
        <div className="lang-row">
          {SEARCH_CHIPS.map((c) => (
            <button key={c} type="button" className={`chip ${search === c ? "on" : ""}`} onClick={() => setSearch(c)}>
              {c}
            </button>
          ))}
        </div>
        {chapterHits.length > 0 ? (
          <>
            <h2>Chapters</h2>
            {chapterHits.map((c) => (
              <button key={c.number} className="verse-row" type="button" onClick={() => openChapter(c.number)}>
                <span className="vno">{String(c.number).padStart(2, "0")}</span>
                <span className="vpreview">{c.saTitle}</span>
              </button>
            ))}
          </>
        ) : null}
        <h2>Verses</h2>
        {hits.length === 0 && q ? <p className="muted">No matching leaves in this manuscript yet.</p> : null}
        {hits.map((v) => (
          <button key={`${v.chapter}.${v.verse}`} className="verse-row" type="button" onClick={() => openVerse(v.chapter, v.verse)}>
            <span className="vno">
              {v.chapter}.{v.verse}
            </span>
            <span className="vpreview">
              {v.en} · {langLabel("en")}
            </span>
          </button>
        ))}
      </div>
    </AppShell>
  );
}

export function Profile() {
  const store = useStore();
  return (
    <AppShell>
      <div className="page">
        <header className="page-head">
          <Lotus size={48} className="gold-icon" />
          <h1 className="display sm">My Gita Journey</h1>
          <p className="lede">A private path of reading, kept on this device.</p>
        </header>
        <div className="stats">
          <div>
            <b>{store.versesRead}</b>
            <span>Verses read</span>
          </div>
          <div>
            <b>2</b>
            <span>Chapters begun</span>
          </div>
          <div>
            <b>{store.streak}</b>
            <span>Day streak</span>
          </div>
        </div>
        <div className="settings">
          <button type="button" onClick={() => store.go("language")}>
            Language <span>{langLabel(store.lang)}</span>
          </button>
          <label className="setting-row">
            Text size
            <input
              type="range"
              min={0.9}
              max={1.25}
              step={0.05}
              value={store.textScale}
              onChange={(e) => store.setTextScale(Number(e.target.value))}
            />
          </label>
          <label className="setting-row">
            Dark mode
            <input type="checkbox" className="switch" checked={store.dark} onChange={(e) => store.setDark(e.target.checked)} />
          </label>
          <button type="button" onClick={() => store.openVerse(store.chapter, store.verse, "audio")}>
            Audio settings <span>{store.speed}x</span>
          </button>
          <label className="setting-row">
            Notifications
            <input type="checkbox" className="switch" checked={store.notify} onChange={(e) => store.setNotify(e.target.checked)} />
          </label>
          <button type="button">
            Download content <span>{store.download ? "On" : "On device"}</span>
          </button>
          <a className="setting-link" href="./privacy.html">
            About Bhagavad Gita
          </a>
          <a className="setting-link" href="./privacy.html">
            Privacy
          </a>
        </div>
      </div>
    </AppShell>
  );
}

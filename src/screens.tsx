import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Brand, LANGUAGES, READER_TABS, type LangId } from "./brand";
import {
  CHAPTERS,
  SEARCH_CHIPS,
  TOTAL_VERSES,
  chapterByNumber,
  meaning,
  nextVerse,
  prevVerse,
  searchVerses,
  verseAt,
  versesForChapter,
} from "./data";
import { DivineLottie, SacredArt, SacredMark, SplashHerald, chapterArt } from "./art";
import { Glyph, GoldRule, Lotus, MotifMark, OmMark, SreeoTiles } from "./icons";
import { isNative } from "./native";
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
    case "about":
      return <AboutScreen />;
    case "privacy":
      return <PrivacyScreen />;
    default:
      return <Home />;
  }
}

export function SreeoSplash() {
  const { go } = useStore();
  const native = isNative();
  useEffect(() => {
    if (native) {
      go("splash");
      return;
    }
    const t = window.setTimeout(() => go("splash"), 2200);
    return () => window.clearTimeout(t);
  }, [go, native]);

  if (native) return null;

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
      <button className="splash gita-splash" type="button" onClick={() => go(onboarded ? "home" : "onboard")} aria-label="Begin">
        <div className="grain" aria-hidden />
        <div className="splash-center">
          <SplashHerald />
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
          <SacredArt kind="chariot" className="hero-photo" alt="Krishna teaching Arjuna on the chariot" />
          <DivineLottie name="glow" className="art-glow" />
          <div className="art-caption">Kurukshetra · Krishna teaching Arjuna</div>
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
  const { go, openVerse, dailyVerse, continueVerse, lang, music, setMusic } = useStore();
  return (
    <AppShell>
      <div className="page home">
        <header className="home-head">
          <div className="home-copy">
            <p className="greet">
              Namaste <span aria-hidden>🙏</span>
            </p>
            <h1>Continue your journey</h1>
          </div>
          <div className="home-actions">
            <button
              className={`avatar-btn music-toggle ${music ? "on" : ""}`}
              type="button"
              aria-pressed={music}
              aria-label={music ? "Stop background music" : "Play background music"}
              onClick={() => setMusic(!music)}
            >
              <SacredMark name="flute" className="home-music-mark" />
            </button>
            <button className="avatar-btn" type="button" onClick={() => go("profile")} aria-label="Profile">
              <Lotus size={20} />
            </button>
          </div>
        </header>

        <button className="search-fake" type="button" onClick={() => go("search")}>
          <span className="mark">{Glyph.search}</span>
          Search verses, chapters or keywords
        </button>

        <article className="daily-card">
          <div className="card-photo-bleed">
            <SacredArt kind="chariot" className="card-photo" alt="" />
          </div>
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
            <GoldBtn ghost={!music} onClick={() => setMusic(!music)}>
              {music ? "Music on" : "Music off"}
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
                Chapter {continueVerse.chapter}
              </strong>
              <span>
                {chapterByNumber(continueVerse.chapter).saTitle} · Verse {continueVerse.verse}
              </span>
              <Progress value={18} />
            </div>
            <span className="mark">{Glyph.chevron}</span>
          </button>
        </section>

        <section>
          <h2>Explore the Gita</h2>
          <div className="explore-grid">
            <button type="button" className="explore" onClick={() => go("chapters")}>
              <MotifMark motif="lotus" size={22} />
              <b>18 Chapters</b>
              <span>{TOTAL_VERSES} verses</span>
            </button>
            <button type="button" className="explore" onClick={() => go("daily")}>
              <span className="mark">{Glyph.sun}</span>
              <b>Daily Wisdom</b>
              <span>A verse each dawn</span>
            </button>
            <button type="button" className="explore" onClick={() => openVerse(2, 47, "audio")}>
              <span className="mark">{Glyph.headphones}</span>
              <b>Audio</b>
              <span>Recitation</span>
            </button>
            <button type="button" className="explore" onClick={() => go("bookmarks")}>
              <span className="mark">{Glyph.bookmark}</span>
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
          <p className="kicker">18 Chapters · {TOTAL_VERSES} Verses</p>
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
  const { chapter, openVerse, go, lang } = useStore();
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
          <SacredArt kind={chapterArt(ch.number)} className="hero-photo dim" alt="" />
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
              <span className="vpreview">{meaning(v, lang === "sa" ? "en" : lang)}</span>
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
  const body = meaning(v, tab);
  const extraTabs = READER_TABS.some((t) => t.id === store.lang)
    ? READER_TABS
    : [...READER_TABS, { id: store.lang, label: langLabel(store.lang) }];
  const prev = prevVerse(v.chapter, v.verse);
  const next = nextVerse(v.chapter, v.verse);

  return (
    <AppShell nav={false} parchment>
      <div className="page reader">
        <div className="reader-top">
          <Back onClick={() => store.leaveReader()} />
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
          {extraTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={tab === t.id ? "on" : ""}
              onClick={() => store.setReaderLang(t.id)}
            >
              {tab === t.id ? (
                <SacredMark
                  name={t.id === "ta" ? "peacock" : t.id === "sa" ? "lotus" : "flute"}
                  className="lang-tab-lottie"
                />
              ) : null}
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
              {v.ta ? (
                <>
                  <h3>Tamil Meaning</h3>
                  <p className="meaning ta">{v.ta}</p>
                </>
              ) : null}
              {v.hi ? (
                <>
                  <h3>Hindi Meaning</h3>
                  <p className="meaning deva">{v.hi}</p>
                </>
              ) : null}
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
        <div className="daily-hero">
          <SacredArt kind="chariot" className="hero-photo" alt="Krishna teaching Arjuna" />
          <DivineLottie name="glow" className="art-glow" />
        </div>
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
    if (store.playing) {
      speak(text, store.lang === "sa" ? "sa" : store.lang, store.speed, { chapter: v.chapter, verse: v.verse }, () => {
        store.setPlaying(false);
      });
    } else stopSpeak();
    return () => stopSpeak();
  }, [store.playing, store.speed, text, store.lang, v.chapter, v.verse, store.setPlaying]);

  const prev = prevVerse(v.chapter, v.verse);
  const next = nextVerse(v.chapter, v.verse);

  const line = store.lang === "sa" ? v.sa : meaning(v, store.lang);

  return (
    <AppShell nav={false} parchment>
      <div className={`page audio ${store.playing ? "is-playing" : ""}`}>
        <div className="audio-stage">
          <div className="audio-stage-media">
            <SacredArt kind={chapterArt(v.chapter)} className="audio-stage-photo" alt="Krishna teaching Arjuna" />
            <div className="audio-veil" aria-hidden />
            {store.playing ? <DivineLottie name="lotus" className="audio-lotus" /> : null}
          </div>
          <div className="reader-top audio-nav">
            <Back onClick={() => store.leaveAudio()} />
            <div className="center-meta light-meta">
              <span>
                Chapter {v.chapter} · Verse {v.verse}
              </span>
              <small>{ch.saTitle}</small>
            </div>
            <span className="spacer" />
          </div>
          <div className="audio-portrait">
            {store.playing ? <DivineLottie name="glow" className="lottie-audio" /> : null}
            <span className="portrait-ring" aria-hidden />
            <SacredArt kind="flute" className="audio-photo" alt="Krishna with flute" />
          </div>
        </div>

        <div className="audio-sheet">
          <p className="kicker">Now reciting</p>
          <h1 className="display sm center">{ch.saTitle}</h1>
          <p className="center verse-mark">
            {v.chapter}.{v.verse}
          </p>
          <p className={`audio-line ${store.lang === "ta" ? "ta" : ""} ${store.lang === "hi" || store.lang === "sa" ? "deva" : ""}`}>
            {line}
          </p>
          <GoldRule className="rule" />
          <div className={`wave ${store.playing ? "on" : ""}`} aria-hidden>
            {Array.from({ length: 32 }, (_, i) => (
              <span key={i} style={{ animationDelay: `${i * 35}ms`, height: `${10 + ((i * 7) % 18)}px` }} />
            ))}
          </div>
          <div className="audio-ctrls">
            <IconBtn label="Previous" onClick={() => prev && store.openVerse(prev.chapter, prev.verse, "audio")}>
              {Glyph.back}
            </IconBtn>
            <button
              className={`play-orb ${store.playing ? "on" : ""}`}
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
                    <p>{meaning(found, store.lang === "sa" ? "en" : store.lang)}</p>
                    <div className="saved-meta">
                      <span>{langLabel(store.lang)}</span>
                      <span>{b.savedAt}</span>
                    </div>
                  </button>
                  <div className="saved-actions">
                    <button type="button" onClick={() => store.toggleBookmark(b.chapter, b.verse)}>
                      Remove
                    </button>
                    <button type="button" className="listen" onClick={() => store.openVerse(b.chapter, b.verse, "audio")}>
                      Listen
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
  const { search, setSearch, openVerse, openChapter, go, lang } = useStore();
  const q = search.trim();
  const hits = useMemo(() => searchVerses(search), [search]);

  const needle = q.toLowerCase();
  const chapterHits = q
    ? CHAPTERS.filter(
        (c) =>
          c.en.toLowerCase().includes(needle) ||
          c.saTitle.toLowerCase().includes(needle) ||
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
              {meaning(v, lang === "sa" ? "en" : lang)}
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
            Dark mode
            <input type="checkbox" className="switch" checked={store.dark} onChange={(e) => store.setDark(e.target.checked)} />
          </label>
          <label className="setting-row">
            Background music
            <input type="checkbox" className="switch" checked={store.music} onChange={(e) => store.setMusic(e.target.checked)} />
          </label>
          <button type="button" onClick={() => store.openVerse(store.chapter, store.verse, "audio")}>
            Audio settings <span>{store.speed}x · on device</span>
          </button>
          <label className="setting-row">
            Notifications
            <input type="checkbox" className="switch" checked={store.notify} onChange={(e) => store.setNotify(e.target.checked)} />
          </label>
          <button type="button">
            Download content <span>{store.download ? "On" : "On device"}</span>
          </button>
          <a className="setting-link" href={Brand.support} target="_blank" rel="noreferrer">
            Support
          </a>
          <button type="button" onClick={() => store.go("about")}>
            About Bhagavad Gita
          </button>
          <button type="button" onClick={() => store.go("privacy")}>
            Privacy
          </button>
        </div>
      </div>
    </AppShell>
  );
}

function InfoPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { go } = useStore();
  return (
    <AppShell nav={false} parchment>
      <div className="page info-page">
        <div className="reader-top">
          <Back onClick={() => go("profile")} />
          <h1 className="inline-title">{title}</h1>
          <span className="spacer" />
        </div>
        <div className="info-art">
          <SacredArt kind="chariot" className="info-photo" alt="Krishna teaching Arjuna" />
        </div>
        {children}
      </div>
    </AppShell>
  );
}

export function AboutScreen() {
  return (
    <InfoPage title="About">
      <h1 className="display sm">Bhagavad Gita</h1>
      <p className="lede">
        The Song of the Lord — a dialogue of dharma on the field of Kurukshetra, kept here as a quiet manuscript on
        your device.
      </p>
      <p>
        Gita is a reading app from {Brand.company} · {Brand.studioFull}. Sanskrit, meaning, and a Krishna-like male
        recitation stay on this device. Bookmarks and progress are not sent to a cloud library.
      </p>
      <p>
        Recitation uses a voice on this device — your iPhone Personal Voice if you create one, or a recording you add
        to the app. Audio is never uploaded.
      </p>
      <p>
        Quiet temple music under the reading is “Dhaka” by Kevin MacLeod (incompetech.com), licensed under{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
          CC BY 4.0
        </a>
        . Turn it off from Home or Profile.
      </p>
      <a className="text-link" href={Brand.support} target="_blank" rel="noreferrer">
        Support
      </a>
    </InfoPage>
  );
}

export function PrivacyScreen() {
  return (
    <InfoPage title="Privacy">
      <h1 className="display sm">Privacy Policy</h1>
      <p className="meta-line">Last updated: 10 September 2026</p>
      <p>
        Reading language, bookmarks, and progress stay on your device. There is no account and no cloud library in this
        version.
      </p>
      <h2>On this device</h2>
      <ul>
        <li>Selected language and appearance</li>
        <li>Bookmarks, favorites, and continue-reading position</li>
        <li>A local reading streak and verse history</li>
        <li>A morning verse reminder, if you turn notifications on</li>
      </ul>
      <p>This data is not sent to {Brand.company}.</p>
      <h2>Audio</h2>
      <p>
        Recitation uses on-device speech. If you create a Personal Voice on iPhone, or add your own recordings, those
        are used first. Soft background music may play from a file bundled in the app. Audio is not uploaded. You can
        stop recitation and turn music off from Home or Profile at any time.
      </p>
      <h2>Notifications</h2>
      <p>Reminders are scheduled on this device only. You can turn them off in Profile.</p>
      <a className="text-link" href={Brand.privacy} target="_blank" rel="noreferrer">
        Full privacy policy
      </a>
      <a className="text-link" href={Brand.support} target="_blank" rel="noreferrer">
        Support
      </a>
    </InfoPage>
  );
}

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Brand, LANGUAGES, type LangId } from "./brand";
import { CONTINUE_KEY, DAILY_KEY, VERSES, verseAt, verseOfTheDay, type Verse } from "./data";
import { isNative } from "./native";
import { syncVerseReminder } from "./notify";
import { setAmbientDucked, setAmbientEnabled } from "./music";
import { speakDivine, stopDivine } from "./voice";

export type ScreenId =
  | "sreeo"
  | "splash"
  | "onboard"
  | "home"
  | "chapters"
  | "chapter"
  | "verse"
  | "language"
  | "daily"
  | "audio"
  | "bookmarks"
  | "search"
  | "profile"
  | "about"
  | "privacy";

export type TabId = "home" | "gita" | "daily" | "bookmarks" | "profile";

export type Bookmark = {
  chapter: number;
  verse: number;
  savedAt: string;
  favorite?: boolean;
  lang?: LangId;
};

type Store = {
  screen: ScreenId;
  tab: TabId;
  lang: LangId;
  dark: boolean;
  onboarded: boolean;
  chapter: number;
  verse: number;
  readerLang: LangId;
  returnTo: ScreenId;
  bookmarks: Bookmark[];
  history: { chapter: number; verse: number; at: string }[];
  playing: boolean;
  speed: number;
  search: string;
  notify: boolean;
  music: boolean;
  download: boolean;
  versesRead: number;
  streak: number;
  go: (id: ScreenId) => void;
  setTab: (id: TabId) => void;
  setLang: (id: LangId) => void;
  setReaderLang: (id: LangId) => void;
  setDark: (v: boolean) => void;
  setNotify: (v: boolean) => void;
  setMusic: (v: boolean) => void;
  openChapter: (n: number) => void;
  openVerse: (chapter: number, verse: number, screen?: ScreenId, opts?: { play?: boolean; lang?: LangId }) => void;
  leaveReader: () => void;
  leaveAudio: () => void;
  toggleBookmark: (chapter: number, verse: number) => void;
  toggleFavorite: (chapter: number, verse: number) => void;
  isBookmarked: (chapter: number, verse: number) => boolean;
  isFavorite: (chapter: number, verse: number) => boolean;
  setPlaying: (v: boolean) => void;
  setSpeed: (n: number) => void;
  setSearch: (q: string) => void;
  completeOnboarding: () => void;
  currentVerse: Verse;
  dailyVerse: Verse;
  continueVerse: Verse;
};

const KEY = "gita.sreeo.v1";
const DARK_DEFAULT_MARK = "gita.sreeo.dark-default";

type Persist = {
  lang: LangId;
  readerLang: LangId;
  dark: boolean;
  onboarded: boolean;
  chapter: number;
  verse: number;
  bookmarks: Bookmark[];
  history: { chapter: number; verse: number; at: string }[];
  versesRead: number;
  streak: number;
  notify: boolean;
  music: boolean;
};

type Seed = Partial<Pick<Store, "screen" | "dark" | "lang" | "chapter" | "verse" | "tab">>;

function load(): Partial<Persist> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persist) : {};
  } catch {
    return {};
  }
}

function resolveDark(start: Seed, saved: Partial<Persist>, locked: boolean): boolean {
  if (start.dark !== undefined) return start.dark;
  if (locked) return true;
  try {
    if (!localStorage.getItem(DARK_DEFAULT_MARK)) {
      localStorage.setItem(DARK_DEFAULT_MARK, "1");
      return true;
    }
  } catch {
    return saved.dark ?? true;
  }
  return saved.dark ?? true;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({
  children,
  freeze,
  initial,
}: {
  children: ReactNode;
  freeze?: Seed;
  initial?: Seed;
}) {
  const saved = useMemo(() => load(), []);
  const start = freeze ?? initial ?? {};
  const locked = Boolean(freeze);
  const [screen, setScreen] = useState<ScreenId>(start.screen ?? (isNative() ? "splash" : "sreeo"));
  const [tab, setTabState] = useState<TabId>(start.tab ?? "home");
  const [lang, setLangState] = useState<LangId>(start.lang ?? saved.lang ?? "en");
  const [dark, setDarkState] = useState(() => resolveDark(start, saved, locked));
  const [onboarded, setOnboarded] = useState(saved.onboarded ?? false);
  const [chapter, setChapter] = useState(start.chapter ?? saved.chapter ?? 2);
  const [verse, setVerse] = useState(start.verse ?? saved.verse ?? 47);
  const [readerLang, setReaderLangState] = useState<LangId>(start.lang ?? saved.readerLang ?? saved.lang ?? "sa");
  const [returnTo, setReturnTo] = useState<ScreenId>("home");
  const [audioFromVerse, setAudioFromVerse] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(
    saved.bookmarks?.length
      ? saved.bookmarks
      : [
          { chapter: 2, verse: 47, savedAt: "Today", favorite: true },
          { chapter: 4, verse: 7, savedAt: "Yesterday" },
          { chapter: 18, verse: 66, savedAt: "12 Aug" },
        ]
  );
  const [history, setHistory] = useState(saved.history ?? [{ chapter: 2, verse: 14, at: "Today" }]);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [search, setSearch] = useState(start.screen === "search" ? "Dharma" : "");
  const [notify, setNotifyState] = useState(saved.notify ?? true);
  const [music, setMusicState] = useState(saved.music ?? true);
  const [download] = useState(false);
  const [versesRead] = useState(saved.versesRead ?? 42);
  const [streak] = useState(saved.streak ?? 7);

  useEffect(() => {
    if (locked) return;
    const data: Persist = {
      lang,
      readerLang,
      dark,
      onboarded,
      chapter,
      verse,
      bookmarks,
      history,
      versesRead,
      streak,
      notify,
      music,
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [lang, readerLang, dark, onboarded, chapter, verse, bookmarks, history, versesRead, streak, notify, music, locked]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = dark ? "dark" : "light";
    root.style.colorScheme = dark ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#12151c" : "#F3EBDA");
  }, [dark]);

  const go = (id: ScreenId) => {
    if (locked) return;
    setScreen(id);
    if (id === "home") setTabState("home");
    if (id === "chapters" || id === "chapter") setTabState("gita");
    if (id === "daily") setTabState("daily");
    if (id === "bookmarks") setTabState("bookmarks");
    if (id === "profile") setTabState("profile");
  };

  const setTab = (id: TabId) => {
    if (locked) return;
    setTabState(id);
    const map: Record<TabId, ScreenId> = {
      home: "home",
      gita: "chapters",
      daily: "daily",
      bookmarks: "bookmarks",
      profile: "profile",
    };
    setScreen(map[id]);
  };

  const openChapter = (n: number) => {
    if (locked) return;
    setChapter(n);
    const first = VERSES.find((v) => v.chapter === n);
    if (first) setVerse(first.verse);
    setScreen("chapter");
    setTabState("gita");
  };

  const openVerse = (c: number, v: number, next: ScreenId = "verse", opts?: { play?: boolean; lang?: LangId }) => {
    if (locked) return;
    if (opts?.lang) {
      setLangState(opts.lang);
      setReaderLangState(opts.lang);
    } else if (next === "audio" && (screen === "verse" || screen === "audio")) {
      setLangState(readerLang);
    }
    if (screen !== "verse" && screen !== "audio") {
      const back =
        screen === "chapters" || screen === "chapter"
          ? "chapter"
          : screen === "sreeo" || screen === "splash" || screen === "onboard"
            ? "home"
            : screen;
      setReturnTo(back);
    }
    setAudioFromVerse(next === "audio" && (screen === "verse" || audioFromVerse));
    setChapter(c);
    setVerse(v);
    setHistory((h) => [{ chapter: c, verse: v, at: "Just now" }, ...h.filter((x) => !(x.chapter === c && x.verse === v))].slice(0, 20));
    setScreen(next);
    if (opts?.play) setPlaying(true);
  };

  const leaveReader = () => {
    if (locked) return;
    go(returnTo === "chapter" || returnTo === "chapters" ? "chapter" : returnTo);
  };

  const leaveAudio = () => {
    if (locked) return;
    setPlaying(false);
    if (audioFromVerse) {
      setScreen("verse");
      return;
    }
    leaveReader();
  };

  const toggleBookmark = (c: number, v: number) => {
    if (locked) return;
    setBookmarks((list) => {
      const has = list.some((b) => b.chapter === c && b.verse === v);
      if (has) return list.filter((b) => !(b.chapter === c && b.verse === v));
      return [{ chapter: c, verse: v, savedAt: "Today", lang: readerLang }, ...list];
    });
  };

  const toggleFavorite = (c: number, v: number) => {
    if (locked) return;
    setBookmarks((list) => {
      const found = list.find((b) => b.chapter === c && b.verse === v);
      if (!found) return [{ chapter: c, verse: v, savedAt: "Today", favorite: true, lang: readerLang }, ...list];
      return list.map((b) => (b.chapter === c && b.verse === v ? { ...b, favorite: !b.favorite } : b));
    });
  };

  useEffect(() => {
    if (locked) return;
    void syncVerseReminder(notify, lang);
  }, [notify, lang, locked]);

  useEffect(() => {
    setAmbientEnabled(!locked && music);
  }, [music, locked]);

  useEffect(() => {
    return () => setAmbientEnabled(false);
  }, []);

  useEffect(() => {
    setAmbientDucked(!locked && playing);
  }, [playing, locked]);

  const currentVerse = verseAt(chapter, verse) ?? verseAt(DAILY_KEY.chapter, DAILY_KEY.verse)!;
  const dailyVerse = verseOfTheDay();
  const continueVerse = verseAt(chapter, verse) ?? verseAt(CONTINUE_KEY.chapter, CONTINUE_KEY.verse)!;

  const value: Store = {
    screen,
    tab,
    lang,
    dark,
    onboarded,
    chapter,
    verse,
    readerLang,
    returnTo,
    bookmarks,
    history,
    playing,
    speed,
    search,
    notify,
    music,
    download,
    versesRead,
    streak,
    go,
    setTab,
    setLang: (id) => {
      if (locked) return;
      setLangState(id);
      setReaderLangState(id);
    },
    setReaderLang: (id) => {
      if (locked) return;
      setReaderLangState(id);
    },
    setDark: (v) => {
      if (locked) return;
      setDarkState(v);
    },
    setNotify: (v) => {
      if (locked) return;
      setNotifyState(v);
    },
    setMusic: (v) => {
      if (locked) return;
      setAmbientEnabled(v);
      setMusicState(v);
    },
    openChapter,
    openVerse,
    leaveReader,
    leaveAudio,
    toggleBookmark,
    toggleFavorite,
    isBookmarked: (c, v) => bookmarks.some((b) => b.chapter === c && b.verse === v),
    isFavorite: (c, v) => bookmarks.some((b) => b.chapter === c && b.verse === v && b.favorite),
    setPlaying,
    setSpeed,
    setSearch,
    completeOnboarding: () => {
      if (locked) return;
      setOnboarded(true);
      setNotifyState(true);
      setScreen("home");
    },
    currentVerse,
    dailyVerse,
    continueVerse,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("store");
  return ctx;
}

export function langLabel(id: LangId) {
  return LANGUAGES.find((l) => l.id === id)?.native ?? id;
}

export function speak(text: string, lang: LangId, rate: number, ref?: { chapter: number; verse: number }, onEnd?: () => void) {
  speakDivine(text, lang, rate, ref, onEnd);
}

export function stopSpeak() {
  stopDivine();
}

export { Brand };

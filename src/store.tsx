import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Brand, LANGUAGES, type LangId } from "./brand";
import { CONTINUE_KEY, DAILY_KEY, VERSES, verseAt, verseOfTheDay, type Verse } from "./data";
import { isNative } from "./native";
import { syncVerseReminder } from "./notify";
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
};

type Store = {
  screen: ScreenId;
  tab: TabId;
  lang: LangId;
  dark: boolean;
  textScale: number;
  onboarded: boolean;
  chapter: number;
  verse: number;
  readerLang: LangId;
  bookmarks: Bookmark[];
  history: { chapter: number; verse: number; at: string }[];
  playing: boolean;
  speed: number;
  search: string;
  notify: boolean;
  download: boolean;
  versesRead: number;
  streak: number;
  go: (id: ScreenId) => void;
  setTab: (id: TabId) => void;
  setLang: (id: LangId) => void;
  setReaderLang: (id: LangId) => void;
  setDark: (v: boolean) => void;
  setTextScale: (n: number) => void;
  setNotify: (v: boolean) => void;
  openChapter: (n: number) => void;
  openVerse: (chapter: number, verse: number, screen?: ScreenId) => void;
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

type Persist = {
  lang: LangId;
  dark: boolean;
  textScale: number;
  onboarded: boolean;
  chapter: number;
  verse: number;
  bookmarks: Bookmark[];
  history: { chapter: number; verse: number; at: string }[];
  versesRead: number;
  streak: number;
  notify: boolean;
};

function load(): Partial<Persist> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persist) : {};
  } catch {
    return {};
  }
}

const Ctx = createContext<Store | null>(null);

type Seed = Partial<Pick<Store, "screen" | "dark" | "lang" | "chapter" | "verse" | "tab">>;

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
  const [dark, setDarkState] = useState(start.dark ?? saved.dark ?? false);
  const [textScale, setTextScale] = useState(saved.textScale ?? 1);
  const [onboarded, setOnboarded] = useState(saved.onboarded ?? false);
  const [chapter, setChapter] = useState(start.chapter ?? saved.chapter ?? 2);
  const [verse, setVerse] = useState(start.verse ?? saved.verse ?? 47);
  const [readerLang, setReaderLang] = useState<LangId>("sa");
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
  const [download] = useState(false);
  const [versesRead] = useState(saved.versesRead ?? 42);
  const [streak] = useState(saved.streak ?? 7);

  useEffect(() => {
    if (locked) return;
    const data: Persist = {
      lang,
      dark,
      textScale,
      onboarded,
      chapter,
      verse,
      bookmarks,
      history,
      versesRead,
      streak,
      notify,
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [lang, dark, textScale, onboarded, chapter, verse, bookmarks, history, versesRead, streak, notify, locked]);

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

  const openVerse = (c: number, v: number, next: ScreenId = "verse") => {
    if (locked) return;
    setChapter(c);
    setVerse(v);
    setHistory((h) => [{ chapter: c, verse: v, at: "Just now" }, ...h.filter((x) => !(x.chapter === c && x.verse === v))].slice(0, 20));
    setScreen(next);
  };

  const toggleBookmark = (c: number, v: number) => {
    if (locked) return;
    setBookmarks((list) => {
      const has = list.some((b) => b.chapter === c && b.verse === v);
      if (has) return list.filter((b) => !(b.chapter === c && b.verse === v));
      return [{ chapter: c, verse: v, savedAt: "Today" }, ...list];
    });
  };

  const toggleFavorite = (c: number, v: number) => {
    if (locked) return;
    setBookmarks((list) => {
      const found = list.find((b) => b.chapter === c && b.verse === v);
      if (!found) return [{ chapter: c, verse: v, savedAt: "Today", favorite: true }, ...list];
      return list.map((b) => (b.chapter === c && b.verse === v ? { ...b, favorite: !b.favorite } : b));
    });
  };

  useEffect(() => {
    if (locked) return;
    void syncVerseReminder(notify, lang);
  }, [notify, lang, locked]);

  const currentVerse = verseAt(chapter, verse) ?? verseAt(DAILY_KEY.chapter, DAILY_KEY.verse)!;
  const dailyVerse = verseOfTheDay();
  const continueVerse = verseAt(CONTINUE_KEY.chapter, CONTINUE_KEY.verse)!;

  const value: Store = {
    screen,
    tab,
    lang,
    dark,
    textScale,
    onboarded,
    chapter,
    verse,
    readerLang,
    bookmarks,
    history,
    playing,
    speed,
    search,
    notify,
    download,
    versesRead,
    streak,
    go,
    setTab,
    setLang: (id) => {
      if (locked) return;
      setLangState(id);
    },
    setReaderLang,
    setDark: (v) => {
      if (locked) return;
      setDarkState(v);
    },
    setNotify: (v) => {
      if (locked) return;
      setNotifyState(v);
    },
    setTextScale,
    openChapter,
    openVerse,
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

export function speak(text: string, lang: LangId, rate: number) {
  speakDivine(text, lang, rate);
}

export function stopSpeak() {
  stopDivine();
}

export { Brand };

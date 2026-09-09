import type { LangId } from "./brand";
import versesJson from "./verses.json";

export type Motif = "lotus" | "chariot" | "flute" | "conch" | "wheel" | "tree" | "lamp" | "peacock";

export type Chapter = {
  number: number;
  sa: string;
  saTitle: string;
  en: string;
  enTitle: string;
  verses: number;
  description: string;
  accent: string;
  motif: Motif;
};

export type Verse = {
  chapter: number;
  verse: number;
  sa: string;
  iast: string;
  en: string;
  ta: string;
  hi: string;
  te?: string;
  kn?: string;
  ml?: string;
  bn?: string;
  mr?: string;
  gu?: string;
  reflection?: string;
};

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    sa: "अर्जुनविषादयोगः",
    saTitle: "Arjuna Vishada Yoga",
    en: "The Yoga of Arjuna’s Grief",
    enTitle: "Arjuna Vishada Yoga",
    verses: 47,
    description: "On the field of dharma, Arjuna’s bow falls. The dialogue begins in sorrow.",
    accent: "#1C2740",
    motif: "chariot",
  },
  {
    number: 2,
    sa: "साङ्ख्ययोगः",
    saTitle: "Sankhya Yoga",
    en: "The Yoga of Knowledge",
    enTitle: "Sankhya Yoga",
    verses: 72,
    description: "Krishna opens the teaching: the Self is unborn, duty is yours, fruits are not.",
    accent: "#243A6B",
    motif: "lotus",
  },
  {
    number: 3,
    sa: "कर्मयोगः",
    saTitle: "Karma Yoga",
    en: "The Yoga of Action",
    enTitle: "Karma Yoga",
    verses: 43,
    description: "Act without clinging. The world is held by work offered, not by retreat.",
    accent: "#8A4A1C",
    motif: "wheel",
  },
  {
    number: 4,
    sa: "ज्ञानकर्मसंन्यासयोगः",
    saTitle: "Jnana Karma Sannyasa Yoga",
    en: "Knowledge and the Renunciation of Action",
    enTitle: "Jnana Karma Sannyasa Yoga",
    verses: 42,
    description: "Whenever dharma declines, the Divine is born. Wisdom burns the bonds of work.",
    accent: "#1A3A7A",
    motif: "lamp",
  },
  {
    number: 5,
    sa: "कर्मसंन्यासयोगः",
    saTitle: "Karma Sannyasa Yoga",
    en: "The Yoga of Renunciation",
    enTitle: "Karma Sannyasa Yoga",
    verses: 29,
    description: "Renunciation and yoga of action are one when the heart is even.",
    accent: "#3E2A18",
    motif: "lotus",
  },
  {
    number: 6,
    sa: "ध्यानयोगः",
    saTitle: "Dhyana Yoga",
    en: "The Yoga of Meditation",
    enTitle: "Dhyana Yoga",
    verses: 47,
    description: "Lift the self by the self. A quiet seat, a steady mind, a friendly heart.",
    accent: "#2C4A3A",
    motif: "tree",
  },
  {
    number: 7,
    sa: "ज्ञानविज्ञानयोगः",
    saTitle: "Jnana Vijnana Yoga",
    en: "Knowledge and Realisation",
    enTitle: "Jnana Vijnana Yoga",
    verses: 30,
    description: "There is nothing higher than this. The many are strung on the One.",
    accent: "#4A2A48",
    motif: "flute",
  },
  {
    number: 8,
    sa: "अक्षरब्रह्मयोगः",
    saTitle: "Akshara Brahma Yoga",
    en: "The Imperishable Brahman",
    enTitle: "Akshara Brahma Yoga",
    verses: 28,
    description: "At the hour of leaving, remember. The syllable, the path, the unfading.",
    accent: "#1C3048",
    motif: "conch",
  },
  {
    number: 9,
    sa: "राजविद्याराजगुह्ययोगः",
    saTitle: "Raja Vidya Raja Guhya Yoga",
    en: "The Royal Knowledge and the Royal Secret",
    enTitle: "Raja Vidya Raja Guhya Yoga",
    verses: 34,
    description: "A leaf, a flower, a fruit, a little water — offered with love, received.",
    accent: "#6B2E1A",
    motif: "lotus",
  },
  {
    number: 10,
    sa: "विभूतियोगः",
    saTitle: "Vibhuti Yoga",
    en: "The Yoga of Divine Glories",
    enTitle: "Vibhuti Yoga",
    verses: 42,
    description: "Among lights, the sun. Among words, the sacred syllable. Among peaks, Meru.",
    accent: "#1E3A5C",
    motif: "peacock",
  },
  {
    number: 11,
    sa: "विश्वरूपदर्शनयोगः",
    saTitle: "Vishwarupa Darshana Yoga",
    en: "The Vision of the Universal Form",
    enTitle: "Vishwarupa Darshana Yoga",
    verses: 55,
    description: "Arjuna sees time itself — mouths of fire, worlds entering, a bow that trembles.",
    accent: "#2A1C40",
    motif: "wheel",
  },
  {
    number: 12,
    sa: "भक्तियोगः",
    saTitle: "Bhakti Yoga",
    en: "The Yoga of Devotion",
    enTitle: "Bhakti Yoga",
    verses: 20,
    description: "Free of hate, friendly to all, even-minded in praise and blame — this is dear.",
    accent: "#7A3A2A",
    motif: "lotus",
  },
  {
    number: 13,
    sa: "क्षेत्रक्षेत्रज्ञविभागयोगः",
    saTitle: "Kshetra Kshetrajna Vibhaga Yoga",
    en: "The Field and the Knower of the Field",
    enTitle: "Kshetra Kshetrajna Yoga",
    verses: 35,
    description: "This body is the field. The one who knows it is the knower. Knowledge is their union.",
    accent: "#2A3A28",
    motif: "tree",
  },
  {
    number: 14,
    sa: "गुणत्रयविभागयोगः",
    saTitle: "Gunatraya Vibhaga Yoga",
    en: "The Three Gunas",
    enTitle: "Gunatraya Vibhaga Yoga",
    verses: 27,
    description: "Sattva, rajas, tamas bind. Beyond the three, the Self is not stained.",
    accent: "#3A2C18",
    motif: "lamp",
  },
  {
    number: 15,
    sa: "पुरुषोत्तमयोगः",
    saTitle: "Purushottama Yoga",
    en: "The Supreme Person",
    enTitle: "Purushottama Yoga",
    verses: 20,
    description: "An inverted tree, roots above. The Lord seated in the heart of all.",
    accent: "#1A3A32",
    motif: "tree",
  },
  {
    number: 16,
    sa: "दैवासुरसम्पद्विभागयोगः",
    saTitle: "Daivasura Sampad Vibhaga Yoga",
    en: "Divine and Demonic Natures",
    enTitle: "Daivasura Sampad Yoga",
    verses: 24,
    description: "Fearlessness, truth, restraint — the divine wealth. Pride and cruelty, the other path.",
    accent: "#2C2448",
    motif: "conch",
  },
  {
    number: 17,
    sa: "श्रद्धात्रयविभागयोगः",
    saTitle: "Shraddhatraya Vibhaga Yoga",
    en: "The Threefold Faith",
    enTitle: "Shraddhatraya Vibhaga Yoga",
    verses: 28,
    description: "Faith, food, gift, and austerity follow the three gunas. Om Tat Sat.",
    accent: "#4A3020",
    motif: "lamp",
  },
  {
    number: 18,
    sa: "मोक्षसंन्यासयोगः",
    saTitle: "Moksha Sannyasa Yoga",
    en: "Liberation and Renunciation",
    enTitle: "Moksha Sannyasa Yoga",
    verses: 78,
    description: "Leave every lesser refuge. Come to this one. Where Krishna and Arjuna stand, there is victory.",
    accent: "#1C2740",
    motif: "chariot",
  },
];

export const VERSES: Verse[] = versesJson as Verse[];

export const TOTAL_VERSES = VERSES.length;

export function chapterByNumber(n: number): Chapter {
  return CHAPTERS.find((c) => c.number === n) ?? CHAPTERS[1];
}

export function versesForChapter(n: number): Verse[] {
  return VERSES.filter((v) => v.chapter === n);
}

export function verseAt(chapter: number, verse: number): Verse | undefined {
  return VERSES.find((v) => v.chapter === chapter && v.verse === verse);
}

export function meaning(verse: Verse, lang: LangId): string {
  const map: Partial<Record<LangId, string | undefined>> = {
    sa: verse.sa,
    en: verse.en,
    ta: verse.ta,
    hi: verse.hi,
    te: verse.te,
    kn: verse.kn,
    ml: verse.ml,
    bn: verse.bn,
    mr: verse.mr,
    gu: verse.gu,
  };
  const text = (map[lang] || "").trim();
  return text || verse.en;
}

export function nextVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  const list = versesForChapter(chapter);
  const i = list.findIndex((v) => v.verse === verse);
  if (i >= 0 && i < list.length - 1) return { chapter, verse: list[i + 1].verse };
  const nextCh = CHAPTERS.find((c) => c.number === chapter + 1);
  if (!nextCh) return null;
  const first = versesForChapter(nextCh.number)[0];
  return first ? { chapter: nextCh.number, verse: first.verse } : null;
}

export function prevVerse(chapter: number, verse: number): { chapter: number; verse: number } | null {
  const list = versesForChapter(chapter);
  const i = list.findIndex((v) => v.verse === verse);
  if (i > 0) return { chapter, verse: list[i - 1].verse };
  const prevCh = CHAPTERS.find((c) => c.number === chapter - 1);
  if (!prevCh) return null;
  const prevList = versesForChapter(prevCh.number);
  const last = prevList[prevList.length - 1];
  return last ? { chapter: prevCh.number, verse: last.verse } : null;
}

export function parseVerseRef(query: string): { chapter: number; verse: number } | null {
  const q = query.trim();
  const dotted = q.match(/^(\d{1,2})\s*[:.\-–]\s*(\d{1,3})$/);
  if (dotted) {
    const chapter = Number(dotted[1]);
    const verse = Number(dotted[2]);
    if (chapter >= 1 && chapter <= 18 && verse >= 1) return { chapter, verse };
  }
  const words = q.match(/^(?:ch(?:apter)?\s*)?(\d{1,2})\s+(?:v(?:erse)?\s*)?(\d{1,3})$/i);
  if (words) {
    const chapter = Number(words[1]);
    const verse = Number(words[2]);
    if (chapter >= 1 && chapter <= 18 && verse >= 1) return { chapter, verse };
  }
  return null;
}

function haystack(verse: Verse): string {
  return [
    verse.en,
    verse.iast,
    verse.sa,
    verse.ta,
    verse.hi,
    verse.te,
    verse.kn,
    verse.ml,
    verse.bn,
    verse.mr,
    verse.gu,
    verse.reflection,
    `${verse.chapter}.${verse.verse}`,
    `chapter ${verse.chapter}`,
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

export function searchVerses(query: string, limit = 24): Verse[] {
  const q = query.trim();
  if (!q) return [];
  const ref = parseVerseRef(q);
  if (ref) {
    const hit = verseAt(ref.chapter, ref.verse);
    return hit ? [hit] : [];
  }
  const needle = q.toLowerCase();
  return VERSES.filter((v) => haystack(v).includes(needle)).slice(0, limit);
}

export function verseOfTheDay(date = new Date()): Verse {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start) / 86_400_000);
  return VERSES[((day % VERSES.length) + VERSES.length) % VERSES.length];
}

export const DAILY_KEY = { chapter: 2, verse: 47 } as const;
export const CONTINUE_KEY = { chapter: 2, verse: 14 } as const;

export const SEARCH_CHIPS = ["Dharma", "Karma", "Fear", "Peace", "Detachment"];

export const BOOK_EDITIONS = [
  { id: "original", title: "Original Text", line: "Sanskrit recension", tone: "#8A4A1C" },
  { id: "meaning", title: "With Meaning", line: "Verse and commentary", tone: "#1A3A7A" },
  { id: "daily", title: "For Daily Life", line: "A verse each morning", tone: "#2C4A3A" },
  { id: "path", title: "In 18 Chapters", line: "The complete yoga", tone: "#4A2A48" },
  { id: "audio", title: "Audio Edition", line: "Listen and recite", tone: "#1C2740" },
];

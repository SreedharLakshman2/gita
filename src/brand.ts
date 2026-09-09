export const Brand = {
  app: "Gita",
  full: "Bhagavad Gita",
  tagline: "Timeless Wisdom for Everyday Life",
  splashLine: "Timeless Wisdom • Inner Peace • Dharma",
  studio: "sreeo",
  studioFull: "Sreeo Studio",
  company: "Sai Laksha Technologies",
  copyright: "© 2026 Sai Laksha Technologies",
  support: "https://sreedharlakshman2.github.io/gita/",
  privacy: "https://sreedharlakshman2.github.io/gita/privacy.html",
  moreApps: "https://apps.apple.com/developer/id1677299144",
  tiles: ["#22d3ee", "#7c4dff", "#ff6b9a", "#ffb703"] as const,
};

export const Palette = {
  ivory: "#F3EBDA",
  parchment: "#EDE3CC",
  paper: "#FBF6EA",
  card: "#FFFBF3",
  navy: "#1C2740",
  royal: "#243A6B",
  krishna: "#1A3A7A",
  saffron: "#C47A2C",
  gold: "#B8954A",
  goldBright: "#D4B56A",
  ink: "#3B2C1E",
  muted: "#7A6A58",
};

export type LangId =
  | "sa"
  | "en"
  | "ta"
  | "hi"
  | "te"
  | "kn"
  | "ml"
  | "bn"
  | "mr"
  | "gu";

export const LANGUAGES: {
  id: LangId;
  native: string;
  english: string;
  speech: string;
}[] = [
  { id: "sa", native: "संस्कृत", english: "Sanskrit", speech: "hi-IN" },
  { id: "en", native: "English", english: "English", speech: "en-IN" },
  { id: "ta", native: "தமிழ்", english: "Tamil", speech: "ta-IN" },
  { id: "hi", native: "हिन्दी", english: "Hindi", speech: "hi-IN" },
  { id: "te", native: "తెలుగు", english: "Telugu", speech: "te-IN" },
  { id: "kn", native: "ಕನ್ನಡ", english: "Kannada", speech: "kn-IN" },
  { id: "ml", native: "മലയാളം", english: "Malayalam", speech: "ml-IN" },
  { id: "bn", native: "বাংলা", english: "Bengali", speech: "bn-IN" },
  { id: "mr", native: "मराठी", english: "Marathi", speech: "mr-IN" },
  { id: "gu", native: "ગુજરાતી", english: "Gujarati", speech: "gu-IN" },
];

export const READER_TABS: { id: LangId; label: string }[] = [
  { id: "sa", label: "संस्कृत" },
  { id: "en", label: "English" },
  { id: "ta", label: "தமிழ்" },
  { id: "hi", label: "हिन्दी" },
];

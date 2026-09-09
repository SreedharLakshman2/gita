import { LANGUAGES, type LangId } from "./brand";

const MALE_HINTS = [
  "male",
  "man",
  "rishi",
  "kumar",
  "ravi",
  "hemant",
  "suresh",
  "daniel",
  "alex",
  "fred",
  "aaron",
  "google हिन्दी",
  "krishna",
];

const FEMALE_HINTS = [
  "female",
  "woman",
  "veena",
  "lekha",
  "samantha",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "priya",
  "meera",
  "kanya",
  "heera",
  "zira",
];

const clipModules = import.meta.glob("./voice-clips/*.{mp3,m4a,wav,ogg,aac}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

let clipPlayer: HTMLAudioElement | null = null;

function scoreVoice(voice: SpeechSynthesisVoice, want: string): number {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  const prefix = want.slice(0, 2).toLowerCase();
  let score = 0;
  if (lang === want.toLowerCase()) score += 48;
  else if (lang.startsWith(prefix)) score += 28;
  if (want.startsWith("hi") && lang.startsWith("hi")) score += 8;
  if (lang.includes("-in")) score += 12;
  if (MALE_HINTS.some((hint) => name.includes(hint))) score += 36;
  if (FEMALE_HINTS.some((hint) => name.includes(hint))) score -= 48;
  if (voice.localService) score += 6;
  return score;
}

function pickMaleVoice(want: string): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !window.speechSynthesis) return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;
  return [...voices].sort((a, b) => scoreVoice(b, want) - scoreVoice(a, want))[0];
}

function clipUrl(chapter?: number, verse?: number, lang?: LangId): string | undefined {
  if (!chapter || !verse || !lang) return undefined;
  const keys = [`c${chapter}-v${verse}-${lang}`, `${chapter}-${verse}-${lang}`, `${chapter}.${verse}.${lang}`];
  for (const [path, url] of Object.entries(clipModules)) {
    if (keys.some((key) => path.includes(key))) return url;
  }
  return undefined;
}

function stopClip() {
  if (!clipPlayer) return;
  clipPlayer.pause();
  clipPlayer.src = "";
  clipPlayer = null;
}

let speakGen = 0;
let activeGen = 0;
let onSpeechEnd: (() => void) | null = null;

function finishSpeech(gen: number) {
  if (gen !== speakGen) return;
  const done = onSpeechEnd;
  onSpeechEnd = null;
  done?.();
}

function playClip(src: string, rate: number, gen: number) {
  stopClip();
  clipPlayer = new Audio(src);
  clipPlayer.playbackRate = Math.max(0.7, Math.min(1.5, rate));
  clipPlayer.onended = () => finishSpeech(gen);
  clipPlayer.onerror = () => finishSpeech(gen);
  void clipPlayer.play();
}

export function speakDivine(
  text: string,
  lang: LangId,
  rate: number,
  ref?: { chapter: number; verse: number },
  onEnd?: () => void
) {
  const spoken = text.replace(/\n/g, " ").trim();
  if (!spoken) {
    onEnd?.();
    return;
  }
  speakGen += 1;
  const gen = speakGen;
  activeGen = gen;
  onSpeechEnd = onEnd ?? null;
  const voiceLang = LANGUAGES.find((item) => item.id === lang)?.speech ?? "en-IN";
  const nativeHandler = typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoSpeak : undefined;
  if (nativeHandler) {
    nativeHandler.postMessage({
      text: spoken,
      lang: voiceLang,
      rate,
      pitch: 0.78,
      divine: true,
      chapter: ref?.chapter,
      verse: ref?.verse,
    });
    return;
  }
  const custom = clipUrl(ref?.chapter, ref?.verse, lang);
  if (custom) {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    playClip(custom, rate, gen);
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) {
    finishSpeech(gen);
    return;
  }
  stopClip();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(spoken);
  utter.lang = voiceLang;
  utter.rate = Math.max(0.65, Math.min(1.35, rate * 0.92));
  utter.pitch = 0.78;
  const chosen = pickMaleVoice(voiceLang);
  if (chosen) utter.voice = chosen;
  utter.onend = () => finishSpeech(gen);
  utter.onerror = () => finishSpeech(gen);
  window.speechSynthesis.speak(utter);
}

export function stopDivine() {
  speakGen += 1;
  onSpeechEnd = null;
  stopClip();
  const nativeStop = typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoStopSpeak : undefined;
  if (nativeStop) {
    nativeStop.postMessage({});
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

function bindSpeechEnded() {
  if (typeof window === "undefined") return;
  window.__gitaSpeechEnded = () => finishSpeech(activeGen);
}

bindSpeechEnded();

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

declare global {
  interface Window {
    __gitaSpeechEnded?: () => void;
  }
}

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
  "ramasamy",
];

const FEMALE_HINTS = ["female", "woman", "samantha", "karen", "moira", "tessa", "fiona", "zira"];

const clipModules = import.meta.glob("./voice-clips/*.{mp3,m4a,wav,ogg,aac}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

let clipPlayer: HTMLAudioElement | null = null;
let pendingVoices: (() => void) | null = null;

function langPrefix(code: string) {
  return code.toLowerCase().replace("_", "-").split("-")[0] || code.toLowerCase();
}

function languageMatches(voiceLang: string, want: string) {
  return langPrefix(voiceLang) === langPrefix(want);
}

function scoreVoice(voice: SpeechSynthesisVoice, want: string): number {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  const wantNorm = want.toLowerCase().replace("_", "-");
  let score = 0;
  if (!languageMatches(lang, want)) return -1000;
  if (lang.replace("_", "-") === wantNorm) score += 80;
  else score += 40;
  if (lang.includes("-in")) score += 12;
  if (MALE_HINTS.some((hint) => name.includes(hint))) score += 16;
  if (FEMALE_HINTS.some((hint) => name.includes(hint))) score -= 8;
  if (voice.localService) score += 6;
  return score;
}

function pickVoice(want: string): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !window.speechSynthesis) return undefined;
  const voices = window.speechSynthesis.getVoices().filter((voice) => languageMatches(voice.lang, want));
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

function speakWeb(spoken: string, voiceLang: string, rate: number, gen: number, tries = 0) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    finishSpeech(gen);
    return;
  }
  if (gen !== speakGen) return;
  const voicesReady = window.speechSynthesis.getVoices().length > 0;
  if (!voicesReady && tries < 8) {
    pendingVoices = () => speakWeb(spoken, voiceLang, rate, gen, tries + 1);
    window.setTimeout(() => {
      if (pendingVoices) pendingVoices();
    }, 120);
    return;
  }
  stopClip();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(spoken);
  utter.lang = voiceLang;
  utter.rate = Math.max(0.65, Math.min(1.35, rate * 0.92));
  utter.pitch = 0.86;
  const chosen = pickVoice(voiceLang);
  if (chosen) utter.voice = chosen;
  utter.onend = () => finishSpeech(gen);
  utter.onerror = () => finishSpeech(gen);
  window.speechSynthesis.speak(utter);
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
  pendingVoices = null;
  const voiceLang = LANGUAGES.find((item) => item.id === lang)?.speech ?? "en-IN";
  const nativeHandler = typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoSpeak : undefined;
  if (nativeHandler) {
    nativeHandler.postMessage({
      text: spoken,
      lang: voiceLang,
      rate,
      pitch: 0.86,
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
  speakWeb(spoken, voiceLang, rate, gen);
}

export function stopDivine() {
  speakGen += 1;
  onSpeechEnd = null;
  pendingVoices = null;
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
    pendingVoices?.();
  };
}

declare global {
  interface Window {
    __gitaSpeechEnded?: () => void;
  }
}

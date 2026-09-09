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

export function speakDivine(text: string, lang: LangId, rate: number) {
  const spoken = text.replace(/\n/g, " ").trim();
  if (!spoken) return;
  const voiceLang = LANGUAGES.find((item) => item.id === lang)?.speech ?? "en-IN";
  const nativeHandler = typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoSpeak : undefined;
  if (nativeHandler) {
    nativeHandler.postMessage({ text: spoken, lang: voiceLang, rate, pitch: 0.78, divine: true });
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(spoken);
  utter.lang = voiceLang;
  utter.rate = Math.max(0.65, Math.min(1.35, rate * 0.92));
  utter.pitch = 0.78;
  const chosen = pickMaleVoice(voiceLang);
  if (chosen) utter.voice = chosen;
  window.speechSynthesis.speak(utter);
}

export function stopDivine() {
  const nativeStop = typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoStopSpeak : undefined;
  if (nativeStop) {
    nativeStop.postMessage({});
    return;
  }
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

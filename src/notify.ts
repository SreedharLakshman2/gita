import { meaning, verseOfTheDay } from "./data";
import type { LangId } from "./brand";
import { isNative } from "./native";

let webTimer: number | undefined;

function reminderCopy(lang: LangId) {
  const verse = verseOfTheDay();
  const line = meaning(verse, lang === "sa" ? "en" : lang);
  const snippet = line.length > 140 ? `${line.slice(0, 137)}…` : line;
  return {
    title: "A verse from the Gita",
    body: `${verse.chapter}.${verse.verse} — ${snippet}`,
    hour: 7,
    minute: 0,
  };
}

function msUntilMorning(hour: number, minute: number) {
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

function scheduleWeb(title: string, body: string, hour: number, minute: number) {
  if (typeof window === "undefined" || typeof Notification === "undefined") return;
  if (webTimer) window.clearTimeout(webTimer);
  webTimer = window.setTimeout(() => {
    new Notification(title, { body, tag: "gita-daily-verse" });
    scheduleWeb(title, body, hour, minute);
  }, msUntilMorning(hour, minute));
}

export async function syncVerseReminder(enabled: boolean, lang: LangId = "en") {
  if (typeof window !== "undefined" && window.__GITA_UITEST__) return;
  const copy = reminderCopy(lang);
  if (isNative()) {
    window.webkit?.messageHandlers?.sreeoNotify?.postMessage({ enabled, ...copy });
    return;
  }
  if (typeof window === "undefined") return;
  if (!enabled) {
    if (webTimer) window.clearTimeout(webTimer);
    webTimer = undefined;
    return;
  }
  if (typeof Notification === "undefined") return;
  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }
  if (permission !== "granted") return;
  scheduleWeb(copy.title, copy.body, copy.hour, copy.minute);
}

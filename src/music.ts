const SRC = `${import.meta.env.BASE_URL}music/dhaka.mp3`;
const IDLE = 0.16;
const DUCKED = 0.045;

let wanted = false;
let ducked = false;
let bound = false;
let player: HTMLAudioElement | null = null;

function nativeHandler() {
  return typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoAmbient : undefined;
}

function targetVolume() {
  if (!wanted || (typeof document !== "undefined" && document.hidden)) return 0;
  return ducked ? DUCKED : IDLE;
}

function nativeEnabled() {
  return wanted && (typeof document === "undefined" || !document.hidden);
}

function syncNative() {
  nativeHandler()?.postMessage({ enabled: nativeEnabled(), ducked });
}

function ensurePlayer() {
  if (player || nativeHandler() || typeof Audio === "undefined") return player;
  player = new Audio(SRC);
  player.loop = true;
  player.preload = "auto";
  player.volume = targetVolume();
  player.setAttribute("playsinline", "true");
  player.dataset.gitaAmbient = "true";
  player.hidden = true;
  document.body.append(player);
  return player;
}

async function playWeb() {
  const el = ensurePlayer();
  if (!el) return;
  el.volume = targetVolume();
  if (!wanted || document.hidden) {
    el.pause();
    return;
  }
  try {
    await el.play();
  } catch {
    /* Browsers wait for a tap; bindUnlock retries. */
  }
}

function bindUnlock() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  const retry = () => {
    if (nativeHandler()) {
      syncNative();
      return;
    }
    void playWeb();
  };
  window.addEventListener("pointerdown", retry, { passive: true });
  window.addEventListener("keydown", retry);
  document.addEventListener("visibilitychange", retry);
}

export function setAmbientEnabled(on: boolean) {
  wanted = on;
  bindUnlock();
  if (nativeHandler()) {
    if (player) {
      player.pause();
      player.remove();
      player = null;
    }
    syncNative();
    return;
  }
  void playWeb();
}

export function setAmbientDucked(on: boolean) {
  ducked = on;
  if (nativeHandler()) {
    syncNative();
    return;
  }
  if (player) player.volume = targetVolume();
}

const SRC = `${import.meta.env.BASE_URL}music/dhaka.mp3`;
const IDLE = 0.16;
const DUCKED = 0.045;

let wanted = false;
let ducked = false;
let bound = false;
let playToken = 0;
let player: HTMLAudioElement | null = null;

function nativeHandler() {
  return typeof window !== "undefined" ? window.webkit?.messageHandlers?.sreeoAmbient : undefined;
}

function targetVolume() {
  if (!wanted || (typeof document !== "undefined" && document.hidden)) return 0;
  return ducked ? DUCKED : IDLE;
}

function nativePayload(enabled: boolean) {
  return { enabled, ducked };
}

function haltHtml() {
  playToken += 1;
  const nodes = [
    player,
    ...(typeof document !== "undefined" ? [...document.querySelectorAll<HTMLAudioElement>("[data-gita-ambient]")] : []),
  ].filter(Boolean) as HTMLAudioElement[];
  for (const el of nodes) {
    el.pause();
    el.volume = 0;
    el.loop = false;
    try {
      el.currentTime = 0;
    } catch {
      /* ignore unseekable */
    }
    el.removeAttribute("src");
    el.src = "";
    try {
      el.load();
    } catch {
      /* ignore */
    }
    el.remove();
  }
  player = null;
}

function haltAll() {
  haltHtml();
  nativeHandler()?.postMessage(nativePayload(false));
}

function ensurePlayer() {
  if (player) return player;
  if (typeof Audio === "undefined") return null;
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
  const mine = ++playToken;
  const el = ensurePlayer();
  if (!el) return;
  if (!wanted || document.hidden) {
    haltHtml();
    return;
  }
  el.loop = true;
  el.volume = targetVolume();
  try {
    await el.play();
  } catch {
    /* Browsers wait for a tap; bindUnlock retries. */
  }
  if (!wanted) {
    haltHtml();
    return;
  }
  if (mine !== playToken) return;
  el.volume = targetVolume();
}

function bindUnlock() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  const retry = () => {
    if (!wanted) {
      haltAll();
      return;
    }
    if (typeof document !== "undefined" && document.hidden) {
      if (player) {
        player.pause();
        player.volume = 0;
      }
      nativeHandler()?.postMessage(nativePayload(false));
      return;
    }
    if (nativeHandler()) {
      nativeHandler()?.postMessage(nativePayload(true));
      return;
    }
    if (player && !player.paused) {
      player.volume = targetVolume();
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
  if (!on) {
    haltAll();
    return;
  }
  if (nativeHandler()) {
    haltHtml();
    nativeHandler()?.postMessage(nativePayload(true));
    return;
  }
  void playWeb();
}

export function setAmbientDucked(on: boolean) {
  ducked = on;
  if (!wanted) return;
  if (nativeHandler()) {
    nativeHandler()?.postMessage(nativePayload(true));
    return;
  }
  if (player) player.volume = targetVolume();
}

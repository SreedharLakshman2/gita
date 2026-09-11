/// <reference types="vite/client" />

interface Window {
  __GITA_NATIVE__?: boolean;
  webkit?: {
    messageHandlers?: {
      sreeoSpeak?: { postMessage: (message: unknown) => void };
      sreeoStopSpeak?: { postMessage: (message: unknown) => void };
      sreeoNotify?: { postMessage: (message: unknown) => void };
      sreeoAmbient?: { postMessage: (message: unknown) => void };
      sreeoAds?: { postMessage: (message: unknown) => void };
    };
  };
  __GITA_LAUNCH__?: {
    screen?: string;
    lang?: string;
    chapter?: number;
    verse?: number;
    tab?: string;
  };
  __GITA_UITEST__?: {
    screen?: string;
    lang?: string;
    chapter?: number;
    verse?: number;
    tab?: string;
  };
}


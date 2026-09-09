/// <reference types="vite/client" />

interface Window {
  __GITA_NATIVE__?: boolean;
  webkit?: {
    messageHandlers?: {
      sreeoSpeak?: { postMessage: (message: unknown) => void };
      sreeoStopSpeak?: { postMessage: (message: unknown) => void };
      sreeoNotify?: { postMessage: (message: unknown) => void };
    };
  };
}


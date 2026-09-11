import { useEffect, useMemo, useState } from "react";
import { DesignBoard, type Freeze } from "./board";
import { isNative } from "./native";
import { ActiveScreen } from "./screens";
import { StoreProvider, type ScreenId, type TabId } from "./store";
import { Phone } from "./ui";
import "./styles.css";

function launchFromQuery(): Freeze | undefined {
  if (typeof window === "undefined") return undefined;
  const injected = window.__GITA_LAUNCH__;
  const query = new URLSearchParams(window.location.search);
  const screen = (injected?.screen || query.get("screen")) as ScreenId | null;
  if (!screen) return undefined;
  return {
    screen,
    dark: query.get("light") !== "1",
    lang: (injected?.lang || query.get("lang") || "en") as Freeze["lang"],
    chapter: Number(injected?.chapter || query.get("chapter") || 2) || 2,
    verse: Number(injected?.verse || query.get("verse") || 47) || 47,
    tab: ((injected?.tab || query.get("tab")) as TabId) || undefined,
  };
}

function uiTestSeed(): Freeze | undefined {
  if (typeof window === "undefined") return undefined;
  const seeded = window.__GITA_UITEST__;
  const screen = seeded?.screen as ScreenId | undefined;
  if (!screen) return undefined;
  return {
    screen,
    dark: true,
    lang: "en",
    chapter: Number(seeded?.chapter || 2) || 2,
    verse: Number(seeded?.verse || 47) || 47,
    tab: (seeded?.tab as TabId) || undefined,
  };
}

export default function App() {
  const native = isNative();
  const launch = useMemo(() => launchFromQuery(), []);
  const uitest = useMemo(() => uiTestSeed(), []);
  const [narrow, setNarrow] = useState(() =>
    native || (typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches)
  );
  const [mode, setMode] = useState<"board" | "app">(() =>
    native || launch || uitest || (typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches)
      ? "app"
      : "board"
  );
  const [initial, setInitial] = useState<Freeze | undefined>(launch ?? uitest);

  useEffect(() => {
    if (native) {
      setNarrow(true);
      setMode("app");
      return;
    }
    const mq = window.matchMedia("(max-width: 780px)");
    const onChange = () => {
      setNarrow(mq.matches);
      if (mq.matches) setMode("app");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [native]);

  if (mode === "board" && !narrow && !native) {
    return (
      <DesignBoard
        onOpen={(freeze) => {
          setInitial(freeze);
          setMode("app");
        }}
      />
    );
  }

  return (
    <div className={`proto ${narrow || native ? "full" : ""}`}>
      {narrow || native ? null : (
        <button className="board-return" type="button" onClick={() => setMode("board")}>
          Design board
        </button>
      )}
      <StoreProvider freeze={launch} initial={initial} key={initial ? JSON.stringify(initial) : "fresh"}>
        {narrow || native ? (
          <ActiveScreen />
        ) : (
          <div className="live-stage">
            <Phone dark={initial?.dark ?? true}>
              <ActiveScreen />
            </Phone>
          </div>
        )}
      </StoreProvider>
    </div>
  );
}

import { useEffect, useState } from "react";
import { DesignBoard, type Freeze } from "./board";
import { isNative } from "./native";
import { ActiveScreen } from "./screens";
import { StoreProvider } from "./store";
import { Phone } from "./ui";
import "./styles.css";

export default function App() {
  const native = isNative();
  const [narrow, setNarrow] = useState(() =>
    native || (typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches)
  );
  const [mode, setMode] = useState<"board" | "app">(() =>
    native || (typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches) ? "app" : "board"
  );
  const [initial, setInitial] = useState<Freeze | undefined>();

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
      <StoreProvider initial={initial} key={initial ? JSON.stringify(initial) : "fresh"}>
        {narrow || native ? (
          <ActiveScreen />
        ) : (
          <div className="live-stage">
            <Phone dark={initial?.dark}>
              <ActiveScreen />
            </Phone>
          </div>
        )}
      </StoreProvider>
    </div>
  );
}

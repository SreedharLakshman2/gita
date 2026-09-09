import { useEffect, useState } from "react";
import { DesignBoard, type Freeze } from "./board";
import { ActiveScreen } from "./screens";
import { StoreProvider } from "./store";
import { Phone } from "./ui";
import "./styles.css";

export default function App() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 780px)").matches : false
  );
  const [mode, setMode] = useState<"board" | "app">(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 780px)").matches ? "app" : "board"
  );
  const [initial, setInitial] = useState<Freeze | undefined>();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 780px)");
    const onChange = () => {
      setNarrow(mq.matches);
      if (mq.matches) setMode("app");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (mode === "board" && !narrow) {
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
    <div className={`proto ${narrow ? "full" : ""}`}>
      {narrow ? null : (
        <button className="board-return" type="button" onClick={() => setMode("board")}>
          Design board
        </button>
      )}
      <StoreProvider initial={initial} key={initial ? JSON.stringify(initial) : "fresh"}>
        {narrow ? (
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

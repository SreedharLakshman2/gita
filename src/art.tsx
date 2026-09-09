import { Lottie } from "lottie-react";
import { useMemo } from "react";
import glow from "./lottie/glow.json";
import lotus from "./lottie/lotus.json";

const LOTTIES = { glow, lotus } as const;

export function DivineLottie({
  name,
  className,
}: {
  name: keyof typeof LOTTIES;
  className?: string;
}) {
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  return (
    <Lottie src={LOTTIES[name]} loop={!reduced} autoplay className={className} aria-hidden />
  );
}

export function SacredArt({
  kind,
  className,
  alt = "",
}: {
  kind: "chariot" | "flute";
  className?: string;
  alt?: string;
}) {
  const src =
    kind === "chariot"
      ? `${import.meta.env.BASE_URL}art/krishna-arjuna-chariot.png`
      : `${import.meta.env.BASE_URL}art/krishna-flute-circle.png`;
  return <img src={src} alt={alt} className={className} draggable={false} />;
}

export function chapterArt(chapter: number): "chariot" | "flute" {
  if ([7, 9, 10, 12].includes(chapter)) return "flute";
  return "chariot";
}

import { Lottie } from "lottie-react";
import { useMemo } from "react";
import glow from "./lottie/glow.json";
import lotus from "./lottie/lotus.json";
import chariotArt from "./media/krishna-arjuna-chariot.png";
import fluteArt from "./media/krishna-flute-circle.png";
import { BansuriMotif, LotusMotif, PeacockMotif } from "./motifs";

const LOTTIES = { glow, lotus } as const;
const ART = { chariot: chariotArt, flute: fluteArt } as const;

export function SacredMark({
  name,
  className,
}: {
  name: "lotus" | "peacock" | "flute";
  className?: string;
}) {
  if (name === "peacock") return <PeacockMotif className={className} />;
  if (name === "flute") return <BansuriMotif className={className} />;
  return <LotusMotif className={className} />;
}

export function DivineLottie({
  name,
  className,
}: {
  name: "glow" | "lotus" | "peacock" | "flute";
  className?: string;
}) {
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  if (name === "peacock" || name === "flute") return <SacredMark name={name} className={className} />;
  return <Lottie src={LOTTIES[name]} loop={!reduced} autoplay className={className} aria-hidden />;
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
  return <img src={ART[kind]} alt={alt} className={className} draggable={false} />;
}

export function chapterArt(chapter: number): "chariot" | "flute" {
  if ([7, 9, 10, 12].includes(chapter)) return "flute";
  return "chariot";
}

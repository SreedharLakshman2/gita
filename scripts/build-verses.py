#!/usr/bin/env python3
"""Merge public-domain Gita text with app extras and Hindi translations."""

from __future__ import annotations

import json
import pathlib
import re
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
PD_PATH = pathlib.Path(
    "/Users/pranavsreedharlakshmanan/.cursor/projects/Users-pranavsreedharlakshmanan-Documents-MyApps-Gita/agent-tools/73bfdd1c-0da8-4d53-a483-c3930e0e5561.txt"
)
OUT = ROOT / "src" / "verses.json"
HI_CACHE = pathlib.Path("/tmp/gita-translation.json")
VERSE_CACHE = pathlib.Path("/tmp/gita-verse.json")


def grab_quoted(body: str, key: str) -> str | None:
    m = re.search(rf'{key}:\s*("(?:\\.|[^"\\])*")', body)
    if not m:
        return None
    return json.loads(m.group(1))


def extras_from_data_ts() -> dict[str, dict]:
    text = (ROOT / "src" / "data.ts").read_text()
    start = text.index("export const VERSES")
    end = text.index("export const TOTAL_VERSES")
    extras: dict[str, dict] = {}
    for m in re.finditer(r"\{([^{}]+)\}", text[start:end]):
        body = m.group(0)
        ch = re.search(r"chapter:\s*(\d+)", body)
        vs = re.search(r"verse:\s*(\d+)", body)
        if not ch or not vs:
            continue
        rec = {}
        for key in ("sa", "iast", "en", "ta", "hi", "te", "kn", "ml", "bn", "mr", "gu", "reflection"):
            val = grab_quoted(body, key)
            if val:
                rec[key] = val
        extras[f"{ch.group(1)}.{vs.group(1)}"] = rec
    return extras


def clean_sa(s: str) -> str:
    s = re.sub(r"\s*\|\|[०-९0-9\-]+\|\|", "", s)
    s = re.sub(r"।।[\d.]+।।", "", s)
    s = s.replace("|", "।")
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n", s)
    return s.strip()


def clean_iast(s: str) -> str:
    s = re.sub(r"\s*\|\|[0-9\-]+\|\|", "", s)
    s = s.replace(" .", " |")
    return s.strip()


def modernize_en(s: str) -> str:
    pairs = [
        (r"\bThou wilt\b", "You will"),
        (r"\bthou wilt\b", "you will"),
        (r"\bThou shalt\b", "You shall"),
        (r"\bthou shalt\b", "you shall"),
        (r"\bThou art\b", "You are"),
        (r"\bthou art\b", "you are"),
        (r"\bThou\b", "You"),
        (r"\bthou\b", "you"),
        (r"\bThee\b", "You"),
        (r"\bthee\b", "you"),
        (r"\bThy\b", "Your"),
        (r"\bthy\b", "your"),
        (r"\bThine\b", "Your"),
        (r"\bthine\b", "your"),
        (r"\bwilt\b", "will"),
        (r"\bshalt\b", "shall"),
    ]
    for pat, rep in pairs:
        s = re.sub(pat, rep, s)
    return s


def clean_en(s: str, chapter: int, verse: int) -> str:
    s = re.sub(rf"^{chapter}\.{verse}\s+", "", s.strip())
    return modernize_en(s).strip()


def clean_hi(s: str) -> str:
    s = s.replace("\xa0", " ")
    s = re.sub(r"^।{2}[\d.]+।{2}\s*", "", s.strip())
    s = re.sub(r"\(टिप्पणी[^)]*\)", "", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip(" ।")


def load_json(url: str, cache: pathlib.Path):
    if cache.exists() and cache.stat().st_size > 1000:
        return json.loads(cache.read_text())
    with urllib.request.urlopen(url, timeout=30) as resp:
        data = resp.read()
    cache.write_bytes(data)
    return json.loads(data)


def hindi_map() -> dict[tuple[int, int], str]:
    verses = load_json("https://ravisiyer.github.io/gita-data/v1/verse.json", VERSE_CACHE)
    trans = load_json("https://ravisiyer.github.io/gita-data/v1/translation.json", HI_CACHE)
    id_to_ref = {(v["id"]): (v["chapter_number"], v["verse_number"]) for v in verses}
    out: dict[tuple[int, int], str] = {}
    for t in trans:
        if t.get("authorName") != "Swami Tejomayananda" or t.get("lang") != "hindi":
            continue
        ref = id_to_ref.get(t["verse_id"])
        if not ref:
            continue
        text = clean_hi(t.get("description") or "")
        if text:
            out[ref] = text
    return out


def main() -> None:
    raw = json.loads(PD_PATH.read_text())
    extras = extras_from_data_ts()
    hindi = hindi_map()
    verses = []
    for item in raw["verses"]:
        ch = int(item["chapter"])
        vs = int(item["verse"])
        key = f"{ch}.{vs}"
        extra = extras.get(key, {})
        rec = {
            "chapter": ch,
            "verse": vs,
            "sa": extra.get("sa") or clean_sa(item.get("sanskrit") or ""),
            "iast": extra.get("iast") or clean_iast(item.get("transliteration") or ""),
            "en": extra.get("en") or clean_en(item.get("english_alt") or item.get("english") or "", ch, vs),
            "ta": extra.get("ta") or "",
            "hi": extra.get("hi") or hindi.get((ch, vs), ""),
        }
        for lang in ("te", "kn", "ml", "bn", "mr", "gu", "reflection"):
            if extra.get(lang):
                rec[lang] = extra[lang]
        verses.append(rec)

    verses.sort(key=lambda v: (v["chapter"], v["verse"]))
    OUT.write_text(json.dumps(verses, ensure_ascii=False, separators=(",", ":")))
    counts: dict[int, int] = {}
    for v in verses:
        counts[v["chapter"]] = counts.get(v["chapter"], 0) + 1
    two_three_three = next(v for v in verses if v["chapter"] == 2 and v["verse"] == 33)
    print("verses", len(verses))
    print("by chapter", counts)
    print("2.33 en", two_three_three["en"][:120])
    print("2.33 hi", two_three_three["hi"][:120])
    print("extras merged", len(extras))
    print("hindi", sum(1 for v in verses if v["hi"]))
    print("tamil", sum(1 for v in verses if v["ta"]))
    print("wrote", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()

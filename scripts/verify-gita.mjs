import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const verses = JSON.parse(readFileSync(join(root, "src/verses.json"), "utf8"));

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
}

function parseVerseRef(query) {
  const q = query.trim();
  const dotted = q.match(/^(\d{1,2})\s*[:.\-–]\s*(\d{1,3})$/);
  if (dotted) return { chapter: Number(dotted[1]), verse: Number(dotted[2]) };
  return null;
}

const expected = {
  1: 47,
  2: 72,
  3: 43,
  4: 42,
  5: 29,
  6: 47,
  7: 30,
  8: 28,
  9: 34,
  10: 42,
  11: 55,
  12: 20,
  13: 35,
  14: 27,
  15: 20,
  16: 24,
  17: 28,
  18: 78,
};

if (verses.length !== 701) fail(`expected 701 verses, got ${verses.length}`);

const counts = {};
for (const verse of verses) {
  counts[verse.chapter] = (counts[verse.chapter] || 0) + 1;
}
for (const [chapter, count] of Object.entries(expected)) {
  if (counts[Number(chapter)] !== count) fail(`chapter ${chapter} expected ${count}, got ${counts[chapter]}`);
}

const twoThirtyThree = verses.find((v) => v.chapter === 2 && v.verse === 33);
if (!twoThirtyThree) fail("2.33 missing");
if (!twoThirtyThree.en) fail("2.33 missing English");
if (!twoThirtyThree.hi) fail("2.33 missing Hindi");
if (!twoThirtyThree.sa) fail("2.33 missing Sanskrit");

const ref = parseVerseRef("2:33");
if (!ref || ref.chapter !== 2 || ref.verse !== 33) fail("parseVerseRef 2:33");
if (!parseVerseRef("2.47") || parseVerseRef("2.47").verse !== 47) fail("parseVerseRef 2.47");

const hindi = verses.filter((v) => v.hi).length;
if (hindi < 700) fail(`Hindi coverage ${hindi}`);

const langs = ["en", "hi", "sa", "ta"];
for (const verse of verses) {
  for (const lang of langs) {
    const text = String(verse[lang] || "").trim();
    if (!text) fail(`${verse.chapter}.${verse.verse} empty meaning for ${lang}`);
  }
  if (String(verse.ta).trim() === String(verse.en).trim()) {
    fail(`${verse.chapter}.${verse.verse} Tamil is still English`);
  }
}

const featured = verses.find((v) => v.chapter === 2 && v.verse === 47);
for (const lang of ["ta", "te", "kn", "ml", "bn", "mr", "gu"]) {
  if (!featured?.[lang]) fail(`2.47 missing ${lang}`);
}

if (!process.exitCode) {
  console.log(`OK ${verses.length} verses, Hindi ${hindi}, search 2:33 ready`);
}

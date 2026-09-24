import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const verses = JSON.parse(readFileSync(join(root, "src/verses.json"), "utf8"));
const brand = readFileSync(join(root, "src/brand.ts"), "utf8");
const data = readFileSync(join(root, "src/data.ts"), "utf8");

function fail(message) {
  console.error(`FAIL meaning ${message}`);
  process.exitCode = 1;
}

function verse(ch, vs) {
  return verses.find((item) => item.chapter === ch && item.verse === vs);
}

function hasScript(text, start, end) {
  let n = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code >= start && code <= end) n += 1;
  }
  return n >= 8;
}

const ranges = {
  sa: [0x0900, 0x097f],
  hi: [0x0900, 0x097f],
  ta: [0x0b80, 0x0bff],
  te: [0x0c00, 0x0c7f],
  kn: [0x0c80, 0x0cff],
  ml: [0x0d00, 0x0d7f],
  bn: [0x0980, 0x09ff],
  mr: [0x0900, 0x097f],
  gu: [0x0a80, 0x0aff],
};

const expected = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
  9: 34, 10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78,
};

if (verses.length !== 701) fail(`expected 701 verses, got ${verses.length}`);

const counts = {};
for (const item of verses) counts[item.chapter] = (counts[item.chapter] || 0) + 1;
for (const [chapter, count] of Object.entries(expected)) {
  if (counts[Number(chapter)] !== count) fail(`chapter ${chapter} expected ${count} verses`);
}

const core = ["sa", "en", "ta", "hi"];
for (const lang of core) {
  const missing = verses.filter((item) => !String(item[lang] || "").trim());
  if (missing.length) fail(`${lang} missing ${missing.length} verses, first ${missing[0].chapter}.${missing[0].verse}`);
}

for (const item of verses) {
  if (String(item.ta).trim() === String(item.en).trim()) fail(`${item.chapter}.${item.verse} Tamil is still English`);
  if (String(item.hi).trim() === String(item.en).trim()) fail(`${item.chapter}.${item.verse} Hindi is still English`);
  if (!hasScript(item.sa, ...ranges.sa)) fail(`${item.chapter}.${item.verse} Sanskrit is not Devanagari`);
  if (!hasScript(item.ta, ...ranges.ta)) fail(`${item.chapter}.${item.verse} Tamil is not Tamil script`);
  if (!hasScript(item.hi, ...ranges.hi)) fail(`${item.chapter}.${item.verse} Hindi is not Devanagari`);
  if (/^\d+\.\d+/.test(item.en.trim())) fail(`${item.chapter}.${item.verse} English still starts with a verse number`);
  if (item.en.includes("ï1")) fail(`${item.chapter}.${item.verse} English still has OCR italic marks`);
  if (/\b(doest|eatest|unto|thyself|by devoted|lesser dharmas|shouldst|confusest|desirest|coner|eality)\b/i.test(item.en)) {
    fail(`${item.chapter}.${item.verse} English still has archaic or OCR wording: ${item.en.slice(0, 80)}`);
  }
  if (/\b(did not comment|Sivananda)\b/i.test(item.en)) {
    fail(`${item.chapter}.${item.verse} English is a placeholder, not a meaning`);
  }
  if (String(item.hi).trim().length < 40) fail(`${item.chapter}.${item.verse} Hindi is truncated`);
  if (String(item.ta).trim().length < 40) fail(`${item.chapter}.${item.verse} Tamil is truncated`);
  const ta = String(item.ta).trim();
  if (/[,،]$/.test(ta)) fail(`${item.chapter}.${item.verse} Tamil is cut off at a comma`);
  if (/—$/.test(ta)) fail(`${item.chapter}.${item.verse} Tamil is cut off at a dash`);
  if (/\b(eyrow|tranil|iescence|estion)\b/i.test(item.en) || /supreme gaol/i.test(item.en)) {
    fail(`${item.chapter}.${item.verse} English still has OCR damage`);
  }
}

const famous = {
  "2.47": {
    sa: ["कर्मण्येवाधिकारस्ते", "मा फलेषु"],
    en: ["action alone", "fruits", "inaction"],
    ta: ["செயலில்", "பயன"],
    hi: ["कर्म", "फल"],
  },
  "2.13": {
    sa: ["देहिनोऽस्मिन्यथा देहे"],
    en: ["childhood", "another body"],
    ta: ["உடல"],
    hi: ["देह"],
  },
  "2.20": {
    sa: ["न जायते म्रियते"],
    en: ["never born", "never dies"],
    ta: ["பிறப்பதில்லை", "இறப்பதில்லை"],
    hi: ["जन्म", "मरता"],
  },
  "2.22": {
    sa: ["वासांसि जीर्णानि"],
    en: ["worn", "new"],
    ta: ["ஆடை"],
    hi: ["वस्त्र"],
  },
  "4.7": {
    sa: ["यदा यदा हि धर्मस्य"],
    en: ["dharma declines", "manifest"],
    ta: ["தருமம்", "வெளிப்படுத்துகிறேன்"],
    hi: ["धर्म"],
  },
  "4.8": {
    sa: ["परित्राणाय साधूनां"],
    en: ["protection of the good", "age after age"],
    ta: ["யுகம் தோறும்"],
    hi: ["युग"],
  },
  "9.22": {
    sa: ["योगक्षेमं वहाम्यहम्"],
    en: ["lack", "protect"],
    ta: ["யோகக்ஷேம"],
    hi: ["योगक्षेम"],
  },
  "9.26": {
    sa: ["पत्रं पुष्पं फलं तोयं"],
    en: ["leaf", "flower", "fruit"],
    ta: ["இலை", "பூ"],
    hi: ["पत्र", "पुष्प"],
  },
  "18.45": {
    sa: ["स्वे स्वे कर्मण्यभिरतः"],
    en: ["own duty", "perfection"],
    ta: ["சித்தி"],
    hi: ["स्वकर्म", "सिद्धि"],
  },
  "18.65": {
    sa: ["मन्मना भव मद्भक्तो"],
    en: ["devoted to Me", "dear to Me"],
    ta: ["பக்தனாக", "அன்புள்ளவன்"],
    hi: ["मद्भक्त", "प्रिय"],
  },
  "18.66": {
    sa: ["सर्वधर्मान्परित्यज्य", "मा शुचः"],
    en: ["Abandoning all dharmas", "refuge", "sins", "Do not grieve"],
    ta: ["தருமங்களையும்", "சரண்", "பாவங்களிலிருந்தும்", "வருந்தாதே"],
    hi: ["धर्मों", "शरण", "पापों", "शोक"],
  },
};

for (const [ref, langs] of Object.entries(famous)) {
  const [ch, vs] = ref.split(".").map(Number);
  const item = verse(ch, vs);
  if (!item) {
    fail(`${ref} missing`);
    continue;
  }
  for (const [lang, needles] of Object.entries(langs)) {
    const text = String(item[lang] || "");
    for (const needle of needles) {
      if (!text.includes(needle)) fail(`${ref} ${lang} missing “${needle}”`);
    }
  }
}

if (famous["18.66"] && verse(18, 66).en.includes("lesser")) {
  fail("18.66 must not soften ‘all dharmas’ into ‘lesser dharmas’");
}

const ta18_62 = verse(18, 62).ta;
if (ta18_62.includes("பாவத்திலும்")) fail("18.62 Tamil must not read ‘all sins’ for sarva-bhāvena");
if (!ta18_62.includes("உள்ளத்து")) fail("18.62 Tamil must keep ‘with all your being’");
for (const [ch, vs] of [[4, 10], [13, 19], [14, 19]]) {
  const ta = verse(ch, vs).ta;
  if (ta.includes("என் பாவத்தை")) fail(`${ch}.${vs} Tamil must not use ‘sin’ for the Lord’s being`);
  if (!ta.includes("தன்மையை")) fail(`${ch}.${vs} Tamil must keep ‘My being’`);
}
if (verse(18, 21).ta.includes("பாவத்தை")) fail("18.21 Tamil must not read nānā-bhāvān as sins");

const extra = ["te", "kn", "ml", "bn", "mr", "gu"];
for (const lang of extra) {
  const filled = verses.filter((item) => String(item[lang] || "").trim()).length;
  if (filled === 0) continue;
  if (filled !== 701) fail(`${lang} is incomplete (${filled}/701) — do not ship a partial language`);
  const [start, end] = ranges[lang];
  for (const item of verses) {
    const text = String(item[lang] || "").trim();
    if (text === String(item.en).trim()) fail(`${item.chapter}.${item.verse} ${lang} is still English`);
    if (!hasScript(text, start, end)) fail(`${item.chapter}.${item.verse} ${lang} is not in native script`);
  }
}

if (!data.includes("READING_LANGUAGES")) fail("data.ts must expose READING_LANGUAGES so incomplete langs cannot be selected");
if (!brand.includes('id: "ta"')) fail("brand must keep Tamil in the language list");
const ui = readFileSync(join(root, "src/ui.tsx"), "utf8");
const screens = readFileSync(join(root, "src/screens.tsx"), "utf8");
if (!ui.includes("READING_LANGUAGES")) fail("reader language picker must use READING_LANGUAGES");
if (!screens.includes("READING_LANGUAGES")) fail("settings language picker must use READING_LANGUAGES");
if (screens.includes("dailyVerse.sa.split")) fail("daily card must show the full Sanskrit verse, not only the first line");

if (!process.exitCode) {
  console.log("OK meanings: 701 verses, core languages complete, famous verses keep traditional sense");
}

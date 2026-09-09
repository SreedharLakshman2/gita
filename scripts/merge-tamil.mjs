import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const versesPath = join(root, "src", "verses.json");
const verses = JSON.parse(readFileSync(versesPath, "utf8"));
const dir = join(root, "scripts");
const files = readdirSync(dir).filter((name) => /^tamil-.*\.json$/.test(name));

const map = {};
for (const file of files) {
  Object.assign(map, JSON.parse(readFileSync(join(dir, file), "utf8")));
}

let filled = 0;
let kept = 0;
for (const verse of verses) {
  const key = `${verse.chapter}.${verse.verse}`;
  const existing = String(verse.ta || "").trim();
  const next = String(map[key] || "").trim();
  if (existing) {
    kept += 1;
    continue;
  }
  if (next) {
    verse.ta = next;
    filled += 1;
  }
}

writeFileSync(versesPath, `${JSON.stringify(verses)}\n`);
const still = verses.filter((v) => !String(v.ta || "").trim()).length;
console.log(`Tamil merge: filled ${filled}, kept ${kept}, still empty ${still}, files ${files.length}`);

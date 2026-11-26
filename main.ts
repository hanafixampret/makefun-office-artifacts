import { mkdirSync, writeFileSync } from "node:fs";

// One-line museum placard: an ordinary office stapler, catalogued as an
// ancient artifact. Dry curator's voice; catalogue date, material and donor
// do the selling, the last clause does the undercutting.
const entry =
  "Stapler, c. 1997, pressed steel. Ritual binding implement of the Filing Cult; donor swears it once held the quarterly report together. It did not.";

// Gate: UTF-8 text of 1 to 180 characters, not only white space, one line.
if (entry.length < 1 || entry.length > 180) {
  throw new Error(`entry is ${entry.length} characters, gate allows 1-180`);
}
if (entry.includes("\n") || entry.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}
const byteLength = Buffer.byteLength(entry, "utf8");
if (byteLength > 180) {
  throw new Error(`entry is ${byteLength} bytes, gate allows at most 180`);
}
if (!/c\. \d{4}/.test(entry) || !/pressed steel/.test(entry)) {
  throw new Error("placard must carry catalogue date and material");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(`wrote /output/entry.txt (${entry.length} chars, 1 line)`);

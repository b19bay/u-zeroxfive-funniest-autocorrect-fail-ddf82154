import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my date I'd bring dessert, but autocorrect told him I'd bring despair.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LINE.length < 1 || LINE.length > 199) {
  console.error(`entry must be 1-199 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("entry must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes < 1 || bytes > 199) {
  console.error(`entry must be 1-199 bytes, got ${bytes}`);
  process.exit(1);
}
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const readBack = readFileSync(target, "utf8");
if (readBack !== LINE) {
  console.error("read-back mismatch");
  process.exit(1);
}

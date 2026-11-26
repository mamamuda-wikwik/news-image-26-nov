// main.ts — "26 November 2026 in one image" (make.fun news-image-20261126)
//
// Writes the newspaper front page (entry.png, 1024x1024) to the output
// directory. No network access, fully deterministic: every run writes the
// exact same bytes, because it copies the image the repository holds.
//
// Usage:
//   node main.ts                        -> writes to /output
//   node main.ts <dir>                  -> writes to <dir>
//   MAKEFUN_OUTPUT_DIR=<dir> node main.ts -> writes to <dir>
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.argv[2] || "/output";

mkdirSync(outDir, { recursive: true });

const bytes = readFileSync(source);

// Validate the PNG structure before copying: signature, IHDR dimensions,
// and a full chunk walk that must end with IEND.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png: bad PNG signature");
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png: expected 1024x1024, got ${width}x${height}`);
}
if (bytes.length > 1024 * 1024) {
  throw new Error(`entry.png: over 1 MiB (${bytes.length} bytes)`);
}
const chunks = [];
let offset = 8;
let sawIEND = false;
while (offset + 8 <= bytes.length) {
  const length = bytes.readUInt32BE(offset);
  const type = bytes.toString("latin1", offset + 4, offset + 8);
  chunks.push(type);
  offset += 12 + length;
  if (type === "IEND") {
    sawIEND = true;
    break;
  }
}
if (!sawIEND || offset !== bytes.length) {
  throw new Error("entry.png: chunk walk did not end cleanly at IEND");
}

const digest = createHash("sha256").update(bytes).digest("hex");
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);

const report = `entry.png OK, size: ${bytes.length} bytes, dimensions: ${width}x${height}, chunks: ${chunks.join(", ")}, sha256: ${digest}`;
writeFileSync(join(outDir, "report.txt"), report + "\n");
console.log(report);

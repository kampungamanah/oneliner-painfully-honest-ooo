import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a single-sentence auto-reply that is honest about the
// state of the inbox instead of pretending everything is under control.
// 183 characters, so it sits comfortably inside the 200-character gate,
// and it closes with thanks so the bluntness still reads as polite.
// The file is written with no trailing newline: every byte is counted.
const line =
  "I'm out of office until Monday, and honestly your email will join 312 unread messages I'll skim while sighing, then answer in whatever order I feel like — thank you for your patience.";

function writeTo(dir: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/entry.txt`, text);
}

function save(text: string): void {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output"];
  for (const dir of candidates) {
    if (typeof dir !== "string" || dir.length === 0) {
      continue;
    }
    try {
      writeTo(dir, text);
    } catch {
      // This destination is unavailable; fall through to the next one.
    }
  }
}

save(line);

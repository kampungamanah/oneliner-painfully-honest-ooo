import { mkdirSync, writeFileSync } from "node:fs";

// A painfully honest out-of-office auto-reply: one sentence, 183 chars.
// It tells the truth about the inbox backlog and still ends politely,
// so a manager could let it stand. Writes the line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). No trailing newline: the gate
// counts every character (1 to 200).
const line = "I'm out of office until Monday, and honestly your email will join 312 unread messages I'll skim while sighing, then answer in whatever order I feel like — thank you for your patience.";
for (const dir of [process.env.MAKEFUN_OUTPUT_DIR, "/output"]) {
  if (!dir) continue;
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(dir + "/entry.txt", line);
  } catch {}
}

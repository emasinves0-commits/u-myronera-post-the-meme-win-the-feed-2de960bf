// Entry for the "Post the Meme, Win the Feed" bounty (Node 22, stdlib only).
// The entry is the X post itself; this program only hands POST.json (the post's URL)
// from the repo root to the output directory where the gate reads it.
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot', 'POST.json');
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const dest = resolve(outDir, 'POST.json');

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(src, dest);
  console.log(`copied ${src} -> ${dest}`);
} catch (e) {
  console.error(`cannot copy ${src}: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}

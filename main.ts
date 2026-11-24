// Entry for the "Post the Meme, Win the Feed" bounty (Node 22, stdlib only).
// The entry is the X post itself; this program only hands POST.json (the post's URL)
// from the repo root to the output directory where the gate reads it.
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve(process.env.MAKEFUN_BOT_DIR ?? '/bot', 'POST.json');
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
const dest = resolve(outDir, 'POST.json');

// Validate POST.json before copying: must be valid JSON with a url starting with https://x.com/
try {
  const post = JSON.parse(readFileSync(src, 'utf8'));
  if (typeof post?.url !== 'string' || !post.url.startsWith('https://x.com/')) {
    console.error(`invalid POST.json: "url" must be a string starting with "https://x.com/" (got ${JSON.stringify(post?.url)})`);
    process.exit(1);
  }
} catch (e) {
  console.error(`invalid POST.json at ${src}: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}

// Output contract: the gate reads /output/POST.json (MAKEFUN_OUTPUT_DIR outside the grader),
// so the validated POST.json must land there byte-for-byte.
function copyPost(): void {
  mkdirSync(outDir, { recursive: true });
  try {
    copyFileSync(src, dest);
    console.log(`copied ${src} -> ${dest}`);
  } catch (e) {
    console.error(`cannot copy ${src}: ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  }
}

copyPost();

// Stages the deployable site into dist/.
//
// Cloudflare Pages uploads the ENTIRE build output directory and has no
// ignore file (.assetsignore is a Workers Static Assets feature only, and
// is explicitly NOT supported by Pages). So the only way to keep repo files
// off the public site is to copy just the site into dist/ and point Pages
// at that.
//
// Functions are excluded on purpose: Pages reads functions/ from the repo
// root, not from the build output directory.
import { cpSync, rmSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, sep } from 'path';

const OUT = 'dist';

// Whole directories that are never part of the published site.
const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', '.github', '.claude', '.kilo', '.kiro', '.vscode',
  '.wrangler', '.firebase', 'functions', OUT, 'template-info',
]);

// Individual files that must not be published. Dotfiles are covered
// separately below, so only non-dot names belong here.
const EXCLUDE_FILES = new Set([
  'package.json', 'package-lock.json', 'webcopy-origin.txt',
  'firebase.json', 'firestore.indexes.json', 'firestore.rules',
  'wrangler.toml', 'build.mjs',
]);

// Extensions that are repo-only (docs and backups).
const EXCLUDE_EXT = ['.md', '.backup', '.log'];

const shouldSkip = relPath => {
  const parts = relPath.split(sep);
  if (parts.some(p => EXCLUDE_DIRS.has(p))) return true;
  const base = parts[parts.length - 1];
  if (EXCLUDE_FILES.has(base)) return true;
  if (base.startsWith('.env.')) return true;
  if (base.startsWith('.')) return true; // dotfiles: .DS_Store, .gitignore, etc.
  return EXCLUDE_EXT.some(ext => base.endsWith(ext));
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Copy top-level entries one at a time; cpSync refuses to copy a directory
// into its own subdirectory, and this keeps dist/ itself out of the walk.
for (const entry of readdirSync('.')) {
  if (shouldSkip(entry)) continue;
  cpSync(entry, join(OUT, entry), {
    recursive: true,
    filter: src => !shouldSkip(src),
  });
}

if (!existsSync(join(OUT, 'index.html'))) {
  throw new Error('build failed: dist/index.html missing');
}
console.log(`build: staged site into ${OUT}/`);

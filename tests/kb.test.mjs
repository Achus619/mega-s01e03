import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { deskRef } from '../support-kb/src/lib/kb/desk-ref.ts';

const root = new URL('../support-kb/', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

test('new pages have required metadata, explicit authorship and render stamps', () => {
  for (const page of ['incidents/4471-review', 'decisions/0002-dedupe-by-cause']) {
    const body = read(`src/routes/kb/${page}/+page.svx`);
    const frontmatter = body.split('---')[1];
    for (const key of ['title', 'owner', 'status', 'reviewed', 'signature']) {
      assert.match(frontmatter, new RegExp(`^${key}: .+`, 'm'));
    }
    assert.match(body, /<RenderStamp \{signature\} \/>/);
    assert.match(frontmatter, /Achus619 \/ OpenCode \/ S01E03/);
  }
  assert.match(deskRef('Achus619 / OpenCode / S01E03'), /^DR-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
});

test('every KB import resolves inside the supplied export', () => {
  for (const path of readdirSync(root, { recursive: true }).filter((p) => /\.(svx|svelte|ts)$/.test(p))) {
    for (const [, imported] of read(path).matchAll(/from ['"]#lib\/([^'"]+)['"]/g)) {
      assert.ok([imported, `${imported}.ts`].some((p) => existsSync(new URL(`src/lib/${p}`, root))), `${path}: ${imported}`);
    }
  }
});

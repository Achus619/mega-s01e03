import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { deskRef } from '../support-kb/src/lib/kb/desk-ref.ts';
import { groups } from '../scripts/analyze.mjs';

const root = new URL('../rendered/', import.meta.url);
const review = new URL('kb/incidents/4471-review/index.html', root);
const html = readFileSync(review, 'utf8');

test('desk-facing HTML contains the actual computed results, styles and chart', () => {
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<title>#4471 review/);
  assert.match(html, /<style/);
  assert.match(html, /<svg/);
  assert.match(html, /<rect/);
  assert.ok(html.includes(deskRef('Achus619 / OpenCode / S01E03')));
  for (const g of groups) {
    assert.ok(html.includes(`>${g.reports.length}</td>`));
  }
  assert.match(html, /412/);
  assert.ok(!html.includes('NaN'));
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('no desk ref:'));
  assert.ok(html.includes('https://github.com/Achus619/mega-s01e03/issues/1'));
  assert.ok(html.includes('https://github.com/Achus619/mega-s01e03/issues/2'));
});

test('every internal snapshot link resolves to an included HTML file', () => {
  for (const name of readdirSync(root, { recursive: true }).filter((p) => p.endsWith('.html'))) {
    const url = new URL(name, root);
    const content = readFileSync(url, 'utf8');
    for (const [, href] of content.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('https:') || href.startsWith('#')) continue;
      assert.ok(existsSync(new URL(href, url)), `${name}: ${href}`);
    }
  }
});

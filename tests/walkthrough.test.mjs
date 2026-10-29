import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groups, raw, reports } from '../scripts/analyze.mjs';

const html = readFileSync(new URL('../rendered/walkthrough/index.html', import.meta.url), 'utf8');
const text = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

test('visual walkthrough has its own title, chapters and working section links', () => {
  assert.match(html, /<title>What we actually did/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'HTML ids are unique');
  for (const id of ['assignment', 'scenario', 'evidence', 'ownership', 'components', 'format', 'rendering', 'changes', 'timeline', 'verification', 'files']) {
    assert.ok(ids.includes(id), `chapter ${id} exists`);
    assert.ok(html.includes(`href="#${id}"`), `chapter ${id} has navigation`);
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `anchor ${id} resolves`);
});

test('walkthrough renders the real export counts, original chart and example disclosures', () => {
  assert.ok(text.includes(String(raw.length)));
  assert.ok(text.includes(String(raw.length - reports.length)));
  assert.ok(text.includes(String(reports.length)));
  for (const group of groups) {
    assert.ok(text.includes(String(group.reports.length)));
    assert.ok(html.includes(`>${group.reports.length}</td>`), 'original CauseTable is rendered');
  }
  assert.match(html, /<svg/);
  assert.match(html, /<rect/);
  assert.ok((html.match(/<details\b/g) ?? []).length >= 10);
  assert.match(text, /Same cause: a merge candidate/);
  assert.match(text, /Different causes: keep the reports apart/);
  assert.match(text, /No known cause: investigate before merging/);
});

test('downloaded walkthrough requires no scripts, external assets, server or course proof', () => {
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /<style/);
  assert.ok(!/<script\b/i.test(html));
  assert.ok(!/\bsrc\s*=\s*["']/i.test(html));
  assert.ok(!/<link\b[^>]+rel=["']stylesheet/i.test(html));
  assert.ok(!/url\(\s*["']?https?:/i.test(html));
  assert.ok(!html.includes('v1.eyJ'), 'course-issued proof is not embedded');
  assert.ok(!html.includes('NaN'));
  assert.match(text, /without visual browser review|visually inspect the HTML/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { causeOf, dayFirst, sameCause, uniqueById } from '../support-kb/src/lib/kb/causes.ts';
import { raw, reports, groups, notes, tenantOf, summary } from '../scripts/analyze.mjs';

test('overlapping export pages count one report per id', () => {
  assert.equal(raw.length, 427);
  assert.equal(reports.length, 412);
  assert.equal(uniqueById(reports).length, 412);
  for (const r of raw) assert.deepEqual(r, reports.find((u) => u.id === r.id));
});

test('tenant locale and form classify every merged report', () => {
  assert.deepEqual(Object.fromEntries(groups.map((g) => [g.cause, g.reports.length])), { parser: 379, hint: 33 });
  assert.equal(groups.reduce((n, g) => n + g.reports.length, 0), reports.length);
  assert.ok(reports.every((r) => tenantOf(r) && dayFirst(tenantOf(r).locale)));
});

test('same subject and tenant do not imply same cause', () => {
  const form = { tenant: 'alder.physio', channel: 'form' };
  const app = { tenant: 'alder.physio', channel: 'app' };
  assert.equal(causeOf(form, tenantOf(form)), 'hint');
  assert.equal(causeOf(app, tenantOf(app)), 'parser');
  assert.equal(sameCause(form, tenantOf(form), app, tenantOf(app)), false);
});

test('unknown tenants stay unplaced; browser locale is not the tenant locale', () => {
  assert.equal(causeOf({ channel: 'email' }, undefined), null);
  assert.equal(sameCause({ channel: 'email' }, undefined, { channel: 'email' }, undefined), false);
  const r = { tenant: 'alder.physio', channel: 'form', meta: { browserLocale: 'en-US', intakeTag: 'parser' } };
  assert.equal(causeOf(r, tenantOf(r)), 'hint');
});

test('one-day observations remain visible inside their assigned group', () => {
  assert.equal(notes.oneDayMove.length, 5);
  assert.equal(summary.groups.find((g) => g.cause === 'parser').oneDayNotes, 5);
  assert.ok(notes.oneDayMove.every((id) => reports.some((r) => r.id === id)));
});

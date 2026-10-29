import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { causeOf, groupByCause, uniqueById, readAs } from '../support-kb/src/lib/kb/causes.ts';

const data = new URL('../support-kb/src/lib/data/', import.meta.url);
const read = (path) => JSON.parse(readFileSync(new URL(path, data), 'utf8'));
export const raw = read('reports-4471.json');
export const notes = read('desk-notes.json');
export const reports = uniqueById(raw).filter((r) => r.mergedInto === 4471);
const tenants = new Map();
for (const r of reports) {
  if (!tenants.has(r.tenant)) tenants.set(r.tenant, read(`tenants/${r.tenant}.json`));
}
export const tenantOf = (r) => tenants.get(r.tenant);
export const groups = groupByCause(reports, tenantOf);
export const summary = {
  rawRows: raw.length,
  uniqueReports: reports.length,
  duplicateRows: raw.length - uniqueById(raw).length,
  groups: groups.map((g) => ({
    cause: g.cause,
    count: g.reports.length,
    tenants: g.tenants,
    firstSeen: g.firstSeen,
    lastSeen: g.lastSeen,
    intakeTags: g.taggedAs,
    intakeDisagreements: g.reports.filter((r) => r.meta.intakeTag !== causeOf(r, tenantOf(r))).length,
    oneDayNotes: readAs(g, notes.oneDayMove),
    reportIds: g.reports.map((r) => r.id),
  })),
  monthly: [...new Set(reports.map((r) => r.receivedAt.slice(0, 7)))].sort().map((month) => ({
    month,
    received: reports.filter((r) => r.receivedAt.startsWith(month)).length,
    merged: reports.filter((r) => r.mergedAt?.startsWith(month)).length,
  })),
};

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(JSON.stringify(summary, null, 2));

<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import { uniqueById, groupByCause, causeOf, sameCause, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { DEDUPE_CASES } from '#lib/kb/dedupe-cases';

  let { view }: { view: 'counts' | 'cases' } = $props();
  const unique = uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(unique, tenantOf);
</script>

{#if view === 'counts'}
  <div class="count-path" aria-label="427 export rows, minus 15 repeated IDs, gives 412 distinct reports">
    <div><strong>{reports.length}</strong><span>export rows</span></div>
    <span class="operator" aria-hidden="true">−</span>
    <div><strong>{reports.length - unique.length}</strong><span>overlap rows</span></div>
    <span class="operator" aria-hidden="true">=</span>
    <div class="total"><strong>{unique.length}</strong><span>distinct reports</span></div>
  </div>
  <div class="split" role="img" aria-label={groups.map((g) => `${g.cause}: ${g.reports.length} reports`).join('; ')}>
    {#each groups as group}
      <div class:hint={group.cause === 'hint'} style:width={`${100 * group.reports.length / unique.length}%`}></div>
    {/each}
  </div>
  <div class="split-labels">
    {#each groups as group}
      <p><span class="dot" class:hint={group.cause === 'hint'}></span><strong>{group.reports.length}</strong> {group.cause} <small>({(100 * group.reports.length / unique.length).toFixed(1)}%)</small></p>
    {/each}
  </div>
  <p class="caption">This split bar is new for this walkthrough. Its values come from the unchanged classifier and export, just like the original evidence table.</p>
{:else}
  <div class="case-list">
    {#each DEDUPE_CASES as example}
      {@const a = causeOf(example.a, tenantOf(example.a))}
      {@const b = causeOf(example.b, tenantOf(example.b))}
      {@const same = sameCause(example.a, tenantOf(example.a), example.b, tenantOf(example.b))}
      <details>
        <summary>{example.why}</summary>
        <div class="case-sides">
          {#each [example.a, example.b] as side, i}
            <div>
              <small>REPORT {i === 0 ? 'A' : 'B'}</small>
              <p><code>{side.tenant}</code><br />{side.channel}<br />“{side.subject}”</p>
              <p>Assigned cause: <strong>{(i === 0 ? a : b) ?? 'unknown'}</strong></p>
            </div>
          {/each}
        </div>
        <p class="verdict">{same ? 'Same cause: a merge candidate.' : a === null || b === null ? 'No known cause: investigate before merging.' : 'Different causes: keep the reports apart.'}</p>
      </details>
    {/each}
  </div>
  <p class="caption">These cases come from the original <code>dedupe-cases.ts</code> and use the original classifier. Expanding a case works offline through native HTML; the answers were computed when this page was rendered.</p>
{/if}

<style>
  .count-path { display: flex; align-items: center; justify-content: space-between; gap: .7rem; padding: 1rem 0 1.4rem; }
  .count-path > div { display: grid; }
  .count-path strong { font-size: clamp(2rem, 5vw, 3.8rem); line-height: 1.1; letter-spacing: -.05em; }
  .count-path span { font-size: .8rem; color: var(--muted); }
  .count-path .operator { font-size: 1.5rem; }
  .total strong { color: var(--green); }
  .split { display: flex; width: 100%; height: 24px; border-radius: 6px; overflow: hidden; background: var(--line); }
  .split > div { background: var(--green); }
  .split > div.hint { background: var(--orange); }
  .split-labels { display: flex; justify-content: space-between; gap: 1rem; }
  .split-labels p { font-size: .9rem; }
  .split-labels small { color: var(--muted); }
  .dot { display: inline-block; width: .65rem; height: .65rem; border-radius: 50%; background: var(--green); margin-right: .35rem; }
  .dot.hint { background: var(--orange); }
  .case-sides { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .case-sides > div { padding: 1rem; background: var(--paper); border-radius: 8px; }
  .case-sides small { font: .65rem var(--mono); letter-spacing: .08em; color: var(--muted); }
  .case-sides p { font-size: .85rem; }
  .verdict { border-left: 3px solid var(--green); padding-left: .8rem; font-size: .9rem; }
  @media (max-width: 600px) {
    .case-sides { grid-template-columns: 1fr; }
    .count-path span { font-size: .66rem; }
    .split-labels { flex-direction: column; gap: 0; }
  }
</style>

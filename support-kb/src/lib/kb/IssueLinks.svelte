<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const tickets = {
    parser: { number: 1, title: 'Shared parser assumes month-first dates' },
    hint: { number: 2, title: 'Booking-v3 date hint conflicts with tenant format' },
  };
  const groups = $derived(groupByCause(uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471), tenantOf));
</script>

<table>
  <thead><tr><th>problem</th><th>reports</th><th>tracking issue</th></tr></thead>
  <tbody>
    {#each groups as group (group.cause)}
      <tr>
        <td>{group.cause}</td>
        <td>{group.reports.length}</td>
        <td>
          {#if group.cause !== 'unplaced'}
            <a href={`https://github.com/Achus619/mega-s01e03/issues/${tickets[group.cause].number}`}>{tickets[group.cause].title}</a>
          {:else}
            Needs investigation; do not merge automatically.
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

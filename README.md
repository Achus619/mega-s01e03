# S01E03 · what it shows

Review of the supplied support KB export and source ticket #4471 for the MEGA.dev course.

## Visual walkthrough of our work

[Download the self-contained visual report](https://github.com/Achus619/mega-s01e03/raw/refs/heads/main/rendered/walkthrough/index.html)
and open the downloaded HTML file in your browser. This is the explanation written for
Achus619 about what we did, why, and how the components work, separate from the fictional
support-desk review. It includes diagrams, actual computed components, expandable examples,
and links to the source. No server or installation is needed to read it.

Source: [walkthrough `.svx`](support-kb/src/routes/walkthrough/+page.svx).

## Findings

| Cause | Distinct reports | Tracking |
| --- | ---: | --- |
| Shared parser assumes month-first input | 379 | [Issue #1](https://github.com/Achus619/mega-s01e03/issues/1) |
| Booking-v3 hint conflicts with tenant date format | 33 | [Issue #2](https://github.com/Achus619/mega-s01e03/issues/2) |

## Later engineering outcome

The student supplied the course page's engineering update: #4471 closed on 5 October 2026.
The parser was fixed (`fix(dates): parse dd/mm for eu locales`); the hint was marked
**won't fix because booking-v3 was retired**. Accordingly, issue #1 is closed as completed,
and issue #2 as not planned. The signed review and rendered page record both outcomes.
This is course-reported engineering evidence, not independent product verification.

These are snapshot counts from the export dated 2026-10-04. The 427 rows contain 412 unique
report IDs. Assignment uses the export's executable classifier, tenant locale/form and channel,
not browser locale, subject or intake tag. Five unusual observations remain in the parser
group with explicit follow-up; neither the reports nor the model prove a third cause.

## KB changes

- [Signed review](support-kb/src/routes/kb/incidents/4471-review/+page.svx), with computed counts and issue links.
- [Corrected incident page](support-kb/src/routes/kb/incidents/4471/+page.svx).
- [Revised triage guidance](support-kb/src/routes/kb/triage/dedupe/+page.svx).
- [Decision 0002](support-kb/src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx) supersedes subject-only merging without altering accepted decision 0001.

The original data and classifier remain unchanged. Edits are local to this exported KB;
publishing this repository does not update the live support desk. The review credits OpenCode
working for Achus619; its signature is the course-issued page proof, not a claim of independent
live product verification.

## Reproduce the analysis

Requires Node 22.19 or newer. No packages need to be installed.

```sh
npm test
npm run analyze
```

The analysis imports the actual exported TypeScript classifier and prints group counts,
complete report ID lists, intake disagreements, date ranges and monthly received/merged totals.
The tests cover export overlap, group totals, channel differences, missing tenants and preserved
one-day observations.

## Rendered page

The desk-facing deliverable is [rendered/kb/incidents/4471-review/index.html](rendered/kb/incidents/4471-review/index.html).
Download the repository and open that file in a browser. It contains the real Svelte/mdsvex
server-rendered page, including inline component CSS, computed report tables, queue chart and
signature-derived desk reference. It needs no server or external assets to display.

The other KB pages are included as linked static snapshots. Their interactive controls are
not hydrated; the review page itself contains only static tables, links and a chart. The HTML
was checked programmatically, not visually in an automated browser.

To regenerate the HTML from the actual `.svx` and `.svelte` sources:

```sh
npm ci
npm run render
npm test
```

Vite resolves the original `#lib` imports and tenant `import.meta.glob` calls; mdsvex applies
the existing runbook layout. No Markdown-only reconstruction or hand-written count replaces
the components. Regeneration refreshes the review-age labels using the current date.

Rendering dependencies are local development tools. At installation, `npm audit` reported
three low-severity findings involving `deepmerge` and the Svelte Vite plugin dependency chain,
with no fix available. The render script does not listen on a network port; the final HTML
ships no JavaScript or dependency runtime.

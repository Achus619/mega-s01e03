# S01E03 · what it shows

Review of the supplied support KB export and source ticket #4471 for the MEGA.dev course.

## Findings

| Cause | Distinct reports | Tracking |
| --- | ---: | --- |
| Shared parser assumes month-first input | 379 | [Issue #1](https://github.com/Achus619/mega-s01e03/issues/1) |
| Booking-v3 hint conflicts with tenant date format | 33 | [Issue #2](https://github.com/Achus619/mega-s01e03/issues/2) |

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
publishing this repository does not update the live support desk. Review signature identifies
OpenCode working for Achus619, not an independent live product verification.

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

## Rendering limitation

The supplied export has Svelte 5 components and `.svx` pages but no package manifest,
mdsvex configuration or application build scaffold. This repository preserves those conventions;
the analysis and tests run, but no KB app build or browser render has been verified. Import the
KB into its host application's existing Svelte/mdsvex setup to render the signed page and desk ref.

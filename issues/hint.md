## Engineering disposition · source ticket closed 5 October 2026

The course page reports **hint won't fix: booking-v3 form retired**.
Closed as not planned based on this engineering update, supplied by the student on 29 October.
The hint was not corrected; it must not be described as fixed. The historical report count
and original evidence are preserved. The parser issue has a separate fixed disposition.

## Historical problem and scope

**33 distinct reports** merged into source ticket #4471 belong to the `hint` group under the exported KB classifier. They span alder.physio (`de-DE`), copper.studio (`es-ES`) and pale.harbour (`pt-PT`), received from 2026-04-17 through 2026-09-22. All three use booking-v3. These counts describe the 4 October export, not the current live desk.

Booking-v3 shows `MM/DD/YYYY` beneath its date field, but its form reads input using the tenant's day-first format. A person following the hint enters a month-first date that the form interprets as day-first. This is distinct from the shared parser problem tracked in #1: it needs a separate form-hint fix.

## Evidence

- `support-kb/src/lib/kb/causes.ts`: `DATE_HINT['booking-v3']` and `causeOf` assign day-first booking-v3 form reports to `hint`.
- `support-kb/src/lib/data/tenants/` supplies actual tenant locale and form, independent of reporter browser locale.
- Example report IDs: R-41230, R-41241 and R-41251. Use `npm run analyze` for all group members.
- Intake tagged 15 of these reports as `parser`; intake guesses are not reliable cause assignments.
- Same subject and tenant can cover both causes when the entry path differs. The exported dedupe example compares alder.physio form (`hint`) with alder.physio app (`parser`).

## Reproduction to verify in the product

1. Open booking-v3 for a day-first tenant such as alder.physio.
2. Follow the displayed `MM/DD/YYYY` hint to enter 7 April as `04/07/2026`.
3. Inspect the form result.
4. Expected: 7 April, consistent with the displayed hint. The exported model says the day-first form reads this as 4 July.

This reproduction follows the exported model. No running product or form implementation was supplied or tested.

## Acceptance criteria

- Make the displayed format and example match the form's actual tenant-aware parsing.
- Verify booking-v3 for all three affected tenants, including ambiguous dates and invalid input.
- Verify the selected date, stored value and resulting invite agree.
- Preserve booking-v2 behavior and test booking-v3 app/email paths separately: those remain assigned to the parser issue.
- Do not close this issue merely because the shared parser was fixed.

## Counting and KB

Run `npm test` and `npm run analyze` with Node 22.19 or newer; no dependency installation is required. Deduplicate the 427 export rows by report ID before counting: 412 unique reports split into parser 379 and hint 33.

Review: [signed KB page](https://github.com/Achus619/mega-s01e03/blob/main/support-kb/src/routes/kb/incidents/4471-review/+page.svx).

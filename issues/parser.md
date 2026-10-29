## Problem and scope

**379 distinct reports** merged into source ticket #4471 belong to the `parser` group under the exported KB classifier. They span 11 tenants, received from 2026-04-01 through 2026-10-04. These counts describe the 4 October export, not the current live desk.

The shared parser reads numeric dates month first although the affected tenants write the day first. This affects app/email paths and booking-v2 forms; booking-v3 form-hint failures are tracked separately in #2. Changing the booking-v3 hint alone does not fix this parser path.

## Evidence

- `support-kb/src/lib/kb/causes.ts`: `causeOf`, `dayFirst`, `uniqueById` and `groupByCause`.
- Tenant configuration: `support-kb/src/lib/data/tenants/`.
- Source reports: `support-kb/src/lib/data/reports-4471.json`.
- R-41200, harbour.dental, app: 7 April reminder went out on 4 July.
- R-41203, lantern.row, app: 2 December became 12 February.
- Intake tagged 23 of this group's reports as `hint`; tenant configuration and channel, not browser locale or guessed intake tags, determine this grouping.

## Reproduction to verify in the product

1. Use a day-first tenant such as harbour.dental (`en-GB`, booking-v2).
2. Enter 7 April as `07/04/2026` through a path using the shared parser.
3. Inspect the stored booking date and generated invite/reminder.
4. Expected: 7 April. Reported failure: 4 July.

This reproduction follows the exported model and reports. No running product was supplied or tested.

## Exceptions requiring follow-up

Five reports remain in this group by the exported classifier but do not establish a month/day swap: R-41202, R-41209, R-41236, R-41344 and R-41620. Preserve their one-day, June-only, cross-city and chronology observations. Collect original input, stored dates, event and delivery timestamps, and timezone settings before claiming this fix resolves them. They are not sufficient evidence of a separately confirmed timezone bug.

## Acceptance criteria

- Respect the tenant's date format rather than assuming month-first input.
- Test ambiguous day/month pairs, unambiguous dates and invalid dates across affected channels and tenant locales; preserve correct month-first behavior where supported.
- Verify the stored booking, invite and reminder agree on the intended date.
- Revisit the five unusual reports with evidence before closing them as fixed.
- Keep #2 open until its separate hint failure is corrected.

## Counting and KB

Run `npm test` and `npm run analyze` with Node 22.19 or newer; no dependency installation is required. The export has 427 rows but 412 distinct IDs: parser 379, hint 33. The complete group ID lists are produced by the analysis script. Counts represent reports, not unique people or appointments.

Review: [signed KB page](https://github.com/Achus619/mega-s01e03/blob/main/support-kb/src/routes/kb/incidents/4471-review/+page.svx).

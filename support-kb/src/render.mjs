import { render } from 'svelte/server';
import Review from './routes/kb/incidents/4471-review/+page.svx';
import Incident from './routes/kb/incidents/4471/+page.svx';
import Triage from './routes/kb/triage/dedupe/+page.svx';
import Decision from './routes/kb/decisions/0002-dedupe-by-cause/+page.svx';
import PreviousDecision from './routes/kb/decisions/0001-dedupe-by-subject/+page.svx';
import Index from './routes/kb/+page.svx';
import Walkthrough from './routes/walkthrough/+page.svx';

export const pages = [
  ['/kb/incidents/4471-review', Review],
  ['/kb/incidents/4471', Incident],
  ['/kb/triage/dedupe', Triage],
  ['/kb/decisions/0002-dedupe-by-cause', Decision],
  ['/kb/decisions/0001-dedupe-by-subject', PreviousDecision],
  ['/kb', Index],
  ['/walkthrough', Walkthrough],
].map(([route, component]) => {
  const { head, body } = render(component);
  return { route, head, body };
});

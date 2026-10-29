<script lang="ts">
  import type { Snippet } from 'svelte';
  let { title, children }: { title: string; children: Snippet } = $props();
  const chapters = [
    ['assignment', 'The assignment'],
    ['scenario', 'The fictional setup'],
    ['evidence', 'Where the numbers came from'],
    ['ownership', 'What I reused and wrote'],
    ['components', 'Reading the components'],
    ['format', 'How the documentation works'],
    ['rendering', 'Source to browser'],
    ['changes', 'What changed in the repo'],
    ['timeline', 'How the session unfolded'],
    ['verification', 'What we verified'],
    ['files', 'Explore the actual files'],
  ];
</script>

<svelte:head>
  <title>{title} · MEGA S01E03</title>
  <meta name="description" content="A visual explanation of the MEGA S01E03 session: the assignment, code, components, rendering, and decisions." />
</svelte:head>

<div class="walkthrough">
  <a class="skip" href="#main">Skip to the walkthrough</a>
  <header class="topbar">
    <a class="wordmark" href="#top">FIELD NOTES <span> / MEGA S01E03</span></a>
    <a href="https://github.com/Achus619/mega-s01e03">Open repository ↗</a>
  </header>
  <div class="reading-layout">
    <aside class="contents" aria-label="Contents">
      <p class="eyebrow">Inside this report</p>
      <nav>
        {#each chapters as [id, label], i}
          <a href={`#${id}`}><span>{String(i + 1).padStart(2, '0')}</span>{label}</a>
        {/each}
      </nav>
      <p class="contents-note">Written for Achus619.<br />A walkthrough of our work, separate from the fictional incident review.</p>
    </aside>
    <main id="main">{@render children()}</main>
  </div>
  <footer class="site-footer">OpenCode for Achus619 · 29 October 2026 · Self-contained HTML; no installation, tracking, or external assets.</footer>
</div>

<style>
  :global(html) { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }
  :global(body) { margin: 0; background: #f4f2ec; color: #242a27; font: 17px/1.7 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  :global(*) { box-sizing: border-box; }
  :global(.walkthrough) {
    --ink: #242a27; --muted: #58635c; --paper: #f4f2ec; --panel: #fffefa;
    --line: #d9ddd3; --green: #235e4b; --green-bg: #e4eee6; --orange: #a64b21;
    --orange-bg: #fff0e3; --blue: #325b84; --blue-bg: #e8eff6;
    --accent: #235e4b; --warn: #a64b21; --warn-bg: #fff0e3; --note-bg: #e4eee6;
    --mono: ui-monospace, SFMono-Regular, Consolas, monospace;
  }
  :global(.walkthrough a) { color: var(--green); text-underline-offset: .22em; overflow-wrap: anywhere; }
  :global(.walkthrough a:hover) { text-decoration-thickness: 2px; }
  :global(.walkthrough a:focus-visible), :global(.walkthrough summary:focus-visible) { outline: 3px solid #a64b21; outline-offset: 5px; border-radius: 3px; }
  .topbar { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.1rem 3vw; background: #f4f2ecf5; border-bottom: 1px solid var(--line); backdrop-filter: blur(12px); font-size: .8rem; }
  .wordmark { font-weight: 800; letter-spacing: .1em; text-decoration: none; }
  .wordmark span { font-weight: 400; color: var(--muted); }
  .reading-layout { display: grid; grid-template-columns: 230px minmax(0, 940px); gap: clamp(2rem, 5vw, 6rem); max-width: 1360px; margin: auto; padding: 3rem 3vw 5rem; }
  .contents { position: sticky; top: 6rem; align-self: start; max-height: calc(100vh - 7rem); overflow: auto; }
  .contents nav { display: grid; gap: .15rem; }
  .contents nav a { display: flex; align-items: baseline; gap: .7rem; padding: .45rem 0; color: var(--muted); text-decoration: none; font-size: .82rem; }
  .contents nav a:hover { color: var(--green); }
  .contents nav span { font: .7rem var(--mono); color: var(--green); }
  .contents-note { border-top: 1px solid var(--line); margin-top: 1.4rem; padding-top: 1rem; font-size: .75rem; color: var(--muted); }
  .skip { position: fixed; top: -100px; left: 1rem; padding: .5rem 1rem; background: white; z-index: 10; }
  .skip:focus { top: .5rem; }
  :global(.walkthrough main) { min-width: 0; }
  :global(.walkthrough .hero) { padding: 1rem 0 2.5rem; }
  :global(.walkthrough .eyebrow) { font: 700 .72rem/1.5 var(--mono); letter-spacing: .13em; text-transform: uppercase; color: var(--green); }
  :global(.walkthrough h1) { font-size: clamp(2.7rem, 5.7vw, 5.1rem); line-height: 1.04; letter-spacing: -.055em; font-weight: 750; margin: 1rem 0 1.5rem; max-width: 850px; text-wrap: balance; }
  :global(.walkthrough .lede) { font-size: 1.15rem; color: var(--muted); max-width: 730px; line-height: 1.65; }
  :global(.walkthrough .meta-line) { font: .73rem/1.6 var(--mono); color: var(--muted); margin-top: 1.8rem; }
  :global(.walkthrough section) { border-top: 1px solid var(--line); padding: 2.8rem 0 1.6rem; margin-top: 1rem; }
  :global(.walkthrough h2) { font-size: clamp(1.7rem, 3vw, 2.5rem); letter-spacing: -.035em; line-height: 1.18; margin: .5rem 0 1.3rem; text-wrap: balance; }
  :global(.walkthrough h3) { font-size: 1.15rem; line-height: 1.4; margin: 1.6rem 0 .6rem; letter-spacing: -.015em; }
  :global(.walkthrough p) { margin: .7rem 0 1rem; }
  :global(.walkthrough li) { margin: .35rem 0; }
  :global(.walkthrough code) { font: .83em/1.6 var(--mono); background: #e9eae2; border-radius: 4px; padding: .1em .3em; overflow-wrap: anywhere; }
  :global(.walkthrough pre) { background: #202c27; color: #edf2e9; padding: 1.3rem 1.5rem; border-radius: 12px; overflow-x: auto; line-height: 1.7; }
  :global(.walkthrough pre code) { background: none; color: inherit; padding: 0; overflow-wrap: normal; }
  :global(.walkthrough .grid-2) { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin: 1.3rem 0; }
  :global(.walkthrough .card) { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 1.4rem; }
  :global(.walkthrough .card h3) { margin-top: .1rem; }
  :global(.walkthrough .card p:last-child) { margin-bottom: 0; }
  :global(.walkthrough .card small), :global(.walkthrough .caption) { color: var(--muted); font-size: .82rem; line-height: 1.6; }
  :global(.walkthrough .callout) { background: var(--green-bg); border-left: 3px solid var(--green); padding: 1rem 1.3rem; margin: 1.5rem 0; border-radius: 0 10px 10px 0; }
  :global(.walkthrough .callout.warning) { background: var(--orange-bg); border-color: var(--orange); }
  :global(.walkthrough .tag) { display: inline-block; font: 600 .7rem/1.4 var(--mono); border-radius: 99px; background: var(--green-bg); color: var(--green); padding: .35rem .65rem; margin-bottom: .6rem; }
  :global(.walkthrough .tag.written) { background: var(--blue-bg); color: var(--blue); }
  :global(.walkthrough .tag.changed) { background: var(--orange-bg); color: var(--orange); }
  :global(.walkthrough .table-wrap) { overflow-x: auto; margin: 1rem 0; }
  :global(.walkthrough table) { width: 100%; border-collapse: collapse; font-size: .87rem; }
  :global(.walkthrough th), :global(.walkthrough td) { padding: .75rem .65rem; text-align: left; border-bottom: 1px solid var(--line); vertical-align: top; }
  :global(.walkthrough th) { font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
  :global(.walkthrough details) { border: 1px solid var(--line); border-radius: 10px; background: var(--panel); padding: .8rem 1rem; margin: .7rem 0; }
  :global(.walkthrough summary) { cursor: pointer; font-weight: 650; }
  :global(.walkthrough details > :last-child) { margin-bottom: .3rem; }
  :global(.walkthrough .flow) { display: flex; align-items: stretch; flex-wrap: wrap; gap: .6rem; margin: 1.5rem 0; }
  :global(.walkthrough .flow-node) { flex: 1 1 125px; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 1rem; font-size: .85rem; }
  :global(.walkthrough .flow-node strong) { display: block; margin-bottom: .3rem; }
  :global(.walkthrough .flow-arrow) { display: flex; align-items: center; color: var(--green); font-size: 1.4rem; }
  :global(.walkthrough .artifact) { padding: 1.4rem; border-radius: 14px; border: 1px solid var(--line); background: var(--panel); margin: 1.3rem 0; overflow-x: auto; }
  :global(.walkthrough .artifact-label) { font: .7rem var(--mono); text-transform: uppercase; letter-spacing: .08em; color: var(--green); margin-bottom: 1rem; }
  :global(.walkthrough .legend) { display: flex; flex-wrap: wrap; gap: 1rem; font-size: .8rem; margin: .8rem 0; }
  :global(.walkthrough .swatch) { display: inline-block; width: .7rem; height: .7rem; border-radius: 2px; margin-right: .35rem; }
  :global(.walkthrough .swatch.orange) { background: var(--orange); }
  :global(.walkthrough .swatch.green) { background: var(--green); }
  :global(.walkthrough .event-list) { list-style: none; border-left: 2px solid var(--line); padding: 0 0 0 1.6rem; margin-left: .3rem; }
  :global(.walkthrough .event-list li) { position: relative; margin: 0 0 1.7rem; }
  :global(.walkthrough .event-list li::before) { content: ''; position: absolute; left: -2.02rem; top: .5rem; width: .65rem; height: .65rem; border-radius: 50%; background: var(--green); border: 3px solid var(--paper); }
  :global(.walkthrough .event-list strong) { display: block; }
  :global(.walkthrough .source-list) { display: grid; gap: .8rem; }
  :global(.walkthrough .source-list a) { display: block; border: 1px solid var(--line); border-radius: 10px; padding: .85rem 1rem; background: var(--panel); text-decoration: none; font-weight: 600; }
  :global(.walkthrough .source-list small) { display: block; color: var(--muted); font-weight: 400; margin-top: .2rem; }
  .site-footer { border-top: 1px solid var(--line); padding: 1.5rem 3vw; font-size: .75rem; color: var(--muted); }
  @media (max-width: 1000px) {
    .reading-layout { grid-template-columns: 1fr; gap: 1rem; max-width: 850px; padding-inline: 5vw; }
    .contents { position: static; max-height: none; }
    .contents nav { display: flex; overflow-x: auto; gap: 1rem; padding-bottom: .7rem; }
    .contents nav a { flex: 0 0 auto; }
    .contents-note, .contents > .eyebrow { display: none; }
  }
  @media (max-width: 600px) {
    .topbar { padding: .9rem 5vw; }
    .wordmark span { display: none; }
    :global(.walkthrough .grid-2) { grid-template-columns: 1fr; }
    :global(.walkthrough .flow-arrow) { display: none; }
    :global(.walkthrough .artifact) { padding: 1rem; }
    :global(body) { font-size: 16px; }
  }
  @media (prefers-reduced-motion: reduce) { :global(html) { scroll-behavior: auto; } }
  @media print {
    .topbar, .contents, .skip { display: none; }
    .reading-layout { display: block; padding: 0; }
    :global(body) { background: white; font-size: 10pt; }
    :global(.walkthrough h1) { font-size: 32pt; }
    :global(.walkthrough section) { break-before: auto; }
    :global(.walkthrough .card), :global(.walkthrough .artifact) { break-inside: avoid; }
    :global(.walkthrough details) { display: block; }
  }
</style>

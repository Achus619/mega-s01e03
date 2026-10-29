import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const local = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  root: local('./support-kb/'),
  resolve: { alias: { '#lib': local('./support-kb/src/lib/') } },
  plugins: [svelte({
    extensions: ['.svelte', '.svx'],
    preprocess: [
      vitePreprocess(),
      mdsvex({
        extensions: ['.svx'],
        layout: {
          runbook: local('./support-kb/src/lib/layouts/runbook.svelte'),
          walkthrough: local('./support-kb/src/lib/layouts/walkthrough.svelte'),
        },
      }),
    ],
    compilerOptions: { css: 'injected' },
  })],
  server: { middlewareMode: true },
});

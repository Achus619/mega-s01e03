import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({ configFile: resolve(root, 'vite.config.mjs') });
try {
  const { pages } = await server.ssrLoadModule('/src/render.mjs');
  for (const { route, head, body } of pages) {
    const path = resolve(root, 'rendered', route.slice(1), 'index.html');
    // Keep internal links usable when the HTML archive is opened locally.
    const localLinks = (html) => html.replace(/href="(\/kb(?:\/[^"#?]*)?)"/g, (_, target) => {
      const from = route.slice(1).split('/').length;
      return `href="${'../'.repeat(from)}${target.slice(1)}/index.html"`;
    });
    const html = `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}</head><body>${localLinks(body)}</body></html>\n`;
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, html);
    console.log(`Rendered ${route} → ${path}`);
  }
} finally {
  await server.close();
}

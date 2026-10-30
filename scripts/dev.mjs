import http from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { build, projectRoot } from './build.mjs';

const root = process.env.HIT_DOCS_ROOT ? path.resolve(process.env.HIT_DOCS_ROOT) : projectRoot;
const out = path.join(root, 'dist');
const clients = new Set();
async function fingerprint(dir = root) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', '.preview'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(await fingerprint(file));
    else { const info = await stat(file); files.push(`${file}:${info.mtimeMs}:${info.size}`); }
  }
  return files.sort().join('|');
}
await build(root, out);
let previous = await fingerprint();
let checking = false;
setInterval(async () => {
  if (checking) return;
  checking = true;
  try {
    const current = await fingerprint();
    if (current !== previous) {
      await build(root, out);
      previous = current;
      for (const client of clients) client.write('data: updated\n\n');
      console.log('Updated content and preview.');
    }
  } catch (error) { console.error('Update failed:', error.message); }
  finally { checking = false; }
}, 700);

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.md': 'text/plain' };
const server = http.createServer(async (req, res) => {
  if (req.url === '/__events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(': connected\n\n'); clients.add(res);
    req.on('close', () => clients.delete(res)); return;
  }
  try {
    const url = new URL(req.url, 'http://localhost');
    const file = path.resolve(out, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(out + path.sep)) { res.writeHead(403).end(); return; }
    let body = await readFile(file);
    if (file === path.join(out, 'index.html')) body = Buffer.from(body.toString('utf8').replace('</head>', '<meta name="hit-preview" content="true"></head>'));
    res.writeHead(200, { 'Content-Type': `${types[path.extname(file)] || 'application/octet-stream'}; charset=utf-8`, 'Cache-Control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${server.address().port}`));

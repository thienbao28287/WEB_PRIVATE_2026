import { readFile, readdir, mkdir, cp, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { imageSize } from './image-metadata.mjs';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
marked.use({ renderer: { code({ text, lang }) {
  const language = (lang || '').split(/\s/)[0];
  const code = language && hljs.getLanguage(language) ? hljs.highlight(text, { language }).value : escape(text);
  return `<pre data-language="${escape(language || 'text')}"><code class="hljs">${code}</code></pre>`;
} } });

export async function collectContent(root) {
  const readme = await readFile(path.join(root, 'README.md'), 'utf8');
  const lessons = new Map();
  for (const line of readme.split(/\r?\n/)) {
    const match = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+)\|/);
    if (match) lessons.set(+match[1], { number: +match[1], title: match[2].trim(), pages: [] });
  }
  const dirs = (await readdir(root, { withFileTypes: true })).filter(d => d.isDirectory() && /^Lesson\d+$/.test(d.name));
  for (const dir of dirs) {
    const number = +dir.name.slice(6);
    const lesson = lessons.get(number) || { number, title: `Buổi ${number}`, pages: [] };
    for (const type of ['theory', 'homework']) {
      const source = `${dir.name}/${type}.md`;
      let markdown;
      try { markdown = await readFile(path.join(root, source), 'utf8'); }
      catch (error) { if (error.code === 'ENOENT') continue; throw error; }
      if (!markdown.trim()) continue;
      const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() || `${type === 'theory' ? 'Lý thuyết' : 'Bài tập'} buổi ${number}`;
      const html = marked.parse(markdown);
      const images = {};
      await Promise.all([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(async match => {
        try {
          const src = match[1].replaceAll('&amp;', '&');
          const url = new URL(src, `https://docs.local/${source}`);
          if (url.origin !== 'https://docs.local') return;
          const file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
          if (!file.startsWith(path.resolve(root) + path.sep)) return;
          const size = await imageSize(file);
          if (size?.width > 0 && size?.height > 0) images[src] = size;
        } catch { /* Missing/unsupported images retain a readable fallback in the UI. */ }
      }));
      lesson.pages.push({ id: `Lesson${number}/${type}`, source, type, title, html, images,
        text: markdown.replace(/^```[^\n]*$/gm, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/<[^>]+>/g, ' ').replace(/[#*`|_>]/g, '').replace(/\s+/g, ' ').trim(),
        minutes: Math.max(1, Math.ceil(markdown.split(/\s+/).length / 220)) });
    }
    if (lesson.pages.length && lesson.title === `Buổi ${number}`) lesson.title = lesson.pages[0].title.replace(/^Buổi\s*\d+\s*:\s*/i, '');
    lessons.set(number, lesson);
  }
  return { lessons: [...lessons.values()].sort((a, b) => a.number - b.number) };
}

export async function build(root = projectRoot, out = path.join(root, 'dist')) {
  const data = await collectContent(root);
  await mkdir(out, { recursive: true });
  await cp(path.join(projectRoot, 'web'), out, { recursive: true });
  await mkdir(path.join(out, 'assets'), { recursive: true });
  await cp(path.join(projectRoot, 'node_modules/dompurify/dist/purify.es.mjs'), path.join(out, 'assets/purify.mjs'));
  await cp(path.join(projectRoot, 'node_modules/motion/dist/motion.js'), path.join(out, 'assets/motion-vendor.js'));
  const motion = await readFile(path.join(out, 'assets/motion.js'));
  const motionVersion = createHash('sha256').update(motion).digest('hex').slice(0, 12);
  const appFile = path.join(out, 'assets/app.js');
  await writeFile(appFile,(await readFile(appFile,'utf8')).replace("'./motion.js'",`'./motion.js?v=${motionVersion}'`));
  let index = await readFile(path.join(out, 'index.html'), 'utf8');
  for (const asset of ['app.js', 'styles.css', 'motion-vendor.js']) {
    const content = await readFile(path.join(out, 'assets', asset));
    const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
    index = index.replace(`./assets/${asset}`, `./assets/${asset}?v=${version}`);
  }
  await writeFile(path.join(out, 'index.html'), index);
  await writeFile(path.join(out, 'content.json'), JSON.stringify(data));
  // Keep existing demonstrations, images and relative asset paths intact.
  for (const item of await readdir(root, { withFileTypes: true })) {
    if ((item.isDirectory() && (/^Lesson\d+$/.test(item.name) || item.name === 'img')) || item.name === 'style.css') {
      await cp(path.join(root, item.name), path.join(out, item.name), { recursive: true });
    }
  }
  await writeFile(path.join(out, '.nojekyll'), '');
  return data;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = await build();
  console.log(`Built ${data.lessons.length} lessons / ${data.lessons.flatMap(l => l.pages).length} documents → dist/`);
}

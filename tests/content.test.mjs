import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collectContent, build, projectRoot } from '../scripts/build.mjs';

test('repository curriculum remains ordered and every discovered document has a valid route', async () => {
  const content = await collectContent(projectRoot);
  assert.ok(content.lessons.length > 0);
  assert.deepEqual(content.lessons.map(l=>l.number), content.lessons.map(l=>l.number).sort((a,b)=>a-b));
  for (const lesson of content.lessons) for (const page of lesson.pages) {
    assert.match(page.id, new RegExp(`^Lesson${lesson.number}/(theory|homework)$`));
    assert.ok(page.title.length);
    assert.ok((await readFile(path.join(projectRoot,page.source),'utf8')).trim().length);
    assert.ok(page.minutes >= 1);
  }
});

test('new lessons, new homework, edits, code escaping and portable output', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(),'hit-docs-'));
  try {
    await writeFile(path.join(root,'README.md'),'| 1 | Introduction | — | — |\n| 4 | Box model | — | — |');
    await mkdir(path.join(root,'Lesson4','img'),{recursive:true});
    await writeFile(path.join(root,'Lesson4/theory.md'),'# Buổi 4: Hộp CSS\n\n![Ảnh](img/box.svg)\n\n[Other](../Lesson1/theory.md)\n\n```html\n<script>alert(1)</script>\n```');
    await writeFile(path.join(root,'Lesson4/homework.md'),'   ');
    let content=await collectContent(root);
    assert.equal(content.lessons[1].pages.length,1);
    assert.equal(content.lessons[1].pages[0].id,'Lesson4/theory');
    assert.equal(content.lessons[1].pages[0].title,'Buổi 4: Hộp CSS');
    assert.doesNotMatch(content.lessons[1].pages[0].html,/<script>/);
    await writeFile(path.join(root,'Lesson4/homework.md'),'# Thực hành box model');
    await mkdir(path.join(root,'Lesson15'));
    await writeFile(path.join(root,'Lesson15/theory.md'),'# Buổi 15: Nội dung mới');
    await writeFile(path.join(root,'Lesson4/theory.md'),'# Đã sửa bài\n\nNội dung cập nhật');
    const out=path.join(root,'export');
    content=await build(root,out);
    assert.equal(content.lessons[1].pages.length,2);
    assert.match(content.lessons[1].pages[0].html,/Nội dung cập nhật/);
    assert.equal(content.lessons[2].number,15);
    assert.equal(content.lessons[2].title,'Nội dung mới');
    const html=await readFile(path.join(out,'index.html'),'utf8');
    assert.match(html,/src="\.\/assets\/app.js\?v=[a-f0-9]{12}"/);
    assert.match(html,/href="\.\/assets\/styles.css\?v=[a-f0-9]{12}"/);
    assert.doesNotMatch(html,/(?:src|href)="\/assets/);
    const output=JSON.parse(await readFile(path.join(out,'content.json'),'utf8'));
    assert.deepEqual(output,content);
    assert.match(await readFile(path.join(out,'assets/purify.mjs'),'utf8'),/DOMPurify/);
    assert.equal(await readFile(path.join(out,'Lesson4/theory.md'),'utf8'),'# Đã sửa bài\n\nNội dung cập nhật');
  } finally { await rm(root,{recursive:true,force:true}); }
});

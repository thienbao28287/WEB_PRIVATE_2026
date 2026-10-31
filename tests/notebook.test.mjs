import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {parseNotebook} from '../scripts/notebook.mjs';
import {collectContent,projectRoot} from '../scripts/build.mjs';
import {getLessonPitfalls,renderNotebookDialog} from '../web/assets/notebook.js';

test('notebook entries come from lesson Markdown and code remains escaped',async()=>{
 const content=await collectContent(projectRoot);
 const lesson=content.lessons.find(lesson=>lesson.number===2);
 const list=getLessonPitfalls(lesson);
 assert.equal(list.length,4);assert.ok(list.some(item=>item.title.includes('preventDefault')));
 assert.ok(lesson.notebookSource.endsWith('/notebook.md'));
 const html=renderNotebookDialog(lesson,lesson.pages[0],list);
 assert.match(html,/notebook-dialog/);assert.match(html,/notes-content/);assert.doesNotMatch(html,/notebook-3d-stage|flip-next-btn/);
 assert.match(html.replace(/<[^>]*>/g,''),/&lt;img/);assert.match(html,/class="code-toolbar"/);assert.doesNotMatch(html,/notes-code|notes-copy/);assert.match(list[0].badCode,/Banner"> <!-- Sai/);assert.doesNotMatch(html,/<img src="\/images\/banner/);
 assert.deepEqual(getLessonPitfalls({number:99}),[]);
});
test('editing Markdown changes notebook data; absent notes have no unrelated fallback',async()=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'hit-notebook-'));
 try{
  await mkdir(path.join(root,'Lesson2'));await writeFile(path.join(root,'README.md'),'# Test');
  await writeFile(path.join(root,'Lesson2/theory.md'),'# Theory');
  assert.deepEqual(getLessonPitfalls((await collectContent(root)).lessons[0]),[]);
  const source=await readFile(path.join(projectRoot,'Lesson2/notebook.md'),'utf8');
  await writeFile(path.join(root,'Lesson2/notebook.md'),source.replace('Sai đường dẫn hình ảnh (Lỗi 404 Not Found)','Tiêu đề sửa trong Markdown'));
  assert.equal((await collectContent(root)).lessons[0].notebook[0].title,'Tiêu đề sửa trong Markdown');
 }finally{await rm(root,{recursive:true,force:true});}
});
test('notebook Markdown reports missing required sections',()=>{
 assert.throws(()=>parseNotebook('## Lỗi\n### Dấu hiệu\nThiếu mã','Lesson2/notebook.md'),/Lesson2\/notebook.md/);
 assert.deepEqual(parseNotebook('# Chưa có ghi chú','Lesson2/notebook.md'),[]);
});

test('notebook selector offers every lesson and selects the current lesson',()=>{
 const lessons=[{number:1,title:'Bắt đầu',notebook:[]},{number:2,title:'Form',notebook:[{title:'Lỗi',badCode:'',goodCode:'',symptomHTML:'',explanationHTML:''}]}];
 const html=renderNotebookDialog(lessons[1],{},[],lessons);
 assert.match(html,/value="1"[^>]*>Tuần 1 · Bắt đầu — Chưa có ghi chú/);
 assert.match(html,/value="2" selected>Tuần 2 · Form — 1 ghi chú/);
 assert.match(html,/label for="notebook-lesson"/);
});

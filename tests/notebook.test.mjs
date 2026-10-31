import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {parseNotebook} from '../scripts/notebook.mjs';
import {collectContent,projectRoot} from '../scripts/build.mjs';
import {getLessonPitfalls,hasTheory,renderNotebookDialog} from '../web/assets/notebook.js';

test('notebook entries come from lesson Markdown and code remains escaped',async()=>{
 const content=await collectContent(projectRoot);
 const lesson=content.lessons.find(lesson=>lesson.number===2);
 const list=getLessonPitfalls(lesson);
 assert.equal(list.length,6);assert.ok(list.some(item=>item.title.includes('Label')));
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
 const lessons=[{number:1,title:'Bắt đầu',pages:[{type:'theory',html:'<h1>Start</h1>'}],notebook:[]},{number:2,title:'Form',pages:[{type:'theory',html:'<h1>Form</h1>'}],notebook:[{title:'Lỗi',badCode:'',goodCode:'',symptomHTML:'',explanationHTML:''}]}];
 const html=renderNotebookDialog(lessons[1],{},[],lessons);
 assert.match(html,/value="1"[^>]*>Tuần 1 · Bắt đầu — Chưa có ghi chú/);
 assert.match(html,/value="2" selected>Tuần 2 · Form — 1 ghi chú/);
 assert.match(html,/label for="notebook-lesson"/);
});

test('only lessons with published theory appear in notebook choices',()=>{
 const lessons=[{number:1,pages:[{type:'theory',html:'<h1>Theory</h1>'}]},{number:2,pages:[{type:'homework',html:'Homework'}]},{number:3,pages:[],notebook:[{}]},{number:4,pages:[{type:'theory',html:'   '}]}];
 assert.deepEqual(lessons.filter(hasTheory).map(item=>item.number),[1]);
 const html=renderNotebookDialog(lessons[0],{},[],lessons);
 assert.match(html,/value="1"/);assert.doesNotMatch(html,/value="[234]"/);
});

test('notebooks follow existing theory and the old lesson 14 aggregate is removed',async()=>{
 const content=await collectContent(projectRoot);
 assert.deepEqual(content.lessons.filter(l=>getLessonPitfalls(l).length).map(l=>l.number),[1,2,3]);
 assert.equal(content.lessons.find(l=>l.number===14).pages.length,0);
 for(const lesson of content.lessons.filter(l=>getLessonPitfalls(l).length)){
  assert.ok(hasTheory(lesson));
  for(const item of lesson.notebook)assert.ok(item.explanationHTML.includes('#/Lesson'+lesson.number+'/theory'));
 }
});

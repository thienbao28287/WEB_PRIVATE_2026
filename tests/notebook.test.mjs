import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {parseNotebook} from '../scripts/notebook.mjs';
import {collectContent,projectRoot} from '../scripts/build.mjs';
import {getLessonPitfalls,renderNotebookDialog,notebookWindow} from '../web/assets/notebook.js';

test('notebook entries come from lesson Markdown and code remains escaped',async()=>{
 const content=await collectContent(projectRoot);
 const lesson=content.lessons.find(lesson=>lesson.number===2);
 const list=getLessonPitfalls(lesson);
 assert.equal(list.length,4);assert.ok(list.some(item=>item.title.includes('preventDefault')));
 assert.ok(lesson.notebookSource.endsWith('/notebook.md'));
 const html=renderNotebookDialog(lesson,lesson.pages[0],list);
 assert.match(html,/notebook-dialog/);assert.match(html,/notebook-3d-stage/);
 assert.match(html,/&lt;img/);assert.doesNotMatch(html,/<img src="\/images\/banner/);
 assert.deepEqual(getLessonPitfalls({number:99}),[]);
});
test('single-page mobile visits all entries and desktop handles odd/empty endings',()=>{
 for(const count of [0,1,3,4,7]){
  const visited=[];
  for(let index=0;index<count;index++)visited.push(notebookWindow(count,index,true).start);
  assert.deepEqual(visited,Array.from({length:count},(_,i)=>i));
 }
 assert.deepEqual(notebookWindow(3,2),{start:2,step:2,end:3,previous:true,next:false});
 assert.deepEqual(notebookWindow(0,0),{start:0,step:2,end:0,previous:false,next:false});
 assert.equal(notebookWindow(1,0,true).next,false);
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

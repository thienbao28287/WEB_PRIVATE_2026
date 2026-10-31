import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {checkAnswers,previewCode,restoreExercise,validateExercises} from '../web/assets/exercise-model.js';
import {collectContent,projectRoot} from '../scripts/build.mjs';
const data=JSON.parse(await readFile(new URL('../Lesson2/exercises.json',import.meta.url),'utf8'));
const [label,email,required]=data.groups[0].exercises;

test('label/id accept matching identifiers and reject blanks, mismatch and invalid names',()=>{
  assert.ok(checkAnswers(label,{'label-for':' full-name ','input-id':'full-name'}).every(result=>result.ok));
  for(const answers of [{},{'label-for':'name','input-id':'other'},{'label-for':'1name','input-id':'1name'},{'label-for':'full name','input-id':'full name'}])assert.ok(checkAnswers(label,answers).every(result=>!result.ok));
});
test('email and required accept trimmed case-insensitive keywords and reject alternatives',()=>{
  assert.ok(checkAnswers(email,{'input-type':' EMAIL '})[0].ok);
  assert.ok(checkAnswers(required,{'required-attribute':' required '})[0].ok);
  assert.equal(checkAnswers(email,{'input-type':'text'})[0].ok,false);
  assert.equal(checkAnswers(required,{'required-attribute':'required=""'})[0].ok,false);
});
test('preview escapes quoted values and never injects raw boolean-position attributes',()=>{
  const attack='"><script>alert(1)</script><input onfocus="alert(1)';
  const preview=previewCode(label,{'label-for':attack,'input-id':attack});
  assert.ok(preview.includes('&lt;script&gt;'));assert.ok(!preview.includes('<script>'));
  assert.ok(!preview.includes('onfocus="'));
  const booleanPreview=previewCode(required,{'required-attribute':'required autofocus onfocus=alert(1)'});
  assert.ok(!booleanPreview.includes('autofocus'));assert.ok(!booleanPreview.includes('onfocus'));
});
test('restoring state revalidates completion, ignores damaged answers and isolates versions by caller key',()=>{
  assert.equal(restoreExercise(email,{completed:true,answers:{'input-type':'text'}}).completed,false);
  assert.equal(restoreExercise(email,{completed:true,answers:{'input-type':'email'}}).completed,true);
  assert.deepEqual(restoreExercise(email,{answers:{'input-type':42},completed:true}),{answers:{'input-type':''},completed:false});
  assert.deepEqual(restoreExercise(email,undefined),{answers:{'input-type':''},completed:false});
});
test('exercise authoring rejects duplicate IDs, missing blanks and unknown fields',()=>{
  assert.equal(validateExercises(data,'exercises.json').length,1);
  for(const mutate of [
    copy=>copy.groups[0].exercises.push(copy.groups[0].exercises[0]),
    copy=>{copy.groups[0].exercises[0].template='<form></form>';},
    copy=>{copy.groups[0].exercises[0].template+='{{unknown}}';},
    copy=>{delete copy.groups[0].exercises[1].fields[0].expected;},
  ]){const copy=structuredClone(data);mutate(copy);assert.throws(()=>validateExercises(copy,'Lesson2/exercises.json'),/Lesson2\/exercises.json/);}
});
test('Markdown marker produces associated exercise data at the Form section only',async()=>{
  const content=await collectContent(projectRoot);
  const page=content.lessons.find(lesson=>lesson.number===2).pages.find(page=>page.type==='theory');
  assert.equal(page.exercises[0].exercises.length,3);
  assert.ok(page.html.indexOf('data-exercise="html-form"')>page.html.indexOf('Thẻ biểu mẫu'));
  assert.ok(page.html.indexOf('data-exercise="html-form"')<page.html.indexOf('Thẻ script và style'));
  assert.equal(content.lessons.find(lesson=>lesson.number===1).pages[0].exercises,undefined);
});
test('build reports missing and duplicate exercise markers with the Markdown path',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'hit-exercise-'));
  try{
    await writeFile(path.join(root,'README.md'),'# Test');await mkdir(path.join(root,'Lesson2'));
    await writeFile(path.join(root,'Lesson2/exercises.json'),JSON.stringify(data));
    await writeFile(path.join(root,'Lesson2/theory.md'),'# Test\n\n```exercise\nmissing\n```');
    await assert.rejects(collectContent(root),/Lesson2\/theory.md: marker exercise không tồn tại/);
    await writeFile(path.join(root,'Lesson2/theory.md'),'# Test\n\n```exercise\nhtml-form\n```\n\n```exercise\nhtml-form\n```');
    await assert.rejects(collectContent(root),/Lesson2\/theory.md: marker exercise bị trùng/);
  }finally{await rm(root,{recursive:true,force:true});}
});

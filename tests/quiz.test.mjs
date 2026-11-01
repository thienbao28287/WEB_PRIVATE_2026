import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';import os from 'node:os';
import {parseQuiz} from '../scripts/quiz.mjs';
import {collectContent,projectRoot} from '../scripts/build.mjs';
import {headingSlug,headingIdsFromHTML,newQuizState,restoreQuizState,checkQuizAnswer,nextQuizQuestion,quizResult,retryQuiz,quizStorageKey} from '../web/assets/quiz-model.js';
const content=await collectContent(projectRoot);
const page=content.lessons.find(l=>l.number===2).pages.find(p=>p.type==='theory');
const quiz=page.quiz;
const source=await readFile(path.join(projectRoot,'Lesson2/quiz.md'),'utf8');
test('three published lessons load five questions from Markdown and only theory gets a quiz',()=>{
 for(const number of [1,2,3]){const lesson=content.lessons.find(l=>l.number===number);const theory=lesson.pages.find(p=>p.type==='theory');assert.equal(theory.quiz.questions.length,5);for(const q of theory.quiz.questions){assert.ok(q.options.length>=2);assert.ok(q.explanationHTML);assert.ok(q.review.href.startsWith('#/Lesson'+number+'/theory?section='));}for(const homework of lesson.pages.filter(p=>p.type==='homework'))assert.equal(homework.quiz,undefined);}
 assert.equal(content.lessons.find(l=>l.number===4).quiz,undefined);
});
test('quiz authoring rejects wrong answer counts, duplicate IDs, missing explanation and broken theory links',()=>{
 for(const edited of [source.replace('- [x]','- [ ]'),source.replace('- [ ]','- [x]'),source+'\n'+source.slice(source.indexOf('## label-input')),source.replace('### Giải thích','### Lỗi tên mục'),source.replace('theory.md#7-the-bieu-mau-form','theory.md#missing'),source.replace('theory.md#7-the-bieu-mau-form','https://example.com/')])assert.throws(()=>parseQuiz(edited,'Lesson2/quiz.md',page.html,page.id),/Lesson2\/quiz.md/);
 assert.equal(parseQuiz('','quiz.md',page.html,page.id),null);
});
test('heading links share frontend slug rules and duplicate heading suffixes',()=>{
 assert.equal(headingSlug('Độ ưu tiên (CSS)'), 'do-uu-tien-css');
 assert.deepEqual(headingIdsFromHTML('<h1>Độ ưu tiên</h1><h2>Độ ưu tiên</h2><h3><code>for</code> &amp; id</h3>'),['do-uu-tien','do-uu-tien-1','for-id']);
});
test('editing quiz Markdown changes content and revision; removing the file removes the quiz',async()=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'hit-quiz-'));
 try{await writeFile(path.join(root,'README.md'),'# Test');await mkdir(path.join(root,'Lesson2'));await writeFile(path.join(root,'Lesson2/theory.md'),await readFile(path.join(projectRoot,'Lesson2/theory.md')));await writeFile(path.join(root,'Lesson2/quiz.md'),source);
 const old=(await collectContent(root)).lessons[0].pages[0].quiz;
 await writeFile(path.join(root,'Lesson2/quiz.md'),source.replace('Để label','Khi dùng label'));
 const changed=(await collectContent(root)).lessons[0].pages[0].quiz;assert.notEqual(old.revision,changed.revision);assert.match(changed.questions[0].questionHTML,/Khi dùng label/);
 await rm(path.join(root,'Lesson2/quiz.md'));assert.equal((await collectContent(root)).lessons[0].pages[0].quiz,undefined);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('checking locks an answer, advances explicitly and reports accurate score',()=>{
 let state=newQuizState(quiz);assert.equal(checkQuizAnswer(quiz,state),state);assert.equal(nextQuizQuestion(state),state);
 for(const q of quiz.questions){state.selected=q.correct;state=checkQuizAnswer(quiz,state);assert.equal(state.checked,true);assert.equal(checkQuizAnswer(quiz,state),state);state=nextQuizQuestion(state);}
 assert.equal(state.position,5);assert.deepEqual(quizResult(quiz,state),{score:5,total:5,wrong:[]});assert.deepEqual(restoreQuizState(quiz,JSON.parse(JSON.stringify(state))),state);
});
test('wrong answers can be retried alone while correct answers remain credited',()=>{
 let state=newQuizState(quiz);
 quiz.questions.forEach((q,i)=>{state.selected=i===0?(q.correct+1)%q.options.length:q.correct;state=nextQuizQuestion(checkQuizAnswer(quiz,state));});
 assert.equal(quizResult(quiz,state).score,4);state=retryQuiz(quiz,state,true);assert.deepEqual(state.queue,[quiz.questions[0].id]);state.selected=quiz.questions[0].correct;state=nextQuizQuestion(checkQuizAnswer(quiz,state));assert.equal(quizResult(quiz,state).score,5);
 assert.deepEqual(retryQuiz(quiz,state),newQuizState(quiz));
});
test('invalid saved progress resets safely and revisions isolate earlier attempts',()=>{
 for(const saved of [null,{}, {queue:['missing'],position:0,answers:{}},{queue:[quiz.questions[0].id],position:1,answers:{}},{queue:[quiz.questions[0].id,quiz.questions[0].id],position:0,answers:{}}])assert.deepEqual(restoreQuizState(quiz,saved),newQuizState(quiz));
 const state=newQuizState(quiz);state.selected=99;state.checked=true;const restored=restoreQuizState(quiz,state);assert.equal(restored.selected,null);assert.equal(restored.checked,false);
 assert.notEqual(quizStorageKey(page.id,quiz),quizStorageKey(page.id,{...quiz,revision:'new'}));
});

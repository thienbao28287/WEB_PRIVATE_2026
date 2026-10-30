import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { projectRoot } from '../scripts/build.mjs';

test('local HTTP preview: saving Markdown and adding homework updates JSON and emits SSE', {timeout:20000}, async () => {
  const root=await mkdtemp(path.join(os.tmpdir(),'hit-live-'));
  let child, reader;
  try {
    await writeFile(path.join(root,'README.md'),'| 4 | CSS | — | — |');
    await mkdir(path.join(root,'Lesson4'));
    await writeFile(path.join(root,'Lesson4/theory.md'),'# Bài ban đầu');
    child=spawn(process.execPath,[path.join(projectRoot,'scripts/dev.mjs')],{env:{...process.env,HIT_DOCS_ROOT:root,PORT:'0'},stdio:['ignore','pipe','pipe']});
    const url=await new Promise((resolve,reject)=>{
      let output='';
      child.stdout.on('data',chunk=>{output+=chunk;const match=output.match(/Local: (http:\/\/127\.0\.0\.1:\d+)/);if(match)resolve(match[1]);});
      child.once('error',reject); child.once('exit',code=>reject(new Error(`server exited ${code}`)));
      child.stderr.on('data',chunk=>{output+=chunk;});
    });
    assert.equal((await fetch(url)).status,200);
    assert.equal((await fetch(url+'/assets/purify.mjs')).status,200);
    assert.equal((await fetch(url+'/missing')).status,404);
    const controller=new AbortController();
    const response=await fetch(url+'/__events',{signal:controller.signal});
    reader=response.body.getReader();
    await reader.read(); // initial connection comment
    await writeFile(path.join(root,'Lesson4/theory.md'),'# Đã cập nhật tự động\n\nKiến thức mới');
    await writeFile(path.join(root,'Lesson4/homework.md'),'# Bài tập mới');
    const notification=await reader.read();
    assert.match(new TextDecoder().decode(notification.value),/updated/);
    const data=await (await fetch(url+'/content.json')).json();
    assert.equal(data.lessons[0].pages.length,2);
    assert.match(data.lessons[0].pages[0].html,/Đã cập nhật tự động/);
    controller.abort();
  } finally {
    await reader?.cancel().catch(()=>{});
    if(child && child.exitCode===null){const exited=new Promise(resolve=>child.once('exit',resolve));child.kill();await exited;}
    await rm(root,{recursive:true,force:true});
  }
});

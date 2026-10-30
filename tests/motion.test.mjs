import test from 'node:test';
import assert from 'node:assert/strict';
import {createLatestTransition,animateElement} from '../web/assets/motion.js';

function animation() {
  let resolve,reject;
  const finished=new Promise((yes,no)=>{resolve=yes;reject=no;});
  return {finished,finish:()=>resolve(),cancel:()=>reject(new Error('cancelled'))};
}

test('rapid navigation commits only the latest destination',async()=>{
  const runner=createLatestTransition(),events=[];
  const firstLeave=animation(),lastEnter=animation();
  const first=runner.run({leave:()=>firstLeave,commit:()=>events.push('old'),settled:()=>events.push('old settled')});
  const last=runner.run({commit:()=>events.push('latest'),enter:()=>lastEnter,settled:()=>events.push('latest settled')});
  lastEnter.finish();
  assert.deepEqual(await Promise.all([first,last]),[false,true]);
  assert.deepEqual(events,['latest','latest settled']);
  assert.equal(runner.isRunning,false);
});

test('navigation during entry cancels the previous completion callback',async()=>{
  const runner=createLatestTransition(),events=[],entry=animation();
  const first=runner.run({commit:()=>events.push('first committed'),enter:()=>entry,settled:()=>events.push('stale focus')});
  const second=runner.run({commit:()=>events.push('second committed'),settled:()=>events.push('second focus')});
  await Promise.all([first,second]);
  assert.deepEqual(events,['first committed','second committed','second focus']);
});

test('reduced motion and missing animation support still commit synchronously',async()=>{
  const old=globalThis.matchMedia;
  try {
    globalThis.matchMedia=()=>({matches:true});
    let animated=false,committed=false;
    const element={animate(){animated=true;return animation();}};
    const runner=createLatestTransition();
    const result=runner.run({leave:()=>animateElement(element,{},{}),commit:()=>{committed=true;},enter:()=>animateElement(element,{},{})});
    assert.equal(committed,true);assert.equal(animated,false);assert.equal(await result,true);
    assert.equal(animateElement({}, {}, {}),null);
  } finally { if(old)globalThis.matchMedia=old;else delete globalThis.matchMedia; }
});

test('cancelling a pending route preserves the already displayed page',async()=>{
  const runner=createLatestTransition(),leave=animation();let swapped=false;
  const result=runner.run({leave:()=>leave,commit:()=>{swapped=true;}});
  runner.cancel();
  assert.equal(await result,false);assert.equal(swapped,false);assert.equal(runner.isRunning,false);
});

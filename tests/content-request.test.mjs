import test from 'node:test';
import assert from 'node:assert/strict';
import {fetchContent} from '../web/assets/content.js';

test('stalled response and stalled JSON both time out and abort the request',async()=>{
  for(const jsonStalls of [false,true]){
    let requestSignal;
    await assert.rejects(fetchContent('/content.json',{timeout:10,fetcher:async(_,options)=>{
      requestSignal=options.signal;
      if(!jsonStalls)return new Promise(()=>{});
      return {ok:true,json:()=>new Promise(()=>{})};
    }}),{name:'TimeoutError'});
    assert.equal(requestSignal.aborted,true);
  }
});
test('a cancelled request cannot replace a later successful retry',async()=>{
  const controller=new AbortController();
  const cancelled=fetchContent('/content.json',{signal:controller.signal,fetcher:()=>new Promise(()=>{})});
  controller.abort();
  await assert.rejects(cancelled,{name:'AbortError'});
  assert.deepEqual(await fetchContent('/content.json',{fetcher:async()=>({ok:true,json:async()=>({lessons:[]})})}),{lessons:[]});
});
test('HTTP errors reach the retry state',async()=>{
  await assert.rejects(fetchContent('/content.json',{fetcher:async()=>({ok:false,status:503})}),/HTTP 503/);
});

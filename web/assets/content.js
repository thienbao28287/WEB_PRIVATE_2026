// Bound the entire request, including JSON decoding, and cancel superseded loads.
export async function fetchContent(url,{signal,timeout=12000,fetcher=fetch}={}) {
  const controller=new AbortController();
  let timer, onAbort;
  const aborted=new Promise((_,reject)=>{
    onAbort=()=>{controller.abort();reject(new DOMException('Request cancelled','AbortError'));};
    if(signal?.aborted)onAbort();else signal?.addEventListener('abort',onAbort,{once:true});
  });
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{
    controller.abort();reject(new DOMException('Request timed out','TimeoutError'));
  },timeout);});
  try {
    return await Promise.race([(async()=>{
      const response=await fetcher(url,{cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('HTTP '+response.status);
      return await response.json();
    })(),deadline,aborted]);
  } finally {clearTimeout(timer);signal?.removeEventListener('abort',onAbort);}
}

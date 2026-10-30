export function motionEnabled(element) {
  return typeof element?.animate === 'function' && !globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function animateElement(element, keyframes, options) {
  if (!motionEnabled(element)) return null;
  try { return element.animate(keyframes, { fill:'both', easing:'cubic-bezier(.2,.7,.2,1)', ...options }); }
  catch { return null; }
}

// Cancelled animations settle their promises, but only the latest request may commit.
export function createLatestTransition() {
  let generation=0, active=null, running=false;
  function stopActive() { const animation=active; active=null; try { animation?.cancel(); } catch {} }
  async function wait(animation) {
    active=animation;
    try { await animation.finished; } catch { /* Cancellation is an expected navigation path. */ }
    finally { if(active===animation)active=null; try { animation.cancel(); } catch {} }
  }
  return {
    get isRunning() { return running; },
    cancel() { generation++; running=false; stopActive(); },
    finish() { try { active?.finish(); } catch { stopActive(); } },
    async run({leave,commit,enter,settled}) {
      const request=++generation;
      stopActive(); running=true;
      try {
        const outgoing=leave?.();
        if(outgoing)await wait(outgoing);
        if(request!==generation)return false;
        commit();
        if(request!==generation)return false;
        const incoming=enter?.();
        if(incoming)await wait(incoming);
        if(request!==generation)return false;
        settled?.();
        return true;
      } finally { if(request===generation)running=false; }
    },
  };
}

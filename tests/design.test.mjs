import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

function luminance(hex) {
  const channels=hex.slice(1).match(/../g).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
}
function contrast(a,b) { const values=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (values[0]+.05)/(values[1]+.05); }
function tokens(css,regex) {
  const result={};
  for(const block of css.matchAll(regex))for(const match of block[1].matchAll(/--([\w-]+)\s*:\s*(#[a-f0-9]{3,6})\s*[;}]/gi)) {
    result[match[1]]=match[2].length===4?'#'+[...match[2].slice(1)].map(c=>c+c).join(''):match[2];
  }
  return result;
}
test('light and dark reading text, focus and control boundaries retain contrast', async()=>{
  const css=await readFile(new URL('../web/assets/styles.css',import.meta.url),'utf8');
  const light=tokens(css,/:root\s*\{([^}]+)\}/g);
  const dark={...light,...tokens(css,/:root\[data-theme=dark\]\s*\{([^}]+)\}/g)};
  for(const [theme,palette] of [['light',light],['dark',dark]]){
    for(const surface of ['surface','canvas','subtle'])for(const ink of ['body','muted','accent','link']) {
      assert.ok(contrast(palette[ink],palette[surface])>=4.5,`${theme}: ${ink} on ${surface}`);
    }
    for(const ink of ['focus','control-border'])for(const surface of ['surface','canvas']){
      assert.ok(contrast(palette[ink],palette[surface])>=3,`${theme}: ${ink} on ${surface}`);
    }
    assert.ok(contrast(palette['on-primary'],palette.primary)>=4.5,`${theme}: primary button label`);
  }
});

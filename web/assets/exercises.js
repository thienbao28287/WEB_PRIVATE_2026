import DOMPurify from './purify.mjs';
import {checkAnswers,escapeHTML,previewCode,restoreExercise,exerciseStorageId} from './exercise-model.js';

const storageKey='hit-exercises-v1';
let session={};
function readSaved(){try{const value=JSON.parse(localStorage.getItem(storageKey));if(value&&typeof value==='object'&&!Array.isArray(value))session=value;}catch{}return session;}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(session));}catch{}}
// Browser previews intentionally keep a white canvas, like a separate browser tab.
export function refreshExerciseThemes(){}
function cleanHTML(code){return DOMPurify.sanitize(code,{FORBID_TAGS:['script','iframe','object','embed','base','link','meta','audio','video'],FORBID_ATTR:['action','formaction','src','srcset','poster','background']});}
function previewDocument(code){return `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'"><style>body{margin:0;padding:20px;font:16px/1.6 system-ui;color:#374151;background:white;overflow-wrap:anywhere}input,button,select,textarea{font:inherit;max-width:100%;box-sizing:border-box}input{padding:8px}fieldset{min-width:0}</style></head><body>${cleanHTML(code)}</body></html>`;}
function workspace(id,initial,instructions){
 const panel=document.createElement('div');panel.className='html-playground';
 panel.innerHTML=`<div class="playground-result"><div class="playground-tabs" role="tablist" aria-label="Khu vực thực hành"><button type="button" role="tab" id="${id}-content-tab" aria-selected="true" aria-controls="${id}-content" tabindex="0">Nội dung</button><button type="button" role="tab" id="${id}-browser-tab" aria-selected="false" aria-controls="${id}-browser" tabindex="-1">Trình duyệt</button></div><div id="${id}-content" class="playground-instructions" role="tabpanel" aria-labelledby="${id}-content-tab" tabindex="0">${instructions}</div><div id="${id}-browser" class="playground-browser" role="tabpanel" aria-labelledby="${id}-browser-tab" hidden><iframe sandbox="" referrerpolicy="no-referrer" title="Kết quả HTML — ${escapeHTML(id)}"></iframe><small>Form minh họa · Không gửi dữ liệu · JavaScript không chạy</small></div></div><div class="playground-editor"><div class="playground-file"><span>index.html</span><button type="button" class="playground-run">Chạy code</button><button type="button" class="playground-reset">Khôi phục</button></div><div class="playground-code"><div class="playground-lines" aria-hidden="true"></div><textarea aria-label="Mã HTML thực hành — ${escapeHTML(id)}" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" maxlength="30000"></textarea></div></div><p class="playground-status sr-only" role="status"></p>`;
 const editor=panel.querySelector('textarea'),numbers=panel.querySelector('.playground-lines'),frame=panel.querySelector('iframe'),status=panel.querySelector('.playground-status');
 editor.value=initial;
 const tabs=[...panel.querySelectorAll('[role="tab"]')];let timer;
 function render(){if(!panel.querySelector('.playground-browser').hidden)frame.srcdoc=previewDocument(editor.value);}
 function choose(which){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===which));tab.tabIndex=i===which?0:-1;panel.querySelector('#'+tab.getAttribute('aria-controls')).hidden=i!==which;});if(which===1)render();}
 function lines(){numbers.textContent=Array.from({length:editor.value.split('\n').length},(_,i)=>i+1).join('\n');numbers.style.transform=`translateY(-${editor.scrollTop}px)`;}
 function change(){panel.dispatchEvent(new CustomEvent('workspace-change'));}
 function run(){clearTimeout(timer);choose(1);status.textContent='Đã cập nhật kết quả HTML.';}
 function setCode(value){clearTimeout(timer);editor.value=value;editor.scrollTop=0;lines();render();}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>choose(i));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowLeft')next=1-i;if(event.key==='Home')next=0;if(event.key==='End')next=1;if(next!==undefined){event.preventDefault();choose(next);tabs[next].focus();}});});
 editor.addEventListener('scroll',()=>numbers.style.transform=`translateY(-${editor.scrollTop}px)`);
 editor.addEventListener('input',()=>{lines();change();clearTimeout(timer);timer=setTimeout(()=>{if(panel.isConnected)render();},300);});
 editor.addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.ctrlKey||event.metaKey)){event.preventDefault();run();}});
 panel.querySelector('.playground-run').addEventListener('click',run);
 panel.querySelector('.playground-reset').addEventListener('click',()=>panel.dispatchEvent(new CustomEvent('workspace-reset')));
 lines();return {panel,editor,run,choose,setCode};
}
function readCodeAnswers(exercise,code){
 const doc=new DOMParser().parseFromString(cleanHTML(code),'text/html');
 return Object.fromEntries(exercise.fields.map(field=>{
  const matches=doc.querySelectorAll(field.target),target=matches.length===1?matches[0]:null;
  let value='';
  if(target?.closest('form')){
   if(field.attribute==='required')value=target.hasAttribute('required')?'required':'';
   else value=target.getAttribute(field.attribute)||'';
   if(field.attribute==='id'&&value&&[...doc.querySelectorAll('[id]')].filter(el=>el.id===value).length!==1)value='';
  }
  return [field.id,value];
 }));
}
export function mountExercises(article,page){
 for(const [index,pre] of [...article.querySelectorAll('pre[data-language="playground"]')].entries()){
  const initial=pre.textContent,key='hit-playground:'+page.id+':'+index;let saved;
  try{saved=localStorage.getItem(key);}catch{}
  const w=workspace('playground-'+index,typeof saved==='string'&&saved.length<=30000?saved:initial,'<h4>Thử tạo form của bạn</h4><p>Sửa toàn bộ HTML ở bên phải, rồi chọn Trình duyệt hoặc Chạy code. Kết quả tự cập nhật sau khi dừng gõ.</p><ol><li>Đổi tiêu đề và lời giới thiệu.</li><li>Thêm nhãn và ô họ tên có for/id trùng nhau.</li><li>Thử type="email" và required.</li></ol><p>Thực hành tự do không chấm điểm. Ba bài phía dưới có kiểm tra đáp án.</p>');
  pre.closest('.code-wrap').replaceWith(w.panel);
  w.panel.addEventListener('workspace-change',()=>{try{localStorage.setItem(key,w.editor.value);}catch{}});
  w.panel.addEventListener('workspace-reset',()=>{w.setCode(initial);try{localStorage.removeItem(key);}catch{}w.editor.focus();});
 }
 for(const marker of article.querySelectorAll('[data-exercise]')){
  const group=page.exercises?.find(g=>g.id===marker.dataset.exercise);
  if(!group){marker.textContent='Bài thực hành chưa tải được. Vui lòng tải lại trang.';continue;}
  const section=document.createElement('section');section.className='exercise-group';section.setAttribute('aria-label',group.title);
  section.innerHTML=`<header class="exercise-group-head"><div><p class="exercise-eyebrow">THỬ SỨC NGAY</p><h3>${escapeHTML(group.title)}</h3></div><p class="exercise-progress" aria-live="polite"></p></header><p class="exercise-intro">Sửa trực tiếp HTML trong index.html, chạy thử ở tab Trình duyệt và kiểm tra đáp án. Tiến độ lưu riêng trên trình duyệt này.</p>`;
  marker.replaceWith(section);const states=[];
  function progress(){section.querySelector('.exercise-progress').textContent=`${states.filter(s=>s.completed).length}/${group.exercises.length} bài thực hành hoàn thành`;}
  for(const ex of group.exercises){
   const key=exerciseStorageId(page.id,group.id,ex),saved=readSaved()[key],state=restoreExercise(ex,saved);states.push(state);
   const initial=previewCode(ex,Object.fromEntries(ex.fields.map(f=>[f.id,''])));
   const code=typeof saved?.code==='string'&&saved.code.length<=30000?saved.code:previewCode(ex,state.answers);
   const prefix=`exercise-${group.id}-${ex.id}`;
   const card=document.createElement('section');card.className='exercise-card';card.setAttribute('aria-labelledby',prefix+'-title');
   card.innerHTML=`<h4 id="${prefix}-title">${escapeHTML(ex.title)}</h4>`;
   const w=workspace(prefix,code,`<p>${escapeHTML(ex.prompt)}</p><p>Giữ một form, một label và một input cho bài này. Bạn có thể sửa toàn bộ mã HTML ở bên phải.</p><div class="exercise-buttons"><button type="button" class="button primary" data-action="check">Kiểm tra</button><button type="button" class="button" data-action="hint">Gợi ý (0/2)</button><button type="button" class="button" data-action="reset">Làm lại</button></div><div class="exercise-feedback" aria-live="polite"><p class="exercise-result"></p>${ex.fields.map(f=>`<p id="${prefix}-${f.id}-feedback" class="exercise-field-feedback"></p>`).join('')}</div><ol class="exercise-hints" aria-live="polite" hidden></ol>`);
   w.editor.setAttribute('aria-describedby',ex.fields.map(f=>`${prefix}-${f.id}-feedback`).join(' '));
   card.append(w.panel);section.append(card);let hints=0;
   const result=card.querySelector('.exercise-result');
   function save(){session[key]={answers:readCodeAnswers(ex,w.editor.value),code:w.editor.value,completed:state.completed};persist();progress();}
   function clear(){card.querySelectorAll('.exercise-field-feedback').forEach(n=>n.textContent='');w.editor.removeAttribute('aria-invalid');card.classList.remove('exercise-passed');}
   function check(){
    const checks=checkAnswers(ex,readCodeAnswers(ex,w.editor.value));state.completed=checks.every(c=>c.ok);card.classList.toggle('exercise-passed',state.completed);w.editor.setAttribute('aria-invalid',String(!state.completed));
    checks.forEach(c=>{const f=ex.fields.find(f=>f.id===c.id),node=card.querySelector('#'+prefix+'-'+c.id+'-feedback');node.textContent=f.label+': '+(c.ok?c.message:'✕ '+c.message);node.dataset.correct=String(c.ok);});
    result.textContent=state.completed?'✓ Hoàn thành. '+ex.explanation:'Chưa đúng hoàn toàn. Sửa code theo phản hồi hoặc mở gợi ý.';save();if(!state.completed)w.editor.focus();
   }
   function reset(){w.setCode(initial);hints=0;state.completed=false;clear();const list=card.querySelector('.exercise-hints');list.replaceChildren();list.hidden=true;const button=card.querySelector('[data-action="hint"]');button.disabled=false;button.textContent='Gợi ý (0/2)';result.textContent='Đã khôi phục mã ban đầu.';save();w.editor.focus();}
   w.panel.addEventListener('workspace-change',()=>{state.completed=false;clear();result.textContent='Đã sửa code. Kiểm tra lại để xác nhận đáp án.';save();});
   w.panel.addEventListener('workspace-reset',reset);
   card.addEventListener('click',event=>{const action=event.target.closest('[data-action]')?.dataset.action;if(action==='check')check();if(action==='reset')reset();if(action==='hint'&&hints<2){const list=card.querySelector('.exercise-hints');list.hidden=false;const item=document.createElement('li');item.textContent=ex.hints[hints++];list.append(item);const b=card.querySelector('[data-action="hint"]');b.textContent=`Gợi ý (${hints}/2)`;b.disabled=hints===2;}});
   // Revalidate saved code, including migration from the former fill-in inputs.
   state.completed=saved?.completed===true&&checkAnswers(ex,readCodeAnswers(ex,w.editor.value)).every(c=>c.ok);
   if(state.completed)check();
  }
  progress();
 }
}

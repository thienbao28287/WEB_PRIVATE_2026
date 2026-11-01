import {createNoteStore,formatNote,NOTE_LIMIT} from './note-model.js';
const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function hasTheory(lesson){return lesson?.pages?.some(page=>page.type==='theory'&&typeof page.html==='string'&&page.html.trim().length>0)||false;}
// Old authored notes remain available in source; personal notes start empty.
export function getLessonPitfalls(lesson){return Array.isArray(lesson?.notebook)?lesson.notebook:[];}
export function renderNotebookDialog(lesson,page,entries,lessons=[lesson]){
 return `<dialog id="notebook-dialog" class="notes-document personal-notebook" aria-labelledby="notebook-dialog-title"><header class="notes-header"><div><span class="read-meta" id="personal-note-context">Ghi chú cá nhân · Tuần ${esc(lesson.number)}</span><h1 id="notebook-dialog-title">Sổ tay ghi nhớ (demo)</h1></div><button id="notebook-close" class="icon-button" aria-label="Đóng sổ tay" title="Đóng sổ tay">×</button></header><div class="notes-picker"><label for="notebook-lesson">Chọn bài học</label><select id="notebook-lesson">${lessons.filter(hasTheory).map(item=>`<option value="${esc(item.number)}" ${item.number===lesson.number?'selected':''}>Tuần ${esc(item.number)} · ${esc(item.title||'')}</option>`).join('')}</select></div><div class="personal-note-body"><p class="personal-note-tip">Ghi chú chỉ lưu trên trình duyệt này. Tải Markdown để sao lưu khi đổi thiết bị hoặc xóa dữ liệu trình duyệt.</p><div class="personal-note-tabs"><div class="personal-note-tablist" role="tablist" aria-label="Chế độ ghi chú"><button type="button" id="note-edit-tab" role="tab" aria-selected="true" aria-controls="note-edit-panel">Soạn thảo</button><button type="button" id="note-preview-tab" role="tab" aria-selected="false" aria-controls="note-preview-panel" tabindex="-1">Xem trước</button></div><button type="button" id="note-export">Tải Markdown ↓</button></div><div id="note-edit-panel" role="tabpanel" aria-labelledby="note-edit-tab"><div class="personal-note-tools" role="group" aria-label="Định dạng Markdown"><button type="button" data-note-format="heading">Tiêu đề</button><button type="button" data-note-format="bold"><strong>Đậm</strong></button><button type="button" data-note-format="list">Danh sách</button><button type="button" data-note-format="code">Code</button><span>Hỗ trợ Markdown</span></div><label class="sr-only" for="personal-note-editor">Ghi chú của bạn</label><textarea id="personal-note-editor" maxlength="${NOTE_LIMIT}" placeholder="Điều bạn vừa hiểu, lỗi từng gặp hoặc đoạn code muốn nhớ…" aria-describedby="note-save-status personal-note-count"></textarea></div><div id="note-preview-panel" role="tabpanel" aria-labelledby="note-preview-tab" class="prose" tabindex="0" hidden></div><footer class="personal-note-footer"><span id="note-save-status" role="status">Đã sẵn sàng</span><span id="personal-note-count">0 ký tự</span></footer></div></dialog>`;
}
let closeActive=null,noteStore,parserPromise;
export function closeNotebookModal(options={}){closeActive?.(options);}
export function openNotebookModal(lesson,page,purifier,lessons=[lesson]){
 if(!hasTheory(lesson))return;
 closeNotebookModal({returnFocus:false});
 if(!noteStore)noteStore=createNoteStore({getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value)});
 const toggle=document.getElementById('notebook-toggle'),overflow=document.body.style.overflow;
 document.body.insertAdjacentHTML('beforeend',purifier.sanitize(renderNotebookDialog(lesson,page,[],lessons),{ADD_TAGS:['dialog']}));
 const dialog=document.getElementById('notebook-dialog'),editor=dialog.querySelector('#personal-note-editor'),status=dialog.querySelector('#note-save-status'),preview=dialog.querySelector('#note-preview-panel');
 const tabs=[dialog.querySelector('#note-edit-tab'),dialog.querySelector('#note-preview-tab')];
 let current=lesson.number,timer,dirty=false,closed=false,generation=0;
 function count(){dialog.querySelector('#personal-note-count').textContent=`${editor.value.length.toLocaleString('vi-VN')} / ${NOTE_LIMIT.toLocaleString('vi-VN')} ký tự`;}
 function flush(){clearTimeout(timer);if(!dirty)return;const result=noteStore.write(current,editor.value);dirty=!result.saved;status.textContent=result.saved?'Đã lưu trên trình duyệt':'Chưa lưu được — ghi chú đang giữ trong phiên này. Hãy tải Markdown để sao lưu.';}
 function load(){const record=noteStore.read(current);editor.value=record.markdown;dirty=!record.saved&&record.markdown.length>0;status.textContent=record.saved?(record.markdown?'Đã lưu trên trình duyệt':'Chưa có ghi chú — bắt đầu viết bên dưới'):'Không đọc được dữ liệu đã lưu. Bạn vẫn có thể viết và tải Markdown để sao lưu.';dialog.querySelector('#personal-note-context').textContent=`Ghi chú cá nhân · Tuần ${current}`;count();}
 async function drawPreview(){
  const request=++generation,markdown=editor.value;
  preview.textContent=markdown?'Đang tạo bản xem trước…':'Bạn chưa ghi chú cho bài này.';
  if(!markdown.trim())return;
  try{
   parserPromise??=import('./marked.mjs');const {marked}=await parserPromise;
   if(closed||request!==generation)return;
   preview.innerHTML=purifier.sanitize(marked.parse(markdown,{gfm:true,breaks:true}),{FORBID_TAGS:['style','script','img','iframe','object','embed','form','input','button','video','audio','svg','math'],FORBID_ATTR:['style']});
   preview.querySelectorAll('a').forEach(link=>{link.target='_blank';link.rel='noopener noreferrer';});
   preview.querySelectorAll('pre').forEach(pre=>{const wrap=document.createElement('div');wrap.className='code-wrap';const bar=document.createElement('div');bar.className='code-toolbar';const language=document.createElement('span');language.textContent=pre.querySelector('code')?.className.replace('language-','')||'code';const copy=document.createElement('button');copy.className='copy-code';copy.type='button';copy.textContent='Sao chép';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.textContent);copy.textContent='Đã sao chép ✓';}catch{copy.textContent='Chọn code để sao chép';}});bar.append(language,copy);pre.replaceWith(wrap);wrap.append(bar,pre);});
   preview.querySelectorAll('table').forEach(table=>{const wrap=document.createElement('div');wrap.className='table-scroll';table.replaceWith(wrap);wrap.append(table);});
  }catch{parserPromise=null;if(!closed&&request===generation)preview.textContent=markdown+'\n\nChưa tải được trình xem Markdown. Chuyển sang Soạn thảo rồi thử lại.';}
 }
 function choose(index){generation++;tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;dialog.querySelector('#'+tab.getAttribute('aria-controls')).hidden=i!==index;});if(index===1){flush();drawPreview();}}
 function changed(){dirty=true;status.textContent='Đang lưu…';count();clearTimeout(timer);timer=setTimeout(flush,500);}
 editor.addEventListener('input',changed);
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>choose(index));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowLeft'||event.key==='ArrowRight')next=1-index;if(event.key==='Home')next=0;if(event.key==='End')next=1;if(next!==undefined){event.preventDefault();choose(next);tabs[next].focus();}});});
 function format(kind){const result=formatNote(editor.value,editor.selectionStart,editor.selectionEnd,kind);if(result.value.length>NOTE_LIMIT){status.textContent='Ghi chú đã đạt giới hạn. Hãy tải Markdown để sao lưu.';return;}editor.value=result.value;editor.focus();editor.setSelectionRange(result.start,result.end);changed();}
 dialog.querySelectorAll('[data-note-format]').forEach(button=>button.addEventListener('click',()=>format(button.dataset.noteFormat)));
 editor.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='b'){event.preventDefault();format('bold');}if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();flush();}});
 dialog.querySelector('#notebook-lesson').addEventListener('change',event=>{flush();current=Number(event.target.value);load();choose(0);});
 dialog.querySelector('#note-export').addEventListener('click',()=>{flush();const url=URL.createObjectURL(new Blob([editor.value],{type:'text/markdown;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=`so-tay-tuan-${current}.md`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 function onHide(){if(document.hidden)flush();}
 window.addEventListener('pagehide',flush);document.addEventListener('visibilitychange',onHide);
 function close({returnFocus=true}={}){if(closed)return;flush();closed=true;generation++;window.removeEventListener('pagehide',flush);document.removeEventListener('visibilitychange',onHide);dialog.close();dialog.remove();document.body.style.overflow=overflow;toggle?.setAttribute('aria-expanded','false');if(returnFocus&&toggle?.isConnected)toggle.focus({preventScroll:true});closeActive=null;}
 closeActive=close;
 dialog.querySelector('#notebook-close').addEventListener('click',()=>close());
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
 load();document.body.style.overflow='hidden';dialog.showModal();toggle?.setAttribute('aria-expanded','true');editor.focus({preventScroll:true});
}

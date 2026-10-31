const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));


export function renderNotebookDialog(lesson,page,entries){
return `<dialog id="notebook-dialog" class="notes-document" aria-labelledby="notebook-dialog-title"><header class="notes-header"><div><span class="read-meta">Tuần ${esc(lesson?.number || '')} · ${entries.length} ghi chú</span><h1 id="notebook-dialog-title">Sổ tay lỗi</h1></div><button id="notebook-close" class="button">Đóng ✕</button></header><div class="notes-scroll"><nav class="notes-index" aria-label="Các lỗi thường gặp">${entries.map((item,i)=>`<a href="#note-${i}">${i+1}. ${esc(item.title)}</a>`).join('')}</nav><article class="prose notes-content">${entries.length?entries.map((item,i)=>`<section id="note-${i}"><h2>${i+1}. ${esc(item.title)}</h2><h3>Dấu hiệu</h3>${item.symptomHTML}<h3>Mã sai</h3>${code(item.badCode,item.badCodeHTML,item.badLanguage)}<h3>Cách sửa</h3>${code(item.goodCode,item.goodCodeHTML,item.goodLanguage)}<h3>Ghi nhớ</h3>${item.explanationHTML}</section>`).join(''):'<p>Chưa có ghi chú cho tuần này.</p>'}</article></div></dialog>`;
}
function code(value,html,language='text'){return `<div class="code-wrap"><div class="code-toolbar"><span>${esc(language)}</span><button class="copy-code" aria-label="Sao chép code"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></svg>Sao chép</button></div><pre data-language="${esc(language)}"><code class="hljs">${html || esc(value)}</code></pre></div>`;}
export function getLessonPitfalls(lesson) { return Array.isArray(lesson?.notebook)?lesson.notebook:[]; }

let activeNotebookClose=null;
export function closeNotebookModal(options={}){activeNotebookClose?.(options);}
export function openNotebookModal(lesson,page,purifier){
 closeNotebookModal({returnFocus:false});
 const toggle=document.getElementById('notebook-toggle'),overflow=document.body.style.overflow;
 document.body.insertAdjacentHTML('beforeend',purifier.sanitize(renderNotebookDialog(lesson,page,getLessonPitfalls(lesson)),{ADD_TAGS:['dialog'],FORBID_TAGS:['style','form','input','iframe','img','video','audio','object','embed']}));
 const dialog=document.getElementById('notebook-dialog');let closed=false;
 function close({returnFocus=true}={}){if(closed)return;closed=true;dialog.close();dialog.remove();document.body.style.overflow=overflow;toggle?.setAttribute('aria-expanded','false');if(returnFocus&&toggle?.isConnected)toggle.focus({preventScroll:true});activeNotebookClose=null;}
 activeNotebookClose=close;
 dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
 dialog.addEventListener('click',async event=>{
 if(event.target.closest('#notebook-close')){close();return;}
 if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();return;}
 const link=event.target.closest('a');if(link?.getAttribute('href')?.startsWith('#note-')){event.preventDefault();dialog.querySelector(link.getAttribute('href'))?.scrollIntoView({block:'start'});return;}
 if(link?.hash.startsWith('#/'))close({returnFocus:false});

 });
 document.body.style.overflow='hidden';dialog.showModal();toggle?.setAttribute('aria-expanded','true');dialog.querySelector('#notebook-close').focus({preventScroll:true});
}

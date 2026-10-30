import DOMPurify from './purify.mjs';

const $ = selector => document.querySelector(selector);
const icons = {
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon:'<path d="M20 14A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z"/>',
  book:'<path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  left:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  circle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  github:'<path d="M9 19c-4 1-4-2-6-2m12 5v-3.5c0-1 .1-1.5-.5-2 3.5-.4 7-1.7 7-7A5.4 5.4 0 0 0 20 6c.2-1 .2-2.5-.5-4 0 0-1.3-.4-4 1.5a14 14 0 0 0-7 0C6 1.6 4.5 2 4.5 2 3.8 3.5 3.8 5 4 6a5.4 5.4 0 0 0-1.5 3.5c0 5.3 3.5 6.6 7 7-.6.5-.5 1-.5 2V22"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.book}</svg>`;
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
const slug = text => normalize(text).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const base = new URL('./', location.href);
const route = id => `#/${id}`;
const label = type => type === 'theory' ? 'Lý thuyết' : 'Bài tập';
const storage = { get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} } };
let data, pages = [], currentId = '', routeVersion = 0, observer, toastTimer;
const savedCompletions = () => { const saved=storage.get('hit-completed',[]); return new Set(Array.isArray(saved)?saved.filter(value=>typeof value==='string'):[]); };
let completed = savedCompletions();
function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2500); }
function footer() { return '<footer class="page-footer"><span>Được xây dựng với tinh thần <strong>HIT.</strong></span><span>Web Private · 2026</span></footer>'; }
function sidebar() {
  const open = [...document.querySelectorAll('.side-lesson[open]')].map(el => +el.dataset.number);
  const lessons = [...data.lessons].sort((a,b) => a.number-b.number);
  $('#sidebar').innerHTML = `<a class="side-home ${!currentId?'active':''}" href="#/">${icon('home')}Tổng quan khóa học</a><div class="side-label">Nội dung khóa học</div>` + lessons.map((lesson,index) => {
    const current = lesson.pages.some(page => page.id === currentId);
    return `<details class="side-lesson ${current?'current':''}" data-number="${lesson.number}" style="--side-delay:${Math.min(index*18,180)}ms" ${current || open.includes(lesson.number)?'open':''}>
      <summary><span class="side-title">Tuần ${lesson.number}</span>${icon('chevron')}</summary>
      <div class="side-documents">${lesson.pages.length ? lesson.pages.map(page => `<a class="side-link ${page.id===currentId?'active':''}" ${page.id===currentId?'aria-current="page"':''} href="${route(page.id)}">${icon(completed.has(page.id)?'check':page.type==='theory'?'book':'code')}${label(page.type)}</a>`).join('') : '<div class="side-empty">Sắp cập nhật tài liệu</div>'}</div>
    </details>`;
  }).join('') + '<div class="side-footer"><strong>HIT</strong> · CLB Tin học<br>Học cùng nhau. Phát triển cùng nhau.</div>';
}
function home() {
  document.title = 'Lộ trình khóa học · HIT';
  const lessons = [...data.lessons].sort((a,b) => a.number-b.number);
  $('#main').innerHTML = `<div class="home roadmap-page">
    <header class="roadmap-header">
      <div class="eyebrow">Web Private 2026</div>
      <h1>Lộ trình khóa học</h1>
      <p>${lessons.length} buổi học · HTML, CSS và JavaScript</p>
    </header>
    ${!lessons.length?'<section class="empty-state"><h2>Chưa có buổi học</h2><p>Tài liệu đang được chuẩn bị. Bạn có thể quay lại sau.</p></section>':''}
    <ol class="roadmap" aria-label="Lộ trình các buổi học">
      ${lessons.map(lesson => {
        const done = lesson.pages.length > 0 && lesson.pages.every(page => completed.has(page.id));
        return `<li class="roadmap-step ${lesson.pages.length ? 'available' : ''} ${done ? 'done' : ''}">
          <span class="roadmap-marker" aria-hidden="true">${done ? icon('check') : String(lesson.number).padStart(2,'0')}</span>
          <article class="roadmap-content">
            <div class="roadmap-meta">Buổi ${lesson.number}${done ? '<span>Đã hoàn thành</span>' : ''}</div>
            <h2>${esc(lesson.title)}</h2>
            ${lesson.pages.length ? `<nav class="roadmap-links" aria-label="Tài liệu buổi ${lesson.number}">
              ${lesson.pages.map(page => `<a href="${route(page.id)}" aria-label="${label(page.type)} buổi ${lesson.number}">${icon(page.type === 'theory' ? 'book' : 'code')}${label(page.type)}${icon('arrow')}</a>`).join('')}
            </nav>` : '<p class="roadmap-pending">Sắp cập nhật tài liệu</p>'}
          </article>
        </li>`;
      }).join('')}
    </ol>
    ${footer()}
  </div>`;
}

function prepareArticle(page) {
  const article = document.createElement('article'); article.className = 'prose';
  article.innerHTML = DOMPurify.sanitize(page.html, { ADD_ATTR:['data-language'], FORBID_TAGS:['style','form','input','button','textarea','select'], FORBID_ATTR:['style'] });
  const used = new Map();
  const headings = [];
  for (const heading of article.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const title = heading.textContent;
    const stem = slug(title) || 'section'; const count = used.get(stem) || 0; used.set(stem, count+1);
    heading.id = stem + (count?`-${count}`:'');
    const a = document.createElement('a'); a.className = 'heading-anchor'; a.href = `${route(page.id)}?section=${heading.id}`; a.textContent = title;
    heading.replaceChildren(a);
    if (['H2','H3'].includes(heading.tagName)) headings.push({ id:heading.id, title, depth:heading.tagName.slice(1) });
  }
  for (const link of article.querySelectorAll('a:not(.heading-anchor)')) {
    const href = link.getAttribute('href'); if (!href) continue;
    if (href.startsWith('#')) { link.href = `${route(page.id)}?section=${encodeURIComponent(decodeURIComponent(href.slice(1)))}`; continue; }
    const resolved = new URL(href, new URL(page.source, base));
    if (resolved.origin === base.origin && resolved.pathname.startsWith(base.pathname)) {
      const relative = decodeURIComponent(resolved.pathname.slice(base.pathname.length));
      if (/\.md$/i.test(relative)) link.href = `${route(relative.replace(/\.md$/i,''))}${resolved.hash?`?section=${encodeURIComponent(resolved.hash.slice(1))}`:''}`;
      else link.href = resolved.href;
    } else if (/^https?:$/.test(resolved.protocol)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  }
  for (const img of article.querySelectorAll('img')) {
    const src = img.getAttribute('src');
    const size = page.images?.[src];
    if (size) { img.width=size.width; img.height=size.height; }
    const paragraph=img.parentElement;
    const standalone=paragraph.tagName==='P' && paragraph.children.length===1 && !paragraph.textContent.trim();
    const frame=document.createElement(standalone?'figure':'span'); frame.className='image-frame';
    const button=document.createElement('button'); button.type='button'; button.className='image-open';
    button.setAttribute('aria-label',`Phóng lớn ảnh: ${img.alt || 'Ảnh minh họa'}`); button.setAttribute('aria-haspopup','dialog');
    const fallback=document.createElement(standalone?'figcaption':'span'); fallback.className='image-error'; fallback.hidden=true;
    const message=document.createElement('span'); message.textContent=`Không tải được ảnh${img.alt?`: ${img.alt}`:'.'}`;
    const retry=document.createElement('button'); retry.type='button'; retry.className='image-retry'; retry.textContent='Thử tải lại ảnh';
    retry.addEventListener('click',()=>{fallback.hidden=true;button.hidden=false;img.src=new URL(src,new URL(page.source,base)).href;});
    fallback.append(message,retry);
    img.addEventListener('error',()=>{button.hidden=true;fallback.hidden=false;});
    if(standalone)paragraph.replaceWith(frame);else img.replaceWith(frame);
    button.append(img); frame.append(button,fallback);
    img.loading='lazy'; img.decoding='async';
    if(src)img.src=new URL(src,new URL(page.source,base)).href;
  }
  for (const table of article.querySelectorAll('table')) {
    const wrap = document.createElement('div'); wrap.className='table-scroll'; wrap.tabIndex=0; wrap.setAttribute('role','region'); wrap.setAttribute('aria-label','Bảng nội dung, có thể cuộn ngang'); table.replaceWith(wrap); wrap.append(table);
  }
  for (const pre of article.querySelectorAll('pre')) {
    const wrap = document.createElement('div'); wrap.className='code-wrap';
    const toolbar = document.createElement('div'); toolbar.className='code-toolbar'; toolbar.innerHTML=`<span>${esc(pre.dataset.language || 'code')}</span><button class="copy-code" aria-label="Sao chép đoạn code">${icon('copy')}Sao chép</button>`;
    pre.replaceWith(wrap); wrap.append(toolbar, pre);
  }
  return { article, headings };
}
function reader(page) {
  const lesson = data.lessons.find(l => l.pages.some(p=>p.id===page.id));
  const {article,headings} = prepareArticle(page);
  const tocLinks = headings.map(h => `<a href="${route(page.id)}?section=${h.id}" class="depth-${h.depth}" data-section="${h.id}">${esc(h.title)}</a>`).join('');
  const index = pages.indexOf(page), prev = pages[index-1], next = pages[index+1];
  document.title = `${page.title} · HIT`;
  storage.set('hit-last',page.id);
  $('#main').innerHTML = `<div class="reader"><div class="reader-main"><nav class="breadcrumb" aria-label="Đường dẫn"><a href="#/">Khóa học</a>${icon('chevron')}<span>Buổi ${lesson.number}</span>${icon('chevron')}<span>${label(page.type)}</span></nav><nav class="tabs" aria-label="Tài liệu buổi ${lesson.number}">${['theory','homework'].map(type => { const p = lesson.pages.find(p=>p.type===type); return p?`<a class="tab ${type===page.type?'active':''}" ${type===page.type?'aria-current="page"':''} href="${route(p.id)}">${icon(type==='theory'?'book':'code')}${label(type)}</a>`:`<span class="tab disabled" title="Sắp cập nhật">${icon(type==='theory'?'book':'code')}${label(type)} · Chưa có</span>`; }).join('')}</nav>${headings.length?`<details class="mobile-toc"><summary>Trong bài này</summary><nav aria-label="Mục lục thu gọn">${tocLinks}</nav></details>`:''}<div class="read-meta">${icon('clock')}${page.minutes} phút đọc<span>·</span>Buổi ${lesson.number}</div><div id="article-slot"></div><section class="reader-actions"><button class="button complete-button ${completed.has(page.id)?'done':''}" id="complete" aria-pressed="${completed.has(page.id)}">${icon('circle')}<span>${completed.has(page.id)?'Đã hoàn thành bài học':'Đánh dấu đã hoàn thành'}</span></button><nav class="pagination" aria-label="Bài trước và bài sau">${prev?`<a href="${route(prev.id)}">${icon('left')}<span><small>BÀI TRƯỚC</small>${esc(prev.title)}</span></a>`:''}${next?`<a href="${route(next.id)}"><span><small>TIẾP THEO</small>${esc(next.title)}</span>${icon('arrow')}</a>`:''}</nav></section>${footer()}</div><aside class="toc" aria-label="Mục lục bài học"><p class="toc-label">TRONG BÀI NÀY</p><nav class="toc-links">${tocLinks || '<p class="toc-tip">Bài học chưa có mục con.</p>'}</nav><div class="toc-tip">Học một chút mỗi ngày.<br>Tiến bộ qua từng dòng code.<a href="${new URL(page.source,base).href}" target="_blank" rel="noopener">Xem bản Markdown ↗</a></div></aside></div>`;
  $('#article-slot').replaceWith(article);
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
    if (!visible.length) return;
    document.querySelectorAll('.toc-links a').forEach(a=>{const active = a.dataset.section===visible[0].target.id; a.classList.toggle('active',active); if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }, { rootMargin:'-100px 0px -55% 0px', threshold:0 });
  article.querySelectorAll('h2,h3').forEach(h=>observer.observe(h));
}
function parseRoute() { const [path,query=''] = location.hash.slice(1).split('?'); return { id:decodeURIComponent((path || '/').replace(/^\//,'')), section:new URLSearchParams(query).get('section') }; }
function scrollSection(section) {
  if (!section) return;
  const heading = document.getElementById(section) || document.getElementById(slug(section));
  const mobileToc=document.querySelector('.mobile-toc');
  if(heading && mobileToc?.open)mobileToc.open=false;
  if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  heading?.scrollIntoView({ behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth', block:'start' });
}
function errorPage(message) {
  $('#main').innerHTML = `<section class="error-page"><div class="eyebrow">HIT · Tài liệu</div><h1>${data?'Chưa thể mở bài học':'Không tải được tài liệu'}</h1><p role="alert">${esc(message)}</p><button id="retry" class="button primary">Thử lại</button>${data?'<a class="button" href="#/">Về trang chủ</a>':''}</section>`;
  $('#main').focus({preventScroll:true});
}
function render({ force=false, preserve=false }={}) {
  if (!data) return;
  let parsed;
  try { parsed = parseRoute(); } catch { errorPage('Đường dẫn không hợp lệ.'); return; }
  const {id,section} = parsed;
  if (id===currentId && section && !force) { scrollSection(section); return; }
  const y=window.scrollY; currentId=id; observer?.disconnect();
  try {
    if (!id || id==='README') home();
    else { const page=pages.find(p=>p.id===id); if(page)reader(page);else errorPage('Bài học chưa tồn tại hoặc chưa có nội dung.'); }
  } catch(error) { console.error(error); errorPage('Nội dung chưa thể hiển thị. Vui lòng thử lại.'); }
  sidebar(); closeMenu(false);
  if (!preserve) { window.scrollTo(0,0); $('#main').focus({preventScroll:true}); }
  else window.scrollTo(0,y);
  requestAnimationFrame(()=>scrollSection(section));
}
async function loadContent(preserve=false) {
  const version=++routeVersion;
  $('#main').setAttribute('aria-busy','true');
  try {
    const response=await fetch(new URL('content.json',base),{cache:'no-store'});
    if(!response.ok)throw new Error('HTTP '+response.status);
    const incoming=await response.json(); if(version!==routeVersion)return;
    data=incoming; pages=data.lessons.flatMap(l=>l.pages); render({force:true,preserve});
  } catch(error) { console.error(error); errorPage('Không tải được tài liệu. Hãy kiểm tra kết nối rồi thử lại.'); }
  finally { if(version===routeVersion)$('#main').setAttribute('aria-busy','false'); }
}
function closeMenu(returnFocus=true) {
  const wasOpen=$('#sidebar').classList.contains('open');
  $('#sidebar').classList.remove('open'); $('#backdrop').hidden=true; $('#menu-toggle').setAttribute('aria-expanded','false');
  document.body.style.overflow='';
  if(wasOpen && returnFocus)$('#menu-toggle').focus();
  syncSidebarAccess();
}
function syncSidebarAccess(){
  const mobile=matchMedia('(max-width: 767px)').matches;
  const open=$('#sidebar').classList.contains('open');
  $('#sidebar').inert=mobile&&!open;
  $('#sidebar').setAttribute('aria-hidden',String(mobile&&!open));
  $('#main').inert=mobile&&open;
  document.querySelectorAll('.header > :not(#menu-toggle)').forEach(element=>{element.inert=mobile&&open;});
  if(mobile&&open)$('#main').setAttribute('aria-hidden','true');else $('#main').removeAttribute('aria-hidden');
}
function toggleMenu() {
  if($('#sidebar').classList.contains('open')){closeMenu();return;}
  $('#sidebar').classList.add('open'); $('#backdrop').hidden=false; $('#menu-toggle').setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden'; syncSidebarAccess(); $('#sidebar a')?.focus();
}
function search() {
  if(!pages.length){
    $('#search-summary').textContent='Chưa có tài liệu để tìm kiếm';
    $('#search-results').innerHTML='<p class="search-summary">Tài liệu đang được chuẩn bị. Bạn có thể quay lại sau.</p>';
    return;
  }
  const q=normalize($('#search-input').value.trim());
  const terms=q.split(/\s+/).filter(Boolean);
  const results=pages.filter(p=>{const hay=normalize(`${p.title} ${p.text}`);return terms.every(t=>hay.includes(t));});
  $('#search-summary').textContent=q?`${results.length} kết quả cho “${$('#search-input').value.trim()}”`:'Khám phá các tài liệu hiện có';
  $('#search-results').innerHTML=results.map(p=>{
    const text=p.text; const pos=q?Math.max(0,normalize(text).indexOf(terms[0])-45):0;
    return `<a class="search-result" href="${route(p.id)}"><small>BUỔI ${p.id.match(/\d+/)[0]} · ${label(p.type).toUpperCase()}</small><strong>${esc(p.title)}</strong><p>${pos?'…':''}${esc(text.slice(pos,pos+160))}…</p></a>`;
  }).join('') || '<p class="search-summary">Thử một từ khóa khác, ví dụ: HTML, selector hoặc Git.</p>';
}
function openSearch(){ if(!data){toast('Tài liệu đang tải, vui lòng thử lại.');return;}closeMenu(false);$('#search-dialog').showModal();search();$('#search-input').focus(); }
function updateThemeButton(){ const dark=document.documentElement.dataset.theme==='dark'; $('#theme-toggle').innerHTML=icon(dark?'sun':'moon'); $('#theme-toggle').setAttribute('aria-label',dark?'Chuyển sang giao diện sáng':'Chuyển sang giao diện tối'); }
$('#menu-toggle').innerHTML=icon('menu'); $('#search-open').insertAdjacentHTML('afterbegin',icon('search')); $('.header-github').innerHTML=icon('github');
$('.skip').addEventListener('click', e=>{e.preventDefault();$('#main').focus();window.scrollTo(0,0);});
updateThemeButton(); syncSidebarAccess();
$('#theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('hit-theme',theme);}catch{}updateThemeButton();});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{let saved;try{saved=localStorage.getItem('hit-theme');}catch{}if(!saved){document.documentElement.dataset.theme=e.matches?'dark':'light';updateThemeButton();}});
$('#menu-toggle').addEventListener('click',toggleMenu); $('#backdrop').addEventListener('click',()=>closeMenu());
matchMedia('(max-width: 767px)').addEventListener('change',()=>closeMenu(false));
$('#search-open').addEventListener('click',openSearch); $('#search-input').addEventListener('input',search);
$('#search-dialog form').addEventListener('submit',e=>{if(!e.submitter)e.preventDefault();});
$('#search-results').addEventListener('click',e=>{if(e.target.closest('a')){$('#search-dialog').close();if(e.target.closest('a').hash===location.hash)$('#main').focus();}});
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#image-dialog button').addEventListener('click',()=>$('#image-dialog').close());
function openImage(img){const dialog=$('#image-dialog');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.showModal();}
$('#main').addEventListener('click',async e=>{
  if(e.target.closest('#retry')){loadContent();return;}
  if(e.target.closest('#complete')){if(completed.has(currentId))completed.delete(currentId);else completed.add(currentId);storage.set('hit-completed',[...completed]);const button=$('#complete');button.classList.toggle('done',completed.has(currentId));button.setAttribute('aria-pressed',completed.has(currentId));button.querySelector('span').textContent=completed.has(currentId)?'Đã hoàn thành bài học':'Đánh dấu đã hoàn thành';sidebar();syncSidebarAccess();toast(completed.has(currentId)?'Đã lưu tiến độ học tập':'Đã bỏ đánh dấu hoàn thành');return;}
  const copy=e.target.closest('.copy-code');if(copy){try{await navigator.clipboard.writeText(copy.closest('.code-wrap').querySelector('code')?.textContent || '');toast('Đã sao chép đoạn code');}catch{toast('Chưa sao chép được. Bạn có thể chọn code để sao chép.');}return;}
  const imageButton=e.target.closest('.image-open');if(imageButton)openImage(imageButton.querySelector('img'));
});
document.addEventListener('click', e=>{
  const summary=e.target.closest('.side-lesson > summary,.mobile-toc > summary');
  if(!summary || matchMedia('(prefers-reduced-motion: reduce)').matches || typeof summary.animate!=='function')return;
  e.preventDefault();
  const details=summary.parentElement;
  if(typeof details.getAnimations==='function' && details.getAnimations().length)return;
  const closing=details.open, start=details.offsetHeight;
  if(!closing)details.open=true;
  const end=closing?summary.offsetHeight:details.offsetHeight;
  details.style.overflow='hidden';
  const animation=details.animate({height:[`${start}px`,`${end}px`]}, {duration:200,easing:'ease-out'});
  animation.onfinish=()=>{details.open=!closing;details.style.overflow='';};
  animation.oncancel=()=>{details.style.overflow='';};
});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!$('#search-dialog').open)openSearch();}
  if(e.key==='Escape'&&$('#sidebar').classList.contains('open'))closeMenu();
  if(e.key==='Tab'&&$('#sidebar').classList.contains('open')){
    const items=[$('#menu-toggle'),...$('#sidebar').querySelectorAll('a,summary')].filter(el=>el.getClientRects().length);
    const first=items[0],last=items.at(-1);
    if(!e.shiftKey&&document.activeElement===first){e.preventDefault();items[1]?.focus();}
    else if(e.shiftKey&&document.activeElement===items[1]){e.preventDefault();first.focus();}
    else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});
window.addEventListener('hashchange',()=>render());
window.addEventListener('storage',e=>{if(e.key==='hit-completed'){completed=savedCompletions();render({force:true,preserve:true});}if(e.key==='hit-theme'&&e.newValue){document.documentElement.dataset.theme=e.newValue;updateThemeButton();}});
loadContent();
if(document.querySelector('meta[name="hit-preview"]')){
  const events=new EventSource(new URL('__events',base));
  events.onmessage=()=>{loadContent(true);toast('Tài liệu đã cập nhật');};
}

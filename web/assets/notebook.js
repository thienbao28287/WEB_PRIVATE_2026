const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/**
 * Render nội dung một trang giấy vở kẻ ô (Lined Paper Page)
 */
function renderSinglePage(item, pageIndex, totalPages, lessonTitle, side = 'left') {
  if (!item) return `<div class="notebook-page-surface lined-paper"><div class="paper-content"><p>Bạn đã đọc hết ghi chú của tuần này.</p></div></div>`;
  return `
    <div class="notebook-page-surface lined-paper ${side === 'left' ? 'paper-left' : 'paper-right'}">
      <div class="paper-margin-line" aria-hidden="true"></div>
      
      <header class="paper-header">
        <div class="paper-header-brand">
          <span class="paper-brand-logo">▲</span>
          <div class="paper-brand-text">
            <strong>HIT WEBSPACE</strong>
            <small>way towards clean code</small>
          </div>
        </div>
        <div class="paper-header-date">
          <span>Date:</span> <span class="date-dots">..... / ..... / 2026</span>
        </div>
      </header>

      <div class="paper-content">
        <article class="notebook-entry" data-id="${esc(item.id)}">
          <div class="paper-entry-header">
            <div class="paper-tag-row">
              <span class="paper-badge-num">LỖI #${pageIndex}</span>
              <span class="paper-badge-tag">${esc(item.tag)}</span>
            </div>
            <h3 class="paper-entry-title">${esc(item.title)}</h3>
          </div>

          <div class="paper-symptom-box">
            <span class="symptom-pen-mark">⚠️</span>
            <div class="notebook-entry-symptom"><strong>Dấu hiệu:</strong> ${item.symptomHTML || esc(item.symptom)}</div>
          </div>

          <div class="notebook-comparison paper-code-grid">
            <div class="code-box code-box-bad paper-memo-bad">
              <div class="code-box-header">
                <span class="memo-tape" aria-hidden="true"></span>
                <span class="code-status-badge badge-bad">❌ Mã SAI / LỖI</span>
                <button class="copy-code-mini" data-code="${esc(item.badCode)}" aria-label="Sao chép mã lỗi">Sao chép</button>
              </div>
              <pre class="code-snippet"><code>${esc(item.badCode)}</code></pre>
            </div>

            <div class="code-box code-box-good paper-memo-good">
              <div class="code-box-header">
                <span class="memo-tape" aria-hidden="true"></span>
                <span class="code-status-badge badge-good">✅ Cách sửa ĐÚNG</span>
                <button class="copy-code-mini" data-code="${esc(item.goodCode)}" aria-label="Sao chép mã chuẩn">Sao chép</button>
              </div>
              <pre class="code-snippet"><code>${esc(item.goodCode)}</code></pre>
            </div>
          </div>

          <div class="notebook-entry-footer paper-note-callout">
            <span class="bulb-icon" aria-hidden="true">💡</span>
            <div><strong>Ghi nhớ:</strong> ${item.explanationHTML || esc(item.explanation)}</div>
          </div>
        </article>
      </div>

      <footer class="paper-footer">
        <span class="paper-topic-hint">${esc(lessonTitle)}</span>
        <span class="paper-page-num">${pageIndex}</span>
      </footer>
    </div>
  `;
}

/**
 * Render toàn bộ cuốn sổ tay lò xo 2 trang (Two-Page Open Notebook)
 */
export function renderNotebookDialog(lesson, page, pitfalls) {
  const lessonTitle = lesson ? `Tuần ${lesson.number} · ${lesson.title}` : 'Bài học';
  const totalItems = pitfalls.length;
  // Mỗi Spread chứa 2 lỗi (Trang trái & Trang phải)
  const totalSpreads = Math.ceil(totalItems / 2);

  return `
  <dialog id="notebook-dialog" class="notebook-dialog shadcn-dialog notebook-spiral-dialog" aria-labelledby="notebook-dialog-title" aria-modal="true">
    <!-- Khung điều khiển trên cùng -->
    <div class="notebook-top-bar">
      <div class="notebook-top-info">
        <span class="spiral-indicator-icon">📖</span>
        <h2 id="notebook-dialog-title" class="notebook-top-title">
          Sổ tay lỗi · Tuần ${esc(lesson?.number || '')}
        </h2>
        <span class="page-spread-counter" id="page-spread-counter">Trang 1-2 / ${Math.max(2, totalItems)}</span>
      </div>
      
      <div class="notebook-top-actions">
        <button id="flip-prev-btn" class="notebook-flip-btn" title="Lật về trang trước" aria-label="Trang trước" disabled>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="m15 18-6-6 6-6"/></svg>
          <span>Trang trước</span>
        </button>
        <button id="flip-next-btn" class="notebook-flip-btn primary-flip" title="Lật trang tiếp (hoặc click vào trang phải)" aria-label="Lật trang tiếp">
          <span>Lật trang tiếp</span>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button id="notebook-close" class="notebook-close-circle" aria-label="Đóng sổ tay (Phím Esc)">
          ✕
        </button>
      </div>
    </div>

    <!-- Cuốn sổ mở đôi dạng lò xo 3D -->
    <div class="notebook-book shadcn-sheet open-spiral-notebook" id="open-spiral-notebook" data-current-spread="0" data-total-spreads="${totalSpreads}">
      <!-- Bìa nền giả lập bàn gỗ mờ sang trọng -->
      <div class="notebook-desk-mat" aria-hidden="true"></div>

      <!-- Khung 3D Perspective -->
      <div class="notebook-3d-stage">
        
        <!-- TRANG TRÁI DƯỚI (Left Page Underneath) -->
        <div class="notebook-spread-side spread-left" id="spread-left-container">
          ${renderSinglePage(pitfalls[0], 1, totalItems, lessonTitle, 'left')}
        </div>

        <!-- GÁY XOẮN LÒ XO KIM LOẠI ĐÔI Ở CHÍNH GIỮA (Center Double Wire Spiral) -->
        <div class="notebook-spine notebook-spine-center" aria-hidden="true">
          <div class="notebook-rings-double">
            ${Array.from({ length: 16 }).map(() => `
              <div class="spiral-wire-loop">
                <span class="hole hole-left"></span>
                <span class="wire-curve"></span>
                <span class="hole hole-right"></span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TỜ GIẤY LẬT 3D TỪ PHẢI SANG TRÁI (Flipping Page 3D) -->
        <div class="notebook-flipping-sheet" id="notebook-flipping-sheet" aria-hidden="true">
          <div class="flipping-face flipping-front" id="flipping-front">
            ${renderSinglePage(pitfalls[1], 2, totalItems, lessonTitle, 'right')}
          </div>
          <div class="flipping-face flipping-back" id="flipping-back">
            ${renderSinglePage(pitfalls[2], 3, totalItems, lessonTitle, 'left')}
          </div>
        </div>

        <!-- TRANG PHẢI DƯỚI (Right Page Underneath) -->
        <div class="notebook-spread-side spread-right" id="spread-right-container" >
          ${renderSinglePage(pitfalls[1], 2, totalItems, lessonTitle, 'right')}
          <!-- Góc gấp trang gợi ý lật (Dog-ear curl) -->
          <div class="page-curl-corner" aria-hidden="true">
            <span class="curl-text">Lật ➔</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Thanh chân trang phụ trợ -->
    <div class="notebook-bottom-hint">
      <span>💡 Dùng nút <strong>Trang trước / Lật trang tiếp</strong> để đọc các ghi chú. Trên điện thoại, mỗi lần hiển thị một trang.</span>
      <button id="notebook-bottom-close" class="notebook-link-close">Đóng sổ</button>
    </div>
  </dialog>
  `;
}

/**
 * Xử lý logic và hoạt ảnh lật trang 3D từ phải sang trái
 */

export function getLessonPitfalls(lesson) { return Array.isArray(lesson?.notebook)?lesson.notebook:[]; }
export function notebookWindow(count,index=0,single=false){
  const step=single?1:2;
  const start=Math.min(Math.max(0,Math.floor(index/step)*step),Math.max(0,Math.floor((count-1)/step)*step));
  return {start,step,end:Math.min(count,start+step),previous:start>0,next:start+step<count};
}
let activeNotebookClose=null;
export function closeNotebookModal(options={}){activeNotebookClose?.(options);}
export function openNotebookModal(lesson,page,purifier) {
  closeNotebookModal({returnFocus:false});
  const pitfalls=getLessonPitfalls(lesson);
  const originalOverflow=document.body.style.overflow;
  const toggle=document.getElementById('notebook-toggle');
  const clean=html=>purifier.sanitize(html,{ADD_TAGS:['dialog'],FORBID_TAGS:['style','form','input','iframe','img','video','audio','object','embed']});
  document.body.insertAdjacentHTML('beforeend',clean(renderNotebookDialog(lesson,page,pitfalls)));
  const dialog=document.getElementById('notebook-dialog');
  const left=dialog.querySelector('#spread-left-container'),right=dialog.querySelector('#spread-right-container');
  const sheet=dialog.querySelector('#notebook-flipping-sheet');
  const prev=dialog.querySelector('#flip-prev-btn'),next=dialog.querySelector('#flip-next-btn');
  const counter=dialog.querySelector('#page-spread-counter');
  const title=`Tuần ${lesson.number} · ${lesson.title}`;
  const mobile=matchMedia('(max-width: 820px)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let index=0,animation=null,generation=0,closed=false;
  const pageHTML=(item,number,side)=>clean(renderSinglePage(item,number,pitfalls.length,title,side));
  function cancelFlip(){generation++;if(animation){animation.cancel();animation=null;}sheet.hidden=true;}
  function paint(){
    const window=notebookWindow(pitfalls.length,index,mobile.matches);index=window.start;
    left.innerHTML=pitfalls.length?pageHTML(pitfalls[index],index+1,'left'):'<div class="notebook-page-surface lined-paper"><p>Chưa có ghi chú lỗi cho tuần này. Thêm nội dung vào notebook.md để cập nhật sổ tay.</p></div>';
    right.innerHTML=pageHTML(pitfalls[index+1],index+2,'right');
    left.scrollTop=0;right.scrollTop=0;
    prev.disabled=!window.previous;next.disabled=!window.next;
    counter.textContent=pitfalls.length?`Trang ${index+1}${window.end>index+1?'–'+window.end:''} / ${pitfalls.length}`:'Chưa có ghi chú';
    counter.setAttribute('aria-live','polite');
    dialog.querySelector('#open-spiral-notebook').dataset.currentSpread=String(index/window.step);
  }
  function turn(direction){
    const window=notebookWindow(pitfalls.length,index,mobile.matches);
    if(direction>0?!window.next:!window.previous)return;
    const old=index;cancelFlip();index+=direction*window.step;paint();
    if(reduced.matches||mobile.matches||typeof sheet.animate!=='function')return;
    sheet.querySelector('#flipping-front').innerHTML=pageHTML(pitfalls[direction>0?old+1:index+1],(direction>0?old:index)+2,'right');
    sheet.querySelector('#flipping-back').innerHTML=pageHTML(pitfalls[direction>0?index:old],(direction>0?index:old)+1,'left');
    sheet.hidden=false;
    const request=generation;
    animation=sheet.animate({transform:direction>0?['rotateY(0deg)','rotateY(-180deg)']:['rotateY(-180deg)','rotateY(0deg)']},{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});
    animation.finished.then(()=>{if(request===generation&&!closed){sheet.hidden=true;animation=null;}},()=>{});
  }
  const layoutChange=()=>{cancelFlip();paint();};
  const motionChange=()=>{if(reduced.matches)cancelFlip();};
  function close({returnFocus=true}={}){
    if(closed)return;closed=true;cancelFlip();
    mobile.removeEventListener('change',layoutChange);reduced.removeEventListener('change',motionChange);
    if(dialog.open)dialog.close();dialog.remove();document.body.style.overflow=originalOverflow;
    toggle?.setAttribute('aria-expanded','false');
    if(returnFocus&&toggle?.isConnected)toggle.focus({preventScroll:true});
    activeNotebookClose=null;
  }
  activeNotebookClose=close;
  mobile.addEventListener('change',layoutChange);reduced.addEventListener('change',motionChange);
  prev.addEventListener('click',()=>turn(-1));next.addEventListener('click',()=>turn(1));
  dialog.addEventListener('click',async event=>{
    if(event.target.closest('#notebook-close,#notebook-bottom-close')){close();return;}
    if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)close();return;}
    const button=event.target.closest('.copy-code-mini');
    if(button){try{await navigator.clipboard.writeText(button.dataset.code||'');if(button.isConnected)button.textContent='Đã sao chép ✓';}catch{if(button.isConnected)button.textContent='Chưa chép được — chọn code để chép';}}
    const link=event.target.closest('a');if(link?.hash.startsWith('#/'))close({returnFocus:false});
  });
  dialog.addEventListener('keydown',event=>{
    if(event.target.closest('input,textarea,select,pre,[contenteditable]')||getSelection()?.toString())return;
    if(event.key==='ArrowRight'){event.preventDefault();turn(1);}
    if(event.key==='ArrowLeft'){event.preventDefault();turn(-1);}
  });
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  sheet.hidden=true;paint();document.body.style.overflow='hidden';dialog.showModal();toggle?.setAttribute('aria-expanded','true');
  dialog.querySelector('#notebook-close').focus({preventScroll:true});
}

import DOMPurify from './purify.mjs';
import {checkAnswers,escapeHTML,previewCode,restoreExercise,exerciseStorageId} from './exercise-model.js';

const storageKey='hit-exercises-v1';
let session={};
const previews=new WeakMap();
export function refreshExerciseThemes(){document.querySelectorAll('.exercise-preview iframe').forEach(frame=>previews.get(frame)?.());}
function readSaved(){
  try {const parsed=JSON.parse(localStorage.getItem(storageKey));if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))session=parsed;}
  catch { /* Continue with in-memory answers if storage is unavailable. */ }
  return session;
}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(session));}catch{}}
function makePreview(exercise,answers,dark){
  const html=DOMPurify.sanitize(previewCode(exercise,answers),{
    ALLOWED_TAGS:['form','fieldset','legend','label','input','p','br','span','button'],
    ALLOWED_ATTR:['for','id','type','name','required','placeholder','minlength','maxlength','value'],
    FORBID_ATTR:['action','formaction','src','style'],
  });
  return `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;padding:20px;font:16px/1.6 system-ui;background:${dark?'#192330':'#fff'};color:${dark?'#e5e7eb':'#374151'}}label{display:block;margin-bottom:8px}input{box-sizing:border-box;max-width:100%;width:100%;font:inherit;padding:10px;border:1px solid #8290a1;border-radius:8px;background:transparent;color:inherit}input:focus-visible{outline:2px solid #F47B2A;outline-offset:2px}fieldset{min-width:0}</style></head><body>${html}</body></html>`;
}

export function mountExercises(article,page){
  for(const marker of article.querySelectorAll('[data-exercise]')){
    const group=page.exercises?.find(group=>group.id===marker.dataset.exercise);
    if(!group){marker.textContent='Bài thực hành chưa tải được. Vui lòng tải lại trang.';continue;}
    const section=document.createElement('section');section.className='exercise-group';
    section.setAttribute('aria-label',group.title);
    section.innerHTML=`<header class="exercise-group-head"><div><p class="exercise-eyebrow">THỬ SỨC NGAY</p><h3>${escapeHTML(group.title)}</h3></div><p class="exercise-progress" aria-live="polite"></p></header><p class="exercise-intro">Điền phần còn thiếu, kiểm tra rồi thử form của bạn. Tiến độ thực hành lưu riêng trên trình duyệt này.</p>`;
    marker.replaceWith(section);
    const states=[];
    const updateProgress=()=>{section.querySelector('.exercise-progress').textContent=`${states.filter(state=>state.completed).length}/${group.exercises.length} bài thực hành hoàn thành`;};
    for(const exercise of group.exercises){
      const key=exerciseStorageId(page.id,group.id,exercise);
      const saved=readSaved()[key];
      const state=restoreExercise(exercise,saved),answers=state.answers;
      states.push(state);
      const prefix=`exercise-${group.id}-${exercise.id}`;
      const card=document.createElement('form');card.className='exercise-card';card.noValidate=true;
      card.setAttribute('aria-labelledby',prefix+'-title');
      const code=exercise.template.split(/(\{\{[a-z][\w-]*\}\})/g).map(part=>{
        const token=part.match(/^\{\{([a-z][\w-]*)\}\}$/);
        if(!token)return escapeHTML(part);
        const field=exercise.fields.find(field=>field.id===token[1]);
        return `<label class="sr-only" for="${prefix}-${field.id}">${escapeHTML(field.label)}</label><input class="exercise-blank" id="${prefix}-${field.id}" name="${field.id}" value="${escapeHTML(answers[field.id])}" maxlength="80" autocomplete="off" spellcheck="false" autocapitalize="none" aria-describedby="${prefix}-${field.id}-feedback" placeholder="điền code">`;
      }).join('');
      card.innerHTML=`<h4 id="${prefix}-title">${escapeHTML(exercise.title)}</h4><p class="exercise-prompt">${escapeHTML(exercise.prompt)}</p><div class="exercise-workspace"><div class="exercise-editor"><p class="exercise-pane-label">CODE CỦA BẠN · HTML</p><div class="exercise-code-scroll"><pre><code>${code}</code></pre></div></div><div class="exercise-preview"><p class="exercise-pane-label">KẾT QUẢ MINH HỌA</p><iframe sandbox="" title="${escapeHTML(exercise.title)} — bản xem trước" referrerpolicy="no-referrer"></iframe><small>Form minh họa, không gửi dữ liệu. Bấm “Xem kết quả” sau khi sửa code.</small></div></div><div class="exercise-buttons"><button type="submit" class="button primary">Kiểm tra</button><button type="button" class="button" data-action="preview">Xem kết quả</button><button type="button" class="button" data-action="hint">Gợi ý (0/2)</button><button type="button" class="button" data-action="reset">Làm lại</button></div><div class="exercise-feedback" aria-live="polite"><p class="exercise-result"></p>${exercise.fields.map(field=>`<p id="${prefix}-${field.id}-feedback" class="exercise-field-feedback"></p>`).join('')}</div><ol class="exercise-hints" aria-live="polite" hidden></ol>`;
      section.append(card);
      let hints=0;
      const result=card.querySelector('.exercise-result');
      const save=()=>{session[key]={answers:{...answers},completed:state.completed};persist();updateProgress();};
      const preview=()=>{card.querySelector('iframe').srcdoc=makePreview(exercise,answers,document.documentElement.dataset.theme==='dark');};
      previews.set(card.querySelector('iframe'),preview);
      const clearFeedback=()=>{
        card.querySelectorAll('.exercise-field-feedback').forEach(node=>node.textContent='');
        card.querySelectorAll('input').forEach(input=>input.removeAttribute('aria-invalid'));
        card.classList.remove('exercise-passed');
      };
      const showResults=()=>{
        const checks=checkAnswers(exercise,answers);state.completed=checks.every(item=>item.ok);
        card.classList.toggle('exercise-passed',state.completed);
        checks.forEach(check=>{
          const field=exercise.fields.find(field=>field.id===check.id);
          card.querySelector(`[name="${check.id}"]`).setAttribute('aria-invalid',String(!check.ok));
          const feedback=card.querySelector(`#${prefix}-${check.id}-feedback`);
          feedback.textContent=`${field.label}: ${check.ok?check.message:'✕ '+check.message}`;
          feedback.dataset.correct=String(check.ok);
        });
        result.textContent=state.completed?`✓ Hoàn thành. ${exercise.explanation}`:'Chưa đúng hoàn toàn. Xem hướng dẫn cho từng ô hoặc mở gợi ý.';
        save();
        const firstWrong=checks.find(check=>!check.ok);
        if(firstWrong)card.querySelector(`[name="${firstWrong.id}"]`).focus();
      };
      card.addEventListener('submit',event=>{event.preventDefault();showResults();});
      card.addEventListener('input',event=>{
        const field=exercise.fields.find(field=>field.id===event.target.name);if(!field)return;
        answers[field.id]=event.target.value;state.completed=false;clearFeedback();
        result.textContent='Đã sửa code. Bấm “Kiểm tra” để chấm lại; “Xem kết quả” để cập nhật form.';save();
      });
      card.addEventListener('click',event=>{
        const action=event.target.closest('[data-action]')?.dataset.action;
        if(action==='preview'){preview();result.textContent='Đã cập nhật bản xem trước. Chưa chấm lại đáp án.';}
        if(action==='hint'&&hints<2){
          const list=card.querySelector('.exercise-hints');list.hidden=false;
          const li=document.createElement('li');li.textContent=exercise.hints[hints++];list.append(li);
          const button=card.querySelector('[data-action="hint"]');button.textContent=`Gợi ý (${hints}/2)`;button.disabled=hints===2;
        }
        if(action==='reset'){
          exercise.fields.forEach(field=>{answers[field.id]='';card.querySelector(`[name="${field.id}"]`).value='';});
          hints=0;state.completed=false;clearFeedback();
          const list=card.querySelector('.exercise-hints');list.replaceChildren();list.hidden=true;
          const hint=card.querySelector('[data-action="hint"]');hint.disabled=false;hint.textContent='Gợi ý (0/2)';
          result.textContent='Đã làm lại bài thực hành này.';save();preview();
        }
      });
      preview();
      if(state.completed)showResults();
    }
    updateProgress();
  }
}

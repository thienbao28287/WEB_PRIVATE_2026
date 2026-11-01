import {headingSlug,newQuizState,restoreQuizState,checkQuizAnswer,nextQuizQuestion,quizResult,retryQuiz,quizStorageKey} from './quiz-model.js';
export {headingSlug};
const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sessions=new Map();
export function mountQuiz(article,page,purifier,onReviewSection){
 const quiz=page.quiz;if(!quiz?.questions?.length)return;
 const clean=html=>purifier.sanitize(html,{FORBID_TAGS:['style','script','form','input','button','iframe','object','embed','img','video','audio','svg','math'],FORBID_ATTR:['style']});
 const key=quizStorageKey(page.id,quiz);let state;
 if(sessions.has(key))state=restoreQuizState(quiz,sessions.get(key));
 else try{state=restoreQuizState(quiz,JSON.parse(localStorage.getItem(key)));}catch{state=newQuizState(quiz);}
 const section=document.createElement('section');section.className='lesson-quiz';section.setAttribute('aria-labelledby','lesson-quiz-title');
 section.innerHTML=`<header class="lesson-quiz-head"><p class="quiz-eyebrow">CỦNG CỐ KIẾN THỨC</p><h2 id="lesson-quiz-title">${esc(quiz.title)}</h2><p class="quiz-description">${quiz.questions.length} câu hỏi · Không giới hạn thời gian</p></header><div class="quiz-stage"></div><p class="quiz-storage-status" role="status"></p>`;
 article.append(section);
 section.addEventListener('click',event=>{
  const link=event.target.closest('a[data-quiz-review]');
  if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  // A repeated click on the same anchor does not emit hashchange.
  if(location.hash===link.hash){event.preventDefault();onReviewSection?.(new URLSearchParams(link.hash.split('?')[1]).get('section'));}
 });
 const stage=section.querySelector('.quiz-stage'),storageStatus=section.querySelector('.quiz-storage-status');
 function save(){sessions.set(key,structuredClone(state));try{localStorage.setItem(key,JSON.stringify(state));storageStatus.textContent='Tiến độ quiz lưu riêng trên trình duyệt này.';}catch{storageStatus.textContent='Chưa lưu được trên trình duyệt. Tiến độ đang giữ trong phiên này.';}}
 function focus(selector){stage.querySelector(selector)?.focus({preventScroll:true});}
 function render(moveFocus=false){
  if(state.position>=state.queue.length){summary(moveFocus);return;}
  const question=quiz.questions.find(q=>q.id===state.queue[state.position]),correct=state.selected===question.correct;
  stage.innerHTML=`<div class="quiz-progress-label"><strong>${state.queue.length<quiz.questions.length?'Ôn lại câu sai · ':''}Câu ${state.position+1}/${state.queue.length}</strong><span>${esc(question.review.label)}</span></div><div class="quiz-track" role="progressbar" aria-label="Tiến độ quiz" aria-valuemin="0" aria-valuemax="${state.queue.length}" aria-valuenow="${state.position+(state.checked?1:0)}"><span style="width:${(state.position+(state.checked?1:0))/state.queue.length*100}%"></span></div><div class="quiz-question" id="quiz-question" tabindex="-1">${clean(question.questionHTML)}</div><fieldset class="quiz-options" aria-describedby="quiz-question"><legend>Chọn một đáp án</legend>${question.options.map((option,index)=>`<label class="quiz-option ${state.checked&&index===question.correct?'quiz-option-correct':state.checked&&index===state.selected?'quiz-option-wrong':''}"><input type="radio" name="quiz-answer" value="${index}" ${state.selected===index?'checked':''} ${state.checked?'disabled':''}><span class="quiz-option-text"><span class="quiz-option-letter">${String.fromCharCode(65+index)}.</span> ${clean(option)}</span>${state.checked&&index===question.correct?'<small>✓ Đáp án đúng</small>':state.checked&&index===state.selected?'<small>✕ Bạn đã chọn</small>':''}</label>`).join('')}</fieldset><div class="quiz-feedback" data-correct="${correct}" tabindex="-1" aria-live="polite" ${state.checked?'':'hidden'}><strong>${correct?'✓ Chính xác!':'✕ Chưa đúng, cùng xem lại nhé'}</strong><div>${clean(question.explanationHTML)}</div>${!correct?`<a href="${esc(question.review.href)}" data-quiz-review>Ôn lại: ${esc(question.review.label)} ↑</a>`:''}</div><div class="quiz-actions"><p>${state.checked?'Đọc giải thích trước khi tiếp tục.':'Chọn đáp án rồi bấm kiểm tra.'}</p><button type="button" class="button primary inline-flex items-center justify-center" id="quiz-check" ${state.selected===null?'disabled':''}>${state.checked?(state.position===state.queue.length-1?'Xem kết quả':'Câu tiếp theo →'):'Kiểm tra đáp án'}</button></div>`;
  stage.querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{state.selected=Number(input.value);stage.querySelector('#quiz-check').disabled=false;save();}));
  stage.querySelector('#quiz-check').addEventListener('click',()=>{if(!state.checked){state=checkQuizAnswer(quiz,state);render();focus('.quiz-feedback');}else{state=nextQuizQuestion(state);render(true);}save();});
  if(moveFocus)focus('#quiz-question');
 }
 function summary(moveFocus){
  const result=quizResult(quiz,state);
  stage.innerHTML=`<p class="quiz-score">${result.score}/${result.total}</p><h3 class="quiz-summary-title" tabindex="-1">${result.score===result.total?'Bạn đã nắm chắc kiến thức!':'Hoàn thành lượt ôn tập'}</h3><p class="quiz-description">${result.wrong.length?'Các phần nên đọc lại trước khi làm lại:':'Bạn có thể tiếp tục học hoặc thử lại quiz.'}</p>${result.wrong.length?`<ul class="quiz-review-list">${result.wrong.map(id=>{const q=quiz.questions.find(q=>q.id===id);return `<li><a href="${esc(q.review.href)}" data-quiz-review>${esc(q.review.label)} ↑</a><div>${clean(q.questionHTML)}</div></li>`;}).join('')}</ul>`:''}<div class="quiz-retry-actions">${result.wrong.length?'<button type="button" class="button primary inline-flex items-center justify-center" id="quiz-retry-wrong">Làm lại câu sai</button>':''}<button type="button" class="button inline-flex items-center justify-center" id="quiz-retry-all">Làm lại tất cả</button></div>`;
  stage.querySelector('#quiz-retry-all').addEventListener('click',()=>{state=retryQuiz(quiz,state);render(true);save();});
  stage.querySelector('#quiz-retry-wrong')?.addEventListener('click',()=>{state=retryQuiz(quiz,state,true);render(true);save();});
  if(moveFocus)focus('.quiz-summary-title');
 }
 render();
}

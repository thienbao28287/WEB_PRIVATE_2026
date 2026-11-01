export const headingSlug=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function headingIdsFromHTML(html){
 const used=new Map();return [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(match=>{
  const text=match[1].replace(/<[^>]*>/g,'').replace(/&#(x[\da-f]+|\d+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):+n)).replace(/&(amp|lt|gt|quot|apos|nbsp);/g,(_,key)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '}[key]));
  const stem=headingSlug(text)||'section',count=used.get(stem)||0;used.set(stem,count+1);return stem+(count?'-'+count:'');
 });
}
export const quizStorageKey=(page,quiz)=>`hit-quiz-v1:${page}:${quiz.revision}`;
export function newQuizState(quiz){return {queue:quiz.questions.map(q=>q.id),position:0,selected:null,checked:false,answers:{}};}
export function restoreQuizState(quiz,saved){
 const reset=()=>newQuizState(quiz),questions=new Map(quiz.questions.map(q=>[q.id,q]));
 if(!saved||!Array.isArray(saved.queue)||!saved.queue.length||new Set(saved.queue).size!==saved.queue.length||saved.queue.some(id=>!questions.has(id))||!Number.isInteger(saved.position)||saved.position<0||saved.position>saved.queue.length||!saved.answers||typeof saved.answers!=='object'||Array.isArray(saved.answers))return reset();
 const answers={};for(const [id,value] of Object.entries(saved.answers)){const q=questions.get(id);if(q&&Number.isInteger(value)&&value>=0&&value<q.options.length)answers[id]=value;}
 if(saved.queue.slice(0,saved.position).some(id=>!Object.hasOwn(answers,id)))return reset();
 const q=questions.get(saved.queue[saved.position]);
 const selected=q&&Number.isInteger(saved.selected)&&saved.selected>=0&&saved.selected<q.options.length?saved.selected:null;
 return {queue:[...saved.queue],position:saved.position,selected,checked:!!q&&saved.checked===true&&selected!==null&&answers[q.id]===selected,answers};
}
export function checkQuizAnswer(quiz,state){
 const q=quiz.questions.find(q=>q.id===state.queue[state.position]);
 if(!q||state.checked||!Number.isInteger(state.selected)||state.selected<0||state.selected>=q.options.length)return state;
 return {...state,checked:true,answers:{...state.answers,[q.id]:state.selected}};
}
export function nextQuizQuestion(state){return state.checked?{...state,position:state.position+1,selected:null,checked:false}:state;}
export function quizResult(quiz,state){const wrong=quiz.questions.filter(q=>state.answers[q.id]!==q.correct).map(q=>q.id);return {score:quiz.questions.length-wrong.length,total:quiz.questions.length,wrong};}
export function retryQuiz(quiz,state,onlyWrong=false){const queue=onlyWrong?quizResult(quiz,state).wrong:quiz.questions.map(q=>q.id);return queue.length?{queue,position:0,selected:null,checked:false,answers:onlyWrong?{...state.answers}:{}}:state;}

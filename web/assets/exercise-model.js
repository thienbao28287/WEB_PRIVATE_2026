export const identifier=/^[A-Za-z][A-Za-z0-9_-]{0,39}$/;
export const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function checkAnswers(exercise,answers) {
  return exercise.fields.map(field=>{
    const value=String(answers[field.id]??'').trim();
    if(!value)return {id:field.id,ok:false,message:'Chưa điền phần code này.'};
    const ok=field.rule==='identifier'?identifier.test(value)&&(!field.matches || value===String(answers[field.matches]??'').trim()):value.toLowerCase()===field.expected;
    return {id:field.id,ok,message:ok?'✓ Đúng':field.error};
  });
}
export function previewCode(exercise,answers) {
  return exercise.template.replace(/\{\{([a-z][\w-]*)\}\}/g,(_,id)=>{
    const field=exercise.fields.find(item=>item.id===id),value=String(answers[id]??'').trim();
    // Attribute-position blanks accept a canonical boolean only, never raw input.
    if(field.rule==='attribute')return value.toLowerCase()===field.expected?field.expected:'';
    return escapeHTML(value.slice(0,80));
  });
}
export function restoreExercise(exercise,saved){
  const answers=Object.fromEntries(exercise.fields.map(field=>[field.id,typeof saved?.answers?.[field.id]==='string'?saved.answers[field.id].slice(0,80):'']));
  return {answers,completed:saved?.completed===true&&checkAnswers(exercise,answers).every(item=>item.ok)};
}
export function validateExercises(document,source) {
  const fail=message=>{throw new Error(`${source}: ${message}`);};
  if(!Array.isArray(document?.groups))fail('Thiếu groups');
  const ids=new Set();
  for(const group of document.groups){
    if(typeof group.id!=='string'||!identifier.test(group.id)||ids.has(group.id))fail(`ID nhóm không hợp lệ hoặc trùng: ${group.id}`);
    ids.add(group.id);
    if(!group.title||!Array.isArray(group.exercises)||!group.exercises.length)fail(`Nhóm ${group.id} thiếu bài tập`);
    for(const ex of group.exercises){
      if(typeof ex.id!=='string'||!identifier.test(ex.id)||ids.has(ex.id))fail(`ID bài tập không hợp lệ hoặc trùng: ${ex.id}`);
      ids.add(ex.id);
      if(!Number.isInteger(ex.version)||ex.version<1||!ex.title||!ex.prompt||!ex.explanation||typeof ex.template!=='string'||!Array.isArray(ex.fields)||!ex.fields.length||!Array.isArray(ex.hints)||ex.hints.length!==2||ex.hints.some(h=>typeof h!=='string'||!h))fail(`Bài ${ex.id} thiếu nội dung/phiên bản/gợi ý`);
      const fields=new Set();
      for(const field of ex.fields){
        if(typeof field.id!=='string'||!identifier.test(field.id)||fields.has(field.id)||!field.label||!field.error||!['identifier','value','attribute'].includes(field.rule))fail(`Ô nhập không hợp lệ trong ${ex.id}`);
        fields.add(field.id);
        if(field.rule!=='identifier'&&(typeof field.expected!=='string'||!identifier.test(field.expected)))fail(`Đáp án không hợp lệ trong ${ex.id}`);
      }
      const blanks=[...ex.template.matchAll(/\{\{([a-z][\w-]*)\}\}/g)].map(match=>match[1]);
      if(new Set(blanks).size!==blanks.length||ex.fields.some(field=>!blanks.includes(field.id))||blanks.some(id=>!fields.has(id))||ex.fields.some(field=>field.matches&&!fields.has(field.matches)))fail(`Template/ô nhập không khớp trong ${ex.id}`);
    }
  }
  return document.groups;
}

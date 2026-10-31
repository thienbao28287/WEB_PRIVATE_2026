import {marked} from 'marked';
const key=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().trim();
export function parseNotebook(markdown,source){
  const entries=[];let entry,field;
  const fields={'nhom':'tag','dau hieu':'symptom','ma sai':'badCode','cach sua':'goodCode','ghi nho':'explanation'};
  for(const token of marked.lexer(markdown)){
    if(token.type==='heading'&&token.depth===2){entry={title:token.text,sections:{}};entries.push(entry);field=null;continue;}
    if(token.type==='heading'&&token.depth===3&&entry){
      field=fields[key(token.text)];
      if(!field)throw new Error(`${source}: mục không hỗ trợ: ${token.text}`);
      if(entry.sections[field])throw new Error(`${source}: mục bị trùng trong ${entry.title}: ${token.text}`);
      entry.sections[field]=[];continue;
    }
    if(entry&&field)entry.sections[field].push(token);
  }
  return entries.map((item,index)=>{
    const sections=item.sections;
    for(const required of ['symptom','badCode','goodCode','explanation']){
      if(!sections[required]?.some(token=>token.type!=='space'))throw new Error(`${source}: ${item.title} thiếu ${required}`);
    }
    const code=name=>{const blocks=sections[name].filter(token=>token.type==='code');if(!blocks.length)throw new Error(`${source}: ${item.title} cần code fence trong ${name}`);return blocks.map(token=>token.text).join('\n\n');};
    return {id:`notebook-${index+1}`,title:item.title,tag:sections.tag?.map(token=>token.text||'').join(' ').trim()||'Lỗi thường gặp',
      symptomHTML:marked.parser(sections.symptom),explanationHTML:marked.parser(sections.explanation),badCode:code('badCode'),goodCode:code('goodCode')};
  });
}

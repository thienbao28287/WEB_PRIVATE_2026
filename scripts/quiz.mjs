import {marked} from 'marked';
import {createHash} from 'node:crypto';
import {headingIdsFromHTML} from '../web/assets/quiz-model.js';
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().trim();
export function parseQuiz(markdown,source,theoryHTML,pageId){
 if(!markdown.trim())return null;
 const fail=message=>{throw new Error(`${source}: ${message}`);};
 const blocks=[];let current,field;let title='Quiz cuối buổi';
 const fields={'cau hoi':'question','lua chon':'options','giai thich':'explanation','on tap':'review'};
 for(const token of marked.lexer(markdown)){
  if(token.type==='heading'&&token.depth===1){title=token.text;continue;}
  if(token.type==='heading'&&token.depth===2){if(!/^[a-z][a-z0-9-]*$/.test(token.text))fail(`ID câu hỏi không hợp lệ: ${token.text}`);current={id:token.text,sections:{}};blocks.push(current);field=null;continue;}
  if(token.type==='heading'&&token.depth===3&&current){field=fields[normalize(token.text)];if(!field)fail(`${current.id}: mục không hỗ trợ ${token.text}`);if(current.sections[field])fail(`${current.id}: mục bị trùng ${token.text}`);current.sections[field]=[];continue;}
  if(current&&field)current.sections[field].push(token);
 }
 if(!blocks.length||blocks.length>20)fail('Quiz cần từ 1 đến 20 câu hỏi');
 const ids=new Set(),anchors=new Set(headingIdsFromHTML(theoryHTML));
 const questions=blocks.map(block=>{
  if(ids.has(block.id))fail(`ID câu hỏi bị trùng: ${block.id}`);ids.add(block.id);
  const s=block.sections;
  for(const key of Object.values(fields))if(!s[key]?.some(t=>t.type!=='space'))fail(`${block.id}: thiếu ${key}`);
  const lists=s.options.filter(t=>t.type!=='space');
  if(lists.length!==1||lists[0].type!=='list'||lists[0].items.length<2||lists[0].items.length>6||lists[0].items.some(i=>!i.task||!i.text.trim()))fail(`${block.id}: cần 2–6 lựa chọn dạng - [ ] hoặc - [x]`);
  const items=lists[0].items,correct=items.flatMap((item,index)=>item.checked?[index]:[]);
  if(new Set(items.map(item=>item.text.trim())).size!==items.length)fail(`${block.id}: lựa chọn bị trùng nội dung`);
  if(correct.length!==1)fail(`${block.id}: cần đúng một đáp án đánh dấu [x]`);
  const reviewTokens=s.review.filter(t=>t.type!=='space');
  const links=reviewTokens.flatMap(t=>t.tokens||[]).filter(t=>t.type==='link');
  if(links.length!==1)fail(`${block.id}: Ôn tập cần một liên kết tới theory.md#heading`);
  const link=links[0];let url,anchor;
  try{url=new URL(link.href,`https://docs.local/${source}`);anchor=decodeURIComponent(url.hash.slice(1));}catch{fail(`${block.id}: liên kết ôn tập không hợp lệ`);}
  if(url.origin!=='https://docs.local'||url.pathname!==`/${pageId}.md`||url.search||!anchors.has(anchor))fail(`${block.id}: liên kết ôn tập không tồn tại trong lý thuyết: ${link.href}`);
  return {id:block.id,questionHTML:marked.parser(s.question),options:items.map(i=>marked.parseInline(i.text)),correct:correct[0],explanationHTML:marked.parser(s.explanation),review:{label:link.text,href:`#/${pageId}?section=${encodeURIComponent(anchor)}`}};
 });
 return {title,revision:createHash('sha256').update(markdown).digest('hex').slice(0,12),source,questions};
}

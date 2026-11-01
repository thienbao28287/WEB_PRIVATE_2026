export const NOTE_LIMIT=100000;
export const noteKey=number=>`hit-personal-notes-v1:Lesson${number}`;
export function createNoteStore(storage){
 const memory=new Map();
 return {
  read(number){
   const key=noteKey(number);if(memory.has(key))return memory.get(key);
   let result={markdown:'',saved:true,updatedAt:null};
   try{const raw=storage.getItem(key);if(raw!==null){const record=JSON.parse(raw);if(record?.version!==1||typeof record.markdown!=='string'||record.markdown.length>NOTE_LIMIT)throw Error('Invalid note');result={markdown:record.markdown,updatedAt:record.updatedAt||null,saved:true};}}
   catch{result={markdown:'',saved:false,updatedAt:null};}
   memory.set(key,result);return result;
  },
  write(number,markdown){
   if(typeof markdown!=='string'||markdown.length>NOTE_LIMIT)throw Error('Ghi chú quá dài');
   const result={markdown,updatedAt:new Date().toISOString(),saved:false};
   memory.set(noteKey(number),result);
   try{storage.setItem(noteKey(number),JSON.stringify({version:1,markdown,updatedAt:result.updatedAt}));result.saved=true;}catch{}
   return result;
  }
 };
}
export function formatNote(text,start,end,kind){
 const selected=text.slice(start,end);let insert,offset,length;
 if(kind==='bold'){const value=selected||'nội dung';insert='**'+value+'**';offset=2;length=value.length;}
 else if(kind==='code'){const value=selected||'Viết code ở đây';insert='```html\n'+value+'\n```';offset=8;length=value.length;}
 else {const prefix=kind==='heading'?'## ':'- ';const value=selected|| (kind==='heading'?'Tiêu đề':'Điều cần nhớ');insert=value.split('\n').map(line=>prefix+line).join('\n');offset=prefix.length;length=insert.length-offset;}
 const before=kind==='bold'||!start||text[start-1]==='\n'?'':'\n';
 const after=kind==='bold'||end===text.length||text[end]==='\n'?'':'\n';
 return {value:text.slice(0,start)+before+insert+after+text.slice(end),start:start+before.length+offset,end:start+before.length+offset+length};
}

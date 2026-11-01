import test from 'node:test';
import assert from 'node:assert/strict';
import {createNoteStore,noteKey,formatNote,NOTE_LIMIT} from '../web/assets/note-model.js';
function storage(){const data=new Map();return {getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,value)};}
test('personal notes start empty and remain independent by lesson across reloads',()=>{
 const disk=storage(),store=createNoteStore(disk);
 assert.equal(store.read(1).markdown,'');
 store.write(1,'# Ghi nhớ\n\n**HTML**');store.write(2,'Form');
 assert.equal(createNoteStore(disk).read(1).markdown,'# Ghi nhớ\n\n**HTML**');assert.equal(store.read(2).markdown,'Form');
 assert.notEqual(noteKey(1),noteKey(2));store.write(1,'');assert.equal(createNoteStore(disk).read(1).markdown,'');
});
test('blocked or full storage retains notes in the current session and reports failure',()=>{
 const store=createNoteStore({getItem(){throw Error('blocked');},setItem(){throw Error('quota');}});
 assert.equal(store.read(1).saved,false);assert.equal(store.write(1,'Giữ trong phiên').saved,false);assert.equal(store.read(1).markdown,'Giữ trong phiên');
});
test('invalid local data never becomes editor content',()=>{
 for(const raw of ['{bad','[]','null',JSON.stringify({version:2,markdown:'wrong version'}),JSON.stringify({version:1,markdown:42})]){
 const store=createNoteStore({getItem:()=>raw,setItem(){}});assert.equal(store.read(1).markdown,'');assert.equal(store.read(1).saved,false);
 }
 assert.throws(()=>createNoteStore(storage()).write(1,'x'.repeat(NOTE_LIMIT+1)),/quá dài/);
});
test('Markdown formatting wraps selection and inserts editable placeholders',()=>{
 assert.equal(formatNote('hello',0,5,'bold').value,'**hello**');
 assert.equal(formatNote('a\nb',0,3,'list').value,'- a\n- b');
 const heading=formatNote('',0,0,'heading');assert.equal(heading.value,'## Tiêu đề');assert.equal(heading.value.slice(heading.start,heading.end),'Tiêu đề');
 const code=formatNote('const x=1;',0,10,'code');assert.match(code.value,/^```html\nconst x=1;\n```$/);
});

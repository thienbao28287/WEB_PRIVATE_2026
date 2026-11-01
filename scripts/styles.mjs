import {readFile} from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
export async function compileStyles(projectRoot){
 const from=path.join(projectRoot,'web/assets/styles.css');
 const input=await readFile(from,'utf8');
 const result=await postcss([tailwind({base:projectRoot,optimize:{minify:true}})]).process(input,{from,map:false});
 return result.css;
}

const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(__dirname + '/../script.js', 'utf8');
const contactCode = source.slice(source.indexOf('const contactForms ='), source.indexOf('// --- Dynamic CTA Hover Tracking ---'));
async function check(name, response, {staticHost = false, timeout = false, success = false, language = 'en', query = ''} = {}) {
  let handler, calls = 0, resets = 0, bannerHtml = '', timer, selectedOption;
  const languageLink = {href: 'http://localhost/contact-ka.html'};
  const service = {add(option){selectedOption=option}};
  const classes = {add(){},remove(){},toggle(){}};
  const banner = {classList:classes,setAttribute(){},focus(){},scrollIntoView(){},set innerHTML(value){bannerHtml=value},get innerHTML(){return bannerHtml}};
  const button = {textContent:'Send',dataset:{},querySelector(){return null}};
  const message = {value:''};
  const form = {
    firstChild:null,
    querySelector(selector){return selector==='[data-form-success]' ? banner : selector.includes('button') ? button : selector==='[name="message"]' ? message : selector==='[name="service"]' ? service : null},
    getAttribute(){return '/api/contact'},addEventListener(event,fn){handler=fn},
    reportValidity(){return true}, reset(){resets++},insertBefore(){}
  };
  const payload={name:'Preview Test',business:'Studio test',contact:'preview@example.com',service:'Website',message:'A local test inquiry.'};
  const context={
    document:{querySelectorAll(selector){return selector === '.lang-link' ? [languageLink] : [form]},createElement(){return {}}},
    window:{location:{hostname:staticHost?'tbilisigs.github.io':'localhost',protocol:'http:',search:query,pathname:'/contact.html'},setTimeout(fn){timer=fn;return 1},clearTimeout(){}},
    currentLang:language,URL,URLSearchParams,Option:function(label,value){this.value=value},AbortController,
    FormData:class{get(key){return payload[key] || ''}},
    console:{error(){}},
    fetch:async (url,options)=>{calls++;if(timeout){timer();assert.equal(options.signal.aborted,true);throw Error('aborted')}if(response instanceof Error)throw response;return response}
  };
  vm.runInNewContext(contactCode,context);
  handler({preventDefault(){}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(resets,success?1:0, name+': reset only after confirmed success');
  assert.equal(button.disabled || false,false,name+': button restored');
  if(staticHost){assert.equal(calls,0);assert.match(bannerHtml,/not been sent/)}
  else if(success)assert.match(bannerHtml,/Your request was sent/);
  else assert.match(bannerHtml,/wa.me\/995597199500\?text=/);
  if(!success) assert.match(bannerHtml,/preview%40example.com/);
  if(query.includes('package=website')) { assert.match(selectedOption.value,/1,800 GEL/); assert.match(languageLink.href,/package=website#contact-form/); }
  if(query.includes('concept=velvet')) { assert.match(message.value,/Velvet Beauty House/); assert.match(languageLink.href,/concept=velvet#contact-form/); }
  console.log('PASS:',name);
}
const reply=(type,body,ok=true)=>({ok,status:ok?200:500,headers:{get(){return type}},json:async()=>body});
(async()=>{
 await check('confirmed JSON success',reply('application/json',{ok:true}),{success:true});
 await check('HTML 200 cannot fake success',reply('text/html',null));
 await check('JSON without confirmation cannot fake success',reply('application/json',{}));
 await check('JSON failure preserves draft',reply('application/json',{ok:false},false));
 await check('network failure preserves draft',Error('offline'));
 await check('timeout aborts and restores form',null,{timeout:true});
 await check('GitHub Pages prepares draft without POST',null,{staticHost:true});
 await check('package prefill and language link',Error('offline'),{query:'?package=website'});
 await check('concept prefill and language link',Error('offline'),{query:'?concept=velvet'});
 await check('Georgian fallback preserves draft',Error('offline'),{language:'ka'});
})().catch(error=>{console.error(error);process.exitCode=1});

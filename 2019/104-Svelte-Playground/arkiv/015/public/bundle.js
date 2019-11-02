var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function i(t){t.forEach(e)}function s(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e,n,i){t.style.setProperty(e,n,i?"important":"")}let a;function l(t){a=t}const c=[],u=[],d=[],p=[],f=Promise.resolve();let h=!1;function v(t){d.push(t)}function m(){const t=new Set;do{for(;c.length;){const t=c.shift();l(t),g(t.$$)}for(;u.length;)u.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];t.has(n)||(n(),t.add(n))}d.length=0}while(c.length);for(;p.length;)p.pop()();h=!1}function g(t){t.fragment&&(t.update(t.dirty),i(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(v))}const b=new Set;function $(t,e){t.$$.dirty||(c.push(t),h||(h=!0,f.then(m)),t.$$.dirty=n()),t.$$.dirty[e]=!0}function y(o,r,c,u,d,p){const f=a;l(o);const h=r.props||{},g=o.$$={fragment:null,ctx:null,props:p,update:t,not_equal:d,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:n(),dirty:null};let y=!1;var x,A,D;g.ctx=c?c(o,h,(t,e,n=e)=>(g.ctx&&d(g.ctx[t],g.ctx[t]=n)&&(g.bound[t]&&g.bound[t](n),y&&$(o,t)),e)):h,g.update(),y=!0,i(g.before_update),g.fragment=u(g.ctx),r.target&&(r.hydrate?g.fragment.l((D=r.target,Array.from(D.childNodes))):g.fragment.c(),r.intro&&((x=o.$$.fragment)&&x.i&&(b.delete(x),x.i(A))),function(t,n,o){const{fragment:r,on_mount:a,on_destroy:l,after_update:c}=t.$$;r.m(n,o),v(()=>{const n=a.map(e).filter(s);l?l.push(...n):i(n),t.$$.on_mount=[]}),c.forEach(v)}(o,r.target,r.anchor),m()),l(f)}class x{$destroy(){var e,n;n=1,(e=this).$$.fragment&&(i(e.$$.on_destroy),e.$$.fragment.d(n),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={}),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const A=chai.assert.deepEqual,D=function(t,e){var n,i,s,o,r,a=[];return r=[],s=function(t){var e,n,i,s,r,l;for(r=t.split("\n"),l=[],a=[],s=e=0,n=r.length;e<n;s=++e)i=r[s],l.push(o(i,s));return console.log(a),a},o=function(t,s){var o,l,c,u,d,p;if(u=n(t),t=t.trim(),0===u)return r=[JSON.parse(t)];for(e.length=0,o=t.split(" "),p=r[u-1],c=0,d=o.length;c<d;c++)l=o[c],p=i(l,p,s);for(r[u]=p;e.length>=2;)i("==",p,s);1!==e.length||a.push(`Orphan in line ${s+1}`)},i=function(n,i,s){var o,r;if("STATE"===n)return e.push(i),i;if(Object.keys(i).includes(n.toLowerCase()))return e.push(i[n.toLowerCase()]),i;if(Object.keys(t).includes(n))return t[n](i);if("=="===n){try{o=e.pop(),r=e.pop(),A(o,r)}catch(t){a.push("Assert failure in line "+(s+1)),a.push("  Actual "+JSON.stringify(r)),a.push("  Expect "+JSON.stringify(o))}return i}try{if(""==n)return i;e.push(JSON.parse(n))}catch(t){a.push("JSON.parse failure in line "+(s+1)+" "+n),a.push("\t"+n)}return i},n=function(t){var e,n,i;for(i=0,e=0,n=t.length;e<n;e++){if("\t"!==t[e])return i;i++}return i},{run:s}};function T(e){var n;return{c(){var t,e,i,s;t="div",(n=document.createElement(t)).innerHTML='<h2>Action State Tree Testing</h2> <div class="svelte-1todpxz">This is a compact format for making tests</div> <div class="svelte-1todpxz">Each line contains zero or more actions</div> <div class="svelte-1todpxz">Each line contains zero or more tests</div> <div class="svelte-1todpxz"> </div> <div class="svelte-1todpxz">Lines are based on less indented lines</div> <div class="svelte-1todpxz">Alternative actions have the same indentation</div> <div class="svelte-1todpxz">Lines with no indentation contains initial states.</div> <div class="svelte-1todpxz"> </div> <div class="svelte-1todpxz">JSON is used to describe states</div> <div class="svelte-1todpxz">RPN is used for actions and getters</div> <div class="svelte-1todpxz"> </div>\n\n\t\t\t\tActions:\n\t\t\t\t<ul><li>ADD : a = a + 2</li> <li>MUL : a = a * 2</li> <li>DIV : a = a / 2</li> <li>NEW</li> <li>UNDO</li></ul>\n\n\t\t\t\tGetters: \n\t\t\t\t<ul><li>STATE : The State</li> <li>A : The number to be changed</li> <li>B : Target number</li> <li>HIST : List for Undo</li></ul> <div class="svelte-1todpxz">Assertions are done by taking two items </div> <div class="svelte-1todpxz">from the stack at a time and comparing deeply.</div> <div class="svelte-1todpxz"> </div>\n\t\t\t\tLine 5 contains three assertions:\n\t\t\t\t<ul><li>A == 17</li> <li>B == 1</li> <li>HIST == []</li></ul> <div class="svelte-1todpxz">Actions may consume parameters. E.g. NEW</div> <div class="svelte-1todpxz"> </div>\n\t\t\t\tKnown quirks:\n\t\t\t\t<ul><li>Spaces are not allowed in expressions</li> <li>Very sensitive to editing</li></ul>',r(n,"position","absolute"),r(n,"left","10px"),r(n,"top","10px"),e=n,i="class",null==(s="svelte-1todpxz")?e.removeAttribute(i):e.setAttribute(i,s)},m(t,e){!function(t,e,n){t.insertBefore(e,n||null)}(t,n,e)},p:t,i:t,o:t,d(t){var e;t&&(e=n).parentNode.removeChild(e)}}}function S(t){const e=[],n=(t,e)=>{const n=[...t.hist,t.a];return{...t,a:e,hist:n}},i={ADD:t=>n(t,t.a+2),MUL:t=>n(t,2*t.a),DIV:t=>n(t,t.a/2),NEW:t=>({b:e.pop(),a:e.pop(),hist:[]}),UNDO:t=>{const e=t.hist.slice();return{a:e.pop(),b:t.b,hist:e}}};let s='\n{"a":18,"b":17,"hist":[]}\n\tADD STATE {"a":20,"b":17,"hist":[18]}\n\tMUL STATE {"a":36,"b":17,"hist":[18]}\n\tDIV STATE {"a":9,"b":17,"hist":[18]}\n\t17 1 NEW A 17 B 1 HIST []\n{"a":17,"b":1,"hist":[]}\n\tMUL ADD DIV STATE {"a":18,"b":1,"hist":[17,34,36]}\n\t\tUNDO STATE {"a":36,"b":1,"hist":[17,34]}\n\t\t\tUNDO STATE {"a":34,"b":1,"hist":[17]}\n\t\t\t\tUNDO STATE {"a":17,"b":1,"hist":[99]}\n\tMUL ADD DIV ADD DIV ADD DIV ADD DIV DIV DIV A 1\n';const o=CodeMirror(document.body,{lineNumbers:!0,tabSize:2,theme:"dracula"});o.setSize(1e3,600),o.setValue(s.trim()),o.on("change",()=>{r.setValue(a.run(o.getValue()).join("\n"))});const r=CodeMirror(document.body,{readOnly:!0,tabSize:2});r.setSize(1e3,200);const a=D(i,e);return r.setValue(a.run(o.getValue()).join("\n")),{}}return new class extends x{constructor(t){super(),y(this,t,S,T,o,[])}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map

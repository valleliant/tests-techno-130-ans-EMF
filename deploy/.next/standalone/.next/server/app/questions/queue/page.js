"use strict";(()=>{var e={};e.id=328,e.ids=[328],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7790:e=>{e.exports=require("assert")},8893:e=>{e.exports=require("buffer")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},4026:e=>{e.exports=require("string_decoder")},2452:e=>{e.exports=require("tls")},4175:e=>{e.exports=require("tty")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},4557:(e,t,r)=>{r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(7808),r(2029),r(5866);var s=r(3191),i=r(8716),n=r(7922),a=r.n(n),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["questions",{children:["queue",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7808)),"D:\\tests techno 130 ans EMF\\src\\app\\questions\\queue\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,2029)),"D:\\tests techno 130 ans EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\tests techno 130 ans EMF\\src\\app\\questions\\queue\\page.tsx"],u="/questions/queue/page",h={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/questions/queue/page",pathname:"/questions/queue",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7808:(e,t,r)=>{let s,i;r.r(t),r.d(t,{default:()=>u});var n=r(9510);let a=require("node:crypto");var o=r(9534),l=r(2898);let d=`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f3f4f6;
  }
  .card {
    background: #ffffff;
    border-radius: 12px;
    padding: 32px 28px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 640px;
    text-align: center;
  }
  h1 {
    font-size: 24px;
    margin: 0 0 16px 0;
    color: #111827;
  }
  .question {
    font-size: 17px;
    color: #4b5563;
    margin-bottom: 16px;
  }
  .position {
    font-size: 22px;
    font-weight: 600;
    color: #2563eb;
    margin-bottom: 8px;
  }
  .time {
    font-size: 16px;
    color: #6b7280;
  }
  .info {
    margin-top: 16px;
    font-size: 14px;
    color: #6b7280;
  }
  button {
    margin-top: 20px;
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background: #e5e7eb;
    color: #111827;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.15s ease;
  }
  button:hover {
    background: #d1d5db;
  }
`,c={fr:{missing:"Identifiant utilisateur manquant. Merci de recommencer.",fallbackTitle:"File en pr\xe9paration",fallbackBody:"Redis n’est pas disponible pour le moment. Revenez plus tard.",queueTitle:"Votre question est en attente",refresh:"⟳ Cette page se rafra\xeechit automatiquement toutes les 5 secondes.",back:"← Retour au d\xe9but"},de:{missing:"Benutzer-ID fehlt. Bitte erneut starten.",fallbackTitle:"Warteschlange wird vorbereitet",fallbackBody:"Redis ist momentan nicht verf\xfcgbar. Bitte versuchen Sie es sp\xe4ter erneut.",queueTitle:"Ihre Frage wartet noch",refresh:"⟳ Diese Seite aktualisiert sich alle 5 Sekunden automatisch.",back:"← Zur\xfcck zum Start"}};async function u({searchParams:e}){let t=e.userId,r=e.lang,u=e.category,h=e.questionId,p=e.clientip,x=e.clientmac,m="de"===r?"de":"fr",f=c[m];if(!t&&r&&u&&h){let e="de"===r?"de":"fr"===r?"fr":void 0;if(e){let t=l[e]?.[u];if(t){let r=t.find(e=>e.id===h);if(r){let t=function(e=21){var t;t=e|=0,!s||s.length<t?(s=Buffer.allocUnsafe(128*t),a.webcrypto.getRandomValues(s),i=0):i+t>s.length&&(a.webcrypto.getRandomValues(s),i=0),i+=t;let r="";for(let t=i-e;t<i;t++)r+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&s[t]];return r}(10),l={id:h,question:r.question,reponse_detaillee:r.reponse_detaillee,lang:e,category:u,timestamp:new Date().toISOString(),userId:t};await (0,o.u0)(async()=>{if(!o.T8)throw Error("Redis client not initialized");return console.log("[REDIS] Attempting to add entry to queue (from list)..."),await o.T8.rpush("questions:queue",JSON.stringify(l)),console.log("[REDIS] Successfully added to queue (from list):",l),!0},!1,"RPUSH questions:queue (from list)"),console.log(`[QUEUE] Created entry from list - Lang: ${e}, Category: ${u}, QuestionId: ${h}, UserId: ${t}`);let c=new URLSearchParams({userId:t,lang:e});p&&c.append("clientip",p),x&&c.append("clientmac",x);let m=`/questions/queue?${c.toString()}`;return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:`0; url=${m}`}),n.jsx("title",{children:"Redirection file d'attente"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:f.queueTitle}),n.jsx("p",{className:"question",children:"Pr\xe9paration de votre file d'attente…"})]})})})]})}console.error(`[QUEUE] Question not found on initial arrival: ${h}`)}else console.error(`[QUEUE] Invalid category on initial arrival: ${u} for lang: ${e}`)}else console.error("[QUEUE] Invalid lang on initial arrival:",r)}if(!t)return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:f.fallbackTitle}),n.jsx("p",{className:"question",children:f.missing}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:f.back})})]})})})]});let g=(await (0,o.u0)(async()=>{if(!o.T8)throw Error("Redis client not initialized");return o.T8.lrange("questions:queue",0,-1)},[],"LRANGE questions:queue")).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>!!e);if(!o.jJ||0===g.length)return console.warn("[QUEUE] Redis unavailable or queue empty"),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:f.fallbackTitle}),n.jsx("p",{className:"question",children:f.fallbackBody}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:f.back})})]})})})]});let j=g.findIndex(e=>e.userId===t)+1,q=g.length,b=g.find(e=>e.userId===t);if(console.log(`[QUEUE] UserId: ${t}, Queue length: ${g.length}`),!b||0===j)return console.warn("[QUEUE] Entry not found for userId",t),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:f.fallbackTitle}),n.jsx("p",{className:"question",children:f.missing}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:f.back})})]})})})]});let v=30*j;if(console.log(`[QUEUE] Position: ${j}/${q}, Estimated time: ${v}s`),1===j){console.log(`[QUEUE] User ${t} reached position 1 - redirecting`);let e=new URLSearchParams({userId:t,lang:m});p&&e.append("clientip",p),x&&e.append("clientmac",x);let r=e.toString(),s=`/questions/display?${r}`;return console.log("[QUEUE] Redirecting to display:",s),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{httpEquiv:"refresh",content:`0; url=${s}`}),n.jsx("title",{children:"C'est votre tour"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"\uD83C\uDF89 C'est votre tour !"}),n.jsx("p",{className:"question",children:"Redirection..."})]})})})]})}return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:d})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:f.queueTitle}),(0,n.jsxs)("p",{className:"question",children:["\xab ",b.question," \xbb"]}),(0,n.jsxs)("div",{className:"position",children:[j," / ",q]}),(0,n.jsxs)("div",{className:"time",children:["Temps estim\xe9 : ~",Math.floor(v/60)," min ",v%60," sec"]}),n.jsx("div",{className:"info",children:f.refresh})]})})})]})}},9534:(e,t,r)=>{r.d(t,{T8:()=>i,jJ:()=>n,u0:()=>a});var s=r(2197);let i=null,n=!1;try{(i=new s.Redis({host:process.env.REDIS_HOST||"localhost",port:parseInt(process.env.REDIS_PORT||"6379",10),retryStrategy:e=>e>3?(console.error("[REDIS] Max retry attempts reached. Redis unavailable."),null):Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("connect",()=>{console.log("[REDIS] Connected successfully"),n=!0}),i.on("error",e=>{console.error("[REDIS ERROR]",e.message),n=!1})}catch(e){console.error("[REDIS] Failed to initialize:",e),i=null,n=!1}async function a(e,t,r){if(!i)return console.warn(`[REDIS FALLBACK] ${r} - Redis client not initialized, using fallback`),t;try{return await e()}catch(e){return console.error(`[REDIS ERROR] ${r} failed:`,e),t}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[276,471,197,553],()=>r(4557));module.exports=s})();
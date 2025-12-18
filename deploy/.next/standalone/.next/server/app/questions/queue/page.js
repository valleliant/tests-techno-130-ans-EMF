"use strict";(()=>{var e={};e.id=328,e.ids=[328],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7790:e=>{e.exports=require("assert")},8893:e=>{e.exports=require("buffer")},4770:e=>{e.exports=require("crypto")},665:e=>{e.exports=require("dns")},7702:e=>{e.exports=require("events")},2048:e=>{e.exports=require("fs")},8216:e=>{e.exports=require("net")},9801:e=>{e.exports=require("os")},5315:e=>{e.exports=require("path")},6162:e=>{e.exports=require("stream")},4026:e=>{e.exports=require("string_decoder")},2452:e=>{e.exports=require("tls")},4175:e=>{e.exports=require("tty")},7360:e=>{e.exports=require("url")},1764:e=>{e.exports=require("util")},6005:e=>{e.exports=require("node:crypto")},1660:(e,t,r)=>{r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(7406),r(2029),r(5866);var i=r(3191),s=r(8716),n=r(7922),a=r.n(n),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["questions",{children:["queue",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7406)),"C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\queue\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,2029)),"C:\\tests-techno-130-ans-EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\queue\\page.tsx"],u="/questions/queue/page",h={require:r,loadChunk:()=>Promise.resolve()},p=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/queue/page",pathname:"/questions/queue",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7406:(e,t,r)=>{let i,s;r.r(t),r.d(t,{default:()=>h});var n=r(9510),a=r(6005),o=r(3061),l=r(9534),d=r(2898);let c=`
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
`,u={fr:{missing:"Identifiant utilisateur manquant. Merci de recommencer.",fallbackTitle:"File en pr\xe9paration",fallbackBody:"Redis n’est pas disponible pour le moment. Revenez plus tard.",queueTitle:"Votre question est en attente",refresh:"⟳ Cette page se rafra\xeechit automatiquement toutes les 5 secondes.",back:"← Retour au d\xe9but"},de:{missing:"Benutzer-ID fehlt. Bitte erneut starten.",fallbackTitle:"Warteschlange wird vorbereitet",fallbackBody:"Redis ist momentan nicht verf\xfcgbar. Bitte versuchen Sie es sp\xe4ter erneut.",queueTitle:"Ihre Frage wartet noch",refresh:"⟳ Diese Seite aktualisiert sich alle 5 Sekunden automatisch.",back:"← Zur\xfcck zum Start"}};async function h({searchParams:e}){(0,o.l)();let t=e.userId,r=e.lang,h=e.category,p=e.questionId,x=e.clientip,m=e.clientmac,f="de"===r?"de":"fr",j=u[f];if(!t&&r&&h&&p){let e="de"===r?"de":"fr"===r?"fr":void 0;if(e){let t=d[e]?.[h];if(t){let r=t.find(e=>e.id===p);if(r){let t=function(e=21){var t;t=e|=0,!i||i.length<t?(i=Buffer.allocUnsafe(128*t),a.webcrypto.getRandomValues(i),s=0):s+t>i.length&&(a.webcrypto.getRandomValues(i),s=0),s+=t;let r="";for(let t=s-e;t<s;t++)r+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&i[t]];return r}(10),o={id:p,question:r.question,reponse_detaillee:r.reponse_detaillee,lang:e,category:h,timestamp:new Date().toISOString(),userId:t};await (0,l.u0)(async()=>{if(!l.T8)throw Error("Redis client not initialized");return console.log("[REDIS] Attempting to add entry to queue (from list)..."),await l.T8.rpush("questions:queue",JSON.stringify(o)),console.log("[REDIS] Successfully added to queue (from list):",o),!0},!1,"RPUSH questions:queue (from list)"),console.log(`[QUEUE] Created entry from list - Lang: ${e}, Category: ${h}, QuestionId: ${p}, UserId: ${t}`);let d=new URLSearchParams({userId:t,lang:e});x&&d.append("clientip",x),m&&d.append("clientmac",m);let u=`/questions/queue?${d.toString()}`;return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:`0; url=${u}`}),n.jsx("title",{children:"Redirection file d'attente"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:j.queueTitle}),n.jsx("p",{className:"question",children:"Pr\xe9paration de votre file d'attente…"})]})})})]})}console.error(`[QUEUE] Question not found on initial arrival: ${p}`)}else console.error(`[QUEUE] Invalid category on initial arrival: ${h} for lang: ${e}`)}else console.error("[QUEUE] Invalid lang on initial arrival:",r)}if(!t)return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:j.fallbackTitle}),n.jsx("p",{className:"question",children:j.missing}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:j.back})})]})})})]});let g=(await (0,l.u0)(async()=>{if(!l.T8)throw Error("Redis client not initialized");return l.T8.lrange("questions:queue",0,-1)},[],"LRANGE questions:queue")).map(e=>{try{return JSON.parse(e)}catch{return null}}).filter(e=>!!e);if(!l.jJ||0===g.length)return console.warn("[QUEUE] Redis unavailable or queue empty"),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:j.fallbackTitle}),n.jsx("p",{className:"question",children:j.fallbackBody}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:j.back})})]})})})]});let q=g.findIndex(e=>e.userId===t)+1,b=g.length,v=g.find(e=>e.userId===t);if(console.log(`[QUEUE] UserId: ${t}, Queue length: ${g.length}`),!v||0===q)return console.warn("[QUEUE] Entry not found for userId",t),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:j.fallbackTitle}),n.jsx("p",{className:"question",children:j.missing}),n.jsx("form",{method:"GET",action:"/questions",children:n.jsx("button",{type:"submit",children:j.back})})]})})})]});let y=67*q;if(console.log(`[QUEUE] Position: ${q}/${b}, Estimated time: ${y}s`),1===q){console.log(`[QUEUE] User ${t} reached position 1 - redirecting`);let e=new URLSearchParams({userId:t,lang:f});x&&e.append("clientip",x),m&&e.append("clientmac",m);let r=e.toString(),i=`/questions/display?${r}`;return console.log("[QUEUE] Redirecting to display:",i),(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{httpEquiv:"refresh",content:`0; url=${i}`}),n.jsx("title",{children:"C'est votre tour"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"\uD83C\uDF89 C'est votre tour !"}),n.jsx("p",{className:"question",children:"Redirection..."})]})})})]})}return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("meta",{httpEquiv:"refresh",content:"5"}),n.jsx("title",{children:"File d'attente"}),n.jsx("style",{children:c})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:j.queueTitle}),(0,n.jsxs)("p",{className:"question",children:["\xab ",v.question," \xbb"]}),(0,n.jsxs)("div",{className:"position",children:[q," / ",b]}),(0,n.jsxs)("div",{className:"time",children:["Temps estim\xe9 : ~",Math.floor(y/60)," min ",y%60," sec"]}),n.jsx("div",{className:"info",children:j.refresh})]})})})]})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[276,471,197,61,729],()=>r(1660));module.exports=i})();
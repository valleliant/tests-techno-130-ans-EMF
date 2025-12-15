(()=>{var e={};e.id=992,e.ids=[992],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7790:e=>{"use strict";e.exports=require("assert")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},665:e=>{"use strict";e.exports=require("dns")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},8216:e=>{"use strict";e.exports=require("net")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},2452:e=>{"use strict";e.exports=require("tls")},4175:e=>{"use strict";e.exports=require("tty")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},6005:e=>{"use strict";e.exports=require("node:crypto")},8867:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>s.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>g,tree:()=>c}),n(3432),n(2029),n(5866);var r=n(3191),i=n(8716),o=n(7922),s=n.n(o),a=n(5231),l={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);n.d(t,l);let c=["",{children:["questions",{children:["display",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,3432)),"D:\\tests techno 130 ans EMF\\src\\app\\questions\\display\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,2029)),"D:\\tests techno 130 ans EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],d=["D:\\tests techno 130 ans EMF\\src\\app\\questions\\display\\page.tsx"],u="/questions/display/page",p={require:n,loadChunk:()=>Promise.resolve()},g=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/questions/display/page",pathname:"/questions/display",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2287:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,2994,23)),Promise.resolve().then(n.t.bind(n,6114,23)),Promise.resolve().then(n.t.bind(n,9727,23)),Promise.resolve().then(n.t.bind(n,9671,23)),Promise.resolve().then(n.t.bind(n,1868,23)),Promise.resolve().then(n.t.bind(n,4759,23))},5303:()=>{},2029:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s,metadata:()=>i,viewport:()=>o});var r=n(9510);let i={title:"Portail captif EMF",description:"Questionnaire multilingue sans JavaScript client"},o={width:"device-width",initialScale:1};function s({children:e}){return r.jsx("html",{lang:"fr",children:r.jsx("body",{style:{margin:0,minHeight:"100vh",backgroundColor:"#f3f4f6",fontFamily:"Arial, sans-serif"},children:e})})}},3432:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var r=n(9510),i=n(9534),o=n(3061);let s=`
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
    max-width: 720px;
    text-align: center;
    animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 999px;
    background: #16a34a;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 20px;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.03); }
    100% { opacity: 1; transform: scale(1); }
  }
  .title {
    font-size: 24px;
    margin: 0 0 16px 0;
    color: #111827;
  }
  .question-box {
    margin: 0 auto 24px auto;
    padding: 18px 20px;
    border-radius: 10px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #111827;
    font-size: 18px;
  }
  .timer-label {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
  }
  .timer {
    font-family: "SF Mono", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 44px;
    font-weight: 700;
    color: #dc2626;
    margin-bottom: 16px;
  }
  .progress-container {
    width: 100%;
    height: 10px;
    background: #fee2e2;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .progress-bar {
    height: 100%;
    width: 100%;
    background: #dc2626;
    transition: width 0.3s linear;
  }
  .info {
    font-size: 14px;
    color: #6b7280;
    margin-top: 8px;
  }
`,a={fr:{title:"Votre question est affich\xe9e !",badge:"\uD83C\uDF89 EN COURS D'AFFICHAGE",disconnectInfo:"Vous serez automatiquement d\xe9connect\xe9 dans 30 secondes.",thankYou:"✅ Merci ! Vous allez \xeatre d\xe9connect\xe9..."},de:{title:"Ihre Frage wird angezeigt!",badge:"\uD83C\uDF89 WIRD ANGEZEIGT",disconnectInfo:"Sie werden in 30 Sekunden automatisch getrennt.",thankYou:"✅ Danke! Sie werden jetzt getrennt..."}};async function l({searchParams:e}){(0,o.l)();let t=e.userId,n=e.lang,l=e.clientip,c=e.clientmac,d="de"===n?"de":"fr",u=a[d];if(console.log("[DISPLAY] Request params:",{userId:t,lang:d,clientip:l,clientmac:c}),!t)return console.error("[DISPLAY] Missing userId in query"),(0,r.jsxs)("html",{children:[(0,r.jsxs)("head",{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),r.jsx("title",{children:"Erreur"}),r.jsx("style",{children:s})]}),r.jsx("body",{children:r.jsx("div",{className:"page",children:(0,r.jsxs)("div",{className:"card",children:[r.jsx("h1",{children:"Erreur"}),r.jsx("p",{className:"question",children:"Identifiant utilisateur manquant. Merci de recommencer."})]})})})]});let p=await (0,i.u0)(async()=>{if(!i.T8)throw Error("Redis client not initialized");return i.T8.lrange("questions:queue",0,0)},[],"LRANGE questions:queue (display)"),g=null!=p[0]?(()=>{try{return JSON.parse(p[0])}catch{return null}})():null;if(!i.jJ||!g)return console.warn("[DISPLAY] Redis unavailable or queue empty"),(0,r.jsxs)("html",{children:[(0,r.jsxs)("head",{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),r.jsx("title",{children:"Aucune question"}),r.jsx("style",{children:s})]}),r.jsx("body",{children:r.jsx("div",{className:"page",children:(0,r.jsxs)("div",{className:"card",children:[r.jsx("h1",{children:u.title}),r.jsx("p",{className:"question",children:"Aucune question en attente d'affichage."})]})})})]});if(console.log("[DISPLAY] Queue head:",g),g.userId!==t){console.warn("[DISPLAY] UserId not at head, redirecting back to queue",{expected:t,actual:g.userId});let e=new URLSearchParams({userId:t,lang:d});l&&e.append("clientip",l),c&&e.append("clientmac",c);let n=`/questions/queue?${e.toString()}`;return(0,r.jsxs)("html",{children:[(0,r.jsxs)("head",{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("meta",{httpEquiv:"refresh",content:`0; url=${n}`}),r.jsx("title",{children:"Redirection"}),r.jsx("style",{children:s})]}),r.jsx("body",{children:r.jsx("div",{className:"page",children:(0,r.jsxs)("div",{className:"card",children:[r.jsx("h1",{children:u.title}),r.jsx("p",{className:"question",children:"Redirection vers la file d'attente…"})]})})})]})}let h=`
    (function () {
      var total = 30;
      var timeRemaining = total;
      var timerEl = document.getElementById('timer');
      var progressEl = document.getElementById('progress');
      var urlParams = new URLSearchParams(window.location.search);
      if (!timerEl || !progressEl) return;
      timerEl.textContent = timeRemaining + 's';
      progressEl.style.width = '100%';

      var interval = setInterval(function () {
        timeRemaining--;
        if (timeRemaining < 0) timeRemaining = 0;
        timerEl.textContent = timeRemaining + 's';
        progressEl.style.width = (timeRemaining / total * 100) + '%';

        if (timeRemaining <= 0) {
          clearInterval(interval);
          try {
            console.log('[DISPLAY] Calling /api/disconnect');
            fetch('/api/disconnect', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: urlParams.get('userId'),
                clientip: urlParams.get('clientip'),
                clientmac: urlParams.get('clientmac')
              })
            }).catch(function (err) {
              console.error('[DISPLAY] Disconnect fetch error', err);
            }).finally(function () {
              document.body.innerHTML =
                '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);">' +
                '<div style="background:white;padding:40px 32px;border-radius:18px;box-shadow:0 12px 45px rgba(87,90,131,0.25);text-align:center;font-family:Arial,sans-serif;font-size:18px;color:#111827;">' +
                '${u.thankYou}' +
                '</div>' +
                '</div>';
            });
          } catch (e) {
            console.error('[DISPLAY] Disconnect error', e);
            document.body.innerHTML =
              '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);">' +
              '<div style="background:white;padding:40px 32px;border-radius:18px;box-shadow:0 12px 45px rgba(87,90,131,0.25);text-align:center;font-family:Arial,sans-serif;font-size:18px;color:#111827;">' +
              '${u.thankYou}' +
              '</div>' +
              '</div>';
          }
        }
      }, 1000);
    })();
  `;return(0,r.jsxs)("html",{children:[(0,r.jsxs)("head",{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),r.jsx("title",{children:u.title}),r.jsx("style",{children:s})]}),(0,r.jsxs)("body",{children:[r.jsx("div",{className:"page",children:(0,r.jsxs)("div",{className:"card",children:[r.jsx("div",{className:"badge",children:u.badge}),r.jsx("h1",{className:"title",children:u.title}),(0,r.jsxs)("div",{className:"question-box",children:["\xab ",g.question," \xbb"]}),r.jsx("div",{className:"timer-label",children:"Temps restant"}),r.jsx("div",{className:"timer",id:"timer",children:"30s"}),r.jsx("div",{className:"progress-container",children:r.jsx("div",{className:"progress-bar",id:"progress"})}),r.jsx("div",{className:"info",children:u.disconnectInfo})]})}),r.jsx("script",{dangerouslySetInnerHTML:{__html:h}})]})]})}},3676:(e,t,n)=>{"use strict";n.d(t,{c:()=>o});let r=process.env.NUMBER_DISPLAY_URL||"http://192.168.2.130/data",i=process.env.NUMBER_DISPLAY_TOKEN||"";async function o(e){if(!r)return console.warn("[NUM-DISPLAY] ⚠️ No URL configured, SKIPPING"),!1;if(!i)return console.warn("[NUM-DISPLAY] ⚠️ No token configured (NUMBER_DISPLAY_TOKEN env var), SKIPPING"),!1;let t=Math.max(0,Math.min(255,Number.isFinite(e)?Math.trunc(e):255)),n=`token=${encodeURIComponent(i)}&datain=${t}`;console.log("[NUM-DISPLAY] Sending request:",{url:r,id:t,bodyLength:n.length});try{let e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:n,signal:AbortSignal.timeout(3e3)}),t=await e.text().catch(()=>"");if(!e.ok)return console.error("[NUM-DISPLAY] ❌ HTTP Error:",e.status,t),!1;return console.log("[NUM-DISPLAY] ✓ Response OK:",e.status,t),!0}catch(e){return console.error("[NUM-DISPLAY] ❌ Network error:",e),!1}}console.log("[NUM-DISPLAY] ═══════════════════════════════════════════"),console.log("[NUM-DISPLAY] Configuration:"),console.log("[NUM-DISPLAY]   URL:",r),console.log("[NUM-DISPLAY]   Token configured:",i?"YES ("+i.length+" chars)":"NO ⚠️"),console.log("[NUM-DISPLAY] ═══════════════════════════════════════════")},3061:(e,t,n)=>{"use strict";n.d(t,{S:()=>E,l:()=>R});var r=n(6005),i=n.n(r),o=n(9534),s=n(3676),a=n(1748);let l="questions:queue";function c(){return globalThis.__queueWorkerState||(globalThis.__queueWorkerState={started:!1,instanceId:"",loopCount:0,lastActivity:0}),globalThis.__queueWorkerState}function d(e){return new Promise(t=>setTimeout(t,Math.max(0,e)))}function u(e){try{return JSON.parse(e)}catch{return null}}async function p(){let e=await (0,o.u0)(async()=>{if(!o.T8)throw Error("Redis not initialized");return o.T8.lindex(l,0)},null,"LINDEX");if(!e)return null;let t=u(e);return t?{raw:e,entry:t}:(console.warn("[WORKER] JSON invalide en t\xeate, suppression..."),await (0,o.u0)(async()=>{if(!o.T8)throw Error("Redis not initialized");await o.T8.lpop(l)},void 0,"LPOP invalid"),null)}async function g(){return(0,o.u0)(async()=>{if(!o.T8)throw Error("Redis not initialized");return o.T8.llen(l)},0,"LLEN")}async function h(){let e=await (0,o.u0)(async()=>{if(!o.T8)throw Error("Redis not initialized");return o.T8.lpop(l)},null,"LPOP");return e?u(e):null}async function m(){console.log("[WORKER] ══> Envoi IDLE aux ESP32"),console.log("[WORKER] ══> R\xe9sultat IDLE: WLED="+(await (0,a.z)("ECOLE DES METIERS DE FRIBOURG")?"✓":"✗")+", Display="+(await (0,s.c)(255)?"✓":"✗"))}async function x(e){console.log("[WORKER] ══> Envoi question ID="+e.id+" aux ESP32");let t=e.reponse_detaillee??e.question,n=await (0,a.z)(t),r=parseInt(e.id,10),i=isNaN(r)?255:r;console.log("[WORKER] ══> R\xe9sultat: WLED="+(n?"✓":"✗")+", Display="+(await (0,s.c)(i)?"✓":"✗")+" (ID="+i+")")}async function f(e){let t=c(),n=Date.now(),r=null,i=0;for(console.log("[WORKER] ═══════════════════════════════════════════════════"),console.log("[WORKER] Boucle d\xe9marr\xe9e - Instance:",e),console.log("[WORKER] ═══════════════════════════════════════════════════");;){if(t.loopCount++,t.lastActivity=Date.now(),Date.now()-n>1e4){let e=await g();console.log("[WORKER] ♥ Loop #"+t.loopCount+" | File: "+e+" | Affich\xe9: "+(r||"IDLE")),n=Date.now()}try{let e=await p();if(!e){null!==r&&(console.log("[WORKER] File vide d\xe9tect\xe9e"),await m(),r=null,i=0),await d(500);continue}e.entry.id!==r&&(console.log("[WORKER] ────────────────────────────────────────"),console.log("[WORKER] NOUVELLE QUESTION"),console.log("[WORKER] ID: "+e.entry.id),console.log("[WORKER] User: "+e.entry.userId),console.log("[WORKER] ────────────────────────────────────────"),await x(e.entry),r=e.entry.id,i=Date.now(),console.log("[WORKER] Countdown 30s d\xe9marr\xe9"));let t=Date.now()-i;if(3e4-t<=0){console.log("[WORKER] Temps \xe9coul\xe9 pour question ID="+r);let e=await h();e?console.log("[WORKER] ✓ Question supprim\xe9e: ID="+e.id):console.log("[WORKER] ⚠ LPOP retourn\xe9 null");let t=await g();console.log("[WORKER] Questions restantes: "+t),i=0,await d(200)}else await d(500)}catch(e){console.error("[WORKER] ══════════ ERREUR ══════════"),console.error("[WORKER]",e),r=null,i=0,await d(1e3)}}}function R(){let e=c();if(e.started){console.log("[WORKER] D\xe9j\xe0 d\xe9marr\xe9 (instance: "+e.instanceId+")");return}e.started=!0,e.instanceId=`w-${process.pid}-${i().randomBytes(3).toString("hex")}`,console.log("[WORKER] ═══════════════════════════════════════════════════"),console.log("[WORKER] ═══════════ D\xc9MARRAGE DU WORKER ═══════════════════"),console.log("[WORKER] ═══════════════════════════════════════════════════"),console.log("[WORKER] Instance: "+e.instanceId),console.log("[WORKER] PID: "+process.pid),console.log("[WORKER] Dur\xe9e affichage: 30000ms"),console.log("[WORKER] Intervalle poll: 500ms"),f(e.instanceId)}function E(){let e=c();return{started:e.started,instanceId:e.instanceId,loopCount:e.loopCount,lastActivity:e.lastActivity,lastActivityAgo:e.lastActivity?Date.now()-e.lastActivity:null}}},9534:(e,t,n)=>{"use strict";n.d(t,{T8:()=>i,jJ:()=>o,u0:()=>s});var r=n(2197);let i=null,o=!1;try{(i=new r.Redis({host:process.env.REDIS_HOST||"localhost",port:parseInt(process.env.REDIS_PORT||"6379",10),retryStrategy:e=>e>3?(console.error("[REDIS] Max retry attempts reached. Redis unavailable."),null):Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("connect",()=>{console.log("[REDIS] Connected successfully"),o=!0}),i.on("error",e=>{console.error("[REDIS ERROR]",e.message),o=!1})}catch(e){console.error("[REDIS] Failed to initialize:",e),i=null,o=!1}async function s(e,t,n){if(!i)return console.warn(`[REDIS FALLBACK] ${n} - Redis client not initialized, using fallback`),t;try{return await e()}catch(e){return console.error(`[REDIS ERROR] ${n} failed:`,e),t}}},1748:(e,t,n)=>{"use strict";n.d(t,{K:()=>o,z:()=>i});let r=process.env.WLED_URL||"http://192.168.2.120/json/state";async function i(e){if(!r)return console.warn("[WLED] ⚠️ No URL configured, SKIPPING"),!1;let t=e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase(),n=t.length>64?`${t.slice(0,61).trimEnd()}...`:t;console.log("[WLED] Sending text:",{url:r,text:n,textLength:n.length});try{let e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({on:!0,bri:255,mainseg:0,seg:[{id:0,start:0,stop:32,startY:0,stopY:8,grp:1,spc:0,of:0,on:!0,frz:!1,bri:255,cct:127,set:0,n:n,col:[[77,166,255],[0,0,0],[0,0,0]],fx:122,sx:200,ix:128,pal:0,c1:0,c2:128,c3:16,sel:!0,rev:!1,mi:!1,rY:!1,mY:!1,tp:!1,o1:!1,o2:!1,o3:!1,si:0,m12:0}]}),signal:AbortSignal.timeout(5e3)}),t=await e.text().catch(()=>"");if(!e.ok)return console.error("[WLED] ❌ HTTP Error:",e.status,t.substring(0,200)),!1;if(console.log("[WLED] ✓ Response OK:",e.status),t)try{let e=JSON.parse(t);console.log("[WLED] Response state:",{on:e.on,bri:e.bri,seg0_n:e.seg?.[0]?.n?.substring(0,30)})}catch{console.log("[WLED] Response (raw):",t.substring(0,100))}return!0}catch(e){return console.error("[WLED] ❌ Network error:",e),!1}}async function o(){let e=r?.replace("/json/state","/json/info");if(!e)return!1;try{let t=await fetch(e,{method:"GET",signal:AbortSignal.timeout(3e3)});if(t.ok){let e=await t.json();return console.log("[WLED] Connection test OK:",{name:e.name,ver:e.ver,ip:e.ip}),!0}return!1}catch{return console.error("[WLED] Connection test FAILED"),!1}}console.log("[WLED] ═══════════════════════════════════════════"),console.log("[WLED] Configuration:"),console.log("[WLED]   URL:",r),console.log("[WLED] ═══════════════════════════════════════════")}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[276,471,197],()=>n(8867));module.exports=r})();
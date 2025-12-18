(()=>{var e={};e.id=992,e.ids=[992],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7790:e=>{"use strict";e.exports=require("assert")},8893:e=>{"use strict";e.exports=require("buffer")},4770:e=>{"use strict";e.exports=require("crypto")},665:e=>{"use strict";e.exports=require("dns")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},8216:e=>{"use strict";e.exports=require("net")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},2452:e=>{"use strict";e.exports=require("tls")},4175:e=>{"use strict";e.exports=require("tty")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},6005:e=>{"use strict";e.exports=require("node:crypto")},5412:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>x,tree:()=>d}),r(3432),r(2029),r(5866);var i=r(3191),s=r(8716),n=r(7922),a=r.n(n),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["questions",{children:["display",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3432)),"C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\display\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,2029)),"C:\\tests-techno-130-ans-EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\display\\page.tsx"],u="/questions/display/page",p={require:r,loadChunk:()=>Promise.resolve()},x=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/display/page",pathname:"/questions/display",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2854:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},5303:()=>{},2029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a,metadata:()=>s,viewport:()=>n});var i=r(9510);let s={title:"Portail captif EMF",description:"Questionnaire multilingue sans JavaScript client"},n={width:"device-width",initialScale:1};function a({children:e}){return i.jsx("html",{lang:"fr",children:i.jsx("body",{style:{margin:0,minHeight:"100vh",backgroundColor:"#f3f4f6",fontFamily:"Arial, sans-serif"},children:e})})}},3432:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var i=r(9510),s=r(9534),n=r(3061);let a=`
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
`,o={fr:{title:"Votre question est affich\xe9e !",badge:"\uD83C\uDF89 EN COURS D'AFFICHAGE",disconnectInfo:"Vous serez automatiquement d\xe9connect\xe9 dans 70 secondes.",thankYou:"✅ Merci ! Vous allez \xeatre d\xe9connect\xe9..."},de:{title:"Ihre Frage wird angezeigt!",badge:"\uD83C\uDF89 WIRD ANGEZEIGT",disconnectInfo:"Sie werden in 70 Sekunden automatisch getrennt.",thankYou:"✅ Danke! Sie werden jetzt getrennt..."}};async function l({searchParams:e}){(0,n.l)();let t=e.userId,r=e.lang,l=e.clientip,d=e.clientmac,c="de"===r?"de":"fr",u=o[c];if(console.log("[DISPLAY] Request params:",{userId:t,lang:c,clientip:l,clientmac:d}),!t)return console.error("[DISPLAY] Missing userId in query"),(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"Erreur"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:"Erreur"}),i.jsx("p",{className:"question",children:"Identifiant utilisateur manquant. Merci de recommencer."})]})})})]});let p=await (0,s.u0)(async()=>{if(!s.T8)throw Error("Redis client not initialized");return s.T8.lrange("questions:queue",0,0)},[],"LRANGE questions:queue (display)"),x=null!=p[0]?(()=>{try{return JSON.parse(p[0])}catch{return null}})():null;if(!s.jJ||!x)return console.warn("[DISPLAY] Redis unavailable or queue empty"),(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"Aucune question"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:u.title}),i.jsx("p",{className:"question",children:"Aucune question en attente d'affichage."})]})})})]});if(console.log("[DISPLAY] Queue head:",x),x.userId!==t){console.warn("[DISPLAY] UserId not at head, redirecting back to queue",{expected:t,actual:x.userId});let e=new URLSearchParams({userId:t,lang:c});l&&e.append("clientip",l),d&&e.append("clientmac",d);let r=`/questions/queue?${e.toString()}`;return(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{httpEquiv:"refresh",content:`0; url=${r}`}),i.jsx("title",{children:"Redirection"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:u.title}),i.jsx("p",{className:"question",children:"Redirection vers la file d'attente…"})]})})})]})}let m=`
    (function () {
      var total = 70;
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
  `;return(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:u.title}),i.jsx("style",{children:a})]}),(0,i.jsxs)("body",{children:[i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("div",{className:"badge",children:u.badge}),i.jsx("h1",{className:"title",children:u.title}),(0,i.jsxs)("div",{className:"question-box",children:["\xab ",x.question," \xbb"]}),i.jsx("div",{className:"timer-label",children:"Temps restant"}),i.jsx("div",{className:"timer",id:"timer",children:"70s"}),i.jsx("div",{className:"progress-container",children:i.jsx("div",{className:"progress-bar",id:"progress"})}),i.jsx("div",{className:"info",children:u.disconnectInfo})]})}),i.jsx("script",{dangerouslySetInnerHTML:{__html:m}})]})]})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[276,471,197,61],()=>r(5412));module.exports=i})();
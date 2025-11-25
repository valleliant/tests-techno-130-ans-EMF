(()=>{var e={};e.id=865,e.ids=[865],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3718:(e,i,t)=>{"use strict";t.r(i),t.d(i,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>l}),t(8814),t(2029),t(5866);var n=t(3191),s=t(8716),r=t(7922),o=t.n(r),a=t(5231),d={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);t.d(i,d);let l=["",{children:["questions",{children:["categories",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8814)),"D:\\tests techno 130 ans EMF\\src\\app\\questions\\categories\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,2029)),"D:\\tests techno 130 ans EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\tests techno 130 ans EMF\\src\\app\\questions\\categories\\page.tsx"],u="/questions/categories/page",p={require:t,loadChunk:()=>Promise.resolve()},h=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/categories/page",pathname:"/questions/categories",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2287:(e,i,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},5303:()=>{},2029:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>o,metadata:()=>s,viewport:()=>r});var n=t(9510);let s={title:"Portail captif EMF",description:"Questionnaire multilingue sans JavaScript client"},r={width:"device-width",initialScale:1};function o({children:e}){return n.jsx("html",{lang:"fr",children:n.jsx("body",{style:{margin:0,minHeight:"100vh",backgroundColor:"#f3f4f6",fontFamily:"Arial, sans-serif"},children:e})})}},8814:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>a});var n=t(9510),s=t(2898);let r={fr:{technologie:"\uD83D\uDCBB Technologie",loisirs:"\uD83C\uDFA8 Loisirs",general:"\uD83C\uDF1F G\xe9n\xe9ral"},de:{technologie:"\uD83D\uDCBB Technologie",freizeit:"\uD83C\uDFA8 Freizeit",allgemein:"\uD83C\uDF1F Allgemein"}},o=`
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
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 640px;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 24px;
    color: #111827;
    text-align: center;
  }
  .buttons {
    display: grid;
    gap: 12px;
  }
  form {
    margin: 0;
  }
  button {
    width: 100%;
    border: none;
    border-radius: 999px;
    padding: 14px 18px;
    font-size: 16px;
    cursor: pointer;
    background: #2563eb;
    color: #ffffff;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  }
  button:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  }
  .back button {
    background: #e5e7eb;
    color: #111827;
    box-shadow: none;
  }
  .back button:hover {
    background: #d1d5db;
  }
  .info {
    text-align: center;
    margin-top: 16px;
    color: #6b7280;
    font-size: 14px;
  }
`;function a({searchParams:e}){let i="de"===e.lang?"de":"fr"===e.lang?"fr":void 0,t=e.clientip??"",a=e.clientmac??"";if(!i)return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("title",{children:"Choix cat\xe9gorie"}),n.jsx("style",{children:o})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"Langue invalide"}),n.jsx("div",{className:"buttons back",children:(0,n.jsxs)("form",{method:"GET",action:"/questions",children:[n.jsx("input",{type:"hidden",name:"clientip",value:t}),n.jsx("input",{type:"hidden",name:"clientmac",value:a}),n.jsx("button",{type:"submit",children:"Retour"})]})})]})})})]});let d=Object.keys(s[i]||{});console.log(`[CATEGORIES] Lang: ${i}, Categories: ${d.join(", ")}`);let l=r[i];return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("title",{children:"Choix cat\xe9gorie"}),n.jsx("style",{children:o})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"S\xe9lectionnez une cat\xe9gorie"}),n.jsx("div",{className:"buttons",children:d.map(e=>(0,n.jsxs)("form",{method:"GET",action:"/questions/list",children:[n.jsx("input",{type:"hidden",name:"lang",value:i}),n.jsx("input",{type:"hidden",name:"clientip",value:t}),n.jsx("input",{type:"hidden",name:"clientmac",value:a}),n.jsx("button",{type:"submit",name:"category",value:e,children:l?.[e]||e})]},e))}),n.jsx("div",{className:"buttons back",style:{marginTop:"24px"},children:(0,n.jsxs)("form",{method:"GET",action:"/questions",children:[n.jsx("input",{type:"hidden",name:"clientip",value:t}),n.jsx("input",{type:"hidden",name:"clientmac",value:a}),n.jsx("button",{type:"submit",children:"← Retour"})]})}),n.jsx("div",{className:"info",children:"fr"===i?"Choisissez une cat\xe9gorie pour afficher les questions.":"W\xe4hlen Sie eine Kategorie, um die Fragen anzuzeigen."})]})})})]})}},2898:e=>{"use strict";e.exports=JSON.parse('{"fr":{"technologie":[{"id":"1","question":"Quel est votre langage de programmation pr\xe9f\xe9r\xe9 ?"},{"id":"2","question":"Pr\xe9f\xe9rez-vous iOS ou Android ?"},{"id":"3","question":"Quel est votre \xe9diteur de code favori ?"}],"loisirs":[{"id":"4","question":"Quel est votre film pr\xe9f\xe9r\xe9 ?"},{"id":"5","question":"Quel sport pratiquez-vous ?"},{"id":"6","question":"Quel est votre livre pr\xe9f\xe9r\xe9 ?"}],"general":[{"id":"7","question":"Quelle est votre couleur pr\xe9f\xe9r\xe9e ?"},{"id":"8","question":"Caf\xe9 ou th\xe9 ?"}]},"de":{"technologie":[{"id":"9","question":"Was ist Ihre bevorzugte Programmiersprache?"},{"id":"10","question":"Bevorzugen Sie iOS oder Android?"},{"id":"11","question":"Was ist Ihr bevorzugter Code-Editor?"}],"freizeit":[{"id":"12","question":"Was ist Ihr Lieblingsfilm?"},{"id":"13","question":"Welchen Sport treiben Sie?"},{"id":"14","question":"Was ist Ihr Lieblingsbuch?"}],"allgemein":[{"id":"15","question":"Was ist Ihre Lieblingsfarbe?"},{"id":"16","question":"Kaffee oder Tee?"}]}}')}};var i=require("../../../webpack-runtime.js");i.C(e);var t=e=>i(i.s=e),n=i.X(0,[276,471],()=>t(3718));module.exports=n})();
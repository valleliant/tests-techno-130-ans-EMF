"use strict";(()=>{var e={};e.id=865,e.ids=[865],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9159:(e,t,i)=>{i.r(t),i.d(t,{GlobalError:()=>a.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>l}),i(8814),i(2029),i(5866);var n=i(3191),s=i(8716),r=i(7922),a=i.n(r),o=i(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);i.d(t,d);let l=["",{children:["questions",{children:["categories",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,8814)),"C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\categories\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,2029)),"C:\\tests-techno-130-ans-EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(i.t.bind(i,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\categories\\page.tsx"],u="/questions/categories/page",h={require:i,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/categories/page",pathname:"/questions/categories",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},8814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>o});var n=i(9510),s=i(2898);let r={fr:{metiers_actuels:"\uD83D\uDEE0️ M\xe9tiers actuels",histoire_ecole:"\uD83C\uDFEB Histoire de l’\xe9cole",personnalites_illustres:"⭐ Personnalit\xe9s illustres",anciens_metiers:"\uD83D\uDCDC Anciens m\xe9tiers",histoire_metiers_actuels:"\uD83D\uDCDA Histoire des m\xe9tiers actuels",emf_histoire_ville:"\uD83C\uDFD9️ EMF & histoire de la ville"},de:{aktuelle_berufe:"\uD83D\uDEE0️ Aktuelle Berufe",geschichte_schule:"\uD83C\uDFEB Geschichte der Schule",fruehere_berufe:"\uD83D\uDCDC Fr\xfchere Berufe",geschichte_heutigen_berufe:"\uD83D\uDCDA Geschichte der heutigen Berufe",emf_geschichte_stadt:"\uD83C\uDFD9️ EMF & Geschichte der Stadt",beruehmte_persoenlichkeiten:"⭐ Ber\xfchmte Pers\xf6nlichkeiten"}},a=`
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
`;function o({searchParams:e}){let t="de"===e.lang?"de":"fr"===e.lang?"fr":void 0,i=e.clientip??"",o=e.clientmac??"";if(!t)return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("title",{children:"Choix cat\xe9gorie"}),n.jsx("style",{children:a})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"Langue invalide"}),n.jsx("div",{className:"buttons back",children:(0,n.jsxs)("form",{method:"GET",action:"/questions",children:[n.jsx("input",{type:"hidden",name:"clientip",value:i}),n.jsx("input",{type:"hidden",name:"clientmac",value:o}),n.jsx("button",{type:"submit",children:"Retour"})]})})]})})})]});let d=Object.keys(s[t]||{});console.log(`[CATEGORIES] Lang: ${t}, Categories: ${d.join(", ")}`);let l=r[t];return(0,n.jsxs)("html",{children:[(0,n.jsxs)("head",{children:[n.jsx("meta",{charSet:"utf-8"}),n.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),n.jsx("title",{children:"Choix cat\xe9gorie"}),n.jsx("style",{children:a})]}),n.jsx("body",{children:n.jsx("div",{className:"page",children:(0,n.jsxs)("div",{className:"card",children:[n.jsx("h1",{children:"S\xe9lectionnez une cat\xe9gorie"}),n.jsx("div",{className:"buttons",children:d.map(e=>(0,n.jsxs)("form",{method:"GET",action:"/questions/list",children:[n.jsx("input",{type:"hidden",name:"lang",value:t}),n.jsx("input",{type:"hidden",name:"clientip",value:i}),n.jsx("input",{type:"hidden",name:"clientmac",value:o}),n.jsx("button",{type:"submit",name:"category",value:e,children:l?.[e]||e})]},e))}),n.jsx("div",{className:"buttons back",style:{marginTop:"24px"},children:(0,n.jsxs)("form",{method:"GET",action:"/questions",children:[n.jsx("input",{type:"hidden",name:"clientip",value:i}),n.jsx("input",{type:"hidden",name:"clientmac",value:o}),n.jsx("button",{type:"submit",children:"← Retour"})]})}),n.jsx("div",{className:"info",children:"fr"===t?"Choisissez une cat\xe9gorie pour afficher les questions.":"W\xe4hlen Sie eine Kategorie, um die Fragen anzuzeigen."})]})})})]})}}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),n=t.X(0,[276,471,729],()=>i(9159));module.exports=n})();
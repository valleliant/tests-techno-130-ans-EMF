"use strict";(()=>{var e={};e.id=56,e.ids=[56],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2226:(e,t,n)=>{n.r(t),n.d(t,{GlobalError:()=>r.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>l}),n(510),n(2029),n(5866);var i=n(3191),s=n(8716),a=n(7922),r=n.n(a),o=n(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);n.d(t,d);let l=["",{children:["questions",{children:["list",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,510)),"C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\list\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,2029)),"C:\\tests-techno-130-ans-EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\list\\page.tsx"],p="/questions/list/page",u={require:n,loadChunk:()=>Promise.resolve()},x=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/list/page",pathname:"/questions/list",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},510:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});var i=n(9510),s=n(2898);let a=`
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
    max-width: 700px;
  }
  h1 {
    margin: 0 0 20px 0;
    font-size: 24px;
    color: #111827;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }
  label:hover {
    border-color: #bfdbfe;
    background: #f9fafb;
  }
  input[type="radio"] {
    margin-top: 4px;
  }
  button {
    padding: 14px 18px;
    font-size: 16px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    margin-top: 12px;
  }
  .submit {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
  }
  .submit:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  }
  .back {
    background: #e5e7eb;
    color: #111827;
  }
`;function r({searchParams:e}){let t="de"===e.lang?"de":"fr"===e.lang?"fr":void 0,n=e.category,r=e.clientip??"",o=e.clientmac??"";if(!t||!n)return(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"Questions"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:"Param\xe8tres manquants"}),(0,i.jsxs)("form",{method:"GET",action:"/questions",children:[i.jsx("input",{type:"hidden",name:"clientip",value:r}),i.jsx("input",{type:"hidden",name:"clientmac",value:o}),i.jsx("button",{type:"submit",className:"back",children:"Retour"})]})]})})})]});let d=s[t]?.[n]||[];return(console.log(`[QUESTIONS LIST] Lang: ${t}, Category: ${n}, Count: ${d.length}`),0===d.length)?(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"Questions"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:"Aucune question pour cette cat\xe9gorie"}),(0,i.jsxs)("form",{method:"GET",action:"/questions/categories",children:[i.jsx("input",{type:"hidden",name:"lang",value:t}),i.jsx("input",{type:"hidden",name:"clientip",value:r}),i.jsx("input",{type:"hidden",name:"clientmac",value:o}),i.jsx("button",{type:"submit",className:"back",children:"Retour aux cat\xe9gories"})]})]})})})]}):(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"Questions"}),i.jsx("style",{children:a})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"card",children:[i.jsx("h1",{children:"Choisissez une question"}),(0,i.jsxs)("form",{method:"GET",action:"/questions/queue",children:[i.jsx("input",{type:"hidden",name:"lang",value:t}),i.jsx("input",{type:"hidden",name:"category",value:n}),i.jsx("input",{type:"hidden",name:"clientip",value:r}),i.jsx("input",{type:"hidden",name:"clientmac",value:o}),d.map(e=>(0,i.jsxs)("label",{children:[i.jsx("input",{type:"radio",name:"questionId",value:e.id,required:!0}),i.jsx("span",{children:e.question})]},e.id)),i.jsx("button",{type:"submit",className:"submit",children:"✅ Valider"})]}),(0,i.jsxs)("form",{method:"GET",action:"/questions/categories",children:[i.jsx("input",{type:"hidden",name:"lang",value:t}),i.jsx("input",{type:"hidden",name:"clientip",value:r}),i.jsx("input",{type:"hidden",name:"clientmac",value:o}),i.jsx("button",{type:"submit",className:"back",children:"← Retour"})]})]})})})]})}}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),i=t.X(0,[276,471,729],()=>n(2226));module.exports=i})();
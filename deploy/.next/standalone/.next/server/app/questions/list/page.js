(()=>{var e={};e.id=56,e.ids=[56],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},596:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>l}),i(510),i(2029),i(5866);var s=i(3191),n=i(8716),r=i(7922),a=i.n(r),o=i(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);i.d(t,d);let l=["",{children:["questions",{children:["list",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,510)),"D:\\tests techno 130 ans EMF\\src\\app\\questions\\list\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(i.bind(i,2029)),"D:\\tests techno 130 ans EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(i.t.bind(i,5866,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\tests techno 130 ans EMF\\src\\app\\questions\\list\\page.tsx"],u="/questions/list/page",p={require:i,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/questions/list/page",pathname:"/questions/list",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2287:(e,t,i)=>{Promise.resolve().then(i.t.bind(i,2994,23)),Promise.resolve().then(i.t.bind(i,6114,23)),Promise.resolve().then(i.t.bind(i,9727,23)),Promise.resolve().then(i.t.bind(i,9671,23)),Promise.resolve().then(i.t.bind(i,1868,23)),Promise.resolve().then(i.t.bind(i,4759,23))},5303:()=>{},2029:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>a,metadata:()=>n,viewport:()=>r});var s=i(9510);let n={title:"Portail captif EMF",description:"Questionnaire multilingue sans JavaScript client"},r={width:"device-width",initialScale:1};function a({children:e}){return s.jsx("html",{lang:"fr",children:s.jsx("body",{style:{margin:0,minHeight:"100vh",backgroundColor:"#f3f4f6",fontFamily:"Arial, sans-serif"},children:e})})}},510:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>a});var s=i(9510),n=i(2898);let r=`
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
`;function a({searchParams:e}){let t="de"===e.lang?"de":"fr"===e.lang?"fr":void 0,i=e.category,a=e.clientip??"",o=e.clientmac??"";if(!t||!i)return(0,s.jsxs)("html",{children:[(0,s.jsxs)("head",{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),s.jsx("title",{children:"Questions"}),s.jsx("style",{children:r})]}),s.jsx("body",{children:s.jsx("div",{className:"page",children:(0,s.jsxs)("div",{className:"card",children:[s.jsx("h1",{children:"Param\xe8tres manquants"}),(0,s.jsxs)("form",{method:"GET",action:"/questions",children:[s.jsx("input",{type:"hidden",name:"clientip",value:a}),s.jsx("input",{type:"hidden",name:"clientmac",value:o}),s.jsx("button",{type:"submit",className:"back",children:"Retour"})]})]})})})]});let d=n[t]?.[i]||[];return(console.log(`[QUESTIONS LIST] Lang: ${t}, Category: ${i}, Count: ${d.length}`),0===d.length)?(0,s.jsxs)("html",{children:[(0,s.jsxs)("head",{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),s.jsx("title",{children:"Questions"}),s.jsx("style",{children:r})]}),s.jsx("body",{children:s.jsx("div",{className:"page",children:(0,s.jsxs)("div",{className:"card",children:[s.jsx("h1",{children:"Aucune question pour cette cat\xe9gorie"}),(0,s.jsxs)("form",{method:"GET",action:"/questions/categories",children:[s.jsx("input",{type:"hidden",name:"lang",value:t}),s.jsx("input",{type:"hidden",name:"clientip",value:a}),s.jsx("input",{type:"hidden",name:"clientmac",value:o}),s.jsx("button",{type:"submit",className:"back",children:"Retour aux cat\xe9gories"})]})]})})})]}):(0,s.jsxs)("html",{children:[(0,s.jsxs)("head",{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),s.jsx("title",{children:"Questions"}),s.jsx("style",{children:r})]}),s.jsx("body",{children:s.jsx("div",{className:"page",children:(0,s.jsxs)("div",{className:"card",children:[s.jsx("h1",{children:"Choisissez une question"}),(0,s.jsxs)("form",{method:"GET",action:"/questions/queue",children:[s.jsx("input",{type:"hidden",name:"lang",value:t}),s.jsx("input",{type:"hidden",name:"category",value:i}),s.jsx("input",{type:"hidden",name:"clientip",value:a}),s.jsx("input",{type:"hidden",name:"clientmac",value:o}),d.map(e=>(0,s.jsxs)("label",{children:[s.jsx("input",{type:"radio",name:"questionId",value:e.id,required:!0}),s.jsx("span",{children:e.question})]},e.id)),s.jsx("button",{type:"submit",className:"submit",children:"✅ Valider"})]}),(0,s.jsxs)("form",{method:"GET",action:"/questions/categories",children:[s.jsx("input",{type:"hidden",name:"lang",value:t}),s.jsx("input",{type:"hidden",name:"clientip",value:a}),s.jsx("input",{type:"hidden",name:"clientmac",value:o}),s.jsx("button",{type:"submit",className:"back",children:"← Retour"})]})]})})})]})}},2898:e=>{"use strict";e.exports=JSON.parse('{"fr":{"technologie":[{"id":"1","question":"Quel est votre langage de programmation pr\xe9f\xe9r\xe9 ?"},{"id":"2","question":"Pr\xe9f\xe9rez-vous iOS ou Android ?"},{"id":"3","question":"Quel est votre \xe9diteur de code favori ?"}],"loisirs":[{"id":"4","question":"Quel est votre film pr\xe9f\xe9r\xe9 ?"},{"id":"5","question":"Quel sport pratiquez-vous ?"},{"id":"6","question":"Quel est votre livre pr\xe9f\xe9r\xe9 ?"}],"general":[{"id":"7","question":"Quelle est votre couleur pr\xe9f\xe9r\xe9e ?"},{"id":"8","question":"Caf\xe9 ou th\xe9 ?"}]},"de":{"technologie":[{"id":"9","question":"Was ist Ihre bevorzugte Programmiersprache?"},{"id":"10","question":"Bevorzugen Sie iOS oder Android?"},{"id":"11","question":"Was ist Ihr bevorzugter Code-Editor?"}],"freizeit":[{"id":"12","question":"Was ist Ihr Lieblingsfilm?"},{"id":"13","question":"Welchen Sport treiben Sie?"},{"id":"14","question":"Was ist Ihr Lieblingsbuch?"}],"allgemein":[{"id":"15","question":"Was ist Ihre Lieblingsfarbe?"},{"id":"16","question":"Kaffee oder Tee?"}]}}')}};var t=require("../../../webpack-runtime.js");t.C(e);var i=e=>t(t.s=e),s=t.X(0,[276,471],()=>i(596));module.exports=s})();
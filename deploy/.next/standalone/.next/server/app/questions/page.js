(()=>{var e={};e.id=844,e.ids=[844],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7502:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>l}),n(5797),n(2029),n(5866);var i=n(3191),s=n(8716),r=n(7922),o=n.n(r),a=n(5231),d={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>a[e]);n.d(t,d);let l=["",{children:["questions",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,5797)),"C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,2029)),"C:\\tests-techno-130-ans-EMF\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\tests-techno-130-ans-EMF\\src\\app\\questions\\page.tsx"],p="/questions/page",u={require:n,loadChunk:()=>Promise.resolve()},x=new i.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/questions/page",pathname:"/questions",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2854:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,2994,23)),Promise.resolve().then(n.t.bind(n,6114,23)),Promise.resolve().then(n.t.bind(n,9727,23)),Promise.resolve().then(n.t.bind(n,9671,23)),Promise.resolve().then(n.t.bind(n,1868,23)),Promise.resolve().then(n.t.bind(n,4759,23))},5303:()=>{},2029:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o,metadata:()=>s,viewport:()=>r});var i=n(9510);let s={title:"Portail captif EMF",description:"Questionnaire multilingue sans JavaScript client"},r={width:"device-width",initialScale:1};function o({children:e}){return i.jsx("html",{lang:"fr",children:i.jsx("body",{style:{margin:0,minHeight:"100vh",backgroundColor:"#f3f4f6",fontFamily:"Arial, sans-serif"},children:e})})}},5797:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});var i=n(9510);let s=`
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
    background: #f3f4f6;
    padding: 24px;
  }
  .container {
    background: #ffffff;
    padding: 32px 28px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    width: 100%;
    max-width: 520px;
    text-align: center;
  }
  h1 {
    color: #111827;
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 1.4;
  }
  form {
    margin-bottom: 15px;
  }
  button {
    width: 100%;
    padding: 16px;
    font-size: 20px;
    background: #2563eb;
    color: #ffffff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }
  button:hover {
    background: #1d4ed8;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.3);
  }
  @media (max-width: 600px) {
    .container {
      padding: 28px 20px;
    }
    h1 {
      font-size: 20px;
    }
    button {
      font-size: 18px;
      padding: 14px;
    }
  }
`;function r({searchParams:e}){console.log("[QUESTIONS PAGE] Received tok:",e.tok?"present":"missing"),console.log("[QUESTIONS PAGE] Received hid:",e.hid?"present":"missing"),console.log("[QUESTIONS PAGE] clientip:",e.clientip?"present":"missing",", clientmac:",e.clientmac?"present":"missing");let t=e.clientip??"",n=e.clientmac??"";return(0,i.jsxs)("html",{children:[(0,i.jsxs)("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),i.jsx("title",{children:"S\xe9lection langue"}),i.jsx("style",{children:s})]}),i.jsx("body",{children:i.jsx("div",{className:"page",children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsxs)("h1",{children:["Choisissez votre langue",i.jsx("br",{}),"W\xe4hlen Sie Ihre Sprache"]}),(0,i.jsxs)("form",{method:"GET",action:"/questions/categories",children:[i.jsx("input",{type:"hidden",name:"clientip",value:t}),i.jsx("input",{type:"hidden",name:"clientmac",value:n}),i.jsx("button",{type:"submit",name:"lang",value:"fr",children:"\uD83C\uDDEB\uD83C\uDDF7 Fran\xe7ais"})]}),(0,i.jsxs)("form",{method:"GET",action:"/questions/categories",children:[i.jsx("input",{type:"hidden",name:"clientip",value:t}),i.jsx("input",{type:"hidden",name:"clientmac",value:n}),i.jsx("button",{type:"submit",name:"lang",value:"de",children:"\uD83C\uDDE9\uD83C\uDDEA Deutsch"})]})]})})})]})}}};var t=require("../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),i=t.X(0,[276,471],()=>n(7502));module.exports=i})();
if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let c={};const o=e=>s(e,t),d={module:{uri:t},exports:c,require:o};i[t]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(r(...e),c)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CmHmrNGo.js",revision:null},{url:"assets/index-Mq4E93x2.css",revision:null},{url:"index.html",revision:"8a7648314fad9fcde312c88a8e343e0e"},{url:"privacy.html",revision:"018ba1f665e345247cccc14c1b65194e"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.svg",revision:"dcc6f87174b81c6110d653d54210881d"},{url:"web-app-manifest-192x192.png",revision:"3845a055e8a60d9471f8b3dd49dfc29a"},{url:"web-app-manifest-512x512.png",revision:"9b4901012de2030a5acdca1579b05aea"},{url:"manifest.webmanifest",revision:"ed3661c1a5f8ee879f9dc034568849c1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

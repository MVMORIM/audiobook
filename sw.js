const V='livrouve-shell-v1';
// Lista de arquivos que realmente existem no projeto
const SHELL=[
  './',
  './index.html',
  './%C3%ADcone-cin%C3%A1rio-32.png',
  './%C3%ADcone-cin%C3%A1rio-48.png',
  './%C3%ADcone-cin%C3%A1rio-180.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(k=>Promise.all(
      k.filter(n=>n.startsWith('livrouve-shell-')&&n!==V).map(n=>caches.delete(n))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  
  // Cópias offline dos livros são tratadas pelo app
  if(u.pathname.includes('/readera-offline/')||u.pathname.includes('/cineario-offline/')) return;
  
  // Estratégia: Rede primeiro, cache como fallback
  e.respondWith(
    fetch(r).then(res=>{
      if(res && (res.ok || res.type==='opaque')){
        const c=res.clone();
        caches.open(V).then(x=>x.put(r,c)).catch(()=>{});
      }
      return res;
    })
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('./'):Response.error())))
  );
});
/* Hors ligne (modèle du portail mon-eps) : l'appli est gardée sur la tablette à la première ouverture avec internet.
   La page est rechargée depuis GitHub si le réseau répond en moins de 3 s, sinon depuis la tablette ;
   les autres fichiers sont servis depuis la tablette et mis à jour en arrière-plan.
   Après une modification des fichiers : augmenter CACHE (bde-v1 → bde-v2…). Nouvelle image : l'ajouter à IMAGES. */
const CACHE='bde-v5';
const FICHIERS=['./','index.html','app.js','eleve-plus.js','demo.js','logique.js','donnees.js','schemas.js','images.js','videos.js','qrcode.js','jsqr.js','scan.js','manifest.webmanifest',
  'icon-32.png','icon-180.png','icon-192.png','icon-512.png','polices/archivo.woff2','polices/atkinson-400.woff2','polices/atkinson-700.woff2'];
const IMAGES=['img/ex1.jpg','img/ex2.jpg','img/ex3.jpg','img/ex4.jpg','img/ex5.jpg','img/ex6.jpg','img/ex7.jpg','img/ex8.jpg','img/ex9.jpg','img/ex10.jpg','img/ex11.jpg','img/ex12.jpg','img/ex13.jpg','img/ex14.jpg','img/ex15.jpg','img/ex16.jpg','img/ex17.jpg','img/ex18.jpg','img/ex19.jpg','img/ex20.jpg','img/ex21.jpg','img/ex22.jpg','img/ex23.jpg','img/ex24.jpg','img/ex25.jpg','img/ex26.jpg','img/exA1.jpg','img/exA2.jpg','img/exA3.jpg','img/exA4.jpg','img/exR1.jpg','img/exR2.jpg','img/exR3.jpg','img/exR4.jpg','img/exR5.jpg','img/exR6.jpg','img/exR7.jpg','img/exR8.jpg','img/exR9.jpg','img/exR10.jpg','img/exR11.jpg','img/mt1.jpg','img/mt2.jpg','img/mt3.jpg','img/mt5.jpg','img/mt7.jpg','img/mt8.jpg','img/mt9.jpg','img/mt10.jpg','img/mt11.jpg','img/mt12.jpg'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);
  await Promise.all(FICHIERS.concat(IMAGES).map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE);
    try{const net=await Promise.race([fetch(r),new Promise((_,no)=>setTimeout(no,3000))]);if(net&&net.ok){c.put('index.html',net.clone());return net}throw 0}
    catch(x){return (await c.match('index.html'))||(await c.match('./'))||fetch(r)}})());return}
  e.respondWith((async()=>{const c=await caches.open(CACHE);
    const hit=await c.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}
    return (await net)||Response.error()})());
});

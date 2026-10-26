/* Schémas de terrain du cycle badminton : copie de badminton-donnees.js (dépôt cycle-badminton),
   enfermée dans une fonction pour ne pas gêner les variables de l’appli. Seuls SCH, tt et salle sont utilisés. */
window.BSCH=(function(){
/* Données du cycle de badminton (Lycée G. Pompidou) : séances, schémas, échauffements.
   Partagées par l'écran de cours (index.html) et l'outil complet (cycle-badminton-old.html). */
let SID=0;
const S=44, MX=1.5, MY=1.0, CL=13.4, CW=6.1, NET=6.7, SSL=1.98, LSD=0.76, SSI=0.46;
const X=m=>(m+MX)*S, Y=m=>(m+MY)*S;
function arrowPath(a,b,bend){
  const [x1,y1]=[X(a[0]),Y(a[1])],[x2,y2]=[X(b[0]),Y(b[1])];
  if(!bend) return {d:`M${x1},${y1} L${x2},${y2}`};
  const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1;
  const cx=mx-dy/len*bend*S, cy=my+dx/len*bend*S;
  return {d:`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`};
}
function svgDefs(id){
  return `<defs>
   <marker id="${id}b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="c-head-b"/></marker>
   <marker id="${id}r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="c-head-r"/></marker>
   <marker id="${id}g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="c-head-g"/></marker>
   <marker id="${id}o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="c-head-o"/></marker>
  </defs>`;
}
function court(sp){
  const id='s'+(++SID);
  const W=(CL+2*MX)*S,H=(CW+2*MY)*S;
  const L=(x1,y1,x2,y2,c)=>`<line class="${c||'c-line'}" x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}"/>`;
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sp.alt||'Schéma de terrain'}" xmlns="http://www.w3.org/2000/svg">${svgDefs(id)}`;
  g+=`<rect class="c-floor" x="${X(-0.25)}" y="${Y(-0.25)}" width="${(CL+0.5)*S}" height="${(CW+0.5)*S}" rx="4"/>`;
  g+=`<rect class="c-line" x="${X(0)}" y="${Y(0)}" width="${CL*S}" height="${CW*S}"/>`;
  g+=L(0,SSI,CL,SSI)+L(0,CW-SSI,CL,CW-SSI);
  g+=L(NET-SSL,0,NET-SSL,CW)+L(NET+SSL,0,NET+SSL,CW);
  g+=L(LSD,0,LSD,CW)+L(CL-LSD,0,CL-LSD,CW);
  g+=L(0,CW/2,NET-SSL,CW/2)+L(NET+SSL,CW/2,CL,CW/2);
  if(sp.half) g+=L(NET-SSL,CW/2,NET+SSL,CW/2,'c-mid');
  (sp.zones||[]).forEach(z=>{g+=`<rect class="c-zone${z.no?' no':''}" x="${X(z.x)}" y="${Y(z.y)}" width="${z.w*S}" height="${z.h*S}" rx="3"/>`; if(z.t) g+=`<text class="c-zonet" x="${X(z.x+z.w/2)}" y="${Y(z.y)+13}" text-anchor="middle">${z.t}</text>`});
  g+=`<line class="c-net" x1="${X(NET)}" y1="${Y(-0.3)}" x2="${X(NET)}" y2="${Y(CW+0.3)}"/><circle class="c-netpost" cx="${X(NET)}" cy="${Y(-0.3)}" r="4"/><circle class="c-netpost" cx="${X(NET)}" cy="${Y(CW+0.3)}" r="4"/>`;
  (sp.targets||[]).forEach(t=>{g+=`<circle class="c-target" cx="${X(t.x)}" cy="${Y(t.y)}" r="${(t.r||0.5)*S}"/>`; if(t.t) g+=`<text class="c-labt" x="${X(t.x)}" y="${Y(t.y)+4}" text-anchor="middle">${t.t}</text>`});
  (sp.cones||[]).forEach(c=>{g+=`<path class="c-cone" d="M${X(c[0])},${Y(c[1])-8} L${X(c[0])+7},${Y(c[1])+6} L${X(c[0])-7},${Y(c[1])+6} z"/>`});
  (sp.baskets||[]).forEach(b=>{g+=`<rect class="c-basket" x="${X(b[0])-11}" y="${Y(b[1])-8}" width="22" height="16" rx="3"/><circle class="c-bounce" cx="${X(b[0])-4}" cy="${Y(b[1])}" r="3"/><circle class="c-bounce" cx="${X(b[0])+4}" cy="${Y(b[1])}" r="3"/>`});
  (sp.sheets||[]).forEach(b=>{g+=`<rect class="c-sheet" x="${X(b[0])-8}" y="${Y(b[1])-10}" width="16" height="20" rx="2"/><line class="c-sheet" x1="${X(b[0])-4}" y1="${Y(b[1])-4}" x2="${X(b[0])+4}" y2="${Y(b[1])-4}"/><line class="c-sheet" x1="${X(b[0])-4}" y1="${Y(b[1])+1}" x2="${X(b[0])+4}" y2="${Y(b[1])+1}"/><line class="c-sheet" x1="${X(b[0])-4}" y1="${Y(b[1])+6}" x2="${X(b[0])+2}" y2="${Y(b[1])+6}"/>`});
  (sp.runs||[]).forEach(r=>{const p=arrowPath(r[0],r[1],r[2]||0);g+=`<path class="c-run" d="${p.d}" marker-end="url(#${id}r)"/>`});
  (sp.balls||[]).forEach(r=>{const p=arrowPath(r[0],r[1],r[2]===undefined?-0.5:r[2]);g+=`<path class="c-ball" d="${p.d}" marker-end="url(#${id}b)"/><circle class="c-bounce" cx="${X(r[1][0])}" cy="${Y(r[1][1])}" r="4.5"/>`});
  (sp.players||[]).forEach(p=>{const cls=p.team==='b'?'c-pb':p.team==='n'?'c-pn':'c-pa';g+=`<circle class="${cls}" cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.l&&p.l.length>1?15:13}"/><text class="c-pt" x="${X(p.x)}" y="${Y(p.y)}">${p.l||''}</text>`});
  (sp.says||[]).forEach(s=>{g+=`<text class="c-say" x="${X(s.x)}" y="${Y(s.y)}" text-anchor="${s.a||'middle'}">${s.t}</text>`});
  (sp.labels||[]).forEach(s=>{g+=`<text class="${s.w?'c-labt':'c-label'}" x="${X(s.x)}" y="${Y(s.y)}" text-anchor="${s.a||'middle'}" dominant-baseline="central">${s.t}</text>`});
  g+=`</svg>`;
  return g;
}
const tt=court;
function salle(sp){
  const id='s'+(++SID),n=sp.n||4,tw=118,th=56,gap=48,W=n*tw+(n-1)*gap+40,H=210;
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sp.alt||'Salle'}" xmlns="http://www.w3.org/2000/svg">${svgDefs(id)}`;
  for(let i=0;i<n;i++){
    const x=20+i*(tw+gap),y=80;
    g+=`<rect class="c-tbl" x="${x}" y="${y}" width="${tw}" height="${th}" rx="2"/><rect class="c-tbll" x="${x+2}" y="${y+2}" width="${tw-4}" height="${th-4}"/><line class="c-tbll" x1="${x+2}" y1="${y+th/2}" x2="${x+tw-2}" y2="${y+th/2}" stroke-dasharray="4 3"/><line class="c-net" x1="${x+tw/2}" y1="${y-4}" x2="${x+tw/2}" y2="${y+th+4}"/>`;
    g+=`<text class="c-tnum" x="${x+tw/2}" y="${y+th+22}" text-anchor="middle">Terrain ${i+1}${i===0?' · haut':i===n-1?' · bas':''}</text>`;
    const pl=sp.k===2?[[x+18,y+th/2,'a'],[x+tw-18,y+th/2,'b']]:[[x+20,y+14,'a'],[x+tw-20,y+14,'b'],[x+20,y+th-14,'a'],[x+tw-20,y+th-14,'b']];
    pl.forEach(p=>{g+=`<circle class="${p[2]==='b'?'c-pb':p[2]==='n'?'c-pn':'c-pa'}" cx="${p[0]}" cy="${p[1]}" r="8"/>`});
    if(i>0) g+=`<path class="c-move" d="M${x+tw/2-14},${y-30} Q${x-gap/2},${y-70} ${x-gap-tw/2+14},${y-30}" marker-end="url(#${id}g)"/>`;
    if(i<n-1) g+=`<path class="c-down" d="M${x+tw/2+12},${y+th+32} Q${x+tw+gap/2},${y+th+64} ${x+tw+gap+tw/2-12},${y+th+32}" marker-end="url(#${id}o)"/>`;
  }
  g+=`<text class="c-label" x="20" y="16">${sp.up||'le 1er du terrain monte'}</text><text class="c-label" x="${W-20}" y="${H-6}" text-anchor="end">${sp.down||'le dernier descend'}</text></svg>`;
  return g;
}
const LEGEND=`<div class="legend"><span><i class="dot" style="background:var(--accent)"></i>joueur qui travaille</span><span><i class="dot" style="background:var(--team-b)"></i>serveur / fournisseur / adversaire</span><span><i class="dot" style="background:var(--team-n)"></i>arbitre / observateur / ramasseur</span><span><i class="lineo"></i>trajectoire du volant (point = chute)</span><span><i class="liner"></i>déplacement</span><span>pointillés blancs : séparation des demi-terrains en long</span></div>`;
const H2=CW/2, FR=NET+SSL, BK=CL-LSD;
const SCH={
 degage:{alt:'Record de dégagés sur demi-terrain en long',half:true,zones:[{x:0,y:0,w:LSD,h:H2,t:'fond'},{x:BK,y:0,w:LSD,h:H2,t:'fond'}],
  players:[{x:2.4,y:1.5,l:'A'},{x:11.0,y:1.5,l:'B',team:'b'},{x:2.4,y:4.6,l:'A2'},{x:11.0,y:4.6,l:'B2',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[2.6,1.35],[12.95,1.1],-0.9],[[10.8,1.7],[0.4,1.9],-0.9],[[2.6,4.5],[12.95,4.3],-0.9]],
  labels:[{x:7.05,y:6.7,t:'C compte les dégagés de A qui tombent au fond',a:'start'}],
  cap:'Deux paires par terrain, une sur chaque demi-terrain en long. Dégagés fond-fond : on compte les volants qui tombent (ou sont frappés) au-delà de la ligne de service du fond. Le 5e (C) compte pour une paire et remplace A à la rotation.'},
 servLong:{alt:'Service long dans le couloir du fond',zones:[{x:BK,y:0,w:LSD,h:H2,t:'fond'}],
  players:[{x:4.0,y:4.4,l:'A'},{x:10.4,y:1.6,l:'B',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],baskets:[[2.6,6.65]],
  balls:[[[4.2,4.3],[13.0,1.3],-1.1]],
  labels:[{x:7.05,y:-0.6,t:'C ramasse et juge le service',a:'start'},{x:3.0,y:6.65,t:'volants',a:'start'},{x:13.4,y:6.65,t:'B attrape le volant au-dessus de sa tête',a:'end'}],
  cap:'A sert de sa zone de service droite vers la zone droite de B, en diagonale. Service long : le volant tombe au fond. B attrape le volant au-dessus de sa tête (d’après C.) ou le renvoie. 10 services, puis rotation : C sert, A reçoit, B ramasse.'},
 servCourt:{alt:'Service court rasant',zones:[{x:FR,y:0,w:0.8,h:H2,t:'court'}],
  players:[{x:5.3,y:4.3,l:'A'},{x:9.9,y:1.6,l:'B',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],baskets:[[3.6,6.65]],
  balls:[[[5.5,4.2],[9.1,1.6],-0.25]],
  labels:[{x:7.05,y:-0.6,t:'C juge : volant sous la taille, rasant ?',a:'start'}],
  cap:'Service court en revers : le volant frôle la bande du filet et tombe juste derrière la ligne de service avant. Le receveur doit relever : le serveur garde l’initiative.'},
 serv4:{alt:'Service dans 4 zones',zones:[{x:FR,y:1.6,w:1.5,h:1.4,t:'1 court'},{x:FR,y:0.05,w:1.5,h:1.4,t:'2 court'},{x:11.3,y:1.6,w:2.05,h:1.4,t:'3 long'},{x:11.3,y:0.05,w:2.05,h:1.4,t:'4 long'}],
  players:[{x:4.3,y:4.3,l:'A'},{x:10.6,y:2.2,l:'B',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],baskets:[[2.6,6.65]],
  balls:[[[4.5,4.2],[12.4,0.7],-1.0]],
  labels:[{x:7.05,y:-0.6,t:'C juge et compte',a:'start'},{x:3.0,y:6.65,t:'A annonce la zone, puis sert',a:'start'}],
  cap:'A annonce la zone (1 à 4), sert ; B laisse tomber le volant pour valider la zone, ou le renvoie doucement. 10 services puis rotation.'},
 courtLong:{alt:'Alterner dégagé long et amorti court',zones:[{x:BK-0.6,y:0.1,w:LSD+0.55,h:CW-0.2,t:'long'},{x:NET+0.05,y:0.1,w:SSL+0.4,h:CW-0.2,t:'court'}],
  players:[{x:2.8,y:3.0,l:'A'},{x:10.5,y:3.0,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[3.0,2.85],[12.9,2.0],-0.8],[[3.0,3.15],[8.0,4.2],0.25]],
  labels:[{x:7.05,y:6.7,t:'C : 2 fois la même zone = fin de l’échange',a:'start'}],
  cap:'A alterne une frappe longue (dégagé) et une frappe courte (amorti) ; B renvoie des volants réguliers au milieu du terrain de A. Grand geste accéléré pour le dégagé, petit geste lent pour l’amorti.'},
 dg:{alt:'Alterner droite et gauche',zones:[{x:FR,y:0.05,w:CL-FR-0.05,h:1.45,t:'gauche de B'},{x:FR,y:CW-1.5,w:CL-FR-0.05,h:1.45,t:'droite de B'}],
  players:[{x:2.8,y:3.05,l:'A'},{x:10.6,y:3.05,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  runs:[[[10.15,2.6],[10.15,1.2],0],[[10.15,3.5],[10.15,4.9],0]],
  balls:[[[3.0,2.9],[11.9,0.8],-0.5],[[3.0,3.2],[11.9,5.3],0.5]],
  labels:[{x:7.05,y:6.7,t:'C compte et conseille',a:'start'}],
  cap:'A change de côté à chaque frappe (droite, gauche) ; B renvoie des volants faciles au milieu du terrain de A et se replace au centre après chaque frappe.'},
 routine4:{alt:'Les 4 coins dans l’ordre',zones:[{x:BK-0.9,y:0.1,w:LSD+0.85,h:1.5,t:'1'},{x:NET+0.1,y:CW-1.6,w:1.9,h:1.5,t:'2'},{x:BK-0.9,y:CW-1.6,w:LSD+0.85,h:1.5,t:'3'},{x:NET+0.1,y:0.1,w:1.9,h:1.5,t:'4'},{x:9.6,y:2.0,w:2.0,h:2.1,t:'interdit',no:true}],
  players:[{x:2.8,y:3.05,l:'A'},{x:10.6,y:3.05,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[3.0,2.9],[12.7,0.8],-0.7],[[3.0,3.2],[7.7,5.2],0.3]],
  labels:[{x:7.05,y:6.7,t:'1 tour = les 4 coins dans l’ordre',a:'start'}],
  cap:'A envoie le volant aux 4 coins dans l’ordre annoncé ; B renvoie au centre du terrain de A. Variante (thème 4, match à thème) : la zone centrale est interdite.'},
 zoneInt:{alt:'Zone centrale interdite',zones:[{x:9.6,y:2.0,w:2.0,h:2.1,t:'zone interdite',no:true},{x:1.8,y:2.0,w:2.0,h:2.1,t:'zone interdite',no:true}],
  players:[{x:3.6,y:1.5,l:'A'},{x:10.0,y:4.6,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[3.8,1.4],[12.6,5.2],-0.6],[[9.8,4.5],[1.0,0.8],-0.6]],
  labels:[{x:7.05,y:6.7,t:'C arbitre : volant (ou pieds) dans la zone = point perdu',a:'start'}],
  cap:'SRP2 d’A. B. : un carré de 2 grands pas au centre de chaque terrain. Le volant qui y tombe, ou l’adversaire qui y frappe, fait perdre l’échange : on joue loin de l’adversaire.'},
 rupture:{alt:'Rupture : volant haut et court, « Banco ! » et smash',zones:[{x:11.0,y:0.1,w:2.35,h:2.0,t:'cible'}],
  players:[{x:3.4,y:3.0,l:'A'},{x:10.6,y:3.0,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[10.4,3.0],[4.4,3.3],0.7],[[4.6,3.2],[12.1,1.1],-0.05]],
  says:[{x:2.0,y:4.2,t:'« Banco ! »',a:'middle'}],labels:[{x:6.7,y:-0.6,t:'après 5 échanges, B donne un volant haut et court',a:'middle'},{x:7.05,y:6.7,t:'C compte et note les ruptures',a:'start'}],
  cap:'5 dégagés, puis B donne un volant haut qui tombe vers le milieu du terrain de A. A annonce « Banco ! », avance sous le volant et frappe vers le bas, vers la cible. 1 point par smash gagnant.'},
 smash:{alt:'Smash sur volant haut donné',zones:[{x:FR,y:0.1,w:2.6,h:CW-0.2,t:'cible'}],
  players:[{x:3.6,y:3.05,l:'A'},{x:11.6,y:3.05,l:'B',team:'b'},{x:12.4,y:6.7,l:'R',team:'n'}],baskets:[[12.4,-0.6]],
  balls:[[[11.4,3.05],[3.9,2.8],0.9],[[3.9,2.9],[9.6,1.8],-0.05]],
  labels:[{x:11.9,y:6.7,t:'R ramasse et rend les volants à B',a:'end'}],
  cap:'B sert haut et long (ou lance) vers le milieu du terrain de A ; A se place sous le volant, main libre levée, et smashe vers le bas. 10 volants puis rotation.'},
 filet:{alt:'Jeu au filet',zones:[{x:NET-SSL,y:0.1,w:SSL-0.05,h:CW-0.2,t:'zone avant'},{x:NET+0.05,y:0.1,w:SSL-0.05,h:CW-0.2,t:'zone avant'}],
  players:[{x:5.4,y:1.8,l:'A'},{x:8.0,y:4.2,l:'B',team:'b'},{x:5.4,y:4.6,l:'A2'},{x:8.0,y:1.5,l:'B2',team:'b'}],
  balls:[[[5.6,1.9],[7.5,3.6],0.25],[[7.8,4.1],[6.0,2.4],0.25]],
  labels:[{x:3.0,y:6.7,t:'geste d’escrimeur : fente avant, raquette haute',a:'start'}],
  cap:'D’après T. : échanges au filet, entre le filet et la ligne de service avant. On dépose le volant plutôt qu’on ne le frappe, en le prenant le plus haut possible, au niveau de la bande du filet.'},
 drive:{alt:'Drive : trajectoires tendues à mi-terrain',half:true,
  players:[{x:4.0,y:1.5,l:'A'},{x:9.4,y:1.5,l:'B',team:'b'},{x:4.0,y:4.6,l:'A2'},{x:9.4,y:4.6,l:'B2',team:'b'}],
  balls:[[[4.3,1.45],[9.0,1.25],0.06],[[9.1,1.7],[4.4,1.75],0.06],[[4.3,4.55],[9.0,4.4],0.06]],
  labels:[{x:6.7,y:6.7,t:'volant à hauteur de filet, frappé devant soi (essuie-glace)',a:'middle'}],
  cap:'Drive en coup droit et en revers, à mi-terrain : trajectoire rasante, rapide, horizontale. Raquette devant soi, petit geste, appuis écartés.'},
 attDef:{alt:'Attaque contre défense',zones:[{x:BK-0.4,y:0.1,w:LSD+0.35,h:CW-0.2,t:'fond'}],
  players:[{x:4.0,y:3.0,l:'A'},{x:10.8,y:3.0,l:'D',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[4.2,2.9],[10.3,4.1],-0.05],[[10.6,3.1],[3.5,2.2],-0.9]],
  labels:[{x:3.0,y:-0.6,t:'A attaque (smash, amorti)',a:'start'},{x:12.9,y:-0.6,t:'D défend haut et long',a:'end'},{x:7.05,y:6.7,t:'C compte',a:'start'}],
  cap:'A attaque à chaque volant, D défend en relevant haut et au fond pour se donner du temps. Record d’attaques consécutives, puis rotation : celui qui défend attaque.'},
 retour:{alt:'Retour de service dans la zone annoncée',zones:[{x:NET+0.05,y:0.1,w:SSL+0.3,h:H2-0.15,t:'court'},{x:BK-0.4,y:0.1,w:LSD+0.35,h:H2-0.15,t:'fond'}],
  players:[{x:3.4,y:4.5,l:'A'},{x:9.3,y:1.6,l:'S',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],baskets:[[10.6,-0.6]],
  balls:[[[9.1,1.7],[4.6,4.2],0.3],[[3.6,4.4],[12.9,1.3],-0.8]],
  says:[{x:7.05,y:-0.6,t:'« fond ! »',a:'start'}],labels:[{x:3.0,y:6.7,t:'A renvoie dans la zone annoncée par C',a:'start'}],
  cap:'S sert court ou long. C annonce « court » ou « fond » au moment du service ; A renvoie dans la zone annoncée. 10 services puis rotation.'},
 servKill:{alt:'Service court puis kill sur la 2e frappe',zones:[{x:FR,y:0.1,w:0.8,h:H2-0.15,t:'service'}],
  players:[{x:5.2,y:4.3,l:'A'},{x:9.3,y:1.6,l:'B',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],
  runs:[[[5.2,4.0],[5.8,2.8],0]],
  balls:[[[5.4,4.2],[9.0,1.7],-0.25],[[9.1,1.6],[6.1,2.5],0.2],[[6.1,2.5],[8.6,1.0],0.02]],
  labels:[{x:3.0,y:6.7,t:'A sert court, avance, pique le volant',a:'start'}],
  cap:'Exercice 22 du carnet : service court, B renvoie un volant neutre au filet, A avance très vite, raquette verticale tamis haut, et pique le volant de haut en bas (le « kill »).'},
 match4:{alt:'Groupe de 4 : deux matchs sur les demi-terrains en long',half:true,
  players:[{x:2.6,y:1.5,l:'A'},{x:10.8,y:1.5,l:'B',team:'b'},{x:2.6,y:4.6,l:'C'},{x:10.8,y:4.6,l:'D',team:'b'},{x:6.7,y:6.7,l:'E',team:'n'}],sheets:[[7.3,6.7]],
  balls:[[[2.8,1.4],[11.9,1.0],-0.6],[[10.6,4.7],[3.4,5.2],-0.4]],
  labels:[{x:7.7,y:6.7,t:'à 5 : E arbitre les deux matchs',a:'start'}],
  cap:'Deux matchs en même temps, un par demi-terrain en long (couloir latéral compris, service dans l’axe). Vague 1 : A–B et C–D ; vague 2 : A–C et B–D ; vague 3 : A–D et B–C. Chacun annonce son score avant de servir.'},
 revers:{alt:'Revers haut au fond, puis drive',zones:[{x:0.05,y:0.05,w:1.6,h:1.6,t:'revers de A'},{x:BK-0.5,y:0.1,w:LSD+0.45,h:CW-0.2,t:'fond'}],
  players:[{x:1.1,y:1.0,l:'A'},{x:10.8,y:3.4,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  runs:[[[2.6,2.4],[1.4,1.3],0]],
  balls:[[[10.6,3.5],[0.9,1.2],0.6],[[1.4,0.85],[12.9,0.9],-0.35]],
  labels:[{x:3.0,y:2.7,t:'A recule, dos au filet',a:'start',w:true},{x:7.05,y:6.7,t:'C compte les revers qui passent la ligne de service du fond',a:'start'}],
  cap:'B dégage sur le revers de A, au fond du court. A recule (pas chassés puis pivot), frappe en revers haut, coude haut et pouce derrière le manche, et renvoie au-delà de la ligne de service du fond. Variante : A contourne et joue en coup droit quand il en a le temps.'},
 grand4:{alt:'Grand terrain : un match, deux arbitres',zones:[{x:FR,y:0.05,w:CL-FR-0.05,h:1.1,t:'largeur'},{x:FR,y:CW-1.15,w:CL-FR-0.05,h:1.1,t:'largeur'}],
  players:[{x:3.0,y:4.2,l:'A'},{x:10.6,y:2.0,l:'B',team:'b'},{x:5.7,y:-0.6,l:'C',team:'n'},{x:7.6,y:6.7,l:'D',team:'n'},{x:0.4,y:6.7,l:'E',team:'n'}],sheets:[[8.2,6.7]],
  balls:[[[3.2,4.1],[12.2,0.6],-0.5],[[10.4,2.1],[2.0,5.5],-0.5]],
  labels:[{x:6.1,y:-0.6,t:'C annonce le score (serveur en premier)',a:'start'},{x:8.6,y:6.7,t:'D note',a:'start'},{x:0.85,y:6.7,t:'E (à 5) observe et coache',a:'start'}],
  cap:'À partir de S3, la situation de match passe sur grand terrain : on apprend à jouer la largeur. Un match à la fois ; deux élèves arbitrent (l’un annonce, l’autre note). À 4 : tournoi rapide de C. (A–B, C–D, gagnants, perdants) ; à 5 : 5 matchs, chacun en joue 2.'},
 relais:{alt:'Rencontre entre deux binômes en relais',players:[{x:3.0,y:4.4,l:'A1'},{x:10.6,y:1.7,l:'B1',team:'b'},{x:5.6,y:-0.6,l:'A2'},{x:7.8,y:6.7,l:'B2',team:'b'}],sheets:[[8.4,6.7]],
  balls:[[[3.2,4.3],[12.8,1.0],-0.7],[[10.4,1.8],[1.0,5.0],-0.7]],
  labels:[{x:6.0,y:-0.6,t:'A2 : arbitre (annonce) et coach de A1',a:'start'},{x:8.8,y:6.7,t:'B2 : marqueur et coach de B1',a:'start'}],
  cap:'Binôme A contre binôme B. Pendant le simple, les deux partenaires arbitrent : l’un annonce le score, l’autre le note ; entre les sets et au temps mort, chacun coache son partenaire.'},
 double:{alt:'Double : attaque avant-arrière, défense côte à côte',
  players:[{x:5.3,y:3.05,l:'A1'},{x:2.2,y:3.05,l:'A2'},{x:10.3,y:1.6,l:'B1',team:'b'},{x:10.3,y:4.5,l:'B2',team:'b'}],
  balls:[[[2.4,2.95],[10.0,4.0],-0.05]],
  labels:[{x:0.2,y:-0.6,t:'attaque : un devant, un derrière',a:'start'},{x:13.2,y:-0.6,t:'défense : côte à côte',a:'end'},{x:6.7,y:6.7,t:'celui qui est devant tue au filet, celui qui est derrière smashe',a:'middle'}],
  cap:'Le binôme qui attaque se place l’un devant l’autre (le joueur du fond smashe, celui du filet tue les retours courts). Le binôme qui défend se place côte à côte, chacun couvre son demi-terrain.'},
 doubleServ:{alt:'Double : service court et rush du partenaire',zones:[{x:FR,y:0.1,w:0.8,h:H2-0.15,t:'service'}],
  players:[{x:5.3,y:3.6,l:'A1'},{x:3.4,y:3.05,l:'A2'},{x:9.1,y:1.7,l:'B1',team:'b'},{x:11.4,y:4.3,l:'B2',team:'b'}],
  runs:[[[5.2,3.4],[5.8,2.5],0]],
  balls:[[[5.5,3.5],[9.0,2.3],-0.2],[[8.9,1.8],[6.0,2.4],0.2]],
  labels:[{x:0.2,y:-0.6,t:'A1 sert court puis tient le filet',a:'start'},{x:13.2,y:6.7,t:'ordre : A1 → B1 → A2 → B2',a:'end'}],
  cap:'En double, le service court est la règle : le serveur reste au filet et tue un retour trop haut (rush), son partenaire couvre le fond. Zone de service du double : plus large, moins profonde (ligne de service longue du double).'},
 obs:{alt:'Match d’observation coaché',zones:[{x:11.2,y:H2,w:2.15,h:H2-0.05,t:'revers haut de B ?'},{x:NET+0.05,y:0.1,w:SSL,h:CW-0.2,t:'filet ?'}],
  players:[{x:3.0,y:3.0,l:'A'},{x:10.6,y:3.0,l:'B',team:'b'},{x:6.7,y:-0.6,l:'C',team:'n'}],sheets:[[7.2,-0.6]],
  balls:[[[3.2,2.9],[12.6,4.9],-0.6],[[10.4,3.0],[2.0,1.4],-0.6]],
  labels:[{x:7.6,y:-0.6,t:'C note où et comment B perd ses points',a:'start'}],
  cap:'C coache A : il note chaque point perdu par B (revers haut, filet, smash, service, fond). Au bout de 2 min, temps mort de 30 s : C donne à A un seul conseil.'},
 demi:{alt:'Jamais deux fois de suite dans le même demi-terrain',zones:[{x:NET+0.05,y:0.05,w:CL-NET-0.1,h:H2-0.1,t:'1re frappe'},{x:NET+0.05,y:H2+0.05,w:CL-NET-0.1,h:H2-0.1,t:'2e frappe'}],
  players:[{x:3.0,y:3.0,l:'A'},{x:10.6,y:1.6,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  runs:[[[10.9,1.9],[10.9,4.2],0]],
  balls:[[[3.2,2.9],[12.0,1.0],-0.5],[[3.2,3.1],[11.4,5.0],0.5]],
  labels:[{x:7.05,y:6.7,t:'C arbitre et vérifie l’alternance',a:'start'}],
  cap:'D’après C. (S2) : chaque joueur doit changer de demi-terrain (gauche/droite) à chacune de ses frappes. Deux fois de suite au même endroit = point perdu. Variante : alterner avant et fond.'},
 zonesBonus:{alt:'Zones avant et arrière à points doublés',half:true,zones:[{x:NET+0.05,y:0.05,w:SSL-0.05,h:H2-0.1,t:'×2'},{x:CL-2,y:0.05,w:1.95,h:H2-0.1,t:'×2'},{x:NET-SSL,y:0.05,w:SSL-0.05,h:H2-0.1,t:'×2'},{x:0.05,y:0.05,w:1.95,h:H2-0.1,t:'×2'}],
  players:[{x:3.4,y:1.5,l:'A'},{x:10.0,y:1.5,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],sheets:[[7.3,6.7]],
  balls:[[[3.6,1.4],[12.6,1.1],-0.7],[[9.8,1.6],[6.0,2.2],0.2]],
  labels:[{x:7.7,y:6.7,t:'C note : 1 case = 1 point, 2 cases = 2 points',a:'start'}],
  cap:'D’après T. : bandelette à 2 m de la ligne de fond. Un volant qui tombe dans la zone avant (avant la ligne de service) ou dans la zone arrière vaut 2 points ; tous les autres points valent 1.'},
 lancer:{alt:'Renvoi sur volant lancé à la main',half:true,zones:[{x:BK-0.5,y:0.05,w:LSD+0.45,h:H2-0.1,t:'fond'}],
  players:[{x:3.2,y:1.5,l:'A'},{x:7.9,y:1.0,l:'L',team:'b'},{x:11.4,y:2.2,l:'R',team:'n'}],baskets:[[7.9,-0.6]],
  balls:[[[7.7,1.0],[3.4,1.3],0.6],[[3.4,1.5],[12.8,1.6],-0.7]],
  labels:[{x:11.4,y:-0.6,t:'R ramasse et rend les volants à L',a:'middle'}],
  cap:'L, près du filet, lance le volant haut à la main vers A. A se place sous le volant et le renvoie haut et loin, en main haute. 10 volants, puis rotation.'},
 tournante:{alt:'Tournante à 4 sur un terrain',players:[{x:3.0,y:3.05,l:'A1'},{x:1.4,y:3.05,l:'A2'},{x:10.4,y:3.05,l:'B1',team:'b'},{x:12.0,y:3.05,l:'B2',team:'b'}],
  runs:[[[3.0,3.5],[1.6,3.9],0.3],[[10.4,3.5],[11.8,3.9],-0.3]],
  balls:[[[3.2,2.95],[10.2,2.8],-0.6]],
  labels:[{x:6.7,y:6.7,t:'je frappe, je sors sur le côté, mon partenaire entre',a:'middle'}],
  cap:'D’après T. (S2) : 1 volant pour 4, joueurs alignés au centre de leur terrain. 2 frappes chacun, puis 1 frappe chacun : on apprend à se replacer et à laisser la place.'},
 faible:{alt:'Servir et jouer sur le point faible repéré',zones:[{x:11.6,y:1.7,w:1.75,h:1.3,t:'revers de B'}],
  players:[{x:4.0,y:4.4,l:'A1'},{x:10.4,y:1.4,l:'B1',team:'b'},{x:6.0,y:-0.6,l:'A2'}],sheets:[[6.6,-0.6]],
  balls:[[[4.2,4.3],[12.4,2.4],-1.0]],
  labels:[{x:7.0,y:-0.6,t:'A2 (coach) choisit la zone visée',a:'start'}],
  cap:'Le coach a repéré le point faible de B1 (ici son revers au fond). A1 sert long sur ce revers et joue sa 2e frappe à l’opposé (amorti côté coup droit).'},
 trois:{alt:'Construction annoncée en trois frappes',zones:[{x:BK-0.9,y:H2,w:LSD+0.85,h:H2-0.05,t:'1'},{x:NET+0.05,y:0.05,w:1.9,h:1.5,t:'2'},{x:BK-0.9,y:0.05,w:LSD+0.85,h:1.6,t:'3'}],
  players:[{x:3.0,y:3.05,l:'A'},{x:10.4,y:3.05,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],
  balls:[[[3.2,3.1],[12.8,4.6],-0.6],[[3.2,3.0],[7.6,0.8],0.3],[[3.2,2.9],[12.8,0.8],-0.6]],
  says:[{x:0.2,y:-0.6,t:'« fond revers, filet, fond coup droit »',a:'start'}],labels:[{x:7.05,y:6.7,t:'C vérifie l’annonce et compte',a:'start'}],
  cap:'D’après C. (S4) : A annonce l’ordre de ses 3 frappes, puis les joue ; B renvoie au centre. Ensuite A tente de marquer en continuant d’éviter le centre. Variante : l’ordre reste secret.'},
 serv10:{alt:'Dix services : gagner le point vite',players:[{x:4.2,y:4.3,l:'A'},{x:10.4,y:1.6,l:'B',team:'b'},{x:6.7,y:6.7,l:'C',team:'n'}],sheets:[[7.3,6.7]],baskets:[[2.6,6.65]],
  balls:[[[4.4,4.2],[12.6,1.2],-1.0]],
  labels:[{x:7.7,y:6.7,t:'C annonce et note : 4, 3, 2, 1 ou 0',a:'start'},{x:0.2,y:-0.6,t:'A sert 10 fois de suite',a:'start'}],
  cap:'Match à thème 5 du carnet (« raccourcir l’échange ») : le serveur part avec 4 points et en perd un à chaque renvoi de l’adversaire. Service non renvoyé = 4, point gagné à la 2e frappe = 3, etc. ; point perdu = 0.'},
 g_largeur:{alt:'Éloigner l’adversaire en largeur',zones:[{x:FR,y:0.05,w:CL-FR-0.05,h:1.2,t:'couloir'},{x:FR,y:CW-1.25,w:CL-FR-0.05,h:1.2,t:'couloir'}],
  players:[{x:3.0,y:3.05,l:'J'},{x:10.6,y:3.05,l:'P',team:'b'},{x:6.7,y:6.7,l:'O',team:'n'}],cones:[[10.6,-0.55],[10.6,6.65]],
  runs:[[[10.9,2.6],[10.9,-0.2],0],[[10.9,3.5],[10.9,6.3],0]],
  balls:[[[3.2,2.9],[11.8,0.6],-0.5],[[3.2,3.2],[11.8,5.5],0.5]],
  labels:[{x:10.9,y:-0.55,t:'plot',a:'start'},{x:7.05,y:6.7,t:'O compte et conseille',a:'start'}],
  cap:'Exercice 3 : P touche le plot le plus proche après chaque frappe ; J alterne les côtés et conclut à l’opposé.'},
 g_fixer:{alt:'Fixer l’adversaire sur une diagonale puis déborder',zones:[{x:BK-0.9,y:H2,w:LSD+0.85,h:H2-0.05,t:'diagonale'},{x:FR,y:0.05,w:CL-FR-0.05,h:SSI+0.5,t:'couloir'}],
  players:[{x:3.0,y:1.6,l:'J'},{x:11.4,y:4.5,l:'P',team:'b'},{x:6.7,y:6.7,l:'O',team:'n'}],
  balls:[[[3.2,1.6],[12.6,4.9],-0.4],[[3.2,1.4],[12.0,0.4],-0.3]],
  labels:[{x:7.05,y:6.7,t:'au moins 3 frappes avant de conclure',a:'start'}],
  cap:'Exercice 4 : J insiste en diagonale (3 frappes au moins), puis déborde dans le couloir opposé.'},
 g_flick:{alt:'Service flick : faire croire au service court',zones:[{x:BK-0.3,y:0.05,w:LSD+0.25,h:H2-0.1,t:'fond'}],
  players:[{x:5.3,y:4.3,l:'J'},{x:9.6,y:1.6,l:'P',team:'b'},{x:6.7,y:-0.6,l:'O',team:'n'}],
  runs:[[[9.6,1.9],[9.0,2.1],0]],
  balls:[[[5.5,4.2],[12.9,1.4],-0.45]],
  labels:[{x:7.05,y:-0.6,t:'O compte les volants non renvoyés',a:'start'}],
  cap:'Exercice 21 : même préparation que le service court, puis rotation du poignet au dernier moment ; le volant passe juste au-dessus du receveur avancé et tombe au fond.'},
 salle4:{salle:true,k:4,n:4,alt:'Montante-descendante par groupes de 4',cap:'Groupes de 4 (ou 5) par terrain, deux matchs à la fois sur les demi-terrains en long. Après le tour, le 1er de chaque terrain monte d’un terrain, le dernier descend. Au terrain 1, le 1er reste ; au dernier, le dernier reste.'},
 salleB:{salle:true,k:4,n:4,alt:'Montante-descendante par binômes',up:'le binôme gagnant monte',down:'le binôme perdant descend',cap:'Deux binômes par terrain : après la rencontre en relais, le binôme gagnant monte d’un terrain, le perdant descend.'}
};
const EVAL_SHORT={e1:'AFL1 élément 1 : actions techniques d’attaque et de défense (/8)',e2:'AFL1 élément 2 : choix au regard du rapport de force (/4)',a2:'AFL2 : se préparer et s’entraîner',a3:'AFL3 : rôles (coach-partenaire, double, arbitre)'};
const ROT4='Groupe de 4 par terrain (5 sur certains terrains) : une paire sur chaque demi-terrain en long. Dans chaque paire, A travaille et B fournit ; on inverse toutes les 2 min. Le 5e compte pour une paire et prend la place de A à chaque rotation. Chacun travaille au moins 6 min sur 15.';
const ROTB='Deux binômes par terrain : A1 et B1 jouent ; A2 observe A1 et le coache, B2 fournit les volants ou observe B1. On permute toutes les 2 min 30 : A2 et B2 jouent, A1 et B1 coachent.';
const CR_DEG='Dégagé : se placer sous et derrière le volant, de profil, raquette armée dans le dos, coude haut ; frapper au plus haut, devant soi, en fouettant ; le volant monte haut et retombe au fond (d’après T. : « placement derrière le volant, alignement bras-raquette »).';
const CR_SERV='Service : volant frappé sous 1,15 m (à l’école : sous la taille), les deux pieds au sol et immobiles dans sa zone, en diagonale. Revers : pouce derrière le manche, petit coup de poignet. Coup droit : lâcher le volant devant soi, frapper juste avant qu’il ne tombe (d’après C.).';
const WARMUPS=[
 {t:'Échauffement guidé (S1–S2)',d:'10 min',k:'Mené par le prof · C., T.',disp:'Par groupe de terrain, sur son terrain. Un volant par paire.',deroul:['2 min · Déplacements sur les lignes de son terrain, toujours face au filet (d’après C.) : pas chassés le long de la ligne de fond, montées de genoux, talons-fesses, pas croisés, course arrière.','2 min · Articulaire : chevilles, genoux, hanches, épaules (moulinets avant et arrière), poignet (cercles, flexions).','3 min · Jongles : 10 en coup droit, 10 en revers, puis alternés.','3 min · Faire durer l’échange au centre du terrain avec son partenaire, puis de plus en plus long sur demi-terrain en long (d’après C. S1).'],cons:['Volant au sol : on le ramasse avant de repartir (on ne marche pas dessus, on ne glisse pas).','Personne ne traverse un terrain où l’on joue : on passe par le fond de la salle.'],reus:'Chaque groupe enchaîne les 4 temps sans arrêt.'},
 {t:'Jongles',d:'3–5 min',k:'Contact volant-raquette · carnet, ex. 5 et 6',disp:'Chacun son volant, sur son demi-terrain.',deroul:['10 jongles en coup droit (tamis vers le haut), 10 en revers.','15 jongles en alternant les faces.','En marchant, puis en contournant son terrain (ex. 7 et 8).'],cons:['Volant poussé vers le haut plus que frappé.','C’est le joueur qui dirige, pas le volant : appuis le plus immobiles possible.'],reus:'Une série de 10 dans chaque version.'},
 {t:'Record de dégagés en 1 min',d:'4 min',k:'Continuité · T. S1',sch:'degage',disp:'Par 2 sur un demi-terrain en long, le 5e compte.',deroul:['1 min de jeu libre, 1 min de dégagés hauts et longs, 1 min en ne jouant que des frappes hautes (raquette au-dessus de la tête), 1 min en se replaçant au centre après chaque frappe.','Le compteur annonce le total à la fin de chaque minute ; on note le record.'],cons:['Dégagé : volant pris au plus haut, devant soi, raquette armée dans le dos.','Se replacer au centre du demi-terrain, raquette haute.'],reus:'Battre son record à chaque minute.'},
 {t:'La tournante',d:'4 min',k:'Placement et déplacement · T. S2',sch:'tournante',disp:'Les 4 du terrain, 1 volant, alignés au centre de leur moitié.',deroul:['2 frappes chacun, puis on sort sur le côté pour laisser la place au partenaire.','Puis 1 frappe chacun.','Puis sur un demi-terrain en long seulement.'],cons:['Je frappe et je sors aussitôt sur le côté, jamais devant le partenaire.','Trajectoire haute et au centre : je laisse du temps au suivant.'],reus:'20 frappes du groupe sans faute.'},
 {t:'Routine de déplacement (à vide)',d:'3 min',k:'Coordination · T. S3',disp:'Chacun sur son demi-terrain, sans volant (ou raquette seule).',deroul:['Départ coin arrière gauche, diagonale en montées de genoux, pas chassés le long du filet, diagonale arrière en pas chassés bras placé, retour le long de la ligne de fond en trottinant.','Puis shadow : le coach montre un coin, le joueur s’y déplace, fait le geste (dégagé au fond, amorti au filet), revient au centre.'],cons:['Je reviens au centre (la base) après chaque geste.','Fente avant pour aller au filet, pas chassés pour reculer : jamais dos au filet.'],reus:'10 coins enchaînés sans perdre la posture.'},
 {t:'Échanges en 4 temps',d:'4 min',k:'Gammes · T.',disp:'Par 2 sur un demi-terrain en long.',deroul:['1 min au centre, « de face ».','1 min en dégagés au fond.','1 min au filet : déposer le volant (geste d’escrimeur).','1 min en drive à mi-terrain : trajectoires tendues.'],cons:['À chaque temps, on change de hauteur de frappe : haut, au filet, à hauteur d’épaule.'],reus:'Les 4 temps sans laisser tomber le volant plus de 3 fois par minute.'},
 {t:'Échauffement d’avant-rencontre (S8–S9)',d:'10 min',k:'Jour de l’épreuve · AFL2',disp:'Les deux binômes du terrain, comme en compétition.',deroul:['3 min · Général et articulaire, chaque binôme seul (pas chassés, fentes, gainage, poignet et épaules).','3 min · Échanges contre le binôme adverse : dégagés, amortis, smashs.','2 min · Services : 5 services chacun, ceux du projet de jeu.','2 min · Double : un attaque, un défend, puis on inverse.'],cons:['Le binôme mène seul son échauffement : c’est l’élément « préparation » de l’AFL2.','On profite des échanges pour repérer le coup fort et le coup faible de l’adversaire.'],reus:'Les 4 joueurs sont prêts en 10 min, sans aide.'}
];
const EX={
 degage:(v)=>({t:v.t||'Fil rouge 1 · Record de dégagés',k:'Continuité · T. S1, C. S1',sch:'degage',
  disp:'7 terrains, groupes de 4 (ou 5) : une paire sur chaque demi-terrain en long. Un volant par paire, deux de réserve dans la poche du 5e. Les élèves en grande difficulté prennent la fiche Débutants sur un demi-terrain.',
  four:ROT4,
  deroul:v.deroul||['1 min de dégagés fond-fond : on compte les volants qui tombent (ou sont frappés) au-delà de la ligne de service du fond.','2e minute : après chaque frappe, le joueur revient au centre de son demi-terrain, raquette haute.','Le compteur annonce le total à la fin de la minute et note le record de la paire.'],
  cons:[CR_DEG].concat(v.cons||['Après chaque frappe, se replacer au centre (la base), raquette haute.']),
  reus:v.reus||'Record de la paire : 12 dégagés au fond en 1 min (repère de départ, à ajuster après la séance).',
  moins:'Jouer vers le milieu du terrain, trajectoire haute ; on compte tous les volants renvoyés.',plus:v.plus||'Le fournisseur joue à droite ou à gauche : on se déplace avant de dégager.'}),
 courtLong:(v)=>({t:'Fil rouge 1 · Dégagé et amorti',k:'Continuité et déplacement · C. S1, carnet ex. 11',sch:'courtLong',
  disp:'Groupes de 4 (ou 5), un demi-terrain en long par paire.',four:ROT4+' Celui qui alterne passe fournisseur à la rotation suivante.',
  deroul:['A alterne une frappe longue (dégagé) et une frappe courte (amorti) ; B renvoie des volants réguliers au milieu du terrain de A.','2 × 1 min par rôle ; le compteur note le meilleur score.'].concat(v.deroul||[]),
  cons:['Grand geste accéléré pour le dégagé, petit geste lent pour l’amorti (carnet).','Même préparation pour les deux frappes : l’adversaire ne doit pas deviner.','Appuis décalés, en équilibre sous le volant ; se déplacer avant la frappe, se replacer après.'].concat(v.cons||[]),
  reus:v.reus||'20 frappes alternées en 2 min.',moins:'B renvoie toujours au même endroit, haut et lent.',plus:v.plus||'Zone interdite au milieu (ex. 12) : seuls le très court et le très long comptent.'}),
 dg:(v)=>({t:'Fil rouge 1 · Déplacer à droite et à gauche',k:'Déplacer l’adversaire · C. S2, carnet ex. 13',sch:'dg',
  disp:'Groupes de 4 (ou 5) : un match coopératif sur le terrain entier par paire, les deux paires en alternance (2 min chacune) ; la paire qui attend compte et observe.',four:'A1 change de côté à chaque frappe, B1 renvoie au milieu ; A2 compte les frappes alternées de A1 et lui donne un conseil, B2 observe B1. Toutes les 2 min : la paire qui observait joue.',
  deroul:['A1 alterne droite et gauche à chaque frappe ; B1 renvoie au milieu du terrain de A1 et se replace au centre.','Puis B1 a le droit de renvoyer où il veut : A1 doit se déplacer avant de frapper.'],
  cons:['Oriente tes appuis vers la cible, pas seulement ta raquette (carnet).','Jouer haut pour laisser du temps au partenaire, puis tendu pour le prendre de vitesse (d’après C.).'],
  reus:v.reus||'15 frappes alternées de suite.',moins:'Deux zones larges (moitié gauche, moitié droite).',plus:'Zone interdite au centre (ex. 14).'}),
 rupture:(v)=>({t:'Fil rouge 1 · Du dégagé à la rupture',k:'Continuité → rupture · T. S1, B. SRP3',sch:'rupture',
  disp:'Groupes de 4 (ou 5) : une paire par demi-terrain en long, puis le terrain entier pour la rupture (les paires alternent toutes les 2 min). Une cible (plots) au fond du terrain adverse.',four:ROT4+' Le compteur note aussi les ruptures réussies.',
  deroul:['5 dégagés, puis le fournisseur (fixé à l’avance) donne un volant haut et court (d’après T. : « après le 5e échange, un des 2 joueurs tente de rompre l’échange »).','A annonce « Banco ! » avant de frapper et tente un smash ou un amorti gagnant.','On inverse les rôles après 5 ruptures.'].concat(v.deroul||[]),
  cons:['Volant attaquable : haut, lent, qui tombe devant la ligne de service du fond (d’après B. : « jouer vite » n’est pas « jouer fort »).','Se placer d’abord (pas chassés), frapper ensuite, haut et devant soi, vers le bas.'],
  reus:v.reus||'5 ruptures gagnantes sur 10 (volant non renvoyé).',moins:'Rupture après 3 échanges ; zone d’arrivée = toute la moitié avant.',plus:'B choisit lui-même quand il donne le volant facile, et défend le smash.'}),
 smash:(v)=>({t:'Fil rouge 1 · Smasher le volant donné',k:'Attaque · carnet ex. 23, T. S2',sch:'smash',
  disp:'Groupes de 4 (ou 5), terrain entier : deux joueurs smashent en même temps (un par demi-terrain), deux fournisseurs servent haut en face.',four:'B sert haut et long vers le milieu du demi-terrain de A ; A smashe ; le 5e (ou B à tour de rôle) ramasse et compte : 0 raté, 1 touché, 2 non touché. 10 volants, puis rotation.',
  deroul:['10 volants : smash vers la moitié avant adverse.','10 volants : le fournisseur sert à droite ou à gauche ; A se déplace et choisit son coup (smash ou amorti).'],
  cons:['Raquette inclinée, tamis et coude hauts ; main libre levée qui « vise » (carnet).','Avancer très vite sous le volant, frapper haut et devant soi, de haut en bas.'],
  reus:'10 points (0/1/2) sur 10 volants.',moins:'Volant lancé à la main, plus bas.',plus:'Annoncer la zone (droite ou gauche) et l’atteindre.'}),
 attDef:(v)=>({t:'Fil rouge 1 · Attaque contre défense',k:'Rythme · contrer le coup fort adverse · T. S3',sch:'attDef',
  disp:'Deux binômes par terrain : une paire sur le terrain entier, l’autre observe et coache (alternance toutes les 2 min 30).',four:ROTB+' Celui qui défend attaque à la rotation suivante.',
  deroul:['A attaque à chaque volant (smash ou amorti), D relève haut au fond ; record d’attaques consécutives.','Puis D a le droit de contre-attaquer en drive un smash trop haut ou trop lent : A doit se replacer.'],
  cons:['Défendre : raquette devant soi, genoux fléchis ; relever haut et au fond pour se donner du temps.','Attaquer : impact haut et devant, raquette inclinée vers le bas ; se replacer au centre tout de suite.'],
  reus:'D renvoie 6 attaques de suite ; A enchaîne 6 attaques sans faute.',moins:'A attaque à mi-vitesse.',plus:'D peut contre-amortir : A doit avancer.'}),
 servLong:(v)=>({t:'Fil rouge 2 · Service long au fond',k:'Service · C. S1, T. L1, carnet ex. 19',sch:'servLong',
  disp:'Groupes de 4 (ou 5) : deux paires servent en même temps sur le même terrain, chacune dans une diagonale. Une boîte de volants par terrain.',four:'A sert 10 fois, B attrape le volant au-dessus de sa tête (ou le renvoie) et le rend ; le 5e juge le service et compte. Rotation après 10 services : B sert, A reçoit.',
  deroul:['Règles du service (2 min, démonstration) : volant frappé sous 1,15 m (à l’école : sous la taille), les deux pieds au sol et immobiles dans sa zone, en diagonale ; zone droite quand le score du serveur est pair, gauche quand il est impair. En simple, le couloir latéral est dehors et le couloir du fond dedans.','10 services longs : le volant doit tomber au fond, au-delà de la ligne de service du fond (celle du double).'].concat(v.deroul||[]),
  cons:[CR_SERV,'Service long en coup droit : armer loin derrière, finir le geste loin devant et vers le haut, accélérer à la frappe (carnet, ex. 19).'],
  reus:v.reus||'7 services sur 10 réglementaires et au fond.',moins:'Servir depuis plus près du filet ; toute la moitié arrière compte.',plus:'Annoncer le côté (revers ou coup droit du receveur) et l’atteindre.'}),
 serv4:(v)=>({t:'Fil rouge 2 · Service court, service long',k:'Service · C. S4, carnet ex. 20',sch:'serv4',
  disp:'Groupes de 4 (ou 5) : deux paires servent en même temps, chacune dans une diagonale. Une boîte de volants par terrain.',four:'A sert 10 fois, B laisse tomber le volant pour valider la zone (ou le renvoie doucement), le 5e juge. Rotation après 10 services.',
  deroul:['A annonce la zone (1 à 4 : court ou long, intérieur ou extérieur) avant chaque service.','Service court en revers, rasant ; service long en coup droit.'].concat(v.deroul||[]),
  cons:['Service court : pouce derrière le manche, petit coup de poignet, le volant frôle la bande du filet.','Même préparation pour les deux services : le receveur ne doit pas deviner.'],
  reus:v.reus||'6 services sur 10 dans la zone annoncée.',moins:'Deux zones seulement (court ou long).',plus:'Service flick (ex. 21) : faire croire au service court, servir long.'}),
 servKill:(v)=>({t:'Fil rouge 2 · Service et 2e frappe : le kill',k:'Marquer dès le service · carnet ex. 22, T. S3',sch:'servKill',
  disp:v.disp||'Groupes de 4 (ou 5), deux diagonales par terrain. Une boîte de volants par terrain.',four:v.four||'A sert court, B renvoie un volant neutre au filet, côté raquette de A ; A avance et conclut ; le 5e compte les kills réussis. Rotation après 6 services.',
  deroul:['A sert court, B renvoie au filet sans chercher à gagner.','A avance très vite, raquette verticale tamis haut, et pique le volant de haut en bas.'].concat(v.deroul||[]),
  cons:['Après le service, la raquette reste haute devant moi : je suis déjà prêt pour la 2e frappe.','Ne pas armer : le kill est un geste court, du poignet.'].concat(v.cons||[]),
  reus:v.reus||'4 kills non renvoyés sur 6.',moins:'B renvoie haut vers le milieu : A smashe.',plus:v.plus||'B renvoie où il veut : A lit et choisit (kill, amorti ou dégagé).'}),
 retour:(v)=>({t:'Retour de service dans la zone annoncée',k:'Retour · T. S4, référentiel D3 « variété des services »',sch:'retour',
  disp:'Groupes de 4 (ou 5) : deux diagonales par terrain. Une boîte de volants par terrain.',four:'S sert varié (court, long, flick), A retourne, le 5e (ou le partenaire de S) annonce « court » ou « fond » au moment du service et compte les réussites. Rotation après 10 services.',
  deroul:['10 services : A retourne dans la zone annoncée.','Puis 10 services : A choisit lui-même — retour court sur service court, attaque sur service long.'],
  cons:['Attendre le service raquette haute, pied gauche devant (droitier), poids vers l’avant, près de la ligne de service avant (d’après T.).','Service court : prendre le volant tôt, au plus près de la bande. Service long : reculer en pas chassés, frapper en main haute.'],
  reus:'6 retours sur 10 dans la zone annoncée ; puis 5 bons choix sur 10.',moins:'Le serveur sert lent et haut.',plus:'Le serveur joue le point après le retour : le retour doit l’empêcher d’attaquer.'}),
 serv10:(v)=>({t:v.t||'10 services pour marquer',k:'Service · carnet, match à thème 5 « raccourcir l’échange »',sch:'serv10',
  disp:v.disp||'Groupes de 4 (ou 5), un match par terrain : 2 jouent, 2 arbitrent (l’un annonce, l’autre note).',four:v.four||'A sert 10 fois de suite, B joue le point normalement ; C annonce et D note les points de A (4, 3, 2, 1 ou 0). Puis B sert à C ; A et D arbitrent. Le 5e remplace un arbitre.',
  deroul:['Service non renvoyé = 4 ; point gagné à la 2e frappe du serveur = 3, à la 3e = 2, à la 4e = 1 ; point perdu = 0.','Classement des joueurs du terrain à la fin.'].concat(v.deroul||[]),
  cons:['Varier : on ne gagne pas 10 points avec le même service.','Chercher à marquer vite, mais pas n’importe comment : une faute directe vaut 0.'],
  reus:v.reus||'20 points sur 10 services.',moins:'Le receveur renvoie haut au milieu, sans attaquer.',plus:'Le serveur n’a que 2 services du même type.'}),
 obs:(v)=>({t:'Match d’observation, coaché',k:'Repérer forces et faiblesses · AFL2, AFL3',sch:'obs',
  disp:'Groupes de 4 par terrain (deux binômes), un match sur le terrain entier. Une fiche d’observation par coach.',four:'A1 et B1 jouent un match de 4 min. A2 observe B1 (l’adversaire de son partenaire) et note où il perd ses points ; B2 fait de même pour A1. Au temps mort de 30 s, chaque coach donne un seul conseil. Puis A2 et B2 jouent, A1 et B1 coachent.',
  deroul:['Le coach note chaque point perdu par l’adversaire : revers haut, filet, smash, service, retour, fond.','À 2 min, temps mort de 30 s : « joue sur… ».','Fin du match : le coach dit au joueur adverse son point fort et son point faible.'],
  cons:['Un seul conseil, simple, à appliquer tout de suite.','Parler de l’adversaire (« son revers haut est faible ») plutôt que de la technique de son joueur. Conseils types de la fiche coaching du dossier : « joue à l’opposé de ton coup précédent », « smashe sur des volants hauts, sur ton coup droit ».'],
  reus:'Le coach a noté au moins 6 points et repéré un point fort et un point faible.',moins:'Le coach note seulement « avant » ou « fond ».',plus:'Le coach note aussi ce qui marche pour son joueur, et prévoit un conseil de rechange.'}),
 trois:(v)=>({t:'Fil rouge 2 · Construction annoncée en 3 frappes',k:'Projet de jeu · C. S4',sch:'trois',
  disp:'Deux binômes par terrain.',four:ROTB,
  deroul:['A1 annonce l’ordre de ses 3 frappes (« fond revers, filet, fond coup droit »), puis les joue ; B1 renvoie au centre.','Après 5 essais : B1 joue le point normalement dès la 2e frappe.','A2 vérifie l’annonce et compte ; entre deux séries, il aide A1 à choisir une construction qui gêne vraiment B1.'],
  cons:['Construire en fonction de l’adversaire : commencer sur son point faible, finir à l’opposé.'],
  reus:'3 constructions réussies sur 5, puis 2 points gagnés sur 5 contre une vraie opposition.',moins:'Construction en 2 frappes.',plus:'Ordre secret (d’après C.) : il faut surprendre l’adversaire.'}),
 driveRev:(v)=>({t:'Fil rouge 1 · Drive et revers haut',k:'Répertoire D3–D4 : drive, revers sur tout le terrain · T. S3',sch:'revers',
  disp:'Deux binômes par terrain : une paire travaille sur le terrain entier, l’autre observe et coache (alternance toutes les 2 min 30). Pour le drive, les deux paires jouent en même temps, une par demi-terrain en long.',four:ROTB+' Celui qui observe compte les réussites de son partenaire et lui donne un seul conseil à chaque changement.',
  deroul:['5 min · Drive (d’après T.) : à mi-terrain, trajectoires tendues à hauteur de filet, en coup droit et en revers ; record d’échanges en 1 min.','10 min · Revers haut : B1 dégage 10 volants sur le revers de A1, au fond ; A1 renvoie en revers haut au-delà de la ligne de service du fond. Puis B1 alterne revers et coup droit : A1 choisit revers ou contournement.'],
  cons:['Revers haut : reculer en pas chassés, pivoter dos au filet, coude haut devant le visage, pouce à plat derrière le manche, frapper haut et devant, détente de l’avant-bras.','Drive : raquette devant soi, petit geste rapide, volant pris devant le corps à hauteur de filet.'],
  reus:'Drive : 15 échanges en 1 min. Revers haut : 5 volants sur 10 au-delà de la ligne de service du fond.',moins:'Revers haut : renvoyer au-delà de la ligne de service avant ; B dégage moins loin.',plus:'B joue la suite du point après le revers : le revers doit être assez long pour ne pas être smashé.'}),
 dbl:(v)=>({t:'Le double : placement et formations',k:'Double · T. S2',sch:'double',
  disp:'Deux binômes par terrain (deux terrains à 3 binômes : le 3e binôme arbitre et entre toutes les 2 min).',four:'Les 4 jouent : un binôme attaque (l’un devant l’autre), l’autre défend (côte à côte). Toutes les 2 min, on inverse les rôles.',
  deroul:['Rappel des règles du double (2 min) : zone de service plus large (couloir latéral dedans) et moins profonde (ligne de service longue du double) ; le camp qui marque garde le service et son serveur change de zone ; le receveur est celui qui est en diagonale.','Tournante à 4 (d’après T.) : 1 volant pour 4, 2 frappes chacun puis 1 frappe chacun.','Puis attaque-défense : le binôme attaquant smashe et tue au filet, le binôme défenseur relève au fond.'],
  cons:['Attaque : l’un devant, l’autre derrière. Défense : côte à côte.','Je dis « j’ai ! » quand je prends le volant ; le volant du milieu est pour celui qui l’a sur son coup droit.'],
  reus:'10 échanges en tournante ; 6 attaques de suite en attaque-défense.',moins:'Tournante seulement.',plus:'Le binôme défenseur contre-attaque en drive : les formations changent pendant l’échange.'}),
 doubleServ:(v)=>({t:'Fil rouge 2 · Service court et 2e frappe en double',k:'Double · service + rush',sch:'doubleServ',
  disp:'Deux binômes par terrain.',four:'A1 sert court, B1 retourne, le binôme A conclut ; B2 joue si le volant revient. 5 services, puis A2 sert ; puis le binôme B sert.',
  deroul:['A1 sert court de sa zone droite vers celle de B1 ; il reste au filet, raquette haute.','B1 retourne comme il veut ; le binôme A conclut (rush au filet ou smash du fond).','Le binôme décide avant chaque service : « je sers court au T, tu prends le fond ».'],
  cons:['Le serveur annonce son service à son partenaire (signe derrière le dos, comme en compétition).','Chacun garde sa zone : celui du filet ne recule pas sur un volant au fond.'],
  reus:'Le binôme serveur gagne 5 points sur 10 services.',moins:'Service long autorisé.',plus:'Le binôme receveur peut rusher un service trop haut.'}),
 servWeak:(v)=>({t:'Fil rouge 2 · Servir sur le point faible repéré',k:'Exploiter une faiblesse · AFL1 élément 2',sch:'faible',
  disp:'Deux binômes par terrain. Une boîte de volants par terrain.',four:ROTB+' Le coach (A2) a repéré le point faible de B1 dans l’exercice 1 ; c’est lui qui choisit où A1 sert.',
  deroul:['A2 dit à A1 où servir et où jouer la 2e frappe ; B1 joue le point normalement.','6 services, puis bilan de 30 s entre A1 et A2 : le plan marche-t-il ?','On inverse : B2 coache B1.'],
  cons:['Le plan tient en une phrase : « service long sur son revers, puis amorti côté coup droit ».'],
  reus:'Le binôme serveur gagne 4 points sur 6.',moins:'B1 renvoie au centre.',plus:'B1 sait où on va servir : le plan doit marcher quand même.'}),
 /* ----- situations finales ----- */
 md4:(v)=>({t:v.t||'Montante-descendante à 4',k:'Jeu · '+(v.k||'matchs libres'),sch:v.sch||'match4',
  disp:'7 terrains numérotés, S1–S2 sur demi-terrain. Bouton Tournoi : « demi-terrains », groupes de 4 (ou 5), deux matchs à la fois sur les demi-terrains en long, matchs de 2 min 30, 1 min pour changer de terrain. 2 tours (environ 27 min).',
  four:'Groupe de 4 : vague 1 A–B et C–D, vague 2 A–C et B–D, vague 3 A–D et B–C ; chacun annonce son score avant de servir. Groupe de 5 : 5 vagues de 2 matchs, celui qui ne joue pas arbitre les deux matchs. Pendant les vagues 4 et 5, les groupes de 4 rejouent les vagues 1 et 2 (revanche, non comptée).',
  deroul:(v.deroul||[]).concat(['Fin du tour : le 1er du terrain monte d’un terrain, le dernier descend. Classement : victoires, puis différence de points.']),
  cons:v.cons||['Match au temps (2 min 30) : au signal, on termine le point en cours ; le score acquis compte.'],
  reus:v.reus||'Tous les matchs joués et notés ; chaque élève a arbitré au moins une fois.',moins:v.moins,plus:v.plus}),
 mdG:(v)=>({t:v.t||'Montante-descendante sur grand terrain',k:'Jeu · jouer la largeur · '+(v.k||'matchs libres'),sch:v.sch||'grand4',
  disp:'7 terrains numérotés, groupes de 4 ou 5 (3 terrains de 4, 4 de 5). Bouton Tournoi : « grand terrain », matchs de 2 min 30, 1 min de changement. Chacun joue 2 matchs par tour ; 2 tours (environ 27 min).',
  four:'Un match à la fois sur le terrain entier ; deux élèves arbitrent : l’un annonce le score (serveur en premier), l’autre le note. Terrain de 4 (tournoi rapide de C.) : match 1 A–B (C et D arbitrent), match 2 C–D (A et B arbitrent), match 3 entre les gagnants (les perdants arbitrent), match 4 entre les perdants. Terrain de 5 : A–B, C–D, A–E, B–C, D–E ; celui qui ne joue ni n’arbitre observe et coache.',
  deroul:(v.deroul||[]).concat(['Fin du tour : le 1er du terrain monte d’un terrain, le dernier descend (à 4 : le gagnant du match 3 monte, le perdant du match 4 descend).']),
  cons:v.cons||['Grand terrain en simple : couloir latéral dehors, couloir du fond dedans.','Match au temps (2 min 30) : au signal, on termine le point en cours ; le score acquis compte.'],
  reus:v.reus||'Tous les matchs joués et notés ; chaque élève a arbitré au moins 2 matchs.',moins:v.moins,plus:v.plus}),
 poule:(v)=>({t:v.t||'Poules de niveau sur grand terrain',k:'Jeu · '+(v.k||'constituer les binômes'),sch:'grand4',
  disp:'7 terrains : les groupes de 4 ou 5 de niveau proche (ordre de la montante-descendante de S3). Bouton Tournoi : « poules », matchs de 2 min 30. Un seul tour : 6 matchs à 4, 10 à 5 (environ 26 min).',
  four:'Tout le monde se rencontre, un match à la fois sur le terrain entier, dans l’ordre des fiches tournoi de C. (A–B, C–D, A–E, B–C, D–E, A–C, B–D, C–E, A–D, E–B) ; deux élèves arbitrent (l’un annonce, l’autre note). Les poules de 4 finissent avant : revanches non comptées.',
  deroul:(v.deroul||[]).concat(['Fin de la poule : classement (victoires, puis différence de points). Il sert à choisir un partenaire de niveau similaire, comme l’exige le référentiel.']),
  cons:v.cons||['Grand terrain en simple : couloir latéral dehors, couloir du fond dedans.'],
  reus:v.reus||'Tous les matchs de la poule joués et notés.',moins:v.moins,plus:v.plus}),
 relais:(v)=>({t:v.t||'Rencontre en relais, montante-descendante',k:'Jeu · format de l’épreuve en 15 min · T.',sch:'relais',
  disp:'7 terrains, deux binômes par terrain (16 binômes : deux terrains en accueillent 3). Bouton Tournoi : mode binômes, rencontres de 14 min, 1 min de changement. 2 tours.',
  four:'Pendant chaque simple, les deux partenaires qui ne jouent pas arbitrent : A2 annonce le score, B2 le note. À chaque relais, 30 s de coaching. En double, le serveur annonce le score. Terrain à 3 binômes : 3 rencontres plus courtes (simples jusqu’à 5, 10, 15, 20, double jusqu’à 25).',
  deroul:['Score cumulé (ronde italienne de T.) : A1–B1 jusqu’à ce qu’un binôme atteigne 8 ; A2–B2 jusqu’à 16 ; A1–B2 jusqu’à 24 ; A2–B1 jusqu’à 32 ; double jusqu’à 40.','C’est l’ordre de l’épreuve : chaque joueur joue 2 simples et le double.'].concat(v.deroul||[]).concat(['Fin de la rencontre (ou signal à 14 min) : le binôme qui mène monte d’un terrain, l’autre descend.']),
  cons:v.cons||['Le coach parle entre deux relais, pas pendant l’échange.'],
  reus:v.reus||'Les 2 rencontres terminées ou arrêtées au signal ; chaque élève a arbitré ou noté 4 relais.',moins:v.moins,plus:v.plus})
};
const T_SESSIONS=[
 {id:'t1',n:'S1',short:'Diagnostic',status:'next',title:'Diagnostic : dégagé, service long et premiers matchs',lead:'Faire jouer tout le monde tout de suite, rappeler les règles du service et de l’arbitrage, et repérer le niveau de chacun (jeu au centre, dégagés et amortis, smash) pour former les premiers terrains.',
  tl:[['Échauffement','10'],['Record de dégagés','15'],['Service long au fond','15'],['Montante-descendante à 4, 2 tours','30'],['Bilan','5']],
  eval:[['e1','Repérer le niveau de départ : jeu de renvoi au centre, en cloche (degré 1) ou dégagés et amortis sur un espace plus large (degré 2).'],['a2','Premier record de dégagés noté : la preuve de progrès pour l’engagement.'],['a3','Arbitrage dès la 1re séance : score du serveur en premier, service réglementaire.']],
  warm:'Échauffement guidé (fiche Échauffements, n° 1).',
  ex:[EX.degage({}),EX.servLong({}),EX.md4({k:'matchs libres, observation du prof',deroul:['1er tour : placement libre ; le prof note pour chaque élève son répertoire (renvois au centre, dégagés, amortis, smash), son service (simple mise en jeu ou intention) et ses déplacements.']})],
  bilan:'Quel est ton coup le plus sûr : dégagé, amorti, smash ? Écris-le sur la fiche de terrain : c’est ton point de départ.',check:'Les fiches de terrain (records, classement) servent à constituer les terrains de S2.'},
 {id:'t2',n:'S2',short:'Avant, fond',status:'next',title:'Déplacer l’adversaire en profondeur',lead:'Le fil rouge 1 devient dégagé-amorti : on fait avancer et reculer l’adversaire. Le fil rouge 2 ajoute le service court : servir court ou long selon le placement du receveur.',
  tl:[['Échauffement','10'],['Dégagé et amorti','15'],['Service court, service long','15'],['Montante-descendante : avant et fond ×2','30'],['Bilan','5']],
  eval:[['e1','Degré 2 → 3 : jeu élargi, service qui varie en profondeur.'],['e2','Degré 2 : un projet qui exploite une faiblesse de l’adversaire (le faire reculer).']],
  warm:'Échauffement guidé, puis la tournante (fiche Échauffements, n° 4).',
  ex:[EX.courtLong({}),EX.serv4({}),EX.md4({t:'Montante-descendante : zones avant et fond à points doublés',k:'match à thème · T. S3',sch:'zonesBonus',deroul:['Règle du match : un volant qui tombe dans la zone avant (avant la ligne de service) ou dans les 2 derniers mètres vaut 2 points (bandelette à 2 m de la ligne de fond).','2e tour : seule la zone avant compte double, pour obliger à finir court. La largeur se travaillera sur grand terrain à partir de S3.']})],
  bilan:'Combien de points as-tu marqués à 2 ? Où était ton adversaire quand tu as marqué ?'},
 {id:'t3',n:'S3',short:'Rompre l’échange',status:'next',title:'Rompre l’échange sur le volant facile',lead:'Reconnaître le volant à attaquer et le frapper au bon moment. Le service court prépare la 2e frappe : le kill. Premier échauffement d’équipe mené par un élève coach.',
  tl:[['Échauffement d’équipe','10'],['Du dégagé à la rupture','15'],['Service et kill','15'],['Grand terrain : « Banco »','30'],['Bilan','5']],
  eval:[['e1','Degré 3 : smash et drive ; création et exploitation d’occasions de marque.'],['e2','Exploiter son coup fort.'],['a2','Premier échauffement d’équipe : choix de l’axe, carnet du coach.']],
  warm:'Échauffement d’équipe, première fois : présenter la fiche (2 min), le coach du terrain mène. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.rupture({}),EX.servKill({}),EX.mdG({t:'Grand terrain : montante-descendante « Banco »',k:'match à thème · carnet ex. 25',deroul:['Premier passage sur grand terrain : 1 min pour rappeler les lignes du simple et jouer la largeur.','Le joueur qui crie « Banco ! » avant sa frappe et gagne l’échange marque 3 points ; s’il rate (faute ou volant renvoyé), l’adversaire marque 2 points.'],cons:['« Banco » seulement sur un volant haut et court : l’arbitre qui note relève les « Banco » réussis et ratés.','Grand terrain en simple : couloir latéral dehors, couloir du fond dedans.']})],
  bilan:'Combien de « Banco » réussis et ratés ? Sur grand terrain, as-tu marqué en jouant sur les côtés ?'},
 {id:'t4',n:'S4',short:'Retour · binômes',status:'next',title:'Retourner le service et choisir son binôme',lead:'Le retour empêche le serveur de conclure. En fin de séance, chacun choisit son partenaire d’épreuve, ses rôles et sa répartition AFL2/AFL3.',
  tl:[['Échauffement d’équipe','10'],['Retour de service','15'],['10 services pour marquer','15'],['Poules de niveau : score parlant','30'],['Bilan et choix des binômes','5']],
  eval:[['e1','Degré 3–4 : services variés ; le service crée des occasions de marque, le retour les neutralise.'],['a2','Choix de la répartition AFL2/AFL3 : 6/2, 4/4 ou 2/6.'],['a3','Choix du partenaire (au moins 3 leçons avant l’épreuve : ici 4) et des rôles évalués : coach et arbitre.']],
  warm:'Échauffement d’équipe, le coach change. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.retour({}),EX.serv10({}),EX.poule({t:'Poules de niveau : score parlant au service',k:'match à thème · T. S4, B. SRP1 · constituer les binômes',deroul:['Point gagné par le serveur sur son service ou sa 2e frappe = 2 points ; point gagné par le receveur sur son retour = 2 points. Les autres points valent 1.']})],
  bilan:'Écris sur la fiche de choix : ton partenaire, ta répartition AFL2/AFL3, tes 2 rôles. Le référentiel demande un partenaire de niveau similaire.',
  check:'Le référentiel impose de choisir le partenaire au moins 3 leçons avant l’épreuve. Le faire en S4 laisse S5 à S8 au binôme.'},
 {id:'t5',n:'S5',short:'Double · relais',status:'next',title:'Jouer à deux : le double et la rencontre en relais',lead:'Les binômes sont formés : on passe à deux binômes par terrain. Placement et règles du double, service court en double, puis première rencontre au format de l’épreuve en version courte.',
  tl:[['Échauffement d’équipe','10'],['Le double : formations','15'],['Service court en double','15'],['Rencontres en relais, 2 tours','30'],['Bilan','5']],
  eval:[['a3','Degré 2 → 3 en double : stratégie établie, puis respectée ; communication.'],['a3','Coach entre les relais, arbitre et marqueur pendant les simples.'],['e2','Le binôme choisit qui joue contre qui : choix tactique.']],
  warm:'Échauffement d’équipe par binôme, puis 2 min ensemble. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.dbl({}),EX.doubleServ({}),EX.relais({deroul:['Avant la rencontre, chaque binôme décide qui joue en A1 et en A2.']})],
  bilan:'En double, qui a pris les volants du milieu ? Décidez une règle pour la prochaine fois.'},
 {id:'t6',n:'S6',short:'Points forts, faibles',status:'next',title:'Repérer les forces et faiblesses de l’adversaire',lead:'Le coach observe, note et donne un seul conseil. Puis le binôme sert sur le point faible repéré. La rencontre se termine comme à l’épreuve : chacun écrit les points forts et faibles de ses adversaires.',
  tl:[['Échauffement d’équipe','10'],['Match d’observation, coaché','15'],['Servir sur le point faible','15'],['Rencontres en relais + fiche','30'],['Bilan','5']],
  eval:[['a2','Degré 2–4 : repérer un point fort OU faible (D2), les deux sur un match (D3), sur chaque match (D4).'],['e2','Projet de jeu qui exploite une faiblesse de l’adversaire.'],['a3','Coach : conseils simples puis pertinents.']],
  warm:'Échauffement d’équipe. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.obs({}),EX.servWeak({}),EX.relais({t:'Rencontres en relais, fiche forts/faibles',deroul:['Après chaque simple, le joueur écrit 1 point fort et 1 point faible de son adversaire (comme le jour de l’épreuve).'],reus:'Chaque élève a rempli sa fiche pour ses 2 simples.'})],
  bilan:'Relis ta fiche : le point faible que tu as noté, l’as-tu exploité dans ton 2e simple ?'},
 {id:'t7',n:'S7',short:'Adapter son projet',status:'next',title:'Contrer le coup fort adverse et adapter son projet en cours de match',lead:'Défendre l’attaque adverse et contre-attaquer, puis travailler les deux coups qui manquent pour les degrés 3 et 4 : le drive et le revers haut. En rencontre, le coach utilise son temps mort pour faire changer le projet de jeu.',
  tl:[['Échauffement d’équipe','10'],['Attaque contre défense','15'],['Drive et revers haut','15'],['Rencontres : temps mort et projet','30'],['Bilan','5']],
  eval:[['e2','Degré 4 : adapter son projet au cours du set selon l’évolution du rapport de force.'],['e1','Degré 3–4 : smash et drive, revers sur tout le terrain ; efficacité défensive et renversement du rapport de force.'],['a3','Degré 4 du coach : exploiter avec pertinence le temps mort.']],
  warm:'Échauffement d’équipe, l’axe est choisi d’après la fiche forts/faibles de S6. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.attDef({}),EX.driveRev({}),EX.relais({t:'Rencontres en relais : temps mort et projet',deroul:['Avant la rencontre, chaque joueur écrit son projet en une phrase.','Chaque binôme a 1 temps mort de 30 s par simple ; le coach dit ce qu’il faut changer et le note sur la fiche.'],cons:['À l’entraînement, on utilise le temps mort à chaque fois pour l’apprendre ; le jour de l’épreuve, il reste une possibilité.']})],
  bilan:'Ton projet a-t-il changé après le temps mort ? Qu’est-ce qui a marché ?'},
 {id:'t8',n:'S8',short:'Rencontre blanche',status:'next',title:'Rencontre blanche au format de l’épreuve',lead:'Les binômes vivent exactement les conditions de S9 : échauffement autonome, routines d’avant-match, rencontre complète. Tu chronomètres la rencontre pour régler le format du jour J.',
  tl:[['Échauffement autonome','10'],['Routine : service','5'],['Routine : retour et 2e frappe','5'],['Rencontre blanche complète','50'],['Bilan','5']],
  eval:[['a2','Préparation : échauffement autonome et complet (degré 3–4).'],['a3','Arbitres et coachs observés dans les conditions de l’épreuve.'],['e1','Dernier repérage des degrés AFL1 avant l’épreuve.']],
  warm:'Échauffement d’avant-rencontre, mené par les binômes seuls (fiche Échauffements, n° 7).',
  ex:[{t:'Routine d’avant-match 1 : service',k:'Préparation',sch:'serv4',disp:'Chaque binôme sur son terrain de rencontre.',four:'A1 et A2 servent 5 fois chacun dans les zones prévues pour le match ; le binôme adverse fait la même chose de l’autre côté.',deroul:['Le binôme répète les 2 services qu’il utilisera le plus.'],cons:['Ce sont les services du projet de jeu, pas des services nouveaux.'],reus:'8 services sur 10 dans la zone.'},
   {t:'Routine d’avant-match 2 : retour et 2e frappe',k:'Préparation',sch:'servKill',disp:'Même terrain.',four:'Chaque binôme sert à son tour ; l’autre retourne. 5 services par joueur.',deroul:['Service, retour, 2e frappe : on joue le point à mi-vitesse.'],cons:['On regarde comment l’adversaire retourne : c’est déjà de l’observation.'],reus:'Chacun a servi et retourné 5 fois.'},
   {t:'Rencontre blanche complète',k:'Jeu · format S9',sch:'relais',disp:'7 terrains, deux binômes de niveau similaire par terrain (ceux de l’épreuve si possible). Le 8e couple de binômes joue sur le terrain qui finit le premier.',four:'Pendant les simples : les deux partenaires arbitrent (l’un annonce, l’autre note) et coachent entre les sets. Pendant le double : le serveur annonce le score.',
    deroul:['Ordre de l’épreuve : A1–B1, A2–B2, A1–B2, A2–B1, puis le double. Chaque match en 2 sets secs de 11 points (voir l’onglet S9).','Chronomètre lancé au premier service, arrêté à la fin du double : note le temps de chaque terrain.','Après chaque simple, chaque joueur écrit les points forts et faibles de son adversaire.'],
    cons:['Si un terrain dépasse 50 min, décide maintenant du format de S9 (voir l’onglet Évaluation).'],reus:'Rencontre terminée sur tous les terrains ; fiches remplies.'}],
  bilan:'Combien de temps a duré ta rencontre ? Compte les points marqués par ton binôme : c’est l’indicateur de l’AFL1 élément 2 (moins de 35, 35 à 60, 60 à 75, plus de 75).'},
 {id:'t9',n:'S9',short:'Évaluation',status:'eval',evalPage:true,title:'Évaluation'}
];
const P_SESSIONS=[
 {id:'p1',n:'S1',short:'Règles · diagnostic',status:'next',title:'Règles, service réglementaire et premiers matchs',lead:'Même départ qu’en Terminale, avec plus de temps sur les règles : service réglementaire, lignes, comptage, arbitrage, montante-descendante. Le prof repère le niveau de chacun.',
  tl:[['Échauffement','10'],['Record de dégagés','15'],['Service long au fond','15'],['Montante-descendante à 4, 2 tours','30'],['Bilan','5']],
  eval:[['e1','Niveau de départ : renvois au centre et en cloche (D1) ou dégagés et amortis (D2).'],['a2','Premier record noté.'],['a3','Gestes d’arbitre : annonce du score du serveur en premier, faute, « out », volant à remettre.']],
  warm:'Échauffement guidé (fiche Échauffements, n° 1).',
  ex:[EX.degage({reus:'Record de la paire : 8 dégagés au fond en 1 min (repère de départ).'}),EX.servLong({deroul:['Élèves qui ne servent pas réglementairement : fiche Débutants, « service revers débutant », sur un demi-terrain.']}),EX.md4({k:'matchs libres · gestes d’arbitre',deroul:['Avant le 1er match, 2 min de démonstration de l’arbitrage : annonce du score (serveur en premier), bras tendu vers le volant tombé dedans, bras écartés pour « out », volant à remettre.']})],
  bilan:'Dégagé, amorti ou smash : lequel est ton coup le plus sûr ? Écris-le sur la fiche de terrain.'},
 {id:'p2',n:'S2',short:'Repousser au fond',status:'next',title:'Repousser l’adversaire au fond, puis jouer court',lead:'Le record devient plus exigeant : le partenaire doit être repoussé au fond. Puis dégagé et amorti alternés. En match, le fond compte double.',
  tl:[['Échauffement','10'],['Record de dégagés : repousser au fond','15'],['Dégagé et amorti','15'],['Montante-descendante : fond ×2','30'],['Bilan','5']],
  eval:[['e1','Degré 2 : dégagés hauts et amortis sur un espace de jeu plus large.'],['e2','Degré 2 : exploiter son coup fort (le dégagé) ou une faiblesse (l’adversaire qui recule mal).']],
  warm:'Échauffement guidé, puis jongles (fiche Échauffements, n° 2).',
  ex:[EX.degage({t:'Fil rouge 1 · Record de dégagés : repousser au fond',deroul:['Même dispositif qu’en S1 : on bat le record de S1.','2e minute (d’après T., Terminale CO) : après chaque frappe, le partenaire va toucher la ligne de service avant avec sa raquette ; il doit ensuite reculer pour dégager.'],reus:'Battre son record de S1.'}),EX.courtLong({}),EX.md4({t:'Montante-descendante : le fond compte double',k:'match à thème · C. S2, T. S5',sch:'zonesBonus',deroul:['Un volant qui tombe dans la zone du fond (bandelette à 2 m de la ligne de fond) vaut 2 points ; les autres points valent 1.','2e tour : la zone avant est doublée aussi.']})],
  bilan:'Combien de points as-tu marqués au fond ? Qu’est-ce qui t’a empêché d’y arriver plus souvent ?'},
 {id:'p3',n:'S3',short:'Déplacer',status:'next',title:'Déplacer l’adversaire : droite, gauche, court, long',lead:'Premier échauffement d’équipe. Déplacer l’adversaire latéralement, puis servir court ou long. En match, on ne joue jamais deux fois dans le même demi-terrain.',
  tl:[['Échauffement d’équipe','10'],['Déplacer à droite et à gauche','15'],['Service court, service long','15'],['Grand terrain : jamais deux fois','30'],['Bilan','5']],
  eval:[['e1','Degré 2 → 3 : jeu élargi, service qui varie en profondeur.'],['e2','Exploiter une faiblesse : déplacer l’adversaire.'],['a2','Premier échauffement d’équipe.']],
  warm:'Échauffement d’équipe, première fois : présenter la fiche (2 min). <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.dg({}),EX.serv4({}),EX.mdG({t:'Grand terrain : jamais deux fois dans le même demi-terrain',k:'match à thème · C. S2',sch:'demi',deroul:['Premier passage sur grand terrain : on apprend à jouer la largeur.','Deux frappes de suite dans le même demi-terrain (gauche ou droite) = point perdu (d’après C.). L’arbitre qui annonce surveille l’alternance.','2e tour : on alterne avant et fond au lieu de gauche et droite.']})],
  bilan:'Sur quels points as-tu fait courir ton adversaire ? Qu’avais-tu servi avant ?'},
 {id:'p4',n:'S4',short:'Rupture · binômes',status:'next',title:'Rompre l’échange et choisir son binôme',lead:'Smasher un volant facile, puis le reconnaître dans l’échange. En fin de séance, chacun choisit son partenaire, ses rôles et sa répartition AFL2/AFL3.',
  tl:[['Échauffement d’équipe','10'],['Smasher le volant donné','15'],['Du dégagé à la rupture','15'],['Poules de niveau « Banco »','30'],['Bilan et choix des binômes','5']],
  eval:[['e1','Degré 3 : smash ; création et exploitation d’occasions de marque.'],['a2','Choix de la répartition AFL2/AFL3 : 6/2, 4/4 ou 2/6.'],['a3','Choix du partenaire (au moins 3 leçons avant l’épreuve : ici 4) et des rôles.']],
  warm:'Échauffement d’équipe. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.smash({}),EX.rupture({}),EX.poule({t:'Poules de niveau « Banco »',k:'match à thème · carnet ex. 25 · constituer les binômes',deroul:['« Banco ! » annoncé puis échange gagné = 3 points ; raté = 2 points pour l’adversaire.']})],
  bilan:'Fiche de choix : ton partenaire, ta répartition AFL2/AFL3, tes 2 rôles (coach et arbitre).',check:'Le partenaire est choisi au moins 3 leçons avant l’épreuve (référentiel).'},
 {id:'p5',n:'S5',short:'Double · relais',status:'next',title:'Jouer à deux : le double et la rencontre en relais',lead:'Les binômes sont formés. Placement et règles du double, service court en double, puis la rencontre en relais : le format de l’épreuve en 15 min.',
  tl:[['Échauffement d’équipe','10'],['Le double : formations','15'],['Service court en double','15'],['Rencontres en relais, 2 tours','30'],['Bilan','5']],
  eval:[['a3','S’intégrer dans un duo : stratégie établie (D2), puis tenue (D3).'],['a3','Arbitre et marqueur pendant les simples ; coach entre les relais.']],
  warm:'Échauffement d’équipe par binôme. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.dbl({}),EX.doubleServ({}),EX.relais({deroul:['Avant la rencontre, chaque binôme décide qui joue en A1 et en A2.']})],
  bilan:'En double, qui prend les volants du milieu ? Écrivez votre règle.'},
 {id:'p6',n:'S6',short:'Servir pour marquer',status:'next',title:'Servir pour marquer',lead:'Le service devient une arme : marquer en peu de frappes, sous le regard du coach. La rencontre compte double les points gagnés vite.',
  tl:[['Échauffement d’équipe','10'],['10 services pour marquer','15'],['Service et kill, coachés','15'],['Rencontres : score parlant','30'],['Bilan','5']],
  eval:[['e1','Degré 3 : variété des services (placements, vitesses).'],['e1','Degré 4 : le service crée des occasions de marque.'],['a3','Coach : conseils simples et ciblés.']],
  warm:'Échauffement d’équipe. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.serv10({disp:'Deux binômes par terrain, un match sur le terrain entier : 2 jouent, 2 arbitrent.',four:'A1 sert 10 fois, B1 joue le point ; A2 annonce, B2 note les points de A1. Puis B1 sert, A1 et B2 arbitrent…'}),EX.servKill({disp:'Deux binômes par terrain. Une boîte de volants par terrain.',four:ROTB+' Le coach (A2) note si A1 marque en 2 frappes ou moins et lui propose un autre service après 3 échecs.'}),EX.relais({t:'Rencontres en relais : score parlant',deroul:['Point gagné par le serveur sur son service ou sa 2e frappe = 2 points.']})],
  bilan:'Quel service t’a rapporté le plus de points ? Ce sera ton service de l’épreuve.'},
 {id:'p7',n:'S7',short:'Points forts, faibles',status:'next',title:'Repérer la faiblesse de l’adversaire et coacher',lead:'Le coach observe et donne un conseil, le binôme sert sur le point faible repéré. La rencontre se termine comme à l’épreuve, avec la fiche forts/faibles et le temps mort.',
  tl:[['Échauffement d’équipe','10'],['Match d’observation, coaché','15'],['Servir sur le point faible','15'],['Rencontres : fiche et temps mort','30'],['Bilan','5']],
  eval:[['a2','Repérer un point fort OU faible (D2), les deux (D3), sur chaque match (D4).'],['e2','Projet qui exploite une faiblesse adverse ou contre un coup fort.'],['a3','Coach : exploiter le temps mort (D4).']],
  warm:'Échauffement d’équipe. <a href="#" data-go="equipe">Fiche Échauffement d’équipe</a>',
  ex:[EX.obs({}),EX.servWeak({}),EX.relais({t:'Rencontres : fiche forts/faibles et temps mort',deroul:['1 temps mort de 30 s par simple pour chaque binôme.','Après chaque simple, le joueur écrit 1 point fort et 1 point faible de son adversaire.']})],
  bilan:'Le point faible repéré par ton coach : l’as-tu exploité ? Combien de points ça t’a rapporté ?'},
 {id:'p8',n:'S8',short:'Rencontre blanche',status:'next',title:'Rencontre blanche au format de l’épreuve',lead:'Mêmes conditions qu’en S9 : échauffement autonome, routines, rencontre complète chronométrée.',
  tl:[['Échauffement autonome','10'],['Routine : service','5'],['Routine : retour et 2e frappe','5'],['Rencontre blanche complète','50'],['Bilan','5']],
  eval:[['a2','Préparation autonome et complète.'],['a3','Arbitres et coachs dans les conditions de l’épreuve.'],['e1','Dernier repérage des degrés.']],
  warm:'Échauffement d’avant-rencontre (fiche Échauffements, n° 7).',ex:null,bilan:'Combien de temps a duré la rencontre ? Combien de points a marqués ton binôme ?'},
 {id:'p9',n:'S9',short:'Évaluation',status:'eval',evalPage:true,title:'Évaluation'}
];
P_SESSIONS[7].ex=T_SESSIONS[7].ex;
const A_SESSIONS=[
 {id:'a1',n:'L1',short:'Je m’évalue en match',status:'next',title:'Situation de référence : je m’évalue en match',lead:'Les binômes jouent la forme de l’épreuve (2 équipes de 2, chaque joueur rencontre les 2 adversaires). Le coach note comment son joueur gagne ses points ; chacun se situe ensuite sur son étoile. C’est le point de départ de tout le cycle.',
  tl:[['Échauffement guidé','10'],['Apprendre la grille d’observation','10'],['Rencontre de référence : 1er match','25'],['Rencontre de référence : 2e match','25'],['Bilan : je me situe sur l’étoile','5']],
  eval:[['e1','Niveau de départ en match réel : jeu au centre (D1) ou dégagés et amortis (D2) ?'],['e2','« Comment je prévois de gagner ? » : premier projet de jeu écrit.'],['a3','Premier rôle de coach-observateur.']],
  warm:'Échauffement guidé (onglet Échauffements de l’entrée « cycle guidé », n° 1).',
  ex:[{t:'Apprendre la grille d’observation',k:'Analyse · carnet de D. et Y., leçon 1',disp:'Toute la classe, puis les binômes à leur terrain. Une feuille « Comment se gagne l’échange » par élève ; la zone centrale de chaque demi-terrain matérialisée par 4 plots.',four:'Le professeur montre un échange ; tous les élèves notent. Puis, à chaque terrain : un joueur joue un échange, son coach note, on compare.',deroul:['Codes : 0 = volant joué en zone centrale ou faute de l’adversaire ; 1 = volant non renvoyé hors zone centrale ; 2 = smash non renvoyé ; 3 = stratégie annoncée et réalisée ; x = service raté ou faute sur volant facile.','Chaque joueur écrit son projet : « Comment je prévois de gagner ? » (ex. : service sur le revers et smash avant la 5e frappe).'],cons:['On note chaque point gagné, et chaque faute facile par une croix.','Le score observé = la somme des 1, 2 et 3.'],reus:'Deux observateurs du même terrain notent le même code sur 8 échanges sur 10.'},
   {t:'Rencontre de référence : 1er match',k:'Situation complexe · forme de l’épreuve',sch:'relais',disp:'2 équipes de 2 par terrain (7 terrains ; la 8e rencontre joue sur le terrain qui finit le premier). Matchs en 2 sets secs de 11 points (ou 4 min). Outil Auto-évaluation : grille de comptage.',four:'Un joueur de chaque équipe joue ; son coach note ses points avec la grille ; l’autre coach fait de même pour son joueur. Coaching entre les deux sets. L’arbitrage est fait par les coachs (l’un annonce, l’autre note).',deroul:['A1 contre B1 : les coachs A2 et B2 notent.','Puis A2 contre B2 : les coachs A1 et B1 notent.','Entre les sets, le coach dit à son joueur ce qu’il voit.'],cons:['Le coach écrit une phrase de diagnostic (carnet) : « Ce joueur joue trop au centre, smashe peu et fait beaucoup de fautes : CONTINUITÉ, SMASH et stratégies ».'],reus:'Chaque élève a sa grille remplie et une phrase de diagnostic.'},
   {t:'Rencontre de référence : 2e match',k:'Situation complexe · forme de l’épreuve',sch:'relais',disp:'Même dispositif, adversaires croisés.',four:'A1 contre B2, puis A2 contre B1 ; les coachs notent. Si le temps le permet, le double (le serveur annonce le score).',deroul:['Même grille ; comparer le score observé du 1er et du 2e match.','Fin de rencontre : chaque élève se situe sur son étoile (7 axes, 4 degrés) avec l’aide de son coach.'],cons:['On se situe avec les faits notés, pas avec l’impression.'],reus:'Chaque élève a placé ses 7 axes sur l’étoile.'}],
  bilan:'Sur ton étoile, quels sont les 2 axes les plus faibles ? Écris-les dans ton carnet : ce sont tes pistes pour la leçon 2.'},
 {id:'a2',n:'L2',short:'Je repère mes problèmes',status:'next',title:'Je repère mes problèmes : matchs à thème',lead:'Chaque élève joue les matchs à thème liés à ses axes faibles. Le match à thème montre le problème (« je laisse trop descendre le volant », « je joue au centre »…) ; l’élève choisit ensuite son axe de travail et ses premiers exercices dans le catalogue.',
  tl:[['Échauffement en duo','10'],['Match à thème de mon 1er axe faible','15'],['Match à thème de mon 2e axe faible','15'],['Premier essai des exercices choisis','25'],['Bilan : mon axe de travail','10']],
  eval:[['a2','Analyse : relier un problème repéré à un thème et à des exercices.'],['e2','Repérer son coup fort et le point faible adverse (match à thème 1).']],
  warm:'Échauffement en duo : « On en fait 20 ! » (catalogue, thème 8, exercice A3).',
  ex:[{t:'Match à thème de mon 1er axe faible',k:'Situation complexe ciblée',disp:'Le professeur regroupe les élèves par match à thème (onglet Suivi : comptage des choix) ; 2 ou 3 élèves par demi-terrain en long. Affiche du match à thème au bord du terrain.',four:'Deux jouent le match à thème, le 3e arbitre et compte les bonus avec la grille du match à thème. Rotation à chaque match (3 ou 4 min).',deroul:['Lire la règle du match à thème sur l’affiche.','Après chaque match : cocher dans la liste des « problèmes » ceux qu’on a eus.'],cons:['Le match à thème rend le problème visible : on ne cherche pas encore à le corriger.'],reus:'Chaque élève a coché au moins un problème.'},
   {t:'Match à thème de mon 2e axe faible',k:'Situation complexe ciblée',disp:'Même organisation, autre match à thème.',four:'Deux jouent, le 3e arbitre et compte.',deroul:['Même démarche.','Comparer : lequel des deux thèmes me pose le plus de problèmes ?'],cons:['Choisir l’axe où je perds le plus de points.'],reus:'Un axe de travail choisi, écrit dans le carnet.'},
   {t:'Premier essai des exercices choisis',k:'Catalogue · travail en autonomie',disp:'2 ou 3 élèves par demi-terrain en long, si possible sur le même thème. Affiches du catalogue au bord des terrains.',four:'Chacun son exercice : le joueur travaille, le partenaire fait ce que dit la case « partenaires », le 3e compte, observe et conseille. Rotation toutes les 4 min.',deroul:['Choisir 2 exercices du thème dans le catalogue.','Lire la consigne, les critères (ampoule) et les niveaux à atteindre.','Noter dans le carnet le numéro et le niveau atteint.'],cons:['Commencer par le niveau le plus simple.'],reus:'Chaque élève a essayé 2 exercices et noté son niveau.'}],
  bilan:'Carnet : mon axe de travail, le problème repéré, les numéros des exercices choisis et le niveau atteint.'},
 ...[3,4,5,6,7].map(k=>({id:'a'+k,n:'L'+k,status:'next',
  short:{3:'Autonomie · axe 1',4:'Autonomie · binômes',5:'Autonomie · rôles',6:'Autonomie · contrer',7:'Autonomie · projet'}[k],
  title:{3:'Travail en autonomie sur mon premier axe',4:'Travail en autonomie, choix du binôme',5:'Travail en autonomie, coach et arbitre',6:'Travail en autonomie : repérer et contrer une stratégie',7:'Travail en autonomie : mon projet pour l’épreuve'}[k],
  lead:{3:'Chaque élève reprend l’axe choisi en L2 : 2 exercices du catalogue, puis le match à thème pour valider. Le professeur circule de terrain en terrain et vérifie les carnets.',
   4:'Même déroulé. L’élève qui a validé son match à thème passe à un 2e thème ou à un niveau supérieur. En fin de séance : choix du partenaire d’épreuve (au moins 3 leçons avant), de la répartition AFL2/AFL3 et des rôles.',
   5:'Même déroulé, avec un axe de rôle obligatoire : coach (thèmes 9–10) ou arbitre (thèmes 11–12), pour préparer l’AFL3. Les binômes travaillent ensemble.',
   6:'Le thème 7 entre dans les matchs : projet « secret » en 1re mi-temps, concertation coach-joueur à la mi-temps pour le contrer. Les exercices restent au choix.',
   7:'Dernière leçon de travail : chaque binôme choisit les exercices qui servent son projet pour l’épreuve, puis rencontre un autre binôme en relais.'}[k],
  tl:[['Échauffement en duo','10'],['Exercice choisi n° 1','15'],['Exercice choisi n° 2','15'],[k>=6?'Matchs : '+(k===6?'repérer et contrer':'rencontre en relais'):'Match à thème de validation, puis matchs','30'],['Bilan dans le carnet','5']],
  eval:[['a2','Engagement et autonomie : choisir, persévérer, valider (carnet, onglet Suivi).'],k===5?['a3','Rôle travaillé : coach ou arbitre (thèmes 9 à 12).']:k===6?['e2','Degré 4 : adapter son projet au cours du set (thème 7).']:['e1','Le niveau validé dans les exercices montre les acquis techniques.'],k===4?['a3','Choix du partenaire, des rôles et de la répartition AFL2/AFL3.']:['a2','Analyse : le problème repéré dans le match à thème a-t-il disparu ?']],
  warm:'Échauffement en duo adapté à l’axe choisi (thème 8, exercice A3 : « j’adapte ma routine à mon axe »).',
  ex:[{t:'Exercice choisi n° 1',k:'Catalogue · au choix de l’élève',disp:'Terrains organisés par thème (onglet Suivi : nombre d’élèves par thème et demi-terrains proposés). Affiches du catalogue au bord des terrains ; les exercices 5 à 8 (jongles, parcours) se font autour des terrains, sans les occuper.',four:'Par demi-terrain en long, 2 ou 3 élèves : chacun son exercice. Le joueur travaille ; le partenaire fait ce qu’indique la case « partenaires » (renvoyer, distribuer, compter) ; le 3e observe avec les critères (ampoule) et conseille. Rotation toutes les 5 min.',deroul:['Relire dans le carnet le problème repéré et le niveau atteint la fois précédente.','Faire l’exercice jusqu’au niveau visé ; noter le niveau atteint.'],cons:['Valider un niveau avant de passer à l’exercice suivant (thème 8 : persévérer).'],reus:'Un niveau de plus validé, noté dans le carnet.'},
   {t:'Exercice choisi n° 2',k:'Catalogue · au choix de l’élève',disp:'Même organisation.',four:'Même rotation.',deroul:['Deuxième exercice du même thème, ou exercice d’un 2e thème si le 1er est validé.'],cons:['Un exercice réussi sans effort : on prend le niveau ou l’exercice suivant.'],reus:'Un niveau de plus validé.'},
   {t:k===7?'Rencontre en relais':k===6?'Matchs : repérer et contrer une stratégie':'Match à thème de validation, puis matchs',k:'Validation et jeu',sch:k===7?'relais':'grand4',disp:k===7?'2 binômes par terrain, onglet Tournois en mode binômes.':'Groupes de 4 ou 5 par terrain, sur grand terrain pour jouer la largeur ; onglet Tournois (grand terrain, poules ou ronde suisse) ou Défi ATP pour les matchs.',
    four:k===7?'Pendant les simples, les partenaires arbitrent (l’un annonce, l’autre note) et coachent entre les relais.':'Deux jouent sur le terrain entier, deux arbitrent et comptent les bonus du match à thème (l’un annonce, l’autre note) ; à 5, le 5e coache. Rotation à chaque match.',
    deroul:k===7?['Rencontre en relais (8, 16, 24, 32, double jusqu’à 40).','Avant : chaque joueur écrit son projet ; après : 1 point fort et 1 point faible de chaque adversaire.']:k===6?['Tournoi de matchs de 4 min (2 mi-temps) : le gagnant reste.','1re mi-temps : un joueur suit un projet « secret » ; à la mi-temps, l’adversaire et son coach se concertent pour le contrer.']:['10 min : le match à thème de son axe ; le partenaire compte les bonus. Validé si le problème coché en L2 a disparu ou si le score atteint le bonus visé.','20 min : matchs avec un projet de jeu annoncé (montante-descendante ou défi ATP).'],
    cons:['Le match à thème valide l’acquisition : c’est là qu’on voit si l’exercice a servi.'],reus:k===7?'Chaque élève a sa fiche forts/faibles.':'Match à thème validé, ou problème noté pour la leçon suivante.'}],
  bilan:k===4?'Carnet, puis fiche de choix : ton partenaire, ta répartition AFL2/AFL3, tes 2 rôles.':'Carnet : niveau atteint, match à thème validé ou non, ce que je travaille la prochaine fois.'})),
 {id:'a8',n:'L8',short:'Préparer l’épreuve',status:'next',title:'Préparer l’épreuve : ma gestion des 15 minutes et la rencontre blanche',lead:'Le carnet appelle cette leçon « Ma gestion des 15’ » : chaque binôme gère seul ses 15 min de préparation (duo, routines de son axe, duel), puis joue une rencontre blanche complète en analysant ses adversaires.',
  tl:[['Ma gestion des 15 min : duo','5'],['Ma gestion des 15 min : routines de mon axe','10'],['Ma gestion des 15 min : duel','5'],['Rencontre blanche complète','50'],['Bilan','5']],
  eval:[['a2','Préparation autonome et complète (D3–D4).'],['a3','Coach et arbitre dans les conditions de l’épreuve.'],['e2','Projet de jeu écrit avant chaque match ; points binôme comptés.']],
  warm:'Les 15 premières minutes sont l’échauffement : le binôme les organise seul et l’écrit dans le carnet.',
  ex:[{t:'Ma gestion des 15 min : routines de mon axe',k:'Préparation · AFL2',disp:'Sur le terrain de la rencontre.',four:'Les deux binômes partagent le terrain : un demi-terrain en long chacun, 5 min de routines de son axe, le partenaire renvoie.',deroul:['Duo (5 min) : échanges longs, réguliers.','Routines de mon axe (10 min) : exercice validé, au niveau atteint.','Duel (5 min) : points joués, pour se mettre dans le match.'],cons:['Les routines choisies servent le projet de jeu de l’épreuve.'],reus:'Les 15 min sont écrites dans le carnet et respectées.'},
   {t:'Ma gestion des 15 min : duel',k:'Préparation',disp:'Même terrain.',four:'Points joués entre binômes.',deroul:['Quelques points, service compris, pour se mettre dans le match.'],cons:['Observer déjà l’adversaire : où joue-t-il ? quel coup fort ?'],reus:'Prêt à jouer.'},
   T_SESSIONS[7].ex[2]],
  bilan:'Mon analyse des matchs (carnet) : le style de jeu de chaque adversaire, ses + et ses −, ma stratégie, ce que je modifie à la mi-temps. Combien de points a marqués mon binôme ?'},
 {id:'a9',n:'L9',short:'Évaluation',status:'eval',evalPage:true,title:'Évaluation'}
];
A_SESSIONS[7].ex=[A_SESSIONS[7].ex[0],A_SESSIONS[7].ex[1],A_SESSIONS[7].ex[2]];
P_SESSIONS.forEach(s=>s.orig=s.status);
T_SESSIONS.forEach(s=>s.orig=s.status);
A_SESSIONS.forEach(s=>s.orig=s.status);

/* Variables « plus facile / plus difficile » des situations qui n’en avaient pas (fixe = pas de variable, volontairement). */
(function(){const V={"t1#2": {"fixe": "Matchs d’observation : pas d’aménagement, pour voir le vrai niveau de chacun."}, "t2#2": {"moins": "Zones bonus agrandies : bandelette à 2,50 m du fond, zone avant jusqu’à 50 cm derrière la ligne de service.", "plus": "Volant qui tombe au centre (hors zones bonus) = point pour l’adversaire."}, "t3#2": {"moins": "« Banco » raté = 1 point seulement pour l’adversaire.", "plus": "« Banco » valable seulement si le volant tombe dans un couloir latéral ; raté = 3 points pour l’adversaire."}, "t4#2": {"moins": "Seul le serveur peut gagner 2 points (sur ses 3 premières frappes) ; même règle pour toute la poule.", "plus": "Point gagné sur le service ou la 2e frappe = 3 points ; service court imposé ; même règle pour toute la poule."}, "t5#2": {"moins": "Relais à 6 points (6, 12, 18, 24, 30) pour finir à coup sûr dans le temps.", "plus": "Signal à 12 min au lieu de 14 : gérer l’avance et le temps comme le jour de l’épreuve."}, "p5#2": {"moins": "Relais à 6 points (6, 12, 18, 24, 30) pour finir à coup sûr dans le temps.", "plus": "Signal à 12 min au lieu de 14 : gérer l’avance et le temps comme le jour de l’épreuve."}, "t6#2": {"moins": "Fiche à cocher (service, fond, filet, déplacements) au lieu d’écrire.", "plus": "Le joueur écrit aussi ce qu’il change pour son 2e simple ; le coach vérifie au relais suivant."}, "t7#2": {"moins": "Projet choisi parmi 3 affichés (jouer le fond, varier court-long, servir court) ; le coach ne dit qu’une chose au temps mort.", "plus": "Temps mort seulement si le binôme est mené de 3 points ; le coach note si le projet est tenu."}, "t8#0": {"moins": "Un seul service répété ; réussite à 6 sur 10.", "plus": "Le receveur est en position de match et attaque tout service trop haut ; toujours 8 sur 10."}, "t8#1": {"moins": "Service court imposé ; le point s’arrête après la 2e frappe.", "plus": "Après la 2e frappe, le point se joue à vitesse de match."}, "t8#2": {"fixe": "Rencontre blanche : conditions de l’épreuve, pour mesurer le temps et le niveau réels."}, "p1#2": {"fixe": "Premiers matchs libres : on observe le niveau réel ; seul l’arbitrage est guidé."}, "p2#2": {"moins": "Bandelette à 2,50 m de la ligne de fond (zone plus grande) ; service court ou long au choix.", "plus": "Bandelette à 1,50 m ; volant qui tombe au centre = point pour l’adversaire."}, "p3#2": {"moins": "La règle s’applique à partir de la 3e frappe (service et retour libres).", "plus": "En plus, point gagné dans un couloir latéral = 2 points."}, "p4#2": {"moins": "« Banco » raté = 1 point seulement pour l’adversaire.", "plus": "2 « Banco » maximum par match : choisir le bon moment."}, "p6#2": {"moins": "Point gagné par le serveur dans ses 3 premières frappes = 2 points.", "plus": "Point gagné par le receveur sur son retour = 2 points aussi : le serveur doit soigner son service."}, "p7#2": {"moins": "Fiche à cocher ; le coach ne dit qu’une chose au temps mort.", "plus": "Temps mort seulement si le binôme est mené de 3 points ; le joueur écrit ce qu’il change pour son 2e simple."}};
[T_SESSIONS,P_SESSIONS].forEach(L=>L.forEach(s=>{if(!s||!s.ex)return;Object.keys(V).forEach(k=>{const [sid,i]=k.split('#');if(sid!==s.id)return;const e=Array.isArray(s.ex)?s.ex[+i]:s.ex[i];if(!e||e.moins||e.plus||e.fixe)return;Object.assign(e,V[k]);});}));})();

/* Variables des leçons en autonomie. */
(function(){const V={"a1#0": {"moins": "Seulement 3 codes au début (0, 1, x) ; on ajoute 2 et 3 au 2e match.", "plus": "L’observateur note aussi la frappe qui a préparé le point gagnant."}, "a1#1": {"fixe": "Situation de référence : forme de l’épreuve, pour situer chacun au départ."}, "a1#2": {"fixe": "Situation de référence : forme de l’épreuve, pour situer chacun au départ."}, "a2#0": {"fixe": "Match à thème de diagnostic : on garde la règle telle quelle pour voir le problème."}, "a2#1": {"fixe": "Match à thème de diagnostic : on garde la règle telle quelle pour voir le problème."}, "a2#2": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a8#0": {"fixe": "Routines choisies par le binôme, au niveau déjà validé."}, "a8#1": {"fixe": "Préparation libre du binôme."}, "a8#2": {"fixe": "Rencontre blanche : conditions de l’épreuve, pour mesurer le temps et le niveau réels."}, "a3#0": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a3#1": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a4#0": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a4#1": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a5#0": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a5#1": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a6#0": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a6#1": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a7#0": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a7#1": {"fixe": "Les niveaux sont dans le catalogue : l’élève reste au niveau atteint ou passe au suivant, sans autre aménagement."}, "a3#2": {"moins": "Bonus visé abaissé d’un cran ; matchs ensuite sans contrainte de projet.", "plus": "Bonus visé relevé d’un cran ; le projet de jeu est annoncé à l’adversaire avant le match."}, "a4#2": {"moins": "Bonus visé abaissé d’un cran ; matchs ensuite sans contrainte de projet.", "plus": "Bonus visé relevé d’un cran ; le projet de jeu est annoncé à l’adversaire avant le match."}, "a5#2": {"moins": "Bonus visé abaissé d’un cran ; matchs ensuite sans contrainte de projet.", "plus": "Bonus visé relevé d’un cran ; le projet de jeu est annoncé à l’adversaire avant le match."}, "a6#2": {"moins": "Le coach aide le joueur à deviner le projet « secret » dès la 1re mi-temps.", "plus": "Pas de concertation à la mi-temps : le joueur trouve seul la parade."}, "a7#2": {"moins": "Fiche forts/faibles à cocher au lieu d’écrire.", "plus": "Le joueur écrit aussi ce qu’il changera le jour de l’épreuve."}};
A_SESSIONS.forEach(s=>{if(!s||!s.ex)return;Object.keys(V).forEach(k=>{const [sid,i]=k.split('#');if(sid!==s.id)return;const e=s.ex[+i];if(!e||e.moins||e.plus||e.fixe)return;Object.assign(e,V[k]);});});})();

return {SCH,tt,salle,CR_SERV,CR_DEG,LEGEND:typeof LEGEND!=="undefined"?LEGEND:""};
})();

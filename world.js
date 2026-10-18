const TITLE="Naol Game"; // maqaa game asitti jijjiiri
document.title=TITLE;t.textContent=TITLE;ttl.textContent=TITLE;
const R=new THREE.WebGLRenderer({antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(innerWidth,innerHeight);
document.body.prepend(R.domElement);
const S=new THREE.Scene();{const c=document.createElement('canvas');c.width=2;c.height=256;const q=c.getContext('2d'),g=q.createLinearGradient(0,0,0,256);g.addColorStop(0,'#2b7fd0');g.addColorStop(.6,'#8fc7ee');g.addColorStop(1,'#e8f2f5');q.fillStyle=g;q.fillRect(0,0,2,256);S.background=new THREE.CanvasTexture(c)}
S.fog=new THREE.Fog(0xcfe4ee,150,900);
const cam=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.1,1400);
S.add(new THREE.HemisphereLight(0xffffff,0x5a6b3a,1.05));
const sun=new THREE.DirectionalLight(0xffffff,.8);sun.position.set(60,120,40);S.add(sun);
const M=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o));
const box=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(p||S).add(o);return o};
const rnd=(a,b)=>a+Math.random()*(b-a);

/* ---------- Finfinnee (Addis Ababa) low-poly ---------- */
const ground=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000),M(0x5f8f3a));ground.rotation.x=-Math.PI/2;S.add(ground);
const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t};
const rt=cv(64,128,q=>{q.fillStyle='#3d3e42';q.fillRect(0,0,64,128);for(let i=0;i<260;i++){q.fillStyle=Math.random()<.5?'#47484c':'#323337';q.fillRect(Math.random()*64,Math.random()*128,2,2)}q.fillStyle='#d9d9d2';q.fillRect(30,18,4,50)});
rt.repeat.set(1,36);const rm=M(0xffffff,{map:rt}),ri=M(0x3d3e42);
for(let i=-5;i<=5;i++){const a=new THREE.Mesh(new THREE.PlaneGeometry(12,720),rm);a.rotation.x=-Math.PI/2;a.position.set(i*60,.06,0);S.add(a);
 const b=new THREE.Mesh(new THREE.PlaneGeometry(12,720),rm);b.rotation.set(-Math.PI/2,0,Math.PI/2);b.position.set(0,.07,i*60);S.add(b);
 for(let j=-5;j<=5;j++){const p=new THREE.Mesh(new THREE.PlaneGeometry(12,12),ri);p.rotation.x=-Math.PI/2;p.position.set(i*60,.09,j*60);S.add(p)}}
const wt=n=>{const t=cv(64,64,q=>{q.fillStyle='#fff';q.fillRect(0,0,64,64);q.fillStyle='#27384a';q.fillRect(7,16,18,26);q.fillRect(39,16,18,26)});t.repeat.set(2,n);return t};
const FL=[[3,wt(3)],[6,wt(6)],[12,wt(12)],[16,wt(16)]],pal=[0xe9d8a6,0xd4a373,0xcfd8dc,0xb08968,0xf1faee,0xa8dadc],bm={};
const BL=[];
for(let i=-4;i<=4;i++)for(let j=-4;j<=4;j++){
 const cx=i*60+30,cz=j*60+30;box(48,.3,48,M(0x8f8a80),cx,.15,cz);
 if(!i&&!j)continue;
 const n=3+Math.floor(Math.random()*3);
 for(let k=0;k<n;k++){const ci=Math.random()<.2?2+Math.floor(Math.random()*2):Math.floor(Math.random()*2),h=FL[ci][0]*3.5,w=rnd(8,16),d=rnd(8,16),pi=Math.floor(Math.random()*pal.length),key=ci+'_'+pi;
  bm[key]=bm[key]||M(pal[pi],{map:FL[ci][1]});
  const bx=cx+rnd(-16,16),bz=cz+rnd(-16,16);BL.push([bx,bz,w/2,d/2]);box(w,h,d,bm[key],bx,h/2,bz)}}
// Meskel Square landmark: flag-colour tower on the plaza
[[0x2f9e44,0],[0xfcc419,8],[0xe03131,16]].forEach(([c,y])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,8,16),M(c));m.position.set(30,y+4,30);S.add(m)});
// eucalyptus trees + hills outside the city
for(let i=0;i<260;i++){const a=rnd(0,6.28),r=rnd(340,800),x=Math.cos(a)*r,z=Math.sin(a)*r;
 const tr=new THREE.Mesh(new THREE.CylinderGeometry(.4,.6,10,6),M(0x6d4c41));tr.position.set(x,5,z);S.add(tr);
 const lf=new THREE.Mesh(new THREE.ConeGeometry(3,12,7),M(0x2d6a4f));lf.position.set(x,15,z);S.add(lf)}
for(let i=0;i<18;i++){const a=i/18*6.28+rnd(-.1,.1),r=rnd(900,1150),h=rnd(90,200);
 const m=new THREE.Mesh(new THREE.ConeGeometry(rnd(120,200),h,7),M(0x6a994e));m.position.set(Math.cos(a)*r,h/2,Math.sin(a)*r);S.add(m)}


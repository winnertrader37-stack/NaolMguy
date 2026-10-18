/* ---------- controls ---------- */
const k={},T={};let cm=0,yaw=0,pit=.35;
addEventListener('keydown',e=>{k[e.code]=1;if(e.code=='KeyC')setCam((cm+1)%5)});
addEventListener('keyup',e=>k[e.code]=0);
document.querySelectorAll('[data-t]').forEach(b=>{const t=b.dataset.t;
 b.onpointerdown=e=>{T[t]=1;e.preventDefault()};['pointerup','pointerleave','pointercancel'].forEach(n=>b['on'+n]=()=>T[t]=0)});
const wh=document.getElementById('wheel');let wd=0;
function wmove(e){const r=wh.getBoundingClientRect(),a=Math.atan2(e.clientX-r.left-r.width/2,-(e.clientY-r.top-r.height/2)),c=Math.max(-1.6,Math.min(1.6,a));wh.style.transform='rotate('+c+'rad)';T.s=c/1.6}
function wend(){wd=0;T.s=0;wh.style.transition='transform .2s';wh.style.transform='rotate(0rad)'}
wh.onpointerdown=e=>{wd=1;wh.setPointerCapture(e.pointerId);wh.style.transition='none';wmove(e)};
wh.onpointermove=e=>{if(wd)wmove(e)};wh.onpointerup=wh.onpointercancel=wend;
const names=['Duubaa','Fuula','Keessa','Olii','Naannoo'],cb=[];
names.forEach((n,i)=>{const b=document.createElement('button');b.textContent=n;b.onclick=()=>setCam(i);cams.append(b);cb.push(b)});
function setCam(i){cm=i;cb.forEach((b,j)=>b.classList.toggle('on',j==i))}setCam(0);
let drag=0;R.domElement.onpointerdown=e=>{drag=1;if(cm!=4)return};
addEventListener('pointerup',()=>drag=0);
addEventListener('pointermove',e=>{if(drag&&cm==4){yaw-=e.movementX*.01;pit=Math.max(.05,Math.min(1.3,pit+e.movementY*.01))}});

/* ---------- engine sound ---------- */
let ac,o1,o2,gn,fl;
go.onclick=()=>{start.style.display='none';paused=false;
 try{ac=new(window.AudioContext||window.webkitAudioContext)();o1=ac.createOscillator();o2=ac.createOscillator();gn=ac.createGain();fl=ac.createBiquadFilter();
 o1.type='sawtooth';o2.type='square';fl.type='lowpass';gn.gain.value=0;o1.connect(fl);o2.connect(fl);fl.connect(gn);gn.connect(ac.destination);o1.start();o2.start()}catch(e){}};

/* ---------- v2: baadiyyaa, traffic, leopard, coins, menu ---------- */
let paused=true,hp=100,score=0,got=0,foc=100,cd=0,ph=0;
// baadiyyaa: dirt road + tukul huts
box(10,.05,640,M(0x8d6e4c),0,.04,680);
for(let i=0;i<40;i++){const hx=(Math.random()<.5?-1:1)*rnd(12,45),hz=rnd(380,980);
 const a=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,2.2,10),M(0xe0c9a0));a.position.set(hx,1.1,hz);S.add(a);
 const b=new THREE.Mesh(new THREE.ConeGeometry(3.3,2.4,10),M(0x8a6a3a));b.position.set(hx,3.4,hz);S.add(b)}
// traffic
function mkCar(c){const g=new THREE.Group();box(1.9,.8,4.2,M(c),0,.8,0,g);box(1.7,.7,2.2,M(0x222a30),0,1.5,-.2,g);
 [[-.9,1.5],[.9,1.5],[-.9,-1.5],[.9,-1.5]].forEach(([a,b])=>box(.3,.7,.7,dark,a,.35,b,g));S.add(g);return g}
const tr=[];for(let i=0;i<14;i++){const o={a:i%2,d:Math.random()<.5?-1:1,r:Math.floor(rnd(-4,5)),s:rnd(-340,340),sp:rnd(8,16),g:mkCar([0xe03131,0xfcc419,0xf1f1f1,0x1971c2,0x868e96][i%5])};
 o.g.rotation.y=o.a?o.d*Math.PI/2:(o.d>0?0:Math.PI);tr.push(o)}
// coins
const coins=[];function place(c){const r=Math.floor(rnd(-4,5))*60,p=rnd(-300,300);Math.random()<.5?c.position.set(r,1.4,p):c.position.set(p,1.4,r)}
for(let i=0;i<25;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,.2,16).rotateX(Math.PI/2),new THREE.MeshBasicMaterial({color:0xffd43b}));place(c);S.add(c);coins.push(c)}
// leopard companion
const lp=new THREE.Group(),lm=M(0xd9a441),sp=M(0x2b1d0e);
box(.5,.55,1.5,lm,0,.8,0,lp);box(.42,.4,.5,lm,0,1,.95,lp);box(.12,.12,1,lm,0,.95,-1.1,lp).rotation.x=-.5;
for(let i=0;i<10;i++)box(.08,.12,.12,sp,i%2?.26:-.26,rnd(.65,1),rnd(-.6,.6),lp);
const legs=[[-.18,.5],[.18,.5],[-.18,-.5],[.18,-.5]].map(([a,b])=>box(.14,.55,.14,lm,a,.28,b,lp));
lp.scale.setScalar(1.4);lp.position.set(5,0,-50);S.add(lp);
// stat bars + minimap
['Strength','Speed','Focus','Success'].forEach(n=>stats.insertAdjacentHTML('beforeend',`<div class=sr>${n}<i><b id=sb${n}></b></i></div>`));
const mg=mm.getContext('2d');
// menu
const A={col:c=>body.color.set(c),lp:()=>lp.visible=!lp.visible,snd:()=>{if(ac)ac.state=='running'?ac.suspend():ac.resume()},
 tp:(a,b)=>{x=a;z=b;h=0;v=0;mx.click()},tab:n=>{mc.innerHTML=TB[n]()}};
const TB={Character:()=>`<button onclick="up.click()">Fakkii kee olkaa'i</button>`,
 Vehicle:()=>[['Gurraacha',0x0b0b0d],['Adii',0xf1f1f1],['Diimaa',0xc92a2a],['Magariisa',0x2f9e44],['Cuquliisa',0x1971c2]].map(([n,c])=>`<button onclick="A.col(${c})">${n}</button>`).join(''),
 Leopard:()=>`<button onclick="A.lp()">Leopard ON / OFF</button>`,
 Map:()=>`<button onclick="A.tp(0,-40)">Finfinnee</button><button onclick="A.tp(0,420)">Baadiyyaa</button>`,
 Settings:()=>`<button onclick="A.snd()">Sagalee ON / OFF</button>`};
mt.innerHTML=Object.keys(TB).map(n=>`<button onclick="A.tab('${n}')">${n}</button>`).join('');
const mb=document.createElement('button');mb.textContent='☰ Menu';cams.append(mb);
mb.onclick=()=>{menu.style.display='flex';paused=true;A.tab('Character')};
mx.onclick=()=>{menu.style.display='none';paused=false};
function hit(p){if(cd>0){v*=.9;return}cd=.8;hp-=p;v*=-.3}
function game(dt){
 cd-=dt;ph+=dt;
 BL.forEach(([bx,bz,hw,hd])=>{const ox=hw+1.6-Math.abs(x-bx),oz=hd+1.6-Math.abs(z-bz);
  if(ox>0&&oz>0){if(ox<oz)x+=Math.sign(x-bx)*ox;else z+=Math.sign(z-bz)*oz;hit(Math.min(25,Math.abs(v)*.6))}});
 tr.forEach(o=>{o.s+=o.d*o.sp*dt;if(Math.abs(o.s)>360)o.s=-o.s;const l=(o.a?1:-1)*o.d*3+o.r*60;
  o.g.position.set(o.a?o.s:l,0,o.a?l:o.s);
  const dx=x-o.g.position.x,dz=z-o.g.position.z;if(dx*dx+dz*dz<7.5){hit(Math.min(25,Math.abs(v)*.8+3));x+=dx*.3;z+=dz*.3}});
 coins.forEach(c=>{c.rotation.y+=dt*3;if((c.position.x-x)**2+(c.position.z-z)**2<7){score+=10;got++;place(c)}});
 if(hp<=0){hp=100;x=0;z=-40;h=0;v=0;score=Math.max(0,score-20)}
 // leopard follows
 const tx=x-Math.sin(h)*7+Math.cos(h)*5,tz=z-Math.cos(h)*7-Math.sin(h)*5,dx=tx-lp.position.x,dz=tz-lp.position.z,d=Math.hypot(dx,dz),s=Math.min(d*2,32);
 if(d>.5){lp.position.x+=dx/d*s*dt;lp.position.z+=dz/d*s*dt;lp.rotation.y=Math.atan2(dx,dz)}
 legs.forEach((l,i)=>l.rotation.x=Math.sin(ph*s*.5+i*1.6)*Math.min(s/10,.8));
 // stats
 const kmh=Math.abs(v)*3.6,rx=((x%60)+60)%60,rz=((z%60)+60)%60;
 const on=(Math.min(rx,60-rx)<6&&Math.abs(z)<370)||(Math.min(rz,60-rz)<6&&Math.abs(x)<370)||(z>=370&&Math.abs(x)<6);
 foc=Math.max(0,Math.min(100,foc+(on?10:-15)*dt));
 const W=(n,p)=>document.getElementById('sb'+n).style.width=Math.max(0,Math.min(100,p))+'%';
 W('Strength',hp);W('Speed',kmh/2.3);W('Focus',foc);W('Success',got*4);
 sc.textContent='⭐ '+score;
 // minimap (north = +z up)
 mg.fillStyle='#1b2a1b';mg.fillRect(0,0,100,100);mg.strokeStyle='#666';mg.beginPath();
 for(let i=-5;i<=5;i++){const px=50-(i*60-x)/7,py=50-(i*60-z)/7;mg.moveTo(px,0);mg.lineTo(px,100);mg.moveTo(0,py);mg.lineTo(100,py)}mg.stroke();
 const dot=(wx,wz,c)=>{mg.fillStyle=c;mg.fillRect(48-(wx-x)/7,48-(wz-z)/7,4,4)};
 coins.forEach(c=>dot(c.position.x,c.position.z,'#ffd43b'));if(lp.visible)dot(lp.position.x,lp.position.z,'#ff922b');
 tr.forEach(o=>dot(o.g.position.x,o.g.position.z,'#fa5252'));dot(x,z,'#fff')}
/* ---------- physics + loop ---------- */
let x=0,z=-40,h=0,v=0,st=0,rpm=900,gear=1;
const lim=[40,75,110,145,230],clock=new THREE.Clock(),V=THREE.Vector3;
function loop(){
 requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.05)*(paused?0:1);
 const gas=k.KeyW||k.ArrowUp||T.g,brk=k.KeyS||k.ArrowDown||T.b,L=k.KeyA||k.ArrowLeft||T.l,Rt=k.KeyD||k.ArrowRight||T.r;
 let a=0;
 if(gas)a=15*(1-Math.max(v,0)/62);
 if(brk)a=v>.5?-30:-7;
 if(k.Space)a-=45*Math.sign(v);
 a-=v*.12+Math.sign(v)*1.2;
 const nv=v+a*dt;v=(!gas&&!brk&&Math.abs(nv)<.4)?0:Math.max(-10,Math.min(62,nv));
 st+=(Math.max(-1,Math.min(1,(L?1:0)-(Rt?1:0)-(T.s||0)))-st)*Math.min(1,dt*6);
 h+=(v/3)*Math.tan(st*.55/(1+Math.abs(v)/20))*dt;
 x+=Math.sin(h)*v*dt;z+=Math.cos(h)*v*dt;
 game(dt);car.position.set(x,0,z);car.rotation.y=h;car.rotation.z=-st*Math.min(Math.abs(v)/80,.12);
 wheels.forEach(w=>{w.spin.rotation.x+=v*dt/.48;if(w.front)w.piv.rotation.y=st*.5});
 const kmh=Math.abs(v)*3.6;let g=lim.findIndex(l=>kmh<l);if(g<0)g=4;
 const lo=g?lim[g-1]:0;rpm+=((v<-.5?1500+kmh*60:1000+(kmh-lo)/(lim[g]-lo)*5000+(gas?600:0))-rpm)*Math.min(1,dt*8);
 spd.textContent=Math.round(kmh);gr.textContent=v<-.5?'R':kmh<1?'N':g+1;rpmb.style.width=Math.min(100,rpm/70)+'%';
 if(ac){o1.frequency.value=rpm/30;o2.frequency.value=rpm/60;fl.frequency.value=400+rpm*.25;gn.gain.value=.05+(gas?.05:0)+rpm/200000}
 // cameras
 const f=new V(Math.sin(h),0,Math.cos(h));cam.up.set(0,1,0);car.updateMatrixWorld();drv.visible=cm!=2;
 let tp,lk;
 if(cm==0){tp=new V(x-f.x*10.5,4.4,z-f.z*10.5);lk=new V(x+f.x*6,1.6,z+f.z*6)}
 else if(cm==1){tp=car.localToWorld(new V(0,1.85,2.3));lk=car.localToWorld(new V(0,1.3,30))}
 else if(cm==2){tp=car.localToWorld(new V(.5,1.84,-.15));lk=car.localToWorld(new V(.5,1.7,30))}
 else if(cm==3){tp=new V(x,45,z);lk=new V(x,0,z);cam.up.set(f.x,0,f.z)}
 else{const ya=h+Math.PI+yaw;tp=new V(x+Math.sin(ya)*11*Math.cos(pit),1.5+11*Math.sin(pit),z+Math.cos(ya)*11*Math.cos(pit));lk=new V(x,1.2,z)}
 if(cm==0||cm==4)cam.position.lerp(tp,1-Math.exp(-dt*7));else cam.position.copy(tp);
 cam.lookAt(lk);R.render(S,cam)}
addEventListener('resize',()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
loop();

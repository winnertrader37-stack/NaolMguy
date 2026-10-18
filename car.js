/* ---------- Leopard 8 (Fangchengbao Bao 8) ---------- */
const car=new THREE.Group();S.add(car);
const body=new THREE.MeshPhongMaterial({color:0x0b0b0d,shininess:100}),
 silver=new THREE.MeshPhongMaterial({color:0xc4c8d0,shininess:90}),
 glass=M(0x1b2a36,{transparent:true,opacity:.35}),dark=M(0x111111),
 led=new THREE.MeshBasicMaterial({color:0xfff6c8}),red=new THREE.MeshBasicMaterial({color:0xff2a2a});
const C=(w,h,d,m,x,y,z)=>box(w,h,d,m,x,y,z,car);
C(2,.95,5.2,body,0,.92,0);                         // lower body
C(1.9,.14,1.7,body,0,1.46,1.75);                   // flat hood
C(1.95,.62,.1,body,0,1.1,2.64);                    // upright front face
C(1.5,.46,.05,dark,0,1.08,2.71);                   // big grille
[.92,1.04,1.16,1.28].forEach(y=>C(1.4,.025,.04,silver,0,y,2.74)); // grille slats
C(.16,.16,.03,silver,0,1.1,2.76).rotation.z=Math.PI/4; // diamond badge
[-1,1].forEach(s=>{
 C(.5,.1,.05,led,s*.82,1.32,2.7);C(.07,.42,.05,led,s*.98,1.12,2.7);   // LED headlights
 C(.14,.22,1.35,body,s*1.04,1.12,1.46);C(.14,.22,1.35,body,s*1.04,1.12,-1.46); // fender flares
 C(.04,.2,3.2,silver,s*1.01,.75,0);C(.1,.1,2.6,silver,s*1.04,.5,0);     // side trim + steps
 C(.1,.55,.05,red,s*.9,1.25,-2.64);                                      // tail lights
 C(.05,.9,.1,dark,s*.98,1.85,.98);C(.05,.9,.1,dark,s*.98,1.85,-.55);C(.05,.9,.1,dark,s*.98,1.85,-2.1); // pillars
 C(.14,.17,.28,dark,s*1.1,1.65,.9);C(.04,.06,.2,silver,s*1.02,1.5,-.2)  // mirrors + handles
});
C(2.04,.3,.4,dark,0,.55,2.55);C(1.4,.12,.34,silver,0,.42,2.6);C(.5,.14,.02,M(0xffffff),0,.58,2.76); // front bumper
C(2.04,.3,.4,dark,0,.55,-2.55);C(1.4,.12,.34,silver,0,.42,-2.6);   // rear bumper
C(1.9,.85,3.1,glass,0,1.85,-.55);                                    // glass cabin
C(1.82,.95,.05,glass,0,1.85,1.15).rotation.x=-.32;                   // windshield
C(2,.1,3.25,body,0,2.32,-.55);                                       // roof
C(1.7,.05,2.3,dark,0,2.4,-.5);[-.8,.8].forEach(x=>C(.05,.08,2.3,silver,x,2.4,-.5)); // roof rack
C(1.2,.1,.1,M(0x4dabf7,{emissive:0x1971c2}),0,2.5,.5);              // blue roof light bar
const sp0=new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,.34,22).rotateX(Math.PI/2),M(0x151515));sp0.position.set(0,1.45,-2.82);car.add(sp0);
const hub=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.36,16).rotateX(Math.PI/2),silver);hub.position.copy(sp0.position);car.add(hub);
const wheels=[],rimM=new THREE.MeshPhongMaterial({color:0x7d8087,shininess:70});
[[-1,1.46],[1,1.46],[-1,-1.46],[1,-1.46]].forEach(([sx,z])=>{
 const piv=new THREE.Group();piv.position.set(sx*1.02,.5,z);car.add(piv);
 const spin=new THREE.Group();piv.add(spin);
 spin.add(new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.38,24).rotateZ(Math.PI/2),M(0x151515)));
 spin.add(new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.4,20).rotateZ(Math.PI/2),rimM));
 for(let i=0;i<5;i++)box(.42,.06,.66,dark,0,0,0,spin).rotation.x=i*Math.PI/5;
 spin.add(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.44,10).rotateZ(Math.PI/2),silver));
 wheels.push({piv,spin,front:z>0})});
// driver (left-hand drive) with face texture
const drv=new THREE.Group();drv.position.set(.5,0,-.15);car.add(drv);
box(.55,.12,.55,M(0xc8a97e),0,.98,0,drv);box(.55,.75,.12,M(0xc8a97e),0,1.35,-.32,drv);
box(.5,.6,.3,M(0xf1f1f1),0,1.35,-.08,drv);
const skin=M(0x6b3f2a),faceMat=new THREE.MeshBasicMaterial({color:0x8a5a3c}),hairM=M(0x0c0c0c);
const hd=new THREE.Group();hd.position.set(0,1.8,-.08);hd.scale.set(1.1,1.3,1.1);drv.add(hd);
hd.add(new THREE.Mesh(new THREE.SphereGeometry(.177,28,22),skin));
const hg=new THREE.SphereGeometry(.18,32,24,Math.PI/2-.9,1.8,.3,2.4),P=hg.attributes.position,U=hg.attributes.uv;
for(let i=0;i<P.count;i++)U.setXY(i,.5+P.getX(i)/.34,.5+P.getY(i)/.4);
hd.add(new THREE.Mesh(hg,faceMat));
const hc=new THREE.Mesh(new THREE.SphereGeometry(.19,28,16,0,6.283,0,1.15),hairM);hc.position.y=.03;hd.add(hc);
const hb=new THREE.Mesh(new THREE.SphereGeometry(.19,28,16,Math.PI/2+.9,6.283-1.8,0,1.95),hairM);hb.position.y=.02;hd.add(hb);
const nk=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,.16,12),skin);nk.position.set(0,1.62,-.09);drv.add(nk);
function setFace(src){new THREE.TextureLoader().load(src,tx=>{faceMat.map=tx;faceMat.color.set(0xffffff);faceMat.needsUpdate=true})}
setFace('face.jpg');
const wheelSt=new THREE.Group();wheelSt.position.set(.5,1.55,.5);wheelSt.rotation.x=-1.05;car.add(wheelSt);
wheelSt.add(new THREE.Mesh(new THREE.TorusGeometry(.19,.03,8,24),dark));
box(.36,.03,.03,dark,0,0,0,wheelSt);box(.03,.17,.03,dark,0,-.09,0,wheelSt);box(.12,.07,.03,silver,0,0,0,wheelSt);
const tan=M(0xc8a97e);box(1.85,.28,.5,tan,0,1.4,.88,car);box(1.85,.06,.5,dark,0,1.56,.88,car);   // dashboard
box(.5,.2,.9,tan,0,1.0,-.1,car);box(.55,.12,.55,tan,-.5,.98,-.15,car);box(.55,.75,.12,tan,-.5,1.35,-.47,car);
file.onchange=e=>{const f=e.target.files[0];if(f)setFace(URL.createObjectURL(f))};
up.onclick=()=>file.click();


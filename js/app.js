/* Tablero PP Primera Infancia, Infancia y Adolescencia · Tenjo 2026 */
(function(){
'use strict';

/* ======================= DATOS ======================= */
const C={verde:'#055B2A',verde2:'#0B7A3B',amarillo:'#E8BE07',azul:'#1F6FB2',tinta:'#15201A',gris:'#5B6670',claro:'#D5E2D9'};
const EJES=[
  {id:1,nombre:'Primera infancia',edad:'0 a 5 años',icono:'fa-baby',c:C.verde,ct:'#055B2A',cbg:'#E3F0E7',lineas:7,acciones:24,peso:23.53},
  {id:2,nombre:'Infancia',edad:'6 a 11 años',icono:'fa-child-reaching',c:C.amarillo,ct:'#8F7200',cbg:'#FBF1C7',lineas:8,acciones:37,peso:36.27},
  {id:3,nombre:'Adolescencia',edad:'12 a 17 años',icono:'fa-user-group',c:C.azul,ct:'#17588F',cbg:'#E1EDF8',lineas:9,acciones:41,peso:40.20}
];
const TOTAL_ACC=102;
const LN={
 '1.1':['Pautas de crianza','Cuenta con padre, madre o cuidadores principales que lo acogen y ponen en práctica pautas de crianza que favorecen su desarrollo integral.'],
 '1.2':['Salud','Vive y disfruta del nivel más alto posible de salud.'],
 '1.3':['Nutrición','Goza y mantiene un estado nutricional adecuado.'],
 '1.4':['Entornos de desarrollo','Crece en entornos que favorecen su desarrollo.'],
 '1.5':['Identidad','Construye su identidad en un marco de diversidad.'],
 '1.6':['Participación y expresión','Cada niño y niña expresa sentimientos, ideas y opiniones en sus entornos cotidianos y estos son tenidos en cuenta.'],
 '1.7':['Protección de derechos','Cada niño y niña crece en entornos que promocionan sus derechos y actúan ante la exposición a situaciones de riesgo o vulneración.'],
 '2.1':['Familia y cuidadores','Cuenta con una familia y/o cuidadores principales que le acogen, favorecen su desarrollo integral y le reconocen como agente activo del mismo.'],
 '2.2':['Salud','Cuenta con las condiciones necesarias para gozar de buena salud.'],
 '2.3':['Nutrición','Goza de un buen estado nutricional.'],
 '2.4':['Educación','Desarrolla y potencia sus capacidades, habilidades y destrezas con procesos educativos formales e informales que favorecen su desarrollo integral.'],
 '2.5':['Identidad y diversidad','Construye su identidad en un marco de diversidad.'],
 '2.6':['Cultura, deporte y recreación','Disfruta de oportunidades de desarrollo cultural, deportivo y recreativo para la construcción de sentido y la consolidación de sus proyectos de vida.'],
 '2.7':['Participación','Expresa libremente sentimientos, ideas y opiniones e incide en todos los asuntos que son de su interés en ámbitos privados y públicos.'],
 '2.8':['Autoprotección','Realiza prácticas de autoprotección y autocuidado, y disfruta de entornos protectores y protegidos.'],
 '3.1':['Familia y cuidadores','Cuenta con una familia y/o cuidadores principales que le acogen, favorecen su desarrollo integral y le reconocen como agente activo del mismo.'],
 '3.2':['Salud y vida saludable','Cada adolescente cuenta con las condiciones necesarias para gozar de buena salud y adopta estilos de vida saludables.'],
 '3.3':['Nutrición','Cada adolescente goza de un buen estado nutricional y adopta hábitos alimenticios saludables.'],
 '3.4':['Sexualidad responsable','Cada adolescente vive y expresa responsablemente su sexualidad.'],
 '3.5':['Educación','Cada adolescente desarrolla y potencia sus capacidades, habilidades y destrezas con procesos educativos formales e informales.'],
 '3.6':['Identidad','Cada adolescente continúa construyendo su identidad en un marco de diversidad.'],
 '3.7':['Cultura, deporte y recreación','Cada adolescente disfruta de oportunidades de desarrollo cultural, deportivo y recreativo.'],
 '3.8':['Participación','Expresa libremente sus sentimientos, ideas y opiniones e incide en los asuntos de su interés.'],
 '3.9':['Autoprotección','Realiza prácticas de autoprotección y autocuidado y disfruta de entornos protectores y protegidos frente a situaciones de riesgo o vulneración.']
};
const VIS=a=>a.c>0;
const ACT=(window.ACTIVIDADES||[]).map((a,i)=>Object.assign({id:i,cod:a.a+'.'+a.n},a));

/* Agregados */
const ACC={};ACT.forEach(a=>{(ACC[a.a]=ACC[a.a]||{a:a.a,e:a.e,l:a.l,an:a.an,acts:[]}).acts.push(a)});
Object.values(ACC).forEach(x=>x.c=x.acts.reduce((s,a)=>s+a.c,0)/x.acts.length);
const LIN={};Object.values(ACC).forEach(x=>{(LIN[x.l]=LIN[x.l]||{l:x.l,e:x.e,acc:[]}).acc.push(x)});
Object.values(LIN).forEach(x=>{x.c=x.acc.reduce((s,a)=>s+a.c,0)/x.acc.length;x.nAct=x.acc.reduce((s,a)=>s+a.acts.filter(VIS).length,0);x.nom=LN[x.l][0];x.desc=LN[x.l][1]});
EJES.forEach(e=>{const ac=Object.values(ACC).filter(x=>x.e===e.id);e.gest=ac.length;e.cumpl=ac.reduce((s,x)=>s+x.c,0)/ac.length;e.aporte=ac.reduce((s,x)=>s+x.c,0)/TOTAL_ACC;e.nAct=ACT.filter(a=>a.e===e.id).length});
const ALL_ACC=Object.values(ACC);
const G_CUMPL=ALL_ACC.reduce((s,x)=>s+x.c,0)/ALL_ACC.length;
const G_APORTE=ALL_ACC.reduce((s,x)=>s+x.c,0)/TOTAL_ACC;
const estado=c=>c>=100?'Cumplida':'En avance';
const ESTADOS=[['Cumplida',C.verde,'fa-circle-check'],['En avance',C.amarillo,'fa-circle-half-stroke']];

const POB={hab:28000,share:25,grupos:[{eje:1,g:'Primera infancia',e:'0 a 5 años',w:2200/7000,b:1500,c:C.verde},{eje:2,g:'Infancia',e:'6 a 11 años',w:2400/7000,b:1900,c:C.amarillo},{eje:3,g:'Adolescencia',e:'12 a 17 años',w:2400/7000,b:1300,c:C.azul}],cuid:1600};
const AT={nna:[['Día de la Niñez',4000,1],['Escuelas artísticas (IMCTT)',3600,2],['Escuelas deportivas (Inderten)',2000,2],['Ludoteca municipal',1286,1],['Festivales deportivos',1251,2],['Prevención del abuso sexual',1101,1],['Matrogimnasia',410,1],['CDI Tenjanito',79,1],['Bilingüismo',66,2],['Hogares comunitarios',52,1]],
 fam:[['Cuidadores en la Ludoteca',1309,1],['Madres gestantes y lactantes',416,1],['Semana de la Lactancia',124,1],['Grupo de orientación en lactancia',120,1],['Padres en encuentros de crianza',100,1],['Familias víctimas con apoyo nutricional',32,1],['Familias con kit para el bebé',28,1]]};
const CATS=[['Atención integral','fa-house-chimney-user'],['Salud y nutrición','fa-heart-pulse'],['Formación y talleres','fa-chalkboard-user'],['Protección de derechos','fa-shield-heart'],['Cultura y deporte','fa-futbol'],['Infraestructura','fa-building']];
const LOGROS=[
 [1,'1.4','Atención integral','1.286','niños','Ludoteca Luis Carlos Galán','Atención a 1.286 niños y 1.309 padres de familia, con obras de adecuación de los espacios en febrero y marzo.'],
 [1,'1.4','Infraestructura','80 %','de obra','CDI La Punta','La construcción del nuevo Centro de Desarrollo Infantil avanza y ampliará la atención en cerca de 100 cupos para el sector.'],
 [1,'1.4','Atención integral','131','niños','CDI Tenjanito y hogares comunitarios','79 niños en el CDI Tenjanito y 52 en los hogares Mis Primeros Amiguitos, Ositos del Ocal y Esperanza.'],
 [1,'1.3','Salud y nutrición','416','madres','Talleres para gestantes y lactantes','27 talleres sobre signos de alarma, lactancia, primeros auxilios, estimulación temprana y hábitos saludables.'],
 [1,'1.3','Salud y nutrición','124','personas','Semana de la Lactancia Materna','Celebración del 3 al 6 de agosto, sala de lactancia en funcionamiento y articulación con el Banco de Leche de Zipaquirá.'],
 [1,'1.2','Salud y nutrición','2','jornadas','Vacunación nacional (PAI)','Jornadas del Programa Ampliado de Inmunizaciones y seguimiento de casos en SIVIGILA y MANGO.'],
 [1,'1.7','Protección de derechos','1.101','NNA','Prevención del abuso sexual infantil','33 espacios lúdico-pedagógicos y talleres con padres de los jardines sociales sobre rutas de atención.'],
 [1,'1.1','Formación y talleres','100','padres e hijos','Encuentros de crianza','Encuentros en los jardines Pan de Azúcar y Chitasuga y campaña digital de crianza respetuosa.'],
 [1,'1.1','Protección de derechos','86','medidas','Red de atención y protección','La Comisaría de Familia mantiene la Ruta Integral de Atención aprobada y 86 medidas de protección familiar.'],
 [1,'1.6','Cultura y deporte','4.000','niñas y niños','Día de la Niñez','Celebración municipal en la Ludoteca y programa de matrogimnasia con 410 niños.'],
 [1,'1.5','Protección de derechos','32','familias','Atención a familias víctimas','Talleres de reparación integral, conmemoración, feria de servicios y apoyos nutricionales.'],
 [2,'2.1','Formación y talleres','50','talleres','Convivencia y prevención del bullying','Talleres con estudiantes de las IED, 6 talleres para padres y un taller de primeros auxilios psicológicos para docentes.'],
 [2,'1.6','Cultura y deporte','3.600','NNA','Escuelas de formación artística','76 escuelas del IMCTT, más escuelas deportivas del Inderten con 2.000 niños.'],
 [2,'2.4','Formación y talleres','66','niños','Programa de bilingüismo','Niveles Kids 1 y 2 para niñas y niños de 6 a 11 años del municipio.'],
 [2,'2.5','Protección de derechos','2','eventos','Manos Rojas y erradicación del trabajo infantil','Conmemoraciones con enfoque de derechos humanos y funcionamiento de la mesa JUME.'],
 [2,'1.6','Cultura y deporte','1.251','participantes','Festivales deportivos','Festivales de rondas, escolares y baby en BMX, fútbol y patinaje.'],
 [3,'3.1','Formación y talleres','13','escuelas','Escuelas de padres','Pautas de crianza, comunicación asertiva, límites y vínculos familiares en las instituciones educativas.'],
 [3,'3.2','Salud y nutrición','5','talleres','Manejo emocional y unión familiar','Herramientas para que las familias reconozcan y gestionen sus emociones y fortalezcan la comunicación.'],
 [3,'3.9','Protección de derechos','21','talleres','Prevención del consumo de SPA','15 talleres con estudiantes y 6 con padres: toma de decisiones, presión de pares y autocuidado.']
];
const METAS=[['161','Alimentación escolar (PAE)','100 % de los estudiantes de las IED · 2.800 beneficiarios'],['250','Ludoteca Municipal','Funcionamiento al 100 % · 3.302 beneficiarios'],['252','Centros de Atención a la Primera Infancia','Funcionamiento y dotación · 235 beneficiarios'],['253','Prevención del embarazo adolescente','Campañas de proyecto de vida · 2.686 beneficiarios'],['268','Salud mental','Estrategia municipal · 6.230 beneficiarios'],['85','Comisaría de Familia','Atención integral en funcionamiento'],['258','Deporte escolar','4 eventos · 1.970 beneficiarios']];

/* ======================= UTILIDADES ======================= */
const $=s=>document.querySelector(s);
const fmt=(n,d=0)=>Number(n).toLocaleString('es-CO',{minimumFractionDigits:d,maximumFractionDigits:d});
const pct=(n,d=1)=>fmt(n,d)+' %';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ejeDe=id=>EJES[id-1];
const S={eje:0,linea:null,dep:null,at:'nna',ejeModo:'cumpl',logCat:'',logQ:'',actQ:'',actDep:'',actEst:'',sort:['cod',1],page:0};
let charts=[];
const chart=(el,opt)=>{const c=echarts.init(el,null,{renderer:'canvas'});c.setOption(Object.assign({textStyle:{fontFamily:"'Source Sans 3', system-ui, sans-serif"},animationDuration:900,animationEasing:'cubicOut'},opt));charts.push(c);return c};
const TT={backgroundColor:'#022E15',borderWidth:0,padding:[10,14],textStyle:{color:'#fff',fontSize:13},extraCssText:'border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.25)'};
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove('on'),1800)}
function contar(root){root.querySelectorAll('[data-n]').forEach(el=>{const fin=+el.dataset.n,dec=+(el.dataset.d||0),pre=el.dataset.pre||'',suf=el.dataset.suf||'';const t0=performance.now();
  (function p(t){const k=Math.min(1,(t-t0)/1000),e=1-Math.pow(1-k,3);el.textContent=pre+fmt(fin*e,dec)+suf;if(k<1)requestAnimationFrame(p)})(t0)});
  requestAnimationFrame(()=>root.querySelectorAll('[data-w]').forEach(s=>s.style.width=s.dataset.w+'%'))}
const filtAct=()=>ACT.filter(a=>VIS(a)&&(!S.eje||a.e===S.eje));
const filtLin=()=>Object.values(LIN).filter(l=>(!S.eje||l.e===S.eje)&&l.c>0).sort((a,b)=>a.l.localeCompare(b.l,undefined,{numeric:true}));
function estPill(c){const e=estado(c);return `<span class="pill ${e==='Cumplida'?'':'y'}">${e}</span>`}
function progHTML(c,col){return `<div class="prog"><span data-w="${Math.min(c,100)}" style="width:0;background:${col}"></span></div>`}

/* ======================= MARCO ======================= */
const RUTAS={inicio:['Resumen ejecutivo',vInicio],avance:['Avance por eje y línea estratégica',vAvance],logros:['Logros obtenidos',vLogros],poblacion:['Población beneficiada',vPoblacion],actividades:['Explorador de actividades',vActividades],dependencias:['Dependencias y Plan de Desarrollo',vDependencias]};
function ruta(){return (location.hash.replace('#/','').split('?')[0])||'inicio'}
function render(){
  const r=RUTAS[ruta()]?ruta():'inicio';
  charts.forEach(c=>c.dispose());charts=[];
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===r));
  $('#pageTitle').textContent=RUTAS[r][0];
  $('#crumb').textContent='Tablero de seguimiento · Vigencia 2026'+(S.eje?' · '+ejeDe(S.eje).nombre:'');
  const v=$('#view');v.style.animation='none';v.offsetHeight;v.style.animation='';
  v.innerHTML='';RUTAS[r][1](v);contar(v);
  $('#sb').classList.remove('open');$('#sbBack').classList.remove('open');
}
function filtroUI(){
  const f=$('#filtro');f.innerHTML='';
  [{id:0,nombre:'Todos',c:'#9AA5AE'},...EJES].forEach(e=>{const b=document.createElement('button');b.className=S.eje===e.id?'on':'';
    b.innerHTML=`<span class="pt" style="background:${e.c}"></span>${e.nombre}`;b.onclick=()=>setEje(e.id);f.appendChild(b)});
}
function setEje(id){S.eje=id;S.linea=null;S.page=0;filtroUI();render();if(id)toast('Filtro aplicado: '+ejeDe(id).nombre)}
function ir(r){location.hash='#/'+r}

/* ======================= MODALES ======================= */
function abrir(html){$('#modalBody').innerHTML=html;$('#modal').classList.add('on');$('#modal').setAttribute('aria-hidden','false');contar($('#modalBody'))}
function cerrar(){$('#modal').classList.remove('on');$('#modal').setAttribute('aria-hidden','true')}
function modalAct(a){const e=ejeDe(a.e);
  abrir(`<span class="pill" style="background:${e.cbg};color:${e.ct}">${e.nombre} · Línea ${a.l} ${esc(LN[a.l][0])}</span>
  <h2>${esc(a.d)}</h2>
  <div class="grid-kv"><div><b>${a.p==null?'—':fmt(a.p)}</b><small>Programado</small></div><div><b>${fmt(a.s1)}</b><small>Ejecución semestre 1</small></div><div><b>${fmt(a.s2)}</b><small>Ejecución semestre 2</small></div><div><b>${pct(a.c,0)}</b><small>Cumplimiento</small></div></div>
  ${progHTML(a.c,e.c)}
  <div class="blk"><h5>Estado</h5><p>${estPill(a.c)}</p></div>
  <div class="blk"><h5>Responsable</h5><p>${esc(a.r)}</p></div>
  <div class="blk"><h5>Acción ${a.a}</h5><p>${esc(a.an)}</p></div>
  ${a.ev?`<div class="blk"><h5>Evidencia</h5><p>${esc(a.ev)}</p></div>`:''}`)}
function modalLinea(l){const e=ejeDe(l.e);
  abrir(`<span class="pill" style="background:${e.cbg};color:${e.ct}">${e.nombre}</span><h2>Línea ${l.l} · ${esc(l.nom)}</h2><p style="color:var(--gris);margin:0">${esc(l.desc)}</p>
  <div class="grid-kv"><div><b>${pct(l.c)}</b><small>Cumplimiento</small></div><div><b>${l.acc.length}</b><small>Acciones gestionadas</small></div><div><b>${l.nAct}</b><small>Actividades con avance</small></div><div><b>${[...new Set(l.acc.flatMap(a=>a.acts.map(x=>x.r)))].length}</b><small>Dependencias</small></div></div>
  ${detalleLinea(l,false)}`)}
function modalLogro(L){const e=ejeDe(L[0]);const l=LIN[L[1]];
  abrir(`<span class="pill" style="background:${e.cbg};color:${e.ct}">${e.nombre} · ${esc(L[2])}</span><h2>${esc(L[5])}</h2>
  <div style="font:800 40px Montserrat;color:${e.ct}">${esc(L[3])} <small style="font:600 16px 'Source Sans 3';color:var(--gris)">${esc(L[4])}</small></div>
  <p style="font-size:16px">${esc(L[6])}</p>
  ${l?`<div class="blk"><h5>Línea ${l.l} · ${esc(l.nom)} · cumplimiento ${pct(l.c)}</h5></div>${detalleLinea(l,false)}`:''}`)}
function detalleLinea(l,click=true){const e=ejeDe(l.e);
  return l.acc.filter(a=>a.acts.some(VIS)).map(a=>`<div class="acc"><div class="ah"><b>Acción ${a.a}</b><span style="display:flex;gap:8px;align-items:center"><span class="mini-prog">${progHTML(a.c,e.c)}</span><b style="color:${e.ct}">${pct(a.c,0)}</b></span></div>
   ${a.acts.filter(VIS).map(x=>`<div class="act" ${click?`data-act="${x.id}" style="cursor:pointer"`:''}><span class="t">${esc(x.d)}<br><small style="color:var(--gris)">${esc(x.r)}</small></span>${estPill(x.c)}</div>`).join('')}</div>`).join('')}

/* ======================= VISTA: INICIO ======================= */
function vInicio(v){
  const e=S.eje?ejeDe(S.eje):null;
  const cum=e?e.cumpl:G_CUMPL,apo=e?e.aporte:G_APORTE,gest=e?e.gest:ALL_ACC.length,nl=filtLin().length;
  const ben=e?POB.grupos[e.id-1].b:POB.grupos.reduce((s,g)=>s+g.b,0);
  const nAct=filtAct().length;
  v.innerHTML=`
  <div class="row c5">
    ${kpi('hero','fa-chart-line',cum,1,' %','Cumplimiento del plan de acción 2026',cum)}
    ${kpi('y','fa-layer-group',apo,1,' %',e?'Aporte del eje a la implementación total':'Aporte de 2026 a la implementación total',apo/(e?e.peso:100)*100)}
    ${kpi('','fa-list-check',gest,0,'',`Acciones gestionadas en ${nl} líneas estratégicas`,gest/(e?e.acciones:TOTAL_ACC)*100,'')}
    ${kpi('r','fa-children',ben,0,'',e?`Beneficiarios de ${e.edad}`:'Niñas, niños y adolescentes beneficiados',ben/(e?POB.hab*.25*POB.grupos[e.id-1].w:7000)*100,'≈ ')}
    ${kpi('','fa-clipboard-check',nAct,0,'','Actividades con avance reportado',100)}
  </div>
  <div class="row c111">
    <div class="card"><div class="ch"><div><h3>Cumplimiento del plan de acción</h3><p>${e?e.nombre:'Promedio de las 49 acciones gestionadas'}</p></div></div><div class="chart sm" id="gauge"></div>
      <div class="hint"><i class="fa-solid fa-circle-info"></i>Aporte a la implementación total: <b style="color:var(--verde)">${pct(apo)}</b></div></div>
    <div class="card"><div class="ch"><div><h3>Mapa de la política</h3><p>Ejes y líneas con gestión en 2026 · tamaño según actividades</p></div><span class="hint"><i class="fa-solid fa-hand-pointer"></i>Clic para ver detalle</span></div><div class="chart sm" id="sun"></div></div>
    <div class="card"><div class="ch"><div><h3>Estado de las actividades</h3><p>${nAct} actividades con avance</p></div><span class="hint"><i class="fa-solid fa-hand-pointer"></i>Clic para explorar</span></div><div class="chart sm" id="dona"></div></div>
  </div>
  <div class="row c21">
    <div class="card"><div class="ch"><div><h3>Ejecución por semestre</h3><p>Actividades con ejecución reportada en cada semestre, por eje</p></div></div><div class="chart" id="sem"></div></div>
    <div class="card"><div class="ch"><div><h3>Líneas con mejor desempeño</h3><p>Cumplimiento del plan de acción 2026</p></div></div><div class="rank" id="rank"></div></div>
  </div>
  <div class="row c4" id="logrosTop"></div>`;

  chart($('#gauge'),{series:[{type:'gauge',startAngle:205,endAngle:-25,min:0,max:100,radius:'100%',center:['50%','60%'],progress:{show:true,width:20,roundCap:true,itemStyle:{color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:C.amarillo},{offset:1,color:e?e.c:C.verde}])}},
    axisLine:{roundCap:true,lineStyle:{width:20,color:[[1,'#EAF0EC']]}},axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},pointer:{show:false},anchor:{show:false},title:{show:false},
    detail:{valueAnimation:true,offsetCenter:[0,'5%'],fontSize:38,fontWeight:800,fontFamily:'Montserrat',color:C.verde,formatter:v=>fmt(v,1)+' %'},data:[{value:+cum.toFixed(1)}]}]});

  const sunData=EJES.filter(x=>!S.eje||x.id===S.eje).map(x=>({name:x.nombre,itemStyle:{color:x.c},ejeId:x.id,
    children:Object.values(LIN).filter(l=>l.e===x.id&&l.c>0).map(l=>({name:l.l+' '+l.nom,value:l.nAct,lin:l.l,cum:l.c,itemStyle:{color:x.c,opacity:.55+.45*l.c/100}}))}));
  const sun=chart($('#sun'),{tooltip:Object.assign({formatter:p=>p.data.lin?`<b>Línea ${p.data.name}</b><br>Cumplimiento: ${pct(p.data.cum)}<br>${p.value} actividades`:`<b>${p.name}</b>`},TT),
    series:[{type:'sunburst',data:sunData,radius:['18%','96%'],sort:null,itemStyle:{borderColor:'#fff',borderWidth:2,borderRadius:4},
      label:{rotate:'radial',fontSize:10.5,color:'#fff',fontWeight:600,minAngle:14,formatter:p=>p.data.lin?p.data.lin:''},
      levels:[{},{r0:'18%',r:'40%',label:{rotate:'tangential',fontSize:10,fontWeight:800,minAngle:30,formatter:p=>'Eje '+p.data.ejeId}},{r0:'40%',r:'96%'}],emphasis:{focus:'ancestor'}}]});
  sun.on('click',p=>{if(p.data&&p.data.lin){modalLinea(LIN[p.data.lin])}else if(p.data&&p.data.ejeId){setEje(p.data.ejeId)}});

  const fa=filtAct();const cnt=ESTADOS.map(([n])=>fa.filter(a=>estado(a.c)===n).length);
  const dona=chart($('#dona'),{tooltip:Object.assign({formatter:p=>`<b>${p.name}</b><br>${p.value} actividades (${fmt(p.percent,0)} %)`},TT),
    legend:{bottom:0,icon:'circle',itemWidth:9,textStyle:{color:C.gris}},
    series:[{type:'pie',radius:['52%','80%'],center:['50%','44%'],avoidLabelOverlap:true,itemStyle:{borderColor:'#fff',borderWidth:3,borderRadius:8},
      label:{show:true,position:'inside',formatter:'{c}',color:'#fff',fontWeight:800,fontFamily:'Montserrat',fontSize:14},
      data:ESTADOS.map(([n,c],i)=>({name:n,value:cnt[i],itemStyle:{color:c}}))}],
    graphic:[{type:'text',left:'center',top:'36%',style:{text:fmt(fa.length),fontSize:26,fontWeight:800,fontFamily:'Montserrat',fill:C.verde}},{type:'text',left:'center',top:'50%',style:{text:'actividades',fontSize:12,fill:C.gris}}]});
  dona.on('click',p=>{S.actEst=p.name;S.page=0;ir('actividades')});

  const ejesV=EJES.filter(x=>!S.eje||x.id===S.eje);
  chart($('#sem'),{tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'}},TT),legend:{top:0,right:0,icon:'roundRect',itemWidth:12,textStyle:{color:C.gris}},
    grid:{left:10,right:10,top:40,bottom:10,containLabel:true},
    xAxis:{type:'category',data:ejesV.map(x=>x.nombre),axisTick:{show:false},axisLine:{lineStyle:{color:'#DDE5DF'}},axisLabel:{color:C.tinta,fontWeight:600,fontSize:13}},
    yAxis:{type:'value',splitLine:{lineStyle:{color:'#EEF2EF'}},axisLabel:{color:C.gris}},
    series:[{name:'Semestre 1',type:'bar',barMaxWidth:46,itemStyle:{borderRadius:[8,8,0,0],color:C.verde},label:{show:true,position:'top',fontWeight:800,color:C.tinta},data:ejesV.map(x=>ACT.filter(a=>a.e===x.id&&a.s1>0).length)},
            {name:'Semestre 2',type:'bar',barMaxWidth:46,itemStyle:{borderRadius:[8,8,0,0],color:C.amarillo},label:{show:true,position:'top',fontWeight:800,color:C.tinta},data:ejesV.map(x=>ACT.filter(a=>a.e===x.id&&a.s2>0).length)}]});

  const top=filtLin().sort((a,b)=>b.c-a.c||b.nAct-a.nAct).slice(0,6);
  $('#rank').innerHTML=top.map((l,i)=>{const x=ejeDe(l.e);return `<div class="it" data-lin="${l.l}"><span class="pos" style="background:${x.c}">${i+1}</span><span class="nm">${l.l} ${esc(l.nom)}<small>${x.nombre} · ${l.nAct} actividades</small></span><span class="v" style="color:${x.ct}">${pct(l.c,0)}</span></div>`}).join('');
  $('#rank').onclick=ev=>{const it=ev.target.closest('[data-lin]');if(it)modalLinea(LIN[it.dataset.lin])};

  const lt=LOGROS.filter(L=>!S.eje||L[0]===S.eje).slice(0,4);
  $('#logrosTop').innerHTML=lt.map((L,i)=>logroCard(L,LOGROS.indexOf(L))).join('');
  $('#logrosTop').onclick=ev=>{const c=ev.target.closest('[data-lg]');if(c)modalLogro(LOGROS[+c.dataset.lg])};
}
function kpi(cls,ic,n,d,suf,l,w,pre=''){return `<div class="card kpi ${cls}"><i class="fa-solid ${ic} deco"></i><div class="ki"><i class="fa-solid ${ic}"></i></div><div class="n" data-n="${n}" data-d="${d}" data-suf="${suf}" data-pre="${pre}">0</div><div class="l">${l}</div><div class="bar"><span data-w="${Math.min(100,w)}" style="width:0"></span></div></div>`}
function logroCard(L,i){const e=ejeDe(L[0]);const cat=CATS.find(c=>c[0]===L[2]);
  return `<article class="card hov lg" data-lg="${i}" style="--c:${e.c};--ct:${e.ct};--cbg:${e.cbg}"><div class="top2"><span class="ico"><i class="fa-solid ${cat?cat[1]:'fa-star'}"></i></span><span class="pill" style="background:${e.cbg};color:${e.ct}">${e.nombre}</span></div>
  <div class="n">${esc(L[3])}<small>${esc(L[4])}</small></div><h4>${esc(L[5])}</h4><p>${esc(L[6])}</p><span class="more">Ver detalle <i class="fa-solid fa-arrow-right"></i></span></article>`}

/* ======================= VISTA: AVANCE ======================= */
function vAvance(v){
  const lins=filtLin();
  if(!S.linea||!lins.find(l=>l.l===S.linea))S.linea=lins.length?lins[0].l:null;
  v.innerHTML=`
  <div class="row c3" id="ejesBox"></div>
  <div class="row c32">
    <div class="card"><div class="ch"><div><h3>Cumplimiento por línea estratégica</h3><p>Selecciona una barra para ver sus acciones y actividades</p></div><span class="hint"><i class="fa-solid fa-hand-pointer"></i>Interactivo</span></div><div class="chart" id="lin" style="height:${Math.max(260,lins.length*34+20)}px"></div></div>
    <div class="card det"><div id="detL"></div></div>
  </div>
  <div class="row c2">
    <div class="card"><div class="ch"><div><h3>Resultado por eje</h3><p id="subE"></p></div><div class="seg" id="segE"><button data-v="cumpl">Cumplimiento</button><button data-v="aporte">Aporte</button><button data-v="peso">Peso</button></div></div><div class="chart" id="ejeBar"></div></div>
    <div class="card"><div class="ch"><div><h3>Perfil de las líneas</h3><p>Cumplimiento por línea ${S.eje?'del eje '+ejeDe(S.eje).nombre:'de los tres ejes'}</p></div></div><div class="chart" id="radar"></div></div>
  </div>`;
  $('#ejesBox').innerHTML=EJES.map(e=>`<div class="card hov eje ${S.eje===e.id?'sel':''}" data-e="${e.id}" style="--c:${e.c};--ct:${e.ct};--cbg:${e.cbg}">
    <div class="eh"><i class="fa-solid ${e.icono}"></i><div><b>${e.nombre}</b><small>${e.edad} · ${e.lineas} líneas · ${e.acciones} acciones</small></div></div>
    <div class="big"><span style="color:var(--gris);font-size:13.5px">Cumplimiento plan 2026</span><span class="n" data-n="${e.cumpl}" data-d="1" data-suf=" %">0</span></div>
    <div class="prog"><span data-w="${e.cumpl}" style="width:0"></span></div>
    <div class="kv"><div><b>${e.gest}</b><small>acciones gestionadas</small></div><div><b>${pct(e.aporte)}</b><small>aporte a la política</small></div><div><b>${pct(e.peso,2)}</b><small>peso del eje</small></div></div></div>`).join('');
  $('#ejesBox').onclick=ev=>{const c=ev.target.closest('[data-e]');if(c)setEje(S.eje===+c.dataset.e?0:+c.dataset.e)};

  const linC=chart($('#lin'),{tooltip:Object.assign({formatter:p=>{const l=LIN[p.data.lin];return `<b>Línea ${l.l} · ${esc(l.nom)}</b><br>Cumplimiento: ${pct(l.c)}<br>${l.acc.length} acciones · ${l.nAct} actividades`}},TT),
    grid:{left:6,right:56,top:6,bottom:6,containLabel:true},xAxis:{type:'value',max:100,show:false},
    yAxis:{type:'category',inverse:true,data:lins.map(l=>l.l+'  '+l.nom),axisTick:{show:false},axisLine:{show:false},axisLabel:{color:C.tinta,fontWeight:600,fontSize:12.5}},
    series:[{type:'bar',barMaxWidth:24,showBackground:true,backgroundStyle:{color:'#F1F5F2',borderRadius:8},
      label:{show:true,position:'right',fontWeight:800,color:C.tinta,formatter:p=>fmt(p.value,p.value%1?1:0)+' %'},
      data:lins.map(l=>({value:+l.c.toFixed(1),lin:l.l,itemStyle:{borderRadius:8,color:ejeDe(l.e).c,opacity:l.l===S.linea?1:.55,borderColor:l.l===S.linea?C.tinta:'transparent',borderWidth:l.l===S.linea?2:0}}))}]});
  linC.on('click',p=>{S.linea=p.data.lin;pintarDet();linC.setOption({series:[{data:lins.map(l=>({value:+l.c.toFixed(1),lin:l.l,itemStyle:{borderRadius:8,color:ejeDe(l.e).c,opacity:l.l===S.linea?1:.55,borderColor:l.l===S.linea?C.tinta:'transparent',borderWidth:l.l===S.linea?2:0}}))}]})});
  function pintarDet(){const l=LIN[S.linea];if(!l){$('#detL').innerHTML='';return}const e=ejeDe(l.e);
    $('#detL').innerHTML=`<span class="pill" style="background:${e.cbg};color:${e.ct}">${e.nombre} · Línea ${l.l}</span><h4 style="margin-top:8px">${esc(l.nom)}</h4><p class="desc">${esc(l.desc)}</p>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><div style="font:800 34px Montserrat;color:${e.ct}">${pct(l.c)}</div><div style="flex:1">${progHTML(l.c,e.c)}<small style="color:var(--gris)">${l.acc.length} acciones · ${l.nAct} actividades</small></div></div>
      <div class="scroll">${detalleLinea(l)}</div>`;contar($('#detL'))}
  pintarDet();
  $('#detL').onclick=ev=>{const a=ev.target.closest('[data-act]');if(a)modalAct(ACT[+a.dataset.act])};

  const ejeBar=chart($('#ejeBar'),{});
  function pintarEje(){const m=S.ejeModo;document.querySelectorAll('#segE button').forEach(b=>b.classList.toggle('on',b.dataset.v===m));
    const val=e=>m==='cumpl'?e.cumpl:m==='aporte'?e.aporte:e.peso;const tot=m==='cumpl'?G_CUMPL:m==='aporte'?G_APORTE:100;
    $('#subE').textContent={cumpl:'Cumplimiento del plan de acción 2026 (%)',aporte:'Aporte a la implementación total de la política (%)',peso:'Peso de cada eje en la política (%)'}[m];
    ejeBar.setOption({tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},valueFormatter:v=>pct(v)},TT),grid:{left:10,right:10,top:30,bottom:10,containLabel:true},
      xAxis:{type:'category',data:EJES.map(e=>e.nombre).concat('Total'),axisTick:{show:false},axisLine:{lineStyle:{color:'#DDE5DF'}},axisLabel:{color:C.tinta,fontWeight:600,interval:0}},
      yAxis:{type:'value',show:false,max:m==='cumpl'?115:m==='aporte'?42:110},
      series:[{type:'bar',barMaxWidth:70,label:{show:true,position:'top',fontWeight:800,fontFamily:'Montserrat',fontSize:14,color:C.tinta,formatter:p=>pct(p.value)},
        data:EJES.map(e=>({value:+val(e).toFixed(2),itemStyle:{color:e.c,borderRadius:[10,10,0,0],opacity:!S.eje||S.eje===e.id?1:.3}})).concat({value:+tot.toFixed(2),itemStyle:{color:C.tinta,borderRadius:[10,10,0,0]}})}]},true)}
  document.querySelectorAll('#segE button').forEach(b=>b.onclick=()=>{S.ejeModo=b.dataset.v;pintarEje()});pintarEje();

  const rl=lins.length>=3?lins:Object.values(LIN).filter(l=>l.c>0);
  chart($('#radar'),{tooltip:Object.assign({},TT),radar:{indicator:rl.map(l=>({name:l.l,max:100})),radius:'70%',splitNumber:4,axisName:{color:C.gris,fontWeight:700},
    splitArea:{areaStyle:{color:['#FAFCFB','#F2F7F4']}},splitLine:{lineStyle:{color:'#E1E8E3'}},axisLine:{lineStyle:{color:'#E1E8E3'}}},
    series:[{type:'radar',symbolSize:7,data:[{value:rl.map(l=>+l.c.toFixed(1)),name:'Cumplimiento (%)',areaStyle:{color:'rgba(5,91,42,.22)'},lineStyle:{color:S.eje?ejeDe(S.eje).c:C.verde,width:2.5},itemStyle:{color:S.eje?ejeDe(S.eje).c:C.verde}}]}]});
}

/* ======================= VISTA: LOGROS ======================= */
function vLogros(v){
  v.innerHTML=`<div class="tools"><label class="search"><i class="fa-solid fa-magnifying-glass" style="color:var(--gris)"></i><input id="q" type="search" placeholder="Buscar: lactancia, CDI, talleres, vacunación…" value="${esc(S.logQ)}"></label>
    <div class="chipset" id="cats"></div></div>
    <div class="row c4" id="lgGrid"></div>
    <div class="row c2"><div class="card"><div class="ch"><div><h3>Logros por categoría</h3><p>Número de logros destacados</p></div></div><div class="chart" id="catChart"></div></div>
    <div class="card"><div class="ch"><div><h3>Cifras clave de atención</h3><p>Personas atendidas en los programas con mayor alcance</p></div></div><div class="chart" id="cifras"></div></div></div>`;
  const cats=$('#cats');
  cats.innerHTML=[['','fa-border-all']].concat(CATS).map(([n,ic])=>`<button class="chip ${S.logCat===n?'on':''}" data-c="${esc(n)}"><i class="fa-solid ${ic}"></i>${n||'Todas'}</button>`).join('');
  cats.onclick=ev=>{const b=ev.target.closest('[data-c]');if(!b)return;S.logCat=b.dataset.c;cats.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===b));pintar()};
  $('#q').oninput=ev=>{S.logQ=ev.target.value;pintar()};
  function pintar(){const q=S.logQ.trim().toLowerCase();
    const L=LOGROS.map((x,i)=>[x,i]).filter(([x])=>(!S.eje||x[0]===S.eje)&&(!S.logCat||x[2]===S.logCat)&&(!q||x.join(' ').toLowerCase().includes(q)));
    $('#lgGrid').innerHTML=L.length?L.map(([x,i])=>logroCard(x,i)).join(''):'<div class="card" style="grid-column:1/-1;text-align:center;color:var(--gris)">No hay logros que coincidan con la búsqueda.</div>'}
  pintar();
  $('#lgGrid').onclick=ev=>{const c=ev.target.closest('[data-lg]');if(c)modalLogro(LOGROS[+c.dataset.lg])};
  const base=LOGROS.filter(x=>!S.eje||x[0]===S.eje);
  const cc=chart($('#catChart'),{tooltip:Object.assign({},TT),grid:{left:6,right:40,top:6,bottom:6,containLabel:true},xAxis:{type:'value',show:false},
    yAxis:{type:'category',inverse:true,data:CATS.map(c=>c[0]),axisTick:{show:false},axisLine:{show:false},axisLabel:{color:C.tinta,fontWeight:600}},
    series:[{type:'bar',barMaxWidth:22,label:{show:true,position:'right',fontWeight:800},data:CATS.map((c,i)=>({value:base.filter(x=>x[2]===c[0]).length,itemStyle:{borderRadius:8,color:[C.verde,C.azul,C.amarillo,C.verde2,'#0F4C81','#7A8F00'][i]}}))}]});
  cc.on('click',p=>{S.logCat=p.name;render()});
  let ci=AT.nna.filter(x=>!S.eje||x[2]===S.eje);if(!ci.length)ci=AT.nna;ci=ci.slice(0,7);
  chart($('#cifras'),{tooltip:Object.assign({valueFormatter:v=>fmt(v)+' atendidos'},TT),series:[{type:'treemap',roam:false,nodeClick:false,breadcrumb:{show:false},width:'100%',height:'100%',
    label:{fontWeight:700,fontSize:13,formatter:p=>`${p.name}\n${fmt(p.value)}`},itemStyle:{borderColor:'#fff',borderWidth:3,gapWidth:3,borderRadius:8},
    data:ci.map((x,i)=>({name:x[0],value:x[1],itemStyle:{color:[C.verde,C.verde2,'#2E8B57',C.amarillo,'#C9A100',C.azul,'#0F4C81'][i%7]}}))}]});
}

/* ======================= VISTA: POBLACIÓN ======================= */
function vPoblacion(v){
  v.innerHTML=`
  <div class="row c4" id="pk"></div>
  <div class="row c21">
    <div class="card"><div class="ch"><div><h3>Cobertura de la población de 0 a 17 años</h3><p>Cada figura representa 100 niñas, niños o adolescentes</p></div></div>
      <div class="slider"><label for="sh" style="font-weight:600">Población de 0 a 17 años (% de 28.000 habitantes)</label><input type="range" id="sh" min="20" max="30" step="0.5" value="${POB.share}"><output id="shOut"></output></div>
      <div class="picto" id="picto"></div>
      <div class="leyenda">${POB.grupos.map(g=>`<span><b style="background:${g.c}"></b>${g.g} beneficiados</span>`).join('')}<span><b style="background:#D9E3DC"></b>Población objetivo</span></div></div>
    <div class="card"><div class="ch"><div><h3>Cobertura por curso de vida</h3><p>Beneficiarios distintos sobre la población estimada</p></div></div><div class="chart md" id="cob"></div></div>
  </div>
  <div class="row c2">
    <div class="card"><div class="ch"><div><h3>Población y beneficiarios</h3><p>Personas distintas, descontando la participación en varios programas</p></div></div><div class="chart" id="pb"></div></div>
    <div class="card"><div class="ch"><div><h3>Atenciones por programa</h3><p id="subAt"></p></div><div class="seg" id="segAt"><button data-v="nna">NNA</button><button data-v="fam">Familias</button></div></div><div class="chart" id="at"></div></div>
  </div>
  <div class="card" style="font-size:13.5px;color:var(--gris)"><i class="fa-solid fa-calculator" style="color:var(--verde)"></i> <b>Cómo se estima:</b> Tenjo tiene cerca de 28.000 habitantes y se asume que el 25 % tiene entre 0 y 17 años (≈ 7.000). Los programas reportan cerca de 13.800 atenciones; como un mismo niño participa en varias actividades, para cada curso de vida se toma el programa de mayor cobertura y se suman los que llegan a grupos distintos. Resultado: ≈ 4.700 niñas, niños y adolescentes y ≈ 1.600 padres, madres y cuidadores. Mueve el control para ver cómo cambia la cobertura con otro supuesto de población.</div>`;
  const cob=chart($('#cob'),{});const pb=chart($('#pb'),{});
  function pintar(){
    const share=POB.share/100,U=POB.hab*share,us=POB.grupos.map(g=>Math.round(U*g.w)),bt=POB.grupos.reduce((s,g)=>s+g.b,0);
    $('#shOut').textContent=fmt(POB.share,1)+' %';
    $('#pk').innerHTML=[['hero','fa-city',POB.hab,'Habitantes del municipio',''],['','fa-children',U,'Población de 0 a 17 años','≈ '],['r','fa-hand-holding-heart',S.eje?POB.grupos[S.eje-1].b:bt,S.eje?'Beneficiarios de '+ejeDe(S.eje).edad:'Niñas, niños y adolescentes beneficiados','≈ '],['y','fa-people-roof',bt+POB.cuid,`Personas vinculadas: ${pct((bt+POB.cuid)/POB.hab*100)} de los habitantes`,'≈ ']]
      .map(([c,ic,n,l,pre])=>`<div class="card kpi ${c}"><i class="fa-solid ${ic} deco"></i><div class="ki"><i class="fa-solid ${ic}"></i></div><div class="n">${pre}${fmt(Math.round(n))}</div><div class="l">${l}</div></div>`).join('');
    let k=0;
    $('#picto').innerHTML=POB.grupos.map((g,gi)=>{const n=Math.round(us[gi]/100),f=Math.round(g.b/100),dim=S.eje&&S.eje!==g.eje;let ic='';
      for(let i=0;i<n;i++){const on=i<f;ic+=`<i class="fa-solid ${gi===0?'fa-baby':gi===1?'fa-child':'fa-person'} ${on?'on':''}" style="color:${on?(dim?'#BFD0C4':g.c):'#D9E3DC'};transition-delay:${(k++)*6}ms"></i>`}
      return `<div class="pg"><div class="pgh"><b style="color:${g.c===C.amarillo?'#8F7200':g.c}">${g.g}</b><span>${fmt(g.b)} de ${fmt(us[gi])} · <b>${pct(Math.min(100,g.b/us[gi]*100),0)}</b></span></div><div class="pgi">${ic}</div></div>`}).join('');
    cob.setOption({tooltip:Object.assign({formatter:p=>`<b>${p.seriesName}</b><br>${fmt(POB.grupos[p.seriesIndex].b)} de ${fmt(us[p.seriesIndex])} (${pct(p.value,0)})`},TT),
      series:POB.grupos.map((g,i)=>({name:g.g,type:'gauge',startAngle:90,endAngle:-270,radius:(92-i*22)+'%',center:['50%','52%'],pointer:{show:false},
        progress:{show:true,overlap:false,roundCap:true,width:14,itemStyle:{color:g.c,opacity:S.eje&&S.eje!==g.eje?.3:1}},axisLine:{lineStyle:{width:14,color:[[1,'#EEF3EF']]}},
        splitLine:{show:false},axisTick:{show:false},axisLabel:{show:false},title:{show:false},
        detail:{show:false},data:[{value:Math.min(100,+(g.b/us[i]*100).toFixed(1))}]})),
      graphic:[{type:'text',left:'center',top:'45%',style:{text:pct(Math.min(100,bt/U*100),0),fontSize:26,fontWeight:800,fontFamily:'Montserrat',fill:C.verde,textAlign:'center'}},{type:'text',left:'center',top:'56%',style:{text:'cobertura total',fontSize:12,fill:C.gris}}],
      color:POB.grupos.map(g=>g.c),legend:{bottom:0,icon:'circle',itemWidth:9,textStyle:{color:C.gris},data:POB.grupos.map(g=>g.g)}},true);
    pb.setOption({tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},valueFormatter:v=>fmt(v)},TT),legend:{top:0,right:0,icon:'roundRect',itemWidth:12,textStyle:{color:C.gris}},grid:{left:10,right:10,top:40,bottom:10,containLabel:true},
      xAxis:{type:'category',data:POB.grupos.map(g=>g.g),axisTick:{show:false},axisLine:{lineStyle:{color:'#DDE5DF'}},axisLabel:{color:C.tinta,fontWeight:600}},yAxis:{type:'value',show:false},
      series:[{name:'Población estimada',type:'bar',barMaxWidth:50,itemStyle:{color:'#CFDDD3',borderRadius:[8,8,0,0]},label:{show:true,position:'top',color:C.gris,fontWeight:700,formatter:p=>fmt(p.value)},data:us},
        {name:'Beneficiarios',type:'bar',barMaxWidth:50,itemStyle:{color:C.verde},label:{show:true,position:'top',color:C.tinta,fontWeight:800,formatter:p=>fmt(p.value)},data:POB.grupos.map(g=>({value:g.b,itemStyle:{color:g.c,borderRadius:[8,8,0,0],opacity:S.eje&&S.eje!==g.eje?.3:1}}))}]},true);
  }
  $('#sh').oninput=ev=>{POB.share=+ev.target.value;pintar()};
  pintar();
  const at=chart($('#at'),{});
  function pintarAt(){document.querySelectorAll('#segAt button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.at));
    const d=AT[S.at];$('#subAt').textContent=S.at==='nna'?'Niñas, niños y adolescentes atendidos':'Padres, madres, cuidadores y familias atendidos';
    at.setOption({tooltip:Object.assign({valueFormatter:v=>fmt(v)+' atendidos'},TT),grid:{left:6,right:50,top:6,bottom:6,containLabel:true},xAxis:{type:'value',show:false},
      yAxis:{type:'category',inverse:true,data:d.map(x=>x[0]),axisTick:{show:false},axisLine:{show:false},axisLabel:{color:C.tinta,fontWeight:600}},
      series:[{type:'bar',barMaxWidth:20,label:{show:true,position:'right',fontWeight:800,formatter:p=>fmt(p.value)},
        data:d.map(x=>({value:x[1],itemStyle:{borderRadius:8,color:S.at==='nna'?C.verde:C.azul}}))}]},true)}
  document.querySelectorAll('#segAt button').forEach(b=>b.onclick=()=>{S.at=b.dataset.v;pintarAt()});pintarAt();
}

/* ======================= VISTA: ACTIVIDADES ======================= */
function vActividades(v){
  const deps=[...new Set(ACT.map(a=>a.r))].sort();
  v.innerHTML=`<div class="tools">
    <label class="search"><i class="fa-solid fa-magnifying-glass" style="color:var(--gris)"></i><input id="aq" type="search" placeholder="Buscar actividad, código o responsable" value="${esc(S.actQ)}"></label>
    <select class="sel" id="adep" aria-label="Dependencia"><option value="">Todas las dependencias</option>${deps.map(d=>`<option ${S.actDep===d?'selected':''}>${esc(d)}</option>`).join('')}</select>
    <div class="stat-pills" id="ests"></div></div>
    <div class="card" style="padding:0"><div class="tbl-wrap"><table class="tbl"><thead><tr>
      <th data-s="cod">Código<i class="fa-solid fa-sort"></i></th><th data-s="d">Actividad<i class="fa-solid fa-sort"></i></th><th data-s="r">Responsable<i class="fa-solid fa-sort"></i></th>
      <th data-s="p" class="num">Prog.<i class="fa-solid fa-sort"></i></th><th data-s="s1" class="num">Sem. 1<i class="fa-solid fa-sort"></i></th><th data-s="s2" class="num">Sem. 2<i class="fa-solid fa-sort"></i></th>
      <th data-s="c">Cumplimiento<i class="fa-solid fa-sort"></i></th><th data-s="est">Estado</th></tr></thead><tbody id="tb"></tbody></table></div></div>
    <div class="pager"><span id="pinfo"></span><div class="btns"><button id="prev"><i class="fa-solid fa-chevron-left"></i> Anterior</button><button id="next">Siguiente <i class="fa-solid fa-chevron-right"></i></button></div></div>`;
  const PS=14;
  function base(){const q=S.actQ.trim().toLowerCase();return filtAct().filter(a=>(!S.actDep||a.r===S.actDep)&&(!q||(a.cod+' '+a.d+' '+a.r+' '+LN[a.l][0]).toLowerCase().includes(q)))}
  function pintar(){
    const b=base();const cnt=ESTADOS.map(([n])=>b.filter(a=>estado(a.c)===n).length);
    $('#ests').innerHTML=`<button class="${!S.actEst?'on':''}" data-e=""><b>${b.length}</b><small>Todas</small></button>`+ESTADOS.map(([n,c],i)=>`<button class="${S.actEst===n?'on':''}" data-e="${n}"><b style="color:${c===C.amarillo?'#8F7200':c}">${cnt[i]}</b><small>${n}</small></button>`).join('');
    let rows=b.filter(a=>!S.actEst||estado(a.c)===S.actEst);
    const [k,dir]=S.sort;const key=a=>k==='est'?estado(a.c):a[k];
    rows.sort((x,y)=>{const A=key(x),B=key(y);if(typeof A==='number'||typeof B==='number')return((A??-1)-(B??-1))*dir;return String(A).localeCompare(String(B),'es',{numeric:true})*dir});
    const pages=Math.max(1,Math.ceil(rows.length/PS));S.page=Math.min(S.page,pages-1);
    const pr=rows.slice(S.page*PS,S.page*PS+PS);
    $('#tb').innerHTML=pr.length?pr.map(a=>{const e=ejeDe(a.e);return `<tr data-id="${a.id}"><td class="cod">${a.cod}</td><td>${esc(a.d)}<br><small style="color:var(--gris)">Línea ${a.l} · ${esc(LN[a.l][0])}</small></td><td>${esc(a.r)}</td>
      <td class="num">${a.p==null?'—':fmt(a.p)}</td><td class="num">${fmt(a.s1)}</td><td class="num">${fmt(a.s2)}</td>
      <td><div class="cbar">${progHTML(a.c,e.c)}<b>${pct(a.c,0)}</b></div></td><td>${estPill(a.c)}</td></tr>`}).join(''):'<tr><td colspan="8" style="text-align:center;color:var(--gris);padding:30px">No hay actividades con estos filtros.</td></tr>';
    $('#pinfo').textContent=`Mostrando ${rows.length?S.page*PS+1:0}–${S.page*PS+pr.length} de ${rows.length} actividades`;
    $('#prev').disabled=S.page===0;$('#next').disabled=S.page>=pages-1;
    document.querySelectorAll('.tbl th[data-s]').forEach(th=>{const i=th.querySelector('i');if(i)i.className='fa-solid '+(S.sort[0]===th.dataset.s?(S.sort[1]>0?'fa-sort-up':'fa-sort-down'):'fa-sort')});
    contar($('#tb'));
  }
  $('#aq').oninput=ev=>{S.actQ=ev.target.value;S.page=0;pintar()};
  $('#adep').onchange=ev=>{S.actDep=ev.target.value;S.page=0;pintar()};
  $('#ests').onclick=ev=>{const b=ev.target.closest('[data-e]');if(b){S.actEst=b.dataset.e;S.page=0;pintar()}};
  document.querySelectorAll('.tbl th[data-s]').forEach(th=>th.onclick=()=>{S.sort=[th.dataset.s,S.sort[0]===th.dataset.s?-S.sort[1]:1];pintar()});
  $('#prev').onclick=()=>{S.page--;pintar()};$('#next').onclick=()=>{S.page++;pintar()};
  $('#tb').onclick=ev=>{const tr=ev.target.closest('[data-id]');if(tr)modalAct(ACT[+tr.dataset.id])};
  pintar();
}

/* ======================= VISTA: DEPENDENCIAS ======================= */
function vDependencias(v){
  const fa=filtAct();const deps=[...new Set(fa.map(a=>a.r))].map(d=>{const xs=fa.filter(a=>a.r===d);return {d,n:xs.length,c:xs.reduce((s,a)=>s+a.c,0)/xs.length,ejes:[...new Set(xs.map(a=>a.e))].sort(),acc:new Set(xs.map(a=>a.a)).size}}).sort((a,b)=>b.n-a.n);
  if(!S.dep||!deps.find(d=>d.d===S.dep))S.dep=deps[0]&&deps[0].d;
  v.innerHTML=`<div class="row c2">
    <div class="card"><div class="ch"><div><h3>Actividades por dependencia</h3><p>Selecciona una dependencia para ver su gestión</p></div><span class="hint"><i class="fa-solid fa-hand-pointer"></i>Interactivo</span></div><div class="chart lg" id="dep"></div></div>
    <div class="card"><div id="depDet"></div></div></div>
    <div class="row c12">
      <div class="card"><div class="ch"><div><h3>Plan de Desarrollo Territorial</h3><p>Último reporte consolidado (vigencia 2025)</p></div></div>
        <div class="tri"><div style="background:var(--verde)"><span class="n">34</span><small>metas articuladas con la política</small></div><div style="background:var(--azul)"><span class="n">19</span><small>metas al 100 % de su meta anual</small></div><div style="background:var(--amarillo);color:var(--tinta)"><span class="n" style="font-size:18px;white-space:nowrap">$3.007 M</span><small>recursos asociados</small></div></div></div>
      <div class="card"><div class="ch"><div><h3>Metas cumplidas destacadas</h3><p>Metas de producto del PDT que respaldan la política</p></div></div><div class="row c2" style="margin:0;gap:0 24px">${METAS.map(m=>`<div class="meta"><span class="cod">Meta ${m[0]}</span><div><b>${m[1]}</b><span>${m[2]}</span></div></div>`).join('')}</div></div>
    </div>`;
  const dc=chart($('#dep'),{});
  function pintarChart(){dc.setOption({tooltip:Object.assign({formatter:p=>{const d=deps[p.dataIndex];return `<b>${esc(d.d)}</b><br>${d.n} actividades · ${d.acc} acciones<br>Cumplimiento promedio: ${pct(d.c)}`}},TT),
    grid:{left:6,right:40,top:6,bottom:6,containLabel:true},xAxis:{type:'value',show:false},
    yAxis:{type:'category',inverse:true,data:deps.map(d=>d.d),axisTick:{show:false},axisLine:{show:false},axisLabel:{color:C.tinta,fontWeight:600}},
    series:[{type:'bar',barMaxWidth:22,label:{show:true,position:'right',fontWeight:800},
      data:deps.map((d,i)=>({value:d.n,itemStyle:{borderRadius:8,color:[C.verde,C.amarillo,C.azul][i%3],opacity:d.d===S.dep?1:.45,borderColor:d.d===S.dep?C.tinta:'transparent',borderWidth:d.d===S.dep?2:0}}))}]},true)}
  pintarChart();
  dc.on('click',p=>{S.dep=deps[p.dataIndex].d;pintarChart();pintarDet()});
  function pintarDet(){const d=deps.find(x=>x.d===S.dep);if(!d)return;const xs=fa.filter(a=>a.r===d.d);
    $('#depDet').innerHTML=`<span class="pill">Dependencia corresponsable</span><h3 style="margin:8px 0 0;font:800 20px Montserrat;color:var(--verde)">${esc(d.d)}</h3>
      <div class="dep-kpis"><div><b data-n="${d.n}">0</b><small>actividades</small></div><div><b data-n="${d.c}" data-d="1" data-suf=" %">0</b><small>cumplimiento promedio</small></div><div><b>${d.ejes.map(e=>`<span title="${ejeDe(e).nombre}" style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${ejeDe(e).c};margin-right:4px"></span>`).join('')}</b><small>ejes en los que participa</small></div></div>
      <div class="scroll" style="max-height:330px">${xs.map(a=>`<div class="act" data-act="${a.id}" style="cursor:pointer"><span class="cod" style="font:700 12px Montserrat;color:var(--verde);min-width:52px">${a.cod}</span><span class="t">${esc(a.d)}</span>${estPill(a.c)}</div>`).join('')}</div>`;
    contar($('#depDet'))}
  pintarDet();
  $('#depDet').onclick=ev=>{const a=ev.target.closest('[data-act]');if(a)modalAct(ACT[+a.dataset.act])};
}

/* ======================= EVENTOS ======================= */
filtroUI();
addEventListener('hashchange',render);
addEventListener('resize',()=>charts.forEach(c=>c.resize()));
$('#cerrar').onclick=cerrar;$('#modal').onclick=ev=>{if(ev.target.id==='modal')cerrar()};
addEventListener('keydown',ev=>{if(ev.key==='Escape')cerrar()});
$('#modalBody').addEventListener('click',ev=>{const a=ev.target.closest('[data-act]');if(a)modalAct(ACT[+a.dataset.act])});
$('#burger').onclick=()=>{$('#sb').classList.add('open');$('#sbBack').classList.add('open')};
$('#sbBack').onclick=()=>{$('#sb').classList.remove('open');$('#sbBack').classList.remove('open')};
$('#fs').onclick=()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();else document.exitFullscreen()};
if(!location.hash)history.replaceState(null,'','#/inicio');
render();
})();

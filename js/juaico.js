/* JUAICO · asistente conversacional del tablero de la PP de Primera Infancia, Infancia y Adolescencia · Tenjo
   Motor de comprensión de lenguaje basado en reglas: identifica la intención y las entidades
   (curso de vida, línea, acción, dependencia, tema) y responde calculando sobre los datos del tablero. */
(function(){
'use strict';
const T=()=>window.TABLERO;
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[¿?¡!,;:()"]/g,' ').replace(/(\d)\.(?=\d)/g,'$1§').replace(/\./g,' ').replace(/§/g,'.').replace(/\s+/g,' ').trim();
const NOMBRE='JUAICO';

/* ======================= BIBLIOTECA DE PREGUNTAS ======================= */
const PREGUNTAS=[
 ['Avance general','fa-gauge-high',['¿Cómo va la política en 2026?','Dame el resumen de la política','¿Cuál es el aporte de 2026 a la implementación total?','¿Cuántas acciones se han gestionado?','¿Cuál es la fecha de corte?']],
 ['Cursos de vida','fa-children',['¿Cómo va primera infancia?','¿Cómo va el eje de infancia?','¿Cómo va adolescencia?','¿Qué curso de vida tiene mayor cumplimiento?','¿Qué curso de vida pesa más en la política?','¿Qué líneas tiene primera infancia?']],
 ['Líneas estratégicas','fa-layer-group',['Dame el avance de la línea estratégica 1.4','¿Cómo va la línea de pautas de crianza?','¿Cómo va la línea de salud de infancia?','¿Cómo va la línea 1.7 de protección de derechos?','¿Cómo va la línea de educación?','¿Qué líneas están al 100 %?']],
 ['Acciones','fa-list-check',['¿Cuáles son las acciones con mejor desempeño?','Dame las 5 acciones con mejor desempeño','¿Cuántas acciones están al 100 %?','¿Qué acciones tienen mayor oportunidad de avance?','¿Cómo va la acción 1.4.1?','Dame la ficha de la acción 1.1.2','¿Qué evidencias soportan la acción 1.7.1?']],
 ['Actividades','fa-clipboard-check',['¿Cuántas actividades están cumplidas?','¿Qué actividades siguen en avance?','¿Cómo fue la ejecución por semestre?','¿Qué actividades de primera infancia están cumplidas?']],
 ['Temas','fa-magnifying-glass',['¿Qué se ha hecho en la Ludoteca?','¿Qué se hace en lactancia materna?','¿Qué se hizo en prevención del abuso sexual?','Busca actividades sobre vacunación','¿Qué se ha hecho en prevención del bullying?','¿Qué se ha hecho en manejo emocional?','¿Qué se hace con las familias víctimas?']],
 ['Población y cifras','fa-people-group',['¿Cuál es la población beneficiada?','¿Qué porcentaje de niñas, niños y adolescentes se beneficia?','¿Cuántos niños de primera infancia se benefician?','¿Cuántos adolescentes se benefician?','¿Cuántos cuidadores se benefician?','¿Cuántos niños atiende la Ludoteca?','¿Cuántas madres gestantes y lactantes se atendieron?','¿Cuántos niños participaron en el Día de la Niñez?','¿Cuántos niños hay en las escuelas artísticas?','¿Cómo va el CDI La Punta?']],
 ['Dependencias y PDT','fa-sitemap',['¿Qué dependencia tiene más actividades?','¿Cuántas actividades tiene cada dependencia?','¿Qué hace la Comisaría de Familia?','¿Qué hace Salud Pública?','¿Qué metas del Plan de Desarrollo respaldan la política?','¿Cuál es la meta 250 del Plan de Desarrollo?','¿Cuántos recursos tiene asociados la política?']],
 ['Logros y comunicación','fa-trophy',['¿Cuáles son los principales logros?','Logros de primera infancia','Logros de adolescencia','¿Qué recomiendas priorizar?','Redacta un texto con los resultados de 2026','Dame un resumen para presentar al concejo','Genera el informe en PDF']],
 ['Sobre el tablero','fa-circle-question',['¿Qué es la política y cómo está organizada?','¿Cuántos ejes y acciones tiene la política?','¿Cómo se calcula el avance?','¿De dónde salen los datos?','¿Cómo se estima la población beneficiada?','¿Qué puedes responder?']]
];
/* [palabras clave, cifra, descripción, contexto] */
const CIFRAS=[
 [['ludoteca'],'1.286','niñas y niños atendidos en la Ludoteca Luis Carlos Galán','También se atendieron 1.309 padres, madres y cuidadores, y se adecuaron los espacios en febrero y marzo. Meta 250 del Plan de Desarrollo: 3.302 beneficiarios.'],
 [['cdi la punta','la punta'],'80 %','de avance en la obra del nuevo CDI La Punta','El nuevo Centro de Desarrollo Infantil ampliará la atención en cerca de 100 cupos para el sector.'],
 [['tenjanito','hogares comunitarios','hogar comunitario'],'131','niñas y niños en el CDI Tenjanito y los hogares comunitarios','79 en el CDI Tenjanito y 52 en los hogares Mis Primeros Amiguitos, Ositos del Ocal y Esperanza.'],
 [['gestante','lactante'],'416','madres gestantes y lactantes en talleres','27 talleres sobre signos de alarma, lactancia, primeros auxilios, estimulación temprana y hábitos saludables.'],
 [['semana de la lactancia','lactancia materna'],'124','personas en la Semana de la Lactancia Materna','Celebración del 3 al 6 de agosto, sala de lactancia en funcionamiento y articulación con el Banco de Leche de Zipaquirá. Además, 120 personas en el grupo de orientación en lactancia.'],
 [['abuso sexual','abuso'],'1.101','niñas, niños y adolescentes en prevención del abuso sexual infantil','33 espacios lúdico-pedagógicos y talleres con padres de los jardines sociales sobre rutas de atención.'],
 [['dia de la ninez'],'4.000','niñas y niños en la celebración del Día de la Niñez','Celebración municipal en la Ludoteca; además, 410 niños en el programa de matrogimnasia.'],
 [['matrogimnasia'],'410','niñas y niños en el programa de matrogimnasia','Actividad que fortalece el vínculo entre madres, padres e hijos mediante el juego y el movimiento.'],
 [['escuelas artisticas','escuelas de formacion artistica','imctt','artistic'],'3.600','niñas, niños y adolescentes en escuelas de formación artística','76 escuelas del Instituto Municipal de Cultura y Turismo (IMCTT).'],
 [['escuelas deportivas','inderten'],'2.000','niñas y niños en escuelas deportivas del Inderten','Además, 1.251 participantes en festivales deportivos de rondas, escolares y baby en BMX, fútbol y patinaje.'],
 [['festival'],'1.251','participantes en festivales deportivos','Festivales de rondas, escolares y baby en BMX, fútbol y patinaje.'],
 [['biling','ingles'],'66','niñas y niños en el programa de bilingüismo','Niveles Kids 1 y 2 para niñas y niños de 6 a 11 años.'],
 [['bullying','convivencia'],'50','talleres de convivencia y prevención del bullying','Con estudiantes de las IED, más 6 talleres para padres y un taller de primeros auxilios psicológicos para docentes.'],
 [['spa','sustancias','consumo'],'21','talleres de prevención del consumo de sustancias psicoactivas','15 con estudiantes y 6 con padres: toma de decisiones, presión de pares y autocuidado.'],
 [['escuela de padres','escuelas de padres'],'13','escuelas de padres con familias de adolescentes','Pautas de crianza, comunicación asertiva, límites y vínculos familiares. En primera infancia, 100 padres e hijos participaron en encuentros de crianza.'],
 [['medidas de proteccion','comisaria'],'86','medidas de protección familiar de la Comisaría de Familia','La Comisaría mantiene la Ruta Integral de Atención aprobada y en funcionamiento.'],
 [['victima'],'32','familias víctimas con apoyo nutricional','Talleres de reparación integral, conmemoración y feria de servicios.'],
 [['kit','bebe'],'28','familias con kit para el bebé','Apoyo a familias de primera infancia.'],
 [['vacuna','pai'],'2','jornadas nacionales de vacunación (PAI)','Programa Ampliado de Inmunizaciones y seguimiento de casos en SIVIGILA y MANGO.']
];

/* ======================= ENTIDADES ======================= */
const TEMAS=[['ludoteca','ludoteca'],['cdi','cdi'],['hogar','hogar'],['jardin','jardin'],['crianza','crianza'],['padres','padres'],['familia','familia'],['lactancia','lactancia'],['gestante','gestante'],['vacun','vacun'],['nutrici','nutrici'],['aliment','aliment'],['salud mental','salud mental'],['emocion','emocion'],['abuso','abuso'],['bullying','bullying'],['convivencia','convivencia'],['sustancias','sustancias'],['spa','spa'],['trabajo infantil','trabajo infantil'],['embarazo','embarazo'],['sexual','sexual'],['registro','registro'],['identidad','identidad'],['victima','victima'],['deport','deport'],['cultura','cultura'],['artistic','artistic'],['biling','biling'],['ingles','ingl'],['participaci','participaci'],['consejo','consejo'],['comisaria','comisaria'],['ruta','ruta'],['proteccion','protecci'],['dia de la ninez','ninez'],['matrogimnasia','matrogimnasia'],['discapacidad','discapacidad'],['agua','agua'],['emprend','emprend'],['proyecto de vida','proyecto de vida']];
const DEPS=[['proteccion social (victimas)','Protección Social (víctimas)'],['victimas','Protección Social (víctimas)'],['proteccion social','Protección Social'],['comisaria','Comisaría de Familia'],['salud publica','Salud Pública'],['secretaria de salud','Salud Pública'],['desarrollo educativo','Desarrollo Educativo'],['secretaria de educacion','Desarrollo Educativo'],['registraduria','Registraduría'],['inderten','Inderten'],['imctt','IMCTT'],['instituto de cultura','IMCTT'],['emsertenjo','Emsertenjo'],['desarrollo economico','Desarrollo Económico']];
/* Nombre de la línea → líneas que lo comparten en los cursos de vida */
const LINEAK=[[/crianza/,['1.1']],[/autoproteccion|autocuidado/,['2.8','3.9']],[/salud/,['1.2','2.2','3.2']],[/nutricion/,['1.3','2.3','3.3']],[/entornos/,['1.4']],[/identidad|diversidad/,['1.5','2.5','3.6']],[/participacion|expresion/,['1.6','2.7','3.8']],[/proteccion de derechos|derechos/,['1.7']],[/familia|cuidadores/,['2.1','3.1']],[/educacion/,['2.4','3.5']],[/cultura|deporte|recreacion/,['2.6','3.7']],[/sexualidad/,['3.4']]];
function cursoDeVida(q){
  if(/primera infancia|0 a 5|cero a cinco|bebes|primeros anos/.test(q))return 1;
  if(/ninos y adolescentes|ninas y adolescentes|\bnna\b/.test(q))return 0;
  if(/adolescen|12 a 17|jovenes/.test(q)&&!/infancia y adolescencia/.test(q))return 3;
  if(/\binfancia\b|6 a 11|seis a once/.test(q)&&!/primera infancia|infancia y adolescencia|politica de infancia/.test(q))return 2;
  return 0}
function entidades(q){
  const e={};
  let r=q.match(/\b([1-3])\.([1-9])\.(\d{1,2})\b/);if(r&&T().ACC[r[0]])e.acc=r[0];else if(r)e.accNo=r[0];
  r=q.match(/\beje\s*(1|2|3|uno|dos|tres)\b/);if(r)e.eje={uno:1,dos:2,tres:3}[r[1]]||+r[1];
  if(!e.eje){const c=cursoDeVida(q);if(c)e.eje=c}
  r=q.match(/\b([1-3]\.[1-9])\b(?!\.\d)/);
  if(r&&T().LN[r[1]]){e.linea=r[1];e.eje=+r[1][0]}
  else if(/linea/.test(q)){for(const [re,ls] of LINEAK)if(re.test(q)){const own=e.eje?ls.filter(l=>+l[0]===e.eje):ls;const conDatos=(own.length?own:ls).filter(l=>T().LIN[l]);e.linea=(conDatos[0]||own[0]||ls[0]);e.lineasAlt=ls.filter(l=>l!==e.linea);e.eje=+e.linea[0];break}}
  for(const [k,v] of DEPS)if(q.includes(k)){e.dep=v;break}
  r=q.match(/\b(top|primeras|principales)?\s*(\d{1,2})\s*(acciones|actividades|principales|primeras|mejores|logros)/)||q.match(/\btop\s*(\d{1,2})/);
  if(r){const n=+(r[2]||r[1]);if(n>0&&n<=20)e.n=n}
  if(/\b(la|cual es la) accion (con|que tiene|de) (menor|mayor|mas|mejor)/.test(q))e.n=1;
  r=q.match(/\bmeta\s*(\d{2,3})\b/);if(r)e.meta=r[1];
  e.cifra=CIFRAS.find(c=>c[0].some(k=>q.includes(k)));
  e.temas=TEMAS.filter(([k])=>q.includes(k)).map(t=>t[1]);
  if(/cuidador|padres|madres|familias/.test(q)&&/beneficia|cuantos|cuantas/.test(q)&&!e.cifra)e.grupo='cuid';
  return e}

/* ======================= INTENCIONES ======================= */
const INT=[
 ['redactar',[['redacta',10],['redactar',10],['texto',6],['parrafo',8],['comunicado',8],['mensaje',6],['concejo',8],['para presentar',6],['discurso',8]]],
 ['fuente',[['de donde salen',10],['fuente',8],['que datos',6],['fecha de corte',10],['corte',5],['actualizad',6]]],
 ['estimacion',[['como se estima',12],['supuesto',6],['como calculan la poblacion',12]]],
 ['cifra',[['cuantos',3],['cuantas',3],['cuanto',2],['numero de',3],['cantidad de',3],['como va el cdi',9]]],
 ['saludo',[['hola',3],['buenos dias',3],['buenas',3],['saludos',3],['gracias',3],['que tal',2]]],
 ['ayuda',[['ayuda',4],['que puedes',4],['que sabes',4],['que preguntas',4],['como funciona',3],['quien eres',4],['que puedes responder',6],['que eres',3]]],
 ['informe',[['informe',4],['pdf',6],['descargar',3],['imprimir',3]]],
 ['metodologia',[['como se calcula',6],['metodologia',6],['formula',5],['calculo',4],['como se mide',6],['aporte',3],['peso',3],['pesos',3]]],
 ['estructura',[['que es la politica',6],['estructura',5],['organizada',5],['cuantos ejes',10],['componentes',4],['objetivo de la politica',5]]],
 ['oportunidad',[['oportunidad',9],['rezag',9],['menor avance',7],['menor cumplimiento',7],['mas bajo',6],['por mejorar',7],['atrasad',7],['en proceso',5],['falta',3]]],
 ['mejores',[['mejor desempeno',7],['mejores',6],['mayor avance',6],['mas avanzad',6],['destacadas',4],['mayor cumplimiento',6],['al 100',8],['cien por ciento',5]]],
 ['recomendacion',[['recomiend',7],['recomendacion',7],['priorizar',7],['prioridad',6],['que hacer',5],['sugier',5],['siguientes pasos',6],['proximos pasos',6]]],
 ['poblacion',[['poblacion',6],['beneficiad',6],['beneficiari',6],['personas',3],['cuantos',2],['atendid',4],['cobertura',4],['cuidador',4],['ninos',2],['porcentaje',4],['se benefician',5],['adolescentes',2]]],
 ['pdt',[['plan de desarrollo',7],['pdt',7],['meta de producto',7],['metas',4],['recursos',6],['presupuesto',6],['inversion',6],['dinero',5]]],
 ['dependencia',[['dependencia',9],['cada dependencia',12],['secretaria',4],['responsable',5],['quien ejecuta',6],['entidades',4],['que hace la',4],['que hace el',4]]],
 ['semestre',[['semestre',7],['primer semestre',8],['segundo semestre',8]]],
 ['logros',[['logro',8],['resultados',4],['hitos',6],['que se ha hecho',3],['que se logro',7],['avances destacados',6]]],
 ['actividades',[['actividad',4],['actividades',4],['cumplidas',3],['en avance',4],['siguen',3],['cuantas actividades',6]]],
 ['accion',[['accion ',4],['acciones',2],['ficha',4],['evidencia',3]]],
 ['eje',[['pesa',5],['eje',4],['ejes',4],['curso de vida',6],['cursos de vida',6],['linea estrategica',6],['linea',3],['lineas',3]]],
 ['resumen',[['aporte',6],['implementacion',4],['como le fue',6],['resumen',6],['como va',5],['avance general',7],['avance de la politica',7],['estado',3],['balance',5],['cumplimiento',3],['avance',2],['general',2],['panorama',5],['gestionad',4]]]
];
function intencion(q,e){
  const sc={};INT.forEach(([id,kw])=>{sc[id]=kw.reduce((s,[k,w])=>s+(q.includes(k)?w:0),0)});
  if(e.acc||e.accNo)sc.accion+=6;
  if((e.eje||e.linea)&&!e.acc)sc.eje+=3;
  if(e.dep)sc.dependencia+=7;
  if(e.eje&&!e.acc&&/como va|como le va|avance de|cumplimiento de/.test(q))sc.eje+=4;
  if(e.temas.length&&/que se ha hecho|que se hizo|en que va|que hay de|que se hace/.test(q))sc.buscar=(sc.buscar||0)+8;
  if(e.temas.length&&!sc.poblacion)sc.buscar=(sc.buscar||0)+4;
  if(/(busca|buscar|sobre|relacionad|tema de)/.test(q)&&e.temas.length)sc.buscar=(sc.buscar||0)+5;
  if(/(que eje|que curso de vida)/.test(q)&&/(mayor|mejor|mas)/.test(q)){sc.eje+=8;sc.mejores=0}
  if(/que lineas/.test(q)&&/100/.test(q)){sc.lineas100=20}
  if(e.temas.length&&/(hay en|en materia de|relacionad|sobre )/.test(q))sc.buscar=(sc.buscar||0)+8;
  if(e.cifra&&sc.cifra>0)sc.cifra+=7;else sc.cifra=0;
  if(e.grupo&&sc.poblacion)sc.poblacion+=6;
  if(e.meta)sc.pdt+=6;
  if(e.dep&&/que hace/.test(q)){sc.dependencia+=6;sc.buscar=0}
  let best=null,mx=0;Object.entries(sc).forEach(([k,v])=>{if(v>mx){mx=v;best=k}});
  return mx>=2?best:null}

/* ======================= COMPONENTES DE RESPUESTA ======================= */
const pct=(v,d=1)=>T().pct(v,d), fmt=(v,d=0)=>T().fmt(v,d);
const ejeCol=id=>T().EJES[id-1].c;
const kpis=arr=>`<div class="ia-kpis">${arr.map(([v,l])=>`<div><b>${v}</b><small>${l}</small></div>`).join('')}</div>`;
const barras=rows=>`<div class="ia-bars">${rows.map(([l,v,c,extra])=>`<div class="ia-bar"><span class="ia-bl">${l}</span><span class="ia-bt"><i style="width:${Math.max(2,Math.min(100,v))}%;background:${c}"></i></span><b>${pct(v,v%1?1:0)}</b>${extra?`<small>${extra}</small>`:''}</div>`).join('')}</div>`;
const nota=t=>`<p class="ia-nota"><i class="fa-solid fa-circle-info"></i> ${t}</p>`;
const CTX='<span class="ia-ctx">Vigencia 2026 · corte octubre</span>';
const accCorto=a=>{const t=(T().ACC[a]&&T().ACC[a].an)||'';let s=t.replace(/^lineamientos? de acci[oó]n (para|que|de)\s*/i,'').replace(/^(promover|realizar|implementar|garantizar|fortalecer)\s+/i,m=>m);s=s.charAt(0).toUpperCase()+s.slice(1);return s.length>78?s.slice(0,76).replace(/\s+\S*$/,'')+'…':s};
const accNom=a=>`${a} ${esc(accCorto(a))}`;
const linNom=l=>`${l} ${esc(T().LN[l][0])}`;
const visAct=()=>T().ACT.filter(T().VIS);
const totBen=()=>T().POB.grupos.reduce((s,g)=>s+g.b,0);

/* ======================= RESPUESTAS ======================= */
const H={
 saludo(){return {html:`<p>¡Hola! Soy <b>${NOMBRE}</b>, el asistente del tablero de la Política Pública de Primera Infancia, Infancia y Adolescencia de Tenjo. Puedo contarte el avance por curso de vida, línea o acción, la población beneficiada, los logros, las dependencias y las metas del Plan de Desarrollo.</p>`,chips:['¿Cómo va la política en 2026?','¿Cuáles son los principales logros?','¿Cuál es la población beneficiada?']}},
 ayuda(){return {html:`<p>Soy <b>${NOMBRE}</b>. Respondo preguntas sobre el contenido del tablero calculando directamente con los datos de la matriz de seguimiento de la vigencia 2026. Puedes preguntarme, por ejemplo:</p><ul class="ia-ul">${PREGUNTAS.map(c=>`<li><b>${c[0]}:</b> ${esc(c[2][0])}</li>`).join('')}</ul>`,chips:[],todas:true}},
 resumen(){const t=T(),v=visAct(),cumplidas=v.filter(a=>a.c>=100).length,al100=t.ALL_ACC.filter(a=>a.c>=100).length;
  const ord=t.EJES.slice().sort((a,b)=>b.cumpl-a.cumpl);
  return {html:`${CTX}<p>En <b>2026</b> el plan de acción de la política alcanza un cumplimiento de <b>${pct(t.G_CUMPL)}</b>, con <b>${t.ALL_ACC.length}</b> acciones gestionadas (${al100} de ellas al 100 %) y <b>${v.length}</b> actividades con avance, <b>${cumplidas}</b> ya cumplidas.</p>
   ${kpis([[pct(t.G_CUMPL),'cumplimiento'],[pct(t.G_APORTE),'aporte a la implementación total'],[String(t.ALL_ACC.length),'acciones gestionadas'],['≈ '+fmt(totBen()),'NNA beneficiados']])}
   ${barras(t.EJES.map(x=>[x.nombre+' <small>('+x.edad+')</small>',x.cumpl,x.c]))}
   <p>El curso de vida con mayor cumplimiento es <b>${esc(ord[0].nombre)}</b> (${pct(ord[0].cumpl)}).</p>${nota('La vigencia 2026 tiene corte a octubre; varias actividades del segundo semestre siguen en ejecución.')}`,
   chips:['¿Cómo va primera infancia?','¿Cuáles son los principales logros?','¿Cuál es la población beneficiada?'],ir:{label:'Ver resumen en el tablero',ruta:'inicio'}}},
 eje(e){const t=T();
  if(e.linea){const L=t.LIN[e.linea];const x=t.ejeDe(+e.linea[0]);const alt=(e.lineasAlt||[]).filter(l=>t.LIN[l]);
   const altTxt=alt.length?`<p class="ia-sub">Esta línea también existe en otros cursos de vida: ${alt.map(l=>`${linNom(l)} (${esc(t.ejeDe(+l[0]).nombre)}, ${pct(t.LIN[l].c)})`).join(' · ')}.</p>`:'';
   if(!L)return {html:`${CTX}<p>La línea estratégica <b>${linNom(e.linea)}</b> (${esc(x.nombre)}) no registra actividades en la matriz de 2026.</p><p class="ia-sub">${esc(t.LN[e.linea][1])}</p>${altTxt}`,chips:[`¿Cómo va ${x.nombre.toLowerCase()}?`]};
   return {html:`${CTX}<p><b>Línea ${linNom(e.linea)}</b> · ${esc(x.nombre)} (${x.edad}): cumplimiento de <b>${pct(L.c)}</b>, con ${L.acc.length} acción(es) gestionada(s) y ${L.nAct} actividades con avance.</p><p class="ia-sub">${esc(L.desc)}</p>
    ${barras(L.acc.map(a=>[accNom(a.a),a.c,x.c]))}${altTxt}`,
    chips:[`¿Cómo va ${x.nombre.toLowerCase()}?`,'¿Cuáles son los principales logros?'],linea:e.linea,ir:{label:'Ver línea en el tablero',eje:x.id,ruta:'avance'}}}
  const id=e.eje;
  if(!id){const ord=t.EJES.slice().sort((a,b)=>b.cumpl-a.cumpl);const pm=t.EJES.slice().sort((a,b)=>b.peso-a.peso)[0];
   return {html:`${CTX}<p>Así va cada curso de vida en <b>2026</b>. El de mayor cumplimiento es <b>${esc(ord[0].nombre)}</b> con <b>${pct(ord[0].cumpl)}</b>.</p>
    <p>El curso de vida con mayor peso en la política es <b>${esc(pm.nombre)}</b> (${pct(pm.peso,1)}), con ${pm.acciones} acciones.</p>
    <table class="ia-tbl"><tr><th>Curso de vida</th><th>Peso</th><th>Acciones</th><th>Cumpl.</th></tr>${t.EJES.map(x=>`<tr><td><span class="ia-dot" style="background:${x.c}"></span>${esc(x.nombre)} <small>(${x.edad})</small></td><td>${pct(x.peso,1)}</td><td>${x.gest}</td><td><b>${pct(x.cumpl)}</b></td></tr>`).join('')}</table>`,
    chips:['Dame el avance de la línea estratégica 1.4','¿Cómo va adolescencia?','¿Qué líneas están al 100 %?']}}
  const x=t.ejeDe(id);const lins=Object.values(t.LIN).filter(L=>L.e===id).sort((a,b)=>a.l.localeCompare(b.l,undefined,{numeric:true}));
  const todas=Object.keys(t.LN).filter(k=>+k[0]===id);
  return {html:`${CTX}<p><b>${esc(x.nombre)} (${x.edad})</b>: cumplimiento de <b>${pct(x.cumpl)}</b>, con ${x.gest} acciones gestionadas y ${x.nAct} actividades. Peso en la política: ${pct(x.peso,1)}; aporte a la implementación total: ${pct(x.aporte)}.</p>
   <p class="ia-sub">Líneas estratégicas con actividades (${lins.length} de ${todas.length}):</p>${barras(lins.map(L=>['L'+L.l+' '+esc(L.nom),L.c,x.c,`${L.acc.length} acción(es)`]))}`,
   chips:[`Logros de ${x.nombre.toLowerCase()}`,`¿Cuántos ${id===1?'niños de primera infancia':id===2?'niños de infancia':'adolescentes'} se benefician?`,'¿Qué curso de vida tiene mayor cumplimiento?'],ir:{label:'Ver en el tablero',eje:id,ruta:'avance'}}},
 lineas100(){const t=T();const L=Object.values(t.LIN).filter(l=>l.c>=100).sort((a,b)=>a.l.localeCompare(b.l,undefined,{numeric:true}));
  return {html:`${CTX}<p><b>${L.length}</b> líneas estratégicas tienen todas sus acciones al 100 %:</p><ul class="ia-ul">${L.map(l=>`<li><span class="ia-dot" style="background:${ejeCol(l.e)}"></span><b>${linNom(l.l)}</b> · ${esc(t.ejeDe(l.e).nombre)} · ${l.acc.length} acción(es)</li>`).join('')}</ul>`,chips:['Dame las 5 acciones con mejor desempeño','¿Cuáles son los principales logros?']}},
 accion(e){const t=T();
  if(e.accNo&&!e.acc)return {html:`${CTX}<p>La acción <b>${esc(e.accNo)}</b> no registra actividades en la matriz de 2026. Puedes preguntarme por otra acción, por ejemplo la 1.4.1.</p>`,chips:['Dame las 5 acciones con mejor desempeño']};
  if(!e.acc)return H.eje(e);
  const a=t.ACC[e.acc];const x=t.ejeDe(a.e);
  return {html:`${CTX}<p><b>Acción ${e.acc}</b> · ${esc(x.nombre)} · línea ${linNom(a.l)} · cumplimiento <b>${pct(a.c)}</b>.</p><p class="ia-sub">${esc(a.an)}</p>
   <p class="ia-sub">Responsable(s): <b>${esc([...new Set(a.acts.map(z=>z.r))].join(', '))}</b></p><ul class="ia-acts">${a.acts.filter(t.VIS).map(z=>`<li><span>${esc(z.d)}</span><small>${esc(z.r)} · ${fmt(z.s1+z.s2)} de ${z.p==null?'—':fmt(z.p)} · <b>${pct(z.c,0)}</b> · ${t.estado(z.c)}</small>${(/evidencia|soporte/.test(e.q)&&z.ev)?`<small><i class="fa-solid fa-paperclip"></i> Evidencia: ${esc(z.ev)}</small>`:''}</li>`).join('')}</ul>`,
   chips:['Dame las 5 acciones con mejor desempeño',`Dame el avance de la línea estratégica ${a.l}`],linea:a.l}},
 oportunidad(e){const t=T();const id=e.eje;const n=e.n||5;
  const L=t.ALL_ACC.filter(a=>(!id||a.e===id)&&a.c>0&&a.c<100).sort((a,b)=>a.c-b.c).slice(0,n);
  if(!L.length)return {html:`${CTX}<p>¡Buenas noticias! ${id?'En '+esc(t.ejeDe(id).nombre)+' t':'T'}odas las acciones con avance ya están al 100 %.</p>`,chips:['¿Cuáles son los principales logros?']};
  return {html:`${CTX}<p>Estas son las acciones con mayor oportunidad de avance para el cierre de 2026${id?' en '+esc(t.ejeDe(id).nombre):''}. Ya tienen gestión reportada y pueden completarse en el segundo semestre:</p>
   ${barras(L.map(a=>[accNom(a.a),a.c,ejeCol(a.e),`${a.acts.filter(z=>t.VIS(z)&&z.c<100).length} actividad(es) en avance`]))}
   ${nota('Al corte de octubre, buena parte de estas actividades tiene programado el segundo semestre; su cumplimiento debería subir al cierre de la vigencia.')}`,
   chips:[`¿Cómo va la acción ${L[0].a}?`,'¿Qué recomiendas priorizar?'],ir:{label:'Ver acciones en el tablero',eje:id||0,ruta:'avance'}}},
 mejores(e){const t=T();const id=e.eje;const n=e.n||5;
  const L=t.ALL_ACC.filter(a=>(!id||a.e===id)&&a.c>0).sort((a,b)=>b.c-a.c||b.acts.filter(t.VIS).length-a.acts.filter(t.VIS).length).slice(0,n);
  const al100=t.ALL_ACC.filter(a=>(!id||a.e===id)&&a.c>=100).length;
  return {html:`${CTX}<p>${L.length===1?'La acción con mejor desempeño':'Las <b>'+L.length+'</b> acciones con mejor desempeño'}${id?' en '+esc(t.ejeDe(id).nombre):''}. En total, <b>${al100}</b> acciones están al 100 %.</p>${barras(L.map(a=>[accNom(a.a),a.c,ejeCol(a.e),`${a.acts.filter(t.VIS).length} actividad(es)`]))}`,
   chips:['¿Qué líneas están al 100 %?','¿Cuáles son los principales logros?']}},
 recomendacion(){const t=T();const low=t.ALL_ACC.filter(a=>a.c>0&&a.c<100).sort((a,b)=>a.c-b.c).slice(0,3);const s2=t.ACT.filter(a=>t.VIS(a)&&a.c<100&&!a.s2).length;
  const items=[];
  if(low.length)items.push(`<b>Completar en el segundo semestre las acciones en avance:</b> ${low.map(a=>`${a.a} (${pct(a.c,0)})`).join(', ')}.`);
  if(s2)items.push(`<b>Registrar la ejecución del segundo semestre</b> en ${s2} actividades que aún no la reportan, para reflejar el avance real al cierre.`);
  items.push('<b>Sostener los programas de mayor alcance</b>, como la Ludoteca, el Día de la Niñez, las escuelas artísticas y deportivas, y la prevención del abuso sexual infantil.');
  items.push('<b>Entregar el CDI La Punta</b>, que ampliará la atención de primera infancia en cerca de 100 cupos.');
  items.push('<b>Ampliar el reporte de adolescencia</b>: sus 5 acciones gestionadas están al 100 %, y sumar más acciones de las líneas de salud, educación y participación aumentará el aporte a la implementación total.');
  return {html:`${CTX}<p>Con base en los datos de 2026, sugiero priorizar:</p><ol class="ia-ul">${items.map(i=>`<li>${i}</li>`).join('')}</ol>${nota('Son sugerencias automáticas a partir de los datos del tablero; deben validarse con el equipo de la política.')}`,
   chips:['¿Qué acciones tienen mayor oportunidad de avance?','¿Qué actividades siguen en avance?']}},
 poblacion(e){const P=T().POB;const nna=totBen();const obj=P.hab*P.share/100;
  if(e.grupo==='cuid')return {html:`<p>La política vincula aproximadamente a <b>${fmt(P.cuid)}</b> padres, madres y cuidadores en 2026.</p><p class="ia-sub">Entre ellos, 1.309 cuidadores en la Ludoteca, 416 madres gestantes y lactantes y 100 padres en encuentros de crianza.</p>${nota('Estimación que descuenta la participación de una misma persona en varios programas.')}`,chips:['¿Cuál es la población beneficiada?']};
  if(e.eje){const g=P.grupos[e.eje-1];const u=obj*g.w;return {html:`<p><b>${esc(g.g)} (${g.e}):</b> aproximadamente <b>${fmt(g.b)}</b> beneficiarios en 2026, cerca del <b>${pct(g.b/u*100,0)}</b> de los ≈ ${fmt(Math.round(u/100)*100)} niñas, niños o adolescentes estimados en ese curso de vida.</p>${nota('Estimación que descuenta la participación de un mismo niño en varios programas.')}`,chips:['¿Cuál es la población beneficiada?','¿Cuántos cuidadores se benefician?'],ir:{label:'Ver población en el tablero',ruta:'poblacion'}}}
  return {html:`<p>En 2026 la política llega aproximadamente a <b>${fmt(nna)} niñas, niños y adolescentes</b>, cerca del <b>${pct(nna/obj*100,0)}</b> de los ≈ ${fmt(obj)} habitantes de 0 a 17 años de Tenjo, y a <b>${fmt(P.cuid)}</b> padres, madres y cuidadores.</p>
   ${kpis(P.grupos.map(g=>['≈ '+fmt(g.b),g.g]).concat([['≈ '+fmt(P.cuid),'Cuidadores']]))}
   <p class="ia-sub">Programas con mayor alcance: ${T().AT.nna.slice(0,5).map(x=>`${esc(x[0])} (${fmt(x[1])})`).join(', ')}.</p>${nota('Estimación sobre 28.000 habitantes, con un 25 % de población entre 0 y 17 años.')}`,
   chips:['¿Cuántos niños de primera infancia se benefician?','¿Cómo se estima la población beneficiada?'],ir:{label:'Ver población en el tablero',ruta:'poblacion'}}},
 estimacion(){return {html:`<p>Así se estima la población beneficiada:</p><ol class="ia-ul"><li>Tenjo tiene cerca de <b>28.000 habitantes</b> y se asume que el <b>25 %</b> tiene entre 0 y 17 años (≈ 7.000).</li><li>Los programas reportan cerca de <b>13.800 atenciones</b>; como un mismo niño participa en varias actividades, en cada curso de vida se toma el programa de mayor cobertura y se suman los que llegan a grupos distintos.</li><li>Resultado: <b>≈ ${fmt(totBen())}</b> niñas, niños y adolescentes y <b>≈ ${fmt(T().POB.cuid)}</b> padres, madres y cuidadores.</li></ol><p class="ia-sub">En la página de Población puedes mover el supuesto del porcentaje de 0 a 17 años.</p>`,chips:['¿Cuál es la población beneficiada?'],ir:{label:'Ver población en el tablero',ruta:'poblacion'}}},
 dependencia(e){const t=T();const fe=e.dep?0:(e.eje||0);const V=visAct().filter(a=>!fe||a.e===fe);
  const deps=[...new Set(V.map(a=>a.r))].map(d=>{const xs=V.filter(a=>a.r===d);return {d,n:xs.length,c:xs.reduce((s,a)=>s+a.c,0)/xs.length,xs}}).sort((a,b)=>b.n-a.n);
  if(e.dep){const d=deps.find(x=>x.d===e.dep);if(!d)return {html:`${CTX}<p>${esc(e.dep)} no registra actividades con avance en 2026.</p>`};
   return {html:`${CTX}<p><b>${esc(d.d)}</b>: ${d.n} actividades con avance y un cumplimiento promedio de <b>${pct(d.c)}</b>.</p><ul class="ia-acts">${d.xs.slice(0,8).map(x=>`<li><span>${esc(x.d)}</span><small>${x.cod} · ${pct(x.c,0)} · ${t.estado(x.c)}</small></li>`).join('')}</ul>${d.xs.length>8?`<p class="ia-sub">Y ${d.xs.length-8} actividades más en el tablero.</p>`:''}`,chips:['¿Qué dependencia tiene más actividades?'],ir:{label:'Ver dependencias',ruta:'dependencias'}}}
  return {html:`${CTX}<p>${fe?`En ${esc(t.ejeDe(fe).nombre)} participan <b>${deps.length}</b> dependencias. `:`En la política participan <b>${deps.length}</b> dependencias. `}La que tiene más actividades con avance es <b>${esc(deps[0].d)}</b> (${deps[0].n}).</p><table class="ia-tbl"><tr><th>Dependencia</th><th>Activ.</th><th>Cumpl.</th></tr>${deps.map(d=>`<tr><td>${esc(d.d)}</td><td>${d.n}</td><td><b>${pct(d.c)}</b></td></tr>`).join('')}</table>`,
   chips:['¿Qué hace la Comisaría de Familia?','¿Qué hace Salud Pública?'],ir:{label:'Ver dependencias',ruta:'dependencias'}}},
 semestre(){const t=T();const V=visAct();
  const r=t.EJES.map(x=>[x,V.filter(a=>a.e===x.id&&a.s1>0).length,V.filter(a=>a.e===x.id&&a.s2>0).length]);
  const t1=r.reduce((s,x)=>s+x[1],0),t2=r.reduce((s,x)=>s+x[2],0);
  return {html:`${CTX}<p>En <b>2026</b>, <b>${t1}</b> actividades reportan ejecución en el primer semestre y <b>${t2}</b> en el segundo.</p><table class="ia-tbl"><tr><th>Curso de vida</th><th>Sem. 1</th><th>Sem. 2</th></tr>${r.map(([x,a,b])=>`<tr><td><span class="ia-dot" style="background:${x.c}"></span>${esc(x.nombre)}</td><td>${a}</td><td>${b}</td></tr>`).join('')}</table>${nota('El segundo semestre de 2026 está en curso (corte octubre).')}`,chips:['¿Qué actividades siguen en avance?']}},
 actividades(e){const t=T();const id=e.eje;const V=visAct().filter(a=>!id||a.e===id);
  const c=V.filter(a=>a.c>=100),p=V.filter(a=>a.c<100);
  const wantP=/avance|pendiente|ejecucion|faltan|curso|siguen/.test(e.q);
  const lista=(wantP?p:c).slice(0,8);
  return {html:`${CTX}<p>En <b>2026</b>${id?' ('+esc(t.ejeDe(id).nombre)+')':''} hay <b>${V.length}</b> actividades con avance: <b>${c.length}</b> cumplidas y <b>${p.length}</b> en avance.</p>
   ${kpis([[String(c.length),'cumplidas'],[String(p.length),'en avance'],[pct(V.length?c.length/V.length*100:0,0),'cumplidas del total']])}
   <p class="ia-sub">${wantP?'Actividades en avance':'Algunas actividades cumplidas'}:</p><ul class="ia-acts">${lista.map(x=>`<li><span>${esc(x.d)}</span><small>${x.cod} · ${esc(x.r)} · <b>${pct(x.c,0)}</b></small></li>`).join('')}</ul>`,
   chips:[wantP?'¿Cuántas actividades están cumplidas?':'¿Qué actividades siguen en avance?','¿Cómo fue la ejecución por semestre?'],ir:{label:'Abrir el explorador',eje:id||0,ruta:'actividades'}}},
 logros(e){const t=T();const id=e.eje;let L=t.LOGROS.filter(l=>!id||l[0]===id);if(!L.length)L=t.LOGROS;
  return {html:`${CTX}<p>Principales logros de <b>2026</b>${id?' en '+esc(t.ejeDe(id).nombre):''}:</p><ul class="ia-logros">${L.slice(0,e.n||6).map(l=>`<li><b style="color:${ejeCol(l[0])}">${esc(l[3])}</b> <small>${esc(l[4])}</small><span><b>${esc(l[5])}.</b> ${esc(l[6])}</span></li>`).join('')}</ul>`,
   chips:t.EJES.filter(x=>x.id!==id).map(x=>`Logros de ${x.nombre.toLowerCase()}`),ir:{label:'Ver logros',eje:id||0,ruta:'logros'}}},
 pdt(e){const M=T().METAS;
  if(e&&e.meta){const m=M.find(x=>x[0]===e.meta);if(m)return {html:`<p><b>Meta ${m[0]} del Plan de Desarrollo · ${esc(m[1])}:</b> ${esc(m[2])}.</p>`,chips:['¿Qué metas del Plan de Desarrollo respaldan la política?','¿Cuántos recursos tiene asociados la política?']};
   return {html:`<p>La meta ${esc(e.meta)} no está entre las metas destacadas que respaldan la política en el tablero. Las metas destacadas son: ${M.map(m=>m[0]).join(', ')}.</p>`}}
  return {html:`<p>La política se articula con <b>34 metas de producto</b> del Plan de Desarrollo Territorial; <b>19</b> alcanzaron el 100 % de su meta anual en el último reporte consolidado (vigencia 2025), con recursos asociados por cerca de <b>$3.007 millones</b>.</p><p class="ia-sub">Metas cumplidas destacadas:</p><ul class="ia-ul">${M.map(m=>`<li><b>Meta ${m[0]} · ${esc(m[1])}:</b> ${esc(m[2])}</li>`).join('')}</ul>`,chips:['¿Qué dependencia tiene más actividades?'],ir:{label:'Ver Dependencias y PDT',ruta:'dependencias'}}},
 metodologia(){const t=T();return {html:`<p>Así se calcula el avance en el tablero:</p><ol class="ia-ul"><li><b>Actividad:</b> ejecución del semestre 1 + semestre 2 sobre lo programado, con un máximo de 100 %.</li><li><b>Acción:</b> promedio de sus actividades.</li><li><b>Cumplimiento del plan:</b> promedio de las acciones gestionadas en 2026 (${t.ALL_ACC.length}).</li><li><b>Aporte a la implementación total:</b> suma del cumplimiento de las acciones gestionadas sobre las ${t.TOTAL_ACC} acciones de la política. Peso de cada curso de vida: ${t.EJES.map(x=>`${esc(x.nombre)} ${pct(x.peso,2)}`).join(', ')}.</li></ol>`,chips:['¿Cuál es el aporte de 2026 a la implementación total?']}},
 estructura(){const t=T();return {html:`<p>La <b>Política Pública de Primera Infancia, Infancia y Adolescencia</b> de Tenjo se organiza en <b>3 cursos de vida</b>, <b>24 líneas estratégicas</b> y <b>${t.TOTAL_ACC} acciones</b>:</p><ul class="ia-ul">${t.EJES.map(x=>`<li><span class="ia-dot" style="background:${x.c}"></span><b>${esc(x.nombre)} (${x.edad})</b> · ${x.lineas} líneas · ${x.acciones} acciones · peso ${pct(x.peso,1)}<br><small>${Object.keys(t.LN).filter(k=>+k[0]===x.id).map(k=>k+' '+esc(t.LN[k][0])).join(' · ')}</small></li>`).join('')}</ul><p>El tablero hace seguimiento a la vigencia 2026 con corte a octubre.</p>`,chips:['Dame el avance de la línea estratégica 1.4','¿Cómo se calcula el avance?']}},
 informe(){return {html:`<p>Puedo llevarte a la página de <b>Informes PDF</b>, donde eliges el curso de vida y las secciones y descargas el informe de avance de 2026 en tamaño carta.</p>`,chips:['Redacta un texto con los resultados de 2026'],ir:{label:'Ir a Informes PDF',ruta:'informes'}}},
 fuente(){return {html:`<p>Los datos del tablero provienen de la <b>matriz de seguimiento de la Política Pública de Primera Infancia, Infancia y Adolescencia</b> del municipio de Tenjo y de su relación con el <b>Plan de Desarrollo Territorial</b>.</p><ul class="ia-ul"><li><b>Vigencia:</b> 2026.</li><li><b>Fecha de corte:</b> octubre de 2026; varias actividades del segundo semestre siguen en ejecución.</li><li><b>Población:</b> estimación sobre 28.000 habitantes, con un 25 % de población entre 0 y 17 años.</li></ul>`,chips:['¿Cómo se calcula el avance?','¿Cómo se estima la población beneficiada?']}},
 cifra(e){const c=e.cifra;if(!c)return null;
  return {html:`<div class="ia-big"><b>${esc(c[1])}</b><span>${esc(c[2])}</span></div><p class="ia-sub">${esc(c[3])}</p>`,chips:['¿Cuál es la población beneficiada?','Busca actividades sobre '+c[0][0]]}},
 redactar(){const t=T();const v=visAct();const cumplidas=v.filter(a=>a.c>=100).length;const P=t.POB;const nna=totBen();
  const ord=t.EJES.slice().sort((a,b)=>b.cumpl-a.cumpl);const L=t.LOGROS.slice(0,5);
  const txt=`La Política Pública de Primera Infancia, Infancia y Adolescencia del municipio de Tenjo registra en la vigencia 2026, con corte a octubre, un cumplimiento del ${pct(t.G_CUMPL)} en su plan de acción, con ${t.ALL_ACC.length} acciones gestionadas y ${v.length} actividades con avance, ${cumplidas} de ellas cumplidas al 100 %. El curso de vida con mayor desempeño es ${ord[0].nombre}, con ${pct(ord[0].cumpl)}. Entre los principales resultados se destacan: ${L.map(l=>`${l[5]} (${l[3]} ${l[4]})`).join('; ')}. La política llega aproximadamente a ${fmt(nna)} niñas, niños y adolescentes, cerca del ${pct(nna/(P.hab*P.share/100)*100,0)} de la población de 0 a 17 años, y a ${fmt(P.cuid)} padres, madres y cuidadores.`;
  return {html:`<p>Este es un texto listo para usar en informes, presentaciones o comunicaciones:</p><div class="ia-texto">${esc(txt)}</div>`,copiar:txt,chips:['¿Cuáles son los principales logros?','¿Cuál es la población beneficiada?']}},
 buscar(e){const t=T();const terms=e.temas.length?e.temas:e.q.split(' ').filter(w=>w.length>4);
  const puntaje=(a,ts)=>{const s=norm(a.d+' '+a.r+' '+a.an);return ts.filter(k=>s.includes(k)).length};
  const elegir=ts=>{const sc=visAct().map(a=>[a,puntaje(a,ts)]).filter(x=>x[1]>0);const mx=Math.max(0,...sc.map(x=>x[1]));return sc.filter(x=>x[1]===mx).map(x=>x[0])};
  let L=elegir(terms);
  if(!L.length&&e.temas.length){const sueltas=[...new Set(e.temas.flatMap(k=>k.split(' ')).filter(w=>w.length>4))];if(sueltas.length)L=elegir(sueltas)}
  const lg=t.LOGROS.filter(l=>terms.some(k=>norm(l.join(' ')).includes(k)));
  if(!L.length&&!lg.length)return null;
  return {html:`${CTX}${L.length?`<p>Encontré <b>${L.length}</b> actividad(es) relacionadas:</p><ul class="ia-acts">${L.slice(0,6).map(x=>`<li><span>${esc(x.d)}</span><small>${x.cod} · ${esc(x.r)} · ${fmt(x.s1+x.s2)} de ${x.p==null?'—':fmt(x.p)} · <b>${pct(x.c,0)}</b></small></li>`).join('')}</ul>`:''}${lg.length?`<p class="ia-sub">Logros relacionados: ${lg.slice(0,3).map(l=>`<b>${esc(l[5])}</b>: ${esc(l[3])} ${esc(l[4])}`).join('; ')}.</p>`:''}`,
   chips:['¿Cuál es la población beneficiada?','¿Cuáles son los principales logros?']}}
};

/* ======================= MOTOR ======================= */
let ctx={};
function responder(texto){
  const q=norm(texto);if(!q)return null;
  if(/ver todas las preguntas|todas las preguntas|lista de preguntas/.test(q))return {html:'<p>Estas son las preguntas que puedes hacerme. Toca cualquiera para enviarla:</p>',todas:true};
  const e=entidades(q);e.q=q;
  let it=intencion(q,e);
  if(!it&&(e.eje||e.acc||e.linea)&&ctx.it&&!['saludo','ayuda'].includes(ctx.it)){it=ctx.it;if(!e.eje&&ctx.eje&&!e.acc)e.eje=ctx.eje;if(!e.acc&&ctx.acc&&it==='accion')e.acc=ctx.acc}
  if(it==='accion'&&!e.acc&&ctx.acc&&/(esa|esta|la misma)/.test(q))e.acc=ctx.acc;
  let r=null;
  if(it&&H[it])r=H[it](e);
  if(!r&&(e.temas.length||q.split(' ').length>1))r=H.buscar(e);
  if(!r)return {html:`<p>No estoy seguro de haber entendido. Puedo responder sobre el avance por curso de vida, línea o acción, las acciones destacadas, la población beneficiada, los logros, las dependencias y las metas del Plan de Desarrollo.</p>`,chips:['¿Cómo va la política en 2026?','¿Cuáles son los principales logros?','Ver todas las preguntas']};
  ctx={it,eje:e.eje||ctx.eje,acc:e.acc||ctx.acc};
  r._it=it;return r}
window.incluResponder=responder;window.juaicoPreguntas=PREGUNTAS;

/* ======================= INTERFAZ ======================= */
function montar(){
  const fab=document.createElement('button');fab.className='ia-fab';fab.id='iaFab';fab.setAttribute('aria-label','Abrir el asistente '+NOMBRE);
  fab.innerHTML=`<span class="ia-fab-av"><span class="ia-sombra"></span><img class="ia-pj" src="assets/juaico-mini.webp?v=4" alt=""><i class="ia-star s1"></i><i class="ia-star s2"></i><i class="ia-star s3"></i></span><span class="ia-fab-txt"><b>Pregúntale a ${NOMBRE}</b><small>Asistente del tablero</small></span><span class="ia-burbuja">¡Hola! Soy ${NOMBRE} 👋</span>`;
  const pnl=document.createElement('section');pnl.className='ia-pnl';pnl.id='iaPnl';pnl.setAttribute('aria-label','Asistente '+NOMBRE);
  pnl.innerHTML=`<header class="ia-h"><img class="ia-h-pj" src="assets/juaico-mini.webp?v=4" alt=""><div><b>${NOMBRE}</b><small><span class="ia-on"></span>Asistente de la PP de Infancia</small></div>
     <button class="ia-hb" id="iaWel" title="Ver bienvenida"><i class="fa-solid fa-hand-sparkles"></i></button><button class="ia-hb" id="iaLib" title="Preguntas sugeridas"><i class="fa-solid fa-lightbulb"></i></button><button class="ia-hb" id="iaClr" title="Nueva conversación"><i class="fa-solid fa-rotate-left"></i></button><button class="ia-hb" id="iaX" title="Cerrar"><i class="fa-solid fa-xmark"></i></button></header>
   <div class="ia-msgs" id="iaMsgs" aria-live="polite"></div>
   <div class="ia-lib" id="iaLibBox" hidden></div>
   <form class="ia-in" id="iaForm"><input id="iaQ" autocomplete="off" placeholder="Pregúntale a ${NOMBRE}… ej. avance de la acción 1.4.1" aria-label="Escribe tu pregunta"><button aria-label="Enviar"><i class="fa-solid fa-paper-plane"></i></button></form>
   <div class="ia-foot">Responde con los datos del tablero · no envía información a servidores</div>`;
  document.body.append(fab,pnl);
  const msgs=$('#iaMsgs');
  const abrir=()=>{pnl.classList.add('on');fab.classList.add('off');const jv=$('#jwVideo');if(jv){jv.pause();jv.muted=true}if(!msgs.children.length)bienvenida();vozBanner();setTimeout(()=>$('#iaQ').focus(),200)};
  const cerrar=()=>{pnl.classList.remove('on');fab.classList.remove('off');msgs.querySelectorAll('.ia-bvideo').forEach(v=>{v.pause();v.muted=true;bsUI(v)})};
  function bsUI(v){const b=v&&v.parentNode.querySelector('.ia-bsonido');if(!b)return;b.innerHTML=`<i class="fa-solid ${v.muted?'fa-volume-xmark':'fa-volume-high'}"></i>`;b.title=v.muted?'Activar sonido':'Silenciar';b.setAttribute('aria-label',b.title);b.classList.toggle('on',!v.muted)}
  function reproducir(v,sonido){v.muted=!sonido;const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{if(!v.muted){v.muted=true;v.play().catch(()=>{})}bsUI(v)});bsUI(v)}
  function vozBanner(){const vs=msgs.querySelectorAll('.ia-bvideo'),v=vs[vs.length-1];if(!v)return;vs.forEach(o=>{if(o!==v){o.pause();o.muted=true;bsUI(o)}});v.loop=false;try{v.currentTime=0}catch(e){}reproducir(v,true)}
  // Al terminar el saludo con voz, el video sigue en silencio y en bucle
  msgs.addEventListener('ended',e=>{const v=e.target;if(v.classList&&v.classList.contains('ia-bvideo')){v.loop=true;reproducir(v,false)}},true);
  msgs.addEventListener('click',e=>{const b=e.target.closest('.ia-bsonido');if(!b)return;const v=b.parentNode.querySelector('.ia-bvideo');if(v.muted){if(v.loop){v.loop=false;try{v.currentTime=0}catch(err){}}reproducir(v,true)}else{v.muted=true;bsUI(v)}});
  fab.onclick=abrir;$('#iaX').onclick=cerrar;
  $('#iaClr').onclick=()=>{msgs.innerHTML='';ctx={};bienvenida();vozBanner()};
  $('#iaLib').onclick=()=>{const b=$('#iaLibBox');b.hidden=!b.hidden;if(!b.hidden)b.innerHTML=libHTML()};
  $('#iaLibBox').onclick=ev=>{const c=ev.target.closest('[data-q]');if(c){$('#iaLibBox').hidden=true;enviar(c.dataset.q)}};
  $('#iaForm').onsubmit=ev=>{ev.preventDefault();const v=$('#iaQ').value.trim();if(v){$('#iaQ').value='';enviar(v)}};
  msgs.onclick=ev=>{const c=ev.target.closest('[data-q]');if(c)return enviar(c.dataset.q);const cp=ev.target.closest('[data-copy]');if(cp){const t=cp.dataset.copy;const ok=()=>T().toast('Texto copiado');const alt=()=>{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();ok()};if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,alt);else alt();return}const g=ev.target.closest('[data-go]');if(g)irA(JSON.parse(g.dataset.go));const l=ev.target.closest('[data-lin]');if(l){const x=T().LIN[l.dataset.lin];if(x)T().modalLinea(x)}};
  addEventListener('keydown',ev=>{if(ev.key==='Escape'&&pnl.classList.contains('on')&&!document.querySelector('.modal.on'))cerrar()});
  document.querySelectorAll('[data-ia-open]').forEach(a=>a.addEventListener('click',ev=>{ev.preventDefault();abrir()}));
  /* ---- Ventana de bienvenida ---- */
  const wel=document.createElement('div');wel.className='jw';wel.id='jw';wel.setAttribute('role','dialog');wel.setAttribute('aria-modal','true');wel.setAttribute('aria-label','Bienvenida de '+NOMBRE);
  const estrellas=Array.from({length:22},(_,i)=>`<i style="left:${(i*37)%100}%;top:${(i*53)%62}%;animation-delay:${(i%7)*.45}s;transform:scale(${.6+(i%4)*.25})"></i>`).join('');
  wel.innerHTML=`<div class="jw-card">
     <div class="jw-arte"><video class="jw-video" id="jwVideo" src="assets/juaico-video.mp4?v=3" poster="assets/juaico-poster.jpg?v=3" muted loop playsinline preload="metadata" aria-label="${NOMBRE} caminando y saludando en el parque principal de Tenjo"></video><span class="jw-velo"></span><button class="jw-sonido" id="jwSonido" aria-label="Activar sonido" title="Activar sonido"><i class="fa-solid fa-volume-xmark"></i></button><span class="jw-escucha" id="jwEscucha"><i class="fa-solid fa-volume-high"></i> Escucha a JUAICO</span><img class="jw-pj-mini" src="assets/juaico-mini.webp?v=4" alt=""><span class="jw-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Asistente del tablero</span></div>
     <div class="jw-txt">
       <button class="jw-x" aria-label="Cerrar bienvenida"><i class="fa-solid fa-xmark"></i></button>
       <span class="jw-kick">Alcaldía de Tenjo · PP de Infancia y Adolescencia</span>
       <h2>¡Hola! Soy <span>${NOMBRE}</span> 👋</h2>
       <p class="jw-type" id="jwType"></p>
       <ul class="jw-list">
         <li style="--d:.2s"><i class="fa-solid fa-chart-line"></i>Te cuento el avance de cada curso de vida, línea y acción</li>
         <li style="--d:.35s"><i class="fa-solid fa-people-group"></i>Te muestro la población beneficiada y los logros</li>
         <li style="--d:.5s"><i class="fa-solid fa-lightbulb"></i>Te sugiero prioridades y redacto textos de resultados</li>
         <li style="--d:.65s"><i class="fa-solid fa-file-pdf"></i>Te llevo a los informes en PDF y a cada página del tablero</li>
       </ul>
       <div class="jw-btns"><button class="jw-b1" id="jwChat"><i class="fa-solid fa-comments"></i> Conversar con ${NOMBRE}</button><button class="jw-b2" id="jwTab"><i class="fa-solid fa-gauge-high"></i> Explorar el tablero</button></div>
       <label class="jw-no"><input type="checkbox" id="jwNo"> No volver a mostrar esta bienvenida</label>
     </div></div>`;
  document.body.appendChild(wel);
  const SALUDO='Soy el asistente de la Política Pública de Primera Infancia, Infancia y Adolescencia de Tenjo. Estoy aquí para ayudarte a entender el tablero: pregúntame lo que quieras sobre su avance y sus resultados.';
  let tTimer=null;
  function escribir(){const el=$('#jwType');el.textContent='';el.classList.add('cur');let i=0;clearInterval(tTimer);
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=SALUDO;el.classList.remove('cur');return}
    tTimer=setInterval(()=>{el.textContent=SALUDO.slice(0,++i);if(i>=SALUDO.length){clearInterval(tTimer);setTimeout(()=>el.classList.remove('cur'),1200)}},18)}
  function verBienvenida(){wel.classList.add('on');document.body.classList.add('jw-abierta');const v=$('#jwVideo');if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches){try{v.currentTime=0}catch(e){}const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{})}setTimeout(escribir,450);setTimeout(()=>$('#jwChat').focus(),500)}
  function cerrarBienvenida(){wel.classList.remove('on');document.body.classList.remove('jw-abierta');clearInterval(tTimer);const v=$('#jwVideo');if(v){v.pause();v.muted=true;sonidoUI()}
    try{sessionStorage.setItem('jwVisto-inf','1');if($('#jwNo').checked)localStorage.setItem('jwNo-inf','1')}catch(e){}
    setTimeout(()=>{fab.classList.add('hola');setTimeout(()=>fab.classList.remove('hola'),6000)},500)}
  $('#jwChat').onclick=()=>{cerrarBienvenida();setTimeout(abrir,250)};
  function sonidoUI(){const v=$('#jwVideo'),b=$('#jwSonido');if(!v||!b)return;b.innerHTML=`<i class="fa-solid ${v.muted?'fa-volume-xmark':'fa-volume-high'}"></i>`;b.title=v.muted?'Activar sonido':'Silenciar';b.setAttribute('aria-label',b.title);b.classList.toggle('on',!v.muted);const t=$('#jwEscucha');if(t)t.classList.toggle('off',!v.muted)}
  $('#jwEscucha').onclick=()=>$('#jwSonido').click();
  $('#jwSonido').onclick=()=>{const v=$('#jwVideo');v.muted=!v.muted;if(v.paused){const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{})}sonidoUI()};
  $('#jwTab').onclick=cerrarBienvenida;wel.querySelector('.jw-x').onclick=cerrarBienvenida;
  wel.onclick=ev=>{if(ev.target===wel)cerrarBienvenida()};
  addEventListener('keydown',ev=>{if(ev.key==='Escape'&&wel.classList.contains('on'))cerrarBienvenida()});
  $('#iaWel').onclick=()=>{cerrar();setTimeout(verBienvenida,200)};
  window.juaicoBienvenida=verBienvenida;
  let mostrar=true;try{mostrar=!sessionStorage.getItem('jwVisto-inf')&&localStorage.getItem('jwNo-inf')!=='1'}catch(e){}
  if(mostrar)setTimeout(verBienvenida,900);
  else try{if(!sessionStorage.getItem('iaHola')){setTimeout(()=>fab.classList.add('hola'),1800);setTimeout(()=>fab.classList.remove('hola'),9000);sessionStorage.setItem('iaHola','1')}}catch(e){}
  function libHTML(){return PREGUNTAS.map(([c,ic,qs])=>`<div class="ia-cat"><h6><i class="fa-solid ${ic}"></i>${c}</h6>${qs.map(q=>`<button data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>`).join('')}
  function bienvenida(){bot({html:`<div class="ia-banner"><video class="ia-bvideo" src="assets/juaico-video.mp4?v=3" poster="assets/juaico-poster.jpg?v=3" muted playsinline preload="auto" aria-label="${NOMBRE} saludando en Tenjo"></video><button class="ia-bsonido" aria-label="Activar sonido" title="Activar sonido"><i class="fa-solid fa-volume-xmark"></i></button></div><p>¡Hola! Soy <b>${NOMBRE}</b> 👋, el asistente del tablero de la Política Pública de Primera Infancia, Infancia y Adolescencia de Tenjo.</p><p>Pregúntame por el avance de un curso de vida, línea o acción, por la población beneficiada, los logros o las dependencias.</p>`,chips:['¿Cómo va la política en 2026?','¿Cómo va primera infancia?','¿Cuáles son los principales logros?','¿Cuál es la población beneficiada?','Ver todas las preguntas']},true)}
  function user(t){const d=document.createElement('div');d.className='ia-m u';d.innerHTML=`<div class="ia-b">${esc(t)}</div>`;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function bot(r,inst){const d=document.createElement('div');d.className='ia-m b';
    const tools=`${r.ir?`<button class="ia-go" data-go='${esc(JSON.stringify(r.ir))}'><i class="fa-solid fa-arrow-up-right-from-square"></i>${esc(r.ir.label)}</button>`:''}${r.copiar?`<button class="ia-go" data-copy="${esc(r.copiar)}"><i class="fa-solid fa-copy"></i>Copiar texto</button>`:''}${r.linea?`<button class="ia-go" data-lin="${esc(r.linea)}"><i class="fa-solid fa-magnifying-glass-chart"></i>Ver detalle de la línea</button>`:''}`;
    d.innerHTML=`<img class="ia-av" src="assets/juaico-mini.webp?v=4" alt=""><div class="ia-b">${r.html}${r.todas?`<div class="ia-libin">${libHTML()}</div>`:''}${tools?`<div class="ia-tools">${tools}</div>`:''}${r.chips&&r.chips.length?`<div class="ia-chips">${r.chips.map(c=>`<button data-q="${esc(c)}">${esc(c)}</button>`).join('')}</div>`:''}</div>`;
    if(inst){msgs.appendChild(d);return}
    const t=document.createElement('div');t.className='ia-m b';t.innerHTML='<img class="ia-av" src="assets/juaico-mini.webp?v=4" alt=""><div class="ia-b ia-typing"><i></i><i></i><i></i></div>';msgs.appendChild(t);msgs.scrollTop=msgs.scrollHeight;
    setTimeout(()=>{t.replaceWith(d);d.classList.add('in');msgs.scrollTop=msgs.scrollHeight-d.offsetHeight-20},450+Math.random()*350)}
  function enviar(t){user(t);let r;try{r=responder(t)}catch(err){console.error(err);r={html:'<p>Tuve un problema al calcular esa respuesta. Intenta formularla de otra manera.</p>'}}bot(r)}
  function irA(o){if(o.eje!=null&&o.eje!==T().S.eje)T().setEje(o.eje);location.hash='#/'+o.ruta;if(innerWidth<760)cerrar()}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',montar);else montar();
})();

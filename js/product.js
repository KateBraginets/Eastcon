/* Страница «Массажные кресла»: меню «Продукция», подвал, галерея. Зависимостей нет. */
const BASE=window.EASTCON_BASE||(document.currentScript?document.currentScript.src.replace(/js\/product\.js.*$/,''):'');
const MURL=window.EASTCON_MASSAGE_URL||'massage-chairs.html',HOME=window.EASTCON_HOME_URL||'index.html';
const $=s=>document.querySelector(s);
const IMG={kitchen:'cat-kitchen',sleep:'cat-sleep',iron:'cat-iron',air_c:'cat-air',massage:'cat-massage',laser_c:'cat-laser',travel:'cat-travel',other:'cat-other',aquamini:'cat-aquavita'};
const C=[['Кухонные системы','Для приготовления и сервировки','kitchen'],['Спальные системы','Комфортный отдых каждый день','sleep'],['Гладильная система','Уход за одеждой и тканями','iron'],['Система очистки воздуха','Чистый воздух дома','air_c'],['Массажные кресла','Расслабление и восстановление','massage'],['Лазерная терапия','Технологии для домашнего применения','laser_c'],['Бюро путешествий','Путешествия и впечатления','travel'],['Прочие продукты','Другие решения EASTCON','other'],['AQUA VITA mini','Система водородной воды','aquamini']];
const lnk=t=>t==='Массажные кресла'?MURL:HOME+'#catalog';
$('#cg').innerHTML=C.map(c=>`<a class="cc" href="${lnk(c[0])}"><div class="th"><img src="${BASE}assets/img/${IMG[c[2]]}.webp" alt="" loading="lazy"></div><div class="cb"><b>${c[0]}</b><small>${c[1]}</small><i>↗</i></div></a>`).join('');
$('#fp').innerHTML=C.map(c=>c[0]).map(t=>`<li><a href="${lnk(t)}">${t}</a></li>`).join('');
document.querySelectorAll('.links a[href^="#"],.all,.ft a[href^="#"]').forEach(a=>{const h=a.getAttribute('href');if(/^#(about|news|career|catalog)$/.test(h))a.href=HOME+h});
document.querySelectorAll('img[src^="assets/"]').forEach(i=>i.src=BASE+i.getAttribute('src'));
document.querySelectorAll('.th2 button').forEach(b=>b.dataset.s=BASE+b.dataset.s);
const hd=$('#hd'),tg=$('#tg');
function setOpen(o){hd.classList.toggle('open',o);tg.setAttribute('aria-expanded',o)}
tg.onclick=e=>{e.stopPropagation();setOpen(!hd.classList.contains('open'))};
$('#bd').onclick=()=>setOpen(false);
document.addEventListener('click',e=>{if(hd.classList.contains('open')&&!$('#mm').contains(e.target)&&!tg.contains(e.target))setOpen(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hd.classList.contains('open')){setOpen(false);tg.focus()}});
$('#mm').addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
/* галерея */
const mi=$('#mi');
document.querySelectorAll('.th2 button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.th2 button').forEach(x=>x.classList.remove('on'));b.classList.add('on');mi.style.opacity=0;setTimeout(()=>{mi.src=b.dataset.s;mi.style.opacity=1},180)});

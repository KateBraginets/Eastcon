/* EASTCON — главная страница. Зависимости: GSAP 3.12.5 + ScrollTrigger (подключены в index.html). */
/* База для картинок: берётся из адреса самого скрипта (работает и на GitHub Pages, и на Tilda через jsDelivr) */
const BASE=window.EASTCON_BASE||(document.currentScript?document.currentScript.src.replace(/js\/main\.js.*$/,''):'');
const IMG0={
 "laser": "assets/img/hero-laser.webp",
 "aqua": "assets/img/hero-water.webp",
 "kitchen": "assets/img/cat-kitchen.webp",
 "sleep": "assets/img/cat-sleep.webp",
 "iron": "assets/img/cat-iron.webp",
 "air_c": "assets/img/cat-air.webp",
 "massage": "assets/img/cat-massage.webp",
 "laser_c": "assets/img/cat-laser.webp",
 "travel": "assets/img/cat-travel.webp",
 "other": "assets/img/cat-other.webp",
 "aquamini": "assets/img/cat-aquavita.webp",
 "n1": "assets/img/news-1.webp",
 "n2": "assets/img/news-2.webp",
 "n3": "assets/img/news-3.webp",
 "pres": "assets/img/presentation.webp",
 "house": "assets/img/about-house.webp",
 "flogo": "assets/img/logo-white.png",
 "mask": "assets/img/hero-mask.webp"
};
const IMG=Object.fromEntries(Object.entries(IMG0).map(([k,v])=>[k,BASE+v]));
const $=s=>document.querySelector(s);
const MURL=window.EASTCON_MASSAGE_URL||'massage-chairs.html';
const lnk=(t,d)=>t==='Массажные кресла'?MURL:d;
/* каталог: 9 категорий меню, 6 карточек на главной, список в подвале */
const C=[['Кухонные системы','Для приготовления и сервировки','kitchen'],['Спальные системы','Комфортный отдых каждый день','sleep'],['Гладильная система','Уход за одеждой и тканями','iron'],['Система очистки воздуха','Чистый воздух дома','air_c'],['Массажные кресла','Расслабление и восстановление','massage'],['Лазерная терапия','Технологии для домашнего применения','laser_c'],['Бюро путешествий','Путешествия и впечатления','travel'],['Прочие продукты','Другие решения EASTCON','other'],['AQUA VITA mini','Система водородной воды','aquamini']];
$('#cg').innerHTML=C.map(c=>`<a class="cc" href="${lnk(c[0],'#catalog')}"><div class="th"><img src="${IMG[c[2]]}" alt="" loading="lazy"></div><div class="cb"><b>${c[0]}</b><small>${c[1]}</small><i>↗</i></div></a>`).join('');
$('#cats').innerHTML=[['Кухонные системы','kitchen','i1'],['Лазерная терапия','laser_c','i2'],['Система очистки воздуха','air_c','i3'],['Массажные кресла','massage','i4'],['Система очистки воды','aquamini','i5'],['Спальные системы','sleep','i6']].map(c=>`<a class="cat" href="${lnk(c[0],'#')}"><img src="${IMG[c[1]]}" alt=""><div><svg class="ic"><use href="#${c[2]}"/></svg><span><b>${c[0]}</b><em>→</em></span></div></a>`).join('');
$('#fp').innerHTML=['Кухонные системы','Спальные системы','Гладильная система','Система очистки воздуха','Массажные кресла','Лазерная терапия','Бюро путешествий','Прочие продукты','AQUA VITA mini'].map(t=>`<li><a href="${lnk(t,'#catalog')}">${t}</a></li>`).join('');
/* лента категорий */
const cs=$('#cats'),cp=$('#cp'),cx=$('#cx');
const step=()=>{const c=cs.querySelector('.cat');return c.offsetWidth+parseFloat(getComputedStyle(cs).columnGap||16)};
const upd=()=>{cp.disabled=cs.scrollLeft<4;cx.disabled=cs.scrollLeft>cs.scrollWidth-cs.clientWidth-4};
cp.onclick=()=>cs.scrollBy({left:-step()*2,behavior:'smooth'});cx.onclick=()=>cs.scrollBy({left:step()*2,behavior:'smooth'});
cs.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
/* меню */
const hd=$('#hd'),tg=$('#tg');
function setOpen(o){hd.classList.toggle('open',o);tg.setAttribute('aria-expanded',o);}
tg.onclick=e=>{e.stopPropagation();setOpen(!hd.classList.contains('open'))};
$('#bd').onclick=()=>setOpen(false);
document.addEventListener('click',e=>{if(hd.classList.contains('open')&&!$('#mm').contains(e.target)&&!tg.contains(e.target))setOpen(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hd.classList.contains('open')){setOpen(false);tg.focus()}});
$('#mm').addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
addEventListener('scroll',()=>hd.classList.toggle('sc',scrollY>20),{passive:true});
/* hero: scroll-анимация (GSAP ScrollTrigger, scrub + pin) */
const PIN_DESKTOP=1.8, PIN_MOBILE=1.2; // длина перехода в экранах (180vh / 120vh)
const hero=$('#hero'),stage=$('#stage'),laser=$('#laser');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce&&window.gsap&&window.ScrollTrigger){
 document.documentElement.classList.add('js');
 gsap.registerPlugin(ScrollTrigger);
 const mob=()=>innerWidth<=820;
 const others=gsap.utils.toArray('.it:not(.laser)'),copy=gsap.utils.toArray('.copy h1,.copy p,.copy .btn');
 gsap.set(others,{autoAlpha:0,x:90,scale:.94});gsap.set(copy,{autoAlpha:0,y:34});
 const geo=()=>{const W=hero.clientWidth,H=hero.clientHeight,h=laser.offsetHeight,w=laser.offsetWidth,
  cx=stage.offsetLeft+laser.offsetLeft+w/2,cy=stage.offsetTop+laser.offsetTop+h/2,
  sh=Math.min(H*(mob()?.5:.74),W*.95*h/w);
  return{x:W/2-cx,y:H*(mob()?.5:.58)-cy,s:sh/h}};
 const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:hero,start:'top top',end:()=>'+='+Math.round(innerHeight*(mob()?PIN_MOBILE:PIN_DESKTOP)),pin:true,scrub:.7,anticipatePin:1,invalidateOnRefresh:true}});
 // этап 1 (0–20%): надпись гаснет, лазер начинает разворот
 tl.to('.ghost',{autoAlpha:0,duration:.2},0).to('#scr',{autoAlpha:0,duration:.06},0)
   .to('.h2bg',{opacity:.55,duration:.65},0)
   .fromTo(laser,{rotation:0},{rotation:-17,ease:'power1.inOut',duration:.65},0)
 // этап 2 (20–65%): уменьшение и перемещение вправо, появление остальных товаров
   .fromTo(laser,{x:()=>geo().x,y:()=>geo().y,scale:()=>geo().s},{x:0,y:0,scale:1,ease:'power2.inOut',duration:.53},.12);
 others.forEach((el,i)=>tl.to(el,{autoAlpha:1,x:0,scale:1,ease:'power2.out',duration:.2},.26+i*.16));
 // этап 3 (65–100%): появляется текст слева
 copy.forEach((el,i)=>tl.to(el,{autoAlpha:1,y:0,ease:'power2.out',duration:.18},.65+i*.08));
 tl.to({},{duration:.06});
 /* галерея: горизонтальное «плавающее» движение при прокрутке */
 const gal=$('#gallery'),gt=gal.querySelector('.gt');
 gsap.fromTo(gt,{x:()=>innerWidth*.16},{x:()=>-(gt.scrollWidth-innerWidth*.9),ease:'none',scrollTrigger:{trigger:gal,start:'top bottom',end:'bottom top',scrub:.8,invalidateOnRefresh:true}});
 gsap.fromTo(gal.querySelectorAll('.gc img'),{xPercent:-3},{xPercent:3,ease:'none',scrollTrigger:{trigger:gal,start:'top bottom',end:'bottom top',scrub:.8}});
 addEventListener('load',()=>ScrollTrigger.refresh());
}else{hero.style.height='auto';hero.style.minHeight='100svh';$('#gallery').classList.add('rm')}

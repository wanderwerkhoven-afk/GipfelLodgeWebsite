(()=>{
'use strict';
const hero=document.querySelector('.hero');
const topbar=document.querySelector('.topbar');
// Switch header only after its lower edge crosses the bottom of the hero.
function updateTopbar(){
  if(!topbar||!hero)return;
  const pastHero=hero.getBoundingClientRect().bottom<=topbar.getBoundingClientRect().bottom;
  topbar.classList.toggle('is-scrolled',pastHero);
}
window.addEventListener('scroll',updateTopbar,{passive:true});
window.addEventListener('resize',updateTopbar,{passive:true});
updateTopbar();
const slides=[...document.querySelectorAll('.slide')];
const slideStatus=document.getElementById('slideStatus');
let index=0;
function show(n){
  if(!slides.length)return;
  index=(n+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.classList.toggle('active',i===index);slide.setAttribute('aria-hidden',String(i!==index));});
  if(slideStatus)slideStatus.textContent=`Afbeelding ${index+1} van ${slides.length}`;
}
document.getElementById('prev')?.addEventListener('click',()=>show(index-1));
document.getElementById('next')?.addEventListener('click',()=>show(index+1));
show(0);

// Native pointer gestures: horizontal swipes change slides; vertical page scrolling stays native.
if(hero&&slides.length>1){
  let start=null;
  hero.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    if(event.target.closest('a,button,nav'))return;
    start={x:event.clientX,y:event.clientY,id:event.pointerId};
  },{passive:true});
  hero.addEventListener('pointerup',event=>{
    if(!start||event.pointerId!==start.id)return;
    const dx=event.clientX-start.x;
    const dy=event.clientY-start.y;
    start=null;
    if(Math.abs(dx)<55||Math.abs(dx)<Math.abs(dy)*1.35)return;
    show(index+(dx<0?1:-1));
  },{passive:true});
  hero.addEventListener('pointercancel',()=>{start=null;},{passive:true});
  hero.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')start=null;},{passive:true});
}


// Full-screen gallery: native modal handles focus trap and Escape key.
const galleryLightbox=document.getElementById('galleryLightbox');
const galleryLightboxImage=document.getElementById('galleryLightboxImage');
const galleryLightboxTitle=document.getElementById('galleryLightboxTitle');
const galleryLightboxClose=document.getElementById('galleryLightboxClose');
const galleryTriggers=[...document.querySelectorAll('.gallery-trigger')];
let galleryLastTrigger=null;
galleryTriggers.forEach(trigger=>trigger.addEventListener('click',()=>{
  if(!galleryLightbox||!galleryLightboxImage||!galleryLightboxTitle)return;
  const img=trigger.querySelector('img');
  if(!img)return;
  galleryLastTrigger=trigger;
  galleryLightboxImage.src=img.currentSrc||img.src;
  galleryLightboxImage.alt=img.alt;
  galleryLightboxTitle.textContent=trigger.querySelector('span')?.textContent?.trim()||img.alt;
  galleryLightbox.showModal();
  galleryLightboxClose?.focus();
}));
galleryLightboxClose?.addEventListener('click',()=>galleryLightbox?.close());
galleryLightbox?.addEventListener('click',event=>{
  if(event.target===galleryLightbox)galleryLightbox.close();
});
galleryLightbox?.addEventListener('close',()=>{
  galleryLightboxImage?.removeAttribute('src');
  galleryLastTrigger?.focus({preventScroll:true});
});

const toggle=document.getElementById('menuToggle');
const nav=document.getElementById('navigation');
const backdrop=document.getElementById('menuBackdrop');

function setMenuOpen(open,{restoreFocus=false}={}){
  if(!toggle||!nav||!backdrop)return;
  nav.classList.toggle('open',open);
  backdrop.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Sluit navigatie':'Open navigatie');
  nav.setAttribute('aria-hidden',String(!open));
  nav.inert=!open;
  if(open){nav.querySelector('a')?.focus({preventScroll:true});}
  else if(restoreFocus){toggle.focus({preventScroll:true});}
}
toggle?.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open'),{restoreFocus:nav.classList.contains('open')}));
backdrop?.addEventListener('click',()=>setMenuOpen(false,{restoreFocus:true}));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuOpen(false)));
document.addEventListener('keydown',event=>{
  if(!nav?.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();setMenuOpen(false,{restoreFocus:true});}
  if(event.key==='Tab'){
    const focusables=[...nav.querySelectorAll('a')];
    const first=focusables[0],last=focusables[focusables.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
const languageToggle=document.getElementById('languageToggle');
const languageMenu=document.getElementById('languageMenu');
const languageDropdown=languageToggle?.closest('.lang-dropdown');
function setLanguageOpen(open){
  if(!languageToggle||!languageMenu||!languageDropdown)return;
  languageDropdown.classList.toggle('is-open',open);
  languageToggle.setAttribute('aria-expanded',String(open));
  languageMenu.setAttribute('aria-hidden',String(!open));
  languageMenu.inert=!open;
}
languageToggle?.addEventListener('click',()=>setLanguageOpen(!languageDropdown.classList.contains('is-open')));
document.addEventListener('click',event=>{
  if(languageDropdown&&!languageDropdown.contains(event.target))setLanguageOpen(false);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&languageDropdown?.classList.contains('is-open')){setLanguageOpen(false);languageToggle.focus();}
});
document.getElementById('year').textContent=new Date().getFullYear();
})();

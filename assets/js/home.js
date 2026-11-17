(()=>{
'use strict';
const hero=document.querySelector('.hero, .lodge-page-hero');
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
const dotsContainer=hero?.querySelector('.hero-dots');
const heroDots=slides.map((slide,i)=>{
  const dot=document.createElement('button');
  dot.type='button';
  dot.className='hero-dot';
  dot.setAttribute('aria-label',`Toon foto ${i+1} van ${slides.length}`);
  dot.addEventListener('click',()=>goToSlide(i));
  dotsContainer?.appendChild(dot);
  return dot;
});
const exitTimers=new Map();
function show(n){
  if(!slides.length)return;
  const next=(n+slides.length)%slides.length;
  const outgoing=slides[index];
  const incoming=slides[next];
  // Keep the outgoing image's zoom running until opacity reaches zero.
  if(outgoing!==incoming){
    outgoing.classList.add('is-exiting');
    if(exitTimers.has(outgoing))window.clearTimeout(exitTimers.get(outgoing));
    exitTimers.set(outgoing,window.setTimeout(()=>{
      outgoing.classList.remove('is-exiting');
      exitTimers.delete(outgoing);
    },1250));
  }
  // An early manual switch can revisit a slide before its old fade finishes.
  if(exitTimers.has(incoming)){
    window.clearTimeout(exitTimers.get(incoming));
    exitTimers.delete(incoming);
  }
  incoming.classList.remove('is-exiting');
  index=next;
  slides.forEach((slide,i)=>{
    slide.classList.toggle('active',i===index);
    slide.setAttribute('aria-hidden',String(i!==index));
  });
  heroDots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===index);dot.setAttribute('aria-current',i===index?'true':'false');});
  if(slideStatus)slideStatus.textContent=`Afbeelding ${index+1} van ${slides.length}`;
}
const carouselInterval=5000;
let carouselTimer=null;
function stopCarousel(){if(carouselTimer!==null){window.clearInterval(carouselTimer);carouselTimer=null;}}
function startCarousel(){
  stopCarousel();
  if(slides.length<2||document.hidden)return;
  carouselTimer=window.setInterval(()=>show(index+1),carouselInterval);
}
function goToSlide(next){show(next);startCarousel();}
// Autoplay continues even when the cursor rests over the hero on initial load.
document.addEventListener('visibilitychange',()=>document.hidden?stopCarousel():startCarousel());
show(0);
startCarousel();

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
    goToSlide(index+(dx<0?1:-1));
  },{passive:true});
  hero.addEventListener('pointercancel',()=>{start=null;},{passive:true});
  hero.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')start=null;},{passive:true});
}


// Shared-image zoom: animate from the clicked gallery tile to its centered modal position.
const galleryLightbox=document.getElementById('galleryLightbox');
const galleryLightboxImage=document.getElementById('galleryLightboxImage');
const galleryLightboxTitle=document.getElementById('galleryLightboxTitle');
const galleryLightboxClose=document.getElementById('galleryLightboxClose');
const galleryTriggers=[...document.querySelectorAll('.gallery-trigger')];
const reducedGalleryMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let galleryLastTrigger=null;
let galleryMotion=null;
let galleryClosing=false;
let galleryOpening=false;

function galleryTransform(fromRect,toRect){
  const dx=(fromRect.left+fromRect.width/2)-(toRect.left+toRect.width/2);
  const dy=(fromRect.top+fromRect.height/2)-(toRect.top+toRect.height/2);
  const sx=fromRect.width/toRect.width;
  const sy=fromRect.height/toRect.height;
  return `translate(${dx}px,${dy}px) scale(${sx},${sy})`;
}
function animateGalleryImage(frames,duration){
  if(reducedGalleryMotion.matches||!galleryLightboxImage?.animate)return Promise.resolve();
  galleryMotion=galleryLightboxImage.animate(frames,{
    duration,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'
  });
  const motion=galleryMotion;
  return motion.finished.catch(()=>{}).then(()=>{
    if(galleryMotion===motion){motion.cancel();galleryMotion=null;}
  });
}
async function openGallery(trigger){
  if(!galleryLightbox||!galleryLightboxImage||!galleryLightboxTitle||galleryLightbox.open||galleryOpening)return;
  const source=trigger.querySelector('img');
  if(!source)return;
  galleryOpening=true;
  galleryLastTrigger=trigger;
  galleryLightboxImage.src=source.currentSrc||source.src;
  galleryLightboxImage.alt=source.alt;
  galleryLightboxTitle.textContent=trigger.querySelector('span')?.textContent?.trim()||source.alt;
  galleryLightbox.classList.remove('is-closing','is-visible');
  galleryLightbox.classList.add('is-entering');
  // Wait for the dimensions of the full-size photo before measuring the destination.
  try{await galleryLightboxImage.decode();}catch(e){}
  if(galleryLightbox.open){galleryOpening=false;return;}
  const sourceRect=source.getBoundingClientRect();
  galleryLightbox.showModal();
  galleryLightboxClose?.focus({preventScroll:true});
  const targetRect=galleryLightboxImage.getBoundingClientRect();
  galleryLightbox.classList.add('is-visible');
  if(sourceRect.width&&sourceRect.height&&targetRect.width&&targetRect.height){
    await animateGalleryImage([
      {transform:galleryTransform(sourceRect,targetRect),opacity:1},
      {transform:'translate(0,0) scale(1,1)',opacity:1}
    ],560);
  }
  galleryLightbox.classList.remove('is-entering');
  galleryOpening=false;
}
async function closeGallery(){
  if(!galleryLightbox?.open||galleryClosing)return;
  galleryClosing=true;
  galleryLightbox.classList.remove('is-visible','is-entering');
  galleryLightbox.classList.add('is-closing');
  if(galleryMotion){galleryMotion.cancel();galleryMotion=null;}
  const source=galleryLastTrigger?.querySelector('img');
  const sourceRect=source?.getBoundingClientRect();
  const targetRect=galleryLightboxImage?.getBoundingClientRect();
  if(sourceRect?.width&&sourceRect?.height&&targetRect?.width&&targetRect?.height){
    await animateGalleryImage([
      {transform:'translate(0,0) scale(1,1)',opacity:1},
      {transform:galleryTransform(sourceRect,targetRect),opacity:1}
    ],400);
  }
  galleryLightbox.close();
  galleryClosing=false;
}
galleryTriggers.forEach(trigger=>trigger.addEventListener('click',()=>{void openGallery(trigger);}));
galleryLightboxClose?.addEventListener('click',()=>{void closeGallery();});
galleryLightbox?.addEventListener('click',event=>{
  if(event.target===galleryLightbox)void closeGallery();
});
galleryLightbox?.addEventListener('cancel',event=>{
  event.preventDefault();
  void closeGallery();
});
galleryLightbox?.addEventListener('close',()=>{
  galleryLightbox.classList.remove('is-visible','is-entering','is-closing');
  galleryLightboxImage?.removeAttribute('src');
  galleryLastTrigger?.focus({preventScroll:true});
});

// Guests can swipe the review strip or use its previous/next buttons.
const reviewsCards=document.getElementById('reviewsCards');
function scrollReview(direction){
  if(!reviewsCards)return;
  const first=reviewsCards.querySelector('.review-card');
  const gap=parseFloat(getComputedStyle(reviewsCards).gap)||0;
  const step=(first?.getBoundingClientRect().width||300)+gap;
  reviewsCards.scrollBy({left:direction*step,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
document.getElementById('reviewsPrev')?.addEventListener('click',()=>scrollReview(-1));
document.getElementById('reviewsNext')?.addEventListener('click',()=>scrollReview(1));

// Clamp long reviews to five lines; native modal preserves the entire original text.
const reviewDialog=document.getElementById('reviewDialog');
const reviewDialogClose=document.getElementById('reviewDialogClose');
const reviewDialogName=document.getElementById('reviewDialogName');
const reviewDialogMeta=document.getElementById('reviewDialogMeta');
const reviewDialogPlatform=document.getElementById('reviewDialogPlatform');
const reviewDialogQuote=document.getElementById('reviewDialogQuote');
let reviewOpener=null;
document.querySelectorAll('.review-open-btn').forEach(button=>{
  button.addEventListener('click',()=>{
    if(!reviewDialog||!reviewDialogName||!reviewDialogQuote)return;
    const card=button.closest('.review-card');
    if(!card)return;
    reviewOpener=button;
    const footer=card.querySelector('.review-card-footer');
    reviewDialogName.textContent=footer?.querySelector('strong')?.textContent||'Gast';
    reviewDialogMeta.textContent=footer?.querySelector('span')?.textContent||'';
    reviewDialogPlatform.textContent=footer?.querySelector('small')?.textContent||'';
    reviewDialogQuote.textContent=card.querySelector('.review-original')?.textContent||'';
    reviewDialogQuote.lang=card.lang||'nl';
    reviewDialog.showModal();
    reviewDialog.scrollTop=0;
    reviewDialogClose?.focus({preventScroll:true});
  });
});
reviewDialogClose?.addEventListener('click',()=>reviewDialog?.close());
reviewDialog?.addEventListener('click',event=>{
  if(event.target===reviewDialog)reviewDialog.close();
});
reviewDialog?.addEventListener('close',()=>reviewOpener?.focus({preventScroll:true}));

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
  if(open){nav.querySelector('a,summary')?.focus({preventScroll:true});}
  else if(restoreFocus){toggle.focus({preventScroll:true});}
}
toggle?.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open'),{restoreFocus:nav.classList.contains('open')}));
backdrop?.addEventListener('click',()=>setMenuOpen(false,{restoreFocus:true}));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuOpen(false)));
nav?.querySelectorAll('.nav-group[open]').forEach(group=>group.open=false);
document.addEventListener('keydown',event=>{
  if(!nav?.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();setMenuOpen(false,{restoreFocus:true});}
  if(event.key==='Tab'){
    const focusables=[...nav.querySelectorAll('a,summary')].filter(el=>el.getClientRects().length);
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

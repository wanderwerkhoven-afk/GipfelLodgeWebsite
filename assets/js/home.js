(()=>{
'use strict';
const slides=[...document.querySelectorAll('.slide')];
let index=0;
function show(n){
  if(!slides.length)return;
  index=(n+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
}
document.getElementById('prev')?.addEventListener('click',()=>show(index-1));
document.getElementById('next')?.addEventListener('click',()=>show(index+1));

const toggle=document.getElementById('menuToggle');
const nav=document.getElementById('navigation');
const closeButton=document.getElementById('menuClose');
const backdrop=document.getElementById('menuBackdrop');
let returnFocus=false;
function setMenuOpen(open,{restoreFocus=false}={}){
  if(!toggle||!nav||!backdrop)return;
  nav.classList.toggle('open',open);
  backdrop.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Sluit navigatie':'Open navigatie');
  nav.setAttribute('aria-hidden',String(!open));
  nav.inert=!open;
  if(open){closeButton?.focus({preventScroll:true});}
  else if(restoreFocus){toggle.focus({preventScroll:true});}
}
toggle?.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open'),{restoreFocus:nav.classList.contains('open')}));
closeButton?.addEventListener('click',()=>setMenuOpen(false,{restoreFocus:true}));
backdrop?.addEventListener('click',()=>setMenuOpen(false,{restoreFocus:true}));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenuOpen(false)));
document.addEventListener('keydown',event=>{
  if(!nav?.classList.contains('open'))return;
  if(event.key==='Escape'){event.preventDefault();setMenuOpen(false,{restoreFocus:true});}
  if(event.key==='Tab'){
    const focusables=[closeButton,...nav.querySelectorAll('a')].filter(Boolean);
    const first=focusables[0],last=focusables[focusables.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
document.getElementById('year').textContent=new Date().getFullYear();
})();

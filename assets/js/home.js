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

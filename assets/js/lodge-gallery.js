/* Gipfel Lodge: homepage-style zoom preview with gallery carousel navigation. */
(()=>{
'use strict';
const dialog=document.getElementById('lodgePhotoDialog');
const gallery=document.querySelector('.lodge-gallery-mosaic');
const overview=document.querySelector('.lodge-photo-overview');
if(!dialog||!gallery||!overview||typeof dialog.showModal!=='function')return;
const image=dialog.querySelector('.lodge-photo-dialog-image');
const caption=dialog.querySelector('.lodge-photo-dialog-caption');
const counter=dialog.querySelector('.lodge-photo-dialog-counter');
const prev=dialog.querySelector('.lodge-photo-dialog-prev');
const next=dialog.querySelector('.lodge-photo-dialog-next');
const closeButton=dialog.querySelector('.lodge-photo-dialog-close');
const sources=[...gallery.querySelectorAll('.lodge-photo-button'),...overview.querySelectorAll('.lodge-photo-button')];
const photos=sources.map(button=>({button,src:button.dataset.photo,caption:button.dataset.caption||'Gipfel Lodge',alt:button.querySelector('img')?.alt||'Gipfel Lodge'})).filter(item=>item.src);
if(!photos.length)return;
let current=0,opener=null,opening=false,closing=false,motion=null,touchStart=null;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const transform=(a,b)=>`translate(${a.left+a.width/2-b.left-b.width/2}px,${a.top+a.height/2-b.top-b.height/2}px) scale(${a.width/b.width},${a.height/b.height})`;
async function animate(frames,duration){
  if(reduced.matches||!image.animate)return;
  motion=image.animate(frames,{duration,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
  const active=motion;
  try{await active.finished}catch(e){}
  if(motion===active){active.cancel();motion=null}
}
function display(index){
  current=(index+photos.length)%photos.length;
  const item=photos[current];
  image.src=item.src;image.alt=item.alt;caption.textContent=item.caption;
  counter.textContent=`${current+1} / ${photos.length}`;
}
async function open(button){
  if(opening||closing||dialog.open)return;
  const index=photos.findIndex(item=>item.src===button.dataset.photo);
  if(index<0)return;
  opening=true;opener=button;display(index);
  dialog.classList.remove('is-closing','is-visible');
  dialog.classList.add('is-entering');
  try{await image.decode()}catch(e){}
  const from=button.querySelector('img')?.getBoundingClientRect();
  dialog.showModal();closeButton.focus({preventScroll:true});
  const to=image.getBoundingClientRect();
  dialog.classList.add('is-visible');
  if(from?.width&&from.height&&to.width&&to.height){
    await animate([{transform:transform(from,to),opacity:1},{transform:'none',opacity:1}],560);
  }
  dialog.classList.remove('is-entering');opening=false;
}
async function close(){
  if(!dialog.open||closing)return;
  closing=true;opening=false;
  dialog.classList.remove('is-visible','is-entering');dialog.classList.add('is-closing');
  if(motion){motion.cancel();motion=null}
  const from=opener?.querySelector('img')?.getBoundingClientRect();
  const to=image.getBoundingClientRect();
  if(from?.width&&from.height&&to.width&&to.height){
    await animate([{transform:'none',opacity:1},{transform:transform(from,to),opacity:1}],400);
  }
  dialog.close();closing=false;
}
function move(step){
  if(!dialog.open||opening||closing)return;
  if(motion){motion.cancel();motion=null}
  display(current+step);
  if(!reduced.matches)image.animate([{opacity:.65},{opacity:1}],{duration:180,easing:'ease-out'});
}
document.querySelectorAll('.lodge-photo-button').forEach(button=>button.addEventListener('click',()=>{void open(button)}));
prev.addEventListener('click',()=>move(-1));
next.addEventListener('click',()=>move(1));
dialog.querySelector('.lodge-photo-dialog-mobile-prev')?.addEventListener('click',()=>move(-1));
dialog.querySelector('.lodge-photo-dialog-mobile-next')?.addEventListener('click',()=>move(1));
dialog.querySelector('.lodge-photo-dialog-save')?.addEventListener('click',()=>{
  // Use a direct image link: iOS Safari can offer Save to Photos from its image menu.
  const src=photos[current]?.src;
  if(!src)return;
  const a=document.createElement('a');
  a.href=src;
  a.download=src.split('/').pop()?.split('?')[0]||'gipfel-lodge-foto.jpg';
  document.body.appendChild(a);
  a.click();
  a.remove();
});
closeButton.addEventListener('click',()=>{void close()});
dialog.addEventListener('click',event=>{if(event.target===dialog)void close()});
dialog.addEventListener('cancel',event=>{event.preventDefault();void close()});
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}
  else if(event.key==='ArrowRight'){event.preventDefault();move(1)}
});
dialog.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'||event.target.closest('button'))return;
  touchStart={x:event.clientX,y:event.clientY,id:event.pointerId};
},{passive:true});
dialog.addEventListener('pointerup',event=>{
  if(!touchStart||event.pointerId!==touchStart.id)return;
  const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;
  touchStart=null;
  if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.2)move(dx<0?1:-1);
},{passive:true});
dialog.addEventListener('pointercancel',()=>{touchStart=null},{passive:true});
dialog.addEventListener('close',()=>{
  dialog.classList.remove('is-visible','is-entering','is-closing');
  image.removeAttribute('src');touchStart=null;opening=false;closing=false;
  opener?.focus({preventScroll:true});
});
})();

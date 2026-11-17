/* Gipfel Lodge unified 24-photo lightbox carousel. */
(()=>{
'use strict';
const dialog=document.getElementById('lodgePhotoDialog');
const gallery=document.querySelector('.lodge-gallery-mosaic');
const overview=document.querySelector('.lodge-photo-overview');
if(!dialog||!gallery||!overview||typeof dialog.showModal!=='function')return;
const image=dialog.querySelector('.lodge-photo-dialog-image');
const caption=dialog.querySelector('.lodge-photo-dialog-caption');
const counter=dialog.querySelector('.lodge-photo-dialog-counter');
const previousButton=dialog.querySelector('.lodge-photo-dialog-prev');
const nextButton=dialog.querySelector('.lodge-photo-dialog-next');
const closeButton=dialog.querySelector('.lodge-photo-dialog-close');
const sources=[...gallery.querySelectorAll('.lodge-photo-button'),...overview.querySelectorAll('.lodge-photo-button')];
const photos=sources.map(button=>({
  src:button.dataset.photo,
  caption:button.dataset.caption||'Gipfel Lodge',
  alt:button.querySelector('img')?.alt||'Gipfel Lodge'
})).filter(item=>item.src);
let current=0;
let opener=null;
let touchStart=null;
const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function display(index){
  if(!photos.length)return;
  current=(index+photos.length)%photos.length;
  const item=photos[current];
  image.src=item.src;
  image.alt=item.alt;
  caption.textContent=item.caption;
  counter.textContent=(current+1)+' / '+photos.length;
  if(!motionReduced && image.animate){
    image.animate([{opacity:.5},{opacity:1}],{duration:180,easing:'ease-out'});
  }
}
function open(button){
  const src=button.dataset.photo;
  const i=photos.findIndex(photo=>photo.src===src);
  if(i<0)return;
  opener=button;
  display(i);
  if(!dialog.open)dialog.showModal();
  closeButton.focus({preventScroll:true});
}
function close(){if(dialog.open)dialog.close()}
document.querySelectorAll('.lodge-photo-button').forEach(button=>{
  button.addEventListener('click',()=>open(button));
});
previousButton.addEventListener('click',()=>display(current-1));
nextButton.addEventListener('click',()=>display(current+1));
closeButton.addEventListener('click',close);
dialog.addEventListener('click',event=>{if(event.target===dialog)close()});
dialog.addEventListener('cancel',()=>{}); // Native Escape closes the dialog.
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();display(current-1)}
  else if(event.key==='ArrowRight'){event.preventDefault();display(current+1)}
});
dialog.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse')return;
  if(event.target.closest('button'))return;
  touchStart={x:event.clientX,y:event.clientY,id:event.pointerId};
},{passive:true});
dialog.addEventListener('pointerup',event=>{
  if(!touchStart||event.pointerId!==touchStart.id)return;
  const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;
  touchStart=null;
  if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.2)return;
  display(current+(dx<0?1:-1));
},{passive:true});
dialog.addEventListener('pointercancel',()=>{touchStart=null},{passive:true});
dialog.addEventListener('close',()=>{
  image.removeAttribute('src');
  touchStart=null;
  opener?.focus({preventScroll:true});
});
})();

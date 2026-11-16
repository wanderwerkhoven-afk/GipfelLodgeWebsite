/* Splash lifecycle: same once-per-local-day policy as the original Gipfel-Lodge site. */
(function(){
  'use strict';
  var root=document.documentElement;
  var splash=document.getElementById('splash-screen');
  if(!splash)return;
  if(root.classList.contains('skip-daily-splash')){splash.remove();return}
  root.classList.add('splash-playing');
  var dismissed=false;
  function leave(){
    if(dismissed)return;
    dismissed=true;
    splash.classList.add('is-leaving');
    root.classList.remove('splash-playing');
    window.setTimeout(function(){splash.remove()},900);
  }
  window.setTimeout(leave,5800);
  window.addEventListener('pageshow',function(event){if(event.persisted)leave()});
})();

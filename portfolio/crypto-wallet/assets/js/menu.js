// menu.js - small helper for toggling a mobile menu (extend if needed)
(function(){
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=> {
    nav.classList.toggle('open');
  });
})();

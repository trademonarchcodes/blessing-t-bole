const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.links');

if(toggle&&links){
  const setMenu=(open)=>{
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
    links.classList.toggle('open',open);
  };
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
  document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))setMenu(false)});
}

const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();

const sectionLinks=[...document.querySelectorAll('.links a')];
const sections=sectionLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window && sections.length){
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        sectionLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));
      }
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section=>navObserver.observe(section));
}

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link=>{
  link.addEventListener('click',()=>{
    link.classList.add('clicked');
    window.setTimeout(()=>link.classList.remove('clicked'),450);
  });
});

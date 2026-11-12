(function(){
var m=document.getElementById('menu'),n=document.getElementById('nav');
m.onclick=function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)};
n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');m.setAttribute('aria-expanded',false)}});
var f=document.getElementById('f'),d=document.getElementById('date'),done=document.getElementById('done'),sum=document.getElementById('sum');
var t=new Date();d.min=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
f.addEventListener('submit',function(e){
 e.preventDefault();var ok=true;
 f.querySelectorAll('[required]').forEach(function(i){
  var s=i.parentNode.querySelector('.err'),bad=!i.value.trim();
  if(s)s.textContent=bad?'Please fill this in.':'';if(bad)ok=false});
 if(!ok)return;
 var v=new FormData(f),dt=new Date(v.get('date')+'T00:00');
 var ds=dt.toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
 sum.textContent='Booking request: Terraform Architects\nName: '+v.get('name')+'\nMobile: '+v.get('phone')+(v.get('email')?'\nEmail: '+v.get('email'):'')+'\nService: '+v.get('service')+'\nMeeting: '+v.get('mtype')+'\nDate: '+ds+', '+v.get('time')+'\nLocation: '+v.get('loc')+(v.get('msg')?'\nDetails: '+v.get('msg'):'');
 document.getElementById('mail').href='mailto:terraformarchitects25@gmail.com?subject='+encodeURIComponent('Booking request: '+v.get('service'))+'&body='+encodeURIComponent(sum.textContent);
 f.style.display='none';done.style.display='block';done.scrollIntoView({block:'center'});
});
document.getElementById('copy').onclick=function(){
 var b=this,x=sum.textContent;
 function ok(){b.textContent='Copied'}
 try{navigator.clipboard.writeText(x).then(ok,function(){})}catch(_){}
};
document.getElementById('fb').onclick=function(){try{navigator.clipboard.writeText(sum.textContent)}catch(_){}};
document.getElementById('again').onclick=function(){done.style.display='none';f.style.display='grid'};
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 var els=[].slice.call(document.querySelectorAll('[data-speed]')),tk=false;
 document.querySelectorAll('.proj .ph svg').forEach(function(e){e.dataset.speed='.14';els.push(e)});
 function upd(){tk=false;var vh=innerHeight;
  els.forEach(function(e){var r=e.parentNode.getBoundingClientRect();
   if(r.bottom<-200||r.top>vh+200)return;
   e.style.transform='translate3d(0,'+(-(r.top+r.height/2-vh/2)*parseFloat(e.dataset.speed)).toFixed(1)+'px,0)'});
  document.documentElement.style.setProperty('--sy',scrollY)}
 function req(){if(!tk){tk=true;requestAnimationFrame(upd)}}
 addEventListener('scroll',req,{passive:true});addEventListener('resize',req);upd();
}
var up=document.getElementById('up'),root=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function prog(){var h=root.scrollHeight-innerHeight,p=h>0?Math.min(1,scrollY/h):0;root.style.setProperty('--p',p.toFixed(3));up.classList.toggle('show',scrollY>600)}
addEventListener('scroll',prog,{passive:true});prog();
up.onclick=function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})};
if(!rm&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;var t=x.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.classList.remove('rv','in');t.style.removeProperty('--d')},1500)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 document.querySelectorAll('section h2,.lead,.svc,.steps li,.proj figure,form,.contact li,.band p').forEach(function(e){
  e.style.setProperty('--d',([].indexOf.call(e.parentNode.children,e)%4*.1)+'s');e.classList.add('rv');io.observe(e)});
}
})();

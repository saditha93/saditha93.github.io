const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

let progress=0;
const loaderBar=$("#loaderBar"), loaderPct=$("#loaderPct"), loader=$("#loader");
const loaderTimer=setInterval(()=>{
  progress=Math.min(progress+Math.random()*12+4,100);
  loaderBar.style.width=progress+"%"; loaderPct.textContent=Math.round(progress)+"%";
  if(progress>=100){clearInterval(loaderTimer);setTimeout(()=>loader.classList.add("hide"),350)}
},110);

$("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("light"));
$("#menuBtn").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$$("#nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

const cursor=$("#cursor"),dot=$("#cursorDot");
window.addEventListener("mousemove",e=>{
 if(!cursor)return;
 cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";
 dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";
});
$$("a,button,.project-card").forEach(el=>{
 el.addEventListener("mouseenter",()=>cursor&&(cursor.style.transform="translate(-50%,-50%) scale(1.5)"));
 el.addEventListener("mouseleave",()=>cursor&&(cursor.style.transform="translate(-50%,-50%) scale(1)"));
});

const modal=$("#projectModal"), gallery=$("#gallery");
function openProject(id){
 const p=PROJECTS.find(x=>x.id===id); if(!p)return;
 $("#modalType").textContent=p.type;$("#modalName").textContent=p.name;$("#modalDesc").textContent=p.desc;
 $("#modalLink").href=p.url;
 $("#modalImpact").innerHTML=p.impact.map(x=>`<li>${x}</li>`).join("");
 $("#modalTags").innerHTML=p.stack.map(x=>`<span>${x}</span>`).join("");
 gallery.innerHTML=p.images.length?p.images.map(x=>`<img src="${x}" loading="lazy" alt="${p.name} screenshot">`).join(""):`<div class="image-placeholder" style="display:flex;min-height:240px;grid-column:1/-1"><span>PROJECT</span><b>${p.name}</b></div>`;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
function closeProject(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$(".project-card").forEach(c=>c.addEventListener("click",()=>openProject(c.dataset.project)));
$$("[data-close]").forEach(x=>x.addEventListener("click",closeProject));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProject()});

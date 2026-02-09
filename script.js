// Custom cursor movement
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// Optional: add scale on hover for links/buttons
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});


// Smooth scroll
const lenis = new Lenis({ duration:1.3, smoothWheel:true });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Cursor
//const cursor = document.querySelector('.cursor');
//document.addEventListener('mousemove', e=>{
//  cursor.style.transform=`translate(${e.clientX-28}px,${e.clientY-28}px)`;
//});

// Theme switch
document.getElementById('theme-toggle').onclick = () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
};

// Typed hero
new Typed('#typed',{
  strings:['Data Analyst','Insight Engineer','System Thinker'],
  typeSpeed:60,
  backSpeed:30,
  loop:true
});

// GSAP
gsap.registerPlugin(ScrollTrigger);

// Page stacking
gsap.utils.toArray('.page').forEach(page=>{
  gsap.from(page,{
    scale:.94,
    opacity:0,
    scrollTrigger:{
      trigger:page,
      start:'top 85%',
      scrub:true
    }
  });
});

gsap.utils.toArray('.chart-svg polyline').forEach(line => {
  gsap.to(line, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: line,
      start: 'top 80%',
      scrub: true
    }
  });
});

// 3D chart illusion
document.querySelectorAll('.chart').forEach(chart=>{
  const level = chart.dataset.level / 100;
  gsap.to(chart,{
    scaleY:level,
    scrollTrigger:{
      trigger:chart,
      start:'top 80%'
    }
  });
});

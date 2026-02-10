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

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = navLinks.querySelectorAll("a");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});



// close menu when link clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav-open");
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level;
          const fill = entry.target.querySelector(".fill");

          // Animate using GSAP for smooth fill
          gsap.to(fill, { width: level + "%", duration: 1.2, ease: "power2.out" });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  skillBars.forEach(bar => {
    const fill = bar.querySelector(".fill");
    fill.style.width = "0%"; // reset width
    observer.observe(bar);
  });
});




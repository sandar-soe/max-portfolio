// Custom cursor movement
const cursor = document.querySelector('.custom-cursor');

// Desktop: follow mouse
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// Mobile: show on touch only
if (window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('touchstart', e => {
    cursor.style.opacity = '1';
    moveCursor(e.touches[0]);
  });

  document.addEventListener('touchmove', e => moveCursor(e.touches[0]));
  document.addEventListener('touchend', () => {
    cursor.style.opacity = '0';
  });
}

function moveCursor(touch) {
  cursor.style.left = touch.clientX + 'px';
  cursor.style.top = touch.clientY + 'px';
}


document.addEventListener('touchmove', e => moveCursor(e.touches[0]));
document.addEventListener('touchend', () => cursor.classList.remove('show'));


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


const scrollables = document.querySelectorAll('.scrollable');

scrollables.forEach(el => {
  let startY = 0;

  el.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    const currentY = e.touches[0].clientY;
    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

    // If trying to scroll past top/bottom, allow page to scroll
    if ((atTop && currentY > startY) || (atBottom && currentY < startY)) {
      e.stopPropagation(); // let parent page scroll
    } else {
      e.stopPropagation(); // still allow inner scroll
    }
  }, { passive: false });
});


// ----------------------
// HERO QUOTES ROTATION
// ----------------------

document.addEventListener("DOMContentLoaded", () => {

  const quotes = [
    {
      text: "Insight is engineered, not discovered.",
      author: "– Max"
    },  
    {
      text: "Without data, you're just another person with an opinion.",
      author: "– W. Edwards Deming"
    },
    {
      text: "The goal is to turn data into information, and information into insight.",
      author: "– Carly Fiorina"
    },
    {
      text: "Data beats emotions.",
      author: "– Sean Rad"
    },
    {
      text: "In God we trust. All others must bring data.",
      author: "– W. Edwards Deming"
    }
  ];

  const quoteWrapper = document.querySelector(".hero-quote-wrapper");
  const quoteText = document.querySelector(".hero-quote-text");
  const quoteAuthor = document.querySelector(".hero-quote-author");

  if (!quoteWrapper || !quoteText || !quoteAuthor) return;

  let index = 0;

  function showQuote() {
    quoteWrapper.classList.remove("active");

    setTimeout(() => {
      const q = quotes[index];
      quoteText.textContent = q.text;
      quoteAuthor.textContent = q.author;

      quoteWrapper.classList.add("active");

      index = (index + 1) % quotes.length;
    }, 400);
  }

  showQuote();
  setInterval(showQuote, 6000);
});


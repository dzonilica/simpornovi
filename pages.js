gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════
   INNER PAGE LOADER (with subtitle)
══════════════════════════════════ */
const innerLoaderTL = gsap.timeline({
  onComplete: () => {
    document.getElementById('loader').style.pointerEvents = 'none';
    updateNavState();
    revealPage();
  }
});

innerLoaderTL
  .from('#loaderIcon', { opacity: 0, scale: 0.6, duration: 0.55, ease: 'back.out(1.4)' })
  .from('.inner-loader-logo > div:first-child', { opacity: 0, y: 8, duration: 0.4 }, '-=0.1')
  .to('#loaderLine', { width: 80, duration: 0.55, ease: 'power2.inOut' })
  .to('#loaderSub', { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
  .to({}, { duration: 0.4 })
  .to('#loaderLogo', { opacity: 0, y: -18, duration: 0.4, ease: 'power2.in' })
  .to('#loaderPanelTop', {
    scaleY: 0, duration: 0.85,
    ease: 'power4.inOut', transformOrigin: 'top'
  }, '-=0.08');


/* PAGE REVEAL */
function revealPage() {
  gsap.to('.page-hero-bg', { scale: 1, duration: 2, ease: 'power3.out' });
  gsap.to('.page-hero-h1 .line-inner', {
    y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.13, delay: 0.15
  });
  gsap.to('.page-hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 });
  gsap.to('.page-tag', { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: 0.05 });
  gsap.to('.page-breadcrumb', { opacity: 1, y: 0, duration: 0.5 });
  if (document.getElementById('scrollHint')) gsap.to('#scrollHint', { opacity: 1, duration: 0.5, delay: 1.2 });
  const bg = document.querySelector('.page-hero-bg');
  if (bg) gsap.to(bg, { yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true } });
}
gsap.set('.page-tag', { opacity: 0, x: -16 });
gsap.set('.page-breadcrumb', { opacity: 0, y: 8 });


/* SCROLL REVEALS */
gsap.utils.toArray('.fade-up').forEach((el, i) => {
  gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
    delay: (i % 3) * 0.06,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
});
gsap.utils.toArray('.fade-left').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});
gsap.utils.toArray('.fade-right').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});
gsap.utils.toArray('.clip-reveal').forEach((el, i) => {
  gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%' }, delay: i * 0.1 });
});

/* CARD/GRID STAGGER */
['.prog-card','.tm-card','.kennel-feat','.ach-item','.resort-feature','.k9-card','.dogs-panel','.disc-card'].forEach(sel => {
  gsap.utils.toArray(sel).forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }, delay: i * 0.1 });
  });
});
gsap.utils.toArray('.gm-item').forEach((el, i) => {
  gsap.fromTo(el, { opacity: 0, scale: 0.96 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' }, delay: i * 0.04 });
});
gsap.utils.toArray('.ig-item').forEach((el, i) => {
  gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, start: 'top 90%' }, delay: i * 0.08 });
});

/* NAV */
function updateNavState() {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', updateNavState, { passive: true });
updateNavState();
function toggleMobile() {
  const m = document.getElementById('mobileOverlay');
  const h = document.querySelector('.hamburger');
  if (m) m.classList.toggle('open');
  if (h) h.classList.toggle('active');
}
function closeMobile() {
  const m = document.getElementById('mobileOverlay');
  const h = document.querySelector('.hamburger');
  if (m) m.classList.remove('open');
  if (h) h.classList.remove('active');
}

/* LIGHTBOX */
let lbImages = [], lbCurrent = 0;
function initLightbox() {
  document.querySelectorAll('[data-lb]').forEach((el, i) => {
    lbImages.push({ src: el.dataset.lb, caption: el.dataset.caption || '' });
    el.addEventListener('click', () => openLightbox(i));
    el.style.cursor = 'pointer';
  });
}
function openLightbox(idx) {
  lbCurrent = idx;
  const lb = document.getElementById('lightbox'), img = document.getElementById('lbImg');
  if (!lb || !img) return;
  img.style.opacity = '0';
  img.src = lbImages[idx].src;
  img.onload = () => gsap.to(img, { opacity: 1, duration: 0.3 });
  document.getElementById('lbInfo').textContent =
    (lbImages[idx].caption ? lbImages[idx].caption + '  ' : '') + '(' + (idx+1) + ' / ' + lbImages.length + ')';
  lb.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox(e) { if(e.target===document.getElementById('lightbox')) closeLightboxBtn(); }
function closeLightboxBtn() { const lb=document.getElementById('lightbox'); if(lb) lb.classList.remove('open'); document.body.style.overflow=''; }
function lbNav(dir) {
  lbCurrent = (lbCurrent+dir+lbImages.length)%lbImages.length;
  const img = document.getElementById('lbImg');
  gsap.to(img, { opacity:0, x:dir*36, scale:0.95, duration:0.18, onComplete:() => {
    img.src = lbImages[lbCurrent].src;
    document.getElementById('lbInfo').textContent = (lbImages[lbCurrent].caption?lbImages[lbCurrent].caption+'  ':'')+
      '('+(lbCurrent+1)+' / '+lbImages.length+')';
    gsap.fromTo(img,{opacity:0,x:-dir*36,scale:0.95},{opacity:1,x:0,scale:1,duration:0.28,ease:'power2.out'});
  }});
}
document.addEventListener('keydown', e => {
  const lb=document.getElementById('lightbox');
  if(!lb||!lb.classList.contains('open')) return;
  if(e.key==='ArrowLeft') lbNav(-1); if(e.key==='ArrowRight') lbNav(1); if(e.key==='Escape') closeLightboxBtn();
});
document.addEventListener('DOMContentLoaded', () => { initLightbox(); });

/* FORM */
function handleForm(e) {
  e.preventDefault();
  const btn=e.target.querySelector('.form-submit'), span=document.getElementById('btnText');
  if(!btn||!span) return;
  btn.disabled=true; span.textContent="✓ Sent — We'll be in touch soon";
  gsap.to(btn,{backgroundColor:'#2a6e2a',duration:0.4});
}

/* SMOOTH ANCHORS */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});

/* ══════════════════════════════════
   HERO VARIANT ANIMATIONS
══════════════════════════════════ */
(function() {
  // SPLIT HERO (about)
  const splitImg = document.getElementById('heroSplitImg');
  if (splitImg) {
    gsap.from(splitImg, { scale:1.1, duration:2.2, ease:'power3.out' });
    gsap.from('.hero-split-right-overlay', { opacity:0, duration:1.5 });
    gsap.from('.hero-split-left > *', { opacity:0, y:30, duration:0.8, stagger:0.12, delay:0.3, ease:'power2.out' });
    gsap.to(splitImg, { yPercent:12, ease:'none',
      scrollTrigger:{ trigger:'.hero-split', start:'top top', end:'bottom top', scrub:true } });
  }

  // TYPOGRAPHIC HERO (training)
  const typoHero = document.querySelector('.hero-typo');
  if (typoHero) {
    gsap.from('.hero-typo-bg-word', { opacity:0, x:60, duration:1.5, ease:'power3.out', delay:0.2 });
    gsap.from('.hero-typo-cat', { opacity:0, y:14, duration:0.5, stagger:0.06, delay:0.4 });
    gsap.from('.hero-typo-left .page-hero-h1', { opacity:0, y:32, duration:0.9, delay:0.6, ease:'power3.out' });
    gsap.from('.hero-typo-left .page-hero-sub', { opacity:0, y:16, duration:0.7, delay:1.0 });
    gsap.from('.hero-typo-num', { opacity:0, duration:1, delay:0.8 });
  }

  // DIAGONAL HERO (kennel)
  const diagImg = document.getElementById('heroParallaxImg');
  if (diagImg) {
    gsap.from(diagImg, { scale:1.1, duration:2, ease:'power3.out' });
    gsap.from('.hero-diag-line', { scaleY:0, duration:1.2, ease:'power3.inOut', delay:0.3, transformOrigin:'top' });
    gsap.from('.hero-diag-content > *', { opacity:0, x:-28, duration:0.8, stagger:0.13, delay:0.5, ease:'power2.out' });
    gsap.from('.hero-diag-fci', { opacity:0, y:20, duration:0.7, delay:1.2, ease:'back.out(1.3)' });
    gsap.to(diagImg, { yPercent:15, ease:'none',
      scrollTrigger:{ trigger:'.hero-diag', start:'top top', end:'bottom top', scrub:true } });
  }

  // MOSAIC HERO (team)
  const mosaicHero = document.querySelector('.hero-mosaic');
  if (mosaicHero) {
    gsap.from('.mosaic-bg img', { opacity:0, scale:1.1, duration:1.2, stagger:0.1, ease:'power2.out' });
    gsap.from('.mosaic-bg-overlay', { opacity:0, duration:0.8, delay:0.5 });
    gsap.from('.hero-mosaic-content > *', { opacity:0, y:24, duration:0.8, stagger:0.12, delay:0.7, ease:'power2.out' });
  }

  // COUNTER HERO (gallery)
  const counterHero = document.querySelector('.hero-counter');
  if (counterHero) {
    gsap.from('.hero-counter-bar', { scaleY:0, duration:1.2, ease:'power3.inOut', transformOrigin:'top' });
    gsap.from('.hero-counter-num', { opacity:0, x:40, duration:1, ease:'power3.out', delay:0.2 });
    gsap.from('.hero-counter-content > *', { opacity:0, y:20, duration:0.7, stagger:0.1, delay:0.4 });
  }

  // STRIPS HERO (dogs)
  const stripsHero = document.querySelector('.hero-strips');
  if (stripsHero) {
    gsap.from('.strip-img img', { scale:1.15, duration:2.2, stagger:0.12, ease:'power3.out' });
    gsap.from('.strips-overlay', { opacity:0, duration:0.8 });
    gsap.from('.hero-strips-content > *', { opacity:0, y:24, duration:0.8, stagger:0.12, delay:0.5 });
    // slow parallax zoom on strips
    document.querySelectorAll('.strip-img img').forEach(img => {
      gsap.to(img, { yPercent:10, ease:'none',
        scrollTrigger:{ trigger:'.hero-strips', start:'top top', end:'bottom top', scrub:true } });
    });
  }

  // VBAR HERO (puppies)
  const vbarHero = document.querySelector('.hero-vbar');
  if (vbarHero) {
    gsap.from('.hero-vbar-stripe', { scaleY:0, duration:1.1, ease:'power3.inOut', transformOrigin:'top', delay:0.2 });
    gsap.from('.hero-vbar-content > *', { opacity:0, x:-20, duration:0.8, stagger:0.1, delay:0.5 });
  }

  // MINIMAL HERO (contact)
  const minimalHero = document.querySelector('.hero-minimal');
  if (minimalHero) {
    gsap.from('.hero-minimal-coords', { opacity:0, y:10, duration:0.6, delay:0.3 });
    gsap.from('.hero-minimal-content > *:not(.hero-minimal-coords)', { opacity:0, y:22, duration:0.8, stagger:0.1, delay:0.6 });
  }
})();

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════
   LOADER
══════════════════════════════════ */
const loaderTL = gsap.timeline({
  onComplete: () => {
    document.getElementById('loader').style.pointerEvents = 'none';
    updateNavState();
    startResortHero();
  }
});

loaderTL
  .from('#loaderIcon', { opacity: 0, scale: 0.5, rotation: -90, duration: 0.8, ease: 'back.out(1.4)' })
  .from('#loaderLogo div:nth-child(2)', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.1')
  .to('#loaderLine', { width: 110, duration: 0.7, ease: 'power2.inOut' }, '-=0.05')
  .to('#loaderSub', { opacity: 1, y: 0, duration: 0.5 })
  .to({}, { duration: 0.5 })
  .to('#loaderLogo', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
  .to('#loaderPanelTop', {
    scaleY: 0, duration: 1.0,
    ease: 'power4.inOut', transformOrigin: 'top'
  }, '-=0.1');


/* ══════════════════════════════════
   RESORT HERO ENTRANCE
══════════════════════════════════ */
function startResortHero() {
  const htl = gsap.timeline();

  htl
    .to('#resortHeroBg', { scale: 1, duration: 2.2, ease: 'power3.out' })
    .to('.resort-hero-tag', { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.3)
    .to('.resort-breadcrumb', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2)
    .to('.resort-hero-h1 .line-inner', { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.14 }, 0.5)
    .to('.resort-hero-sub', { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 1.1)
    .to('.resort-hero-ctas', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 1.35)
    .to('#resortBadge', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.5)
    .to('#scrollHint', { opacity: 1, duration: 0.5 }, 1.75);

  // Initial hidden states
  gsap.set('.resort-hero-tag', { opacity: 0, x: -20 });
  gsap.set('.resort-breadcrumb', { opacity: 0, y: 10 });
  gsap.set('#resortBadge', { opacity: 0 });
}


/* ══════════════════════════════════
   HERO PARALLAX
══════════════════════════════════ */
gsap.to('#resortHeroBg', {
  yPercent: 22, ease: 'none',
  scrollTrigger: {
    trigger: '#resort-hero', start: 'top top', end: 'bottom top', scrub: true
  }
});


/* ══════════════════════════════════
   SCROLL REVEALS
══════════════════════════════════ */
gsap.utils.toArray('.fade-up').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
    delay: (i % 3) * 0.06,
    scrollTrigger: {
      trigger: el, start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });
});


/* ══════════════════════════════════
   RESORT FEATURES — stagger
══════════════════════════════════ */
gsap.utils.toArray('.resort-feature').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
      delay: i * 0.1
    }
  );
});


/* ══════════════════════════════════
   RESORT GALLERY — clip-path wipe
══════════════════════════════════ */
gsap.utils.toArray('.rg-item').forEach((item, i) => {
  gsap.fromTo(item,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: item, start: 'top 90%' },
      delay: i * 0.1
    }
  );
});


/* ══════════════════════════════════
   ACHIEVEMENT ITEMS
══════════════════════════════════ */
gsap.utils.toArray('.ach-item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: -20 },
    {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 88%' },
      delay: i * 0.1
    }
  );
});


/* ══════════════════════════════════
   NAV SCROLL
══════════════════════════════════ */
function updateNavState() {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', updateNavState, { passive: true });
updateNavState();


/* ══════════════════════════════════
   MOBILE MENU
══════════════════════════════════ */
function toggleMobile() {
  document.getElementById('mobileOverlay').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileOverlay').classList.remove('open');
}


/* ══════════════════════════════════
   FORM
══════════════════════════════════ */
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const span = document.getElementById('btnText');
  btn.disabled = true;
  span.textContent = '✓ Sent — We\'ll be in touch soon';
  gsap.to(btn, { backgroundColor: '#2a6e2a', duration: 0.4 });
}


/* ══════════════════════════════════
   SMOOTH ANCHOR LINKS
══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

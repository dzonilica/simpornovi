gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════
   LOADER SEQUENCE
══════════════════════════════════ */
const loaderTL = gsap.timeline({
  onComplete: () => {
    document.getElementById('loader').style.pointerEvents = 'none';
    updateNavState();
    startHero();
  }
});

loaderTL
  // 1. Paw icon draws in
  .from('#loaderIcon', { opacity: 0, scale: 0.4, duration: 0.7, ease: 'back.out(1.6)' })
  // 2. Logo text reveals
  .from('#loaderLogo div:nth-child(2)', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, '-=0.1')
  // 3. Gold line expands
  .to('#loaderLine', { width: 100, duration: 0.75, ease: 'power2.inOut' }, '-=0.05')
  // 4. Tagline fades in
  .to('#loaderSub', { opacity: 1, y: 0, duration: 0.5 })
  // 5. Hold
  .to({}, { duration: 0.6 })
  // 6. Logo fades out + moves up
  .to('#loaderLogo', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' })
  // 7. Panel retracts upward
  .to('#loaderPanelTop', {
    scaleY: 0,
    duration: 1.0,
    ease: 'power4.inOut',
    transformOrigin: 'top'
  }, '-=0.1');


/* ══════════════════════════════════
   HERO ENTRANCE
══════════════════════════════════ */
function startHero() {
  const htl = gsap.timeline();

  // Background gently zooms to normal
  htl.to('#heroBg', { scale: 1, duration: 2.2, ease: 'power3.out' })

  // Corner ornaments appear
  .to(['#hcTL','#hcTR','#hcBL','#hcBR'], {
    opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out'
  }, 0.1)

  // Gold rules extend from center
  .to('#hrTop', { width: '55vw', opacity: 0.45, duration: 1.1, ease: 'power2.inOut' }, 0.2)
  .to('#hrBot', { width: '55vw', opacity: 0.45, duration: 1.1, ease: 'power2.inOut' }, 0.35)

  // Eyebrow slides up
  .to('.hero-eyebrow-inner', { y: 0, duration: 1.0, ease: 'power4.out' }, 0.45)

  // Headline lines stagger up
  .to('.hero-h1 .line-inner', { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.15 }, 0.6)

  // Subtitle + CTAs
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 1.15)
  .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 1.4)

  // Floating badge
  .to('#heroBadge', { opacity: 1, y: 0, duration: 0.75, ease: 'back.out(1.3)' }, 1.55)

  // Scroll hint
  .to('#scrollHint', { opacity: 1, duration: 0.6 }, 1.8);
}


/* ══════════════════════════════════
   HERO PARALLAX
══════════════════════════════════ */
gsap.to('#heroBg', {
  yPercent: 20, ease: 'none',
  scrollTrigger: {
    trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true
  }
});


/* ══════════════════════════════════
   SCROLL REVEALS — .fade-up
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
   GALLERY GRID — clip-path wipe
══════════════════════════════════ */
gsap.utils.toArray('.g-item').forEach((item, i) => {
  gsap.fromTo(item,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: item, start: 'top 90%' },
      delay: i * 0.09
    }
  );
});


/* ══════════════════════════════════
   SERVICE CARDS
══════════════════════════════════ */
gsap.utils.toArray('.srv').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 52 },
    {
      opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
      delay: i * 0.12
    }
  );
});


/* ══════════════════════════════════
   TEAM CARDS
══════════════════════════════════ */
gsap.utils.toArray('.team-card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
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
   PHOTO GALLERY STRIP — slide in
══════════════════════════════════ */
gsap.utils.toArray('.pg-thumb').forEach((th, i) => {
  gsap.fromTo(th,
    { opacity: 0, x: 50 },
    {
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '#photo-gallery', start: 'top 80%' },
      delay: i * 0.06
    }
  );
});


/* ══════════════════════════════════
   FOUNDER FRAME
══════════════════════════════════ */
const founderFrame = document.querySelector('.founder-frame');
if (founderFrame) {
  gsap.fromTo(founderFrame,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1, ease: 'power3.inOut',
      scrollTrigger: { trigger: founderFrame, start: 'top 85%' }
    }
  );
}


/* ══════════════════════════════════
   RESORT TEASER PARALLAX
══════════════════════════════════ */
gsap.to('.resort-bg', {
  yPercent: 15, ease: 'none',
  scrollTrigger: {
    trigger: '#resort-teaser', start: 'top bottom', end: 'bottom top', scrub: true
  }
});


/* ══════════════════════════════════
   STAT COUNTER ANIMATION
══════════════════════════════════ */
gsap.utils.toArray('.stat-n, .fa-val').forEach(el => {
  const endText = el.textContent.trim();
  const endNum = parseFloat(endText);
  if (isNaN(endNum)) return;
  const suffix = endText.replace(/[\d.]/g, '');

  gsap.fromTo({ v: 0 }, { v: endNum,
    duration: 2, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    onUpdate: function() {
      el.textContent = (endNum % 1 !== 0 ? this.targets()[0].v.toFixed(1) : Math.round(this.targets()[0].v)) + suffix;
    }
  });
});


/* ══════════════════════════════════
   NAV — SCROLL STATE
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
   PHOTO GALLERY — DRAG SCROLL
══════════════════════════════════ */
const wrap = document.getElementById('pgStripWrap');
if (wrap) {
  let isDown = false, startX = 0, scrollLeft = 0;

  wrap.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    wrap.style.userSelect = 'none';
    wrap.style.cursor = 'grabbing';
  });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mouseup', () => { isDown = false; wrap.style.userSelect = ''; wrap.style.cursor = 'grab'; });
  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.4;
    wrap.scrollLeft = scrollLeft - walk;
    updateCounter();
  });

  wrap.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    scrollLeft = wrap.scrollLeft;
  }, { passive: true });
  wrap.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX;
    wrap.scrollLeft = scrollLeft - (x - startX) * 1.2;
    updateCounter();
  }, { passive: true });

  wrap.style.overflowX = 'auto';
  wrap.style.scrollBehavior = 'smooth';
  wrap.style.msOverflowStyle = 'none';
  wrap.style.scrollbarWidth = 'none';
  wrap.style.cursor = 'grab';

  // Set total count
  const totalEl = document.getElementById('pgTotal');
  if (totalEl) totalEl.textContent = document.querySelectorAll('.pg-thumb').length;
}

function pgScroll(dir) {
  const wrap = document.getElementById('pgStripWrap');
  wrap.scrollLeft += dir * 400;
  setTimeout(updateCounter, 420);
}

function updateCounter() {
  const wrap = document.getElementById('pgStripWrap');
  const firstThumb = wrap.querySelector('.pg-thumb');
  if (!firstThumb) return;
  const thumbWidth = firstThumb.offsetWidth + 12;
  const idx = Math.round(wrap.scrollLeft / thumbWidth);
  const el = document.getElementById('pgCurrent');
  if (el) el.textContent = String(idx + 1).padStart(2, '0');
}


/* ══════════════════════════════════
   LIGHTBOX
══════════════════════════════════ */
let lbImages = [];
let lbCurrent = 0;

document.querySelectorAll('.pg-thumb').forEach(th => {
  lbImages.push({ src: th.dataset.src, caption: th.dataset.caption });
  th.addEventListener('click', () => {
    openLightbox(parseInt(th.dataset.idx));
  });
});

function openLightbox(idx) {
  lbCurrent = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  img.style.opacity = '0';
  img.src = lbImages[idx].src;
  img.onload = () => {
    gsap.to(img, { opacity: 1, duration: 0.35 });
  };
  document.getElementById('lbInfo').textContent =
    lbImages[idx].caption + '  (' + (idx + 1) + ' / ' + lbImages.length + ')';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) {
    closeLightboxBtn();
  }
}
function closeLightboxBtn() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  lbCurrent = (lbCurrent + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  gsap.to(img, {
    opacity: 0, x: dir * 40, scale: 0.95, duration: 0.2,
    onComplete: () => {
      img.src = lbImages[lbCurrent].src;
      document.getElementById('lbInfo').textContent =
        lbImages[lbCurrent].caption + '  (' + (lbCurrent + 1) + ' / ' + lbImages.length + ')';
      gsap.fromTo(img,
        { opacity: 0, x: -dir * 40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  });
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') closeLightboxBtn();
});


/* ══════════════════════════════════
   CONTACT FORM
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

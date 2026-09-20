/* =========================================================
   Vikas Pandey — Portfolio
   script.js
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    links.classList.toggle('show');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      burger.classList.remove('open');
      links.classList.remove('show');
    }
  });

  /* ---------- sticky nav + scroll progress + back to top ---------- */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progress');
  var topBtn = document.getElementById('topBtn');

  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('stuck', y > 40);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    topBtn.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---------- typing effect ---------- */
  var roles = [
    'Java Full Stack Developer',
    'Spring Boot + MySQL',
    'React on the front end',
    'MCA student, Nagpur'
  ];
  var out = document.getElementById('typed');
  if (reduced) {
    out.textContent = roles[0];
    var c = document.querySelector('.caret');
    if (c) c.style.display = 'none';
  } else {
    var r = 0, i = 0, del = false;
    (function type() {
      var word = roles[r];
      out.textContent = del ? word.slice(0, i--) : word.slice(0, i++);
      var wait = del ? 45 : 85;
      if (!del && i > word.length) { del = true; wait = 1500; }
      else if (del && i < 0) { del = false; i = 0; r = (r + 1) % roles.length; wait = 350; }
      setTimeout(type, wait);
    })();
  }

  /* ---------- reveal on scroll ---------- */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      revealer.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el, n) {
    el.style.transitionDelay = Math.min(n % 6, 5) * 70 + 'ms';
    revealer.observe(el);
  });

  /* ---------- animated skill bars ---------- */
  var barObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.style.width = en.target.dataset.level + '%';
      barObs.unobserve(en.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.fill').forEach(function (el) { barObs.observe(el); });

  /* ---------- active nav link ---------- */
  var navA = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var secObs = new IntersectionObserver(function (entries) {
    var vis = entries.filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
    if (!vis) return;
    navA.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + vis.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6, 1] });
  ['home', 'about', 'skills', 'projects', 'education', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) secObs.observe(el);
  });
})();

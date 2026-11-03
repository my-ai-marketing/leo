(function () {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const nav = $('#sideNav');
  const menuBtn = $('#menuBtn');
  const scrim = $('#menuScrim');
  const progress = $('#progressBar');
  const exitPresent = $('#exitPresent');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a'));

  function setMenu(open) {
    if (!nav || !menuBtn || !scrim) return;
    nav.classList.toggle('open', open);
    scrim.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close ×' : 'Menu ☰';
  }
  if (menuBtn) menuBtn.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  if (scrim) scrim.addEventListener('click', function () { setMenu(false); });
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  function setPresentation(open) {
    document.body.classList.toggle('present', open);
    setMenu(false);
    document.querySelectorAll('.presentBtn').forEach(function (button) {
      button.textContent = open ? 'Exit presentation' : 'Present';
    });
    if (exitPresent) exitPresent.setAttribute('aria-hidden', String(!open));
  }
  document.querySelectorAll('.presentBtn').forEach(function (button) {
    button.addEventListener('click', function () {
      setPresentation(!document.body.classList.contains('present'));
    });
  });
  if (exitPresent) exitPresent.addEventListener('click', function () { setPresentation(false); });
  document.querySelectorAll('.printBtn').forEach(function (button) {
    button.addEventListener('click', function () { window.print(); });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenu(false);
      if (document.body.classList.contains('present')) setPresentation(false);
    }
  });

  let ticking = false;
  function paintScroll() {
    const doc = document.documentElement;
    const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = (Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))) + '%';
    let current = sections.length ? sections[0].id : '';
    const edge = window.scrollY + window.innerHeight * 0.36;
    sections.forEach(function (section) {
      if (section.offsetTop <= edge) current = section.id;
    });
    navLinks.forEach(function (link) {
      const active = link.getAttribute('href') === '#' + current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(paintScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', paintScroll);
  paintScroll();

  const fields = ['leads', 'qual', 'meet', 'attend', 'book'];
  const defaults = [300, 30, 55, 75, 10];
  function inputValue(id, max) {
    const el = $('#' + id);
    const n = el ? Number(el.value) : 0;
    return Number.isFinite(n) ? Math.max(0, Math.min(max, n)) : 0;
  }
  function roundCount(n) {
    return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(n);
  }
  function calculate() {
    const leads = inputValue('leads', 100000);
    const qual = leads * inputValue('qual', 100) / 100;
    const booked = qual * inputValue('meet', 100) / 100;
    const attended = booked * inputValue('attend', 100) / 100;
    const reservations = attended * inputValue('book', 100) / 100;
    const out = {
      outQual: roundCount(qual),
      outMeet: roundCount(booked),
      outAttend: roundCount(attended),
      outBook: reservations.toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
    };
    Object.keys(out).forEach(function (id) {
      const el = $('#' + id);
      if (el) el.textContent = out[id];
    });
  }
  fields.forEach(function (id) {
    const el = $('#' + id);
    if (el) el.addEventListener('input', calculate);
  });
  const reset = $('#resetPlanner');
  if (reset) reset.addEventListener('click', function () {
    fields.forEach(function (id, i) {
      const el = $('#' + id);
      if (el) el.value = defaults[i];
    });
    calculate();
  });
  calculate();
})();
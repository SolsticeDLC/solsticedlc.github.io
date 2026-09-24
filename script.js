// Mobile menu (only on pages that have it)
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Active nav on scroll (only anchor navs)
const sections = [...document.querySelectorAll('main section[id]')];
const navA = [...document.querySelectorAll('.links a[href^="#"]')];
if (sections.length && navA.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let cur = sections[0].id;
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  });
}
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 10px 30px #0008' : 'none';
});

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Fake download (замени на реальную ссылку)
function fakeDownload(e) {
  e.preventDefault();
  const n = document.getElementById('dlNote');
  if (!n) return false;
  n.textContent = '⚙️ Ссылка не привязана: вставь свой .jar в href кнопки.';
  n.style.color = '#ff4444';
  return false;
}

// Stars canvas
const c = document.getElementById('stars'), x = c ? c.getContext('2d') : null;
let stars = [];
function resize() {
  if (!c) return;
  c.width = innerWidth; c.height = innerHeight;
  stars = Array.from({ length: Math.min(160, innerWidth / 8) }, () => ({
    x: Math.random() * c.width, y: Math.random() * c.height,
    r: Math.random() * 1.6 + .3, s: Math.random() * .4 + .1
  }));
}
if (c && x) {
  resize(); addEventListener('resize', resize);
  (function anim() {
    x.clearRect(0, 0, c.width, c.height);
    x.fillStyle = '#ff8a8a';
    stars.forEach(st => {
      st.y += st.s; if (st.y > c.height) st.y = 0;
      x.globalAlpha = .3 + Math.random() * .5;
      x.beginPath(); x.arc(st.x, st.y, st.r, 0, 7); x.fill();
    });
    requestAnimationFrame(anim);
  })();
}

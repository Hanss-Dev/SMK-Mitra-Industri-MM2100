const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
};

const slides = document.querySelectorAll('.yuko-item');
const texts = document.querySelectorAll('.yuko-content-item');
const bg = document.querySelector('.yuko-sldr-bg');
const dotsWrap = document.querySelector('.yuko-dots');
let index = 0;

/* dots */
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.onclick = () => go(i);
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.children;

function go(i) {
  slides[index].classList.remove('active');
  texts[index].classList.remove('active');
  dots[index].classList.remove('active');

  index = i;

  slides[index].classList.add('active');
  texts[index].classList.add('active');
  dots[index].classList.add('active');

  bg.style.backgroundImage = `url(${slides[index].dataset.bg})`;
}

document.getElementById('prev').onclick = () =>
  go((index - 1 + slides.length) % slides.length);

document.getElementById('next').onclick = () =>
  go((index + 1) % slides.length);

/* init */
bg.style.backgroundImage = `url(${slides[0].dataset.bg})`;
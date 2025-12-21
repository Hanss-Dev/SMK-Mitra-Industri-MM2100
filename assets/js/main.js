
/* =========================
   NAV TOGGLE (AMAN)
========================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
  });
}

/* =========================
   DROPDOWN MENU (klik arrow)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  dropdownItems.forEach(item => {
    const link = item.querySelector(".nav__link");
    link.addEventListener("click", () => {
      // tutup semua dropdown lain
      dropdownItems.forEach(i => {
        if (i !== item) i.classList.remove("open");
      });
      // toggle dropdown yang diklik
      item.classList.toggle("open");
    });
  });
});

/* =========================
   SLIDER HERO (smi-lite)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".smi-liteTrack");
  const slides = document.querySelectorAll(".smi-liteSlide");
  const prevBtn = document.querySelector(".smi-liteBtn.prev");
  const nextBtn = document.querySelector(".smi-liteBtn.next");
  const dotsContainer = document.querySelector(".smi-liteDots");

  let currentPage = 0;
  let slidesPerPage = window.innerWidth > 992 ? 2 : 1;
  let totalPages = Math.ceil(slides.length / slidesPerPage);
  let slideWidth = slides[0].offsetWidth + 16;

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === currentPage) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentPage = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const offset = currentPage * slideWidth * slidesPerPage;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPage);
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateSlider();
    }
  });

  setInterval(() => {
    currentPage = (currentPage < totalPages - 1) ? currentPage + 1 : 0;
    updateSlider();
  }, 4000);

  window.addEventListener("resize", () => {
    slidesPerPage = window.innerWidth > 992 ? 2 : 1;
    totalPages = Math.ceil(slides.length / slidesPerPage);
    slideWidth = slides[0].offsetWidth + 16;
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
});

/* =========================
   SLIDER GENERIC (.slider)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 5000);
});

/* =========================
   TABS FILTER (.tab)
========================= */
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".network-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      if (filter === "all" || card.dataset.type === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* =========================
   BERITA SLIDER (.berita-slider)
========================= */
const beritaSlider = document.querySelector('.berita-slider');
document.querySelector('.next').addEventListener('click', () => {
  beritaSlider.scrollBy({ left: 320, behavior: 'smooth' });
});
document.querySelector('.prev').addEventListener('click', () => {
  beritaSlider.scrollBy({ left: -320, behavior: 'smooth' });
});
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
    const trigger = item.querySelector(".nav__link");

    trigger.addEventListener("click", (e) => {
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        e.preventDefault();
        e.stopPropagation(); // WAJIB biar tidak langsung ketutup
        item.classList.toggle("open");
      }
    });
  });
});

/* =========================
   CLOSE DROPDOWN ON OUTSIDE CLICK
========================= */
document.addEventListener("click", (e) => {
  // hanya untuk TOUCH device
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    const clickedInsideDropdown = e.target.closest(".dropdown__item");

    if (!clickedInsideDropdown) {
      document
        .querySelectorAll(".dropdown__item.open")
        .forEach(item => item.classList.remove("open"));
    }
  }
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
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".berita-slider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!slider || !prevBtn || !nextBtn) return;

  let autoSlideInterval;

  function getScrollAmount() {
    const card = slider.querySelector(".berita-card");
    const gap = 20;
    return card ? card.offsetWidth + gap : 300;
  }

  function slideNext() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 5) {
      // balik ke awal kalau sudah mentok kanan
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    }
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(slideNext, 5000); // 5 detik
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  // Tombol manual
  nextBtn.addEventListener("click", () => {
    slideNext();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
    startAutoSlide();
  });

  // Pause saat hover (desktop)
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Pause saat swipe (mobile)
  slider.addEventListener("touchstart", stopAutoSlide);
  slider.addEventListener("touchend", startAutoSlide);

  // Start
  startAutoSlide();
});

/* =========================
   YUKO SLIDER (LOAD GAMBAR SAAT AKTIF)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".yuko-sldr");
  if (!slider) return;

  const items = slider.querySelectorAll(".yuko-item");
  const contents = slider.querySelectorAll(".yuko-content-item");
  const bg = slider.querySelector(".yuko-sldr-bg");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");

  let index = 0;
  let autoTimer;

  function loadImage(item) {
    const img = item.querySelector("img");
    if (img && !img.src) {
      img.src = img.dataset.src;
      img.loading = "lazy";
      img.decoding = "async";
    }
  }

  function showSlide(i) {
    items.forEach(el => el.classList.remove("active"));
    contents.forEach(el => el.classList.remove("active"));

    const item = items[i];
    item.classList.add("active");
    contents[i]?.classList.add("active");

    // load hanya saat aktif
    loadImage(item);

    // background ikut ganti
    bg.style.backgroundImage = `url(${item.dataset.bg})`;

    index = i;
  }

  function nextSlide() {
    showSlide((index + 1) % items.length);
  }

  function prevSlide() {
    showSlide((index - 1 + items.length) % items.length);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  next?.addEventListener("click", () => {
    nextSlide();
    startAuto();
  });

  prev?.addEventListener("click", () => {
    prevSlide();
    startAuto();
  });

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // INIT
  loadImage(items[0]);
  bg.style.backgroundImage = `url(${items[0].dataset.bg})`;
  startAuto();
});


document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-new video");
  if (!video) return;

  video.pause();
  setTimeout(() => video.play(), 500);
});
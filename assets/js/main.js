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

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".smi-liteSlider");
  const viewport = slider.querySelector(".smi-liteViewport");
  const track = slider.querySelector(".smi-liteTrack");
  const slides = Array.from(slider.querySelectorAll(".smi-liteSlide"));
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  const dotsWrap = slider.querySelector(".smi-liteDots");

  let index = 0;                 // slide aktif
  const total = slides.length;   // total slide

  /* =====================
     CORE UPDATE (CENTER)
  ===================== */
  function update() {
    const slide = slides[0];
    const slideRect = slide.getBoundingClientRect();
    const slideWidth = slideRect.width;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    // offset supaya slide aktif pas di tengah viewport
    const offset =
      index * (slideWidth + gap) -
      (viewport.clientWidth - slideWidth) / 2;

    track.style.transform = `translateX(-${Math.max(offset, 0)}px)`;

    // update dots
    dotsWrap.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // update nav
    prev.classList.toggle("disabled", index === 0);
    next.classList.toggle("disabled", index === total - 1);
  }

  /* =====================
     DOTS
  ===================== */
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      if (i === index) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    }
  }

  /* =====================
     NAVIGATION
  ===================== */
  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });

  next.addEventListener("click", () => {
    if (index < total - 1) {
      index++;
      update();
    }
  });

  /* =====================
     RESIZE (RE-CENTER)
  ===================== */
  window.addEventListener("resize", () => {
    update(); // cukup hitung ulang posisi center
  });

  buildDots();
  update();
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

document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('ppdb-popup');
  const popupClose = popup.querySelector('.close-btn');

  function openPopup() {
    popup.style.display = 'flex';
  }

  function closePopup() {
    popup.style.display = 'none';
  }

  setTimeout(openPopup, 1500);

  popupClose.addEventListener('click', closePopup);
  popup.addEventListener('click', function(e) {
    if (e.target === popup) closePopup();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const figuran = document.querySelector(".vt-vr");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          figuran.classList.add("is-visible");
          observer.unobserve(figuran);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(figuran);
});
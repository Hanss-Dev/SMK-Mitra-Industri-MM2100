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


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".smi-liteSlider");
  const track  = slider.querySelector(".smi-liteTrack");
  const slides = slider.querySelectorAll(".smi-liteSlide");
  const prevBtn = slider.querySelector(".smi-liteBtn.prev");
  const nextBtn = slider.querySelector(".smi-liteBtn.next");
  const dotsWrap = slider.querySelector(".smi-liteDots");

  if (!track || slides.length === 0) return;

  const GAP = 16;
  let index = 0;
  let timer;

  function slideWidth() {
    return slides[0].offsetWidth + GAP;
  }

  function visibleCount() {
    return Math.round(
      slider.querySelector(".smi-liteViewport").offsetWidth /
      slides[0].offsetWidth
    );
  }

  function maxIndex() {
    return slides.length - visibleCount();
  }

  function update() {
    track.style.transform = `translateX(-${index * slideWidth()}px)`;
    updateDots();
  }

  function next() {
    if (index >= maxIndex()) {
      index = 0; // 🔥 BALIK KE AWAL
    } else {
      index++;
    }
    update();
  }

  function prev() {
    if (index <= 0) {
      index = maxIndex(); // 🔥 LOMPAT KE AKHIR
    } else {
      index--;
    }
    update();
  }

  /* DOTS */
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const d = document.createElement("button");
      d.addEventListener("click", () => {
        index = i;
        update();
        restart();
      });
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll("button");
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  /* AUTOPLAY */
  function start() {
    stop();
    timer = setInterval(next, 5000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  function restart() {
    stop();
    start();
  }

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });

  prevBtn.addEventListener("click", () => {
    prev();
    restart();
  });

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  slider.addEventListener("touchstart", stop);
  slider.addEventListener("touchend", start);

  window.addEventListener("resize", () => {
    index = Math.min(index, maxIndex());
    buildDots();
    update();
  });

  buildDots();
  update();
  start();
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".jg-track");
  const slides = document.querySelectorAll(".jg-slide");
  if (!track || slides.length === 0) return;

  let index = 0;
  let startX = 0;
  let isDragging = false;

  function slidesPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 4;
  }

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function next() {
    const maxIndex = slides.length - slidesPerView();
    if (index >= maxIndex) {
      index = 0; // BALIK KE AWAL
    } else {
      index++;
    }
    updateSlider();
  }

  function prev() {
    if (index <= 0) {
      index = slides.length - slidesPerView();
    } else {
      index--;
    }
    updateSlider();
  }

  // TOUCH EVENTS (HP)
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchend", e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) next();
    else if (diff < -50) prev();

    isDragging = false;
  });

  window.addEventListener("resize", updateSlider);
});

// =======================================
// NILAI UTAMA – TRUE 3D POP (PER ITEM)
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".nilai-item");

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // delay bertahap biar kerasa "nimbul satu-satu"
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 180);

          obs.unobserve(entry.target); // jalan sekali
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  items.forEach(item => observer.observe(item));
});

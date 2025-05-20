document.addEventListener("DOMContentLoaded", () => {
  fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
      fillAboutMe(data.about_me);
      fillIcons(".social-icons", data.social_media_icons);
      fillIcons(".tools-icons", data.tools_icons);

      fillTimeline("projects", data.projects);
      fillTimeline("education", data.education);
      fillTimeline("achievements", data.achievements);
      initializeSwiper();
      initializeGalleryImageModal();
    });

  function fillAboutMe(aboutText) {
    const aboutEl = document.querySelector(".intro .about");
    if (aboutEl) aboutEl.innerHTML = aboutText;
  }

  function fillIcons(containerSelector, icons) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    icons.forEach((icon) => {
      const a = document.createElement("a");
      a.href = icon.click_link || "#";
      a.target = "_blank";
      a.innerHTML = `<img src="${icon.link}" alt="${icon.alt}" />`;
      container.appendChild(a);
    });
  }

  function fillTimeline(sectionId, items) {
    const container = document.querySelector(`#${sectionId} .timeline`);
    if (!container) return;
    if (!items) {
      console.log("Empty items for: " + sectionId);
      return;
    }
    items.forEach((project) => {
      const card = document.createElement("div");
      const link = project.link || "#";
      const linkViewSymbol = project.link
        ? `<i class="fa-solid fa-link"></i>`
        : `<i class="fa-solid fa-link-slash"></i>`;
      card.className = "timeline-card";

      card.innerHTML = `
            <div class="timeline-card-header">
                <div class="timeline-card-title-container">
                    <h2 class="timeline-card-title">${project.title}</h2>
                    <img src="${project.image}" alt="${
        project.title
      }" class="timeline-card-image" />
                </div>
            </div>
            <div class="timeline-card-description">
                ${project.description}
            </div>
            <div class="timeline-card-gallery">
                <div class="swiper swiper-timeline-card">
                    <div class="swiper-wrapper">
                        ${project.gallery
                          .map(
                            (img) => `
                            <div class="swiper-slide">
                                <img src="${img}" alt="${project.title} Screenshot" class="gallery-image" />
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="timeline-card-footer">
                <a href="${link}" class="timeline-card-link">${linkViewSymbol}</a>
                <span class="timeline-card-date">${project.date}</span>
            </div>
      `;

      container.appendChild(card);
    });
  }
});
function initializeSwiper() {
  const swiperContainers = document.querySelectorAll(".swiper-timeline-card");

  swiperContainers.forEach((container, index) => {
    const swiperClass = `timelineCardSwiper-${index + 1}`;
    container.classList.add(swiperClass);
    if (!container.querySelector(".swiper-pagination")) {
      const pagination = document.createElement("div");
      pagination.className = "swiper-pagination";
      container.appendChild(pagination);
    }
    new Swiper(`.${swiperClass}`, {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        el: `.${swiperClass} .swiper-pagination`,
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  });
}
function initializeGalleryImageModal() {
  const modal = document.createElement("div");
  modal.id = "gallery-modal";
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
  modal.innerHTML = `<img id="gallery-modal-img" style="max-width: 90vw; max-height: 90vh; border-radius: 10px;" />`;
  document.body.appendChild(modal);

  modal.addEventListener("click", () => (modal.style.display = "none"));

  document.querySelectorAll(".gallery-image").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      document.getElementById("gallery-modal-img").src = img.src;
      modal.style.display = "flex";
    });
  });
}

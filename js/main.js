const skills = ["Full Stack", "JavaScript", "HTML5-CSS3", "SQL", "Frontend-Backend"];
const typedSpan = document.getElementById("typed");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = skills[wordIndex];

  if (!isDeleting) {
    // ESCRIBIENDO PALABRA
    typedSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);  // PAUSA ANTES DE BORRAR
    } else {
      setTimeout(typeEffect, 150);
    }

  } else {
    // BORRANDO LA PALABRA
    typedSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % skills.length;
      setTimeout(typeEffect, 500);  // PAUSA ANTES DE ESCRIBIR SIGUIENTE PALABRA
    } else {
      setTimeout(typeEffect, 100);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeEffect, 500);
});


document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll("section[id]");
  const enlacesSidebar = document.querySelectorAll(".menu a");

  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    secciones.forEach(seccion => {
      const seccionTop = seccion.offsetTop - 100;
      const seccionHeight = seccion.offsetHeight;
      const seccionId = seccion.getAttribute("id");

      if (scrollY >= seccionTop && scrollY < seccionTop + seccionHeight) {
        enlacesSidebar.forEach(enlace => {
          enlace.classList.remove("activo");
          if (enlace.getAttribute("href") === `#${seccionId}`) {
            enlace.classList.add("activo");
          }
        });
      }
    });
  });
});

//FADE IN IMAGEN PERFIL CENTRO

const perfilImg = document.querySelector(".imagenperfil");
const linkInicio = document.querySelector('a[href="#inicio"]');

linkInicio.addEventListener("click", () => {
  perfilImg.classList.remove("fade-in");
  void perfilImg.offsetWidth;
  perfilImg.classList.add("fade-in");
});

document.addEventListener("DOMContentLoaded", () => {
  const perfilImg = document.querySelector(".imagenperfil");
  const heroImg = document.querySelector(".hero-imagen img");
  const linkInicio = document.querySelector('a[href="#inicio"]');

  linkInicio.addEventListener("click", () => {
    [perfilImg, heroImg].forEach(el => {
      el.classList.remove("fade-in", "fade-in-imagen");
      void el.offsetWidth; // Forzar reflujo para reiniciar animación
      if (el.classList.contains("imagenperfil")) {
        el.classList.add("fade-in");
      } else {
        el.classList.add("fade-in-imagen");
      }
    });
  });
});

// AGRANDADO DE IMAGEN DE CERTIFICADO

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".certificado-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const cerrarBtn = document.querySelector(".cerrar");

  items.forEach(item => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").getAttribute("src");
      lightboxImg.src = imgSrc;
      lightbox.classList.add("visible");
    });
  });

  function hideLightbox() {
    lightbox.classList.remove("visible");
  }

  cerrarBtn.addEventListener("click", hideLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      hideLightbox();
    }
  });

  lightbox.addEventListener("transitionend", () => {
    if (!lightbox.classList.contains("visible")) {
      lightbox.style.visibility = "hidden";
    }
  });

  const observer = new MutationObserver(() => {
    if (lightbox.classList.contains("visible")) {
      lightbox.style.visibility = "visible";
    }
  });

  observer.observe(lightbox, { attributes: true, attributeFilter: ['class'] });
});



document.addEventListener("DOMContentLoaded", () => {
  // Lista de skills que están en proceso (poner el texto exacto del <span>)
  const inProgress = ["Python", "MongoDB", "React"]; // ejemplo

  const skillItems = document.querySelectorAll(".skills-grid .skill-item");

  skillItems.forEach(item => {
    const label = item.querySelector("span")?.textContent?.trim();
    if (label && inProgress.includes(label)) {
      item.classList.add("in-progress");
    }
  });
});

// --- Lightbox solo para videos ---
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("#proyectos video");

  videos.forEach(video => {
    video.style.cursor = "pointer";
    video.addEventListener("click", () => {
      // Crear overlay
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(0,0,0,0.9)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = 9999;

      // Clonar el video
      const clone = document.createElement("video");
      clone.src = video.currentSrc || video.src;
      clone.controls = true;
      clone.autoplay = true;
      clone.style.maxWidth = "90%";
      clone.style.maxHeight = "90%";
      clone.style.borderRadius = "10px";
      overlay.appendChild(clone);

      // Cerrar con clic afuera o ESC
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
        clone.pause();
      });

      document.addEventListener("keydown", function escClose(e) {
        if (e.key === "Escape") {
          overlay.remove();
          clone.pause();
          document.removeEventListener("keydown", escClose);
        }
      });

      document.body.appendChild(overlay);
    });
  });
});

// EFECTO DE ESCRITURA - SKILLS //

const skills = [
  "Backend Developer",
  "JavaScript",
  "Node.js",
  "Express.js",
  "REST APIs",
  "MongoDB",
  "Mongoose",
  "SQL",
  "MySQL",
  "Docker",
  "Swagger / OpenAPI",
  "Git & GitHub",
  "Mocha · Chai · Supertest"
];

const typedSpan = document.getElementById("typed");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedSpan) return;

  const currentWord = skills[wordIndex];

  if (!isDeleting) {
    // ESCRIBIENDO PALABRA
    typedSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;

      // PAUSA ANTES DE BORRAR
      setTimeout(typeEffect, 1500);
    } else {
      setTimeout(typeEffect, 150);
    }
  } else {
    // BORRANDO PALABRA
    typedSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % skills.length;

      // PAUSA ANTES DE ESCRIBIR LA SIGUIENTE
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, 100);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typedSpan) {
    setTimeout(typeEffect, 500);
  }
});


// MARCAR SECCIÓN ACTIVA EN EL SIDEBAR //
document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll("section[id]");
  const enlacesSidebar = document.querySelectorAll(".menu a");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    secciones.forEach((seccion) => {
      const seccionTop = seccion.offsetTop - 100;
      const seccionHeight = seccion.offsetHeight;
      const seccionId = seccion.getAttribute("id");

      if (
        scrollY >= seccionTop &&
        scrollY < seccionTop + seccionHeight
      ) {
        enlacesSidebar.forEach((enlace) => {
          enlace.classList.remove("activo");

          if (enlace.getAttribute("href") === `#${seccionId}`) {
            enlace.classList.add("activo");
          }
        });
      }
    });
  });
});


// FADE IN DE IMÁGENES AL VOLVER A INICIO //

document.addEventListener("DOMContentLoaded", () => {
  const perfilImg = document.querySelector(".imagenperfil");
  const heroImg = document.querySelector(".hero-imagen img");
  const linkInicio = document.querySelector('a[href="#inicio"]');

  if (!linkInicio) return;

  linkInicio.addEventListener("click", () => {
    if (perfilImg) {
      perfilImg.classList.remove("fade-in");

      // Forzar reflujo para reiniciar la animación
      void perfilImg.offsetWidth;

      perfilImg.classList.add("fade-in");
    }

    if (heroImg) {
      heroImg.classList.remove("fade-in-imagen");

      // Forzar reflujo para reiniciar la animación
      void heroImg.offsetWidth;

      heroImg.classList.add("fade-in-imagen");
    }
  });
});


// LIGHTBOX DE CERTIFICADOS //

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".certificado-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const cerrarBtn = document.querySelector(".cerrar");

  if (!lightbox || !lightboxImg || !cerrarBtn) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const imagen = item.querySelector("img");

      if (!imagen) return;

      lightboxImg.src = imagen.getAttribute("src");
      lightbox.style.visibility = "visible";
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

  // Cerrar también con ESC
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      lightbox.classList.contains("visible")
    ) {
      hideLightbox();
    }
  });

  lightbox.addEventListener("transitionend", () => {
    if (!lightbox.classList.contains("visible")) {
      lightbox.style.visibility = "hidden";
    }
  });
});


// LIGHTBOX DE VIDEOS DE PROYECTOS //

document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("#proyectos video");

  videos.forEach((video) => {
    video.style.cursor = "pointer";

    video.addEventListener("click", () => {
      // Crear overlay
      const overlay = document.createElement("div");

      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "9999";

      // Clonar video
      const clone = document.createElement("video");

      clone.src = video.currentSrc || video.src;
      clone.controls = true;
      clone.autoplay = true;
      clone.style.maxWidth = "90%";
      clone.style.maxHeight = "90%";
      clone.style.borderRadius = "10px";

      overlay.appendChild(clone);

      // Función para cerrar el lightbox
      function cerrarVideo() {
        clone.pause();
        overlay.remove();

        document.removeEventListener("keydown", escClose);
      }

      // Cerrar haciendo clic fuera del video
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          cerrarVideo();
        }
      });

      // Cerrar con ESC
      function escClose(e) {
        if (e.key === "Escape") {
          cerrarVideo();
        }
      }

      document.addEventListener("keydown", escClose);

      document.body.appendChild(overlay);
    });
  });
});
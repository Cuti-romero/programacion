/* ══════════════════════════════════════════
   TEMA CLARO / OSCURO
══════════════════════════════════════════ */

const btnTema = document.getElementById("btn-tema");
const iconoTema = document.getElementById("icono-tema");

// Recuperar tema guardado
const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "claro") {
  document.body.classList.add("tema-claro");
  iconoTema.textContent = "☽";
}

btnTema.addEventListener("click", () => {
  const esClaro = document.body.classList.toggle("tema-claro");
  iconoTema.textContent = esClaro ? "☽" : "☀";
  localStorage.setItem("tema", esClaro ? "claro" : "oscuro");
});

const bloques = [
  { header: "btn-info-1", cuerpo: "cuerpo-1", flecha: "flecha-1" },
  { header: "btn-info-2", cuerpo: "cuerpo-2", flecha: "flecha-2" },
  { header: "btn-info-3", cuerpo: "cuerpo-3", flecha: "flecha-3" },
];

bloques.forEach(({ header, cuerpo, flecha }) => {
  const btnHeader = document.getElementById(header);
  const elCuerpo = document.getElementById(cuerpo);
  const elFlecha = document.getElementById(flecha);

  if (!btnHeader || !elCuerpo || !elFlecha) return;

  btnHeader.addEventListener("click", () => {
    const estaAbierto = elCuerpo.classList.contains("visible");

    // Cerrar todos los demás primero
    bloques.forEach(({ cuerpo: c, flecha: f }) => {
      const otroC = document.getElementById(c);
      const otroF = document.getElementById(f);
      if (otroC && otroF) {
        otroC.classList.remove("visible");
        otroF.classList.remove("abierto");
      }
    });

    // Abrir o cerrar el clickeado
    if (!estaAbierto) {
      elCuerpo.classList.add("visible");
      elFlecha.classList.add("abierto");
    }
  });
});

/* ══════════════════════════════════════════
   CARRUSEL DE IMÁGENES
══════════════════════════════════════════ */

const track    = document.getElementById('carrusel-track');
const btnPrev  = document.getElementById('carrusel-prev');
const btnNext  = document.getElementById('carrusel-next');
const dotsWrap = document.getElementById('carrusel-dots');
const slides   = document.querySelectorAll('.carrusel-slide');

let actual    = 0;
let autoplay  = null;
const total   = slides.length;
const DELAY   = 4000; // milisegundos entre slides

// ── Crear dots automáticamente
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('carrusel-dot');
  dot.setAttribute('aria-label', `Imagen ${i + 1}`);
  if (i === 0) dot.classList.add('activo');
  dot.addEventListener('click', () => {
    irA(i);
    reiniciarAutoplay();
  });
  dotsWrap.appendChild(dot);
});

const dots = document.querySelectorAll('.carrusel-dot');

// ── Ir a un slide específico
function irA(index) {
  // Limitar índice entre 0 y total - 1
  actual = Math.max(0, Math.min(index, total - 1));

  // Mover el track
  track.style.transform = `translateX(-${actual * 100}%)`;

  // Actualizar dots
  dots.forEach((d, i) => d.classList.toggle('activo', i === actual));

  // Habilitar / deshabilitar botones
  btnPrev.disabled = actual === 0;
  btnNext.disabled = actual === total - 1;
}

// ── Autoplay
function iniciarAutoplay() {
  autoplay = setInterval(() => {
    // Al llegar al último vuelve al primero
    irA(actual < total - 1 ? actual + 1 : 0);
    // Cuando vuelve al inicio, habilitar botón anterior
    if (actual === 0) btnPrev.disabled = false;
  }, DELAY);
}

function reiniciarAutoplay() {
  clearInterval(autoplay);
  iniciarAutoplay();
}

// ── Botones
btnPrev.addEventListener('click', () => {
  if (actual > 0) {
    irA(actual - 1);
    reiniciarAutoplay();
  }
});

btnNext.addEventListener('click', () => {
  if (actual < total - 1) {
    irA(actual + 1);
    reiniciarAutoplay();
  }
});

// ── Swipe en mobile
let touchStartX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && actual < total - 1) irA(actual + 1);
    if (diff < 0 && actual > 0)         irA(actual - 1);
    reiniciarAutoplay();
  }
});

// ── Pausar autoplay al pasar el mouse
track.addEventListener('mouseenter', () => clearInterval(autoplay));
track.addEventListener('mouseleave', () => iniciarAutoplay());

// ── Teclado (flechas)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft'  && actual > 0)         { irA(actual - 1); reiniciarAutoplay(); }
  if (e.key === 'ArrowRight' && actual < total - 1) { irA(actual + 1); reiniciarAutoplay(); }
});

// ── Iniciar
irA(0);
iniciarAutoplay();
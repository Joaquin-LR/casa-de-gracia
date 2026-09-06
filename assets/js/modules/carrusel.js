import { obtenerAnuncios } from './utils.js';

let currentIndex = 1; // 1 porque el índice 0 es el clon del último anuncio
let autoplayTimer = null;
let isTransitioning = false;

export function initCarrusel() {
  const slidesContainer = document.getElementById('carousel-slides');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  const listaAnuncios = obtenerAnuncios();

  if (!slidesContainer || listaAnuncios.length === 0) return;

  const totalOriginal = listaAnuncios.length;

  if (totalOriginal === 1) {
    slidesContainer.innerHTML = renderSlideHTML(listaAnuncios[0], 0, totalOriginal);
    return;
  }

  // Estructura en bucle: [CLON ÚLTIMO, Anuncio 1, Anuncio 2, ..., CLON PRIMERO]
  const primerClon = listaAnuncios[0];
  const ultimoClon = listaAnuncios[totalOriginal - 1];
  const slidesConClones = [ultimoClon, ...listaAnuncios, primerClon];

  slidesContainer.innerHTML = slidesConClones.map((anuncio, idxEnLista) => {
    let realIdx = idxEnLista - 1;
    if (idxEnLista === 0) realIdx = totalOriginal - 1;
    if (idxEnLista === slidesConClones.length - 1) realIdx = 0;

    return renderSlideHTML(anuncio, realIdx, totalOriginal);
  }).join('');

  // Posicionar en el primer anuncio real sin animación
  slidesContainer.style.transition = 'none';
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Listener para el intercambio invisible cuando se llega a un clon
  slidesContainer.addEventListener('transitionend', (e) => {
    // Asegurar que evaluamos solo la animación de 'transform'
    if (e.propertyName !== 'transform') return;

    const slidesCount = slidesConClones.length;

    // Llegamos al clon del final -> Saltar al primer elemento real
    if (currentIndex >= slidesCount - 1) {
      slidesContainer.style.transition = 'none';
      currentIndex = 1;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      // Forzar lectura de propiedad para refrescar el render sin animación (Reflow)
      void slidesContainer.offsetHeight; 
    }

    // Llegamos al clon del principio -> Saltar al último elemento real
    if (currentIndex <= 0) {
      slidesContainer.style.transition = 'none';
      currentIndex = slidesCount - 2;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      void slidesContainer.offsetHeight;
    }

    isTransitioning = false;
  });

  // Delegación de clics en los puntos (dots)
  slidesContainer.addEventListener('click', (e) => {
    const btnDot = e.target.closest('.btn-dot');
    if (btnDot && !isTransitioning) {
      const idx = parseInt(btnDot.getAttribute('data-slide'), 10);
      irASlide(idx + 1);
    }
  });

  // Botones de navegación
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (!isTransitioning) {
        moverSlide(-1);
        reiniciarAutoplay();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (!isTransitioning) {
        moverSlide(1);
        reiniciarAutoplay();
      }
    });
  }

  // Eventos para Gestos Táctiles (Swipe)
  let touchStartX = 0;
  let touchStartY = 0;

  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  slidesContainer.addEventListener('touchend', (e) => {
    if (isTransitioning) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        moverSlide(1);
      } else {
        moverSlide(-1);
      }
      reiniciarAutoplay();
    }
  }, { passive: true });

  iniciarAutoplay();
}

function renderSlideHTML(anuncio, realIdx, totalOriginal) {
  const imagenSrc = anuncio.imagen || anuncio.url || '';
  const tituloTexto = anuncio.titulo || anuncio.alt || '';

  const dotsHTML = Array.from({ length: totalOriginal }).map((_, dotIdx) => `
    <button 
      data-slide="${dotIdx}"
      class="btn-dot dot-item h-2.5 rounded-full transition-all duration-300 ${dotIdx === realIdx ? 'w-6 bg-sky-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'}"
      aria-label="Ir al anuncio ${dotIdx + 1}"
    ></button>
  `).join('');

  return `
    <div class="min-w-full w-full flex flex-col bg-slate-900 overflow-hidden flex-shrink-0 select-none">
      <div class="relative w-full aspect-square sm:aspect-video max-h-[450px] bg-slate-950 flex items-center justify-center overflow-hidden">
        <img 
          src="${imagenSrc}" 
          alt="${tituloTexto}" 
          class="w-full h-full object-contain object-center pointer-events-none" 
        />
      </div>
      <div class="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
        <h3 class="text-sm sm:text-base font-bold text-slate-100 text-center sm:text-left truncate max-w-full sm:max-w-[70%]">
          ${tituloTexto}
        </h3>
        <div class="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 flex-shrink-0">
          ${dotsHTML}
        </div>
      </div>
    </div>
  `;
}

function actualizarSlide() {
  const slidesContainer = document.getElementById('carousel-slides');
  if (!slidesContainer) return;

  isTransitioning = true;
  // Transición suave usando la curva cúbica de aceleración
  slidesContainer.style.transition = 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)';
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Actualizar dots en tiempo real durante el movimiento
  const listaAnuncios = obtenerAnuncios();
  const totalOriginal = listaAnuncios.length;
  
  let realIdx = currentIndex - 1;
  if (currentIndex === 0) realIdx = totalOriginal - 1;
  if (currentIndex === totalOriginal + 1) realIdx = 0;

  const allDots = slidesContainer.querySelectorAll('.btn-dot');
  allDots.forEach(dot => {
    const dotIdx = parseInt(dot.getAttribute('data-slide'), 10);
    dot.className = dotIdx === realIdx
      ? 'btn-dot dot-item h-2.5 rounded-full transition-all duration-300 w-6 bg-sky-400'
      : 'btn-dot dot-item h-2.5 rounded-full transition-all duration-300 w-2.5 bg-slate-600 hover:bg-slate-400';
  });
}

function moverSlide(direccion) {
  currentIndex += direccion;
  actualizarSlide();
}

export function irASlide(indexTarget) {
  currentIndex = indexTarget;
  actualizarSlide();
  reiniciarAutoplay();
}

function iniciarAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = setInterval(() => {
    moverSlide(1);
  }, 5000);
}

function reiniciarAutoplay() {
  clearInterval(autoplayTimer);
  iniciarAutoplay();
}
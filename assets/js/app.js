// ==========================================
// CONFIGURACIÓN DE LIBROS Y CAPÍTULOS
// ==========================================
const ESTRUCTURA_BIBLIA = {
  antiguoTestamento: [
    { nombre: "Génesis", capitulos: 50, slug: "Genesis" },
    { nombre: "Éxodo", capitulos: 40, slug: "Exodo" },
    { nombre: "Levítico", capitulos: 27, slug: "Levitico" },
    { nombre: "Números", capitulos: 36, slug: "Numeros" },
    { nombre: "Deuteronomio", capitulos: 34, slug: "Deuteronomio" },
    { nombre: "Josué", capitulos: 24, slug: "Josue" },
    { nombre: "Jueces", capitulos: 21, slug: "Jueces" },
    { nombre: "Rut", capitulos: 4, slug: "Rut" },
    { nombre: "1 Samuel", capitulos: 31, slug: "1+Samuel" },
    { nombre: "2 Samuel", capitulos: 24, slug: "2+Samuel" },
    { nombre: "1 Reyes", capitulos: 22, slug: "1+Reyes" },
    { nombre: "2 Reyes", capitulos: 25, slug: "2+Reyes" },
    { nombre: "1 Crónicas", capitulos: 29, slug: "1+Cronicas" },
    { nombre: "2 Crónicas", capitulos: 36, slug: "2+Cronicas" },
    { nombre: "Esdras", capitulos: 10, slug: "Esdras" },
    { nombre: "Nehemías", capitulos: 13, slug: "Nehemias" },
    { nombre: "Ester", capitulos: 10, slug: "Ester" },
    { nombre: "Job", capitulos: 42, slug: "Job" },
    { nombre: "Salmos", capitulos: 150, slug: "Salmos" },
    { nombre: "Proverbios", capitulos: 31, slug: "Proverbios" },
    { nombre: "Eclesiastés", capitulos: 12, slug: "Eclesiastes" },
    { nombre: "Cantares", capitulos: 8, slug: "Cantares" },
    { nombre: "Isaías", capitulos: 66, slug: "Isaias" },
    { nombre: "Jeremías", capitulos: 52, slug: "Jeremias" },
    { nombre: "Lamentaciones", capitulos: 5, slug: "Lamentaciones" },
    { nombre: "Ezequiel", capitulos: 48, slug: "Ezequiel" },
    { nombre: "Daniel", capitulos: 12, slug: "Daniel" },
    { nombre: "Oseas", capitulos: 14, slug: "Oseas" },
    { nombre: "Joel", capitulos: 3, slug: "Joel" },
    { nombre: "Amós", capitulos: 9, slug: "Amos" },
    { nombre: "Abdías", capitulos: 1, slug: "Abdias" },
    { nombre: "Jonás", capitulos: 4, slug: "Jonas" },
    { nombre: "Miqueas", capitulos: 7, slug: "Miqueas" },
    { nombre: "Nahúm", capitulos: 3, slug: "Nahum" },
    { nombre: "Habacuc", capitulos: 3, slug: "Habacuc" },
    { nombre: "Sofonías", capitulos: 3, slug: "Sofonias" },
    { nombre: "Hageo", capitulos: 2, slug: "Hageo" },
    { nombre: "Zacarías", capitulos: 14, slug: "Zacarias" },
    { nombre: "Malaquías", capitulos: 4, slug: "Malaquias" }
  ],
  nuevoTestamento: [
    { nombre: "Mateo", capitulos: 28, slug: "Mateo" },
    { nombre: "Marcos", capitulos: 16, slug: "Marcos" },
    { nombre: "Lucas", capitulos: 24, slug: "Lucas" },
    { nombre: "Juan", capitulos: 21, slug: "Juan" },
    { nombre: "Hechos", capitulos: 28, slug: "Hechos" },
    { nombre: "Romanos", capitulos: 16, slug: "Romanos" },
    { nombre: "1 Corintios", capitulos: 16, slug: "1+Corintios" },
    { nombre: "2 Corintios", capitulos: 13, slug: "2+Corintios" },
    { nombre: "Gálatas", capitulos: 6, slug: "Galatas" },
    { nombre: "Efesios", capitulos: 6, slug: "Efesios" },
    { nombre: "Filipenses", capitulos: 4, slug: "Filipenses" },
    { nombre: "Colosenses", capitulos: 4, slug: "Colosenses" },
    { nombre: "1 Tesalonicenses", capitulos: 5, slug: "1+Tesalonicenses" },
    { nombre: "2 Tesalonicenses", capitulos: 3, slug: "2+Tesalonicenses" },
    { nombre: "1 Timoteo", capitulos: 6, slug: "1+Timoteo" },
    { nombre: "2 Timoteo", capitulos: 4, slug: "2+Timoteo" },
    { nombre: "Tito", capitulos: 3, slug: "Tito" },
    { nombre: "Filemón", capitulos: 1, slug: "Filemon" },
    { nombre: "Hebreos", capitulos: 13, slug: "Hebreos" },
    { nombre: "Santiago", capitulos: 5, slug: "Santiago" },
    { nombre: "1 Pedro", capitulos: 5, slug: "1+Pedro" },
    { nombre: "2 Pedro", capitulos: 3, slug: "2+Pedro" },
    { nombre: "1 Juan", capitulos: 5, slug: "1+Juan" },
    { nombre: "2 Juan", capitulos: 1, slug: "2+Juan" },
    { nombre: "3 Juan", capitulos: 1, slug: "3+Juan" },
    { nombre: "Judas", capitulos: 1, slug: "Judas" },
    { nombre: "Apocalipsis", capitulos: 22, slug: "Apocalipsis" }
  ]
};

let estadoBibliaPrevio = null;

// ==========================================
// HELPER PARA OBTENER DATOS DE DATA.JS
// ==========================================
function obtenerAnuncios() {
  if (typeof DATA !== 'undefined' && DATA.anuncios) return DATA.anuncios;
  if (typeof anuncios !== 'undefined') return anuncios;
  return [];
}

function obtenerPredicas() {
  if (typeof DATA !== 'undefined' && DATA.predicas) return DATA.predicas;
  if (typeof predicas !== 'undefined') return predicas;
  return [];
}

// ==========================================
// VARIABLES GLOBALES PARA EL CARRUSEL
// ==========================================
let currentIndex = 0;
let autoplayTimer = null;

// Formatear fechas
function formatearFecha(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${day} ${meses[parseInt(month, 10) - 1]}. ${year}`;
}

// ==========================================
// 1. INICIALIZAR Y MANEJAR EL CARRUSEL
// ==========================================
function initCarrusel() {
  const slidesContainer = document.getElementById('carousel-slides');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  const listaAnuncios = obtenerAnuncios();

  if (!slidesContainer || listaAnuncios.length === 0) return;

  slidesContainer.innerHTML = listaAnuncios.map((anuncio, idx) => {
    const imagenSrc = anuncio.imagen || anuncio.url || '';
    const tituloTexto = anuncio.titulo || anuncio.alt || '';

    return `
      <div class="min-w-full w-full flex flex-col bg-slate-900 overflow-hidden flex-shrink-0">
        <div class="relative w-full aspect-square sm:aspect-video max-h-[450px] bg-slate-950 flex items-center justify-center overflow-hidden">
          <img 
            src="${imagenSrc}" 
            alt="${tituloTexto}" 
            class="w-full h-full object-contain object-center" 
          />
        </div>
        <div class="px-4 sm:px-6 py-3 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <h3 class="text-sm sm:text-base font-bold text-slate-100 text-center sm:text-left truncate max-w-full sm:max-w-[70%]">
            ${tituloTexto}
          </h3>
          <div class="flex items-center space-x-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 flex-shrink-0">
            ${listaAnuncios.map((_, dotIdx) => `
              <button 
                onclick="irASlide(${dotIdx})"
                class="dot-item h-2.5 rounded-full transition-all duration-300 ${dotIdx === idx ? 'w-6 bg-sky-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'}"
                aria-label="Ir al anuncio ${dotIdx + 1}"
              ></button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      moverSlide(-1);
      reiniciarAutoplay();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      moverSlide(1);
      reiniciarAutoplay();
    });
  }

  iniciarAutoplay();
}

function actualizarSlide() {
  const slidesContainer = document.getElementById('carousel-slides');
  if (!slidesContainer) return;
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function moverSlide(direccion) {
  const listaAnuncios = obtenerAnuncios();
  if (listaAnuncios.length === 0) return;
  const total = listaAnuncios.length;
  currentIndex = (currentIndex + direccion + total) % total;
  actualizarSlide();
}

function irASlide(index) {
  currentIndex = index;
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

// ==========================================
// 2. RENDERIZAR PRÉDICAS Y FILTROS
// ==========================================
function renderPredicas() {
  const container = document.getElementById('grid-predicas');
  const inputBusqueda = document.getElementById('input-busqueda');
  const selectOrden = document.getElementById('select-orden');

  const listaPredicas = obtenerPredicas();

  if (!container) return;

  const busqueda = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';
  const orden = selectOrden ? selectOrden.value : 'fecha-desc';

  let lista = listaPredicas.filter(p => 
    (p.titulo && p.titulo.toLowerCase().includes(busqueda)) ||
    (p.predicador && p.predicador.toLowerCase().includes(busqueda)) ||
    (p.apuntes && p.apuntes.toLowerCase().includes(busqueda))
  );

  lista.sort((a, b) => {
    if (orden === 'fecha-desc') return new Date(b.fecha) - new Date(a.fecha);
    if (orden === 'fecha-asc') return new Date(a.fecha) - new Date(b.fecha);
    if (orden === 'titulo-asc') return a.titulo.localeCompare(b.titulo);
    if (orden === 'titulo-desc') return b.titulo.localeCompare(a.titulo);
    return 0;
  });

  if (lista.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500">No se encontraron prédicas.</div>`;
    return;
  }

  container.innerHTML = lista.map((p) => `
    <article 
      onclick="abrirModalPredica(${p.id})"
      class="group flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-lg hover:border-sky-500/50 hover:shadow-sky-500/10 cursor-pointer transition-all duration-300"
    >
      <div class="relative w-full aspect-video bg-black overflow-hidden">
        <img 
          src="https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg" 
          alt="${p.titulo}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
          <div class="w-12 h-12 rounded-full bg-sky-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
              ${p.predicador}
            </span>
            <div class="flex items-center text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ${formatearFecha(p.fecha)}
            </div>
          </div>
          <h3 class="text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
            ${p.titulo}
          </h3>
        </div>
        <div class="pt-2 text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Ver resumen completo
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================
// 3. LÓGICA DEL MODAL DE PRÉDICAS
// ==========================================
function abrirModalPredica(id) {
  const listaPredicas = obtenerPredicas();
  const predica = listaPredicas.find(p => p.id === id);
  if (!predica) return;

  const modal = document.getElementById('modal-predica');
  const videoContainer = document.getElementById('modal-video-container');
  const predicador = document.getElementById('modal-predicador');
  const fecha = document.getElementById('modal-fecha');
  const titulo = document.getElementById('modal-titulo');
  const apuntes = document.getElementById('modal-apuntes');

  if (predicador) predicador.textContent = predica.predicador;
  if (fecha) fecha.textContent = formatearFecha(predica.fecha);
  if (titulo) titulo.textContent = predica.titulo;
  if (apuntes) apuntes.textContent = predica.apuntes || 'Sin apuntes disponibles.';

  if (videoContainer) {
    videoContainer.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${predica.youtubeId}?autoplay=1"
        title="${predica.titulo}"
        class="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  }

  if (modal) modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function cerrarModalPredica() {
  const modal = document.getElementById('modal-predica');
  const videoContainer = document.getElementById('modal-video-container');

  if (!modal) return;
  modal.classList.add('hidden');
  if (videoContainer) videoContainer.innerHTML = '';
  document.body.style.overflow = '';
}

// ==========================================
// 4. LÓGICA DEL MODAL DE BIBLIA
// ==========================================
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderizarGridLibros(listaLibros) {
  const gridLibros = document.getElementById("grid-libros");
  const inputBuscar = document.getElementById("input-buscar-libro");
  if (!gridLibros) return;

  const filtro = inputBuscar ? normalizarTexto(inputBuscar.value.trim()) : "";

  gridLibros.className = "p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[calc(90vh-180px)]";
  gridLibros.innerHTML = "";

  const librosFiltrados = listaLibros.filter(libroObj => 
    normalizarTexto(libroObj.nombre).includes(filtro)
  );

  if (librosFiltrados.length === 0) {
    gridLibros.innerHTML = `<div class="col-span-full text-center py-8 text-slate-500 text-sm">No se encontraron libros que coincidan.</div>`;
    return;
  }

  librosFiltrados.forEach(libroObj => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 font-semibold text-sm hover:border-sky-500 hover:bg-slate-700/80 hover:text-white hover:scale-[1.02] transition-all duration-200 text-center flex items-center justify-center shadow-sm";
    btn.textContent = libroObj.nombre;

    btn.addEventListener("click", () => mostrarCapitulosLibro(libroObj));
    gridLibros.appendChild(btn);
  });
}

function abrirModalBiblia(titulo, listaLibros) {
  const modalBiblia = document.getElementById("modal-biblia");
  const bibliaTituloTexto = document.getElementById("biblia-titulo-texto");
  const contenedorBusqueda = document.getElementById("contenedor-busqueda-biblia");
  const inputBuscar = document.getElementById("input-buscar-libro");

  if (!modalBiblia) return;

  estadoBibliaPrevio = { titulo, listaLibros };
  if (bibliaTituloTexto) bibliaTituloTexto.textContent = titulo;

  if (contenedorBusqueda) contenedorBusqueda.classList.remove("hidden");
  if (inputBuscar) inputBuscar.value = "";

  renderizarGridLibros(listaLibros);

  modalBiblia.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function mostrarCapitulosLibro(libroObj) {
  const bibliaTituloTexto = document.getElementById("biblia-titulo-texto");
  const gridLibros = document.getElementById("grid-libros");
  const contenedorBusqueda = document.getElementById("contenedor-busqueda-biblia");

  if (!gridLibros) return;

  if (contenedorBusqueda) contenedorBusqueda.classList.add("hidden");

  if (bibliaTituloTexto) {
    bibliaTituloTexto.innerHTML = `
      <button id="btn-volver-libros" class="inline-flex items-center text-sky-400 hover:text-white mr-2 text-sm font-semibold transition-colors">
        <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Volver
      </button>
      ${libroObj.nombre} <span class="text-xs text-slate-400 font-normal ml-2">(${libroObj.capitulos} cap.)</span>
    `;

    document.getElementById("btn-volver-libros")?.addEventListener("click", () => {
      if (estadoBibliaPrevio) {
        abrirModalBiblia(estadoBibliaPrevio.titulo, estadoBibliaPrevio.listaLibros);
      }
    });
  }

  gridLibros.className = "p-5 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 max-h-[calc(90vh-140px)]";
  gridLibros.innerHTML = "";

  for (let cap = 1; cap <= libroObj.capitulos; cap++) {
    const a = document.createElement("a");
    a.href = `https://www.biblegateway.com/passage/?search=${libroObj.slug}+${cap}&version=RVR1960`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "aspect-square rounded-xl bg-slate-800/90 border border-slate-700/60 text-slate-200 font-bold text-base hover:bg-sky-500 hover:border-sky-400 hover:text-white hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-md";
    a.textContent = cap;

    gridLibros.appendChild(a);
  }
}

function cerrarModalBiblia() {
  const modalBiblia = document.getElementById("modal-biblia");
  if (!modalBiblia) return;

  modalBiblia.classList.add("hidden");
  document.body.style.overflow = "";
}

// ==========================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCarrusel();
  renderPredicas();

  const inputBusqueda = document.getElementById('input-busqueda');
  const selectOrden = document.getElementById('select-orden');

  if (inputBusqueda) inputBusqueda.addEventListener('input', renderPredicas);
  if (selectOrden) selectOrden.addEventListener('change', renderPredicas);

  // Modal Prédica
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCerrarBottom = document.getElementById('btn-cerrar-bottom');
  const modalPredica = document.getElementById('modal-predica');

  if (btnCloseModal) btnCloseModal.addEventListener('click', cerrarModalPredica);
  if (btnCerrarBottom) btnCerrarBottom.addEventListener('click', cerrarModalPredica);
  if (modalPredica) {
    modalPredica.addEventListener('click', (e) => {
      if (e.target.id === 'modal-predica') cerrarModalPredica();
    });
  }

  // Modal Biblia
  const btnAntiguo = document.getElementById("btn-antiguo-testamento");
  const btnNuevo = document.getElementById("btn-nuevo-testamento");
  const btnCerrarBiblia = document.getElementById("btn-cerrar-biblia");
  const modalBiblia = document.getElementById("modal-biblia");
  const inputBuscarLibro = document.getElementById("input-buscar-libro");

  if (btnAntiguo) {
    btnAntiguo.addEventListener("click", () => abrirModalBiblia("Antiguo Testamento", ESTRUCTURA_BIBLIA.antiguoTestamento));
  }

  if (btnNuevo) {
    btnNuevo.addEventListener("click", () => abrirModalBiblia("Nuevo Testamento", ESTRUCTURA_BIBLIA.nuevoTestamento));
  }

  if (btnCerrarBiblia) {
    btnCerrarBiblia.addEventListener("click", cerrarModalBiblia);
  }

  if (modalBiblia) {
    modalBiblia.addEventListener("click", (e) => {
      if (e.target.id === "modal-biblia") cerrarModalBiblia();
    });
  }

  if (inputBuscarLibro) {
    inputBuscarLibro.addEventListener("input", () => {
      if (estadoBibliaPrevio) {
        renderizarGridLibros(estadoBibliaPrevio.listaLibros);
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModalPredica();
      cerrarModalBiblia();
    }
  });
});
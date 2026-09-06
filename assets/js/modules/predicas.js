import { obtenerPredicas, formatearFecha } from './utils.js';

let modalHistorialActivo = false;

export function renderPredicas() {
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
      data-id="${p.id}"
      class="card-predica group flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-lg hover:border-sky-500/50 hover:shadow-sky-500/10 cursor-pointer transition-all duration-300"
    >
      <div class="relative w-full aspect-video bg-black overflow-hidden">
        <img 
          src="https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg" 
          alt="${p.titulo}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
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

export function abrirModalPredica(id) {
  const listaPredicas = obtenerPredicas();
  const predica = listaPredicas.find(p => p.id === Number(id) || p.id === id);
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

  // Registrar un estado en el historial para soportar el botón "Atrás" en dispositivos móviles
  if (!modalHistorialActivo) {
    history.pushState({ modalAbierto: true }, '');
    modalHistorialActivo = true;
  }
}

export function cerrarModalPredica(isFromPopState = false) {
  const modal = document.getElementById('modal-predica');
  const videoContainer = document.getElementById('modal-video-container');

  if (!modal || modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');
  if (videoContainer) videoContainer.innerHTML = '';
  document.body.style.overflow = '';

  // Limpiar el estado de la navegación si no provino del gesto atrás del celular
  if (modalHistorialActivo) {
    modalHistorialActivo = false;
    if (!isFromPopState) {
      history.back();
    }
  }
}

export function initPredicas() {
  const container = document.getElementById('grid-predicas');
  const inputBusqueda = document.getElementById('input-busqueda');
  const selectOrden = document.getElementById('select-orden');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal-predica');
  const modal = document.getElementById('modal-predica');

  // Render inicial
  renderPredicas();

  // Escuchar entrada de búsqueda y orden
  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', renderPredicas);
  }

  if (selectOrden) {
    selectOrden.addEventListener('change', renderPredicas);
  }

  // Delegación de eventos para abrir el modal al hacer clic en una tarjeta
  if (container) {
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.card-predica');
      if (card) {
        const id = card.getAttribute('data-id');
        abrirModalPredica(id);
      }
    });
  }

  // Cierre de modal por botón
  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => cerrarModalPredica(false));
  }

  // Cierre de modal haciendo clic fuera del contenido
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        cerrarModalPredica(false);
      }
    });
  }

  // Tecla ESC para cerrar modal en PC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarModalPredica(false);
    }
  });

  // Botón "Atrás" en móviles
  window.addEventListener('popstate', (e) => {
    if (modal && !modal.classList.contains('hidden')) {
      cerrarModalPredica(true);
    }
  });
}
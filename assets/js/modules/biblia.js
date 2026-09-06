import { normalizarTexto } from './utils.js';

export const ESTRUCTURA_BIBLIA = {
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

export let estadoBibliaPrevio = null;

export function renderizarGridLibros(listaLibros) {
  const gridLibros = document.getElementById("grid-libros");
  const inputBuscar = document.getElementById("input-buscar-libro");
  if (!gridLibros) return;

  const filtro = inputBuscar ? normalizarTexto(inputBuscar.value.trim()) : "";

  gridLibros.className = "p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[calc(85vh-180px)] sm:max-h-[calc(90vh-180px)]";
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

export function abrirModalBiblia(titulo, listaLibros) {
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

export function mostrarCapitulosLibro(libroObj) {
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

  gridLibros.className = "p-5 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 max-h-[calc(85vh-140px)] sm:max-h-[calc(90vh-140px)]";
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

export function cerrarModalBiblia() {
  const modalBiblia = document.getElementById("modal-biblia");
  if (!modalBiblia) return;

  modalBiblia.classList.add("hidden");
  document.body.style.overflow = "";
}

export function initBiblia() {
  const btnAT = document.getElementById("btn-antiguo-testamento");
  const btnNT = document.getElementById("btn-nuevo-testamento");
  const btnCerrar = document.getElementById("btn-cerrar-biblia");
  const inputBuscar = document.getElementById("input-buscar-libro");

  if (btnAT) {
    btnAT.addEventListener("click", () => {
      abrirModalBiblia("Antiguo Testamento", ESTRUCTURA_BIBLIA.antiguoTestamento);
    });
  }

  if (btnNT) {
    btnNT.addEventListener("click", () => {
      abrirModalBiblia("Nuevo Testamento", ESTRUCTURA_BIBLIA.nuevoTestamento);
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarModalBiblia);
  }

  if (inputBuscar) {
    inputBuscar.addEventListener("input", () => {
      if (estadoBibliaPrevio) {
        renderizarGridLibros(estadoBibliaPrevio.listaLibros);
      }
    });

    // Mantiene el modal posicionado en la parte superior del visor móvil al hacer foco
    inputBuscar.addEventListener("focus", () => {
      setTimeout(() => {
        const modalBiblia = document.getElementById("modal-biblia");
        if (modalBiblia) {
          modalBiblia.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 200);
    });
  }
}
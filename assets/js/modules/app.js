import { initCarrusel } from './carrusel.js';
import { initBiblia } from './biblia.js';
import { initPredicas } from './predicas.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de cada módulo
  if (typeof initCarrusel === 'function') initCarrusel();
  if (typeof initBiblia === 'function') initBiblia();
  if (typeof initPredicas === 'function') initPredicas();
});
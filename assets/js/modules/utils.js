import { DATA } from '../data.js';

/**
 * Convierte una fecha en formato YYYY-MM-DD a un texto legible (ej: "15 Oct. 2023")
 * @param {string} dateStr - Fecha en formato 'YYYY-MM-DD'
 * @returns {string} Fecha formateada
 */
export function formatearFecha(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const indiceMes = parseInt(month, 10) - 1;
  
  if (isNaN(indiceMes) || indiceMes < 0 || indiceMes > 11) return dateStr;
  
  return `${day} ${meses[indiceMes]}. ${year}`;
}

/**
 * Elimina acentos y convierte el texto a minúsculas para búsquedas flexibles
 * @param {string} texto - Cadena de texto a normalizar
 * @returns {string} Texto sin tildes ni caracteres especiales en minúsculas
 */
export function normalizarTexto(texto) {
  if (!texto) return '';
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Obtiene la lista de anuncios importados desde data.js
 * @returns {Array} Colección de objetos de anuncios
 */
export function obtenerAnuncios() {
  if (typeof DATA !== 'undefined' && DATA.anuncios) return DATA.anuncios;
  return [];
}

/**
 * Obtiene la lista de prédicas importadas desde data.js
 * @returns {Array} Colección de objetos de prédicas
 */
export function obtenerPredicas() {
  if (typeof DATA !== 'undefined' && DATA.predicas) return DATA.predicas;
  return [];
}
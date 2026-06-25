/**
 * theme-init.js
 * Doit être chargé dans le <head>, AVANT le CSS si possible, et certainement
 * avant que la page ne s'affiche. Applique la classe .dark sur <html> selon :
 *   1. le choix mémorisé par l'utilisateur (localStorage)
 *   2. à défaut, la préférence système (prefers-color-scheme)
 * Objectif : éviter tout flash de la mauvaise couleur au chargement.
 */
(function () {
  try {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved ? saved === "dark" : prefersDark;
    if (useDark) document.documentElement.classList.add("dark");
  } catch (e) {
    /* localStorage indisponible : on reste en mode clair par défaut */
  }
})();

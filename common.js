/**
 * common.js
 * Script partagé par toutes les pages du site.
 * Gère : injection header/footer, menu burger, animation fade-in au scroll,
 * le bouton de changement de langue (reste sur la page équivalente),
 * et le toggle de thème clair/sombre (mémorisé en localStorage).
 *
 * Chaque page doit définir, AVANT ce script :
 *   <div id="site-header"></div>  (à la place du header en dur)
 *   <div id="site-footer"></div>  (à la place du footer en dur)
 *   <body data-lang="fr" data-page="index">  (ou data-lang="en")
 *
 * Le thème est appliqué le plus tôt possible via un script inline
 * (voir theme-init.js) pour éviter tout flash visuel au chargement ;
 * ce fichier se contente de câbler le bouton une fois le header injecté.
 */

(function () {
  const LANG = document.body.dataset.lang || "fr";
  const PAGE = document.body.dataset.page || "index";

  // Table de correspondance FR <-> EN par page logique
  const PAGE_FILES = {
    index:       { fr: "index.html",        en: "index-en.html" },
    experiences: { fr: "experiences.html",  en: "experiences-en.html" },
    education:   { fr: "education.html",    en: "education-en.html" },
    projects:    { fr: "projects.html",     en: "projects-en.html" },
  };

  function targetLangFile() {
    const entry = PAGE_FILES[PAGE];
    if (!entry) return LANG === "fr" ? "index-en.html" : "index.html";
    return LANG === "fr" ? entry.en : entry.fr;
  }

  function headerFooterFiles() {
    return LANG === "fr"
      ? { header: "header.html", footer: "footer.html" }
      : { header: "header-en.html", footer: "footer-en.html" };
  }

  function setActiveNavLink() {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === PAGE) {
        link.classList.add("active-nav-link");
      }
    });
  }

  function wireLangSwitch() {
    const target = targetLangFile();
    document.querySelectorAll("[data-lang-switch]").forEach((link) => {
      link.setAttribute("href", target);
    });
  }

  function wireBurgerMenu() {
    const burgerBtn = document.getElementById("burgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  function wireThemeToggle() {
    const toggles = document.querySelectorAll("[data-theme-toggle]");
    if (!toggles.length) return;

    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        try {
          localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (e) {
          /* localStorage indisponible (navigation privée stricte) : on ignore */
        }
      });
    });
  }

  function wireFadeIn() {
    const faders = document.querySelectorAll(".fade-in");
    if (!faders.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      faders.forEach((el) => observer.observe(el));
    } else {
      faders.forEach((el) => el.classList.add("visible"));
    }
  }

  async function injectFragment(targetId, file) {
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error("HTTP " + res.status);
      target.innerHTML = await res.text();
    } catch (err) {
      console.error("Impossible de charger " + file + " :", err);
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const { header, footer } = headerFooterFiles();
    await Promise.all([
      injectFragment("site-header", header),
      injectFragment("site-footer", footer),
    ]);

    setActiveNavLink();
    wireLangSwitch();
    wireBurgerMenu();
    wireThemeToggle();
    wireFadeIn();

    if (window.feather) window.feather.replace();

    document.dispatchEvent(new CustomEvent("layout:ready"));
  });
})();

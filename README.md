# Site de Nathan Ochem — v3 : refonte graphique + retrait Hobbies

## Ce qui a changé dans cette version

### Page Hobbies supprimée
- `hobbies.html`, `hobbies-en.html`, `output-gallery.html`, `generate_gallery.py`
  et `random-image.js` ont été supprimés.
- Tous les liens vers Hobbies retirés des menus (header, footer, sections
  "Explorer le portfolio") sur toutes les pages, FR et EN.
- Le bloc "Passion automobile et moto" sur la page d'accueil est conservé en
  texte seul (sans la carte image qui pointait vers la galerie).

### Refonte graphique complète : mode clair/sombre
Le site a maintenant un vrai thème clair/sombre, choisi par le visiteur via le
bouton soleil/lune dans le header (desktop et mobile), et mémorisé entre les
visites.

**Comment ça marche techniquement :**
- `theme-init.js` est chargé en premier dans le `<head>` de chaque page. Il lit
  `localStorage` (ou la préférence système si rien n'est mémorisé) et applique
  la classe `.dark` sur `<html>` *avant* que la page ne s'affiche, pour éviter
  tout flash de la mauvaise couleur.
- Toutes les couleurs du site sont définies comme variables CSS dans
  `apple-style.css` (`--ink`, `--paper`, `--steel`, `--graphite`, `--signal`,
  etc.), redéfinies différemment dans le bloc `.dark { ... }`. Aucune couleur
  n'est écrite en dur ailleurs dans le HTML — c'est ce qui permet au thème de
  s'appliquer partout uniformément.
- Le clic sur le bouton toggle (`data-theme-toggle`, géré dans `common.js`)
  bascule la classe `.dark` et sauvegarde le choix dans `localStorage`.

### Nouvelle identité visuelle
- **Typographie :** Space Grotesk pour les titres (caractère technique),
  Inter pour le corps de texte (lisibilité), JetBrains Mono pour les dates et
  métadonnées (clin d'œil "carnet d'ingénieur").
- **Couleurs :** fond clair blanc cassé chaud (`--paper`) ou sombre profond
  selon le thème, bleu-acier (`--steel`) pour les liens, rouille/cuivre
  (`--signal`) comme accent chaud pour les éléments interactifs.
- **Signature visuelle :** les cartes de projet (`.apple-card`) ont un coin
  chanfreiné en haut à droite plutôt qu'un simple `border-radius`, comme un
  rappel discret d'une pièce mécanique usinée ou d'un plan technique.
- Les anciennes classes Tailwind à couleur fixe (`bg-white`, `text-gray-900`,
  `bg-gray-50`...) ont été retirées de tout le HTML et remplacées par des
  classes custom (`.exp-card`, `.panel-card`, `.hero-grid`, etc.) qui
  utilisent les variables CSS — c'est ce qui rend le dark mode possible.

## Fichiers du site

### Communs (à éditer une seule fois, propagés partout)
- `header.html` / `header-en.html` — menu de navigation + bouton de thème
- `footer.html` / `footer-en.html` — pied de page
- `common.js` — injection header/footer, menu burger, fade-in au scroll,
  changement de langue (reste sur la page équivalente), toggle de thème
- `theme-init.js` — applique le thème mémorisé avant l'affichage (anti-flash)
- `apple-style.css` — design system unique du site (couleurs, typo, layout)

### Propres à une page
- `projects.css` — styles spécifiques à la page Projets (sidebar, carrousels)

### Pages
- `index.html` / `index-en.html`
- `experiences.html` / `experiences-en.html`
- `education.html` / `education-en.html`
- `projects.html` / `projects-en.html`

### Comment ajouter le header/footer/thème à une nouvelle page
```html
<head>
  ...
  <script src="theme-init.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
  <link href="apple-style.css" rel="stylesheet" />
</head>
<body data-lang="fr" data-page="education">  <!-- adapter lang et page -->
  <div id="site-header"></div>
  ... contenu ...
  <div id="site-footer"></div>
  <script src="common.js"></script>
</body>
```
Valeurs possibles pour `data-page` : `index`, `experiences`, `education`,
`projects`. Important : si tu ajoutes du HTML personnalisé sur une nouvelle
page, n'utilise jamais de couleur fixe type `text-gray-900` ou `bg-white` —
utilise les variables CSS (`color: var(--ink)`, `background: var(--paper-raised)`)
ou les classes déjà existantes, sinon cet élément ne suivra pas le changement
de thème.

### Fichiers PDF
Le programme PEIP est `docs/MAtieres_PEIP.pdf` (sans accent ni espace). Le
lien vers la maquette mécanique (`docs/maquette_Mecanique.pdf`) pointe vers un
fichier qui n'a pas été fourni dans les uploads — à ajouter dans `docs/`.

## Ce qui n'a PAS pu être vérifié
- Les fichiers images/vidéos réels (`img/`, `videos/`) ne faisaient pas partie
  des uploads : je n'ai pas pu vérifier que tous les chemins référencés
  correspondent à des fichiers existants.
- Le rendu visuel final (notamment le contraste du dark mode, le bon
  fonctionnement du toggle) n'a pas pu être testé dans un navigateur réel —
  fais un premier passage de vérification après mise en ligne, sur desktop et
  mobile, dans les deux thèmes.

## Fichiers à ajouter toi-même (rappel de la mise à jour précédente)
- `img/CT_logo.png` — logo de l'entreprise C&T
- `img/osiris-principe-verin.jpg` et `img/osiris-principe-robot.jpg` — photos
  libres de droit (Unsplash/Pexels) illustrant le principe du projet OSIRIS,
  vérifie la licence avant publication.

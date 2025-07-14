import os

# Dossier contenant les images
image_folder = "galerie"
# Fichier HTML à générer
output_file = "galerie_generated.html"

# Fonction pour générer une légende à partir du nom de fichier
def generate_caption(filename):
    name, _ = os.path.splitext(filename)
    # Remplacer _ et - par des espaces et capitaliser
    caption = name.replace('_', ' ').replace('-', ' ').capitalize()
    return caption

# Liste des extensions d'images acceptées
valid_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

# Récupérer la liste des images valides dans le dossier
images = [f for f in os.listdir(image_folder) if os.path.splitext(f)[1].lower() in valid_extensions]

# Trier par nom
images.sort()

# Début du template HTML
html_start = '''<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Galerie - Nathan Ochem</title>
  <link rel="stylesheet" href="galerie.css" />
</head>
<body>
<main class="max-w-6xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-6 text-center">Galerie Photo</h1>
  <div class="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
'''

# Fin du template HTML
html_end = '''
  </div>
</main>
</body>
</html>'''

# Génération des balises <img>
img_tags = ""
for img in images:
    caption = generate_caption(img)
    img_tags += f'    <img src="{image_folder}/{img}" alt="{caption}" data-caption="{caption}" class="cursor-pointer rounded shadow" />\n'

# Écrire le fichier final
with open(output_file, "w", encoding="utf-8") as f:
    f.write(html_start)
    f.write(img_tags)
    f.write(html_end)

print(f"Fichier '{output_file}' généré avec {len(images)} images.")

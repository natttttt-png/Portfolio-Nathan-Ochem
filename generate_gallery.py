import os
import re

media_folder = "galerie"
image_exts = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
video_exts = {".mp4", ".webm", ".ogg"}

def is_image(filename):
    return os.path.splitext(filename.lower())[1] in image_exts

def is_video(filename):
    return os.path.splitext(filename.lower())[1] in video_exts

def clean_caption(filename):
    name = os.path.splitext(filename)[0]
    name = re.sub(r'[_\-]', ' ', name)
    name = re.sub(r'\b\d+\b', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name.capitalize()

def generate_html(media_folder):
    files = sorted(os.listdir(media_folder))

    html_images = []
    html_videos = []

    for f in files:
        path = os.path.join(media_folder, f)
        if os.path.isfile(path):
            caption = clean_caption(f)
            if is_image(f):
                # Ajout class lightgallery-item, data-src pour lightgallery
                html_images.append(
                    f'<a href="{media_folder}/{f}" class="lightgallery-item" data-sub-html="{caption}">'
                    f'<img src="{media_folder}/{f}" alt="{caption}" loading="lazy" class="cursor-pointer rounded shadow" />'
                    '</a>'
                )
            elif is_video(f):
                ext = os.path.splitext(f)[1][1:]
                html_videos.append(
                    f'<a href="{media_folder}/{f}" class="lightgallery-item" data-sub-html="{caption}">'
                    f'<video controls class="rounded shadow max-w-full max-h-64 mx-auto" alt="{caption}">'
                    f'<source src="{media_folder}/{f}" type="video/{ext}">'
                    'Votre navigateur ne supporte pas la vidéo.'
                    '</video></a>'
                )

    html = []
    if html_images:
        html.append('<!-- Galerie images -->')
        html.append('<div id="lightgallery" class="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">')
        html.extend(html_images)
        html.append('</div>')
    if html_videos:
        html.append('<!-- Galerie vidéos -->')
        html.append('<div id="lightgallery-videos" class="gallery-videos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">')
        html.extend(html_videos)
        html.append('</div>')

    return "\n".join(html)

if __name__ == "__main__":
    output = generate_html(media_folder)
    with open("output-gallery.html", "w", encoding="utf-8") as f:
        f.write(output)
    print("✅ HTML généré dans output-gallery.html")

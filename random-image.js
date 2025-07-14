document.addEventListener("DOMContentLoaded", () => {
  const imageList = [
    "IMG_6415.JPG",
    "IMG_6416.JPG",
    "IMG_6417.JPG",
    "IMG_5708.JPG",
    "IMG_6522.JPG",
    "IMG_6780.JPG",
    "IMG_7257.JPG",
    "IMG_7626.JPG",
    "IMG_7644.JPG",
    "IMG_7671.JPG",
    "IMG_7677.JPG",
    "IMG_7750.JPG",
    "IMG_7751.JPG",
    "IMG_7873.JPG",
    "IMG_7901.JPG",
    "IMG_7903.JPG",
    "IMG_8054.JPG",
    "IMG_8598.JPG",

  ];

  const randomIndex = Math.floor(Math.random() * imageList.length);
  const selectedImage = `galerie/${imageList[randomIndex]}`;

  console.log("Image sélectionnée aléatoirement :", selectedImage);

  const imageElement = document.getElementById("randomMotoImg");
  if (imageElement) {
    imageElement.src = selectedImage;
  } else {
    console.warn("L'élément #randomMotoImg est introuvable !");
  }
});

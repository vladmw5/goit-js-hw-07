import { galleryItems } from "./gallery-items.js";
// Change code below this line

//Variables
const galleryRef = document.querySelector("div.gallery");
const modalWindowInstance = basicLightbox.create(
  `<img src="" alt="" width="1280">`
);
const lightBoxImageRef = modalWindowInstance.element().querySelector("img");

//Calls
renderGallery(galleryItems);

//Listeners
galleryRef.addEventListener("click", onGalleryImageClick);
// galleryRef.addEventListener("keydown", onEscapeKeydownInModalWindow);

//Functions
function renderGallery(galleryItems) {
  galleryRef.insertAdjacentHTML(
    "beforeend",
    galleryItems
      .map(
        ({ preview, original, description }) => /*html*/ `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`
      )
      .join("")
  );
}

function onGalleryImageClick(event) {
  event.preventDefault();
  const currentImageRef = event.target;

  if (currentImageRef.nodeName !== "IMG") {
    return;
  }

  galleryRef.addEventListener("keydown", onEscapeKeydownInModalWindow, {
    once: true,
  });

  lightBoxImageRef.src = currentImageRef.dataset.source;
  lightBoxImageRef.alt = currentImageRef.alt;
  modalWindowInstance.show();
}

function onEscapeKeydownInModalWindow(event) {
  const currentKeyCode = event.code;
  if (currentKeyCode != "Escape" || !modalWindowInstance.visible()) {
    return;
  }
  modalWindowInstance.close();
}

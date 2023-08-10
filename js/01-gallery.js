import { galleryItems } from './gallery-items.js';
let instance = {};

const galleryImage = document.querySelector(".gallery");

//  створюємо розмітку галереї з preview фото
const markingGalery = galleryItems.map(({ preview, original, description }) => {return `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`}).join("");

// додаємо розмітку галереї в DOM
galleryImage.insertAdjacentHTML("afterbegin", markingGalery);

// ставимо слухача на всю галерею
galleryImage.addEventListener('click', onClickGalleryItems);

// обробка кліків по галереї
function onClickGalleryItems(evt) {
  evt.preventDefault();
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }
    showFullImage(evt.target.dataset.source);
}

// вивід понорозмірного зображення бібліотекою Lightbox
function showFullImage(image) {
    instance = basicLightbox.create(`
         <img src="${image}" width="800" height="600">
     `);
  instance.show(() => document.addEventListener("keydown",onClickEscape));
}

// обробка натискання клавиші Escape
function onClickEscape(evt) { 
  if (evt.code === 'Escape') {
    instance.close(() => document.removeEventListener("keydown",onClickEscape));
  }
}

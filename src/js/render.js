import { refs } from './refs';

function clearMarcup() {
  refs.gallery.innerHTML = '';
}

function addMarcup(str) {
  refs.gallery.insertAdjacentHTML('beforeend', str);
}

function createMarcup(photos) {
  const marcup = photos.map(item => createCard(item)).join('');
  return marcup;
}

function createCard(data) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    min_width,
  } = data;
  return ` <a class="photo-card" href="${largeImageURL}">
 <div class='img'>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width='${min_width}' height='250'/>
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
   
     </a >`;
}

export { createCard, createMarcup, addMarcup, clearMarcup };

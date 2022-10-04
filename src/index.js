import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/getphotos';
import { onSuccess, onError, onEnd } from './js/message';
import { refs } from './js/refs';
import { addMarcup, clearMarcup, createMarcup } from './js/render';

export let pageNumber = 1;
export let limit = 40;
let request = '';
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  pageNumber = 1;
  if (refs.form.elements.searchQuery.value) {
    request = refs.form.elements.searchQuery.value.trim();
  }
  const photos = await getPhotos(request);
  const {
    data: { hits, totalHits },
  } = photos;
  if (totalHits === 0) {
    onError();
    return;
  }
  totalPages = Math.ceil(totalHits / limit);

  if (totalPages > 1) {
    classRemoveLoadMoreBtn();
  }
  const marcup = createMarcup(hits);
  clearMarcup();
  addMarcup(marcup);
  onSuccess(totalHits);
  lightbox.refresh();
}

async function onLoadMoreBtnClick() {
  pageNumber += 1;

  const photos = await getPhotos(request);
  const {
    data: { hits },
  } = photos;

  const marcup = createMarcup(hits);
  addMarcup(marcup);
  lightbox.refresh();

  if (totalPages === pageNumber) {
    classAddLoadMoreBtn();
    onEnd();
  }
}

function classAddLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function classRemoveLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

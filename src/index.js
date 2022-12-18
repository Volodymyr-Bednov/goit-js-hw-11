import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './scripts/sendrequest';

const formRef = document.querySelector('form#search-form');
const findValue = document.querySelector('input[name="searchQuery"]');
const galleryRef = document.querySelector('div.gallery');
const loadMoreBtnRef = document.querySelector('button.load-more');

const currentState = {
  query: null,
  page: 1,
};

formRef.addEventListener('submit', evt => {
  evt.preventDefault();
  currentState.query = findValue.value;
  currentState.page = 1;
  getData(currentState);

  findValue.value = '';
});

const getData = currentState => {
  getImages(currentState).then(data => {
    if (data.totalHits == 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const totalPages = data.totalHits / data.hits.length;
    console.log(currentState.page, Math.floor(totalPages));
    hidenButton(totalPages);
    renderContent(data.hits);
  });
};

const hidenButton = totalPages => {
  if (currentState.page >= Math.floor(totalPages)) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtnRef.hidden = true;
    return;
  }
  loadMoreBtnRef.hidden = false;
};

const renderContent = comment => {
  clearGallery();
  galleryRef.insertAdjacentHTML(
    'beforeend',
    comment.map(item => createContent(item)).join('')
  );
};

const createContent = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="item-image"/></a>
        <div class="info">
            <p class="info-item">
            <b>Likes:</b><span>${likes}</span>
            </p>
            <p class="info-item">
            <b>Views:</b><span>${views}</span>
            </p>
            <p class="info-item">
            <b>Comments:</b><span>${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads:</b><span>${downloads}</span>
            </p>
        </div>
    </div>`;
};

const clearGallery = () => {
  while (galleryRef.lastChild) {
    galleryRef.removeChild(galleryRef.lastChild);
  }
};

loadMoreBtnRef.addEventListener('click', evt => {
  currentState.page += 1;
  getData(currentState);
});

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

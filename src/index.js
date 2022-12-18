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
  clearGallery();
});

const getData = currentState => {
  getImages(currentState).then(data => {
    if (data.totalHits == 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (currentState.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    const totalPages = data.totalHits / data.hits.length;
    console.log(currentState.page, Math.floor(totalPages));
    hidenButton(totalPages);
    console.log(data);
    renderContent(data.hits);
    box.refresh();
  });
};

const hidenButton = totalPages => {
  if (currentState.page >= Math.floor(totalPages) && currentState.page !== 1) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtnRef.classList.add('is-hidden');
    return;
  }
  loadMoreBtnRef.classList.remove('is-hidden');
};

const renderContent = comment => {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    comment.map(item => createContent(item)).join('')
  );
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
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
  //
  return `
     <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="item-image"/></a>
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

let box = new SimpleLightbox('.gallery a');

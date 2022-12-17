import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './scripts/sendrequest';

const formRef = document.querySelector('form#search-form');
const findValue = document.querySelector('input[name="searchQuery"]');
const galleryRef = document.querySelector('div.gallery');

formRef.addEventListener('submit', evt => {
  evt.preventDefault();
  const query = findValue.value;
  getImages(query).then(data => {
    if (data.length == 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    console.log(data);
    renderContent(data);
  });
  findValue.value = '';
});

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
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
            <b>${likes}</b>
            </p>
            <p class="info-item">
            <b>${views}</b>
            </p>
            <p class="info-item">
            <b>${comments}</b>
            </p>
            <p class="info-item">
            <b>${downloads}</b>
            </p>
        </div>
    </div>`;
};

const clearGallery = () => {
  while (galleryRef.lastChild) {
    galleryRef.removeChild(galleryRef.lastChild);
  }
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

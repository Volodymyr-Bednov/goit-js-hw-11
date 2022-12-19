import notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './scripts/sendrequest';

const formRef = document.querySelector('form#search-form');
const inputRef = document.querySelector('input[name="searchQuery"]');
const galleryRef = document.querySelector('div.gallery');
const loadMoreBtnRef = document.querySelector('button.load-more');

const currentState = {
  query: null,
  page: 1,
};

formRef.addEventListener('submit', evt => {
  evt.preventDefault();
  inputRef.value = inputRef.value.trim();
  if (!inputRef.value) return;
  currentState.query = inputRef.value;
  currentState.page = 1;
  clearGallery();
  getData(currentState);
  inputRef.value = '';
});

const getData = async currentState => {
  const { data } = await getImages(currentState);
  console.log(data);
  if (data.totalHits === 0) {
    notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (currentState.page === 1) {
    notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  const totalPages = Math.floor(data.totalHits / data.hits.length);
  if (totalPages > 1) viewButton();

  if (currentState.page === totalPages) {
    notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    hideButton();
  }
  renderContent(data.hits);
  box.refresh();
};

const renderContent = comment => {
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
  hideButton();
};

const hideButton = () => {
  loadMoreBtnRef.classList.add('is-hidden');
};

const viewButton = () => {
  loadMoreBtnRef.classList.remove('is-hidden');
};

loadMoreBtnRef.addEventListener('click', async evt => {
  currentState.page += 1;
  console.log('a-1');
  const dd = await getData(currentState);
  console.log('a-2');
  console.log('a-4');
  scrollUp();
  console.log('a-5');
});

const scrollUp = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  console.log(cardHeight);

  const scroll = window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  console.log(scroll);
};

let box = new simpleLightbox('.gallery a');

// const hideButton = totalPages => {
//   if (currentState.page >= Math.floor(totalPages)) {
//     notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     loadMoreBtnRef.classList.add('is-hidden');
//     return;
//   }
//   loadMoreBtnRef.classList.remove('is-hidden');
// };

// let box = new simpleLightbox('.gallery a');

/**---------------------------------------------------- */

// formRef.addEventListener('submit', evt => {
//   evt.preventDefault();
//   currentState.query = inputRef.value;
//   currentState.page = 1;
//   getData(currentState);

//   inputRef.value = '';
//   clearGallery();
// });

// const getData = async currentState => {
//   try {
//     const { data } = await getImages(currentState);
//     if (data.totalHits == 0) {
//       notiflix.Notify.info(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//   } catch (error) {
//     console.log(error);
//   }

//   console.log(data);
//   // const dataimages = await getImages(currentState).then(data => {
//   //   if (data.totalHits == 0) {
//   //     notiflix.Notify.info(
//   //       'Sorry, there are no images matching your search query. Please try again.'
//   //     );
//   //     return;
//   //   }
//   //   if (currentState.page === 1) {
//   //     notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//   //   }
//   //   const totalPages = data.totalHits / data.hits.length;
//   //   console.log(currentState.page, Math.floor(totalPages));
//   //   hidenButton(totalPages);
//   //   console.log(data);
//   //   renderContent(data.hits);
//   //   box.refresh();
//   // });
// };

// const hidenButton = totalPages => {
//   if (currentState.page >= Math.floor(totalPages)) {
//     notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     loadMoreBtnRef.classList.add('is-hidden');
//     return;
//   }
//   loadMoreBtnRef.classList.remove('is-hidden');
// };

// const renderContent = comment => {
//   galleryRef.insertAdjacentHTML(
//     'beforeend',
//     comment.map(item => createContent(item)).join('')
//   );
//   // const { height: cardHeight } = document
//   //   .querySelector('.gallery')
//   //   .firstElementChild.getBoundingClientRect();

//   // window.scrollBy({
//   //   top: cardHeight * 2,
//   //   behavior: 'smooth',
//   // });
// };

// const createContent = ({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) => {
//   //
//   return `
//      <div class="photo-card">
//         <a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="item-image"/></a>
//         <div class="info">
//             <p class="info-item">
//             <b>Likes:</b><span>${likes}</span>
//             </p>
//             <p class="info-item">
//             <b>Views:</b><span>${views}</span>
//             </p>
//             <p class="info-item">
//             <b>Comments:</b><span>${comments}</span>
//             </p>
//             <p class="info-item">
//             <b>Downloads:</b><span>${downloads}</span>
//             </p>
//         </div>
//     </div>`;
// };

// const clearGallery = () => {
//   while (galleryRef.lastChild) {
//     galleryRef.removeChild(galleryRef.lastChild);
//   }
// };

// loadMoreBtnRef.addEventListener('click', evt => {
//   currentState.page += 1;
//   getData(currentState);
//   autoScroll();
// });

// const autoScroll = () => {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// };

// let box = new simpleLightbox('.gallery a');

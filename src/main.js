import iziToastMessage from './js/message.js';
import lightbox from './js/simplelightbox.js';

import axios from 'axios';

const form = document.querySelector('#form');
const gallery = document.querySelector('#gallery');
const loadingMessage = document.querySelector('.loader');
const loaderButton = document.querySelector('.loader-button');

const per_page = 40;
let page = 1;
let userSearchRequest;

form.addEventListener('submit', onSearch);
loaderButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  loadingMessage.classList.remove('hidden');
  gallery.innerHTML = '';
  page = 1;
  userSearchRequest = event.currentTarget.elements.inputToSearch.value.trim();
  event.currentTarget.reset();
  loaderButton.classList.add('hidden');
  try {
    const {
      data: { hits, total, totalHits },
    } = await getPhoto(userSearchRequest, page);
    if (!userSearchRequest) {
      iziToastMessage(`Fill the form`);
    } else {
      if (total === 0) {
        iziToastMessage(
          `Sorry, there are no images matching your search query. Please try again!`
        );
      } else {
        gallery.innerHTML = renderImages(hits);
        iziToastMessage(`We found ${total} photos`);
        hasMorePhotos(totalHits);
        lightbox.refresh();
      }
    }
  } catch (error) {
    iziToastMessage(`Api request error: ${error}`);
  } finally {
    loadingMessage.classList.add('hidden');
  }
}

async function onLoadMore() {
  page = +1;
  loaderButton.classList.add('hidden');
  loadingMessage.classList.remove('hidden');
  try {
    const {
      data: { hits, total, totalHits },
    } = await getPhoto(userSearchRequest, page);
    gallery.insertAdjacentHTML('beforeend', renderImages(hits));
    hasMorePhotos(totalHits);
    scroll();
  } catch (error) {
    iziToastMessage(`Api request error: ${error}`);
  } finally {
    loadingMessage.classList.add('hidden');
  }
}

function getPhoto(userSearchRequest, page) {
  const searchParams = new URLSearchParams({
    key: '41535570-7b1028e1c6f1b041bb0744cc1',
    q: userSearchRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });
  return axios.get(`https://pixabay.com/api/?${searchParams}`);
}

function renderImages(arr = []) {
  return arr
    .map(
      img =>
        `<li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img class="gallery-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
        </a>
        <div class="image-info">
          <div>Likes:<span>${img.likes}</span></div>
          <div>Views:<span>${img.views}</span></div>
          <div>Comments:<span>${img.comments}</span></div>
          <div>Downloads:<span>${img.downloads}</span></div>
        </div>
      </li>`
    )
    .join('');
}

function hasMorePhotos(totalHits) {
  const totalPages = Math.ceil(totalHits / per_page);
  if (page >= totalPages) {
    iziToastMessage(
      'We are sorry, but you have reached the end of search results.'
    );
  } else {
    loaderButton.classList.remove('hidden');
    if (page >= 2) {
    }
  }
}

function scroll() {
  const scrollItem = document.querySelector('.gallery-item');
  const galleryItemHeight = scrollItem.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2.0,
    left: 0,
    behavior: 'smooth',
  });
}

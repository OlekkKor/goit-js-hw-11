import Notiflix from 'notiflix';
import SearchImg from './fetch-axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const valueInput = document.querySelector('.input__form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
const resetBtn = document.querySelector('.js-reset');

const lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

const searchImg = new SearchImg();

console.log();

async function onSearchFormSubmit(event) {
  event.preventDefault();

  console.dir(event.target[0].value);
  console.dir(event.target.searchQuery.value);

  if (event.target.searchQuery.value === '') {
    return;
  }

  searchImg.page = 1;

  searchImg.name = event.target.searchQuery.value.trim();

  try {
    const searchResult = await searchImg.fetchImgByName();
    console.dir(searchResult.hits);
    const imagesArr = searchResult.hits;

    if (imagesArr.length < 1) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    console.log(searchImg.name);

    resetBtn.classList.remove('is-hidden');
    loadMoreBtn.classList.remove('is-hidden');

    const markUp = imagesArr
      .map(
        image =>
          `<div class="photo-card">
          <a class="photo-card__link" href="${image.largeImageURL}">          
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="image" />
           
          </a>  
          <div class="info">
            <p class="info-item"> Likes:
              <b> ${image.likes}</b>
            </p>
            <p class="info-item"> Views:
              <b> ${image.views}</b>
            </p>
            <p class="info-item"> Comments:
              <b> ${image.comments}</b>
            </p>
            <p class="info-item"> Downloads:
              <b> ${image.downloads}</b>
            </p>
          </div>                  
        </div>`
      )
      .join(' ');

    galleryEl.innerHTML = ' ';
    galleryEl.insertAdjacentHTML('beforeend', markUp);
    lightbox.refresh();
    event.target[0].value = '';
    console.log(searchImg.name);
  } catch (err) {
    console.log(err);
  }
}

function resetAllImages() {
  resetBtn.classList.add('is-hidden');
  loadMoreBtn.classList.add('is-hidden');
  return (galleryEl.innerHTML = ' ');
}

async function loadMoreFn() {
  SearchImg.page += 1;

  try {
    const addSearchResult = await searchImg.fetchImgByName();
    const addImageArr = addSearchResult.hits;

    if (addImageArr.length < 12) {
      loadMoreBtn.classList.add('is-hidden');
      return Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }

    const markUp = addImageArr
      .map(
        image =>
          `<div class="photo-card">
            <a class="photo-card__link" href="${image.largeImageURL}">          
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="image" />
             
            </a>  
            <div class="info">
              <p class="info-item"> Likes:
                <b> ${image.likes}</b>
              </p>
              <p class="info-item"> Views:
                <b> ${image.views}</b>
              </p>
              <p class="info-item"> Comments:
                <b> ${image.comments}</b>
              </p>
              <p class="info-item"> Downloads:
                <b> ${image.downloads}</b>
              </p>
            </div>                  
          </div>`
      )
      .join(' ');

    galleryEl.insertAdjacentHTML('beforeend', markUp);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener('submit', onSearchFormSubmit);

resetBtn.addEventListener('click', resetAllImages);

loadMoreBtn.addEventListener('click', loadMoreFn);

// import Notiflix from 'notiflix';
// import SearchImg from './fetch-axios';

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const form = document.querySelector('.search-form');
// const valueInput = document.querySelector(".input__form");
// const galleryEl = document.querySelector(".js-gallery");
// const loadMoreBtn = document.querySelector(".js-load-more");
// const resetBtn = document.querySelector(".js-reset");

// const lightbox = new SimpleLightbox('.photo-card a', {
//     captionDelay: 250,
//   });

// const searchImg = new SearchImg();

// console.log();

// function onSearchFormSubmit(event) {
//     event.preventDefault();

//     console.dir();

//     searchImg.page = 1;

//     searchImg.name = event.target.searchQuery.value.trim();

//     searchImg
//     .fetchImgByName()
//     .then(data => {

//         if (data.hits.length < 1){
//             return Notiflix.Notify.warning(
//                 'Sorry, there are no images matching your search query. Please try again.'
//               );
//         }

//          resetBtn.classList.remove('is-hidden');
//          loadMoreBtn.classList.remove('is-hidden');

//         const markUp = data.hits.map(image =>

//             `<div class="photo-card">
//           <a class="photo-card__link" href="${image.largeImageURL}">
//           <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="image" />

//           </a>
//           <div class="info">
//             <p class="info-item"> Likes:
//               <b> ${image.likes}</b>
//             </p>
//             <p class="info-item"> Views:
//               <b> ${image.views}</b>
//             </p>
//             <p class="info-item"> Comments:
//               <b> ${image.comments}</b>
//             </p>
//             <p class="info-item"> Downloads:
//               <b> ${image.downloads}</b>
//             </p>
//           </div>
//         </div>`
//         )
//         .join(' ');

//       galleryEl.innerHTML = ' ';
//       galleryEl.insertAdjacentHTML('beforeend', markUp);
//       lightbox.refresh();
//       event.target[0].value = " ";
//     });

// }

// function resetAllImages(){
//     resetBtn.classList.add('is-hidden');
//     loadMoreBtn.classList.add('is-hidden');
//     return galleryEl.innerHTML = ' ';
// }

// function loadMoreFn(){

//     SearchImg.page += 1;

//     searchImg
//     .fetchImgByName()
//     .then(data => {

//         if (data.hits.length < 12){
//             loadMoreBtn.classList.add('is-hidden');
//             return Notiflix.Notify.failure(
//                 "We're sorry, but you've reached the end of search results."
//               );
//         }

//         const markUp = data.hits.map(image =>

//             `<div class="photo-card">
//             <a class="photo-card__link" href="${image.largeImageURL}">
//             <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="image" />

//             </a>
//             <div class="info">
//               <p class="info-item"> Likes:
//                 <b> ${image.likes}</b>
//               </p>
//               <p class="info-item"> Views:
//                 <b> ${image.views}</b>
//               </p>
//               <p class="info-item"> Comments:
//                 <b> ${image.comments}</b>
//               </p>
//               <p class="info-item"> Downloads:
//                 <b> ${image.downloads}</b>
//               </p>
//             </div>
//           </div>`
//           )
//           .join(' ');

//         galleryEl.insertAdjacentHTML('beforeend', markUp);
//         lightbox.refresh();
//         })

// }

// form.addEventListener('submit', onSearchFormSubmit);

// resetBtn.addEventListener('click', resetAllImages);

// loadMoreBtn.addEventListener('click', loadMoreFn);

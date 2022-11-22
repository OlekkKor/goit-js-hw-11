import Notiflix from 'notiflix';
import SearchImg from './fetch-axios';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const valueInput = document.querySelector(".input__form");
const galleryEl = document.querySelector(".js-gallery");
const loadMoreBtn = document.querySelector(".js-load-more");
const resetBtn = document.querySelector(".js-reset");

const bodyJs = document.querySelector("body");


const lightbox = new SimpleLightbox('.photo-card a', {
    captionDelay: 250,
  });

const searchImg = new SearchImg();

console.log();


bodyJs.classList.add("gradient");

function onSearchFormSubmit(event) {
    event.preventDefault();
    
    console.dir();

    searchImg.page = 1;

    searchImg.name = event.target.searchQuery.value.trim();

    searchImg
    .fetchImgByName()
    .then(data => {

        if (data.hits.length < 1){
            return Notiflix.Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
              );
        }

        console.log(SearchImg.page);

         resetBtn.classList.remove('is-hidden');
         loadMoreBtn.classList.remove('is-hidden');
        
        const markUp = data.hits.map(image => 
             
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

    });

}



function resetAllImages(){
    resetBtn.classList.add('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    return galleryEl.innerHTML = ' ';
}



function loadMoreFn(){
    
    SearchImg.page += 1;

    searchImg
    .fetchImgByName()
    .then(data => {
        
        

        if (data.hits.length < 12){
            loadMoreBtn.classList.add('is-hidden');
            return Notiflix.Notify.failure(
                "We're sorry, but you've reached the end of search results."
              );
        }


        const markUp = data.hits.map(image => 
    
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
        })
        
  
     
}

form.addEventListener('submit', onSearchFormSubmit);

resetBtn.addEventListener('click', resetAllImages);

loadMoreBtn.addEventListener('click', loadMoreFn); 











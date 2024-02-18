'use strict'

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';
import { refs } from './js/render-functions';

class FormHandler {
    constructor() {
        this.userInput = '';
        this.page = 1;
        this.maxPage = undefined;
    }

    async onFormSubmit(e) {
        e.preventDefault();
        this.clearGallery();
        this.page = 1;
        this.userInput = refs.input.value.trim();

        if ( this.userInput === '') {
            iziToast.error({
                message: 'Please enter a search query.',
                position: 'topRight',
                transitionIn: 'fadeInLeft',
            });
            return;
        }

        refs.gallery.innerHTML = '';
        this.showLoader();
        this.hideLoadBtn();

        try {
            const data = await getPhotos(this.userInput, this.page);
            this.maxPage = Math.ceil(data.totalResults / 15);
            if (data.results.length === 0) {
                this.hideLoader();
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    transitionIn: 'fadeInLeft',
                });
            } else {
                renderPhotos(data.results);
            }
        } catch (err) {
            iziToast.error({
                message: err.message || 'An error occurred. Please try again later.',
                position: 'topRight',
                transitionIn: 'fadeInLeft',
            });
        }
        this.hideLoader();
        this.checkBtnStatus();
        e.target.reset();
    }

    async onloadMore() {
        this.page += 1;
        this.showLoader();
        const data = await getPhotos();
        renderPhotos(data.results);
        hideLoader();
        window.scrollBy({
          top: height * 2,
          behavior: 'smooth',
        });
    }

    showLoadBtn() {
        refs.buttonLoader.classList.remove('hidden')
    }

    hideLoadBtn() {
        refs.buttonLoader.classList.add('hidden')
    }

    showLoader() {
        refs.loader.classList.remove('hidden');
    }
      
    hideLoader() {
        refs.loader.classList.add('hidden');
    }

    clearGallery() {
        refs.gallery.innerHTML = '';
    }

    checkBtnStatus() {
        if (this.page >= this.maxPage) {
            this.hideLoadBtn();
            this.hideLoader();
            iziToast.show({
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topRight',
                color: 'blue',
                transitionIn: 'fadeInLeft'
            });
        } else {
          refs.btnLoadMore.classList.remove('hidden');
        }
      }
}

const formHandler = new FormHandler();
refs.form.addEventListener('submit', e => formHandler.onFormSubmit(e));
refs.buttonLoader.addEventListener('click', () =>
formHandler.loadMore()
);
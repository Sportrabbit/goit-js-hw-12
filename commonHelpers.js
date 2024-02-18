import{a as p,S as m,i}from"./assets/vendor-64b55ca9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();async function c(s,e){const a="42321228-2dc7965d40466a0a646776a28",r="https://pixabay.com"+"/api/",n={key:a,q:s,image_type:"photo",orientation:"horizontal",per_page:15,page:e};return(await p.get(r,{params:n})).data}let d;const o={formElem:document.querySelector(".form"),input:document.querySelector(".input-search"),button:document.querySelector(".button"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),buttonLoader:document.querySelector(".btn-more")};function f(s){return s.map(e=>`
        <li class="gallery-item"><a href="${e.largeImageURL}">
            <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"></a>
            <div class="info">
            <p> <span class="info-text">Likes</span> <br/> ${e.likes}</p>
            <p><span class="info-text">Views</span> <br/> ${e.views}</p>
            <p><span class="info-text">Comments</span> <br/> ${e.comments}</p>
            <p><span class="info-text">Downloads</span> <br/> ${e.downloads}</p>
            </div>
            </li>
        `).join()}function u(s){const e=f(s);o.gallery.insertAdjacentHTML("beforeend",e),typeof LightBox<"u"?d.refresh():d=new m(".gallery a",{captionsData:"alt",captionDelay:250})}class g{constructor(){this.userInput="",this.page=1,this.maxPage=void 0}async onFormSubmit(e){if(e.preventDefault(),this.clearGallery(),this.page=1,this.userInput=o.input.value.trim(),this.userInput===""){i.error({message:"Please enter a search query.",position:"topRight",transitionIn:"fadeInLeft"});return}o.gallery.innerHTML="",this.showLoader(),this.hideLoadBtn();try{const a=await c(this.userInput,this.page);this.maxPage=Math.ceil(a.totalResults/15),a.results.length===0?(this.hideLoader(),i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",transitionIn:"fadeInLeft"})):u(a.results)}catch(a){i.error({message:a.message||"An error occurred. Please try again later.",position:"topRight",transitionIn:"fadeInLeft"})}this.hideLoader(),this.checkBtnStatus(),e.target.reset()}async onloadMore(){this.page+=1,this.showLoader();const e=await c();u(e.results),hideLoader(),window.scrollBy({top:height*2,behavior:"smooth"})}showLoadBtn(){o.buttonLoader.classList.remove("hidden")}hideLoadBtn(){o.buttonLoader.classList.add("hidden")}showLoader(){o.loader.classList.remove("hidden")}hideLoader(){o.loader.classList.add("hidden")}clearGallery(){o.gallery.innerHTML=""}checkBtnStatus(){this.page>=this.maxPage?(this.hideLoadBtn(),this.hideLoader(),i.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue",transitionIn:"fadeInLeft"})):o.btnLoadMore.classList.remove("hidden")}}const h=new g;o.formElem.addEventListener("submit",s=>h.onFormSubmit(s));o.buttonLoader.addEventListener("click",()=>h.loadMore());
//# sourceMappingURL=commonHelpers.js.map

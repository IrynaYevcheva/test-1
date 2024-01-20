import{i as y,S as L,a as v}from"./assets/vendor-08b0e0f9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function a(t){y.show({close:!1,closeOnClick:!0,message:t,messageColor:"white",timeout:3e3,transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",backgroundColor:"#EF4040",progressBar:!1})}let b=new L("#gallery a",{showCounter:!1,captionsData:"alt",captionDelay:200});const w=document.querySelector("#form"),f=document.querySelector("#gallery"),c=document.querySelector(".loader"),d=document.querySelector(".loader-button"),h=40;let i=1,l;w.addEventListener("submit",S);d.addEventListener("click",q);async function S(t){t.preventDefault(),c.classList.remove("hidden"),f.innerHTML="",i=1,l=t.currentTarget.elements.inputToSearch.value.trim(),t.currentTarget.reset(),d.classList.add("hidden");try{const{data:{hits:e,total:s,totalHits:n}}=await m(l,i);l?s===0?a("Sorry, there are no images matching your search query. Please try again!"):(f.innerHTML=p(e),a(`We found ${s} photos`),g(n),b.refresh()):a("Fill the form")}catch(e){a(`Api request error: ${e}`)}finally{c.classList.add("hidden")}}async function q(){i=1,d.classList.add("hidden"),c.classList.remove("hidden");try{const{data:{hits:t,total:e,totalHits:s}}=await m(l,i);f.insertAdjacentHTML("beforeend",p(t)),g(s),$()}catch(t){a(`Api request error: ${t}`)}finally{c.classList.add("hidden")}}function m(t,e){const s=new URLSearchParams({key:"41535570-7b1028e1c6f1b041bb0744cc1",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:h});return v.get(`https://pixabay.com/api/?${s}`)}function p(t=[]){return t.map(e=>`<li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
        </a>
        <div class="image-info">
          <div>Likes:<span>${e.likes}</span></div>
          <div>Views:<span>${e.views}</span></div>
          <div>Comments:<span>${e.comments}</span></div>
          <div>Downloads:<span>${e.downloads}</span></div>
        </div>
      </li>`).join("")}function g(t){const e=Math.ceil(t/h);i>=e?a("We are sorry, but you have reached the end of search results."):d.classList.remove("hidden")}function $(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
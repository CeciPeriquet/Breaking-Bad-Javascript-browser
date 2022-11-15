"use strict";const searchInput=document.querySelector(".js-input"),searchBtn=document.querySelector(".js-btn"),cardsList=document.querySelector(".js-list"),favCardsList=document.querySelector(".js-fav-list"),resetButton=document.querySelector(".js-reset-btn"),favsSection=document.querySelector(".js-fav-cards");let charactersList=[],favouriteCharacters=[];function getData(){fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{charactersList=e,renderCharactersList()})}function getLocalFav(){const e=JSON.parse(localStorage.getItem("favourites"));null!==e&&(favouriteCharacters=e,renderFavCharacters())}function renderCards(e){const t=document.createElement("li");t.classList.add("cards-list-item");const a=document.createElement("article"),r=e.char_id;-1!==favouriteCharacters.findIndex(e=>e.char_id===r)?a.classList.add("card","js-fav-card","selected"):a.classList.add("card","js-card"),a.setAttribute("id",e.char_id);const s=document.createElement("img");s.setAttribute("src",e.img),s.setAttribute("alt","Picture of "+e.name),s.setAttribute("title",e.name),s.classList.add("card-img");const c=document.createElement("h3");c.classList.add("card-name");const n=document.createTextNode(e.name),d=document.createElement("p");d.classList.add("card-status");const i=document.createTextNode(e.status);c.appendChild(n),d.appendChild(i),a.appendChild(s),a.appendChild(c),a.appendChild(d),t.appendChild(a);return t}function renderCharactersList(){cardsList.innerHTML="";for(const e of charactersList)cardsList.appendChild(renderCards(e));cardListeners()}function handleClickCard(e){e.currentTarget.classList.add("selected");const t=parseInt(e.currentTarget.id),a=charactersList.find(e=>e.char_id===t),r=favouriteCharacters.findIndex(e=>e.char_id===t);-1===r?favouriteCharacters.push(a):(favouriteCharacters.splice(r,1),e.currentTarget.classList.remove("selected")),localStorage.setItem("favourites",JSON.stringify(favouriteCharacters)),renderFavCharacters()}function cardListeners(){const e=document.querySelectorAll(".js-card");for(const t of e)t.addEventListener("click",handleClickCard)}function renderFavCard(e){const t=document.createElement("li");t.classList.add("cards-list-item");const a=document.createElement("article");a.classList.add("card","js-fav-card","selected"),a.setAttribute("id",e.char_id);const r=document.createElement("i");r.classList.add("fa-solid","fa-square-xmark");const s=document.createElement("img");s.setAttribute("src",e.img),s.setAttribute("alt","Picture of "+e.name),s.setAttribute("title",e.name),s.classList.add("card-img");const c=document.createElement("h3");c.classList.add("card-name");const n=document.createTextNode(e.name),d=document.createElement("p");d.classList.add("card-status");const i=document.createTextNode(e.status);c.appendChild(n),d.appendChild(i),a.appendChild(r),a.appendChild(s),a.appendChild(c),a.appendChild(d),t.appendChild(a);return t}function paintFavSection(){console.log(favouriteCharacters.length),0!==favouriteCharacters.length?favsSection.classList.remove("hidden"):favsSection.classList.add("hidden"),paintReset()}function renderFavCharacters(){favCardsList.innerHTML="";for(const e of favouriteCharacters)favCardsList.appendChild(renderFavCard(e));paintFavSection(),favCardListeners()}function filterCards(){let e=searchInput.value.toLowerCase();cardsList.innerHTML="",console.log(e);const t=charactersList.filter(t=>t.name.toLowerCase().includes(e));for(const e of t)cardsList.appendChild(renderCards(e));""===e&&renderCharactersList()}function handleSearch(e){e.preventDefault(),console.log("cliccckkkkiiii"),filterCards(),cardListeners()}function handleResetInput(e){e.preventDefault(),""===searchInput.value.toLowerCase()&&renderCharactersList()}function handleClickFavCard(e){const t=parseInt(e.currentTarget.id);let a="";const r=favouriteCharacters.findIndex(e=>e.char_id===t);favouriteCharacters.splice(r,1);const s=charactersList.find(e=>e.char_id===t);console.log(s),a=renderCards(s),a.classList.remove("selected"),console.log(a),renderFavCharacters(),renderCharactersList(),localStorage.setItem("favourites",JSON.stringify(favouriteCharacters))}function favCardListeners(){const e=document.querySelectorAll(".js-fav-card");for(const t of e)t.addEventListener("click",handleClickFavCard)}function paintReset(){0!==favouriteCharacters.length?resetButton.classList.remove("hidden"):resetButton.classList.add("hidden"),resetButton.addEventListener("click",(function(){favCardsList.innerHTML="",favouriteCharacters=[],localStorage.setItem("favourites",favouriteCharacters),resetButton.classList.add("hidden"),favsSection.classList.add("hidden");const e=document.querySelectorAll(".js-card");for(const t of e)t.classList.remove("selected")}))}getData(),getLocalFav(),searchBtn.addEventListener("click",handleSearch),searchInput.addEventListener("input",handleResetInput);
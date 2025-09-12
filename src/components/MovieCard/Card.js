// web component - card

import BaseComponent from "../BaseComponent.js";


export  class MovieCard extends BaseComponent {
  constructor() {
     super();
  }
   
    static get observedAttributes() {
      return ["poster", "title", "overview"];
   }

   get poster() {
      return this.getAttribute("poster") || "";
   }
   
   get title() {
      return this.getAttribute("title") || "...";
   }

   get overview() {
      return this.getAttribute("overview") || "...";
   }

    async render() {
        const cssUrl = new URL("./Card.css", import.meta.url);
        let css = "";
        try {
          const response = await fetch(cssUrl);
          css = response.ok ? await response.text() : "";
        } catch (_) { css = ""; }

        this.shadowRoot.innerHTML = `
            <style>
                ${css}
            </style>
            <article class="movie-card">
                <img class="movie__poster" src="${this.poster}" alt="${this.title}">
                <div class="card__content">
                    <h3 class="movie__title">${this.title}</h3>
                    <slot name="overview">${this.overview}</slot>
                </div>
            </article>
        `;
   } 
}

customElements.define("movie-card", MovieCard);
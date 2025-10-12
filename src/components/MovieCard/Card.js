// web component - card

import BaseComponent from "../BaseComponent.js";
import styles from "./Card.css?inline";


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
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
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
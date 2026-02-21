// web component - card

import BaseComponent from "../BaseComponent.js";
import styles from "./Card.css?inline";


export class MovieCard extends BaseComponent {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ["variant", "tag", "title", "overview", "poster", "vote_average", "release_date"];
    }

    // Getter solo para atributos HTML
    get variant() { return this.getAttribute("variant") || "v1"; }
    get tag() { return this.getAttribute("tag") || ""; }

    async render() {
        // Normalize data to constants (check properties first, then attributes)
        const poster = this.poster || this.getAttribute("poster") || "";
        const title = this.title || this.getAttribute("title") || "...";
        const overview = this.overview || this.getAttribute("overview") || "...";
        const variant = this.variant;
        const voteAverage = this.vote_average ?? this.getAttribute("vote_average") ?? "";
        const releaseDate = this.release_date || this.getAttribute("release_date") || "";
        const tag = this.tag;

        // Render based on variant
        const cardContent = this.getCardContent(variant, { poster, title, overview, voteAverage, releaseDate, tag });

        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            ${cardContent}
        `;
    }

    getCardContent(variant, data) {
        const { poster, title, overview, voteAverage, releaseDate, tag } = data;

        switch (variant) {
            case 'v2': // Antiguo 'slider'
                return this.getV2CardTemplate(poster, title, voteAverage, releaseDate);
            case 'slider': // Nuevo slider tipo carrusel
                return this.getSliderCardTemplate(tag, title, overview);
            case 'v1': // Antiguo 'default'
            default:
                return this.getV1CardTemplate(poster, title, overview);
        }
    }

    getV1CardTemplate(poster, title, overview) {
        return `
            <article class="movie-card movie-card--v1">
                <img class="movie__poster" src="${poster}" alt="${title}">
                <div class="card__content">
                    <h3 class="movie__title">${title}</h3>
                    <slot name="overview">${overview}</slot>
                </div>
            </article>
        `;
    }

    getV2CardTemplate(poster, title, voteAverage, releaseDate) {
        const ratingDisplay = voteAverage ? `<span class="card__rating">⭐ ${voteAverage}</span>` : '';
        const yearDisplay = releaseDate ? `<span class="card__year">${releaseDate.substring(0, 4)}</span>` : '';
        
        return `
            <article class="movie-card movie-card--v2">
                <div class="slider-card__poster-wrapper">
                    <img class="movie__poster" src="${poster}" alt="${title}">
                    <div class="slider-card__overlay">
                        <span class="slider-card__play-icon">▶</span>
                    </div>
                </div>
                <div class="card__content">
                    <div class="title-wrapper">
                        <h3 class="movie__title">${title}</h3>
                    </div>
                    <div class="card__meta">
                        ${ratingDisplay}
                        ${yearDisplay}
                    </div>
                </div>
            </article>
        `;
    }

    getSliderCardTemplate(tag, title, overview) {
        return `
            <article class="movie-card movie-card--slider">
                <span class="slide_tag">${tag}</span>
                <h3 class="slide_title">${title}</h3>
                <p class="slide_summary">${overview}</p>
            </article>
        `;
    }
}

customElements.define("movie-card", MovieCard);
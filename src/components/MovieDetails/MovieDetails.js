// web component - movie details

import BaseComponent from "../BaseComponent.js";
import styles from "./MovieDetails.css?inline";

class MovieDetails extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        // Normalize incoming data to avoid runtime errors
        const title = this.title || "...";
        const poster = this.poster || "";
        const overview = this.overview || "";
        const voteAverage = this.vote_average ?? "";
        const releaseDate = this.release_date || "";
        const originalLanguage = this.original_language || "";
        const originalTitle = this.original_title || title;
        const genres = Array.isArray(this.genres) ? this.genres : [];
        const productionCompanies = Array.isArray(this.production_companies) ? this.production_companies : [];
        const crew = Array.isArray(this.crew) ? this.crew : [];

        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <div class="movie-details">
                <h1>${title}</h1>
                <div class="close_button" role="button" aria-label="Close details">X</div>
                <div class="movie__content">
                    <section class="basics">
                        <figure>
                            <img class="movie__poster" src="${poster}" alt="${title}">
                            <figcaption>${title}</figcaption>
                            <div class="average_vote">⭐ ${voteAverage}</div>
                        </figure>
                        <article class="movie__overview">
                            <h2>Overview</h2>
                            <p class="movie-overview">${overview}</p>
                        </article>
                        <article class="genres">
                            <h2>Genres</h2>
                            <div>
                            ${genres.map(genre => `<span>${genre}</span>`).join(" ")}
                            </div>
                            <article class="release_date">
                                <h2>Release date</h2>
                                <p>${releaseDate}</p>
                            </article>
                        </article>
                    </section>
                    <section class="language_info">
                        <div class="original_language">
                            <h2>Original language</h2>
                            <p>${originalLanguage}</p>
                        </div>
                        <div class="original_title">
                            <h2>Original title</h2>
                            <p>${originalTitle}</p>
                        </div>
                    </section>
                    <section class="production_companies">
                        <h2>Production companies</h2>
                        <ul>
                        ${productionCompanies.map(company => `<li>${company.name || company}</li>`).join(" ")}
                        </ul>
                    </section>
                    <section class="cast_info">
                        <h2>Crew</h2>
                        ${crew.map(member => `
                            <div class="member_info">
                                <p>${member.name || "-"}</p>
                                <p>${member.job || "-"}</p>
                                <p>${member.department || "-"}</p>
                            </div>`).join(" ")}
                    </section>
                </div>
            </div>
        `;
    }

    setUpListeners() {
        const root = this.shadowRoot;
        if (!root) return;
        root.addEventListener('click', (ev) => {
            const target = ev.target;
            if (target && target.classList && target.classList.contains('close_button')) {
                this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
                this.remove();
            }
        });
    }
}

customElements.define("movie-details", MovieDetails);

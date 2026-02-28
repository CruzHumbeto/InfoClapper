//<--- movie list component --->
import BaseComponent from "../BaseComponent.js";
import styles from "./MovieList.css?inline";
import { context } from "../../utils/context.js";
import "../MovieCard/Card.js";

export default class MovieList extends BaseComponent {
    constructor() {
        super();
        this._movies = [];
    }

    connectedCallback() {
        super.connectedCallback();
        context.addEventListener("stateChange", (e) => {
            if (e.detail.prop === "movies") {
                this._movies = e.detail.value || [];
                this._update();
            }
        });
    }

    render() {
        const moviesHtml = this._movies.map(movie => `
            <movie-card
                variant="v2"
                poster="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}"
                title="${movie.title || "..."}"
                overview="${movie.overview || ""}"
                vote_average="${movie.vote_average ?? ""}"
                release_date="${movie.release_date || ""}"
                data-id="${movie.id}"
                style="cursor: pointer;"
            ></movie-card>
        `).join('');

        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <section>
                <h2>${context.state.actualScreen}</h2>
                <slot name="banner"></slot>
                <div class="movie_list">
                    ${moviesHtml}
                </div>
            </section>
        `;
    }

    setUpListeners() {
        super.setUpListeners();
        const cards = this.shadowRoot.querySelectorAll('movie-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const movieId = card.getAttribute('data-id');
                if (movieId) {
                    this.dispatchEvent(new CustomEvent('open-movie-details', {
                        detail: { id: movieId },
                        bubbles: true,
                        composed: true
                    }));
                }
            });
        });
    }
}

customElements.define("movie-list", MovieList);
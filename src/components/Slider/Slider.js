// Slider component
//
import BaseComponent from "../BaseComponent.js";
import styles from "./Slider.css?inline";
import "../MovieCard/Card.js";
import { context } from "../../utils/context.js";

export default class Slider extends BaseComponent {
    constructor() {
        super();
        this._movies = [];
        this._currentIndex = 0;
        this._autoplayTimer = null;
        this._observer = null;
    }

    connectedCallback() {
        super.connectedCallback();
        context.addEventListener("stateChange", (e) => {
            if (e.detail.prop === "popularMovies") {
                this._update();
            }
        });
    }

    disconnectedCallback() {
        this._clearAutoplay();
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
    }

    render() {
        const sliderCards = this.getSliderCards();

        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <section>
                <div class="info_item">
                    <img class="info_backdrop" src="" alt="" aria-hidden="true" />
                    <div class="info_text">
                        <h2 class="info_title">Discover new favorites</h2>
                        <div class="info_meta">
                            <span class="info_rating"></span>
                            <div class="info_genres"></div>
                        </div>
                    </div>
                </div>
                <div class="slider_track">
                    <ul class="carousel">
                        ${sliderCards}
                    </ul>
                </div>
            </section>
        `;

        this._setupObserver();
        this._startAutoplay();
    }

    getSliderCards() {
        const range = 7;
        const movies = context.state.popularMovies.slice(0, range);
        this._movies = movies;

        if (movies.length === 0) return '';

        return movies.map((movie, index) => {
            return `
                <movie-card
                    variant="slider"
                    tag="Popular"
                    class="slide"
                    data-index="${index}"
                    title="${movie.title}"
                    overview="${movie.overview || ''}"
                    poster="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                ></movie-card>
            `;
        }).join('');
    }

    _setupObserver() {
        if (this._observer) this._observer.disconnect();

        const carousel = this.shadowRoot.querySelector('.carousel');
        if (!carousel) return;

        const slides = this.shadowRoot.querySelectorAll('.slide');
        if (slides.length === 0) return;

        this._observer = new IntersectionObserver((entries) => {
            // Find the most visible slide
            let maxRatio = 0;
            let focusedEntry = null;
            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    focusedEntry = entry;
                }
            });

            if (focusedEntry && maxRatio > 0.5) {
                const index = parseInt(focusedEntry.target.dataset.index, 10);
                if (!isNaN(index)) {
                    this._currentIndex = index;
                    this._updateBackdrop(index);
                }
            }
        }, {
            root: carousel,
            threshold: [0.5, 0.75, 1.0],
        });

        slides.forEach(slide => this._observer.observe(slide));

        // Show first backdrop immediately
        if (this._movies.length > 0) {
            this._updateBackdrop(0);
        }
    }

    _updateBackdrop(index) {
        const movie = this._movies[index];
        const backdropEl = this.shadowRoot.querySelector('.info_backdrop');
        const titleEl = this.shadowRoot.querySelector('.info_title');
        const ratingEl = this.shadowRoot.querySelector('.info_rating');
        const genresEl = this.shadowRoot.querySelector('.info_genres');
        if (!backdropEl || !movie) return;

        const backdropUrl = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
            : '';

        backdropEl.src = backdropUrl;
        backdropEl.alt = movie.title || '';

        if (titleEl) titleEl.textContent = movie.title || 'Discover new favorites';

        // Rating — one filled star + numeric score
        if (ratingEl) {
            const score = movie.vote_average ? movie.vote_average.toFixed(1) : '—';
            ratingEl.innerHTML = `<span class="star" aria-hidden="true">★</span> ${score}`;
        }

        // Genres — cross-reference context.state.genres by id
        if (genresEl) {
            const genreMap = Object.fromEntries(
                (context.state.genres || []).map(g => [g.id, g.name])
            );
            const names = (movie.genre_ids || []).slice(0, 3).map(id => genreMap[id]).filter(Boolean);
            genresEl.innerHTML = names.length
                ? names.map(n => `<span class="genre_pill">${n}</span>`).join('')
                : '';
        }
    }

    _startAutoplay() {
        this._clearAutoplay();
        const carousel = this.shadowRoot.querySelector('.carousel');
        if (!carousel || this._movies.length === 0) return;

        this._autoplayTimer = setInterval(() => {
            const carousel = this.shadowRoot.querySelector('.carousel');
            const slides = this.shadowRoot.querySelectorAll('.slide');
            if (!carousel || slides.length === 0) return;

            this._currentIndex = (this._currentIndex + 1) % slides.length;

            // Use scrollLeft directly so the page viewport does NOT move
            const target = slides[this._currentIndex];
            const carouselLeft = carousel.getBoundingClientRect().left;
            const slideLeft = target.getBoundingClientRect().left;
            carousel.scrollBy({
                left: slideLeft - carouselLeft,
                behavior: 'smooth',
            });
        }, 20000);
    }

    _clearAutoplay() {
        if (this._autoplayTimer !== null) {
            clearInterval(this._autoplayTimer);
            this._autoplayTimer = null;
        }
    }
}

customElements.define("movie-slider", Slider);

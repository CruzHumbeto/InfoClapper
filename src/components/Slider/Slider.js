// Slider component
//
import BaseComponent from "../BaseComponent.js";
import styles from "./Slider.css?inline";
import "../MovieCard/Card.js";
import { context } from "../../utils/context.js";

export default class Slider extends BaseComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        // Escuchar cambios en el estado global para re-renderizar
        context.addEventListener("stateChange", (e) => {
            if (e.detail.prop === "popularMovies") {
                this._update();
            }
        });
    }

    render() {
        const sliderCards = this.getSliderCards();

        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <section>
                <div class="info_item">
                    <h2 class="info_title">Discover new favorites</h2>
                    <p class="info_description">Scroll through curated highlights tailored for your next movie night.</p>
                </div>
                <div class="slider_track">
                    <ul class="carousel">
                        ${sliderCards}
                    </ul>
                </div>
            </section>
        `;
    }

    getSliderCards() {
        const range = 5;
        const movies = context.state.popularMovies.slice(0, range);
        
        if (movies.length === 0) return '';

        return movies.map(movie => {
            return `
                <movie-card 
                    variant="slider" 
                    tag="Popular" 
                    class="slide"
                    title="${movie.title}"
                    overview="${movie.overview || ''}"
                    poster="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                ></movie-card>
            `;
        }).join('');
    }

}

customElements.define("movie-slider", Slider);

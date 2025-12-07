// Slider component
//
import BaseComponent from "../BaseComponent.js";
import styles from "./Slider.css?inline";

export default class Slider extends BaseComponent {
    constructor() {
        super();
    }

    render() {
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
                        <li class="slide">
                            <span class="slide_tag">Premiere</span>
                            <h3 class="slide_title">Blockbuster Launch</h3>
                            <p class="slide_summary">Experience the newest cinematic release with stunning visuals and immersive sound.</p>
                        </li>
                        <li class="slide">
                            <span class="slide_tag">Editorial</span>
                            <h3 class="slide_title">Critics' Choice</h3>
                            <p class="slide_summary">Handpicked dramas making waves during awards season across the globe.</p>
                        </li>
                        <li class="slide">
                            <span class="slide_tag">Trending</span>
                            <h3 class="slide_title">Community Picks</h3>
                            <p class="slide_summary">Join the buzz around the most streamed stories capturing audiences this week.</p>
                        </li>
                        <li class="slide">
                            <span class="slide_tag">Hidden Gem</span>
                            <h3 class="slide_title">Indie Spotlight</h3>
                            <p class="slide_summary">Discover daring storytelling from visionary filmmakers off the beaten path.</p>
                        </li>
                    </ul>
                </div>
            </section>
        `;
    }
}

customElements.define("movie-slider", Slider);

//<--- movie list component --->
import BaseComponent from "../BaseComponent";
import styles from "./MovieList.css?inline";

export default class MovieList extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <section>
                <h2>Movie List</h2>
                <slot name="banner"></slot>
                <slot name="movie_list" class="movie_list"></slot>
            </section>
        `;
    }
}

customElements.define("movie-list", MovieList);
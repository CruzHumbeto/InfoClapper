//<!-- SearchBar component -->
import BaseComponent from "../BaseComponent.js";
import styles from "./SearchBar.css?inline";

export default class SearchBar extends BaseComponent {
    constructor() {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <section>
                <input type="text" placeholder="Search...">
                <button>
                    <i data-lucide="search"></i>
                </button>
            </section>
        `;
    }
    
    setUpListeners() {
        const button = this.shadowRoot.querySelector('button');
        if (!button) return;
        button.removeEventListener('click', this.handleButtonClick);
        button.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick() {
        const input = this.shadowRoot.querySelector('input');
        if (!input) return;
        input.focus();
    }
    afterRender() {
        this.renderIcons();
    }
}

customElements.define('search-bar', SearchBar);
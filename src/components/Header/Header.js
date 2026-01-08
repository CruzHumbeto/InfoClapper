// web component - header

import BaseComponent from "../BaseComponent.js";
import styles from "./Header.css?inline";
import SearchBar from "../SearchBar/SearchBar.js";

class Header extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <header class="header">
                <section class="menu">
                    <button id="button_aside"><i data-lucide="menu"></i></button>
                    <h1 class="brand">🎬 Info Clapper</h1>
                </section>
                <search-bar></search-bar>    
            </header>
        `;
    }

    afterRender() {
        this.renderIcons();
    }
    setUpListeners() {
        const menuBtn = this.shadowRoot.querySelector("#button_aside");
        if (menuBtn) {
            menuBtn.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("toggle-sidebar", {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }

}

customElements.define("header-component", Header);


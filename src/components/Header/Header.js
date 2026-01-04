// web component - header

import BaseComponent from "../BaseComponent.js";
import { createElement, icons } from "lucide";
import styles from "./Header.css?inline";
import SearchBar from "../SearchBar/SearchBar.js";

const toPascalCase = (value) => value.replace(/(^\w|[\s-_]\w)/g, (segment) => segment.replace(/^[\s-_]/, "").toUpperCase());
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
        const lucideNodes = this.shadowRoot.querySelectorAll('[data-lucide]');
        lucideNodes.forEach((el) => {
            const name = el.getAttribute('data-lucide');
            const iconKey = name ? toPascalCase(name) : "";
            const iconNode = iconKey ? icons[iconKey] : undefined;
            if (!iconNode) {
                console.warn('Lucide icon not found:', name);
                return;
            }
            try {
                const svg = createElement(iconNode, { width: 20, height: 20, 'aria-hidden': 'true' });
                if (svg) el.replaceWith(svg);
            } catch (e) {
                console.error('Error rendering lucide icon:', name, e);
            }
        });
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


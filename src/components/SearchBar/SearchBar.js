//<!-- SearchBar component -->
import BaseComponent from "../BaseComponent.js";
import styles from "./SearchBar.css?inline";
//import {createIcons, search} from "lucide";
import {createElement, icons} from "lucide";


const toPascalCase = (value) => value.replace(/(^\w|[\s-_]\w)/g, (segment) => segment.replace(/^[\s-_]/, "").toUpperCase());

export default class SearchBar extends BaseComponent {
    constructor() {
        super();
        this.handleButtonClick = this.handleButtonClick.bind(this);
        //this.attachShadow({ mode: 'open' });
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
}

customElements.define('search-bar', SearchBar);
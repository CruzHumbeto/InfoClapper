// web component - header

import BaseComponent from "../BaseComponent.js";
import { createElement, icons } from "lucide";
import styles from "./Header.css?inline";

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
                
                <button id="button_search"><span>Buscar</span><i data-lucide="search"></i></button>
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
/*
    setUpListeners() {
        this.shadowRoot.querySelector("#select-id").addEventListener("change", (e) => {
            this.setState({ language: e.target.value });
        });
    }
*/
}

customElements.define("header-component", Header);


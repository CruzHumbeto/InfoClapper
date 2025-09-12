// web component - header

import BaseComponent from "../BaseComponent.js";
class Header extends BaseComponent {
    constructor() {
        super();
    }

    async render() {
        const cssUrl = new URL("./Header.css", import.meta.url);
        let css = "";
        try {
          const response = await fetch(cssUrl);
          css = response.ok ? await response.text() : "";
        } catch (_) { css = ""; }

        this.shadowRoot.innerHTML = `
            <style>
                ${css}
            </style>
            <header class="header">
                <h1 class="brand">🎬 Info Clapper</h1>
                <p>Buscador</p>
                <select name="idioma" id="select-id">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </header>
        `;
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


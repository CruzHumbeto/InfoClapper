// base component - parent class

import { createElement, icons } from "lucide";
import { toPascalCase } from "../utils/stringUtils.js";

export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.state = {}; // state management
    }

    // lifecycle methods
    connectedCallback() {
        this._update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.setState({ [name]: newValue });
        }
    }

    // setter and rendering for state management
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this._update();
    }

    _update() {
        const result = this.render();
        const finalize = () => {
            this.setUpListeners();
            this.afterRender();
        };
        result instanceof Promise ? result.then(finalize).catch(console.error) : finalize();
    }

    // override functions in child classes
    setUpListeners() {}
    cleanUp() {}
    afterRender() {}

    /**
     * Finds elements with data-lucide attribute and replaces them with SVG icons.
     */
    renderIcons() {
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

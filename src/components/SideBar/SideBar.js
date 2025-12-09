// <---- SideBar component ---->
import BaseComponent from "../BaseComponent.js";
import { createElement, icons } from "lucide";
import styles from "./SideBar.css?inline";

const toPascalCase = (value) => value.replace(/(^\w|[\s-_]\w)/g, (segment) => segment.replace(/^[\s-_]/, "").toUpperCase());


export class SideBar extends BaseComponent {
    constructor() {
        super();
        this._genres = [];
        //this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['language'];
    }
    
    get genres() {
        return this._genres;
    }

    set genres(value) {
        if (Array.isArray(value)) {
            this._genres = value;
            this.render(); // Re-render when data changes
            this.afterRender(); // Re-attach listeners/icons
        }
    }
    
    render(){
        this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <aside>
                <header>
                    <button class="toggle">
                        <i data-lucide="menu"></i>
                    </button>
                </header>
                <nav>
                    <ul>
                        <li>
                            <select name="language" id="select-id">
                                <option value="">
                                    <i data-lucide="languages"></i>
                                    Select Language
                                </option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                            </select>
                        </li>
                        <li>
                            <i data-lucide="home"></i><span>Home</span>
                        </li>
                        <li>
                            <i data-lucide="clock"></i><span>Recent</span>
                        </li>
                        <li>
                            <i data-lucide="heart"></i><span>Popular</span>
                        </li>
                        <li id="genre_list">
                            <div>
                                <i data-lucide="funnel"></i><span>Genres</span>
                            </div>
                            <div id="genre_container">
                                <div class="wrapper">
                                    <select name="genre" id="select-gen">
                                        <button>
                                            <selectedcontent></selectedcontent>
                                        </button>
                                        ${this._genres.map((genre) => `<option value="${genre.id}">${genre.name}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </aside>
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
}

customElements.define('side-bar', SideBar);

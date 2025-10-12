// <---- SideBar component ---->
import BaseComponent from "../BaseComponent.js";
import { createElement, icons } from "lucide";
import styles from "./SideBar.css?inline";

const toPascalCase = (value) => value.replace(/(^\w|[\s-_]\w)/g, (segment) => segment.replace(/^[\s-_]/, "").toUpperCase());


export class SideBar extends BaseComponent {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
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
                    <button class="close">
                        <i data-lucide="circle-x"></i>
                    </button>
                </header>
                <nav>
                    <ul>
                        <li>
                            <select name="idioma" id="select-id">
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
                        <li>
                            <i data-lucide="funnel"></i><span>Genres</span>
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

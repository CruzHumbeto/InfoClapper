// <---- SideBar component ---->
import BaseComponent from "../BaseComponent.js";
import styles from "./SideBar.css?inline";
import { context } from "../../utils/context.js";


export class SideBar extends BaseComponent {
    constructor() {
        super();
        this.state = {
            genres: [],
            language: ''
        };
    }

    static get observedAttributes() {
        return ['language'];
    }
    
    get genres() {
        return this.state.genres;
    }

    set genres(value) {
        if (Array.isArray(value)) {
            this.setState({ genres: value });
        }
    }

    setUpListeners(){
        const toggleBtn = this.shadowRoot.querySelector('.toggle');
        if(toggleBtn){
            toggleBtn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('toggle-sidebar', { 
                    bubbles: true,
                    composed: true }));
            });
        }

        const selectLanguage = this.shadowRoot.getElementById('select-id');
        if(selectLanguage){
            selectLanguage.addEventListener('change', () => {
                context.state.lang = selectLanguage.value;
                console.log('language: ', context.state.lang);
            });
        }

        const home = this.shadowRoot.getElementById('home');
        if(home){
            home.addEventListener('click', () => {
                location.hash = '#home';
            });
        }

        const recent = this.shadowRoot.getElementById('recent');
        if(recent){
            recent.addEventListener('click', () => {
                location.hash = '#recent';
            });
        }

        const popular = this.shadowRoot.getElementById('popular');
        if(popular){
            popular.addEventListener('click', () => {
                location.hash = '#popular';
            });
        }

        const genre_list = this.shadowRoot.getElementById('select-gen');
        if(genre_list){
            genre_list.addEventListener('change', () => {
                const [id, name] = genre_list.value.split(',');
                context.state.actualGenre = name;
                location.hash = `#genre=${id}`;
            });
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
                        <li id="home">
                            <i data-lucide="home"></i><span>Home</span>
                        </li>
                        <li id="recent">
                            <i data-lucide="clock"></i><span>Recent</span>
                        </li>
                        <li id="popular">
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
                                        ${this.state.genres.map((genre) => `<option value="${[genre.id, genre.name]}">${genre.name}</option>`).join('')}
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
        this.renderIcons();
    }
}

customElements.define('side-bar', SideBar);

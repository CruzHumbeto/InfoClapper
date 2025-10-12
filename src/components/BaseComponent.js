// base component - parent class

export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.state = {}; // state management
    }

    // lifecycle methods
    connectedCallback() {
        const result = this.render();
        const finalize = () => {
            this.setUpListeners();
            this.afterRender();
        };
        result instanceof Promise ? result.then(finalize).catch(console.error) : finalize();
    }

    // setter and rendering for state management
    setState(newState) {
        this.state = { ...this.state, ...newState };
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
}

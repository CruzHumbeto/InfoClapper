// base component - parent class

export default class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.state = {}; // state management
    }

    // lifecycle methods
    connectedCallback() {
        this.render(); // render the component
        this.setUpListeners(); // set up listeners
    }

    // setter and rendering for state management
    setState(newState) {
        this.state = {...this.state, ...newState}; 
        this.render();
    }

    // override functions in child classes
    setUpListeners() {}
    cleanUp() {}
}

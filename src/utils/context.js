// gobal state context

class AppContext extends EventTarget {
    constructor(){
        super();
        this.state = new Proxy(
            {
                lang: "en",
                actualScreen: "home",
                genres: [],
                actualGenre: "all",
                movies: [],
                popularMovies: [],
                searching: false,
                search: "",
            }, {
                set: (target, prop, value) => {
                    target[prop] = value;
                    this.dispatchEvent(new CustomEvent("stateChange", { detail: { prop, value } }));
                    return true;
                }
            });
    }
}

export const context = new AppContext();

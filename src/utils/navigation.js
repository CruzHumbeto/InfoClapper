// hash-based navigation

import { fetchGenres, fetchTrendingMovies, fetchMovieList, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies, fetchGenreMovies, fetchPopularGenreMovies } from "./api";
import { context } from "./context";

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    const routes = {
        '#home': () => homePage(),
        '#recent': () => recentPage(),
        '#popular': () => popularPage(),
        '#genre': () => genrePage()
    };
    const path = window.location.hash || '#home';
    
    // Find a route that is a prefix of the current path
    const routeKey = Object.keys(routes).find(key => path.startsWith(key));
    const route = routes[routeKey];

    if (route) {
        route();
    } else {
        homePage(); // Default fallback
    }
    // if hash change, scroll main element to top
    const main = document.querySelector('main');
    main.scrollTop = 0;   
}

async function homePage() {
    window.location.hash = '#home'
    context.state.actualScreen = 'home';
    context.state.searching = true;
    context.state.movies = await fetchMovieList();
    context.state.popularMovies = await fetchTrendingMovies();
    context.state.searching = false;
    console.log(window.location.hash);
}

async function recentPage() {
    context.state.actualScreen = 'recent';
    context.state.searching = true;
    context.state.movies = await fetchNowPlayingMovies();
    context.state.popularMovies = await fetchUpcomingMovies();
    context.state.searching = false;
    console.log(window.location.hash);
}

async function popularPage() {
    context.state.actualScreen = 'popular';
    context.state.searching = true;
    context.state.movies = await fetchTopRatedMovies();
    context.state.popularMovies = await fetchTrendingMovies();
    context.state.searching = false;
    console.log(window.location.hash);
}

async function genrePage() {
    const genreId = window.location.hash.split('=')[1];
    context.state.actualScreen = context.state.actualGenre;
    context.state.searching = true;
    context.state.movies = await fetchGenreMovies(genreId);
    context.state.popularMovies = await fetchPopularGenreMovies(genreId);
    context.state.searching = false;
    console.log(window.location.hash);
}
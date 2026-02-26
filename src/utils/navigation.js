// hash-based navigation

import { fetchGenres, fetchTrendingMovies, fetchMovieList, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "./api";
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
    const path = window.location.hash;
    const route = routes[path];
    if (route) {
        route();
    } //else routes['#home']();
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

function genrePage() {
    console.log(window.location.hash);
}
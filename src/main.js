import { API_KEY } from './secrets.js';
import './components/Header/Header.js';
import './components/MovieCard/card.js';

const main = document.querySelector("main");
const headerContainer = document.querySelector("header");
const header = document.createElement("header-component");
headerContainer.appendChild(header);
console.log("Hello Movies ");

// <---- fetch API information --->

/**
 * 
 * @returns an array of movies information objects
 */
async function fetch_trending_movie_week() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=" + API_KEY);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const movies = Array.isArray(data.results) ? data.results : [];
        return movies;
    } catch (err) {
        console.error('Error fetching trending movies:', err);
        return [];
    }
}

// reder cards
/**
 * 
 * @param {Array} info: an array of movies information objects 
 * @param {HTMLElement} placeholder: an HTML element where the cards will be rendered 
 * @returns 
 */
const renderCards = (info, placeholder) => {
    placeholder.innerHTML = "";
    if (!Array.isArray(info)) {
        console.error('renderCards expected an array, received:', info);
        return;
    }
    info.forEach(movie => {
        const movieCard = document.createElement("movie-card");
        movieCard.setAttribute("poster", `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
        movieCard.setAttribute("title", movie.title);
        movieCard.setAttribute("overview", movie.overview);
        placeholder.appendChild(movieCard);
    });
}

async function init() {
    const trendingWeekMovies = await fetch_trending_movie_week();
    console.log('Fetched movies:', trendingWeekMovies);
    renderCards(trendingWeekMovies, main);
}

init();

// show API information

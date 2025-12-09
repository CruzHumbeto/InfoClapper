import { API_KEY } from './secrets.js';
import './components/Header/Header.js';
import './components/MovieCard/card.js';
import './components/MovieDetails/MovieDetails.js';
import './components/SideBar/SideBar.js';
import './components/Slider/Slider.js';

const main = document.querySelector("main");
const headerContainer = document.querySelector("header");
const section_aside = document.getElementById("section_aside");


const header = document.createElement("header-component");
const slider = document.createElement("movie-slider");
const cardsContainer = document.createElement("section");
cardsContainer.id = "trending-cards";

headerContainer.appendChild(header);
main.appendChild(slider);
main.appendChild(cardsContainer);
console.log("Hello Movies ");

const side_bar = document.createElement("side-bar");
section_aside.appendChild(side_bar);

// <---- fetch API information --->

/**
 * fetch genres list from the API
 * @returns an array of genres information objects
 */
async function genre_list() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=es-MX&api_key=" + API_KEY);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const genres = Array.isArray(data.genres) ? data.genres : [];
        return genres;
    } catch (err) {
        console.error('Error fetching genres:', err);
        return [];
    }
}


/**
 * fetch trending movies list from the API
 * @returns an array of movies information objects
 */
async function fetch_trending_movie_week() {
    try {
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?language=es-MX&api_key=" + API_KEY);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const movies = Array.isArray(data.results) ? data.results : [];
        return movies;
    } catch (err) {
        console.error('Error fetching trending movies:', err);
        return [];
    }
}

/**
 * Fetch full movie details and credits by movie ID
 * @param {number|string} movieId
 * @returns {Promise<{details: any, credits: any} | null>}
 */
async function fetch_movie_full(movieId) {
    if (!movieId) return null;
    try {
        const base = 'https://api.themoviedb.org/3/movie/' + movieId;
        const [detailsRes, creditsRes] = await Promise.all([
            fetch(`${base}?language=es-MX&api_key=${API_KEY}`),
            fetch(`${base}/credits?language=es-MX&api_key=${API_KEY}`)
        ]);
        if (!detailsRes.ok) throw new Error(`Details HTTP ${detailsRes.status}`);
        if (!creditsRes.ok) throw new Error(`Credits HTTP ${creditsRes.status}`);
        const [details, credits] = await Promise.all([detailsRes.json(), creditsRes.json()]);
        return { details, credits };
    } catch (err) {
        console.error('Error fetching movie details/credits:', err);
        return null;
    }
}

/**
 * Create and show the MovieDetails modal for a given movie ID
 * @param {number|string} movieId
 */
async function openMovieDetails(movieId) {
    if (!movieId) return;
    // Close any existing modal
    document.querySelectorAll('movie-details').forEach(el => el.remove());

    const data = await fetch_movie_full(movieId);
    if (!data) return;

    const { details, credits } = data;
    const el = document.createElement('movie-details');

    // Map data to component props before attaching to DOM
    el.title = details?.title || details?.name || '...';
    el.poster = details?.poster_path ? `https://image.tmdb.org/t/p/w780${details.poster_path}` : '';
    el.overview = details?.overview || '';
    el.vote_average = details?.vote_average ?? '';
    el.release_date = details?.release_date || details?.first_air_date || '';
    el.original_language = details?.original_language || '';
    el.original_title = details?.original_title || details?.original_name || el.title;
    el.genres = Array.isArray(details?.genres) ? details.genres.map(g => g?.name || '').filter(Boolean) : [];
    el.production_companies = Array.isArray(details?.production_companies) ? details.production_companies : [];
    el.crew = Array.isArray(credits?.crew) ? credits.crew.slice(0, 12) : [];

    document.body.appendChild(el);
}

// render cards
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
        movieCard.style.cursor = 'pointer';
        movieCard.addEventListener('click', () => openMovieDetails(movie.id));
        placeholder.appendChild(movieCard);
    });
}

async function init() {
    const trendingWeekMovies = await fetch_trending_movie_week();
    console.log('Fetched movies:', trendingWeekMovies);
    renderCards(trendingWeekMovies, cardsContainer);

    const genres = await genre_list();
    side_bar.genres = genres;
}

init();

// show API information

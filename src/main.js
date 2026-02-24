import { context } from './utils/context.js';
import { fetchGenres, fetchTrendingMovies, fetchMovieFull } from './utils/api.js';
import './components/Header/Header.js';
import './components/MovieCard/Card.js';
import './components/MovieDetails/MovieDetails.js';
import './components/SideBar/SideBar.js';
import './components/Slider/Slider.js';
import './components/MovieList/MovieList.js';

const main = document.querySelector("main");
const headerContainer = document.querySelector("header");
const section_aside = document.getElementById("section_aside");


const header = document.createElement("header-component");
const slider = document.createElement("movie-slider");
//const cardsContainer = document.createElement("section");
const movieList = document.createElement("movie-list");


//cardsContainer.id = "trending-cards";

headerContainer.appendChild(header);
main.appendChild(slider);
//main.appendChild(cardsContainer);
main.appendChild(movieList);
slider.setAttribute("slot", "banner");

movieList.appendChild(slider);




console.log("Hello Movies ");

const side_bar = document.createElement("side-bar");
section_aside.appendChild(side_bar);



// <---- render elements ---->

/**
 * Create and show the MovieDetails modal for a given movie ID
 * @param {number|string} movieId
 */
async function openMovieDetails(movieId) {
    if (!movieId) return;
    // Close any existing modal
    document.querySelectorAll('movie-details').forEach(el => el.remove());

    const data = await fetchMovieFull(movieId);
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
 * Render movie cards in a container
 * @param {Array} info - an array of movies information objects 
 * @param {Array} placeholder - an array of HTML element and slot name where the cards will be rendered 
 * @param {string} variant - card variant type: 'default' | 'slider'
 */
const renderCards = (info, placeholder, variant = 'v1') => {
    if (!Array.isArray(info)) {
        console.error('renderCards expected an array, received:', info);
        return;
    }
    info.forEach(movie => {
        const movieCard = document.createElement("movie-card");
        // Solo variant usa setAttribute (es el único atributo observado)
        movieCard.setAttribute("variant", variant);
        // Propiedades asignadas directamente al elemento (como en MovieDetails)
        movieCard.poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
        movieCard.title = movie.title || "...";
        movieCard.overview = movie.overview || "";
        movieCard.vote_average = movie.vote_average ?? "";
        movieCard.release_date = movie.release_date || "";
        movieCard.style.cursor = 'pointer';
        movieCard.addEventListener('click', () => openMovieDetails(movie.id));
        movieCard.setAttribute("slot", placeholder[1]);
        placeholder[0].appendChild(movieCard);
    });
}

async function init() {
    // initialize context
    context.state.genres = await fetchGenres();
    context.state.movies = await fetchTrendingMovies();
    context.state.popularMovies = await fetchTrendingMovies();
    console.log(context.state.movies);
    console.log(context.state.genres);

    document.addEventListener('toggle-sidebar', () => {
        document.body.classList.toggle('sidebar-hidden');
    });
    const trendingWeekMovies = await fetchTrendingMovies();
    renderCards(context.state.movies, [movieList, 'movie_list'], 'v2');

    side_bar.genres = context.state.genres;
}

init();

// show API information

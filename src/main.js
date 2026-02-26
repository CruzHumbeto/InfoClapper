import { context } from './utils/context.js';
import { fetchGenres, fetchTrendingMovies, fetchMovieFull } from './utils/api.js';
import './components/Header/Header.js';
import './components/MovieCard/Card.js';
import './components/MovieDetails/MovieDetails.js';
import './components/SideBar/SideBar.js';
import './components/Slider/Slider.js';
import './components/MovieList/MovieList.js';


// <---- rendering functions ---->

/**
 * Create and show the MovieDetails modal for a given movie ID
 * @param {number|string} movieId
 */
async function openMovieDetails(movieId) {
    if (!movieId) return;
    // Close any existing modal
    document.querySelectorAll('movie-details').forEach(el => el.remove());

    const data = await fetchMovieFull(movieId);
    console.log(data);
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


async function init() {
    // <---- draw elements ---->
    const main = document.querySelector("main");
    const headerContainer = document.querySelector("header");
    const section_aside = document.getElementById("section_aside");

    const header = document.createElement("header-component");
    const slider = document.createElement("movie-slider");
    const movieList = document.createElement("movie-list");
    const side_bar = document.createElement("side-bar");

    headerContainer.appendChild(header);
    main.appendChild(slider);
    main.appendChild(movieList);
    slider.setAttribute("slot", "banner");
    section_aside.appendChild(side_bar);

    //movieList.appendChild(slider);
    
    // <---- initialize context ---->
    context.state.genres = await fetchGenres();
    context.state.movies = await fetchTrendingMovies();
    context.state.popularMovies = await fetchTrendingMovies();
    console.log(context.state.actualScreen);
    console.log(context.state.movies);
    console.log(context.state.popularMovies);
    //console.log(context.state.genres);

    document.addEventListener('toggle-sidebar', () => {
        document.body.classList.toggle('sidebar-hidden');
    });
    
    // Escuchar el evento emitido por las cards del MovieList
    document.addEventListener('open-movie-details', (e) => {
        openMovieDetails(e.detail.id);
    });

    side_bar.genres = context.state.genres;
}

init();

// show API information

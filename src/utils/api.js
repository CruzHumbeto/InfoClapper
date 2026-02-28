// api.js
// 

import { API_KEY } from "../secrets.js";

const BASE_URL = "https://api.themoviedb.org/3";

/**
 * fetch genres list from the API
 * @returns an array of genres information objects
 */
export async function fetchGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.genres) ? data.genres : [];
    } catch (err) {
        console.error('Error fetching genres:', err);
        return [];
    }
}

/**
 * fetch movies by genre from the API
 * @param {number|string} genreId
 * @returns an array of movies information objects
 */
export async function fetchGenreMovies(genreId) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error('Error fetching genre movies:', err);
        return [];
    }
}

export async function fetchPopularGenreMovies(genreId) {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?sort_by=vote_count.desc&with_genres=${genreId}&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error('Error fetching popular genre movies:', err);
        return [];
    }
}

/**
 * fetch movies currently in theaters list from the API
 * @returns an array of movies information objects
 */
export async function fetchNowPlayingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error('Error fetching now playing movies:', err);
        return [];
    }
}

/**
 * fetch top rated movies list from the API
 * @returns an array of movies information objects
 */
export async function fetchTopRatedMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error('Error fetching top rated movies:', err);
        return [];
    }
}

/**
 * fetch upcoming movies list from the API
 * @returns an array of movies information objects
 */
export async function fetchUpcomingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?language=en-US&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
    } catch (err) {
        console.error('Error fetching upcoming movies:', err);
        return [];
    }
}

/**
 * fetch movie list from the API
 * @returns an array of movies information objects
 */
export async function fetchMovieList() {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (err) {
    console.error('Error fetching movie list:', err);
    return [];
  }
}

/**
 * fetch trending movies list from the API
 * @returns an array of movies information objects
 */
export async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?language=es-MX&api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.results) ? data.results : [];
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
export async function fetchMovieFull(movieId) {
    if (!movieId) return null;
    try {
        const base = `${BASE_URL}/movie/${movieId}`;
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
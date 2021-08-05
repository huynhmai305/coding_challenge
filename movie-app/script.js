const API_KEY = "04c35731a5ee918f014970082a0088b1";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const searchInput = document.getElementById("search");

const getClassByVote = (vote) => {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
};

const getMovies = async (url) => {
  const api = await fetch(url);
  const movies = await api.json();

  if (movies.results.length > 0) {
    showMovies(movies);
  } else {
    main.innerHTML = "<p>Not found</p>";
  }
};

const showMovies = (movies) => {
  // clear content
  main.innerHTML = "";

  movies.results.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}"
        alt="${movie.title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByVote(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieEl);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = searchInput.value;

  if (searchText) {
    getMovies(SEARCH_API + searchText);
    searchInput.value = "";
  }
});

getMovies(API_URL);

const API_KEY = "b4625aa857e541f2443bb18d71ff288e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");

const movieModal = document.getElementById("movieModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalOverview = document.getElementById("modalOverview");
const modalClose = document.getElementById("modalClose");

async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("영화를 가져오는 중 오류 발생", error);
  }
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  if (movies.length === 0) {
    movieList.innerHTML = "<p>검색결과가 없습니다.</p>";
    return;
  }
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>평점: ${movie.vote_average}</p>
    `;
    movieCard.addEventListener("click", () => openModal(movie));
    movieList.appendChild(movieCard);
  });
}

async function searchMovies(query) {
  const SEARCH_API_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`;
  try {
    const response = await fetch(SEARCH_API_URL);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error searching movies:", error);
  }
}

function openModal(movie) {
  modalImage.src = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  modalTitle.textContent = movie.title;
  modalOverview.textContent = movie.overview || "설명이 없습니다.";
  movieModal.classList.add("active");
}

modalClose.addEventListener("click", () => {
  movieModal.classList.remove("active");
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      searchMovies(query);
    }
  }
});

fetchMovies();

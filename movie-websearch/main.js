// Titles: http://www.omdbapi.com/?s=avenger&page=2&apikey=57b04f70
// details: http://www.omdbapi.com/?i=tt3896198&apikey=57b04f70

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

let moviePoster;

// load movies from API
async function loadMovies(SearchTerm) {
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=2&apikey=57b04f70`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response === 'True') displayMovieList(data.Search);
}

function findMovies() {
  const searchTerm = (movieSearchBox.value).trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');
    loadMovies(searchTerm);
  } else {
    searchList.classList.add('hide-search-list');
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = '';
  for (let idx = 0; idx < movies.length; idx++) {
    const movieListItem = document.createElement('div');
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add('search-list-item');
    if (movies[idx].poster !== 'N/A') { moviePoster = movies[idx].Poster; } else { moviePoster = 'image_not_found.png'; }
    movieListItem.innerHTML = `<div class="search-item-thumbnail"> <img src="${moviePoster}"> </div> <div class="search-item-info"> <h3>${movies[idx].Title}</h3> <p>${movies[idx].Year}</p> </div>`;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search-list-item');
  searchListMovies.forEach((movie) => {
    movie.addEventListener('click', async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add('hide-search-list');
      movieSearchBox.value = '';
      const result = await fetch(`https://omdbapi.com/?s=${movie.dataset.id}&apikey=fc1fef96`);
      const MovieDetails = await result.json();
      // console.log(MovieDetails);
      displayMovieDetails(MovieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class="movie-poster"> <img src="${(details.Poster !== 'N/A') ? details.Poster : 'image_note_found.png'}" alt="movie-poster">  </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
        <li class="year">Year: ${details.Year}</li>
        <li class="rated">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Realsed}</li>
        </ul>
        <p class="genre"><b>Genre:</b>${details.Genre}</p>
        <p class="writer"><b>Writer:</b>${details.Writer}</p>
        <p class="actors"><b>Actors:</b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i> ${details.Awards}</b></p>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', function () {

  var watchlist = JSON.parse(localStorage.getItem('watchlist'))

  function renderWatchlist (watchlistArray) {
    return watchlistArray.map(makeMovieCard).join('')
  }

  function makeMovieCard (currentMovie) {
    return `
    <div class="movie">
      <img class="movie-poster" src="${currentMovie.Poster}" />
      <div class="movie-info">
        <div class="top-row">
          <div class="movie-title">${currentMovie.Title}</div>
          <div class="movie-release-date">${currentMovie.Year}</div>
        </div>
        <button class="btn btn-primary" type="button" onclick="saveToWatchlist('${currentMovie.imdbID}')">Add</button>
      </div>
    </div>
    `
  }

  document.getElementById('movies-container').innerHTML = renderWatchlist(watchlist)

})

document.addEventListener('DOMContentLoaded', function() {

  function renderMovies (movieArray) {
    return movieArray.map(makeMovieCard).join('')
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


  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var searchString = document.getElementById('search-bar').value

    var urlEncodedSearchString = encodeURIComponent(searchString)

    axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString)
      .then(function (response) {
        movieData = response.data.Search
        document.getElementById('movies-container').innerHTML = renderMovies(response.data.Search)
      })
  })

})

function saveToWatchlist (imdbID) {
  var movie = movieData.find(function (currentMovie) {
    return currentMovie.imdbID === imdbID
  })
  var watchlistJSON = localStorage.getItem('watchlist')
  var watchlist = JSON.parse(watchlistJSON)
  if (watchlist === null) {
    watchlist = []
  }
  watchlist.push(movie)
  watchlistJSON = JSON.stringify(watchlist)
  localStorage.setItem('watchlist', watchlistJSON)
}

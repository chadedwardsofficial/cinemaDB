// Declared variables//
var moviedbAPIkey = "ca2300a8fc07bd59f63e90f09c86ebb0";
var youtubeAPIkey = "AIzaSyCcZRBi5jPVXYgEXJiuQVqYqqTcTR3pm2Y";
var userInput = $("#input_text");
var searchBtn = $("#searchBtn");
var popularBtn = $('#popularBtn');
var recentMoviesBtn =$('#recentMoviesBtn');
// This const variable is for the authentication for the api key, it is passed at the end of the fetch url after a comma, this is a cleaner way of using our api key with parameters//
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTIzMDBhOGZjMDdiZDU5ZjYzZTkwZjA5Yzg2ZWJiMCIsInN1YiI6IjY1MmRkNDczYTgwMjM2MDBhYjNmZmE0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F9sfg8eucxyyLQbigRXYnKSV97-kHFE2sR7m0xWNDo",
  },
};

// Event Listeners //

searchBtn.on("click", function (event) {
  event.preventDefault();
  getMoviedata(userInput.val());
  console.log(userInput.val());
});

popularBtn.on("click", function (event) {
  event.preventDefault();
  getPopularMovies();
});


recentMoviesBtn.on("click", function (event) {
  event.preventDefault();
  getRecentMovies();
});





//Functions//



// This Function searches for movies with names based on the keywords submitted in the userInput//
function getMoviedata(keyword) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=1&include_adult=false&sort_by=popularity.desc`,
    options
  ) //This Fetch Url searches for Data from the api with the parameters of 1st page, Include Keyword, and sort by popularity in descending order//
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}



// This Function searches for most popular movies currently, yielding 20 results per page //

function getPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&per_page=20`,
    options
  ) 
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}




// This function searches for the most recent movies, yielding 20 results per page //

function getRecentMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&per_page=20`,
    options
  ) 
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
// Declared variables//
var moviedbAPIkey = "ca2300a8fc07bd59f63e90f09c86ebb0";
var youtubeAPIkey = "AIzaSyCcZRBi5jPVXYgEXJiuQVqYqqTcTR3pm2Y";
var userInput = $("#input_text");
var searchBtn = $("#searchBtn");
var popularBtn = $("#popularBtn");
var recentBtn = $("#recentBtn");
var cardContainer = $(".cardContainer");
var favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
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
  getMoviedata(userInput.val()); // This takes what the user types in the input field, and passes it as an argument for the getMovieData Function //
  console.log(userInput.val());
});
popularBtn.on("click", function (event) {
  event.preventDefault();
  getPopularMovies();
});
recentBtn.on("click", function (event) {
  event.preventDefault();
  getRecentMovies();
});
cardContainer.on("click", ".movieLink", function (event) {
  // This on click function is designed for when you click the dynamically created button, it targets the specific parent card it is within and then runs the youtubeLink function and passes the movieTitle argument//
  event.preventDefault();
  console.log(event.target);
  var myBtn = $(event.target);
  var movieTitle = myBtn.data("title") + " trailer";
  console.log(movieTitle);
  youtubeLink(movieTitle);
});
$(".myFavoritesBtn").on("click", function (event) {
  event.preventDefault();
  getFavoriteMovies();
});
cardContainer.on("click", ".favoriteBtn", function (event) {
  // This function takes the specific information within the parent card once you click the button and stores it in a variable which is then stored to local storage for later use//
  event.preventDefault();
  const card = $(this).closest(".card");
  const movieInfo = {
    title: card.find("span").eq(0).text(),
    releaseDate: card.find("span").eq(1).text(),
    posterPath: card.find("img").attr("src"),
  };
  saveToLocalStorage(movieInfo);
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
      cardContainer.empty(); // Clears existing Container of any cards//
      //A For Loop to go through the API results and dynamically create cards on the webpage with Titles and Images and Buttons//
      for (i = 0; i < 19; i++) {
        if (data.results[i].poster_path) {
          cardContainer.append(`  <div class="row">
          <div class="card">
            <div class="card-content">
            <button class="movieLink" data-title="${data.results[i].original_title}">FontAwesomeIcon</button>
              <h5>Title: </h5><span>${data.results[i].original_title}</span>
              <h5>Release Date: </h5><span>${data.results[i].release_date}</span>
              <button class="favoriteBtn"><i class="fa-solid fa-heart fa-beat" style="color: #ff0000;"></i></button>
            </div>
            <div class="card-image">
            <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}">
          </div>
          </div>
        </div>
        `);
        }
      }
    });
}
// This Function searches for most popular movies currently, yielding results per page //
function getPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&per_page=10`,
    options
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cardContainer.empty();
      for (i = 0; i < 19; i++) {
        if (data.results[i].poster_path) {
          //This if statement checks if the movie data has a poster img, it will publish the content on the page, this way we do not have cards with broken img icons//
          cardContainer.append(`  <div class="row">
        <div class="card">
          <div class="card-content">
          <button class="movieLink" data-title="${data.results[i].original_title}">FontAwesomeIcon</button>
            <h5>Title: </h5><span>${data.results[i].original_title}</span>
            <h5>Release Date: </h5><span>${data.results[i].release_date}</span>
            <button class="favoriteBtn">Favorite</button>
          </div>
          <div class="card-image">
          <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}">
        </div>
        </div>
      </div>
      `);
        }
      }
    });
}
// This function searches for the most recent movies, yielding results per page //
function getRecentMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&per_page=10`,
    options
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cardContainer.empty();
      for (i = 0; i < 18; i++) {
        if (data.results[i].poster_path) {
          //This if statement checks if the movie data has a poster img, it will publish the content on the page, this way we do not have cards with broken img icons//
          cardContainer.append(`  <div class="row">
          <div class="card">
            <div class="card-content">
            <button class="movieLink" data-title="${data.results[i].original_title}"></button>
              <h5>Title: </h5><span>${data.results[i].original_title}</span>
              <h5>Release Date: </h5><span>${data.results[i].release_date}</span>
              <button class="favoriteBtn"><i class="fa-solid fa-heart fa-beat" style="color: #ff0000;"></i></button>
              <button class="PLACEHOLDER"><i class="fa-brands fa-youtube" style="color: #ff0000;"></i></button>
            </div>
            <div class="card-image">
            <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}">
          </div>
          </div>
        </div>
        `);
        }
      }
    });
}
//This Function fetches data from Youtube's API with parameters of their trailer //
function getYoutubedata(query) {
  const apiKey = "AIzaSyCcZRBi5jPVXYgEXJiuQVqYqqTcTR3pm2Y"; // Replace with your YouTube API key
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&order=relevance&key=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the data here
      console.log(data);
      const videoId = data.items[0].id.videoId; // This line of code searches through the data to find the video's ID (this tells us the specific ID of the video to add to the url)//
      const videoTitle = data.items[0].snippet.title; // This line searches through the data to find the video's Title//
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // Declaring a variable with a blanket youtube url and then adding the videoID to the end to give it's specific ID//
      console.log(`The most popular trailer for ${query} is: ${videoTitle}`);
      console.log(`You can watch it here: ${videoUrl}`);
    })
    .catch((error) => console.error("Error:", error));
}
function openYoutube() {
  window.open(`youtube.com/${data.resultsPLACEHOLDER}`, "_blank");
}
// This function calls the Local Storage data of each card and appends it to the page//
function getFavoriteMovies() {
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  cardContainer.empty();
  for (const movie of favoriteMovies) {
    cardContainer.append(`
      <div class="row">
        <div class="card">
          <div class="card-content">
            <h5>Title: </h5><span>${movie.title}</span>
            <h5>Release Date: </h5><span>${movie.releaseDate}</span>
          </div>
          <div class="card-image">
            <img src="${movie.posterPath}">
          </div>
        </div>
      </div>
    `);
  }
}
function saveToLocalStorage(movie) {
  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  favoriteMovies.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
}









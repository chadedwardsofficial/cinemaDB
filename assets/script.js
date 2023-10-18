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
  getYoutubedata(userInput.val());
  console.log(userInput.val());
});

popularBtn.on("click", function (event) {
  event.preventDefault();
  getPopularMovies();
  getYoutubedata();
});


recentMoviesBtn.on("click", function (event) {
  event.preventDefault();
  getRecentMovies();
  getYoutubedata();
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




// This Function fetches data from Youtube's API with parameters of their trailer //

// function getYoutubedata(query) {
//   const apiKey = 'AIzaSyCcZRBi5jPVXYgEXJiuQVqYqqTcTR3pm2Y'; // Replace with your YouTube API key

//   // Commonly used keywords for movie trailers
//   const trailerKeywords = ['official trailer', 'teaser trailer', 'trailer'];

//   // Combine the main query with trailer keywords
//   const combinedQuery = `${query} ${trailerKeywords.join(' OR ')}`;

//   const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${combinedQuery}&videoCategoryId=44&order=viewCount&key=${apiKey}`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       // Handle the data here
//       console.log(data);
//       const videoId = data.items[0].id.videoId;
//       const videoTitle = data.items[0].snippet.title;
//       const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//       console.log(`The most popular trailer for ${query} is: ${videoTitle}`);
//       console.log(`You can watch it here: ${videoUrl}`);
//     })
//     .catch(error => console.error('Error:', error));
// }



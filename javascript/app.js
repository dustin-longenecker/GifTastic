var topics = ["Tiger", "Wolf", "Dog", "Rabbit"];
var favorites = [];
var responses = [];
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayTopicInfo() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=pg&limit=10&q=" + topic;

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

//     // YOUR CODE GOES HERE!!!
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {
      // Only taking action if the photo has an appropriate rating
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div with the class "item"
        responses.push(results[i]);
        var gifDiv = $("<li class='item'>");
        // Storing the result item's rating
        var rating = results[i].rating;
        var title = results[i].title;
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);
        var t = $("<p>").text("Title: " + title);
        var b = $("<button>").text("Add Favorite");
        b.addClass("favorite");
        b.attr("data-id", results[i].id)
        // Creating an image tag
        var personImage = $("<img>");
        personImage.addClass("gif");
        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-state", "still");

        $("#topics-view").prepend(gifDiv);
        //
        // // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(personImage);
        gifDiv.append(t);
        gifDiv.append(p);
        gifDiv.append(b);
        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      }
    }
//     // $("#animals-view").append("<p>Runtime: " + response.Runtime + "</p>");
//     // $("#animals-view").append("<p>Released: " + response.Released + "</p>");
//     // $("#animals-view").append("<p>Plot: " + response.Plot  + "</p>");
//     // $("#animals-view").append("<img src='" + response.Poster + "'>");
    console.log(response);
  });
}

// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("topic");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
    $("#topic-input").val('')
  }
}
function animateGif() {
  var state = $(this).attr("data-state");
  if(state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else if(state === "animate"){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
function addTopic(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val().trim();
  // The movie from the textbox is then added to our array
  topics.push(topic);
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
}


// This function handles events where the add movie button is clicked
//add animal on click "add animal"
$("#add-topic").on("click", addTopic);
$(document).on("click", ".favorite", function(){
  $("#favorites-view").empty();

  var that = $(this).attr("data-id");
  console.log(responses);
  var ind = responses.indexOf(that, 0);
  console.log(ind);
  var ths = responses.slice(ind);
  console.log(ths[0]);
  favorites.push(ths[0]);

  for (var i = 0; i < favorites.length; i++) {
    var gifDiv = $("<li class='item'>");
    $("#favorites-view").prepend(gifDiv);
    var personImage = $("<img>");
    personImage.addClass("gif");
    // Giving the image tag an src attribute of a proprty pulled off the
    // result item
    personImage.attr("src", favorites[i].images.fixed_height_still.url);
    gifDiv.append(personImage);
  }
  console.log(favorites);
});
//gif still vs animate click function
$(document).on("click", ".gif", animateGif);
// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".topic", displayTopicInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();

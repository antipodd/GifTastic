$(document).ready(function() {
	//title lettering perhaps

  /*$(function() {
        $("h1").lettering();
    });*/

// Initial array of movies
      var pokemon = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"];
      
      // Function for displaying movie data
      function renderButtons() {

        // YOUR CODE GOES HERE
        $("#poke-view").empty();
        for (var i = 0; i < pokemon.length; i++) {
        var button = $("<button>");
        button.addClass("pokemon");
        button.attr("pokemon", pokemon[i]);
        console.log(pokemon[i]);
        button.text(pokemon[i]);
        $("#poke-view").append(button.text(pokemon[i]));
        }
      }

      // This function handles events where one button is clicked
      $("#add-pokemon").on("click", function() {
        event.preventDefault();

        // Here we grab the text from the input box
        var poke = $("#poke-input").val().trim();
        pokemon.push(poke);

        renderButtons();
      });

      $("#poke-view").on("click", ".pokemon", function() {
      	$(".poke-show").empty();
      	console.log($(this).attr("pokemon"));

      	var monster = $(this).attr("pokemon");
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + monster + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
      	$.ajax({
      		url: queryURL,
      		method: "GET"
    		}).done(function(response) {
      	  console.log(response);
      	  var results = response.data; //response.data is an array
    	    console.log(results.length);
    	    for (var i = 0; i < results.length; i++) {
    		
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var pokeImage = $("<img>");
            pokeImage.attr("data-still", results[i].images.fixed_height_still.url);
            pokeImage.attr("src", pokeImage.attr("data-still"));
            pokeImage.attr("data-state", "still");
            pokeImage.attr("data-animate", results[i].images.fixed_height.url);
          //console.log(pokeImage.attr("animate"));
       
            var pokeDiv = $("<div>");
    		    pokeImage.addClass("gif");
            $(".poke-show").append(p);
    		  //$("#poke-show").append("<img src=" + response.data[i].images.fixed_height.url + ">");
            $(".poke-show").append(pokeImage);
    	    }
        });




    }); //end click pokemon button

      $(".poke-show").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        //console.log(state);
        console.log("image clicked");
        console.log($(this).attr("data-state")); 
        console.log($(this).attr("data-animate")); 
        console.log($(this).attr("data-still")); 
        if ($(this).attr("data-state") === "still") {
          //console.log("trying to animate");
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        } 
        //clickImage();
      });

      function clickImage() {
        console.log("image clicked");
        var state = $(this).attr("data-state");
        console.log(state);
        console.log("image clicked");
        console.log($(this).attr("data-state")); 
        console.log($(this).attr("data-animate")); 
        console.log($(this).attr("data-still")); 
        if ($(this).attr("data-state") === "still") {
          //console.log("trying to animate");
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        } 
      }
      

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();
});
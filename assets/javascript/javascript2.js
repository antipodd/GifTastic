$(document).ready(function() {
	//title lettering perhaps

  /*$(function() {
        $("h1").lettering();
    });*/

// Initial array of movies
      var pokemon = ["bulbasaur", "charmander", "squirtle", "pikachu"];
      
      // Function for  movie data
      function renderButtons() {

        // YOUR CODE GOES HERE
        $("#poke-view").empty();
        for (var i = 0; i < pokemon.length; i++) {
          var button = $("<button>");
          var pokeThumb = $("<img data-pkmn='"+pokemon[i]+"'>");
          button.addClass("pokemon");
          button.attr("pokemon", pokemon[i]);
          button.html("<p>" + pokemon[i] + "!</p>");
          button.prepend(pokeThumb);
          $("#poke-view").append(button);
          //console.log(pokemon[i]);
          
          //tried to access pokemon sprites from pokemon api - I wanted to add an image of the pokemon to the button, it works but very slow - would need to download all images for idea to work
          var queryURL = "http://pokeapi.co/api/v2/pokemon/" + pokemon[i].toLowerCase();
          $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            console.log(response);
            console.log(response.name);

            $('img[data-pkmn='+response.name+']').attr("src", response.sprites.front_default);
           
          }).error(function(error) {
            
          });



        }
      }

      // This function handles events where one button is clicked
      $("#add-pokemon").on("click", function() {
        event.preventDefault();

        // Here we grab the text from the input box
        var poke = $("#poke-input").val().trim();
        //console.log(poke.length);
        if (poke.length > 0) {
        pokemon.push(poke);

        renderButtons();
        } else {
          alert("Input field is empty");
        }
        $("#poke-input").val(""); //empty form on submit
      });

      $("#poke-view").on("click", ".pokemon", function() {
      	$(".poke-show").empty();
      	//console.log($(this).attr("pokemon"));

      	var monster = $(this).attr("pokemon");
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + monster + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
      	$.ajax({
      		url: queryURL,
      		method: "GET"
    		}).done(function(response) {
      	  //console.log(response);
      	  var results = response.data; //response.data is an array
    	    //console.log(results.length);
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
            pokeDiv.addClass("display-div")
    		    pokeImage.addClass("gif");
            $(pokeDiv).append(p).append(pokeImage);

    		  //$("#poke-show").append("<img src=" + response.data[i].images.fixed_height.url + ">");
            $(".poke-show").append(pokeDiv);
    	    }
        });




    }); //end click pokemon button

      $(".poke-show").on("click", ".gif", function() {
        /*var state = $(this).attr("data-state");
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
        } */
        clickImage.call(this); //sets this to the gif that is clicked (Thanks Brian!)
      });



      
      function clickImage() { //function defined on global scope - this would refer to window not clicked gif without using the .call() method
        //console.log(this); // expecting this to be the clicked button
        //console.log("image clicked");
        var state = $(this).attr("data-state");
       // console.log(state);
        //console.log("image clicked");
        //console.log($(this).attr("data-state")); 
        //console.log($(this).attr("data-animate")); 
        //console.log($(this).attr("data-still")); 
        if ($(this).attr("data-state") === "still") {
          //console.log("trying to animate");
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        } 
      }
      

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();
});
// loads buttons upon entering page
$(function() {
    renderButtons(topics, "searchButton", "#buttonsHere");
})

var topics = ["Nirvana", "Twentyone Pilots", "Green Day", "AJR", "J. Cole", "Childish Gambino", "Beethoven"];

// api key = 879kESD12sMrwPDaZy61FAMqMPASoXWJ
// making buttons out of array var
function renderButtons(topics, classToAdd, areaToAddTo) {
  $("#buttonsHere").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", topics[i]);
      a.text(topics[i]);
      $(areaToAddTo).append(a);
  }

}

// pulling from api and creating gifs from topics array list upon clicking
$(document).on("click", ".searchButton", function() {
    $("#giphysHere").empty();
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=879kESD12sMrwPDaZy61FAMqMPASoXWJ&limit=10";
    
    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            for(var i = 0; i < response.data.length; i++){
                // saving data from ajax pull
                var searchDiv = $("<div class='search-item'>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-state", "still");
                image.addClass("searchImage");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#giphysHere").append(searchDiv);

            }
        })
})


// making the animation and stopping possible from clicks
$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    }   else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

// adding in new buttons from text box input
$("#addGroup").on("click", function(){
    var newSearch = $("input").eq(0).val();
    topics.push(newSearch);
    renderButtons(topics, "searchButton", "#buttonsHere");
    // keeps submit button from reloading page
    return false;
})



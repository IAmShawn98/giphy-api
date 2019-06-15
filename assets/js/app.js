$(document).ready(function () {
    // My innermost thoughts.
    var topics = [
        "computers",
        "coding",
        "videogames",
        "dogs",
        "youtube",
        "food",
        "applebees",
        "music",
    ];

    // This loop prepends a button for each string in the 'topics' array.
    for (var i = 0; i < topics.length; i++) {
        // Create a button.
        var btn = $("<button>" + topics[i] + "</button>");

        // btn attributes.
        btn.attr("class", "btn btn-primary m-2 btnTopic");
        btn.attr("data-topic", topics[i]);

        // Populate Buttons.
        $("#btnDisplay").prepend(btn);
    }

    // When the user submits a new button, built it out.
    $("#btnNewThought").on('click', function () {
        // Grab the value of the input so we can create a custom button.
        var userDefinedGifs = document.getElementById("userDefinedGifs").value;

        // Create a button.
        var userBtn = $("<button>" + userDefinedGifs + "</button>");

        // btn attributes.
        userBtn.attr("class", "btn btn-warning m-2 btnTopic bounceIn");
        userBtn.attr("data-topic", userDefinedGifs);

        // Populate Buttons.
        $("#btnDisplay").prepend(userBtn);
    });

    // This function makes a request to the giphy API to grab images based on the dynamic button topics.
    function apiRequestGifs() {
        // Remove pre-population message.
        $("#prePopulationMessage").hide();

        // Grab data from the 'data-topic' button attribute so we can use it in our query.
        var dataTopic = $(this).attr("data-topic");

        // The URL we want to request from GIPHY.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataTopic + "&api_key=icyGNe9304U63z9nyeNrf6m75D7Wf2yP&limit=21";

        // Request API Data.
        $.ajax({
            url: queryURL,
            type: "GET",
            success: function (response) {
                // Log response data object so we can read it's values from the console.
                console.log(response);

                // Stores the object in this variable.
                var results = response.data;

                // Loop through the repsonse object and get all of our images.
                for (var i = 0; i < results.length; i++) {

                    // Stores the 'STILL' images.
                    var imageStill = results[i].images.fixed_height_small_still.url;

                    // Stores the 'ANIMATED' images.
                    var imageAnimated = results[i].images.fixed_width_small.url;

                    // Create image element.
                    var img = $("<img height='150' width='150'>");

                    // Image Attributes.
                    img.attr("src", imageStill);
                    img.attr("class", "gif")
                    img.attr("alt", "Image");
                    img.attr("style", "cursor: pointer; padding: 5px;");
                    img.attr("data-still", imageStill);
                    img.attr("data-animate", imageAnimated);

                    // When a user clicks on a gif, animate it.
                    img.on('click', function () {
                        // Define our data state.
                        var dataState = $(this).attr("data-state");
                        // If the image is still, animate it.
                        if (dataState === "still") {
                            // Animated dataState.
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            // Still dataState.
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                    // Populate image.
                    $("#thoughtPopulation").prepend(img);
                }
            }
        })
    }

    // When the user clicks on any of the buttons from the topic array, display gifs from that topic.
    $(document).on("click", ".btnTopic", apiRequestGifs);
});

$(document).ready(function () {
    // The URL we want to request from GIPHY.
    var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=icyGNe9304U63z9nyeNrf6m75D7Wf2yP&tag= " + topics + "";

    // My innermost thoughts.
    var topics = [
        "computers",
        "coding",
        "videogames",
        "dogs",
        "youtube",
        "food",
        "applebees",
        "drinks",
        "whiskysour",
        "music",
    ];

    // This loop appends a button for each string in the 'topics' array.
    for (var i = 0; i < topics.length; i++) {
        // Create a button.
        var btn = $("<input>");

        // btn attributes.
        btn.attr("type", "button");
        btn.attr("class", "btn btn-primary m-2 btnTopic");
        btn.attr("value", topics[i]);

        // Populate Buttons.
        $("#btnDisplay").prepend(btn);
    }

    // When the user clicks on a button, populate the topic to 'thoughtPopulation'.
    $(".btnTopic").on("click", function () {
        // Request API Data.
        $.ajax({
            url: queryURL,
            type: "GET",
            success: function (response) {
                console.log(response);

                // Store gifs in this variable.
                var imageURL = response.data.fixed_width_small_still_url;

                // Create image element.
                var img = $("<img height='150' width='150'>");

                // Image Attributes.
                img.attr("src", imageURL);
                img.attr("alt", "Image");
                img.attr("style", "padding: 5px;")

                // Populate image.
                $("#thoughtPopulation").prepend(img);
            }
        })
    })
});
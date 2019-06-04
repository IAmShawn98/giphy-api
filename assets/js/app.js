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

    // When the user clicks on a button, populate the topic to 'thoughtPopulation'.
    $(".btnTopic").on("click", function () {
        // The URL we want to request from GIPHY.
        var dataTopic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dataTopic + "&api_key=icyGNe9304U63z9nyeNrf6m75D7Wf2yP";
        
        // Request API Data.
        $.ajax({
            url: queryURL,
            type: "GET"
        }).then(function (response) {
            console.log(response.data);
            var results = response.data[0].images;

            // Store gifs in this variable.
            var imageURL = results.downsized_still.url;

            // Create image element.
            var img = $("<img height='150' width='150'>");

            // Image Attributes.
            img.attr("src", imageURL);
            img.attr("alt", "Image");
            img.attr("style", "padding: 5px;")

            // Populate image.
            $("#thoughtPopulation").prepend(img);
        })
    })
});
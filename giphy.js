$(document).ready(function () {

    const animals = ["cat", "dog", "horse"];

    function makeButtons() {
        $("#buttons").empty();

        for (let i = 0; i < animals.length; i++) {
            let a = $("<button>");
            a.addClass("animal-button");
            a.attr("data-type", animals[i]);
            a.text(animals[i]);
            $("#buttons").append(a)

        }

    };
    makeButtons();

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        let newAnimal = $("#animal-input").val().trim();

        animals.push(newAnimal);
        makeButtons();
    });

    $(document).on("click", ".animal-button", function () {
        var searchAnimal = $(this).attr("data-type");
        console.log(searchAnimal);

        var queryURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            searchAnimal +
            "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let result = response.data;
            console.log(response.data)

            for (let i = 0; i < result.length; i++) {

                let gifDiv = $("<div>")
                let rating = result[i].rating;
                let animated = result[i].images.fixed_height.url;
                let still = result[i].images.fixed_height_still.url;

                let p = $("<p>").text("Rating: " + rating);
                let animalGif = $("<img>");

                animalGif.attr("src", still);
                animalGif.attr("data-still", still);
                animalGif.attr("data-animate", animated);
                animalGif.attr("data-state", "still");
                animalGif.addClass("gifClick");


                gifDiv.append(p);
                gifDiv.append(animalGif);

                $("#giphy").append(gifDiv)



            }


        });



    });

    $(document).on("click", ".gifClick", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        
    });


});

$(document).ready(function() {
    renderDom();
    addAnimalButton();
    addGifs();
    startOrPauseGifs();
});

var topics = [
    "Dogs", "Cats", "Dolphins", "Squirrels", "Groundhogs", "Monkeys"
];

function renderDom() {
    var container = $('<div>').addClass('container');
    $('body').append(container);
    container.append($('<div>').attr('id', 'buttonArea'));
    addButtons();
    addAnimalAdderForm();
    container.append($('<div>').attr('id', 'gifArea'));
}

function addButtons() {
    $('#buttonArea').empty();
    for (var i = 0; i < topics.length; i++) {
        $('#buttonArea').append(
            $('<button>').addClass('btn btn-dark animal-button')
            .attr('data-topic', topics[i])
            .text(topics[i])
        );
    }
}

function addAnimalAdderForm() {
    var animalAdder = $('<form>');
    animalAdder.append($('<label>').attr('for', 'addAnimal').text('Add a new Animal:'))
        .append(
            $('<input>').addClass('form-control')
            .attr('type', 'text')
            .attr('id', 'addAnimal')
        )
        .append($('<button>').addClass('btn btn-info add-Animal').text('Add'));
    $('.container').append(animalAdder);
}

function addAnimalButton() {
    $('.add-animal').on('click', function() {
        topics.push($('#addanimal').val().trim());
        addButtons();
        $('#addanimal').val('');
        return false;
    });
}

function addGifs() {
    $(document).on('click', '.animal-button', function() {
        var search = $(this).data('topic').replace(' ', '+');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
            search + '&limit=10&api_key=x3GfovTF6kwrsHyHpqk0UXzFJO24Mm0R';
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            $('#gifArea').empty();
            for (var i = 0; i < response.data.length; i++) {
                $('#gifArea').append(
                    $('<div>').addClass('pull-left').html(addImage(response, i))
                    .append($('<p>').text('rating: ' + response.data[i].rating))
                );
            }
        });
    });
}

function addImage(response, i) {
    var image_url = response.data[i].images.fixed_height.url;
    return $('<img>').attr('src', image_url.replace('.gif', '_s.gif'))
        .attr('data-still', image_url.replace('.gif', '_s.gif'))
        .attr('data-animate', image_url)
        .attr('data-state', 'still');
}

function startOrPauseGifs() {
    $(document).on('click', 'img', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
}
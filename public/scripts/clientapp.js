var randomName;
var randomAnimal;

$(document).ready(function() {
    $('#post-data-name').on('load', loadGetNameData());

    $('#post-data-name').on('load', loadGetAnimalData());

    $('#post-data-name').on('click', clickPostNameData);

    $('#post-data-animal').on('click', clickPostAnimalData);

    $('#get-data-name').on('click', clickGetNameData);

    $('#get-data-animal').on('click', clickGetAnimalData);

    $('#spirit-animal-assigner').on('click', assignSpiritAnimal);

});

var clickPostNameData = function() {
    event.preventDefault();

    var values = {};
    $.each($('#post-form-name').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form-name').find('input[type=text]').val('');
    console.log(values);
    $.ajax({
        type: 'POST',
        url: '/name',
        data: values,
        beforeSend: function () {
            console.log('before!');
        },
        success: function (data) {
            console.log('From Server: ', data);

            randomName = data;

            $('.name-test').text(data.join(', '));
        }
    })
};

function loadGetNameData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function(data) {
            console.log(data);
            //nameArray = data;
            var appendNewDiv = '<div class="name-test">' + data.join(', ') + '</div>';
            $('#names-and-animals').append(appendNewDiv);
        }
    });
}

function clickGetNameData() {

    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function(data) {
            console.log(data);
            var nameArray = data;

            var nameIndex = randomIndex(0, nameArray.length - 1);

            $('#names-and-animals').append('<div>Random Name: ' + nameArray[nameIndex] + '</div>');

        }
    });
}

var clickPostAnimalData = function() {
    event.preventDefault();

    var values = {};
    $.each($('#post-form-animal').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form-animal').find('input[type=text]').val('');
    console.log(values);
    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        beforeSend: function () {
            console.log('before!');
        },
        success: function (data) {
            console.log('From Server: ', data);
            randomAnimal = data;
            $('.animal-test').text(data.join(', '));
        }
    })
};

function loadGetAnimalData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            console.log(data);
            var appendNewDiv = '<div class="animal-test">' + data.join(', ') + '</div>';
            $('#names-and-animals').append(appendNewDiv);
        }
    });
}

function clickGetAnimalData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            console.log(data);
            //var appendNewDiv = '<div class="animal-test">' + data.join(', ') + '</div>';
            //$('#names-and-animals').append(appendNewDiv);

            var animalArray = data;

            var animalIndex = randomIndex(0, animalArray.length - 1);

            $('#names-and-animals').append('<div>Random Animal: ' + animalArray[animalIndex] + '</div>');
        }
    });
}

function randomIndex(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function assignSpiritAnimal() {

    var nameIndex = randomIndex(0, randomName.length - 1);
    var animalIndex = randomIndex(0, randomAnimal.length - 1);

    console.log(randomName[nameIndex]);

    $('#names-and-animals').append('<div class="animal-assignment">Spirit Animal Assignment: ' + randomName[nameIndex] + " the " + randomAnimal[animalIndex] + '</div>')
}
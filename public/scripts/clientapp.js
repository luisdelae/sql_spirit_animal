

$(document).ready(function() {
    $('body').on('load', returnAllPeople());

    $('#post-data-name').on('click', clickPostNameData);

    $('body').on('load', returnAllAnimals());

    $('#post-data-animal').on('click', clickPostAnimalData);

    $('#animal-assigner').on('click', 'button', assignAnimal);

});

var clickPostNameData = function() {
    event.preventDefault();

    var values = {};
    $.each($('#post-form-name').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form-name').find('input[type=text]').val('');
    //console.log(values);
    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function (data) {
            console.log('From Server: ', data);

            appendPerson();

        }
    })
};

function appendPerson() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            var personID = data[data.length-1].person_id;
            var firstName = data[data.length-1].first_name;
            var lastName = data[data.length-1].last_name;

            var insertForm = '<form><label>' + firstName + ' ' + lastName + '  ' + '</label><input type="text" id="name' + personID +
                '" name="name' + personID + '"/> <button id="' + personID + '">Assign Animal</button>';

            $('#animal-assigner').append(insertForm);

        }
    })
}

function returnAllPeople() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {

            data.forEach(function(person, i) {
                var personID = person.person_id;
                var firstName = person.first_name;
                var lastName = person.last_name;

                console.log(firstName);

                var insertForm = '<form><label>' + firstName + ' ' + lastName + '  ' + '</label><input type="text" id="name' + personID +
                    '" name="name' + personID + '"/> <button id="' + personID + '">Assign Animal</button>';

                $('#animal-assigner').append(insertForm);
            })

        }
    })
}

var clickPostAnimalData = function() {
    event.preventDefault();

    var values = {};
    $.each($('#post-form-animal').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form-animal').find('input[type=text]').val('');
    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        success: function (data) {
            console.log('From Server: ', data);

            appendAnimal();

        }
    })
};

function appendAnimal() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            var animalID = data[data.length-1].animal_id;
            var animalName = data[data.length-1].animal_name;
            var animalColor = data[data.length-1].animal_color;

            var insertAnimal = '<p>'+ animalID + '. ' + animalColor + ' ' + animalName + '</p>';

            $('#animal-id').append(insertAnimal);

        }
    })
}

function returnAllAnimals() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {

            data.forEach(function(animal, i) {
                var animalID = animal.animal_id;
                var animalName = animal.animal_name;
                var animalColor = animal.animal_color;

                var insertAnimal = '<p>'+ animalID + '. ' + animalColor + ' ' + animalName + '</p>';

                $('#animal-id').append(insertAnimal);
            })

        }
    })
}

var assignAnimal = function() {
    event.preventDefault();

    var peopleID = $(this).attr('id');
    var animalID = $('#name' + peopleID).val();

    console.log('Clicked assign animal: ' + animalID);
};

//var clickPostNameData = function() {
//    event.preventDefault();
//
//    var values = {};
//    $.each($('#post-form-name').serializeArray(), function(i, field) {
//        values[field.name] = field.value;
//    });
//
//    $('#post-form-name').find('input[type=text]').val('');
//    console.log(values);
//    $.ajax({
//        type: 'POST',
//        url: '/name',
//        data: values,
//        beforeSend: function () {
//            console.log('before!');
//        },
//        success: function (data) {
//            console.log('From Server: ', data);
//
//            randomName = data;
//
//            $('.name-test').text(data.join(', '));
//        }
//    })
//};
//
//function loadGetNameData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/name',
//        success: function(data) {
//            console.log(data);
//            //nameArray = data;
//            var appendNewDiv = '<div class="name-test">' + data.join(', ') + '</div>';
//            $('#names-and-animals').append(appendNewDiv);
//        }
//    });
//}
//
//function clickGetNameData() {
//
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/name',
//        success: function(data) {
//            console.log(data);
//            var nameArray = data;
//
//            var nameIndex = randomIndex(0, nameArray.length - 1);
//
//            $('#names-and-animals').append('<div>Random Name: ' + nameArray[nameIndex] + '</div>');
//
//        }
//    });
//}
//
//var clickPostAnimalData = function() {
//    event.preventDefault();
//
//    var values = {};
//    $.each($('#post-form-animal').serializeArray(), function(i, field) {
//        values[field.name] = field.value;
//    });
//
//    $('#post-form-animal').find('input[type=text]').val('');
//    console.log(values);
//    $.ajax({
//        type: 'POST',
//        url: '/animal',
//        data: values,
//        beforeSend: function () {
//            console.log('before!');
//        },
//        success: function (data) {
//            console.log('From Server: ', data);
//            randomAnimal = data;
//            $('.animal-test').text(data.join(', '));
//        }
//    })
//};
//
//function loadGetAnimalData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/animal',
//        success: function(data) {
//            console.log(data);
//            var appendNewDiv = '<div class="animal-test">' + data.join(', ') + '</div>';
//            $('#names-and-animals').append(appendNewDiv);
//        }
//    });
//}
//
//function clickGetAnimalData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/animal',
//        success: function(data) {
//            console.log(data);
//            //var appendNewDiv = '<div class="animal-test">' + data.join(', ') + '</div>';
//            //$('#names-and-animals').append(appendNewDiv);
//
//            var animalArray = data;
//
//            var animalIndex = randomIndex(0, animalArray.length - 1);
//
//            $('#names-and-animals').append('<div>Random Animal: ' + animalArray[animalIndex] + '</div>');
//        }
//    });
//}
//
//function randomIndex(min, max) {
//    return Math.floor(Math.random() * (1 + max - min) + min);
//}
//
//function assignSpiritAnimal() {
//
//    var nameIndex = randomIndex(0, randomName.length - 1);
//    var animalIndex = randomIndex(0, randomAnimal.length - 1);
//
//    console.log(randomName[nameIndex]);
//
//    $('#names-and-animals').append('<div class="animal-assignment">Spirit Animal Assignment: ' + randomName[nameIndex] + " the " + randomAnimal[animalIndex] + '</div>')
//}
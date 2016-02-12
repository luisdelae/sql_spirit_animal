//var nameArray = [];
//var animalArray = [];

$(document).ready(function() {
    $('#post-data-name').on('load', clickGetNameData());

    $('#post-data-name').on('load', clickGetAnimalData());

    $('#post-data-name').on('click', clickPostNameData);

    $('#post-data-animal').on('click', clickPostAnimalData);

    $('#get-data-name').on('click', clickGetNameData);

    $('#get-data-animal').on('click', clickGetAnimalData);

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
            $('.name-test').text(data.join(', '));
        }
    })
};

function clickGetNameData() {
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
            $('.animal-test').text(data.join(', '));
        }
    })
};

function clickGetAnimalData() {
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

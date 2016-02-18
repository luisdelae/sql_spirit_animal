var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//bring in the pg module

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/spirit_animal'; //the /node-app part is replaced by the name of the DB
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//get everything out of the DB/ get data route
app.get('/people', function(req, res) {

    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM people');

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            client.end();
            console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

app.get('/animal', function(req, res) {

    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM animal');

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            client.end();
            console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

app.post('/people', function(req, res) {
    var addPerson = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING person_id;',
            [addPerson.first_name, addPerson.last_name],
            function(err, result) {
                done(); //this is needed to end the connection so that we can bypass the 10 db connections max default
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    //console.log(res[0]['person_id']);
                    res.send(addPerson);
                }
            });
    });
});

app.post('/animal', function(req, res) {
    var addAnimal = {
        animal_name: req.body.animal_name,
        animal_color: req.body.animal_color
    };
    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO animal (animal_name, animal_color) VALUES ($1, $2);',
            [addAnimal.animal_name, addAnimal.animal_color],
            function(err, result) {
                done(); //this is needed to end the connection so that we can bypass the 10 db connections max default
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    //console.log(res[0]['person_id']);
                    res.send(addAnimal);
                }
            });
    });
});

app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});

//var express = require('express');
//var app = express();
//var bodyParser = require('body-parser');
//var path = require('path');
////var data = require('./routes/data');
//var name = require('./routes/name');
//var animal = require('./routes/animal')
//
//
//app.use(bodyParser.urlencoded({extended: true})); //app.use runs the specified middleware to use for this command. In this case, app or express.
//
//app.set('port', process.env.PORT || 5000); //set a variable, port, to either process.env.PORT or, if it doesn't exist, 5000
//
//app.use('/name', name);
//
//app.use('/animal', animal);
//
//app.get('/*', function(req, res) { // /* turns everything after the first whack in a an url into a string.
//    //request and response
//    console.log('here is the request: ', req.params);
//    var file = req.params[0] || '/views/index.html'; //this has the path to the index.html, which has to be relative to the ./public, which should be generic
//    res.sendFile(path.join(__dirname, './public', file)); //joins paths together to get a whole path of where the file is, relative to where we are
//});
//
//app.listen(app.get('port'), function() { //this is what starts running node with the port we've given it
//   console.log('Server is ready on port ' + app.get('port'));
//});
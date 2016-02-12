var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.send({message: 'hello'});
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;

//body refers to the body of the request.
//post request sends data to server and has a body of data
//body parser processes it for us and makes it into an object and attaches it to a request
var express = require('express');
var router = express.Router();
var path = require('path');
var animalArray = [];

router.get('/', function(req, res) {
    res.send(animalArray);
});

router.post('/', function(req, res) {
    console.log(req.body.animal);
    animalArray.push(req.body.animal);
    res.send(animalArray);
});

module.exports = router;
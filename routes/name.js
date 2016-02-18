var express = require('express');
var router = express.Router();
var path = require('path');
var nameArray = [];

router.get('/', function(req, res) {
    res.send(nameArray);
});

router.post('/', function(req, res) {
    console.log("this is the name" + req.body.name);
    nameArray.push(req.body.name);
    res.send(nameArray);
});

module.exports = router;

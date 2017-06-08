var express = require('express');
var router = express.Router();
var database = require('../database/db');

router.get('/loadmenu', function (req, res) {
    console.log("get loadmenu");
    database.loadMenu(function (result){
        console.log("after get result"+result.toString());
        result.forEach(function(x){
            // console.log(x);
        });
        res.send({"menudata":result});
        res.end();
    });
});

module.exports = router;

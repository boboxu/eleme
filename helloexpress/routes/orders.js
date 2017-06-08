var express = require('express');
var router = express.Router();
var database = require('../database/db');
var app = express();

router.get('/placeorder', function (req, res) {
    var menuid = req.query.menuid;
    var userinfo = req.cookies["userinfo"];
    console.log("placeorder"+menuid+"userinfo"+userinfo);
    //下单
    database.placeOrder(userinfo._id,menuid,function(result){
        if(result){
            app.render('');
        }
        else {
            console.log('下单失败');
        }
    });
});

roouter.get('/placeorder')
module.exports = router;

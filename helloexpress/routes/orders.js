var express = require('express');
var router = express.Router();
var database = require('../database/db');
var app = express();

router.post('/placeorder', function (req, res) {
    console.log('下单'+req.body.menuid);
    var menuid = req.body.menuid;
    var userinfo = req.cookies["userinfo"];
    console.log("placeorder"+menuid+"userinfo"+userinfo);
    //下单
    database.placeOrder(userinfo._id,menuid,function(result){
        if(result){
            res.render('orderlist');
            res.end();
        }
        else {
            res.send('下单失败');
        }
    });
});

//router.get('/placeorder')
module.exports = router;

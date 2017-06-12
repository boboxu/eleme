var express = require('express');
var router = express.Router();
var database = require('../database/db');
var app = express();

router.post('/placeorder', function (req, res) {
    console.log('下单' + req.body.menuid);
    var menuid = req.body.menuid;
    var userinfo = req.cookies["userinfo"];
    console.log("placeorder" + menuid + "userinfo" + userinfo);
    //下单
    database.placeOrder(userinfo._id, menuid, function (order) {
            if (order != null) {
                var menuid = order.menuid;
                database.loadMenuById(menuid, function (menu) {
                    console.log(JSON.stringify(order).toString());
                    console.log(JSON.stringify(menu).toString());
                    res.render('orderstatus', {"orderdata": JSON.stringify(order), "menudata": JSON.stringify(menu)});
                    res.end();
                });
            }
            else {
                res.send('下单失败，请返回重试');
                res.end();
            }
        }
    );
});

router.get('/orderlist', function (req, res) {
    console.log('get orderlist');
    var userinfo = req.cookies["userinfo"];
    //获取历史订单
    database.loadOrderByUserId(userinfo._id, function (result) {
        if (result != null && result.length != 0) {
            var orderarray = new Array();
            var i;
            for (i = 0; i < result.length; i++) {
                var orderitem = result[i];
                var menuid = orderitem.menuid;
                console.log("push begin "+i+menuid+"result length"+result.length);
                database.loadMenuByOrder(orderitem, function (order,menu) {
                    console.log("menu in order is "+JSON.stringify(menu).toString());
                    order["menuinfo"] = menu;
                    orderarray.push(order);

                    if (orderarray.length == result.length){
                        console.log("orderarray:" + JSON.stringify(orderarray));
                        res.render('orderlist', {"orderdata": JSON.stringify(orderarray)});
                        res.end();
                    }
                });


            }
        }
        else {
            res.send('暂无订单');
            res.end()
        }
    });
});

module.exports = router;

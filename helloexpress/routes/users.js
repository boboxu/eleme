var express = require('express');
var router = express.Router();
var database = require('../database/db');
var app = express();

router.post('/login', function (req, res) {
    console.log("post login");
    var name = req.body.name;
    var password = req.body.password;
    database.verifyUserInfo(name, password, function (result, userinfo) {
        if (result) {
            res.cookie('userinfo', userinfo);
            app.get('/menus/loadmenu', function (req,res) {
                console.log("after loadmenu" + result.menudata.toString());
                // res.render('/ucenter', {menuData: result.menudata});
            });
            console.log('登录成功,跳转到首页');
            res.redirect('/');
            console.log('请求已发');
        }
        else {
            res.send("登录失败");
        }
    })
});

router.post('/regist', function (req, res) {
    console.log("post regist");
    // var name = req.body.name;
    // var password = req.body.password;
    // database.verifyUserInfo(name, password, function (result, userinfo) {
    //     if (result) {
    //         // res.send("登录成功123");
    //         // res.render('ucenter', { user:userinfo });
    //         // res.redirect('/ucenter.html');
    //         res.render('ucenter', { user:'123' });
    //     }
    //     else {
    //         res.send("登录失败");
    //     }
    // })
});

router.get('/logout', function (req, res) {
    console.log('logout');
    res.clearCookie("userinfo");
    res.redirect('/');

})
module.exports = router;

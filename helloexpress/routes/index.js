var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (isLogined(req)) {
        console.log('logined');
        var userinfo = req.cookies["userinfo"];
        http.get('http://localhost/menus/loadmenu', function (result) {
            console.log("after loadmenu" + result.statusCode);
            // res.render('/ucenter', {menuData:result.menudata});
            result.setEncoding('utf8');
            var rawData = '';
            result.on('data', function (chunk) {
                rawData += chunk;
            })
            ;
            result.on('end', function () {
                try {
                    // const parsedData = JSON.parse(rawData);
                    // console.log('json = '+parsedData.menudata);
                    res.render('menu', {menudata: rawData});
                    // res.append('this is append');
                    res.end();
                } catch (e) {
                    console.error(e.message);
                    res.end();
                }
            })
            ;
        });
    }
    else {
        console.log('unlogined');
        res.render('login.html');
    }
});

function isLogined(req) {
    if (req.cookies["userinfo"] != null) {
        return true;
    }
    return false;
}

module.exports = router;

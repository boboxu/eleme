var express = require('express');
var router = express.Router();
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/dcmenu';

var mDb;
var insertData = function(db, callback) {
    //连接到表
    var collection = db.collection('menu');
    //插入数据
    var data = [{"name":'wilson001',"age":21},{"name":'wilson002',"age":22}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

var insertMenu = function(name,price,startdate,enddate,callback){
    var collection = mDb.collection('menu');
    var data = [{"name":name,
                "price":mongo.Double(price),
                "startdate":mongo.Double(startdate),
                "enddate":mongo.Double(enddate)}];
    collection.insert(data,function(err,result){
        if (err)
        {
            console.log('Error:'+err);
            return;
        }
        callback(result);
    });
}

var selectData = function(callback) {
    //连接到表
    var collection = mDb.collection('menu');
    //查询数据
    var whereStr = {};
    collection.find(whereStr).toArray(function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

var insertDCMenu = function(){

    insertMenu('榨菜蒸排骨饭',16,1489161600,1489939200,function (result) {
        console.log(result);
    });
    insertMenu('香酱豆腐柔滑饭',16,1489161600,1489939200,function (result) {
        console.log(result);
    });
    insertMenu('烧汁南极冰鱼饭',17,1489161600,1489939200,function (result) {
        console.log(result);
    });
    insertMenu('豆角茄子炒鲜鱿鱼须饭',17,1489161600,1489939200,function (result) {
        console.log(result);
    });
    insertMenu('水煮牛肉饭',18,1489161600,1489939200,function (result) {
        console.log(result);
    });
    insertMenu('双拼套餐 配可乐/豆浆',24,1489161600,1489939200,function (result) {
        console.log(result);
    });

    insertMenu('双拼套餐 配老火靓汤',26,1489161600,1489939200,function (result) {
        console.log(result);
    });
}

router.get('/user_service/isMobileAvaible', function(req, res, next) {
    console.log("this is get");
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        mDb = db;
        // insertDCMenu();
        selectData(function(result) {
            //console.log(result);
            // res.render('mongo', { json: '123' });
            // res.send(result)
            res.send('{"code":200,"msg":"成功","data":{}}')
            db.close();
        });
    });
});

router.post('/user_service/isMobileAvaible', function(req, res, next) {
    console.log("this is post");
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        mDb = db;
        // insertDCMenu();
        selectData(function(result) {
            //console.log(result);
            // res.render('mongo', { json: '123' });
            // res.send(result)
            res.send('{"code":200,"msg":"成功","data":{}}')
            db.close();
        });
    });
});

module.exports = router;
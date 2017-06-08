var mongo = require('mongodb')
var MongoClient = mongo.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/dcmenu';
var USER_TABLE_NAME = 'users';
var MENU_TABLE_NAME = 'menus';
var ORDER_TABLE_NAME = 'orders';

exports.verifyUserInfo = function (name, password, callback) {
    console.log("verifyUserInfo");
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err == null) {
            var collection = db.collection(USER_TABLE_NAME);
            //查询数据
            var whereStr = {"name": name, "password": password};
            collection.findOne(whereStr, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    callback(false);
                }
                else {
                    console.log(name + ": login success in " + new Date());
                    callback(true, result);
                }
            });
        }
        else {
            callback(false);
        }

        db.close();
    });
}

exports.regist = function (name, password, callback) {

}

exports.loadMenu = function (callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err == null) {
            var collection = db.collection(MENU_TABLE_NAME);
            //查询数据
            var whereStr = {};
            collection.find(whereStr).toArray(function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    callback(null)
                }
                else {
                    callback(result);
                }
            });
        }
        else {
            callback(null);
        }

        db.close();
    });
}

exports.placeOrder = function (userid, menuid, callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err == null) {
            var collection = db.collection(ORDER_TABLE_NAME);
            //插入数据
            var insertStr = {"menuid": menuid, "ordertime": new Date().getTime(),"userid": userid};
            collection.insertOne(insertStr, function (err, result) {
                if (err || result.insertedCount != 1) {
                    console.log('Error:' + err);
                    callback(false)
                }
                else {
                    callback(true);
                }
            });
        }
        else {
            callback(false);
        }

        db.close();
    });
}

exports.cancelOrder = function ( orderid,callback) {
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err == null) {
            var collection = db.collection(ORDER_TABLE_NAME);
            //插入数据
            var updateStr = {"menuid": menuid, "ordertime": new Date().getTime(),"userid": userid};
            collection.insertOne(insertStr, function (err, result) {
                if (err || result.insertedCount != 1) {
                    console.log('Error:' + err);
                    callback(false)
                }
                else {
                    callback(true);
                }
            });

            collection.updateOne({"menuid":menuid}, {"iscancelled":true}, {upsert:true, w: 1}, function(err, result) {
                if (err || result.result.n != 1) {
                    console.log('Error:' + err);
                    callback(false)
                }
                else {
                    // Fetch the document that we modified and check if it got inserted correctly
                    collection.findOne({"menuid":menuid}, function(err, item) {
                        if (item.iscancelled == true)
                            callback(true);
                        else
                            callback(false);
                    });
                }

            });
        }
        else {
            callback(false);
        }

        db.close();
    });
}
// exports.isLogined = function(req){
//     if(req.cookies["userinfo"] != null){
//         return true;
//     }
//     return false;
// }


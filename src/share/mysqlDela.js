/**
 * Created by xiajun on 2017/2/15.
 */
var mysql = require('mysql');
var Q = require('q');

//设置数据库参数
var connecttion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database:'compen_case',
    port:'3306'
});

//连接数据库
connecttion.connect();

//封装数据库操作
module.exports = function (sql) {
    var defer = Q.defer();
    connecttion.query(sql, function (err,rows,data) {
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(rows);
        }
    });
    return defer.promise;
};
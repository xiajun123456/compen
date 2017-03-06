/**
 * Created by xiajun on 2017/3/2.
 */
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var moment = require('moment');

//创建日志文件
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

app.set('port', process.env.PORT || 8081);

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger({stream: accessLog}));

//设置路由
var routes = require('./src/route');
routes(app);


//错误处理
app.use(function(err, req, res, next) {
    var meta = '[' + moment(new Date(),"YYYY-MM-DD HH:mm:dd") + '] ' + req.url + '\n';
    errorLog.write('_____'+ '\n'+meta + err.stack + '\n'+'______');
    res.status(500).json(JSON.stringify({resultCode:0001,message:'服务器错误！'}))
    next();
});

//启动服务
app.listen(app.get('port'), function () {
    console.log('server port is'+app.get('port'))
});
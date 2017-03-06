/**
 * Created by xiajun on 2017/3/2.
 */
//基本信息模块
var express = require('express');
var route = express.Router();
var mysql = require('../share/mysqlDela');

route.post('/getAmount', function (req,res) {
    mysql('SELECT * FROM case_statistics').then(function (result) {
        res.json(JSON.stringify({
            resultCode:'0000',
            rows:result
        }));
    });
});

//案件趋势
route.post('/getTrend', function (req,res) {
    //处理请求消息
    var area = req.body.area;
    area = '松江';
    var trendtype = req.body.trendtype;
    var mysqlSelect = "SELECT receive_case,colse_case FROM infringement_trend WHERE area_id = (SELECT id FROM compen_area WHERE NAME='"+area+"') AND TYPE="+trendtype
    /*
    * 查询数据
    * 处理数据库查询结果
    * 响应消息
    * */
    mysql(mysqlSelect).then(function (data) {
        var receive_case =  data[0].receive_case.split(',');
        var colse_case = data[0].colse_case.split(',');
        res.json(JSON.stringify({
            resultCode:'0000',
            receiveCase:receive_case,
            colseCase:colse_case
        }))
    }, function (err) {
        console.log(err);
        console.log(2)
    });
});

//结案方式分析
route.post('/getClosedWay', function (req, res) {
    var area = req.body.area;
    area = '松江';
    /*
     * 查询数据
     * 处理数据库查询结果
     * 响应消息
     * */
    var mysqlSelect = "SELECT * FROM closed_way WHERE area_id = (SELECT id FROM compen_area WHERE NAME='"+area+"')";
    mysql(mysqlSelect).then(function (data) {
        var responseData = {
            resultCode:'0000',
            judgment:data[0].judgment.split(','),
            mediation:data[0].mediation.split(','),
            infringement:data[0].Infringement.split(','),
            other:data[0].other.split(',')
        };
        res.json(JSON.stringify(responseData))
    }, function (err) {
        console.log('err:'+err)
    })
});

//结案方案占比
route.post('/getCountCase', function (req, res) {
    var area = req.body.area;
    area = '松江';
    /*
     * 查询数据
     * 处理数据库查询结果
     * 响应消息
     * */
    var mysqlSelect = "SELECT * FROM ccount_case WHERE area_id = (SELECT id FROM compen_area WHERE NAME='"+area+"')";
    mysql(mysqlSelect).then(function (data) {
        var responseData = {
            resultCode:'0000',
            judgmentCount:data[0].judgment_ccount,
            InfringementCount:data[0].Infringement_ccount,
            mediationCount:data[0].mediation_ccount,
            otherCount:data[0].other_ccount
        };
        res.json(JSON.stringify(responseData))
    }, function (err) {
        console.log('err:'+err);
    });
});

module.exports = route;
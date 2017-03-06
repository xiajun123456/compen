/**
 * Created by xiajun on 2017/3/2.
 */
var express = require('express');
var route = express.Router();

module.exports = function (app) {

    route.use('/litigation',require('./litigation/litigation'));
    app.use('/compen',route);

};
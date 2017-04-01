/**
 * Created by zhangtao on 2016/11/22.
 */
'use strict';

var path = require('path');
var hosp = require('./hospital/index');
var asreport = require('./asreport/index');
var asitem = require('./asitem/index');
var describe = require('./describe/index');

var routes = function (app) {
    app.use('/hospital', hosp);
    app.use('/report', asreport);
    app.use('/item', asitem);
    app.use('/describe', describe);
};

module.exports = routes;
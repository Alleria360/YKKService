var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var config = require('./config');

/** 连接数据库 */
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri, config.mongodb.options);

/** APP */
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** 加载数据Model */
var modelsPath = path.join(__dirname, 'model');
var loadModels = function (path) {

    fs.readdirSync(path).forEach(function (file) {
        var fullFile = path + '/' + file;
        var stat = fs.statSync(fullFile);
        if(stat.isFile()){
            if(/(.*)\.(js$|coffee$)/.test(file)){
                require(fullFile);
            }
        }else if(stat.isDirectory()){
            loadModels(fullFile);
        }
    })
};
loadModels(modelsPath);

require('./api/routes')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('你四不四猪？Url都写错了!~');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;

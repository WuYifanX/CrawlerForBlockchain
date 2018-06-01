const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const express = require('express');
const expressWs = require('express-ws')(express());
// 这里需要先暴露出去，因为后面的模块会调用，放在最下面的话会出现问题。
module.exports = expressWs;

const app = expressWs.app;

const crawlerTaskObject = require("./../../crawlerConfig");
const readDataFromDatabase = require("./database/index").readData;

const crawlerInit = require("./../../index");

const initTheServer = function(){

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'jade');

    let connectClient = 0;
    app.ws('/fetchUpdates', function (ws, req) {
        connectClient += 1;
        ws.send(JSON.stringify({
            result: JSON.stringify(crawlerTaskObject),
            dataset: JSON.stringify(readDataFromDatabase()),
            type: "initial"
        }));
    });

    app.get('/', function (req, res, next) {
        res.render('index.html');
        res.end();
    });


// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

};


crawlerInit();
initTheServer();




app.listen(3000);



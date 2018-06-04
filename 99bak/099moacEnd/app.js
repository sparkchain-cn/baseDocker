/**
 * Moac end project;
 * @version 0.0.1
 * Copyright (C) 2018 by Sparkchain Inc.
 * or its affiliates. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Create by Foreso @ 20180410
 *
 */

'use strict';
process.env.TZ = 'Asia/Shanghai';

process.on('uncaughtException', function(err) {
    // 记录日志
    console.log(err);
    // 结束进程
    process.exit(1);
});

// var path = require('path');
var express = require('express');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');


var app = express();
// view engine setup
// app.use(express.query());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());

var routes = require('./routes');
routes(app);

app.use(function (err, req, res, next) {
    console.error(process.domain ? process.domain.id : "", req.ip, req.method, req.originalUrl, err);
    res.status(err.status || err.code || 500).send({
        code: err.code || err.status || 500,
        data: err.message
    }).end();
});

module.exports = app;

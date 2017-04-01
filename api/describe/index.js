/**
 * HealthMobile React Native App
 *
 * index.js
 * Version 1.0.0
 *
 * (\_/)
 * (O.o)    Zhang.Tao
 * (> <)    2017/3/14
 *
 * Copyright (c) 2016 zhangtao. All rights reserved.
 */
var express = require('express');
var controller = require('./describe.controller');

var router = express.Router();

router.post('/', controller.addDescribe);
router.get('/', controller.getDescribe);

module.exports = router;
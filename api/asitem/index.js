/**
 * Created by zhangtao on 2016/11/24.
 */
var express = require('express');
var controller = require('./asitem.controller');

var router = express.Router();

router.get('/', controller.getAllList);
router.post('/', controller.addItem);

module.exports = router;
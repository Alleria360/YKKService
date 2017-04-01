/**
 * Created by zhangtao on 2016/11/21.
 */

var express = require('express');
var controller = require('./hospital.controller');

var router = express.Router();

router.get('/', controller.getAllList);
router.post('/', controller.addHospital);

module.exports = router;
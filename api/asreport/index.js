/**
 * Created by zhangtao on 2016/11/23.
 */
var express = require('express');
var controller = require('./asreport.controller');

var router = express.Router();

router.get('/simp', controller.getReport);
router.get('/', controller.getAllList);
router.get('/query', controller.getReports);
router.post('/simp/', controller.addOrUpdateReport);
router.post('/', controller.addReportArray);
router.put('/', controller.updateReportArray);
router.put('/simp/', controller.updateReport);

module.exports = router;
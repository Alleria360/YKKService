/**
 * Created by zhangtao on 2016/11/23.
 */
'use strict';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var JPush = require('jpush-sdk');



var AsReportModel = mongoose.model('AsReport');

var appKey = 'dba78a6469792a111d838df9';
var masterSecret = '21d4cf26838e1b2953e46004';
var pushClient = JPush.buildClient(appKey, masterSecret, 3, false);

exports.getAllList = function (req, res, next) {

    var currentPage = (parseInt(req.query.currentPage) > 0) ?
        parseInt(req.query.currentPage) : 1;
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0) ?
        parseInt(req.query.itemPerPage) : 10;
    var startRow = (currentPage - 1) * itemsPerPage;

    var sortName = String(req.query.sortName) || "create_time";
    var sortOrder = req.query.sortOrder;
    if (sortOrder === 'false') {
        sortName = '-' + sortName;
    }

    AsReportModel.find()
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sortName)
        .exec()
        .then(function (reportList) {
            if (reportList.length <= 0) {
                return res.status(204).json({data: null, count: 0});
            }
            return AsReportModel.countAsync().then(function (count) {
                return res.status(200).json({data: reportList, count: count});

            });
        }).then(null, function (err) {
        return next(err);

    });

};

/**
 * 根据条码获取报告单
 * @param req
 * @param res
 * @param next
 */
exports.getReports = function (req, res, next) {

    var barcode = req.param('barcode');

    var error_msg;

    if (!barcode) {
        error_msg = '条码号不能为空.';
    }

    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    var currentPage = (parseInt(req.query.currentPage) > 0) ?
        parseInt(req.query.currentPage) : 1;
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0) ?
        parseInt(req.query.itemPerPage) : 20;
    var startRow = (currentPage - 1) * itemsPerPage;

    var sortName = String(req.query.sortName) || "create_time";
    var sortOrder = req.query.sortOrder;
    if (sortOrder === 'false') {
        sortName = '-' + sortName;
    }

    AsReportModel.find({'barcode': barcode})
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sortName)
        .exec()
        .then(function (reportList) {
            if (reportList) {
                var count = reportList.length;
                if (count > 0)
                    return res.status(200).json({success: true, data: reportList, count: count});
                else
                    error_msg = '查询报告单（' + barcode + "）不存在";

            } else {
                error_msg = '查询报告单（' + barcode + "）不存在";
            }
            return res.status(422).send({success: false, error_msg: error_msg});
        });
};

/**
 * 根据条码获取报告单
 * @param req
 * @param res
 * @param next
 */
exports.getReport = function (req, res, next) {

    var reportid = req.param('reportid');

    var error_msg;
    if (!reportid) {
        error_msg = '报告单号不能为空.';
    }

    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    AsReportModel.findOne({'rep_no': reportid},
        function (err, doc) {
            if(doc){
                return res.status(200).json({success: true, data: doc});
            }else{

                if (err) {
                    error_msg = '查询报告单（' + reportid + "）发生异常: " + err;
                }
                else {
                    error_msg = '查询报告单（' + reportid + "）不存在";
                }

                return res.status(422).send({error_msg: error_msg});
            }
        })
};

exports.addOrUpdateReport = function(req, res, next){

    var rep_no = req.body.rep_no;
    var barcode = req.body.barcode;

    var error_msg;

    if (!rep_no) {
        error_msg = '报告单编号不能为空.';
    } else if (!barcode) {
        error_msg = '条码号不能为空.';
    }

    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    AsReportModel.findOne({'rep_no': rep_no},
        function (err, doc) {
            if (doc) {
                /** 数据存在, 修改 */
                doc.set(req.body);
                doc.save(function (err) {
                    if (err) {
                        error_msg = '编号为（' + rep_no + "）的报告单修改发生异常: " + err;
                        return res.status(422).send({error_msg: error_msg});
                    } else {

                        pushClient.push().setPlatform(JPush.ALL)
                            .setAudience(JPush.alias('rep' + rep_no))
                            .setNotification('检查报告单',  JPush.ios('ios alert'),  JPush.android('android alert', null, 1))
                            .setMessage('您的报告单结果已出，请查看.')
                            .send(function (err, res) {
                                if(err){
                                    console.log(err.message);
                                }else{
                                    console.log('Sendno: ' + res.sendno);
                                    console.log('Msg_id: ' + res.msg_id);
                                }
                            });

                        return res.status(200).json({success: true, rep_id: 0});
                    }
                })
            } else {
                /** 数据不存在, 插入 */
                AsReportModel.createAsync(req.body).then(function (result) {
                    return res.status(200).json({success: true, rep_id: result._id});
                }).catch(function (err) {
                    error_msg = '编号为（' + rep_no + "）的报告单增加发生异常: " + err;
                    return res.status(422).send({error_msg: error_msg});
                })
            }


        });
};

exports.addReport = function (req, res, next) {

    // return res.status(200).json({success: true});

    var rep_no = req.body.rep_no;
    var barcode = req.body.barcode;

    var error_msg;

    if (!rep_no) {
        error_msg = '报告单编号不能为空.';
    } else if (!barcode) {
        error_msg = '条码号不能为空.';
    }
    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    AsReportModel.find({'rep_no': rep_no}, function (err, docs) {
        if (docs.length > 0) {
            error_msg = '报告单编号已存在.';
            return res.status(422).send({error_msg: error_msg});
        } else {
            AsReportModel.createAsync(req.body)
                .then(function (result) {
                    return res.status(200)
                        .json({success: true, rep_id: result._id});
                }).catch(function (err) {
                return next(err);
            });
        }
    });


};

exports.addReportArray = function (req, res, next) {

    var array = req.body;

    var error_msg;
    if (array.length <= 0) {
        error_msg = "添加的数组不能为空.";
        return res.status(422).send({error_msg: error_msg});
    }

    array.forEach(function (p) {
        var rep_no = p.rep_no;
        var barcode = p.barcode;

        if (!rep_no) {
            error_msg = '报告单编号不能为空.';
            return res.status(422).send({error_msg: error_msg});
        } else if (!barcode) {
            error_msg = '条码号不能为空.';
            return res.status(422).send({error_msg: error_msg});
        }

    });

    AsReportModel.createAsync(array)
        .then(function (result) {
            return res.status(200)
                .json({success: true, rep_id: result.count});
        })
        .catch(function (err) {
            return res.status(422)
                .send({error_msg: "保存数据失败" + err});
            // return next(err);
        });
};

exports.updateReport = function(req, res, next){

    var rep_no = req.body.rep_no;
    var barcode = req.body.barcode;

    var error_msg;

    if (!rep_no) {
        error_msg = '报告单编号不能为空.';
    } else if (!barcode) {
        error_msg = '条码号不能为空.';
    }

    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    AsReportModel.findOne({'rep_no': rep_no},
        function (err, doc) {
            if (doc) {
                /** 数据存在, 修改 */
                doc.set(req.body);
                doc.save(function (err) {
                    if (err) {
                        error_msg = '编号为（' + rep_no + "）的报告单修改发生异常: " + err;
                        return res.status(422).send({error_msg: error_msg});
                    } else {

                        pushClient.push().setPlatform(JPush.ALL)
                            .setAudience(JPush.alias('rep' + '9771673757164'))
                            .setNotification('检查报告单',  JPush.ios('您的报告单结果已出，请查看.'),
                                JPush.android('您的报告单结果已出，请查看.', null, 1))
                            .setMessage('您的报告单结果已出，请查看.')
                            .send(function (err, res) {
                                if(err){
                                    console.log(err.message);
                                }else{
                                    console.log('Sendno: ' + res.sendno);
                                    console.log('Msg_id: ' + res.msg_id);
                                }
                            });

                        return res.status(200).json({success: true, rep_id: 0});
                    }
                })
            } else {
                /** 数据不存在, 插入 */
                AsReportModel.createAsync(req.body).then(function (result) {
                    return res.status(200).json({success: true, rep_id: result._id});
                }).catch(function (err) {
                    error_msg = '编号为（' + rep_no + "）的报告单增加发生异常: " + err;
                    return res.status(422).send({error_msg: error_msg});
                })
            }


    });
};

exports.updateReportArray = function (req, res, next) {

    var array = req.body;

    var error_msg;
    if (array.length <= 0) {
        error_msg = "更新的数组不能为空.";
        return res.status(422).send({error_msg: error_msg});
    }

    array.forEach(function (p) {
        var rep_no = p.rep_no;
        var barcode = p.barcode;

        if (!rep_no) {
            error_msg = '报告单编号不能为空.';
            return res.status(422).send({error_msg: error_msg});
        } else if (!barcode) {
            error_msg = '条码号不能为空.';
            return res.status(422).send({error_msg: error_msg});

        }

        AsReportModel.findOne({rep_no: rep_no},
            function (err, doc) {

                if (err) {
                    error_msg = '编号为[' + rep_no + "]的报告单发生异常: " + err;
                    return res.status(422).send({error_msg: error_msg});
                } else if (doc === null) {
                    /** 新增加 */
                    AsReportModel.createAsync(p)
                        .then(function (result) {

                        }).catch(function (err) {
                        error_msg = '编号为（' + rep_no + "）的报告单增加发生异常: " + err;
                        return res.status(422).send({error_msg: error_msg});
                    });
                } else {
                    /** 修改 */
                    doc.set(p);
                    doc.save(function (err, data) {
                        if(err)
                        {
                            error_msg = '编号为（' + rep_no + "）的报告单修改发生异常: " + err;
                            return res.status(422).send({error_msg: error_msg});
                        }
                    });
                    // callback(null);
                }

            });


    }, function (err, rs) {
        return res.status(200).json({success: true, rep_id: 0});
    });




};
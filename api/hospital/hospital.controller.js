/**
 * Created by zhangtao on 2016/11/21.
 */
'use strict';

var mongoose = require('mongoose');
var HospModel = mongoose.model('Hosp');

exports.getAllList = function (req, res, next) {

    var currentPage = (parseInt(req.query.currentPage) > 0) ?
        parseInt(req.query.currentPage) : 1;
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0) ?
        parseInt(req.query.itemPerPage) : 10;
    var startRow = (currentPage - 1) * itemsPerPage;

    var sortName = String(req.query.sortName) || "create_time";
    var sortOrder = req.query.sortOrder;
    if(sortOrder === 'false'){
        sortName = '-' + sortName;
    }

    HospModel.find({disabled: false})
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sortName)
        .exec()
        .then(function (hospList) {
            return HospModel.countAsync().then(function (count) {
                return res.status(200).json({data:hospList, count:count});
            });
        }).then(null, function (err) {
            return next(err);

    });
};

exports.addHospital = function (req, res, next) {

    var hosp_code = req.body.hosp_code;
    var hosp_name = req.body.hosp_name;

    var error_msg;

    if (!hosp_code) {
        error_msg = '医院代码不能为空.';
    } else if (!hosp_name) {
        error_msg = '医院名称不能为空.';
    }
    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }

    HospModel.find({'hosp_code': hosp_code}, function (err, docs) {
        if (docs.length > 0) {
            error_msg = '医院代码已存在.';
            return res.status(422).send({error_msg: error_msg});
        } else {
            HospModel.createAsync(req.body)
                .then(function (result) {
                    return res.status(200)
                        .json({success: true, hosp_id: result._id});
                }).catch(function (err) {
                return next(err);
            });
        }
    });


};
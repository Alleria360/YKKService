/**
 * HealthMobile React Native App
 *
 * describe.controller.js
 * Version 1.0.0
 *
 * (\_/)
 * (O.o)    Zhang.Tao
 * (> <)    2017/3/14
 *
 * Copyright (c) 2016 zhangtao. All rights reserved.
 */
var mongoose = require('mongoose');

var DescribeIndexModel = mongoose.model('DescribeIndex');

/**
 * 添加描述
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.addDescribe=function (req, res, next) {

    var index_code = req.body.index_code;
    if(!index_code)
        return res.status(422).send({error_msg: '指标代码不能为空.'});

    DescribeIndexModel.find({'index_code': index_code}, function (err, indexs) {
        if(indexs.length > 0){
            return res.status(422).send({error_msg: '指标代码已存在.'});
        }else{
            DescribeIndexModel.createAsync(req.body)
                .then(function (result) {
                    return res.status(200).json({success: true, index_id: result._id});
                })
                .catch(function (err) {
                    return res.status(422).send({error_msg: '保存指标数据失败.' + err});
                })
        }
    })
};

/**
 * 查询指标
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.getDescribe = function (req, res, next) {

    var index_code = req.param('index_code');
    if(!index_code)
        return res.status(422).send({error_msg: '指标代码不能为空.'});

    DescribeIndexModel.findOne({'index_code': index_code}, function (err, index) {
        if(index){
            return res.status(200).json({success: true, data: index});
        }else{

            var error_msg;
            if (err) {
                error_msg = '查询指标（' + index_code + "）发生异常: " + err;
            }
            else {
                error_msg = '查询指标（' + index_code + "）不存在";
            }

            return res.status(422).send({error_msg: error_msg});
        }
    })

};



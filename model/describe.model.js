/**
 * HealthMobile React Native App
 *
 * describe.model.js
 * Version 1.0.0
 *
 * (\_/)
 * (O.o)    Zhang.Tao
 * (> <)    2017/3/13
 *
 * Copyright (c) 2016 zhangtao. All rights reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var DescribeSchema = new Schema({

    /** 指标代码 */
    index_code: {
        type: String,
        unique: true
    },

    /** 指标名称 */
    index_name:{ type: String },

    /** 英文缩写 */
    eng_name:{ type: String },

    /** 指标简介 */
    brief:{ type: String },

    /** 参考范围 */
    range:{ type: String },

    /** 异常原因 */
    reason:{ type: String },

    /** 健康建议 */
    advice:{ type: String },

    /** 养护重点 */
    nurs_point:{ type: String },

    /** 观察重点 */
    watch_point:{ type: String },

    /** 禁用标记 */
    disabled:{ type: Boolean }

});

var DescribeModel = mongoose.model('DescribeIndex', DescribeSchema, 'describe_index');

Promise.promisifyAll(DescribeModel);
Promise.promisifyAll(DescribeModel.prototype);

module.exports = DescribeModel;


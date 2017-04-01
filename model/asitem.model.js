/**
 * 检验项目代码
 * Created by zhangtao on 2016/11/21.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var AsItemSchema = new Schema({

    /** 项目代码 */
    item_code: {
        type: String,
        unique: true
    },

    /** 项目名称 */
    item_name:{
        type:String
    },

    /** 英文缩写 */
    eng_name: {
        type: String
    },

    /** 类型 */
    type: {
        type: Number,
        default: 0
    },

    /** 单位 */
    unit: {
        type: String
    },

    /** 精度 */
    prec: {
        type: Number
    },

    /** 默认值 */
    def_result: {
        type: String
    },

    /** 上限 */
    up_bound: {
        type: String
    },

    /** 下限 */
    down_bound: {
        type: String
    },

    /** 描述 */
    decr: {
        type: String
    },

    /** 创建时间 */
    create_time: {
        type: Date,
        default: Date.now
    }

});

var AsItemModel = mongoose.model('AsItem', AsItemSchema, 'as_item');

Promise.promisifyAll(AsItemModel);
Promise.promisifyAll(AsItemModel.prototype);

module.exports = AsItemModel;
/**
 * 医院代码
 * Created by zhangtao on 2016/11/21.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var HospSchema = new Schema({

    /** 医院代码 */
    hosp_code: {
        type: String
    },

    /** 医院名称 */
    hosp_name: {
        type: String
    },

    /** 省 */
    prov: {type: String},

    /** 市 */
    city: {type: String},

    /** 加入时间 */
    create_time: {
        type: Date,
        default: Date.now
    },

    /** 禁用标记 */
    disabled: {
        type: Boolean,
        default: false
    }

});

var HospModel = mongoose.model('Hosp', HospSchema, 'code_hosp');

Promise.promisifyAll(HospModel);
Promise.promisifyAll(HospModel.prototype);

module.exports = HospModel;
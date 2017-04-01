/**
 * Created by zhangtao on 2016/11/24.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var AsRepentrySchema = new Schema({

    /** 项目代码 */
    item_code:{
        type:String,
        unique:true
    },

    /** 结果 */
    result:{ type: String },

    /** 正常标记
     * h:高 l:低 n:正常 */
    normal: {
        type: String,
        default: 'n'
    }

});


var AsRepentryModel = mongoose.model('AsRepentry', AsRepentrySchema, 'as_repentry');

Promise.promisifyAll(AsRepentryModel);
Promise.promisifyAll(AsRepentryModel.prototype);

module.exports = AsRepentryModel
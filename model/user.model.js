/**
 * Created by zhangtao on 2016/11/23.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    /** 用户电话号码 */
    tel:{
        type:String,
        unique:true
    }
});

var UserModel = mongoose.model('User', UserSchema, 'code_user');

module.exports = UserModel;


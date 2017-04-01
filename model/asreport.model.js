/**
 * 检验报告单
 * Created by zhangtao on 2016/11/21.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

// var AsRepentryModel = require('./asrepentry.model');

var AsRepentrySub = new Schema({

    /** 报告单号 */
    rep_no: {
        type: String,
        unique: true

    },

    /** 项目代码 */
    item_code:{
        type:String,
        // unique: true
    },

    /** 项目名称 */
    item_name:{ type: String },

    /** 英文名称 */
    eng_name:{ type: String },

    /** 排列序号 */
    sort_order:{ type: Number },

    /** 结果 */
    result:{ type: String },

    /** 单位 */
    unit:{ type: String },


    /** 正常标记
     * h:高 l:低 n:正常 */
    normal: {
        type: String,
        default: 'n'
    },

    /** 下限 */
    downbound:{ type: String },

    /** 上限 */
    upbound:{ type: String },

    /** 描述 */
    decr:{ type: String }

});

var AsReportSchema = new Schema({

    /** 报告单号 */
    rep_no: {
        type: String,
        unique: true
    },

    /** 报告单标题 */
    rep_title: {type: String},

    /** 用户Id */
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    /** 医院代码 */
    hosp_code: { type: String },

    /** 医院名称 */
    hosp_name: { type: String },

    /** 条码号 */
    barcode: {
        type: String
    },

    /** 患者编号 */
    pati_no:{ type: String },

    /** 患者名称 */
    pati_name:{ type: String },

    /** 性别 */
    sex:{ type: String },

    /** 年龄 */
    age: {
        type: Number, default: 0
    },

    /** 年龄单位 */
    age_unit:{ type: String },


    /** 标本号 */
    samp_no:{ type: String },

    /** 标本类型
     * 1:血液 2:尿 3:唾液 4:便 0:其他*/
    samp_type: {
        type: Number,
        default: 1
    },

    /** 验单类型
     * 1:常规 2:药敏 3:骨髓 4:配血 */
    assay_type: {
        type: Number,
        default: 1
    },

    /** 检查科室 */
    as_dept:{ type: String },

    /** 仪器代码 */
    mach_code:{ type: String },

    /** 申请单号 */
    req_no:{ type: String },

    /** 送检科室 */
    req_dept:{ type: String },

    /** 送检日期 */
    req_date:{ type: Date },

    /** 检查日期 */
    chk_date:{ type: Date },

    /** 检验员 */
    chk_oper:{ type: String },

    /** 报告日期 */
    rep_date:{ type: Date },

    /** 报告医生 */
    rep_dr:{ type: String },

    /** 备注 */
    note:{ type: String },

    /** 导入时间 */
    create_time: {
        type: Date,
        default: Date.now
    },

    /** 审核标识 */
    Checked: {
        type: Boolean,
        default: false
    },

    /** 确认标识 */
    confirm: {
        type: Boolean,
        default: false
    },

    /** 正常标识 */
    normal: {
        type: Boolean,
        default: true
    },

    repentrys:[AsRepentrySub]



    // /** 结果数组 */
    // results:[{
    //     type:Schema.Types.ObjectId,
    //     ref: "AsRepentry"
    // }]

});

var AsReportModel = mongoose.model('AsReport', AsReportSchema, 'as_report');

Promise.promisifyAll(AsReportModel);
Promise.promisifyAll(AsReportModel.prototype);

module.exports = AsReportModel;



/**
 * Created by zhangtao on 2016/12/8.
 */

'use strict';

var mongoose = require('mongoose');
var AsReportModel = mongoose.model('AsReport');

module.exports = {

    /** 报告单号 */
    rep_no: { type: String },

    /** 报告单标题 */
    rep_title: {type: String},

    // /** 用户id*/
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    //
    // /** 医院Id */
    // hosp_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Hosp'
    // },

    /** 条码号 */
    barcode: {
        type: String,
        unique: true
    },

    /** 患者编号 */
    pati_no:{ type: String },

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

    /** 上机号 */
    oper_no:{ type: String },

    /** 仪器代码 */
    mach_code:{ type: String },

    /** 申请单号 */
    req_no:{ type: String },

    /** 送检科室 */
    req_dept:{ type: String },

    /** 送检医生 */
    req_dr:{ type: String },

    /** 送检目的 */
    req_aim:{ type: String },

    /** 送检日期 */
    req_date:{ type: Date },

    /** 采样部位 */
    get_where:{ type: String },

    /** 检查日期 */
    chk_date:{ type: Date },

    /** 检验员 */
    chk_oper:{ type: String },

    /** 报告日期 */
    rep_date:{ type: Date },

    /** 报告医生 */
    rep_dr:{ type: String },

    /** 主任签名 */
    dean_oper:{ type: String },

    /** 备注 */
    note:{ type: String },

    /** 导入时间 */
    create_time: {
        type: Date,
        default: Date.now
    },

    /** 审核标识 */
    checked: {
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

};
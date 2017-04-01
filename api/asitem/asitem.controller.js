/**
 * Created by zhangtao on 2016/11/24.
 */
var mongoose = require('mongoose');
var AsItemModel = mongoose.model('AsItem');

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

    AsItemModel.find()
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sortName)
        .exec()
        .then(function (itemList) {
            if (itemList.length <= 0) {
                return res.status(204).json({data: null, count: 0});
            }
            return AsItemModel.countAsync().then(function (count) {
                return res.status(200).json({data: itemList, count: count});

            });
        }).then(null, function (err) {
        return next(err);

    });

};

exports.addItem = function (req, res, next) {

    var item_code = req.body.item_code;
    var error_msg;

    if (!item_code) {
        error_msg = '项目代码不能为空.';
        return res.status(422).send({error_msg: error_msg});
    }

    AsItemModel.find({'item_code': item_code}, function (err, docs) {
        if (docs.length > 0) {
            error_msg = '项目代码已存在.';
            return res.status(422).send({error_msg: error_msg});
        } else {
            AsItemModel.createAsync(req.body)
                .then(function (result) {
                    return res.status(200)
                        .json({success: true, item_id: result._id});
                }).catch(function (err) {
                return next(err);
            });
        }
    });
};
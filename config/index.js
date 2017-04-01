/**
 * Created by zhangtao on 2016/11/21.
 */
'use strict';

var path = require('path');
var lodash = require('lodash');

var other = {

    // env: 'development',
    env: 'production',

    mongodb:{
        options: {
            db: {
                safe: true
            }
        }
    }
};

var config = lodash.merge(other, require('./' + other.env + '.js') || {});

module.exports = config;


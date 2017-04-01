/**
 * Created by zhangtao on 2016/11/23.
 */
var STATUS_CODES = exports.STATUS_CODES = {
    100 : 'Continue',                   //继续
    101 : 'Switching Protocols',        //切换协议
    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
    200 : 'OK',                         //成功
    201 : 'Created',                    //已创建
    202 : 'Accepted',                   //已接受
    203 : 'Non-Authoritative Information',      //非授权信息
    204 : 'No Content',                 //无内容
    205 : 'Reset Content',              //重置内容
    206 : 'Partial Content',            //部分内容
    207 : 'Multi-Status',               // RFC 4918
    300 : 'Multiple Choices',
    301 : 'Moved Permanently',
    302 : 'Moved Temporarily',
    303 : 'See Other',
    304 : 'Not Modified',
    305 : 'Use Proxy',
    307 : 'Temporary Redirect',
    400 : 'Bad Request',                //错误请求
    401 : 'Unauthorized',               //未授权
    402 : 'Payment Required',
    403 : 'Forbidden',                  //禁止
    404 : 'Not Found',                  //请求的网页不存在
    405 : 'Method Not Allowed',         //方法禁用
    406 : 'Not Acceptable',             //不接受
    407 : 'Proxy Authentication Required',      //需要代理授权
    408 : 'Request Time-out',           //请求超时
    409 : 'Conflict',                   //冲突
    410 : 'Gone',                       //已删除
    411 : 'Length Required',
    412 : 'Precondition Failed',
    413 : 'Request Entity Too Large',
    414 : 'Request-URI Too Large',
    415 : 'Unsupported Media Type',
    416 : 'Requested Range Not Satisfiable',
    417 : 'Expectation Failed',
    418 : 'I\'m a teapot',              // RFC 2324
    422 : 'Unprocessable Entity',       // RFC 4918
    423 : 'Locked',                     // RFC 4918
    424 : 'Failed Dependency',          // RFC 4918
    425 : 'Unordered Collection',       // RFC 4918
    426 : 'Upgrade Required',           // RFC 2817
    500 : 'Internal Server Error',
    501 : 'Not Implemented',
    502 : 'Bad Gateway',
    503 : 'Service Unavailable',        //服务不可用
    504 : 'Gateway Time-out',
    505 : 'HTTP Version not supported',
    506 : 'Variant Also Negotiates',    // RFC 2295
    507 : 'Insufficient Storage',       // RFC 4918
    509 : 'Bandwidth Limit Exceeded',
    510 : 'Not Extended'                // RFC 2774
};
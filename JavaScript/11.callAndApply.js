/*
 * @Author: Qbenben
 * @Date: 2020-03-31 20:30:21
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-05-14 23:33:51
 * @Description: call 和 apply的实现
 */



Function.prototype.call2 = function(context) {
    var context = context || window;
    context.fn = this;
    var arr = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        arr.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + arr + ')');
    delete context.fn;
    return result;
}


Function.prototype.apply2 = function(context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn;
    } else {
        var args = [];
        for (i = 0, len = arr.length; i < len; i++) {
            args.push('arguments[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn;
    return result;
}
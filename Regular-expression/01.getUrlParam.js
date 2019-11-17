/*
 * @Author: qbenben 
 * @Date: 2019-11-17 23:55:36 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-11-17 23:58:27
 * 获取URL(window.location.search)参数方法
 * 从问号 (?) 开始的 URL（查询部分）
 */



/**
 * 获取URL问号传参数方法
 * @param  {} e 目标键值
 * @param  {} t 需要搜索的地方
 */
var getQueryString = function(e, t) {
  var n = new RegExp("(^|\\?|&)" + e + "=([^&]*)(&|$)", "i"),
    t = t || window.location.search,
    o = t.match(n);
  return null != o ? unescape(o[2]) : null;
}
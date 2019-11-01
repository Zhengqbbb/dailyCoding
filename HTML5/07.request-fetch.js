/*
 * @Author: qbenben 
 * @Date: 2019-10-29 23:47:12 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-11-02 02:08:19
 * 对fetch进行封装
 */

//如果后端需要传入类型为：x-www-form-urlencoded
import qs from 'qs';

let baseURL = '';
let baseURLArr = [{
  type: 'development',
  url: 'http://localhost:8081'
}, {
  type: 'test',
  url: 'http://192.163.16.16:9000'
}, {
  type: 'production',
  url: 'https://api.qbenben.com'
}];
baseURLArr.forEach(item => {
  if (process.env.NODE_ENV === item.type) {
    baseURL = item.url;
  }
});

export default function request(url, options = {}) {
  url = baseURL + url;
  /**
   * GET请求系列处理
   */
  !options.method ? options.method = 'GET' : null;
  if (options.hasOwnProperty('params')) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
      const ask = url.includes('?') ? '&' : '?';
      url += `${ask}${qs.stringify(params)}`;
    }
    delete options.params;
  }

  /**
   * 合并请求
   */
  options = Object.assign({
    //允许跨域鞋带资源凭证 same-origin同源可以 omit都拒绝
    credentials: 'include',
    //设置请求头
    headers: {}
  }, options);
  options.headers.Accept = 'application/json';

  /**
   * token的校验
   */
  const token = localStorage.getItem('token');
  token && (options.headers.Authorization = 'token');

  /**
   * post请求的处理
   */
  if (/^(POST|PUT)$/i.test(options.method)) {
    !options.type ? options.type = 'urlencoded' : null;
    if (options.type === 'urlencoded') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.body = qs.stringify(options.body);
    }
    if (options.type === 'json') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }
  }

  return fetch(url, options).then(res => {
    //非200,300请求
    if (!/^(2|3)\d{2}$/.test(res.status)) {
      switch (res.status) {
        case 401: //当前请求需要用户认证登录
          break;
        case 403: //一般是服务理解请求，但是拒绝执行(一般是token过去)
          localStorage.removeItem('token');
          //跳转登陆页
          break;
        case 404: //请求失败，请求所希望的资源未在服务器中发现
          break;
      }
      return Promise.reject(res);
    }
    return res.json();
  }).catch(err => {
    //断网处理
    if (!window.navigator.onLine) {
      //断开网络，跳转其他页面
    }
    return Promise.reject(err);
  })
}
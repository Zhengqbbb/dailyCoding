/*
 * @Author: qbenben 
 * @Date: 2019-10-29 23:38:14 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-10-30 23:06:03
 * 对axois进行二次封装库
 */
import axios from 'axios';
//如果后端需要传入接口类型为：x-www-form-urlencoded
import qs from 'qs';

/**
 * 根据环境变量进行接口区分
 */
switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = 'http://localhost:8081';
    break;
  case 'test':
    axios.default.baseURL = 'http://192.168.16.16:9000';
    break;
  case 'production':
    axios.default.baseURL = 'http://api.qbenben.com';
}

/**
 * 设置超时请求时间
 */
axios.default.timeout = 10000;

/**
 * 设置CORS跨域资源凭证
 */
axios.defaults.withCredentials = true;

/*
 * 设置POST请求头：告知服务器请求主体的数据格式
 * 看公司后端是否需要传入接口类型为：x-www-form-urlencoded
 * 注意：import qs from 'qs';
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);

/*
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
  // 添加TOKEN验证：可以从本地存储中取值，也可以从VUEX中取值，主要看怎么存储的
  // JWT实现TOKEN校验
  const token = localStorage.getItem('token');
  token && (config.headers.Authorization = token);
  return config;
}, error => {
  return Pormise.reject(error);
});

/**
 * 设置响应拦截器
 */
axios.default.validateStatus = status => {
  // 自定义响应成功的HTTP状态码,假如公司状态码不一致的时候可以只设置2开头
  return /^(2|3)\d{2}$/.test(status);
}
axios.interceptors.response.use(response => {
  // 只返回响应主体中的信息（部分公司根据需求会进一步完善，例如指定服务器返回的CODE值来指定成功还是失败）
  return response.data;
}, error => {
  if (error.response) {
    // 请求已发送，只不过状态码不是200系列，设置不同状态码的不同处理
    switch (error.response.status) {
      case 401: // 当前请求需要用户验证（一般是未登录）
        break;
      case 403: // 服务器已经理解请求，但是拒绝执行它（一般是TOKEN过期）
        localStorage.removeItem('token');
        // 跳转到登录页
        break;
      case 404: // 请求失败，请求所希望得到的资源未被在服务器上发现
        break;
    }
    return Promise.reject(error.response);
  } else {
    // 断网处理
    if (!window.navigator.onLine) {
      // 断开网络了，可以让其跳转到断网页面
      return;
    }
    return Promise.reject(error);
  }
});

export default axios;
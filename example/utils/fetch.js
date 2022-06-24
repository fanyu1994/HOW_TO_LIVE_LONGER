import axios from 'axios'
import router from 'router/index';
import DomMessage from "./messageOnce";
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60000
});
const messageOnce = new DomMessage()
// request拦截器
service.interceptors.request.use(
  config => {
    const thisConfig = config;
    // 验证计算;
    thisConfig.headers = {
      'Content-Type': 'application/json',
      'VERSION': 'v1',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    };
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const xhr = response.data;
    let thisReturn = '';
    if (response.status === 200) {
      if (xhr.code === 0 || xhr.code === 200) {
        thisReturn = Promise.resolve(xhr);
      } else if (xhr.code === 2){
        console.log(xhr.msg)
      } else {
        messageOnce.error(xhr.msg);
        thisReturn = Promise.resolve(xhr);
      }
    }
    return thisReturn;
  },
  (error) => {
    console.log(error.code)
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
      messageOnce.error('请求超时');
    } else if (error.response.status === 401) {
      messageOnce.error('token失效');
      window.localStorage.removeItem('access_token'); // 清除数据
      router.push('/login')
    } else if (error.response.status === 500
          || error.response.status === 503) {
      messageOnce.error('服务器内部错误');
    } else {
      messageOnce.error(error.response.data.msg);
    }
    return Promise.reject(error);
  }
);
const fetch = (method, url, data) => {
  let thisReturnData = '';
  const rep = process.env.NODE_ENV === 'development' ? '/api' : ''
  if (method === 'post') {
    thisReturnData = service.post(`${rep}${url}`, { ...data });
  } else if (method === 'get') {
    thisReturnData = service.get(`${rep}${url}`, {
      params: data
    });
  } else if (method === 'put') {
    thisReturnData = service.put(`${rep}${url}`, { ...data });
  } else if (method === 'delete') {
    thisReturnData = service.delete(`${rep}${url}`, {
      params: data
    });
  }
  return thisReturnData;
};
export default fetch

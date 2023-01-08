// 此处代码为路由request请求封装代码。如果有错误或者需要优化的地方，请联系作者。
// import store from '@/store';
import config from '@/config/config.js';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import tool from '@/utils/common.js';
let timeout = 10000;
const baseUrl = config.baseUrl;
const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  console.log('-------getToken--------：' + uni.getStorageSync('token'))
  console.log('-------isToken---------：' + isToken);
  if (getToken() && !isToken) {
    config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token');
  };
  // config.header['Content-Type'] = 'application/x-www-form-urlencoded';
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tool.tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method || 'get',
      timeout: config.timeout || timeout,
      url: config.baseUrl || baseUrl + config.url,
      data: config.data,
      header: config.header,
      dataType: 'json'
    }).then(response => {
      let [error, res] = response
      if (error) {
        tool.toastTip("后端接口连接异常", 'none', 1500)
        reject('后端接口连接异常')
        return
      }
      const code = res.data.code || 200
      const msg = errorCode[code] || res.data.msg || errorCode['default']
      // console.log('msg:'+code+msg)
      if (code === 401) {
        uni.removeStorageSync('token');
        uni.removeStorageSync('uuid');
        uni.removeStorageSync('userInfo');
        tool.showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/login/login'
            })
          }
        })
        reject('无效的会话，或者会话已过期，请重新登录。')
      } else if (code === 500) {
        tool.toastTip(msg, 'none', 1500)
        reject('500')
      } else if (code !== 200) {
        tool.toastTip(msg, 'none', 1500)
        reject(code)
      }
      resolve(res.data)
    })
      .catch(error => {
        let { message } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        tool.toastTip(message, 'none', 1500)
        reject(error)
      })
  })
}
export default request

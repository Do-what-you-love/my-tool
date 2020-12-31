/**
 * axios（ajax） 拦截器
 */
import axios from 'axios'
import store from '../store'
import router from '../router'
import {Message, Loading} from 'element-ui'

const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const removePending = (c) => {
  for (let p in pending) {
    if (pending[p].u === c.url + '&' + c.method) { // 当前请求在数组中存在时执行函数体
      pending[p].f('取消请求') // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

// 加载层控制
let loading = {
  loading: null,
  times: 0, // 并发请求时先完成的会关闭loading使没有请求完的请求没有loading
  open: function () {
    ++this.times
    this.loading = Loading.service({
      lock: true,
      text: '拼命加载中，请稍后',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  close: function () {
    if (!--this.times) this.loading.close();
  }
}

let showMessage = true;

const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_HOST : 'http://cooperation.7yunapp.com', // 正式服地址
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_HOST : 'http://47.108.75.40', // 研发服地址
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_HOST : 'http://47.108.62.234', // 测试服地址
  withCredentials: true,
  timeout: 150000 // 请求超时时间
})

service.interceptors.request.use(config => {
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json; charset=UTF-8' // 定义请求头
  }
  loading.open();
  if (store.state.login.token) {
    config.headers['authToken'] = store.state.login.token
  } else {
    // router.replace({
    //   path: '/login'
    // });
  }

  if (config.canCancel) {
    removePending(config) // 取消重复请求
  }
  return config
}, error => {
  // 关闭加载层
  loading.close();
  // 接口请求失败错误提示
  if (showMessage) {
    showMessage = false
    Message({
      message: '网络连接超时，请检查设备网络连接状态后重试',
      type: 'error',
      duration: 3000,
      onClose: () => {
        showMessage = true
      }
    });
  }
  return Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 关闭加载层
    loading.close();
    if (response.data.code === -12 || response.data.code === -13) {
      router.replace({path: '/login'})
      if (showMessage) {
        showMessage = false
        Message({
          message: '登录验证信息已过期，请重新登录',
          type: 'error',
          duration: 3000,
          onClose: () => {
            showMessage = true
          }
        });
      }
    }
    if (response.data.code - 0 !== 200) {
      // 错误提示
      if (showMessage) {
        showMessage = false
        Message({
          message: response.data.message || response.data.msg,
          type: 'error',
          duration: 3000,
          onClose: () => {
            showMessage = true
          }
        });
      }
    }
    try {
      return response.data
    } catch (e) {
      return response;
    }
  },
  error => {
    // 关闭加载层
    loading.close();
    // 错误提示
    if (showMessage) {
      showMessage = false
      Message({
        message: '网络连接超时，请检查设备网络连接状态后重试',
        type: 'error',
        duration: 3000,
        onClose: () => {
          showMessage = true
        }
      });
    }
    return Promise.reject(error);
  }
)
export default service

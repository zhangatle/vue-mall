import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import {Message} from "element-ui";
import VueAxios from "vue-axios";
import VueCookie from "vue-cookie"
import VueLazyload from "vue-lazyload";
import store from "./store"
import router from "./router"

// mock开关
const mock = false
if(mock) {
  require("./mock/api")
}

axios.defaults.baseURL = "/api"
axios.defaults.baseURL = "http://mi.futurefe.com/api"
axios.defaults.timeout = 8000

// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;
  if(res.status === 0) {
    return res.data;
  }else if(res.status === 10) {
    if(path !== "#/index") {
      window.location.href = "#/login"
    }
    return Promise.reject(res)
  }else {
    Message.warning(res.msg)
    return Promise.reject(res)
  }
}, (error) => {
  let res = error.response
  Message.error(res.data.message)
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  loading: ""
})

Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

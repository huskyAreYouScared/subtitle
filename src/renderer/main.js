import Vue from 'vue'
import axios from 'axios'

import './styles/index.scss'
import '@/assets/iconfont/iconfont.css'
import App from './App'
import router from './router'
import store from './store'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 用户目录
const { remote, app } = require('electron')
Vue.prototype.$userPath = remote.getGlobal('fileObj').userPath

// ffmpeg目录
const ffmpegPath = require('ffmpeg-static')
Vue.prototype.$ffmpegPath = ffmpegPath
// ffmpeg目录
const { exec } = require('child_process')
Vue.prototype.$exec = exec

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

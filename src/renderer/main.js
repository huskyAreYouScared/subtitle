import Vue from 'vue'
import axios from 'axios'

import './styles/index.scss'
import '@/assets/iconfont/iconfont.css'
import App from './App'
import router from './router'
import store from './store'
import db from '../utils/dataStore'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 项目目录
const { remote } = require('electron')
const userPath = process.env.NODE_ENV == 'development' ? remote.getGlobal('fileObj').userPath : remote.app.getPath('userData')
Vue.prototype.$objectPath = userPath

const fs = require('fs')
fs.mkdir(userPath + '/temp', function (err, result) {

})
// 是否为windows
Vue.prototype.$isWindows = remote.getGlobal('isWindows')

// 用户目录
Vue.prototype.$userPath = remote.app.getPath('userData')

// ffmpeg目录
const ffmpegPath = require('ffmpeg-static')
// electron build default app.asar/node_modules change app.asar.unpacked
Vue.prototype.$ffmpegPath = process.env.NODE_ENV == 'development' ? ffmpegPath : ffmpegPath.replace('app.asar','app.asar.unpacked')

// exec
const util = require('util');
const exec = util.promisify(require('child_process').exec);
Vue.prototype.$exec = exec

// db
Vue.prototype.$DB = db

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

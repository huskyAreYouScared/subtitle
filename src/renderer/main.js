import Vue from 'vue'
import axios from 'axios'
import './styles/index.scss'
import '@/assets/iconfont/iconfont.css'
import App from './App'
import router from './router'
import store from './store'
import { quickRouter } from '@/utils/tools.js'
import appRootDir from 'app-root-dir'
import os from 'os'
import { ipcRenderer as ipc } from 'electron'
import db from '../utils/dataStore'
import inputOnlyNumber from '@/vue-plugins/inputOnlyNumber/index'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// 项目目录
const { remote } = require('electron')
const userPath = process.env.NODE_ENV === 'development' ? remote.getGlobal('fileObj').userPath : remote.app.getPath('userData')
Vue.prototype.$objectPath = userPath

const fs = require('fs')
fs.mkdir(userPath + '/temp', function () {

})
// 是否为windows
Vue.prototype.$isWindows = remote.getGlobal('isWindows')

// 用户目录
Vue.prototype.$userPath = remote.app.getPath('userData')

// ffmpeg目录
let ffmpegPath = ''
const platform = os.platform()
if (process.env.NODE_ENV === 'development') {
  ffmpegPath = require('ffmpeg-static')
} else {
  ffmpegPath = `${appRootDir.get().split('app.asar')[0]}ffmpeg/${platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'}`
}
// mac platform ffmpegPath chmod
if (process.env.NODE_ENV !== 'development' && os.platform() !== 'win32') {
  fs.stat(ffmpegPath, (err, stats) => {
    if (err) return
    if (stats) {
      fs.chmod(ffmpegPath, 0o777, (err) => {
        if (err) {
          ipc.send('custom-message', {
            msg: '授权失败！，如果持续失败，请重启软件，或者在关于中找到问题反馈与作者联系，谢谢您，为了更好的软件而努力',
            type: 'error'
          })
        }
      })
    }
  })
}

Vue.prototype.$ffmpegPath = ffmpegPath

// exec
const util = require('util')
const exec = util.promisify(require('child_process').exec)
Vue.prototype.$exec = exec

// db
Vue.prototype.$DB = db

// quickRouter
Vue.prototype.$quickRouter = quickRouter
/* eslint-disable no-new */

// add vue plugins
Vue.use(inputOnlyNumber)

const app = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

export default {
  app
}

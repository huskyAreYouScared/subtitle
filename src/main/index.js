'use strict'

import { app, BrowserWindow } from 'electron'
import './ipc-event'
import './global'
import pak from '../../package.json'
import os from 'os'
import checkVersion from './updateChecker'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  checkVersion()
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    show: true, // 防止初次出现闪烁 在ready-to-show进行加载
    height: 563,
    useContentSize: true,
    frame: true,
    width: 1000,
    center: true,
    // titleBarStyle: 'hidden',
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      experimentalFeatures: true,
      allowRunningInsecureContent: false
    }
  })

  mainWindow.loadURL(winURL)
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// once instance
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

const platform = os.platform()
if (platform === 'win32') {
  // 配置后windows通知功能可用
  app.setAppUserModelId(pak.build.appId)
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// app.once('ready-to-show', () => {
//   win.show()

// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

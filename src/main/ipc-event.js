import { ipcMain, dialog } from 'electron'
import { config } from '@All/utils/config.js'

// select video file
ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'media', extensions: config.audioFormat.concat(config.videoFormat) }
    ]
  }).then(res => {
    event.sender.send('selected-file', res)
  })
})

// save srt or bcc file
ipcMain.on('save-srt-file-dialog', function (event) {
  dialog.showSaveDialog({
    // properties: ['openDirectory'],
    title: '保存文件',
    filters: [
      { name: 'subtitle', extensions: ['bcc', 'srt'] }
    ]
  }).then(res => {
    if (!res.canceled) {
      event.sender.send('save-srt-file', res)
    }
  })
})

// save video file
ipcMain.on('save-video-file-dialog', function (event) {
  dialog.showSaveDialog({
    // properties: ['openDirectory'],
    title: '保存文件',
    filters: [
      { name: 'video', extensions: ['mp4'] }
    ]
  }).then(res => {
    if (!res.canceled) {
      event.sender.send('save-video-file', res)
    }
  })
})

// message
ipcMain.on('custom-message', function (event, data) {
  dialog.showMessageBoxSync({
    message: data.msg || '',
    type: data.type || 'info',
    buttons: data.buttons || ['确认']
  })
})

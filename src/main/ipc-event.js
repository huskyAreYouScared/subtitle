import { ipcMain, dialog } from 'electron'
import {config} from '../utils/config'

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

// save srt file
ipcMain.on('save-srt-file-dialog', function (event) {
  dialog.showSaveDialog({title: '保存文件',
    filters: [
      { name: 'subtitle', extensions: ['bcc', 'srt'] }
    ],
    properties: ['openDirectory']
  }).then(res => {
    event.sender.send('save-srt-file', res)
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

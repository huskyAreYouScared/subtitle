import { ipcMain, dialog } from 'electron'

// select video file
ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4', 'mov'] }
    ]
  }).then(res => {
    event.sender.send('selected-file', res)
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
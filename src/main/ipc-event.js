import { ipcMain, dialog } from 'electron'

ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }
    ]
  }).then(res => {
    event.sender.send('selected-file', res)
  })
})

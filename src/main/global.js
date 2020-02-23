
// 获取项目目录
const userPath = require('electron').app.getAppPath()
const fs = require('fs')

global.fileObj = {
  currentPath: '',
  userPath: userPath
}
//
global.isWindows = process.platform !== 'darwin'
export default global

fs.mkdir(userPath + '/temp', function (err, result) {

})

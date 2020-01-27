
// 获取项目目录
const userPath = require('electron').app.getAppPath()
const fs = require('fs')

export default global.fileObj = {
  currentPath: '',
  userPath: userPath
}

fs.mkdir(userPath + '/temp', function (err, result) {

})


// 获取项目目录
const userPath = require('electron').app.getAppPath() 
  
global.fileObj = {
  currentPath: '',
  userPath: userPath
}
//
global.isWindows = process.platform !== 'darwin'
export default global



import { speech as AipSpeechClient } from 'baidu-aip-sdk'
import { ipcRenderer as ipc } from 'electron'


export function aiAudio() {
  let { APP_ID, API_KEY, SECRET_KEY, service, Region } = this.$DB.read().get('recognitionObject').value()
  // this.recognizeIndex = 1
  // 新建一个对象，建议只保存一个对象调用服务接口
  if (APP_ID && API_KEY && SECRET_KEY) {
    let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
    return new Promise((resolve,reject)=>{
      if(client){
        resolve(client)
      }else{
        reject({err:'创建语音识别实例出错'})
      }
    })
  } else {
    ipc.send('custom-message', {
      msg: '请前往设置输入语音识别配置信息',
      type: 'info'
    })
  }
}
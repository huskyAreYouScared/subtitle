import { speech as AipSpeechClient } from 'baidu-aip-sdk'
import { ipcRenderer as ipc } from 'electron'
import fs from 'fs'
import Vue from 'vue'
const vueInstance = Vue.prototype
export const aiAudio=()=> {
  let { APP_ID, API_KEY, SECRET_KEY, service, Region } = vueInstance.$DB.read().get('recognitionObject').value()
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
// split audio file name output_1.wav recursion finish restore recognizeIndex 0
let recognizeIndex = 1
/**
 * @param {Object} client recognizeInstance
 * @param {Array} srtObjTemp srt Data
 */
export function baiduRecognize (client,srtObjTemp) {
  fs.readFile(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, (err, data) => {
    let voiceBuffer = Buffer.from(data)
    // recognize local file
    client.recognize(voiceBuffer, 'wav', 16000).then((result) => {
      if (result.err_no === 0) {
        srtObjTemp[recognizeIndex - 1].value = result.result[0]
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        baiduRecognize(client,srtObjTemp)
      } else {
        ipc.send('custom-message', {
          msg: '识别完成',
          type: 'info'
        })
        recognizeIndex = 1
      }
    }, (err) => {
      if (recognizeIndex >srtObjTemp.length) {
        ipc.send('custom-message', {
          msg: '部分识别有误',
          type: 'info'
        })
      }
    })
  })
}
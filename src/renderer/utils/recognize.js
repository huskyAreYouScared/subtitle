import { speech as AipSpeechClient } from 'baidu-aip-sdk'
import tencentcloud from 'tencentcloud-sdk-nodejs'
import { ipcRenderer as ipc } from 'electron'
import nodeUUId from 'node-uuid'
import fs from 'fs'
import Vue from 'vue'
import store from '@/store/index'
import { subtitleContentFormat } from '@/utils/tools'
// split audio file name output_1.wav recursion finish restore recognizeIndex 0
let recognizeIndex = 1

const vueInstance = Vue.prototype
export const aiAudio=(srtObjTemp)=> {
  let { APP_ID, API_KEY, SECRET_KEY, service, region } = vueInstance.$DB.read().get('recognitionObject').value()
  // this.recognizeIndex = 1
  if(service === 'baidu'){
    baiduInstance(APP_ID, API_KEY, SECRET_KEY,srtObjTemp)
  }else if(service === 'tencent'){
    tencentInstance(APP_ID, API_KEY, SECRET_KEY, region,srtObjTemp)
  }
}


/**
 * init recognize
 * @param {Number} type 
 */
function recognizeInit(state){
  let resultState = {
    0:'识别完成',
    3302:'鉴权失败，请查看配置是否有误'
  }
  ipc.send('custom-message', {
    msg: resultState[state] ? resultState[state]:'请查看配置，是否有误',
    type: 'info'
  })
  recognizeIndex = 1
  // loading cancel
  store.commit('setLoading', false)
}

// baidu
async function baiduInstance(APP_ID,API_KEY,SECRET_KEY,srtObjTemp){
  // 新建一个对象，建议只保存一个对象调用服务接口
  if (APP_ID && API_KEY && SECRET_KEY) {
    let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
    await baiduRecognize(client,srtObjTemp)
  } else {
    ipc.send('custom-message', {
      msg: '请前往设置输入语音识别配置信息',
      type: 'info'
    })
    throw new Error('配置出错')
  }
}

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
        srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(result.result[0])
      } else if (result.err_no === 3302){
        recognizeInit(result.err_no)
        return 
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        baiduRecognize(client,srtObjTemp)
      } else {
        recognizeInit(0)
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

// tencent
function tencentInstance(APP_ID, API_KEY, SECRET_KEY, region,srtObjTemp){
  const AsrClient = tencentcloud.asr.v20190614.Client;
  // const models = tencentcloud.asr.v20190614.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential(API_KEY, SECRET_KEY);
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "asr.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new AsrClient(cred, region, clientProfile);

  if (APP_ID && API_KEY && SECRET_KEY && region) {
   tencentRecognize(APP_ID,client,srtObjTemp)
  } else {
    recognizeInit(3302)
  }
}

/**
 * @param {Object} client recognizeInstance
 * @param {Array} srtObjTemp srt Data
 */
export function tencentRecognize (APP_ID,client,srtObjTemp) {
  const models = tencentcloud.asr.v20190614.Models;
  let req = new models.SentenceRecognitionRequest();
  fs.readFile(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, (err, data) => {
    let voiceBuffer = Buffer.from(data)
    let voiceBase64 = Buffer.from(data).toString('base64')
    // recognize local file
    let params = `{"ProjectId":${APP_ID},
                  "SubServiceType":2,
                  "EngSerViceType":"16k_zh",
                  "SourceType":1,
                  "VoiceFormat":"wav",
                  "UsrAudioKey":"${nodeUUId.v1()}",
                  "Data":"${voiceBase64}",
                  "DataLen":${voiceBuffer.byteLength},
                  "FilterModal":1}`
    req.from_json_string(params);
    client.SentenceRecognition(req, function(errMsg, result) {
      if (errMsg) {
        recognizeInit(3302)
        return
      }else{
        srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(result.Result)
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        tencentRecognize(APP_ID,client,srtObjTemp)
      } else {
        recognizeInit(0)
      }
    });
  })
}
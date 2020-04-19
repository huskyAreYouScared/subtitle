import { speech as AipSpeechClient } from 'baidu-aip-sdk'
import tencentcloud from 'tencentcloud-sdk-nodejs'
import { ipcRenderer as ipc } from 'electron'
import nodeUUId from 'node-uuid'
import fs from 'fs'
import CryptoJS from 'crypto-js'
import WebSocket from 'ws'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store/index'
import { subtitleContentFormat } from '@/utils/tools'
// split audio file name output_1.wav recursion finish restore recognizeIndex 0
let recognizeIndex = 1
function loadingHide () {
  store.commit('setLoading', false)
}
const vueInstance = Vue.prototype
export const aiAudio = (srtObjTemp) => {
  let { APP_ID, API_KEY, SECRET_KEY, service, region } = vueInstance.$DB.read().get('recognitionObject').value()
  // this.recognizeIndex = 1
  if (service === 'baidu') {
    baiduInstance(APP_ID, API_KEY, SECRET_KEY, srtObjTemp)
  } else if (service === 'tencent') {
    tencentInstance(APP_ID, API_KEY, SECRET_KEY, region, srtObjTemp)
  } else if (service === 'xunfei') {
    xunfeiInstance(APP_ID, API_KEY, SECRET_KEY, srtObjTemp)
  } else if (service === 'tianyi') {
    tianyiRecognize(APP_ID, API_KEY, srtObjTemp)
  }
}

/**
 * init recognize
 * @param {Number} state
 */
function recognizeInit (state) {
  let resultState = {
    0: '识别完成',
    3302: '鉴权失败，请查看配置是否有误或者网络状况不好，请稍后重试'
  }
  ipc.send('custom-message', {
    msg: resultState[state] ? resultState[state] : '请查看配置，是否有误或者网络状况不好，请稍后重试',
    type: 'info'
  })
  recognizeIndex = 1
  // loading cancel
  loadingHide()
}

// baidu
async function baiduInstance (APP_ID, API_KEY, SECRET_KEY, srtObjTemp) {
  // 新建一个对象，建议只保存一个对象调用服务接口
  if (APP_ID && API_KEY && SECRET_KEY) {
    let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
    await baiduRecognize(client, srtObjTemp)
  } else {
    ipc.send('custom-message', {
      msg: '请前往设置输入语音识别配置信息',
      type: 'info'
    })
    loadingHide()
    throw new Error('配置出错')
  }
}

/**
 * @param {Object} client recognizeInstance
 * @param {Array} srtObjTemp srt Data
 */
export function baiduRecognize (client, srtObjTemp) {
  fs.readFile(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, (err, data) => {
    if (err) {
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        baiduRecognize(client, srtObjTemp)
      } else {
        recognizeInit(0)
      }
      return
    }
    let voiceBuffer = Buffer.from(data)
    // recognize local file
    client.recognize(voiceBuffer, 'wav', 16000).then((result) => {
      if (result.err_no === 0) {
        srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(result.result[0])
      } else if (result.err_no === 3302) {
        recognizeInit(result.err_no)
        return
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        baiduRecognize(client, srtObjTemp)
      } else {
        recognizeInit(0)
      }
    }, () => {
      if (recognizeIndex > srtObjTemp.length) {
        ipc.send('custom-message', {
          msg: '部分识别有误',
          type: 'info'
        })
      }
      loadingHide()
    })
  })
}

// tencent
function tencentInstance (APP_ID, API_KEY, SECRET_KEY, region, srtObjTemp) {
  const AsrClient = tencentcloud.asr.v20190614.Client
  // const models = tencentcloud.asr.v20190614.Models;

  const Credential = tencentcloud.common.Credential
  const ClientProfile = tencentcloud.common.ClientProfile
  const HttpProfile = tencentcloud.common.HttpProfile

  let cred = new Credential(API_KEY, SECRET_KEY)
  let httpProfile = new HttpProfile()
  httpProfile.endpoint = 'asr.tencentcloudapi.com'
  let clientProfile = new ClientProfile()
  clientProfile.httpProfile = httpProfile
  let client = new AsrClient(cred, region, clientProfile)

  if (APP_ID && API_KEY && SECRET_KEY && region) {
    tencentRecognize(APP_ID, client, srtObjTemp)
  } else {
    recognizeInit(3302)
  }
}

/**
 * @param {Object} client recognizeInstance
 * @param {Array} srtObjTemp srt Data
 */
export function tencentRecognize (APP_ID, client, srtObjTemp) {
  const models = tencentcloud.asr.v20190614.Models
  let req = new models.SentenceRecognitionRequest()
  fs.readFile(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, (err, data) => {
    if (err) {
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        tencentRecognize(APP_ID, client, srtObjTemp)
      } else {
        recognizeInit(0)
      }
      return
    }
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
    req.from_json_string(params)
    client.SentenceRecognition(req, function (errMsg, result) {
      if (errMsg) {
        recognizeInit(3302)
        return
      } else {
        srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(result.Result)
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        tencentRecognize(APP_ID, client, srtObjTemp)
      } else {
        recognizeInit(0)
      }
    })
  })
}

// xunfeiCloud
// 系统配置
let config = {
  // 请求地址
  hostUrl: 'wss://iat-api.xfyun.cn/v2/iat',
  host: 'iat-api.xfyun.cn',
  // 在控制台-我的应用-语音听写（流式版）获取
  appid: '5e636a09',
  // 在控制台-我的应用-语音听写（流式版）获取
  apiSecret: '47c9c2ff0ba771ff1efb3705e50916c7',
  // 在控制台-我的应用-语音听写（流式版）获取
  apiKey: '9d303a05d82608bfddadd373ec5e48dd',
  uri: '/v2/iat',
  highWaterMark: 1280
}
const FRAME = {
  STATUS_FIRST_FRAME: 0,
  STATUS_CONTINUE_FRAME: 1,
  STATUS_LAST_FRAME: 2
}
function xunfeiInstance (APP_ID, API_KEY, SECRET_KEY, srtObjTemp) {
  config.appid = APP_ID
  config.apiSecret = SECRET_KEY
  config.apiKey = API_KEY
  xunfeiRecognize(srtObjTemp)
}
// 鉴权签名
function getAuthStr (date) {
  let signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
  let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
  let signature = CryptoJS.enc.Base64.stringify(signatureSha)
  let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
  let authStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
  return authStr
}
export function xunfeiRecognize (srtObjTemp) {
  let wssUrl = config.hostUrl + '?authorization=' + getAuthStr(new Date().toUTCString()) + '&date=' + new Date().toUTCString() + '&host=' + config.host
  let ws = new WebSocket(wssUrl)
  // 设置当前临时状态为初始化
  let status = FRAME.STATUS_FIRST_FRAME
  // 记录本次识别用sid
  // let currentSid = ''
  // 识别结果
  let iatResult = []
  // 连接建立完毕，读取数据进行识别
  ws.on('open', (event) => {
    var readerStream = fs.createReadStream(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, {
      highWaterMark: config.highWaterMark
    })
    readerStream.on('data', function (chunk) {
      send(chunk)
    })
    // 最终帧发送结束
    readerStream.on('end', function () {
      status = FRAME.STATUS_LAST_FRAME
      send('')
    })
  })

  // 建连错误
  ws.on('error', (err) => {
    if (recognizeIndex > srtObjTemp.length) {
      ipc.send('custom-message', {
        msg: '部分识别有误',
        type: 'info'
      })
      loadingHide()
    }
    console.log('websocket connect err: ' + err)
  })
  // 得到识别结果后进行处理，仅供参考，具体业务具体对待
  ws.on('message', (data, err) => {
    let str = ''
    if (err) {
      console.log(`err:${err}`)
    }
    let res = JSON.parse(data)
    if (res.code !== 0) {
      console.log(`error code ${res.code}, reason ${res.message}`)
    }
    if (res.data.status === '2') {
    // res.data.status ==2 说明数据全部返回完毕，可以关闭连接，释放资源
      // currentSid = res.sid
      ws.close()
    }
    iatResult[res.data.result.sn] = res.data.result
    if (res.data.result.pgs === 'rpl') {
      res.data.result.rg.forEach(i => {
        iatResult[i] = null
      })
    }
    iatResult.forEach(i => {
      if (i != null) {
        i.ws.forEach(j => {
          j.cw.forEach(k => {
            str += k.w
          })
        })
      }
    })
    srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(str)
  })
  // 传输数据
  function send (data) {
    let frame = null
    let frameDataSection = {
      'status': status,
      'format': 'audio/L16;rate=16000',
      'audio': data.toString('base64'),
      'encoding': 'raw'
    }
    switch (status) {
      case FRAME.STATUS_FIRST_FRAME:
        frame = {// 填充common
          common: {
            app_id: config.appid
          },
          // 填充business
          business: {
            language: 'zh_cn',
            domain: 'iat',
            accent: 'mandarin',
            dwa: 'wpgs' // 可选参数，动态修正
          }, // 填充data
          data: frameDataSection
        }
        status = FRAME.STATUS_CONTINUE_FRAME
        break
      case FRAME.STATUS_CONTINUE_FRAME:
      case FRAME.STATUS_LAST_FRAME:
        // 填充frame
        frame = {
          data: frameDataSection
        }
        break
    }
    ws.send(JSON.stringify(frame))
  }
  // 资源释放
  ws.on('close', () => {
    if (recognizeIndex < srtObjTemp.length) {
      recognizeIndex++
      xunfeiRecognize(srtObjTemp)
    } else {
      recognizeInit(0)
    }
  })
}

// tianyiCloud
function getUTCtimeStamp () {
  let now = new Date().getTime()
  return Math.floor(now / 1000)
}
function getXParam () {
  let param = {
    engine_type: 'sms16k',
    aue: 'raw'
  }
  // 对编码的字符串转化base64
  return btoa(JSON.stringify(param))
}
function getCheckMD5 (API_KEY, curtime, param) {
  return CryptoJS.MD5(API_KEY + curtime + param)
}
export function tianyiRecognize (APP_ID, API_KEY, srtObjTemp) {
  if (APP_ID === '' && API_KEY === '') {
    ipc.send('custom-message', {
      msg: '请前往设置输入语音识别配置信息',
      type: 'info'
    })
    loadingHide()
    return
  }
  let curtime = getUTCtimeStamp()
  let tianyiAxios = axios.create({
    headers: {
      'X-appid': APP_ID,
      'X-Param': getXParam(),
      'X-CurTime': curtime,
      'X-CheckSum': getCheckMD5(API_KEY, curtime, getXParam()),
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  })
  fs.readFile(`${vueInstance.$objectPath}/temp/wav/output_${recognizeIndex}.wav`, (err, data) => {
    if (err) {
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        tianyiRecognize(APP_ID, API_KEY, srtObjTemp)
      } else {
        recognizeInit(0)
      }
      return
    }
    let voiceBase64EncodeURI = encodeURI(Buffer.from(data).toString('base64'))
    // recognize local file
    tianyiAxios.post('https://api.xfyun.cn/v1/service/v1/iat', qs.stringify({audio: voiceBase64EncodeURI})).then(res => {
      if (res.data.code === '0') {
        srtObjTemp[recognizeIndex - 1].value = subtitleContentFormat(res.data.data)
      }
      if (recognizeIndex < srtObjTemp.length) {
        recognizeIndex++
        tianyiRecognize(APP_ID, API_KEY, srtObjTemp)
      } else {
        recognizeInit(0)
      }
    })
  })
}

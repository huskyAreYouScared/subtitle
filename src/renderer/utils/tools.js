import route from '@/router'
import {config} from '@All/utils/config.js'
// mp4,webm,ogg
export function checkAllowFile (file) {
  let regexp = new RegExp(`\.(${config.audioFormat.concat(config.videoFormat).join('|')})$`)
  return regexp.test(file)
}

export function quickRouter (path) {
  route.push(path)
}

/**
 *
 * @param {Number} second // video total second
 * return eg:00:00:00,000
 */
export function timeLineProcess (second) {
  let UTCDate = new Date(second * 1000)
  let hours = UTCDate.getHours()
  let minutes = UTCDate.getMinutes()
  let seconds = UTCDate.getSeconds()
  let millisecond = UTCDate.getUTCMilliseconds()
  return `${hours >= 10 ? hours : '0' + hours.toString()}:${minutes >= 10 ? minutes : '0' + minutes.toString()}:${seconds >= 10 ? seconds : '0' + seconds.toString()}`
}

/**
 * 
 * @param {Array} subtitleData 
 */
export function joinSrtFlie (subtitleData) {
  let appendText = ''
  subtitleData.forEach((item) => {
    appendText += `${item.index}\n${item.start} --> ${item.end}\n${item.value}\n\n`
  })
  return appendText
}

/**
 * 
 * @param {Array} subtitleData 
 * @param {Number} splitDuration  切割的时间
 * @param {Number} totalDuration 总时长
 */
export function joinBCCFlie (subtitleData,splitDuration,totalDuration) {
  let BCCObj={
    'font_size': 0.4,
    'font_color': '#FFFFFF',
    'background_alpha': 0.5,
    'background_color': '#9C27B0',
    'Stroke': 'none',
    'body': []
  }
  let subtitleArr = []
  subtitleData.forEach((item) => {
    let temp = {
      from: item.startSecond,
      to: item.startSecond + splitDuration,
      location: 2,
      content: item.value
    }
    subtitleArr.push(temp)
  })
  // 处理最后一段音频时间超出的问题
  subtitleArr[subtitleArr.length - 1].to = subtitleArr[subtitleArr.length - 1].from + parseFloat((totalDuration % 10).toFixed(3))
  BCCObj.body = subtitleArr
  return JSON.stringify(BCCObj)
}

export function subtitleContentFormat(subtitle){
  let length = subtitle.length
  let tempArr = subtitle.split('')
  for (let i = 1; i < Math.ceil(length / 30); i++) {
    tempArr.splice(i*30,0,'\n')
  }
  return tempArr.join('')
}
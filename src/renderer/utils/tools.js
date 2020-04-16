import route from '@/router'
import {config} from '@All/utils/config.js'
// mp4,webm,ogg
export function checkAllowFile (file) {
  let regexp = new RegExp(`.(${config.audioFormat.concat(config.videoFormat).join('|')})$`)
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
  // let millisecond = UTCDate.getUTCMilliseconds()
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
export function joinBCCFlie (subtitleData, splitDuration, totalDuration) {
  let BCCObj = {
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
/**
 * @param {Array} subtitleData
 */
export function joinAssFile (subtitleData = []) {
  let assTemplate = `[Script Info]
Title:husky-subtitle provide
Original Script:https://github.com/huskyAreYouScared/subtitle
ScriptType:v4.00+
PlayResX:1920
PlayResY:1080
Timer:100.0000
Collisions:'Reverse'

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,方正黑体_GBK,40,&H00FFFFFF,&HF0000000,&H00000000,&H32000000,0,0,0,0,100,100,0,0.00,1,2,1,2,5,5,2,134

[Events]
Format: Layer, Start, End, Style, Actor, MarginL, MarginR, MarginV, Effect, Text\n`

  subtitleData.forEach(subtitleItem => {
    assTemplate += `Dialogue: 0,${srt2AssReplace(subtitleItem.start)},${srt2AssReplace(subtitleItem.end)},*Default,NTP,0000,0000,0000,,${deleteNewLine(subtitleItem.value)}\n`
  })
  return assTemplate
}

function deleteNewLine (subtitle) {
  return subtitle.replace(/\n/g, '\\N')
}
function srt2AssReplace (date) {
  return date.replace(',', '.')
}

export function subtitleContentFormat (subtitle) {
  let length = subtitle.length
  let tempArr = subtitle.split('')
  for (let i = 1; i < Math.ceil(length / 30); i++) {
    tempArr.splice(i * 30, 0, '\n')
  }
  return tempArr.join('')
}

export function suffixCtrl (path, suffic) {
  let pathTempArr = path.split('.')
  pathTempArr[pathTempArr.length - 1] = suffic
  console.log(pathTempArr)
  return pathTempArr.join('.')
}

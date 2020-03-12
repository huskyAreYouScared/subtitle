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
export function timeLineProcess(second){
  let UTCDate = new Date(second * 1000)
  let hours = UTCDate.getHours()
  let minutes = UTCDate.getMinutes()
  let seconds = UTCDate.getSeconds()
  let millisecond = UTCDate.getUTCMilliseconds()
  return `${hours>=10?hours:'0'+hours.toString()}:${minutes>=10?minutes:'0'+minutes.toString()}:${seconds>=10?seconds:'0'+seconds.toString()}`
}
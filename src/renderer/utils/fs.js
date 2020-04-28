import { joinAssFile, joinBCCFlie, joinSrtFlie } from '@/utils/tools'
let fs = require('fs')

/**
 * @param {String} path
 * @param {Array} subtitleData
 * @param {String} subtitleType
 */
export function fsWriteStream (path, subtitleData, subtitleType, splitDuration, totalDuration) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path)
    writeStream.on('open', () => {
      if (subtitleType === 'ass') {
        writeStream.write(joinAssFile(subtitleData), 'utf-8')
      } else if (subtitleType === 'srt') {
        writeStream.write(joinSrtFlie(subtitleData), 'utf-8')
      } else if (subtitleType === 'bcc') {
        writeStream.write(joinBCCFlie(subtitleData, splitDuration, totalDuration), 'utf-8')
      }
      writeStream.end()
    })
    writeStream.on('finish', () => {
      resolve(true)
    })
    writeStream.on('error', (err) => {
      reject(err)
    })
  })
}

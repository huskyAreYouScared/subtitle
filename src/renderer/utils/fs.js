import { joinAssFile, joinBCCFile, joinSrtFile, joinVttFile } from '@/utils/tools'
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
      switch (subtitleType.toLowerCase()) {
        case 'ass':
          writeStream.write(joinAssFile(subtitleData), 'utf-8')
          break
        case 'srt':
          writeStream.write(joinSrtFile(subtitleData), 'utf-8')
          break
        case 'bcc':
          writeStream.write(joinBCCFile(subtitleData, splitDuration, totalDuration), 'utf-8')
          break
        case 'vtt':
          writeStream.write(joinVttFile(subtitleData), 'utf-8')
          break
        default: writeStream.write(joinSrtFile(subtitleData), 'utf-8')
          break
      }
      writeStream.end()
    })
    writeStream.on('finish', () => {
      resolve(true)
    })
    writeStream.on('error', (err) => {
      console.log(err)

      reject(err)
    })
  })
}

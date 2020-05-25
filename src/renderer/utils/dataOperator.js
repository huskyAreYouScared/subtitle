import { deepCloneJson } from '@/utils/tools'
/**
 * @description save subtitle data in local database
 * @param {Array} subtitlesData
 */
export function saveSubtitlesHistory (context, fileName, subtitlesData) {
  let subtitlesHistory = context.$DB.read().get('subtitlesHistory').value()
  let isSave = isExist(subtitlesHistory, fileName)
  if (isSave !== null) {
    subtitlesHistory[isSave].subtitles = []
    subtitlesData.forEach(item => {
      subtitlesHistory[isSave].subtitles.push(item)
    })
    // this.$set(this.subtitlesHistory, isSave, deepCloneJson(this.subtitleData))
  } else {
    subtitlesHistory.push(
      {fileName: fileName, subtitles: deepCloneJson(subtitlesData)}
    )
  }
  context.$DB.read().set('subtitlesHistory', subtitlesHistory).write()
}

function isExist (subtitlesHistory, fileName) {
  let subtitleslength = subtitlesHistory.length
  const index = null
  for (let index = 0; index < subtitleslength; index++) {
    if (subtitlesHistory[index].fileName === fileName) {
      return index
    }
  }
  return index
}

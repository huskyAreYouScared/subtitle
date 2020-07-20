import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)

// recognize config
if (!db.has('recognitionObject').value()) {
  db.set('recognitionObject', {
    APP_ID: '',
    API_KEY: '',
    SECRET_KEY: '',
    service: '',
    region: '',
    language: '',
    appIdInputType: 'text',
    keyInputType: 'password',
    secretInputType: 'password'
  }).write()
}
// subtitles config
if (!db.has('subtitleConfig').value()) {
  db.set('subtitleConfig', {
    splitDuration: 10,
    videoQuality: 1 // 1代表无损
  }).write()
}
// ass config
if (!db.has('assStyleConfig').value()) {
  db.set('assStyleConfig', {
    fontSize: 30,
    color: '#ffffff',
    outLine: 0,
    outLineColor: '#000000',
    outLineBlur: 0,
    fadeIn: 0,
    fadeOut: 0
  }).write()
}
// subtitle history
if (!db.has('subtitlesHistory').value()) {
  db.set('subtitlesHistory', []).write()
}

// layout
if (!db.has('layoutConfig').value()) {
  db.set('layoutConfig', {
    themeColor: '#f78fb3',
    viewport: 'timelineLayout' // default view timeline layout
  }).write()
}

// software function config
if (!db.has('functionConfig').value()) {
  db.set('functionConfig', {
    isRecognizeAfterSave: false
  }).write()
}

// custom barrage
if (!db.has('barrageData').value()) {
  db.set('barrageData', []).write()
}
export default db

// 作者：Molunerfinn
// 链接：https://juejin.im/post/5a81912d51882507414abcfc
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

<template>
  <div style="width:100%">
    <div>
      <div class="subtitle-ctrl-container">
        <button type="button" class="subtitle-ctrl-btn bg-tint" :disabled="disableBtn" @click="splitStep">生成字幕</button>
        <button type="button" class="subtitle-ctrl-btn bg-tint" :disabled="disableBtn" @click="exportFile('srt')">srt</button>
        <button type="button" class="subtitle-ctrl-btn bg-tint" :disabled="disableBtn" @click="exportFile('bcc')">bcc</button>
      </div>
     
      <div class="srt-container">
        <p v-for="audioItem in srtObjTemp" :key="audioItem.index">
          <input class="srt-input bg" type="text" v-model="audioItem.index">
          <br/>
          <input class="srt-input bg" type="text" v-model="audioItem.start">
          -->
          <input class="srt-input bg" type="text" v-model="audioItem.end">
          <br/>
          <textarea class="srt-textarea bg" v-model="audioItem.value" cols="30" rows="10"></textarea>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {speech as AipSpeechClient} from 'baidu-aip-sdk'
import { ipcRenderer as ipc} from 'electron'
import { mapState } from 'vuex'
import fs from 'fs'
export default {
  data () {
    return {
      srtObjTemp: [], // 切分信息数组
      splitState: true, // 切分状态
      splitStartTimeHours: 0,
      splitStartTimeMinutes: 0,
      splitStartTimeSeconds: 0,
      currentSplitSecond:0,
      fileIndex: 1, // 文件索引
      recognizeIndex: 1, // 识别索引
      splitDuration: 10, // * 切分持续时间
      client: null, // * baiduapi instance
      BCCObj: {
        'font_size': 0.4,
        'font_color': '#FFFFFF',
        'background_alpha': 0.5,
        'background_color': '#9C27B0',
        'Stroke': 'none',
        'body': []
      },
      exportType: 'srt',
      disableBtn: true,
      lastNum:2,// 帮助校准结尾时间引入的
    }
  },
  watch:{
    videoInfo:{
      handler:function(newVal,oldVal){
        this.disableBtn=false
        
      },
      deep :true
    }
  },
  computed:{
    ...mapState(['videoInfo','currentTime'])
  },
  mounted () {
    ipc.on('save-srt-file', (event, file) => {
      let subtitleConetnt = ''
      if (this.exportType === 'srt') {
        subtitleConetnt = this.joinSrtFlie()
      } else if (this.exportType === 'bcc') {
        subtitleConetnt = this.joinBCCFlie()
      }
      let path = this.suffixCtrl(file.filePath)
      fs.writeFile(path, subtitleConetnt, {flag: 'w'}, (err, data) => {
        if (!err) {
          ipc.send('custom-message', {
            msg: '保存成功',
            type: 'info'
          })
        }
      })
    })
  },
  methods: {
    init () {
      this.fileIndex = 1 // 文件索引
      this.recognizeIndex = 1 // 识别索引
      this.splitStartTimeHours = 0
      this.splitStartTimeMinutes = 0
      this.splitStartTimeSeconds = 0
    },
    suffixCtrl (path) {
      let pathTempArr = path.split('.')
      // 因为默认给bcc文件后缀，所以只判断了srt文件
      if (this.exportType == 'srt') {
        pathTempArr[pathTempArr.length - 1] = 'srt'
        return pathTempArr.join('.')
      }
      return path
    },
    splitStep () {
      this.srtObjTemp = [], // 清空之前的切分信息数组
      this.disableBtn = true
      this.splitStateCtrl(true)
      this.newTempFolder(`${this.$objectPath}/temp/wav`)
      this.splitAudio()
    },
    async splitAudio () {
      try {
        // 用来处理最后结尾的几秒，防止超出
        let isAddsplitDuration = true
        // 因为最后一个视频需要0KB来结束语音切割，所以要多切割一个音频
        // 但是结尾的秒数不能错 所以引入这个变量
        if(Math.floor(this.videoInfo.videoInfo.duration)-this.currentSplitSecond<10){
          isAddsplitDuration =false
          this.lastNum --
        }
        const { stdout, stderr } = await this.$exec(`${this.$ffmpegPath} -y  -i ${this.$objectPath}/temp/output.wav -ss ${this.doubleNumberCtrl()}  -t ${this.splitDuration} -c copy ${this.$objectPath}/temp/wav/output_${this.fileIndex}.wav`)
        // 如果返回结果位true代表已经没有音频了
         console.log(this.fileIndex,stderr);   
        if (/audio:0kB/.test(stderr)) {
          this.splitStateCtrl(false)          
        }
        if (this.splitState) {
          // 文件名加1
          this.srtTiemLineCtrl(this.fileIndex, this.doubleNumberCtrl(), 'start', `output_${this.fileIndex}.wav`)
          if(isAddsplitDuration){
            this.startTimeCtrl(this.splitDuration)
          }else{
            if(this.lastNum){
              this.startTimeCtrl(Math.floor(this.videoInfo.videoInfo.duration)-this.currentSplitSecond)
            }else{
              //防止毫秒干扰
              this.startTimeCtrl(1)
              this.startTimeCtrl(this.splitDuration)
            }
          }
          this.srtTiemLineCtrl(this.fileIndex, this.doubleNumberCtrl(), 'end')
          this.fileIndex++
          this.splitAudio()
        } else {
          this.aiAudio()
        }
      } catch (error) {
        this.disableBtn = false
        console.log(error);
        
      }
    },
    splitStateCtrl (state) {
      this.splitState = state
    },
    newTempFolder (path) {
      fs.mkdir(path, (err, data) => {
        let files = fs.readdirSync(path)
        files.forEach((file, index) => {
          let curPath = path + '/' + file
          fs.unlinkSync(curPath) // 删除文件
        })
      })
    },
    startTimeCtrl (duration) {
      if (duration > 20) {
        return
      }
      this.currentSplitSecond+=duration
      if ((this.splitStartTimeSeconds + duration) >= 60) {
        this.splitStartTimeMinutes++
        this.splitStartTimeSeconds = this.splitStartTimeSeconds + duration - 60
      } else {
        this.splitStartTimeSeconds += duration
      }
      if ((this.splitStartTimeMinutes) >= 60) {
        this.splitStartTimeHours++
        this.splitStartTimeMinutes = 0
      }
    },
    // 将时间日期处理成 00:00:00的格式
    doubleNumberCtrl () {
      let seconds = ''
      let minutes = ''
      let hours = ''
      if (this.splitStartTimeSeconds < 9) {
        seconds = `0${this.splitStartTimeSeconds}`
      } else {
        seconds = `${this.splitStartTimeSeconds}`
      }
      if (this.splitStartTimeMinutes < 9) {
        minutes = `0${this.splitStartTimeMinutes}`
      } else {
        minutes = `${this.splitStartTimeMinutes}`
      }
      if (this.splitStartTimeHours < 9) {
        hours = `0${this.splitStartTimeHours}`
      } else {
        hours = `${this.splitStartTimeHours}`
      }
      return `${hours}:${minutes}:${seconds}`
    },
    /**
     * @param current 数组索引
     * @param TimeLine 转换成00:00:00的时间线
     * @param type 'start'或者 'end' 开始时间线或者结束时间线
     * @param fileName 音频文件名
     */
    srtTiemLineCtrl (current, TimeLine, type, fileName) {
      if (type == 'start') {
        this.srtObjTemp.push({
          index: current,
          start: TimeLine + ',000',
          end: '',
          value: '',
          audioFlieName: fileName,
          startSecond: (current - 1) * 10
        })
      } else {
        this.srtObjTemp[current - 1].end = TimeLine + ',000'
      }
    },
    joinSrtFlie () {
      let appendText = ''
      this.srtObjTemp.forEach((item) => {
        appendText += `${item.index}\n${item.start} --> ${item.end}\n${item.value}\n\n`
      })
      return appendText
    },
    joinBCCFlie () {
      let subtitleArr = []
      this.srtObjTemp.forEach((item) => {
        let temp = {
          from: item.startSecond,
          to: item.startSecond + this.splitDuration,
          location: 2,
          content: item.value
        }
        subtitleArr.push(temp)
      })
      // 处理最后一段音频时间超出的问题
      subtitleArr[subtitleArr.length-1].to=subtitleArr[subtitleArr.length-1].from + (this.videoInfo.videoInfo.duration%10).toFixed(0)
      this.BCCObj.body = subtitleArr
      return JSON.stringify(this.BCCObj)
    },
    aiAudio () {
      // 因为最后一个文件总是空文件，所以去除
      this.srtObjTemp.pop()
      // 设置APPID/AK/SK
      // var APP_ID = '18336046'
      // var API_KEY = 'CX7HpOECibS7wIGKXlAyxVA8'
      // var SECRET_KEY = 'TFngd3UfhsdN0NnBm4koUVyeQd67RlGK'
      let {APP_ID, API_KEY, SECRET_KEY} = this.$DB.read().get('recognitionObject').value()
      this.recognizeIndex = 1
      // 新建一个对象，建议只保存一个对象调用服务接口
      if(APP_ID&&API_KEY&&SECRET_KEY){
        this.client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
        this.recognize()
      }else{
        ipc.send('custom-message', {
          msg: '请前往设置输入语音识别配置信息',
          type: 'info'
        })
      }
      
    },
    recognize () {
      fs.readFile(`${this.$objectPath}/temp/wav/output_${this.recognizeIndex}.wav`, (err, data) => {
        let voiceBuffer = new Buffer(data)
        // 识别本地文件
        this.client.recognize(voiceBuffer, 'wav', 16000).then((result) => {
          if (result.err_no === 0) {
            this.srtObjTemp[this.recognizeIndex - 1].value = result.result[0]
          }
          if (this.recognizeIndex < this.srtObjTemp.length) {
            this.recognizeIndex++
            this.recognize()
          } else {
            ipc.send('custom-message', {
              msg: '识别完成',
              type: 'info'
            })
            // 禁止按钮解禁
            this.disableBtn = false
            this.init()
          }
        }, (err) => {
          if (this.recognizeIndex > this.srtObjTemp.length) {
            this.disableBtn = false
          }
        })
      })
    },
    exportFile (type) {
      this.exportType = type
      ipc.send('save-srt-file-dialog')

    }
  }
}
</script>

<style>

</style>
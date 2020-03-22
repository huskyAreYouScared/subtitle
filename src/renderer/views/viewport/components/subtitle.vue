<template>
  <div style="width:100%">
    <div>
      <div class="subtitle-ctrl-container">
        <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="splitStep">生成字幕</button>
        <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="exportFile('srt')">srt</button>
        <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="exportFile('bcc')">bcc</button>
        <mergeSubtitleInVideo :subtitleData="srtObjTemp"/>
        <input type="checkbox" id="scrollCtrl"  v-model="scrollStateCtrl"/><label for="scrollCtrl"><span class="text">scroll</span></label>
      </div>
      <div class="srt-container" ref="subtitleContainer">
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
import mergeSubtitleInVideo from '../toolButton/mergeSubtitleInVideo'
import { ipcRenderer as ipc } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { aiAudio } from '@/utils/recognize'
import { joinSrtFlie, joinBCCFlie } from '@/utils/tools'
import fs from 'fs'
export default {
  name: 'subtitle',
  components: {
    mergeSubtitleInVideo
  },
  data () {
    return {
      srtObjTemp: [], // 切分信息数组
      splitState: true, // 切分状态
      splitStartTimeHours: 0,
      splitStartTimeMinutes: 0,
      splitStartTimeSeconds: 0,
      currentSplitSecond: 0,
      scrollStateCtrl: false,
      fileIndex: 1, // 文件索引
      recognizeIndex: 1, // 识别索引
      splitDuration: 10, // * 切分持续时间
      exportType: 'srt',
      lastNum: 2// 帮助校准结尾时间引入的
    }
  },
  watch: {
    duration: {
      handler: function (newVal, oldVal) {
      },
      deep: true
    },
    currentTime: {
      handler: function (newVal, oldVal) {
        if (this.scrollStateCtrl) {
          this.subtitleAutoScroll(this.videoDuration,
            newVal.currentTime, this.splitDuration, this.$refs.subtitleContainer)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'loading']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  mounted () {
    this.updateSubtitleConfig()
    this.ipcInit()
  },
  methods: {
    ...mapMutations(['setLoading']),
    ipcInit () {
      ipc.on('save-srt-file', (event, file) => {
        let subtitleConetnt = ''
        if (this.exportType === 'srt') {
          subtitleConetnt = joinSrtFlie(this.srtObjTemp)
        } else if (this.exportType === 'bcc') {
          subtitleConetnt = joinBCCFlie(this.srtObjTemp, this.splitDuration, this.videoDuration)
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
    init () {
      this.lastNum = 2 // const 固定值为二
      this.fileIndex = 1 // 文件索引
      this.recognizeIndex = 1 // 识别索引
      this.splitStartTimeHours = 0
      this.splitStartTimeMinutes = 0
      this.splitStartTimeSeconds = 0
      this.currentSplitSecond = 0
      this.srtObjTemp = [] // 清空之前的切分信息数组
    },
    /**
     * @param totalDuration 视频总时长 video total duration
     * @param current 视频当前播放时长 video current duration
     * @param splitduration 视频切割时长 video split duration
     * @param scrollEl 滚动的元素 need scroll element
     */
    subtitleAutoScroll (totalDuration, current, splitduration, scrollEl) {
      if (current < splitduration) {
        return
      }
      let strContainer = scrollEl
      // 获取subtitle-container 总高度
      let rangeScroll = strContainer.scrollHeight
      // 每隔一个duration，进行向下滚动
      if (current > splitduration) {
        let videoProgress = rangeScroll * ((current - splitduration) / totalDuration)
        scrollEl.scrollTop = videoProgress
      }
    },
    suffixCtrl (path) {
      let pathTempArr = path.split('.')
      // 因为默认给bcc文件后缀，所以只判断了srt文件
      if (this.exportType === 'srt') {
        pathTempArr[pathTempArr.length - 1] = 'srt'
        return pathTempArr.join('.')
      }
      return path
    },
    // 更新subtitle config
    updateSubtitleConfig () {
      this.splitDuration = parseInt(this.$DB.read().get('subtitleConfig').value().splitDuration)
    },
    splitStep () {
      this.updateSubtitleConfig()
      this.init()
      this.splitStateCtrl(true)
      this.newTempFolder(`${this.$objectPath}/temp/wav`)
      this.splitAudio()
    },
    checkIsSubtitle (subtitleData) {
      if (subtitleData.length <= 0) {
        ipc.send('custom-message', {msg: '还没有字幕，请先生成字幕', type: 'info'})
        return false
      } else {
        return true
      }
    },
    async splitAudio () {
      this.setLoading(true)
      try {
        // 用来处理最后结尾的几秒，防止超出
        let isAddsplitDuration = true
        // 因为最后一个视频需要0KB来结束语音切割，所以要多切割一个音频
        // 但是结尾的秒数不能错 所以引入这个变量
        if (Math.floor(this.videoDuration) - this.currentSplitSecond < this.splitDuration) {
          isAddsplitDuration = false
          this.lastNum--
        }
        const { stderr } = await this.$exec(`${this.$ffmpegPath} -y  -i ${this.$objectPath}/temp/output.wav -ss ${this.doubleNumberCtrl()}  -t ${this.splitDuration} -c copy ${this.$objectPath}/temp/wav/output_${this.fileIndex}.wav`)
        // 如果返回结果位true代表已经没有音频了
        if (/audio:0kB/.test(stderr)) {
          this.splitStateCtrl(false)
        }
        if (this.splitState) {
          // 文件名加1
          // let reg = new RegExp()
          /audio:(\d{0,3})kB/g.test(stderr)
          let currentAudioSize = parseInt(RegExp.$1 * 1024)
          this.srtTiemLineCtrl(this.fileIndex, this.doubleNumberCtrl(), 'start', currentAudioSize, `output_${this.fileIndex}.wav`)
          if (isAddsplitDuration) {
            this.startTimeCtrl(this.splitDuration)
          } else {
            if (this.lastNum) {
              this.startTimeCtrl(this.floatFormat(this.videoDuration - this.currentSplitSecond, 3))
            } else {
              // 防止毫秒干扰
              this.startTimeCtrl(2)
              this.startTimeCtrl(this.splitDuration)
            }
          }
          this.srtTiemLineCtrl(this.fileIndex, this.doubleNumberCtrl(), 'end')
          this.fileIndex++
          this.splitAudio()
        } else {
          aiAudio(this.srtObjTemp)
        }
      } catch (error) {
        ipc.send('custom-message', {msg: '抱歉，程序出错', type: 'error'})
      }
    },
    splitStateCtrl (state) {
      this.splitState = state
    },
    floatFormat (floatNumber, digit) {
      return parseFloat((floatNumber).toFixed(digit))
    },
    newTempFolder (path) {
      fs.mkdir(path, (err, data) => {
        if (!err) {
          let files = fs.readdirSync(path)
          files.forEach((file, index) => {
            let curPath = path + '/' + file
            fs.unlinkSync(curPath) // 删除文件
          })
        }
      })
    },
    startTimeCtrl (duration) {
      if (duration > 20) {
        return
      }
      this.currentSplitSecond = this.floatFormat(this.currentSplitSecond + duration, 3)
      if ((this.splitStartTimeSeconds + duration) >= 60) {
        this.splitStartTimeMinutes++
        this.splitStartTimeSeconds = this.floatFormat(this.splitStartTimeSeconds + duration - 60, 3)
      } else {
        this.splitStartTimeSeconds = this.floatFormat(this.splitStartTimeSeconds + duration, 3)
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
    srtTiemLineCtrl (current, TimeLine, type, audioSize, fileName) {
      if (type === 'start') {
        this.srtObjTemp.push({
          index: current,
          start: TimeLine + ',000',
          end: '',
          value: '',
          audioFlieName: fileName,
          startSecond: (current - 1) * 10,
          size: audioSize
        })
      } else {
        this.srtObjTemp[current - 1].end = /\./.test(TimeLine)
          ? TimeLine.toString().replace('.', ',') : TimeLine + ',000'
      }
    },
    exportFile (type) {
      if (!this.checkIsSubtitle(this.srtObjTemp)) {
        return
      }
      this.exportType = type
      ipc.send('save-srt-file-dialog')
    }
  }
}
</script>

<style>

</style>
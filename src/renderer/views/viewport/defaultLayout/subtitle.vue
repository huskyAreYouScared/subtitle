<template>
  <div style="width:100%">
    <div>
      <div class="subtitle-ctrl-container">
        <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="splitStep">生成字幕</button>
        <subtitlesExport fileType="srt" :subtitleData="srtObjTemp"/>
        <subtitlesExport fileType="bcc" :subtitleData="srtObjTemp"/>
        <subtitlesExport fileType="ass" :subtitleData="srtObjTemp"/>
        <mergeSubtitleInVideo :subtitleData="srtObjTemp"/>
        <historyManager :subtitleData="srtObjTemp"/>
        <input class="checkBox"  type="checkbox" id="scrollCtrl"  v-model="scrollStateCtrl"/>
        <label class="text checkBox-label" for="scrollCtrl">
          scroll
        </label>
      </div>
      <timeLine :data="srtObjTemp" :scrollStateCtrl="scrollStateCtrl"/>
    </div>
  </div>
</template>

<script>
import mergeSubtitleInVideo from '@/views/viewport/common/mergeSubtitleInVideo'
import subtitlesExport from '@/views/viewport/common/subtitlesExport'
import timeLine from '@/views/viewport/defaultLayout/components/timeLine'
import historyManager from '@/views/viewport/common/historyManager'
import { ipcRenderer as ipc } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { aiAudio } from '@/utils/recognize'
import fs from 'fs'
export default {
  name: 'subtitle',
  components: {
    mergeSubtitleInVideo,
    subtitlesExport,
    timeLine,
    historyManager
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
      splitDuration: 10, // * 切分持续时间
      exportType: 'srt',
      lastNum: 2, // 帮助校准结尾时间引入的
      currentFileObj: null
    }
  },
  watch: {
    filePath: {
      handler: function (newVal, oldVal) {
        this.currentFileObj = newVal.filePath
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'loading', 'filePath']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  mounted () {
    this.updateSubtitleConfig()
  },
  methods: {
    ...mapMutations(['setLoading']),
    init () {
      this.lastNum = 2 // const 固定值为二
      this.fileIndex = 1 // 文件索引
      this.splitStartTimeHours = 0
      this.splitStartTimeMinutes = 0
      this.splitStartTimeSeconds = 0
      this.currentSplitSecond = 0
      this.srtObjTemp = [] // 清空之前的切分信息数组
    },
    // 更新subtitle config
    updateSubtitleConfig () {
      this.splitDuration = parseInt(this.$DB.read().get('subtitleConfig').value().splitDuration)
    },
    splitStep () {
      if (this.videoDuration) {
        this.updateSubtitleConfig()
        this.init()
        this.splitStateCtrl(true)
        this.newTempFolder(`${this.$objectPath}/temp/wav`)
        this.splitAudio()
      } else {
        ipc.send('custom-message', {
          msg: '请先选择视频，或者音频文件',
          type: 'error'
        })
      }
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
        const { stderr } = await this.$exec(`"${this.$ffmpegPath}" -y  -i "${this.$objectPath}/temp/output.wav" -ss ${this.doubleNumberCtrl()}  -t ${this.splitDuration} -c copy "${this.$objectPath}/temp/wav/output_${this.fileIndex}.wav"`)
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
          aiAudio(this.srtObjTemp, this.currentFileObj.name)
        }
      } catch (error) {
        this.setLoading(false)
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
    }
  }
}
</script>

<style>

</style>
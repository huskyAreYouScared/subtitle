<template>
  <div>
    <button type="button" @click="stop">stop</button>
    <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="splitStep">生成字幕</button>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { aiAudio } from '@/utils/recognize'
import { toSrtTime } from 'subtitle'
import fs from 'fs'
export default {
  computed: {
    ...mapState(['duration', 'currentTime', 'loading']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  data: function () {
    return {
      splitDuration: 10,
      currentSecond: 0, // 切分起始秒数
      splitState: false,
      subtilesList: []
    }
  },
  watch: {
    subtilesList: {
      handler: function (newVal) {
        console.log(123)
        this.$emit('updateSubtitles', newVal)
      },
      deep: true
    }
  },
  mounted () {
    this.updateSubtitleConfig()
  },
  methods: {
    ...mapMutations(['setLoading']),
    stop () {
      this.splitState = false
    },
    updateSubtitleConfig () {
      this.splitDuration = parseInt(this.$DB.read().get('subtitleConfig').value().splitDuration)
    },
    init () {
      this.fileIndex = 1 // 文件索引
      this.subtilesList = [] // 清空之前的切分信息数组
    },
    splitStep () {
      if (this.videoDuration) {
        this.updateSubtitleConfig()
        this.init()
        this.splitState = true
        this.newTempFolder(`${this.$objectPath}/temp/wav`)
        this.splitAudio()
      } else {
        ipc.send('custom-message', {
          msg: '请先选择视频，或者音频文件',
          type: 'error'
        })
      }
    },
    async splitAudio () {
      this.setLoading(true)
      try {
        let srtFormatDate = toSrtTime(this.currentSecond * 1000).split(',')[0]
        const { stderr } = await this.$exec(`"${this.$ffmpegPath}" -y  -i "${this.$objectPath}/temp/output.wav" -ss ${srtFormatDate}  -t ${this.splitDuration} -c copy "${this.$objectPath}/temp/wav/output_${this.fileIndex}.wav"`)
        // 如果返回结果位true代表已经没有音频了
        if (/audio:0kB/.test(stderr)) {
          this.splitState = false
        }
        if (this.splitState) {
          /audio:(\d{0,3})kB/g.test(stderr)
          let currentAudioSize = parseInt(RegExp.$1 * 1024)
          // 记录切分的音频数据
          this.addSubtitles(currentAudioSize)
          // 为下一次执行作准备
          this.currentSecond += this.splitDuration
          this.setLoading(false)
          this.fileIndex++
          this.splitAudio()
        } else {
          aiAudio(this.subtilesList)
        }
      } catch (error) {
        this.setLoading(false)
        ipc.send('custom-message', {msg: '抱歉，程序出错', type: 'error'})
      }
    },
    addSubtitles (audioSize) {
      let endSecond = 0
      if (this.videoDuration - this.currentSecond > this.splitDuration) {
        endSecond = this.splitDuration + this.currentSecond
      } else {
        endSecond = this.videoDuration
      }
      this.subtilesList.push({
        index: this.fileIndex,
        start: toSrtTime(this.currentSecond * 1000),
        end: toSrtTime(endSecond * 1000),
        value: '',
        audioFlieName: `output_${this.fileIndex}.wav`,
        startSecond: this.currentSecond,
        endSecond: endSecond,
        size: audioSize
      })
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
    }
  }
}
</script>

<style>

</style>
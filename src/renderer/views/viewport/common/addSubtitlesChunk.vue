<!-- add new subtitles chunk -->
<template>
   <span>
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint text"  
      @click="beforeAddChunk"
    >
      前面<span class="iconfont icon-jiahao icon-mini-size"></span>
    </button>
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint text"  
      @click="behindAddChunk"
    >
      后面<span class="iconfont icon-jiahao icon-mini-size"></span>
    </button>
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint text"  
      @click="deleteChunk"
    >
      删除<span class="iconfont icon-jianhao icon-mini-size"></span>
    </button>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer as ipc } from 'electron'
import { toSrtTime } from 'subtitle'
export default {
  props: {
    subtitleData: {
      type: Array,
      default: []
    },
    scrollStateCtrl: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['duration']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  watch: {},
  methods: {
    beforeAddChunk () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {msg: '没有字幕数据', type: 'info'})
        return false
      }
      let currentStart = this.subtitleData[this.currentIndex].startSecond
      let beforeChunkData = this.subtitleData[this.currentIndex - 1]
      let beforeEnd = beforeChunkData ? beforeChunkData.endSecond : 0
      let updateEndSecond = (currentStart - 0.1)
      let updateStartSecond = (beforeEnd + 0.1)
      if (currentStart - beforeEnd > 1.5) {
        if (this.currentIndex !== 0) {
          this.subtitleData.splice(this.currentIndex, 0, {
            endSecond: updateEndSecond,
            end: toSrtTime(updateEndSecond * 1000).split('.')[0],
            startSecond: updateStartSecond,
            start: toSrtTime(updateStartSecond * 1000).split('.')[0],
            index: 1,
            value: '新增字幕'
          })
        } else {
          this.subtitleData.unshift({
            endSecond: updateEndSecond,
            end: toSrtTime(updateEndSecond * 1000).split('.')[0],
            startSecond: 0.1,
            start: toSrtTime(0.1 * 1000).split('.')[0],
            index: 1,
            value: '新增字幕'
          })
        }
      } else {
        ipc.send('custom-message', {msg: '空间不足，请预留大于1.5s', type: 'info'})
        return false
      }
      this.updateIndex()
    },
    behindAddChunk () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {msg: '没有字幕数据', type: 'info'})
        return false
      }
      let currentEnd = this.subtitleData[this.currentIndex].endSecond
      let behindChunkData = this.subtitleData[this.currentIndex + 1]
      let behindStart = behindChunkData ? behindChunkData.startSecond : this.videoDuration
      let updateEndSecond = (behindStart - 0.1)
      let updateStartSecond = (currentEnd + 0.1)
      if (behindStart - currentEnd > 1.5) {
        if (this.currentIndex !== this.subtitleData.length - 1) {
          this.subtitleData.splice(this.currentIndex + 1, 0, {
            endSecond: updateEndSecond,
            end: toSrtTime(updateEndSecond * 1000).split('.')[0],
            startSecond: updateStartSecond,
            start: toSrtTime(updateStartSecond * 1000).split('.')[0],
            index: 1,
            value: '新增字幕'
          })
        } else {
          this.subtitleData.push({
            endSecond: this.videoDuration - 0.1,
            end: toSrtTime((this.videoDuration - 0.1) * 1000).split('.')[0],
            startSecond: updateStartSecond,
            start: toSrtTime(updateStartSecond * 1000).split('.')[0],
            index: 1,
            value: '新增字幕'
          })
        }
      } else {
        ipc.send('custom-message', {msg: '空间不足，请预留大于1.5s', type: 'info'})
        return false
      }
      this.updateIndex()
    },
    deleteChunk () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {msg: '没有字幕数据', type: 'info'})
        return false
      }
      this.subtitleData.splice(this.currentIndex, 1)
      this.updateIndex()
    },
    updateIndex () {
      this.subtitleData.forEach((item, index) => {
        item.index = index + 1
      })
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
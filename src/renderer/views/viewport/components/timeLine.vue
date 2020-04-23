<template>
  <div class="srt-container" ref="subtitleContainer">
    <p v-for="(timeLineItem,index) in data" :key="index">
      <input class="srt-input bg" type="text" v-model="timeLineItem.index">
      <br/>
      <input class="srt-input bg" type="text" v-model="timeLineItem.start">
      -->
      <input class="srt-input bg" type="text" v-model="timeLineItem.end">
      <br/>
      <textarea class="srt-textarea bg" v-model="timeLineItem.value" cols="30" rows="10"></textarea>
      <i class="iconfont icon-jiahao text" @click="addTimeLine(timeLineItem,index)"></i>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    scrollStateCtrl: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      splitDuration: 10
    }
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'loading']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  watch: {
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
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.splitDuration = parseInt(this.$DB.read().get('subtitleConfig').value().splitDuration)
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
    addTimeLine (timeLineItem, index) {
      const deepClone = JSON.parse(JSON.stringify(timeLineItem))
      this.data.splice(index, 0, deepClone)
      this.resetIndex(this.data)
    },
    resetIndex (data) {
      data.forEach((timeLineItem, index) => {
        timeLineItem.index = index + 1
      })
    }
  }
}
</script>

<style>

</style>
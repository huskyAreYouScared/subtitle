<template>
  <section
    ref="track" 
    class="subtitle-tract-container"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    >
    <div
      class="scale-second text-right" 
      v-for="item in totalSecondArr" 
      :key="item"
    >
      <span class="text mini-text no-select">{{item}}s</span>
    </div>
    <div
      v-if="parseFloat((videoDuration % 1).toFixed(2))>0" 
      class="scale-second text-right fix-last-width" 
      :style="{'width': 50 * parseFloat((videoDuration % 1).toFixed(2)) +'px'}"
    >
      <span class="text mini-text no-select">{{videoDuration.toFixed(2)}}s</span>
    </div>
    <subtitlesChunk 
      @selectChunk="$emit('selectChunk', subtitlesIndex)"
      v-for="(subtitlesItem,subtitlesIndex) in subtitleData" 
      :key="subtitlesIndex+'subtitles'"
      :chunkInfo="subtitlesItem" 
      :leftLimit="subtitlesIndex === 0?0.1:subtitleData[subtitlesIndex-1].endSecond"
      :rightLimit="subtitleData[subtitlesIndex+1]?subtitleData[subtitlesIndex+1].startSecond:videoDuration - 0.05"
    />
  </section>
</template>

<script>
import subtitlesChunk from './chunk'
import { mapState } from 'vuex'
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
    }
  },
  components: {
    subtitlesChunk
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'loading']),
    videoDuration () {
      return this.duration.duration.duration
    },
    totalSecondArr () {
      let arr = []
      let length = Math.floor(this.videoDuration)
      let i = 1
      while (i <= length) {
        arr.push(i++)
      }
      return arr
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
    },
    // subtitles value update
    subtitleData: {
      handler: function (newVal) {
        newVal.forEach(item => {
          if (item.startSecond < 0) {
            item.startSecond = 0
            item.start = toSrtTime(0).split('.')[0]
          }
          if (item.endSecond > this.videoDuration) {
            item.endSecond = this.videoDuration
            item.end = toSrtTime(this.videoDuration * 1000).split('.')[0]
          }
        })
      },
      deep: true
    }
  },
  subtitleData: function () {
    return {
      isMove: false,
      lastXPostion: 0
    }
  },
  methods: {
    selectChunk (subtitlesIndex) {
      console.log(123)
      this.$emit('selectChunk', subtitlesIndex)
    },
    mouseDown (e) {
      this.isMove = true
      this.lastXPostion = e.clientX
    },
    mouseUp (e) {
      this.isMove = false
    },
    mouseLeave (e) {
      this.isMove = false
    },
    mouseMove (e) {
      if (this.isMove) {
        let moveDistance = this.lastXPostion - e.clientX
        this.$refs.track.scrollLeft += moveDistance
        this.lastXPostion = e.clientX
      }
    }
  }
}
</script>

<style>

</style>
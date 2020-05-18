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
      v-if="parseFloat((videoDuration % 1).toFixed(3))>0" 
      class="scale-second text-right fix-last-width" 
      :style="{'width': 50 * parseFloat((videoDuration % 1).toFixed(3)) +'px'}"
    >
      <span class="text mini-text no-select">{{videoDuration}}s</span>
    </div>
    <subtitlesChunk 
      v-for="(subtitlesItem,subtitlesIndex) in data" 
      :key="subtitlesIndex+'subtitles'"
      :chunkInfo="subtitlesItem" 
      :leftLimit="subtitlesIndex === 0?0:data[subtitlesIndex-1].endSecond"
      :rightLimit="data[subtitlesIndex+1]?data[subtitlesIndex+1].startSecond:100"
    />
  </section>
</template>

<script>
import subtitlesChunk from './chunk/chunk'
import { mapState } from 'vuex'
export default {
  props: {
    data: {
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
    }
  },
  data: function () {
    return {
      isMove: false,
      lastXPostion: 0
    }
  },
  methods: {
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
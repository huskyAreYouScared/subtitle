<template>
  <section
    ref="track" 
    class="subtitle-tract-container"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    >
    <div class="scale-second" v-for="item in 100" :key="item"></div>
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
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    subtitlesChunk
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
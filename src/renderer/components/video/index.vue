<template>
  <div>
    <video 
      ref="currentVideo" 
      autoplay="autoplay" 
      :style="customStyle" 
      autobuffer 
      crossorigin="anonymous" 
      class="video-style" 
      controls
      loop
    >
      <source :src="`file:${currentPath}`">
      <track :src="`${this.$objectPath}/temp/temp.vtt`" kind="subtitles" label="中文字幕" srclang="zh"/>
    </video>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  watch: {

  },
  computed: {
    ...mapState(['duration', 'currentTime'])
  },
  props: {
    currentPath: {
      type: String,
      default: ''
    },
    customStyle: {
      type: String,
      default: ''
    }
  },
  mounted () {
    let videoEL = this.$refs.currentVideo
    // video loading completed
    videoEL.addEventListener('loadeddata', () => {
      this.setDuration({
        duration: parseFloat((videoEL.duration).toFixed(3))
      })
    }, false)
    videoEL.addEventListener('timeupdate', () => {
      this.setCurrentTime(videoEL.currentTime)
    }, false)
  },
  methods: {
    ...mapMutations(['setDuration', 'setCurrentTime'])
  }
}
</script>
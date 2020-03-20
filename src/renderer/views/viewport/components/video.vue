<template>
  <div>
    <video ref="currentVideo" class="video-style" controls :src="`file:${currentPath}`"></video>
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

<style>

</style>
<template>
    <video 
      v-if="!isUpdate"
      ref="currentVideo" 
      :style="customStyle" 
      autobuffer 
      crossorigin="anonymous" 
      class="video-style" 
      controls
      loop
    >
      <source :src="`file:${currentPath}`">
      <track  :src="`${this.$objectPath}/temp/temp.vtt`" kind="subtitles" label="中文字幕" default srclang="zh"/>
    </video>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  watch: {
    updateSubtitlesStatus: {
      handler: function () {
        this.isUpdate = true
        console.log('updateSubtitlesStatus')
        this.$nextTick(() => {
          this.isUpdate = false
        })
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'updateSubtitlesStatus'])
  },
  props: {
    currentPath: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data: function () {
    return {
      isUpdate: false
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
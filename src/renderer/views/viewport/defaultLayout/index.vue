<template>
  <div class='row'>
    <div class='subtitle-container col-lg-7 col-md-7 col-sm-7 col-xs-7'>
      <subtitle />
    </div>
    <div class='video-container col-lg-5 col-md-5 col-sm-5 col-xs-5'>
      <showVideo v-if='currentFile !== null' :currentPath='currentFile.showPath'></showVideo>
      <div class='novideo text' v-else>请选择视频文件</div>
    </div>
  </div>
</template>

<script>
import showVideo from './video'
import subtitle from './subtitle'
import { mapState } from 'vuex'
export default {
  components: {
    showVideo,
    subtitle
  },
  computed: {
    ...mapState(['filePath'])
  },
  watch: {
    filePath: {
      handler: function (newVal, oldVal) {
        this.currentFile = newVal.filePath
      },
      deep: true
    }
  },
  data () {
    return {
      currentFile: null
    }
  }
}
</script>

<style>
</style>
<template>
  <div class="tl-video-container">
    <showVideo customStyle="width:60%;margin:30px auto 10px;display:block;" v-if='currentFile !== null' :currentPath='currentFile.showPath'></showVideo>
    <div class='novideo text' v-else>请选择视频文件</div>
  </div>
</template>

<script>
import showVideo from '@/components/video'
import { mapState } from 'vuex'
export default {
  components: {
    showVideo
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
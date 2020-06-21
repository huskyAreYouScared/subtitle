<template>
  <div class="tl-video-container">
    <showVideo :customStyle="customStyle" v-if='currentFile !== null' :currentPath='currentFile.showPath'></showVideo>
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
      currentFile: null,
      customStyle: {
        height: '95%',
        margin: '10px auto',
        display: 'block',
        maxWidth: '100%'
      }
    }
  }
}
</script>
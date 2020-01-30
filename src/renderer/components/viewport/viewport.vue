<!--  -->
<template>
  <div class='viewport-container col-lg-11 col-md-11 col-sm-11 col-xs-11'>
    <div class="row">
       <div class="subtitle-container col-lg-7 col-md-7 col-sm-7 col-xs-7">
         <subtitle/>
      </div>
      <div class="video-container col-lg-5 col-md-5 col-sm-5 col-xs-5">
        <showVideo v-if="currentPath !== ''" :currentPath="currentPath"></showVideo>
        <p class="novideo text" v-else>请选择视频文件</p>
      </div>
    </div>
   
   
  </div>
</template>

<script>
import { ipcRenderer as ipc, remote} from 'electron'
import showVideo from './components/video'
import subtitle from './components/subtitle'
import {mapState} from 'vuex'
export default {
  components: {
    showVideo,
    subtitle
  },
  data () {
    return {
      currentPath: ''
    }
  },
  computed: {
    ...mapState(['filePath'])
  },
  watch: {
    filePath: {
      handler: function (newVal, oldVal) {
        this.currentPath = newVal.filePath
        console.log(newVal)
      },
      deep: true
    }
  },
  methods: {
    init () {
      // ipc.on('file-intend',(event, file) =>{

      //   this.filePath = file
      // })
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
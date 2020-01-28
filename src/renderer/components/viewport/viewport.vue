<!--  -->
<template>
  <div class='viewport-container col-lg-11 col-md-11 col-sm-11 col-xs-11'>
    <video v-if="currentPath !== ''" class="video-style" controls :src="`file:${currentPath}`"></video>
    <p class="novideo text" v-else>请选择视频文件</p>
  </div>
</template>

<script>
import { ipcRenderer as ipc, remote} from 'electron'
import {mapState} from 'vuex'
export default {
  components: {},
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
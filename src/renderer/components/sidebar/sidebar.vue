<!--  -->
<template>
  <div class='sidebar-container bg' ref="sidebar">
    <div class="top-toolbar">
      <span class="iconfont icon-jiahao text toolbar-item" @click="selectLocalFile"></span>
    </div>
    <div class="file-list" @dblclick="selectLocalFile">
      <p class="file-item text" @dbclick="selectFile(item)" v-for="(item,index) in filePath" :key="index">
        {{item.name}}
        <span class="item-toolsbar">
          <span @click="deleteFile(index)" class="iconfont icon-jianhao text"></span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { ipcRenderer as ipc, remote} from 'electron'
import {mapMutations } from 'vuex'
import fs from 'fs'
export default {
  components: {},
  data () {
    return {
      filePath: []
    }
  },
  computed: {
    // ...mapMutations(['setFilePath'])
  },
  watch: {},
  methods: {
    selectLocalFile () {
      ipc.send('open-file-dialog')
    },
    init () {
      ipc.on('selected-file', (event, file) => {
        let temp = file.filePaths.map(item => {
          return {
            name: item.split('\\').pop(),
            path: item
          }
        })
        this.filePath = [...this.filePath, ...temp]
        temp = null
      })
      this.$refs.sidebar.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()

        for (const f of e.dataTransfer.files) {
          this.filePath.push({
            name: f.name,
            path: f.path
          })
        }
      })
      this.$refs.sidebar.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.stopPropagation()
      })
    },
    selectFile (item) {
      this.$store.commit('setFilePath', item.path)
      this.extractAudio(item.path)
    },
    /**
     * @param targetPath 目标文件路径
     */
    extractAudio (targetPath) {
      this.$exec(`${this.$ffmpegPath} -i ${targetPath} -acodec aac -vn ${this.$userPath}/output.aac `, function (error, stdout, stderr) {
        console.log(error, stdout, stderr)
      })
    },
    deleteFile(index){
      this.filePath.splice(index,1)
    }
  },
  mounted () {
    console.log(this.$userPath)
    console.log(this.$ffmpegPath)
    this.init()
  }
}
</script>
<style lang='scss' scoped>

</style>
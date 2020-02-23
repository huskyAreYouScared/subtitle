<!--  -->
<template>
  <div class='sidebar-container bg' ref="sidebar">
    <div class="top-toolbar">
      <span class="iconfont icon-jiahao text toolbar-item" @click="selectLocalFile"></span>
    </div>
    <div class="file-list">
      <p class="file-item text"  @click="selectFile(item)" v-for="(item,index) in filePath" :key="index">
        {{item.name}}
        <span class="item-toolsbar">
          <span @click="deleteFile(index)" class="iconfont icon-jianhao text"></span>
        </span>
      </p>
      <p class="file-item text" v-show="filePath.length==0">支持拖拽选择文件</p>
    </div>
  </div>
</template>

<script>
import { ipcRenderer as ipc, remote} from 'electron'
import {mapMutations } from 'vuex'
import { checkAllowFile} from '@/utils/tools.js'
import fs from 'fs'
import { log } from 'util'
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
            name: this.$isWindows ? item.split('\\').pop() : item.split('/').pop(),
            path: item
          }
        })
        this.filePath = [...this.filePath, ...temp]
        temp = null
      })
      this.$refs.sidebar.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()
        let tempName = '' // 不支持的文件
        for (const f of e.dataTransfer.files) {
          if (/\.(mp4|avi|mkv|mov)$/.test(f.name)) {
            this.filePath.push({
              name: f.name,
              path: f.path
            })
          } else {
            tempName += f.name + '\n'
          }
        }
        if (tempName.length > 0) {
          tempName += '\n不支持该格式文件'
          ipc.send('custom-message', {
            msg: tempName,
            type: 'error'
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
      this.extractVideo(item)
    },
    /**
     * @param targetPath 目标文件路径
     */
    extractAudio (target) {
      // this.$exec(`${this.$ffmpegPath} -y -i ${target.path} -vn -y -acodec copy ${this.$objectPath}/temp/output.aac `, (error, stdout, stderr)=> {
      // this.$exec(`${this.$ffmpegPath} -y -i ${target.path} -codec:a  pcm_f32le -ar 16000 -ac 2 -f f32le ${this.$objectPath}/temp/output.pcm `, (error, stdout, stderr)=> {
      this.$exec(`${this.$ffmpegPath} -y -i ${target.path} -f wav  -ac 1 -ar 16000 ${this.$objectPath}/temp/output.wav `, (error, stdout, stderr) => {

      })
    },
    extractVideo (target) {
      if (!checkAllowFile(target.name)) {
        this.$exec(`${this.$ffmpegPath} -y -i ${target.path} -vcodec libx264 -preset fast -crf 20 -y -vf "scale=1920:-1" -acodec libmp3lame -ab 128k ${this.$objectPath}/temp/output.mp4 `, (error, stdout, stderr) => {
          console.log(error);
          
          this.extractAudio({
            name: 'output.mp4',
            path: `${this.$objectPath}/temp/output.mp4`
          })
        })
      } else {
        this.extractAudio(target)
      }
    },
    deleteFile (index) {
      this.filePath.splice(index, 1)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>

</style>
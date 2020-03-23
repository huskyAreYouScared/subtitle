<!--  -->
<template>
  <div class='sidebar-container bg' ref="sidebar">
    <div class="top-toolbar">
      <span class="iconfont icon-jiahao text toolbar-item" @click="selectLocalFile"></span>
    </div>
    <div class="file-list">
      <p class="file-item text" :title="item.name"  @click="selectFile(item)" v-for="(item,index) in filePath" :key="index">
        {{item.name}}
        <span class="item-toolsbar">
          <span @click.stop="deleteFile(index)" class="iconfont icon-jianhao text"></span>
        </span>
      </p>
      <div class="file-item-empty text" v-show="filePath.length==0">
        <span class="filler">支持拖拽上传文件</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import { checkAllowFile } from '@/utils/tools.js'
import { config } from '@All/utils/config.js'
export default {
  components: {},
  data () {
    return {
      filePath: []
    }
  },
  computed: {

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
            format: item.split('.')[item.split('.').length - 1],
            path: `"${item}"`,
            showPath: item
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
          let regexp = new RegExp(`.(${config.audioFormat.concat(config.videoFormat).join('|')})$`)
          if (regexp.test(f.name)) {
            this.filePath.push({
              name: f.name,
              format: f.path.split('.')[f.path.split('.').length - 1],
              path: `"${f.path}"`,
              showPath: f.path
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
      this.$store.commit('setFilePath', item)
      // * check file format
      if (config.audioFormat.includes(item.format)) {
        this.extractAudio(item)
      } else if (config.videoFormat.includes(item.format)) {
        this.extractVideo(item)
      }
    },
    /**
     * @param targetPath 目标文件路径
     */
    extractAudio (target) {
      // split audio file wav fomat
      this.$exec(`"${this.$ffmpegPath}" -y -i "${target.path}" -acodec pcm_s16le -ac 1 -ar 16000 "${this.$objectPath}/temp/output.wav"`, () => {

      })
    },
    extractVideo (target) {
      if (!checkAllowFile(target.name)) {
        this.$exec(`"${this.$ffmpegPath}" -y -i "${target.path}" -vcodec libx264 -preset fast -crf 20 -y -vf "scale=1920:-1" -acodec libmp3lame -ab 128k "${this.$objectPath}/temp/output.mp4"`, () => {
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
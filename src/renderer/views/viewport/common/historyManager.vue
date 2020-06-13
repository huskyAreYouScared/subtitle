<template>
  <span>
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint"  
      @click="saveSubtitles"
    >
      保存
    </button>
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint"  
      @click="historyReset"
    >
      恢复
    </button>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer as ipc } from 'electron'
import { deepCloneJson } from '@/utils/tools'
import { fsWriteStream } from '@/utils/fs'
export default {
  props: {
    subtitleData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    ...mapState(['filePath'])
  },
  watch: {
    filePath: {
      handler: function (newVal, oldVal) {
        this.currentFile = newVal.filePath
        console.log(this.currentFile)
      },
      deep: true
    }
  },
  data: function () {
    return {
      currentFile: null,
      tempfilePath: `${this.$objectPath}/temp/temp.vtt`
    }
  },
  mounted () {
  },
  methods: {
    historyReset () {
      let subtitlesHistory = this.$DB.read().get('subtitlesHistory').value()
      if (this.currentFile === null) {
        ipc.send('custom-message', {msg: '还没有选中文件', type: 'info'})
        return false
      }
      let historyIndex = this.isExist(subtitlesHistory, this.currentFile.name)
      if (historyIndex === null) {
        ipc.send('custom-message', {
          msg: '该文件没有历史数据',
          type: 'info'
        })
        return false
      } else {
        do {
          this.subtitleData.shift()
          this.subtitleData.pop()
        } while (this.subtitleData.length > 0)
        subtitlesHistory[historyIndex].subtitles.forEach(subtitleItem => {
          this.subtitleData.push(subtitleItem)
        })
        this.generteSubtitlesFile(this.tempfilePath, subtitlesHistory[historyIndex].subtitles)
      }
    },
    saveSubtitles () {
      let subtitlesHistory = this.$DB.read().get('subtitlesHistory').value()
      if (this.currentFile === null || this.subtitleData.length === 0) {
        ipc.send('custom-message', {
          msg: '未选中文件或没有生成字幕',
          type: 'info'
        })
        return false
      }
      // if presence then override
      let isSave = this.isExist(subtitlesHistory, this.currentFile.name)
      if (isSave !== null) {
        subtitlesHistory[isSave].subtitles = []
        this.subtitleData.forEach(item => {
          subtitlesHistory[isSave].subtitles.push(item)
        })
        // this.$set(this.subtitlesHistory, isSave, deepCloneJson(this.subtitleData))
      } else {
        subtitlesHistory.push(
          {fileName: this.currentFile.name, subtitles: deepCloneJson(this.subtitleData)}
        )
      }
      try {
        this.$DB.read().set('subtitlesHistory', subtitlesHistory).write()
        ipc.send('custom-message', {
          msg: '保存成功',
          type: 'info'
        })
      } catch (error) {
        ipc.send('custom-message', {
          msg: '保存失败',
          type: 'error'
        })
      }
    },
    /**
     * @description is exist
     * @param {Array} subtitlesHistory history data
     * @param {String} fileName
     * @return {null | Number}
     */
    isExist (subtitlesHistory, fileName) {
      let subtitleslength = subtitlesHistory.length
      const index = null
      for (let index = 0; index < subtitleslength; index++) {
        if (subtitlesHistory[index].fileName === fileName) {
          return index
        }
      }
      return index
    },
    generteSubtitlesFile (path, subtitles) {
      fsWriteStream(path, subtitles, 'vtt', 10, 25.5).then(res => {
        // other operate
      }, () => {
        ipc.send('custom-message', {
          msg: '失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>
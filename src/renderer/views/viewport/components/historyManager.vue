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
    <button 
      type="button" 
      class="subtitle-ctrl-btn bg-tint"  
      @click="clear"
    >
      清空
    </button>
  </span>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer as ipc } from 'electron'
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
      currentFile: null
    }
  },
  methods: {
    historyReset () {
    },
    saveSubtitles () {
      let subtitlesHistory = this.$DB.read().get('subtitlesHistory').value()
      console.log(this.currentFile, subtitlesHistory)
      if (this.currentFile === null || this.subtitleData.length === 0) {
        ipc.send('custom-message', {
          msg: '未选中文件或没有生成字幕',
          type: 'info'
        })
        return false
      }
      // if presence then override
      let isSave = this.deduplication(subtitlesHistory, this.currentFile.name)
      console.log(isSave)
      if (isSave !== null) {
        subtitlesHistory[isSave].subtitles = this.subtitleData
      } else {
        subtitlesHistory.push(
          {fileName: this.currentFile.name, subtitles: this.subtitleData}
        )
      }
      this.$DB.read().set('subtitlesHistory', subtitlesHistory).write()
    },
    clear () {
      this.$DB.read().set('subtitlesHistory', []).write()
    },
    deduplication (subtitlesHistory, fileName) {
      let subtitleslength = subtitlesHistory.length
      const index = null
      for (let index = 0; index < subtitleslength; index++) {
        if (subtitlesHistory[index].fileName === fileName) {
          return index
        }
      }
      return index
    }
  }
}
</script>

<style>

</style>
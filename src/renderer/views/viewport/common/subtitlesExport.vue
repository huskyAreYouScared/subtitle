<!-- assExport -->
<template>
   <button type="button" class="subtitle-ctrl-btn bg-tint text"  @click="exportSubtitle">{{fileType}}</button>
</template>

<script>
import { fsWriteStream } from '@/utils/fs'
import { suffixCtrl } from '@/utils/tools'
import { ipcRenderer as ipc } from 'electron'
import { mapState } from 'vuex'
export default {
  components: {},
  props: {
    subtitleData: {
      type: Array,
      default: function () {
        return []
      }
    },
    fileType: {
      type: String,
      default: 'ass'
    }
  },
  data: () => {
    return {
      splitDuration: 0
    }
  },
  computed: {
    ...mapState(['duration', 'currentTime', 'loading']),
    videoDuration () {
      return this.duration.duration.duration
    }
  },
  methods: {
    exportSubtitle () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {
          msg: '还没有字幕，请先生成字幕',
          type: 'info'
        })
        return
      }
      ipc.send('save-file-dialog', this.fileType)
    },
    ipcInit () {
      ipc.on(`save-${this.fileType}-file`, (event, file) => {
        let path = suffixCtrl(file.filePath, this.fileType)
        fsWriteStream(path, this.subtitleData, this.fileType, this.splitDuration, this.videoDuration).then(res => {
          ipc.send('custom-message', {
            msg: '成功',
            type: 'info'
          })
        }, () => {
          ipc.send('custom-message', {
            msg: '失败',
            type: 'error'
          })
        })
      })
    }
  },
  mounted () {
    this.ipcInit()
    this.splitDuration = parseInt(this.$DB.read().get('subtitleConfig').value().splitDuration)
  }
}
</script>
<style lang='scss' scoped>

</style>
<!-- assExport -->
<template>
   <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="exportAssSubtitle()">ass</button>
</template>

<script>
import { fsWriteStream } from '@/utils/fs'
import { suffixCtrl } from '@/utils/tools'
import { ipcRenderer as ipc } from 'electron'
export default {
  components: {},
  props: {
    subtitleData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: () => {
    return {
      fileType: 'ass'
    }
  },
  methods: {
    exportAssSubtitle () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {
          msg: '还没有字幕，请先生成字幕',
          type: 'info'
        })
        return
      }
      ipc.send('save-ass-file-dialog')
    },
    ipcInit () {
      ipc.on('save-ass-file', (event, file) => {
        let path = suffixCtrl(file.filePath, this.fileType)
        fsWriteStream(path, this.subtitleData, this.fileType).then(res => {
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
  }
}
</script>
<style lang='scss' scoped>

</style>
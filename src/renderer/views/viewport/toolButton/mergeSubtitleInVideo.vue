<template>
  <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="mergeSubtitleInVideo()">合成</button>
</template>

<script>

import { ipcRenderer as ipc } from 'electron'
import { mapState, mapMutations } from 'vuex'
import { joinAssFile, suffixCtrl } from '@/utils/tools'
import fs from 'fs'
import os from 'os'

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
    ...mapState(['filePath']),
    filePathStore () {
      return this.filePath.filePath.path
    }
  },
  methods: {
    ...mapMutations(['setLoading']),
    mergeSubtitleInVideo () {
      if (this.subtitleData.length === 0) {
        ipc.send('custom-message', {
          msg: '还没有字幕，请先生成字幕',
          type: 'info'
        })
        return
      }
      ipc.send('save-video-file-dialog')
    },
    init () {
      ipc.on('save-video-file', (event, file) => {
        this.setLoading(true)
        let subtitleConetnt = joinAssFile(this.subtitleData)
        let path = suffixCtrl(file.filePath, 'ass')
        console.log(path)
        let subtitlePath = ''
        fs.writeFile(path, subtitleConetnt, {flag: 'w'}, async (err, data) => {
          // windows path Transfer ':'

          if (!err) {
            try {
              // await this.$exec(`${this.$ffmpegPath} -y -i ${path} ${path.replace(/srt$/,'ass')}`)
              if (os.platform() === 'win32') {
                // issuse https://superuser.com/questions/1251296/get-error-while-adding-subtitles-with-ffmpeg
                subtitlePath = path.replace(/\\/g, '/').replace(/:/g, '\\:')
                // .replace(/srt$/,'ass')
              } else {
                subtitlePath = path
              }
              await this.$exec(`"${this.$ffmpegPath}" -y -i "${this.filePathStore}" -vf "subtitles='${subtitlePath}'" "${file.filePath}"`)
              ipc.send('custom-message', {
                msg: '完成，请查收',
                type: 'info'
              })
              this.setLoading(false)
            } catch (error) {
              this.setLoading(false)
              ipc.send('custom-message', {
                msg: '生成失败，请稍后再是，如果持续失败，请重启软件，或者在关于中找到问题反馈与作者联系，谢谢您，为了更好的软件而努力',
                type: 'error'
              })
            }
          }
        })
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
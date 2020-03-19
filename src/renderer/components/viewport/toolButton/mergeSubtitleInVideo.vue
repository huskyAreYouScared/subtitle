<template>
  <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="mergeSubtitleInVideo()">合成</button>
</template>

<script>
import { ipcRenderer as ipc} from 'electron'
import { mapState } from 'vuex'
import { joinSrtFlie } from '@/utils/tools'
import fs from 'fs'
export default {
  props:{
    subtitleData:{
      type:Array,
      default:function(){
        return []
      }
    },
  },
  computed: {
    ...mapState(['filePath'])
  },
  methods:{
    mergeSubtitleInVideo(){
      if(this.subtitleData.length==0){
        ipc.send('custom-message', {
          msg: '还没有字幕，请先生成字幕',
          type: 'info'
        })
        return
      }
      ipc.send('save-video-file-dialog')
    },
    suffixCtrl (path) {
      let pathTempArr = path.split('.')
      // 因为默认给bcc文件后缀，所以只判断了srt文件
      pathTempArr[pathTempArr.length - 1] = 'srt'
      return pathTempArr.join('.')
    },
    init(){
      ipc.on('save-video-file', (event, file) => {
        let subtitleConetnt = joinSrtFlie(this.subtitleData)
        let path = this.suffixCtrl(file.filePath)
        fs.writeFile(path, subtitleConetnt, {flag: 'w'}, async(err, data) => {
          if (!err) {
            try {
              const { stdout, stderr } = await this.$exec(`${this.$ffmpegPath} -y  -i ${this.filePath.filePath.path} -vf subtitles='${path}' '${file.filePath}' `)
              if(stdout){
                ipc.send('custom-message', {
                  msg: '完成，请查收',
                  type: 'error'
                })
              }
            } catch (error) {
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
  mounted(){
    this.init()
  }
}
</script>

<style>

</style>
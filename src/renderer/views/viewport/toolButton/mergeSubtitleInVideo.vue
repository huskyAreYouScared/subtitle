<template>
  <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="mergeSubtitleInVideo()">合成</button>
</template>

<script>
import { ipcRenderer as ipc} from 'electron'
import { mapState,mapMutations } from 'vuex'
import { joinSrtFlie } from '@/utils/tools'
import fs from 'fs'
import os from 'os'

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
    ...mapState(['filePath']),
    filePathStore(){
      return this.filePath.filePath.path
    }
  },
  methods:{
    ...mapMutations(['setLoading']),
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
        this.setLoading(true)
        let subtitleConetnt = joinSrtFlie(this.subtitleData)
        let path = this.suffixCtrl(file.filePath)
        let subtitlePath = ''
        fs.writeFile(path, subtitleConetnt, {flag: 'w'}, async(err, data) => {
          // windows path Transfer ':'
          
          if (!err) {
            try {
              // await this.$exec(`${this.$ffmpegPath} -y -i ${path} ${path.replace(/srt$/,'ass')}`)
              if(os.platform() === 'win32' ){
                // issuse https://superuser.com/questions/1251296/get-error-while-adding-subtitles-with-ffmpeg
                subtitlePath = path.replace(/\\/g,'/').replace(':','\\:')
                // .replace(/srt$/,'ass')
              }else{
                subtitlePath = path
              }
              const { stdout, stderr } = await this.$exec(`${this.$ffmpegPath} -y -i ${this.filePathStore} -vf "subtitles='${subtitlePath}'" ${file.filePath}`)
              ipc.send('custom-message', {
                msg: '完成，请查收',
                type: 'info'
              })
              this.setLoading(false)
            } catch (error) {
              this.setLoading(false)
              console.log(error)
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
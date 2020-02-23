<template>
  <div style="width:100%">
    <div>
      <button type="button" @click="splitStep">语音识别</button>
      <div class="srt-container">
        <p v-for="audioItem in srtObjTemp" :key="audioItem.index">
          <span>{{audioItem.index}}</span><br/><span>{{audioItem.start}}-->{{audioItem.end}}</span><br/>
          <span>{{audioItem.value}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {speech as AipSpeechClient} from 'baidu-aip-sdk'
import fs from 'fs'
export default {
  data () {
    return {
      srtObjTemp:[], // 切分信息数组
      splitState:true, // 切分状态
      splitStartTimeHours:0,
      splitStartTimeMinutes:0,
      splitStartTimeSeconds:0,
      fileIndex:1, // 文件索引
      recognizeIndex:1, // 识别索引
      splitDuration:10, // * 切分持续时间
      client:null // * baiduapi instance
    }
  },
  methods: {
    splitStep(){
      this.splitStateCtrl(true)
      this.newTempFolder(`${this.$objectPath}/temp/wav`)
      this.splitAudio()
    },
    splitAudio(){
      console.log(this.doubleNumberCtrl());
      
        this.$exec(`${this.$ffmpegPath} -y -ss ${this.doubleNumberCtrl()} -i ${this.$objectPath}/temp/output.wav  -t ${this.splitDuration} -c copy ${this.$objectPath}/temp/wav/output_${this.fileIndex}.wav -hide_banner `, (error, stdout, stderr) => {
          // 如果返回结果位true代表已经没有音频了
          if(/audio:0kB/.test(stderr)){
            this.splitStateCtrl(false)
          }
          if(this.splitState){
            // 文件名加1
            this.srtTiemLineCtrl(this.fileIndex,this.doubleNumberCtrl(),'start',`output_${this.fileIndex}.wav`)
            this.startTimeCtrl(this.splitDuration)
            this.srtTiemLineCtrl(this.fileIndex,this.doubleNumberCtrl(),'end')
            this.splitAudio()
            this.fileIndex++
          }else{
            this.aiAudio()
          }
        })
    },
    splitStateCtrl(state){
      this.splitState = state
    },
    newTempFolder(path){
      let files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          fs.unlinkSync(curPath); //删除文件
      });
      fs.mkdir(path,(err,data)=>{

      })
    },
    startTimeCtrl(duration){
      if(duration>this.splitDuration){
        return
      }
      if((this.splitStartTimeSeconds+duration)>=60){
        this.splitStartTimeMinutes++
        this.splitStartTimeSeconds=this.splitStartTimeSeconds+duration -60
      }else{
        this.splitStartTimeSeconds+=duration
      }
      if((this.splitStartTimeMinutes)>=60){
        this.splitStartTimeHours++
        this.splitStartTimeMinutes = 0
      }
    },
    // 将时间日期处理成 00:00:00的格式
    doubleNumberCtrl(){
      let seconds = ''
      let minutes = ''
      let hours = ''
      if(this.splitStartTimeSeconds<9){
        seconds = `0${this.splitStartTimeSeconds}`
      }else{
         seconds = `${this.splitStartTimeSeconds}`
      }
      if(this.splitStartTimeMinutes<9){
        minutes = `0${this.splitStartTimeMinutes}`
      }else{
         minutes = `${this.splitStartTimeMinutes}`
      }
      if(this.splitStartTimeHours<9){
        hours = `0${this.splitStartTimeHours}`
      }else{
         hours = `${this.splitStartTimeHours}`
      }
      return `${hours}:${minutes}:${seconds}`
    },
    /**
     * @param current 数组索引
     * @param TimeLine 转换成00:00:00的时间线
     * @param type 'start'或者 'end' 开始时间线或者结束时间线
     * @param fileName 音频文件名
     */
    srtTiemLineCtrl(current,TimeLine,type,fileName){
      if(type=='start'){
        this.srtObjTemp.push({
          index:current,
          start:TimeLine,
          end:'',
          value:'',
          audioFlieName:fileName
        })
      }else{
        this.srtObjTemp[current-1].end = TimeLine
      }
    },
    aiAudio () {
      // 设置APPID/AK/SK
      var APP_ID = '18336046'
      var API_KEY = 'CX7HpOECibS7wIGKXlAyxVA8'
      var SECRET_KEY = 'TFngd3UfhsdN0NnBm4koUVyeQd67RlGK'
      this.recognizeIndex = 1
      // 新建一个对象，建议只保存一个对象调用服务接口
       this.client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY)
      this.recognize()
      
    },
    recognize(){
      fs.readFile(`${this.$objectPath}/temp/wav/output_${this.recognizeIndex}.wav`,(err,data)=>{
        let voiceBuffer = new Buffer(data)

        // 识别本地文件
        this.client.recognize(voiceBuffer, 'wav', 16000).then( (result)=> {
          console.log(`<recognize>:${this.recognizeIndex} ` + JSON.stringify(result))
          if(this.recognizeIndex<this.srtObjTemp.length){
            this.recognizeIndex++
            this.recognize()
          }else{
            alert('over')
          }
        }, function (err) {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style>

</style>
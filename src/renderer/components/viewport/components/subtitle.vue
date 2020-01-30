<template>
  <div style="width:100%">
    <div>
      <button type="button" @click="aiAudio">语音识别</button>
    </div>
  </div>
</template>

<script>
import {speech as AipSpeechClient} from 'baidu-aip-sdk'
import fs from 'fs'
export default {
  data(){
    return{

    }
  },
  methods:{
    avd(){
      // let audioFilename = `${this.$objectPath}/temp/output.pcm`
      // const timeline = []
      // const inputStream = fs.createReadStream(audioFilename)
      // const vadStream = VAD.createStream({
      //   mode: VAD.Mode.NORMAL, // VAD mode, see above
      //   audioFrequency: 16000, // Audiofrequency, see above
      //   debounceTime: debounceTime // Time for debouncing speech active state, default 1 second
      // })
      // let index = 0
      // let sliceBufferList = []

      // const task = (resolve) => inputStream.pipe(vadStream).on('data', async (data) => {
      //   const { speech, audioData } = data
      //   const { start, end, state, startTime, duration } = speech

      //   if (start) {
      //     info(`开始说话, 开始时间: ${startTime}`)

      //     sliceBufferList.push(audioData)

      //     return
      //   }

      //   if (end) {
      //     info(`停止说话, 开始时间: ${startTime}, 时长: ${duration}`)

      //     index++

      //     const sliceFilename = path.resolve(sliceDir, `./${index}-${startTime}-${duration}.pcm`)
      //     const sliceBuffer = Buffer.concat(sliceBufferList)

      //     info(`写入slice文件: ${sliceFilename}`)
      //     fs.writeFileSync(sliceFilename, sliceBuffer)
      //     timeline.push({
      //       filename: sliceFilename,
      //       startTime,
      //       duration
      //     })
      //     sliceBufferList = []

      //     return
      //   }

      //   if (state) {
      //     sliceBufferList.push(audioData)
      //   }
      // }).on('end', () => {
      //   info('vad切分结束\n')
      //   resolve()
      // })
    },
    aiAudio(){

      // 设置APPID/AK/SK
      var APP_ID = "18336046";
      var API_KEY = "CX7HpOECibS7wIGKXlAyxVA8";
      var SECRET_KEY = "TFngd3UfhsdN0NnBm4koUVyeQd67RlGK";

      // 新建一个对象，建议只保存一个对象调用服务接口
      var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
      
      let voice = fs.readFileSync(`${this.$objectPath}/temp/output.wav`);
      console.log(`${this.$objectPath}/temp/output.wav`);
      
      let voiceBuffer = new Buffer(voice);

      // 识别本地文件
      client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
          console.log('<recognize>: ' + JSON.stringify(result));
      }, function(err) {
          console.log(err);
      });

    }
  }
}
</script>

<style>

</style>
<!--  -->
<template>
  <div class='setting-main bg-alpha'>
    <div class="round-area">
      <details class="header text">
        <summary>设置语音识别基础参数</summary>
        <label for="" class="text input-label">云服务商:</label>
        <select v-model="recognitionSetting.service" class="setting-input text" @change="changeService">
          <option :value ="serviceItem.value" v-for="(serviceItem,index) in serviceList" :key="index">{{serviceItem.name}}</option>
        </select>
        <br>
        <div v-if="formConfig.isRegion">
          <label for="" class="text input-label">选择大区:</label>
          <select  v-model="recognitionSetting.region" class="setting-input text">
            <option :value ="regionItem.value" v-for="(regionItem,index) in regionList" :key="index">{{regionItem.name}}</option>
          </select>
          <br>
        </div>
        <div v-if="formConfig.isLanguage">
          <label for="" class="text input-label">语种选择:</label>
          <select  v-model="recognitionSetting.language" class="setting-input text">
            <option :value ="languageItem.value" v-for="(languageItem,index) in languageList[recognitionSetting.service]" :key="index">{{languageItem.name}}</option>
          </select>
          <br>
        </div>
        <label for="" class="text input-label">{{formConfig.appIdName}}:</label>
        <input v-model="recognitionSetting.APP_ID" :type="recognitionSetting.appIdInputType" class="setting-input text">
        <i class="iconfont close-icon" 
          :class="{'icon-biyanjing':recognitionSetting.appIdInputType === 'password','icon-yanjing':recognitionSetting.appIdInputType === 'text'}" 
          @click="toggleDisplay('appIdInputType')"></i>
        <br>
        <label for="" class="text input-label">{{formConfig.apiKeyName}}:</label>
        <input v-model="recognitionSetting.API_KEY" :type="recognitionSetting.keyInputType" class="setting-input text">
        <i class="iconfont close-icon" 
          :class="{'icon-biyanjing':recognitionSetting.keyInputType === 'password','icon-yanjing':recognitionSetting.keyInputType === 'text'}" 
          @click="toggleDisplay('keyInputType')"></i>
        <br>
        <div v-if="formConfig.isSecret">
          <label for="" class="text input-label">{{formConfig.secretKeyName}}:</label>
          <input v-model="recognitionSetting.SECRET_KEY" :type="recognitionSetting.secretInputType" class="setting-input text">
          <i class="iconfont close-icon" 
            :class="{'icon-biyanjing':recognitionSetting.secretInputType === 'password','icon-yanjing':recognitionSetting.secretInputType === 'text'}" 
            @click="toggleDisplay('secretInputType')"></i>
          <br>
        </div>
      </details>
    </div>
    <div class="round-area">
      <p class="header text">字幕-视频-配置</p>
      <label for="" class="text input-label">自定义语音切割时间（建议以10s作为分割时长，分割时长不能超过30s）:</label>
      <input v-model="subtitleConfig.splitDuration" maxlength="2" class="setting-input text">
      <br>
      <label for="" class="text input-label">视频质量（1代表无损（不压缩），数值越大视频质量越差）：</label>
      <input v-model="subtitleConfig.videoQuality" type="range" min="1" max="51" class="setting-input text">
      <span class="input-display-text text" >{{subtitleConfig.videoQuality}}</span>
    </div>
    <div class="round-area">
      <functionConfig/>
    </div>
    <history/>
    <div class="back-btn text" @click="closeDialog('setting')">返回(back)</div>
    <div class="save-btn text" @click="saveSetting">保存(save)</div>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import history from './components/history'
import functionConfig from './components/functionConfig'
export default {
  components: {
    history,
    functionConfig
  },
  data () {
    return {
      recognitionSetting: {
        APP_ID: '',
        API_KEY: '',
        SECRET_KEY: '',
        service: '',
        region: '',
        language: '',
        appIdInputType: 'text',
        keyInputType: 'text',
        secretInputType: 'password'
      },
      subtitleConfig: {
        splitDuration: '',
        videoQuality: 0
      },
      languageList: {
        baidu: [
          {
            name: '普通话(纯中文识别)',
            value: 1537
          },
          {
            name: '英语',
            value: 1737
          },
          {
            name: '粤语',
            value: 1637
          },
          {
            name: '四川话',
            value: 1537
          }
        ]
      },
      regionList: [
        {
          name: '华东地区（上海）',
          value: 'ap-shanghai'
        },
        {
          name: '华北地区（北京）',
          value: 'ap-beijing'
        },
        {
          name: '西南地区（重庆）',
          value: 'ap-chongqing'
        },
        {
          name: '华南地区（广州）',
          value: 'ap-guangzhou'
        }
      ],
      serviceList: [
        {
          name: '百度云',
          value: 'baidu'
        },
        {
          name: '腾讯云',
          value: 'tencent'
        },
        {
          name: '讯飞云',
          value: 'xunfei'
        },
        {
          name: '天翼云',
          value: 'tianyi'
        }
      ],
      formConfig: {
        isRegion: false,
        appIdName: '',
        apiKeyName: '',
        secretKeyName: '',
        isSecret: true
      }
    }
  },
  computed: {},
  watch: {
    subtitleConfig: {
      handler: function () {
        if (parseInt(this.subtitleConfig.splitDuration) > 30) {
          this.subtitleConfig.splitDuration = 30
          ipc.send('custom-message', {
            msg: '语音分割时间不能够超过30s',
            type: 'info'
          })
        }
      },
      deep: true
    }
  },
  methods: {
    setArgument () {
      this.$DB.read().set('recognitionObject', this.recognitionSetting).write()
      this.$DB.read().set('subtitleConfig', this.subtitleConfig).write()
    },
    saveSetting () {
      this.setArgument()
      ipc.send('custom-message', { msg: '保存成功', type: 'info' })
    },
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    changeService () {
      this.changeForm(this.recognitionSetting.service)
    },
    toggleDisplay (inputName) {
      this.recognitionSetting[inputName] = this.recognitionSetting[inputName] === 'password' ? 'text' : 'password'
    },
    changeForm (serviceName) {
      if (serviceName === 'baidu') {
        this.formConfig = {isLanguage: true, isRegion: false, appIdName: 'App_id', apiKeyName: 'Api_Key', secretKeyName: 'SecretKey', isSecret: true}
      } else if (serviceName === 'tencent') {
        this.formConfig = {isLanguage: false, isRegion: true, appIdName: 'ProjectId', apiKeyName: 'SecretId', secretKeyName: 'SecretKey', isSecret: true}
      } else if (serviceName === 'xunfei') {
        this.formConfig = {isLanguage: false, isRegion: false, appIdName: 'APPID', apiKeyName: 'APIKey', secretKeyName: 'APISecret', isSecret: true}
      } else if (serviceName === 'tianyi') {
        this.formConfig = {isLanguage: false, isRegion: false, appIdName: 'APPID', apiKeyName: 'APIKey', secretKeyName: 'APISecret', isSecret: false}
      } else {
        this.formConfig = {isLanguage: false, isRegion: false, appIdName: 'App_id', apiKeyName: 'Api_Key', secretKeyName: 'SecretKey', isSecret: true}
      }
    },
    init () {
      this.subtitleConfig = this.$DB.read().get('subtitleConfig').value()
      this.recognitionSetting = this.$DB.read().get('recognitionObject').value()
      this.changeForm(this.recognitionSetting.service)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>

</style>
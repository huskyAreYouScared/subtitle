<!--  -->
<template>
  <div class='setting-main bg-alpha'>
    <div class="round-area">
      <p class="header text">设置语音识别基础参数:</p>
      <label for="" class="text input-label">云服务商:</label>
      <select v-model="recognitionSetting.service" class="baidu-input text" @change="changeService">
        <option :value ="serviceItem.value" v-for="(serviceItem,index) in serviceList" :key="index">{{serviceItem.name}}</option>
      </select>
      <br>
      <div v-if="formConfig.isRegion">
        <label for="" class="text input-label">选择大区:</label>
        <select  v-model="recognitionSetting.region" class="baidu-input text">
          <option :value ="regionItem.value" v-for="(regionItem,index) in regionList" :key="index">{{regionItem.name}}</option>
        </select>
        <br>
      </div>
      
      <label for="" class="text input-label">{{formConfig.appIdName}}:</label>
      <input v-model="recognitionSetting.APP_ID" type="text" class="baidu-input text">
      <br>
      <label for="" class="text input-label">{{formConfig.apiKeyName}}:</label>
      <input v-model="recognitionSetting.API_KEY" type="text" class="baidu-input text">
      <br>
      <div v-if="formConfig.isSecret">
        <label for="" class="text input-label">{{formConfig.secretKeyName}}:</label>
        <input v-model="recognitionSetting.SECRET_KEY" type="password" class="baidu-input text">
        <br>
      </div>
    </div>
    <div class="round-area">
      <p class="header text">字幕-视频-配置</p>
      <label for="" class="text input-label">自定义语音切割时间（建议以10s作为分割时长，分割时长不能超过30s）:</label>
      <input v-model="subtitleConfig.splitDuration" maxlength="2" class="baidu-input text">
      <br>
    </div>
    <div class="back-btn text" @click="closeDialog('setting')">返回(back)</div>
    <div class="save-btn text" @click="saveSetting">保存(save)</div>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
export default {
  components: {},
  data () {
    return {
      recognitionSetting: {
        APP_ID: '',
        API_KEY: '',
        SECRET_KEY: '',
        service: '',
        region: ''
      },
      subtitleConfig: {
        splitDuration: ''
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
      ipc.send('custom-message', {
        msg: '保存成功',
        type: 'info'
      })
    },
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    changeService () {
      this.changeForm(this.recognitionSetting.service)
    },
    changeForm (serviceName) {
      if (serviceName === 'baidu') {
        this.formConfig = {isRegion: false, appIdName: 'App_id', apiKeyName: 'Api_Key', secretKeyName: 'SecretKey', isSecret: true}
      } else if (serviceName === 'tencent') {
        this.formConfig = {isRegion: true, appIdName: 'ProjectId', apiKeyName: 'SecretId', secretKeyName: 'SecretKey', isSecret: true}
      } else if (serviceName === 'xunfei') {
        this.formConfig = {isRegion: false, appIdName: 'APPID', apiKeyName: 'APIKey', secretKeyName: 'APISecret', isSecret: true}
      } else if (serviceName === 'tianyi') {
        this.formConfig = {isRegion: false, appIdName: 'APPID', apiKeyName: 'APIKey', secretKeyName: 'APISecret', isSecret: false}
      } else {
        this.formConfig = {isRegion: false, appIdName: 'App_id', apiKeyName: 'Api_Key', secretKeyName: 'SecretKey', isSecret: true}
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
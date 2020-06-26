<template>
  <div class='setting-main bg-alpha'>
    <div class="round-area">
      <label for="" class="text input-label">布局模式:</label>
      <select v-model="layoutConfig.viewport" class="setting-input text" @change="viewportChange">
        <option :value ="viewportItem.value" v-for="(viewportItem,index) in viewportList" :key="index">{{viewportItem.name}}</option>
      </select>
      <themeColor :layoutConfig="layoutConfig" />
    </div>
    <div class="back-btn text" @click="closeDialog('view')">返回(back)</div>
    <div class="save-btn text" @click="saveSetting">保存(save)</div>
  </div>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'
import themeColor from './components/themeColor'
export default {
  components: {
    themeColor
  },
  data: function () {
    return {
      layoutConfig: {
        viewport: 'default',
        themeColor: '#f78fb3'
      },
      viewportList: [
        { value: 'default', name: '默认' },
        { value: 'timelineLayout', name: '时间轴模式' }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.layoutConfig = this.$DB.read().get('layoutConfig').value()
    },
    saveSetting () {
      this.setArgument()
      ipc.send('custom-message', { msg: '保存成功', type: 'info' })
      ipc.send('main-event', 'reload')
    },
    setArgument () {
      this.$DB.read().set('layoutConfig', this.layoutConfig).write()
    },
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    viewportChange () {
      ipc.send('custom-message', { msg: '切换布局模式将会重启软件，如果有未完成的工作，请不要点击保存，可以在无任务时在切换', type: 'info' })
    }
  }
}
</script>

<style>

</style>
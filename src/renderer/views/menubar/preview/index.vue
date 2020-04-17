<!--  -->
<template>
  <div class='setting-main bg-alpha'>
    <preview :assStyleConfig="assStyleConfig"/>
    <previewConfig @changeConfig="changeConfig"/>

    <div class="save-btn text" @click="saveAssStyle">保存(save)</div>
    <div class="back-btn text" @click="closeDialog('preview')">返回(back)</div>
  </div>
</template>

<script>
import previewConfig from './previewConfig'
import preview from './preview'
import { ipcRenderer as ipc } from 'electron'
export default {
  components: {
    previewConfig,
    preview
  },
  data () {
    return {
      assStyleConfig: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    changeConfig (assStyleConfig) {
      this.assStyleConfig = assStyleConfig
    },
    init () {

    },
    saveAssStyle () {
      this.$DB.read().set('assStyleConfig', this.assStyleConfig).write()
      ipc.send('custom-message', { msg: '保存成功', type: 'info' })
    }
  },
  mounted () {

  }
}
</script>

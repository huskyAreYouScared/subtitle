<!--  -->
<template>
  <div class='container menubar-container bg-deep'>
    <div class="menu-item text" @click="open('setting')">
      设置
    </div>
    <div class="menu-item text" @click="open('about')">
      关于
    </div>
    <div class="menu-item text" @click="open('preview')">
      预览
    </div>
    <div class="menu-item text menu-right-0" @click="mainEvent('quit')">
      <span class="iconfont icon-guanbi1"></span>
    </div>
    <div class="menu-item text menu-right-1" @click="mainEvent('maximize')">
      <span class="iconfont icon-zuidahua"></span>
    </div>
    <div class="menu-item text menu-right-2" @click="mainEvent('minimize')">
      <span class="iconfont icon-zuixiaohua"></span>
    </div>
    <setting v-if="settingDialog" @closeDialog="closeDialogEvent"/>
    <about v-if="aboutDialog" @closeDialog="closeDialogEvent"/>
    <preview v-if="previewDialog" @closeDialog="closeDialogEvent"/>
  </div>
</template>

<script>
import setting from './setting/setting'
import about from './about/about'
import preview from './preview'
import { ipcRenderer as ipc } from 'electron'
export default {
  components: {
    setting,
    about,
    preview
  },
  data () {
    return {
      settingDialog: false,
      aboutDialog: false,
      previewDialog: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    open (menubar) {
      switch (menubar) {
        case 'setting':
          this.settingDialog = true
          break
        case 'about':
          this.aboutDialog = true
          break
        case 'preview':
          this.previewDialog = true
          break
        default:
          break
      }
    },
    closeDialogEvent (menubar) {
      if (menubar === 'setting') {
        this.settingDialog = false
      } else if (menubar === 'about') {
        this.aboutDialog = false
      } else if (menubar === 'preview') {
        this.previewDialog = false
      }
    },
    mainEvent (mainEvent) {
      ipc.send('main-event', mainEvent)
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
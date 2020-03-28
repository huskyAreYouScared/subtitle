<!--  -->
<template>
  <div class='container menubar-container bg-deep'>
    <div class="menu-item text" @click="open('setting')">
      设置
    </div>
    <div class="menu-item text" @click="open('about')">
      关于
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
  </div>
</template>

<script>
import setting from './setting/setting'
import about from './about/about'
import { ipcRenderer as ipc } from 'electron'
export default {
  components: {
    setting,
    about
  },
  data () {
    return {
      settingDialog: false,
      aboutDialog: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    open (menubarItem) {
      switch (menubarItem) {
        case 'setting':
          this.settingDialog = true
          break
        case 'about':
          this.aboutDialog = true
          break
        default:
          break
      }
    },
    closeDialogEvent (menubarItem) {
      if (menubarItem === 'setting') {
        this.settingDialog = false
      } else if (menubarItem === 'about') {
        this.aboutDialog = false
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
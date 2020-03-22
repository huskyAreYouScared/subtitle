<!--  -->
<template>
  <div class='container menubar-container bg-deep'>
    <div class="menu-item text" @click="open('setting')">
      设置
    </div>
    <setting v-if="settingDialog" @closeDialog="closeDialogEvent"/>
  </div>
</template>

<script>
import setting from './setting/setting'
export default {
  components: {
    setting
  },
  data () {
    return {
      settingDialog: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    open (menubarItem) {
      if (menubarItem === 'setting') {
        this.settingDialog = true
      }
    },
    closeDialogEvent (menubarItem) {
      if (menubarItem === 'setting') {
        this.settingDialog = false
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
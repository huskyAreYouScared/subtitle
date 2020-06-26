<!-- theme color -->
<template>
  <div class=''>
    <label for="" class="text input-label">字体霓虹颜色:</label>
    <input type="color" class="setting-small-input" @change="changeTheme" v-model="layoutConfig.themeColor">
  </div>
</template>

<script>
export default {
  props: {
    layoutConfig: {
      default: function () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {
    changeTheme () {
      this.$DB.read().set('layoutConfig', this.layoutConfig).write()
      document.documentElement.style.setProperty('--neon-color', this.layoutConfig.themeColor)
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
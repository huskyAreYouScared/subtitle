<!--  -->
<template>
  <div class="preview-config-container">
    <div class="preview-config-item">
      <p class="text input-label">
        <i class="iconfont icon-stylelint_light text-lg"></i>
      </p>
      <label for="" class="text input-label">字体大小(px)</label>
      <input v-inputOnlyNumber v-model="assStyleConfig.fontSize" maxlength="2" class="setting-full-input text">
      <label for="" class="text input-label">字体颜色</label>
      <input v-model="assStyleConfig.color" type="color" class="setting-full-input text">
      <label for="" class="text input-label">描边大小(px)</label>
      <input v-inputOnlyNumber v-model="assStyleConfig.outLine" maxlength="1" class="setting-full-input text">
      <label for="" class="text input-label">描边颜色</label>
      <input v-model="assStyleConfig.outLineColor" type="color" class="setting-full-input text">
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      assStyleConfig: {
        fontSize: 16,
        color: '',
        outLine: 1,
        outLineBlur: 1,
        outLineColor: '#000'
      }
    }
  },
  computed: {},
  watch: {
    assStyleConfig: {
      handler: function () {
        this.$emit('changeConfig', this.assStyleConfig)
      },
      deep: true
    }
  },
  methods: {
    init () {
      this.assStyleConfig = this.$DB.read().get('assStyleConfig').value()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>
.body{
  text-shadow: 2px 2px rgb(250, 7, 7);
}
</style>
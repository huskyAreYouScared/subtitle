<!--  -->
<template>
  <div class="preview-config-container">
    <div class="preview-config-item">
      <p class="text input-label">
        <i class="iconfont icon-stylelint_light text-lg"></i>
      </p>
      <label for="" class="text input-label">字体大小(px)</label>
      <input v-inputOnlyNumber v-model="subtitleConfig.fontSize" maxlength="2" class="setting-full-input text">
      <label for="" class="text input-label">字体颜色</label>
      <input v-model="subtitleConfig.color" type="color" class="setting-full-input text">
      <label for="" class="text input-label">描边大小(px)</label>
      <input v-inputOnlyNumber v-model="subtitleConfig.textBorderWidth" maxlength="1" class="setting-full-input text">
      <label for="" class="text input-label">描边颜色</label>
      <input v-model="subtitleConfig.textBorderColor" type="color" class="setting-full-input text">
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      subtitleConfig: {
        fontSize: 16,
        color: '',
        textBorderWidth: 1,
        textBorderBlur: 1,
        textBorderColor: '#000'

      },
      addPXUnitAttribute: [
        'fontSize'
      ]
    }
  },
  computed: {},
  watch: {
    subtitleConfig: {
      handler: function () {
        // add px unit
        let processStyle = this.addPxUnit(this.subtitleConfig, this.addPXUnitAttribute)
        // textShadow also known as textStroke
        // processStyle['-webkit-text-stroke'] = this.textStrokeProcess(processStyle)
        processStyle['text-shadow'] = this.textStrokeProcess(processStyle)
        console.log(processStyle)
        this.$emit('changeConfig', processStyle)
      },
      deep: true
    }
  },
  methods: {
    addPxUnit (data, attributes) {
      let tempData = JSON.parse(JSON.stringify(data))
      attributes.forEach(attr => {
        tempData[attr] = tempData[attr] + 'px'
      })
      return tempData
    },
    textStrokeProcess (data) {
      // return `${data.textBorderWidth}px ${data.textBorderWidth}`
      return `0 ${data.textBorderWidth}px ${Math.round(data.textBorderWidth / 1.5)}px ${data.textBorderColor}, 
      ${data.textBorderWidth}px 0 ${Math.round(data.textBorderWidth / 1.5)}px ${data.textBorderColor},
      -${data.textBorderWidth}px 0 ${Math.round(data.textBorderWidth / 1.5)}px ${data.textBorderColor},
      0 -${data.textBorderWidth}px ${Math.round(data.textBorderWidth / 1.5)}px ${data.textBorderColor}`
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>
.body{
  text-shadow: 2px 2px rgb(250, 7, 7);
}
</style>
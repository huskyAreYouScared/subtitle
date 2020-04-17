<!--  -->
<template>
  <div class='preview-container '>
    <p :style="processAssStyleConfig" class="adjustPosition">test,中文测试！</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    assStyleConfig: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      addPXUnitAttribute: [
        'fontSize'
      ]
    }
  },
  computed: {
    processAssStyleConfig () {
      let processStyle = null
      // add px unit
      if (this.assStyleConfig !== null) {
        processStyle = this.addPxUnit(this.assStyleConfig, this.addPXUnitAttribute)
        // textShadow also known as textStroke
        // processStyle['-webkit-text-stroke'] = this.textStrokeProcess(processStyle)
        processStyle['text-shadow'] = this.textStrokeProcess(processStyle)
      }
      return processStyle
    }
  },
  watch: {},
  methods: {
    addPxUnit (data, attributes) {
      let tempData = JSON.parse(JSON.stringify(data))
      attributes.forEach(attr => {
        tempData[attr] = tempData[attr] + 'px'
      })
      return tempData
    },
    textStrokeProcess (data) {
      // return `${data.outLine}px ${data.outLine}`
      return `0 ${data.outLine}px ${Math.round(data.outLine / 1.5)}px ${data.outLineColor}, 
      ${data.outLine}px 0 ${Math.round(data.outLine / 1.5)}px ${data.outLineColor},
      -${data.outLine}px 0 ${Math.round(data.outLine / 1.5)}px ${data.outLineColor},
      0 -${data.outLine}px ${Math.round(data.outLine / 1.5)}px ${data.outLineColor}`
    }
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
<!--  -->
<template>
  <div class='viewport-container col-lg-11 col-md-11 col-sm-11 col-xs-11'>
    <defaultLayout v-if="layoutConfig&&layoutConfig.viewport === 'default'" />
    <timelineLayout v-else-if="layoutConfig&&layoutConfig.viewport === 'timelineLayout'" />
  </div>
</template>

<script>
import defaultLayout from './defaultLayout'
import timelineLayout from './timelineLayout'
export default {
  components: {
    defaultLayout,
    timelineLayout
  },
  data () {
    return {
      layoutConfig: null
    }
  },
  methods: {
    init () {
      this.layoutConfig = this.$DB.read().get('layoutConfig').value()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>

</style>
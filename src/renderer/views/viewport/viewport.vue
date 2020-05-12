<!--  -->
<template>
  <div class='viewport-container col-lg-11 col-md-11 col-sm-11 col-xs-11'>
    <defaultLayout v-if="layoutConfig === null || layoutConfig.viewport === 'default'" />
  </div>
</template>

<script>
import defaultLayout from './defaultLayout/index'
export default {
  components: {
    defaultLayout
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
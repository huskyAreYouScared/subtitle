<!--  -->
<template>
  <div class='preview-container '>
    <p :style="subtitleConfig" class="adjustPosition">test,中文测试！</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    subtitleConfig: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>

</style>
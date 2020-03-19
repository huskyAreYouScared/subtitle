<!-- 首页 -->
<template>
  <div class='row'>
    <sidebar/>
    <viewport/>
  </div>
</template>

<script>
import sidebar from '@/views/sidebar/sidebar'
import viewport from '@/views/viewport/viewport'

export default {
  components: {
    sidebar,
    viewport
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
<!-- 首页 -->
<template>
  <div class='row'>
    <sidebar/>
    <viewport/>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar/sidebar'
import viewport from '@/components/viewport/viewport'

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
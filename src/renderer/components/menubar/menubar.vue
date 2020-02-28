<!--  -->
<template>
  <div class='container menubar-container bg-deep'>
    <div class="menu-item text" @click="goto('/setting')">
      设置
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {
    goto(path){
      this.$router.push(path)
    }
  },
  mounted () {
    
  }
}
</script>
<style lang='scss' scoped>

</style>
<!-- assExport -->
<template>
   <button type="button" class="subtitle-ctrl-btn bg-tint"  @click="exportAssSubtitle()">ass</button>
</template>

<script>
export default {
  components: {},
  props: {
    subtitleData: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
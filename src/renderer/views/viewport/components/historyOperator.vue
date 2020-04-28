<template>
  <div class="history-container">
    <button type="button" class="subtitle-ctrl-btn bg-tint text" @dblclick="clearHistoryAndReset"  @click="reset">上一步({{number}})</button>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      default: 0,
      type: Number
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    },
    clearHistoryAndReset () {
      this.$emit('clearHistoryAndReset')
    }
  }
}
</script>

<style>

</style>
<template>
  <span>
    <button
      v-if="subtitleData.length > 0 && currentIndex !== subtitleData.length - 1"
      type="button" 
      class="subtitle-ctrl-btn bg-tint text"  
      @click="next"
    >
      下一个
    </button>
    <button
      v-if="currentIndex !== 0"
      type="button" 
      class="subtitle-ctrl-btn bg-tint text"  
      @click="last"
    >
      上一个
    </button>
  </span>
</template>

<script>
export default {
  props: {
    subtitleData: {
      type: Array,
      default: function () {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    last () {
      this.$emit('updateIndex', this.currentIndex - 1)
    },
    next () {
      this.$emit('updateIndex', this.currentIndex + 1)
    }
  }
}
</script>

<style>

</style>
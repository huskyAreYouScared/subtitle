<!-- display subtitles item and time and start time -->
<template>
  <div class='srt-timeline-show-box' v-if="subtitleData.length > 0">
    <input disabled type="text" v-model="subtitleData[currentIndex].start" />
    <span class="text">~</span>
    <input disabled type="text" v-model="subtitleData[currentIndex].end" />
  </div>
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
    },
    currentIndex: {
      type: Number,
      default: 0
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
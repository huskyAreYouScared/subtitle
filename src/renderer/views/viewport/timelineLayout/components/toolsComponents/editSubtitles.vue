<!-- edit subtitles -->
<template>
  <div class='edit-subtitles-box'>
    <textarea class="edit-textarea" 
    v-if="subtitleData.length > 0" 
    v-model="subtitleData[currentIndex].value" type="text"/>
  </div>
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
  components: {},
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
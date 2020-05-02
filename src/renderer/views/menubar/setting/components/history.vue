<!-- select history -->
<template>
  <div class="round-area" v-if="histortySubtitles.length !== 0">
    <p class="header text">字幕历史记录</p>
    <br>
    <div class="round-area round-60" v-for="(subtitlesItem, subtitlesIndex) in histortySubtitles" :key="subtitlesIndex">
      <p class="header text">
        {{subtitlesItem.fileName}}
        <span class="iconfont icon-guanbi1 text-align-right" @click="deleteSubtitles(subtitlesIndex)"></span>
      </p>
    </div>
    <div v-if="histortySubtitles.length === 0">
      <p class="header text">
        暂无记录
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      histortySubtitles: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    clear () {
      this.$DB.read().set('subtitlesHistory', []).write()
    },
    deleteSubtitles (index) {
      this.histortySubtitles.splice(index, 1)
      this.$DB.read().set('subtitlesHistory', this.histortySubtitles).write()
    }
  },
  mounted () {
    this.histortySubtitles = this.$DB.read().get('subtitlesHistory').value()
  }
}
</script>
<style lang='scss' scoped>

</style>
<template>
  <div class="tl-timeline-container">
    <section class="subtitle-ctrl-container">
      <createSubtitles @updateSubtitles="updateSubtitles" />
    </section>
    <subtitlesTrack :data="subtilesList" />
  </div>
</template>

<script>
import createSubtitles from './toolBtn/createSubtitles'
import subtitlesTrack from './track'
export default {
  components: {
    subtitlesTrack,
    createSubtitles
  },
  data: function () {
    return {
      subtilesList: []
    }
  },
  methods: {
    updateSubtitles (data) {
      this.subtilesList = data
    }
  }
}
</script>

<style>
</style>
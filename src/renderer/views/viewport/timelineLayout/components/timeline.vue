<template>
  <div class="tl-timeline-container">
    <section class="subtitle-ctrl-container">
      <createSubtitles @updateSubtitles="updateSubtitles" />
      <subtitlesExport fileType="srt" :subtitleData="subtilesList"/>
      <subtitlesExport fileType="bcc" :subtitleData="subtilesList"/>
      <subtitlesExport fileType="ass" :subtitleData="subtilesList"/>
      <historyManager :subtitleData="subtilesList"/>
      <mergeSubtitleInVideo :subtitleData="subtilesList"/>
      <lastOrNext @updateIndex="updateIndex" :subtitleData="subtilesList" :currentIndex="currentSubtitlesIndex" />
    </section>
    <subtitlesTrack :subtitleData="subtilesList" :currentIndex="currentSubtitlesIndex" @selectChunk="currentSelectChunk" />
    <srtShow :subtitleData="subtilesList" :currentIndex="currentSubtitlesIndex" />
    <editSubtitles :subtitleData="subtilesList" :currentIndex="currentSubtitlesIndex" />
    
  </div>
</template>

<script>
import mergeSubtitleInVideo from '@/views/viewport/common/mergeSubtitleInVideo'
import historyManager from '@/views/viewport/common/historyManager'
import subtitlesExport from '@/views/viewport/common/subtitlesExport'
import createSubtitles from './toolsComponents/createSubtitles'
import subtitlesTrack from './toolsComponents/track'
import editSubtitles from './toolsComponents/editSubtitles'
import lastOrNext from './toolsComponents/lastOrNext'
import srtShow from './toolsComponents/srtShow'
export default {
  components: {
    subtitlesTrack,
    createSubtitles,
    historyManager,
    mergeSubtitleInVideo,
    subtitlesExport,
    editSubtitles,
    srtShow,
    lastOrNext
  },
  data: function () {
    return {
      subtilesList: [],
      currentSubtitlesIndex: 0
    }
  },
  methods: {
    updateSubtitles (data) {
      this.subtilesList = data
    },
    currentSelectChunk (subtitlesIndex) {
      this.currentSubtitlesIndex = subtitlesIndex
    },
    updateIndex (updateIndex) {
      this.currentSubtitlesIndex = updateIndex
    }
  }
}
</script>

<style>
</style>
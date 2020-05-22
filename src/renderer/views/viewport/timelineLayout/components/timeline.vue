<template>
  <div class='tl-timeline-container'>
    <section class='subtitle-ctrl-container'>
      <createSubtitles/>
    </section>
    <subtitlesTrack :data="subtitleObj" />
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
      subtitleObj: [
        {
          index: 1,
          start: '00:00:00,000',
          end: '00:00:10,000',
          value: '在一瞬间，英语白龙哥哥可以对。',
          audioFlieName: 'output_1.wav',
          startSecond: 0,
          endSecond: 8,
          size: 323584
        },
        {
          index: 2,
          start: '00:00:10,000',
          end: '00:00:20,000',
          value: '相亲，你知道吗？必须的对啊，因为你我们回不去了。',
          audioFlieName: 'output_2.wav',
          startSecond: 10,
          endSecond: 18,
          size: 319488
        },
        {
          index: 3,
          start: '00:00:20,000',
          end: '00:00:28,000',
          value: '我们学校哎呀，那你买两斤看看，就看爱就爱吧，这样。',
          audioFlieName: 'output_3.wav',
          startSecond: 20,
          endSecond: 28,
          size: 248832
        }
      ]
    }
  }
}
</script>

<style>
</style>
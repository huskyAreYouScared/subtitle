<!--  -->
<template>
  <div class='setting-main bg-alpha'>
    <preview :subtitleConfig="subtitleConfig"/>
    <previewConfig @changeConfig="changeConfig"/>

    <div class="back-btn text" @click="closeDialog('preview')">返回(back)</div>
  </div>
</template>

<script>
import previewConfig from './previewConfig'
import preview from './preview'
export default {
  components: {
    previewConfig,
    preview
  },
  data () {
    return {
      subtitleConfig: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    },
    changeConfig (subtitleConfig) {
      this.subtitleConfig = subtitleConfig
    },
    init () {

    }
  },
  mounted () {

  }
}
</script>

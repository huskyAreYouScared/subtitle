<template>
  <div class='setting-main bg-alpha'>
    <div class="round-area">
      <div v-for="(barrageItem, barrageIndex) in data" :key="barrageIndex">
        <span>{{barrageItem.startTime}}</span>~<span>{{barrageItem.endTime}}</span>
      </div>
      <div>
        <input class="setting-xs-input text" type="number">
        <span class="text">s~</span>
        <input class="setting-xs-input text" type="number">
        <span class="text">s</span>
        <input class="setting-input text" type="text"/>
      </div>
    </div>
    <div class="back-btn text" @click="closeDialog('barrage')">返回(back)</div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      data: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeDialog (closeType) {
      this.$emit('closeDialog', closeType)
    }
  },
  mounted () {
    this.data = this.$DB.read().get('barrageData').value()
  }
}
</script>

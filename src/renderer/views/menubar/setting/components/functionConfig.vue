<!-- software function config -->
<template>
  <div class="round-area" >
    <input type="checkbox" v-model="functionConfig.isRecognizeAfterSave" id="afterSave"/>
    <label for="afterSave" class="text">语音识别后是否自动保存</label>
  </div>
</template>

<script>
export default {
  name: 'functionConfig',
  components: {},
  data () {
    return {
      functionConfig: {
        isRecognizeAfterSave: false
      }
    }
  },
  computed: {},
  watch: {
    functionConfig: {
      handler: function () {
        this.save()
      },
      deep: true
    }
  },
  methods: {
    save (index) {
      this.$DB.read().set('functionConfig', this.functionConfig).write()
    }
  },
  mounted () {
    this.functionConfig = this.$DB.read().get('functionConfig').value()
  }
}
</script>
<style lang='scss' scoped>

</style>
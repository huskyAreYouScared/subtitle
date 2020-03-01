<!--  -->
<template>
  <div class='setting-main'>
    <div class="baidu-api-area">
      <p class="header text">设置语音识别基础参数:</p>
      <label for="" class="text input-label">APP_ID:</label>
      <input v-model="baidu.APP_ID" type="text" class="baidu-input text">
      <br>
      <label for="" class="text input-label">API_KEY:</label>
      <input v-model="baidu.API_KEY" type="text" class="baidu-input text">
      <br>
      <label for="" class="text input-label">SECRET_KEY:</label>
      <input v-model="baidu.SECRET_KEY" type="password" class="baidu-input text">
      <br>
    </div>
    <div class="back-btn text" @click="$quickRouter('/')">返回(back)</div>
    <div class="save-btn text" @click="saveSetting">保存(save)</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      baidu:{
        APP_ID:'',
        API_KEY:'',
        SECRET_KEY:''
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 保存baidu api相关配置
    setBaiduArgument(){
      this.$DB.read().set('recognitionObject',this.baidu).write()
    },
    saveSetting(){
      this.setBaiduArgument()
    }
  },
  mounted() {
    this.baidu=this.$DB.read().get('recognitionObject').value()
  }
}
</script>
<style lang='scss' scoped>

</style>
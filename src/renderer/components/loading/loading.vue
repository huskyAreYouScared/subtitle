<template>
  <div class="loading-full-screen" v-show="loading.loading">
    <div class="ldio-1h1ji07nxf6">
      <div/><div/><div/><div/>
    </div> 
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['loading'])
  },
  mounted(){
    console.log(this.loading);
    
  }
}
</script>
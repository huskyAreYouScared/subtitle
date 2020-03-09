<template>
  <div>
    <video ref="currentVideo" class="video-style" controls :src="`file:${currentPath}`"></video>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  watch:{
    videoInfo:{
      handler:function(newVal,oldVal){
        console.log(newVal);
        
      },
      deep:true
    }
  },
  computed:{
    ...mapState(['videoInfo']),
  },
  props: {
    currentPath: {
      type: String,
      default: ''
    }
  },
  mounted(){
    let videoEL = this.$refs.currentVideo
    // video loading completed
    this.$refs.currentVideo.addEventListener('loadeddata',()=>{
      this.setVideoInfo({
        duration:videoEL.duration
      })
    },false)
  },
  methods:{
    ...mapMutations(['setVideoInfo'])
  }
}
</script>

<style>

</style>
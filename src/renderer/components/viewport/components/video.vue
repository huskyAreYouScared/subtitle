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
    },
    currentTime:{
      handler:function(newVal,oldVal){
        console.log(newVal);
      },
      deep:true
    }
  },
  computed:{
    ...mapState(['videoInfo','currentTime']),
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
   videoEL.addEventListener('loadeddata',()=>{
      this.setVideoInfo({
        duration:videoEL.duration,
      })
      
    },false)
    videoEL.addEventListener('timeupdate',()=>{
      this.setCurrentTime(videoEL.currentTime) 
    },false)
  },
  methods:{
    ...mapMutations(['setVideoInfo','setCurrentTime'])
  }
}
</script>

<style>

</style>
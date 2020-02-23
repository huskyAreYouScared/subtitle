<template>
  <div>
    <video  class="video-style" controls :src="`file:${currentPath}`"></video>
    
  </div>
</template>

<script>
export default {
  props: {
    currentPath: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
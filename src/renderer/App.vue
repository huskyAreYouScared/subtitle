<template>
  <div id="app" class="container">
    <menubar/>
    <router-view></router-view>
  </div>
</template>

<script>
  import menubar from '@/components/menubar/menubar'
  export default {
    name: 'husky-subtitle',
    components: {
      menubar
    }
  }
</script>

<style>
  /* CSS */
</style>

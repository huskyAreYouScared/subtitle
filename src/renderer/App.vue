<template>
  <div id="app" class="container">
    <menubar/>
    <router-view></router-view>
    <loading/>
  </div>
</template>

<script>
  import menubar from '@/views/menubar/menubar'
  import loading from '@/components/loading/loading'
  export default {
    name: 'husky-subtitle',
    components: {
      menubar,
      loading
    }
  }
</script>

<style>
  /* CSS */
</style>

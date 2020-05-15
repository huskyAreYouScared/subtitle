<template>
  <section
    ref="track" 
    class="subtitle-tract-container"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    >
    <div class="scale-second" v-for="item in 100" :key="item"></div>
    <div class="sutitle-item" style="left:0px" v-changeSize>
    </div>
    <div class="sutitle-item" style="left:300px" v-changeSize>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      isMove: false,
      lastXPostion: 0
    }
  },
  methods: {
    mouseDown (e) {
      this.isMove = true
      this.lastXPostion = e.clientX
    },
    mouseUp (e) {
      this.isMove = false
    },
    mouseLeave (e) {
      this.isMove = false
    },
    mouseMove (e) {
      if (this.isMove) {
        let moveDistance = this.lastXPostion - e.clientX
        this.$refs.track.scrollLeft += moveDistance
        this.lastXPostion = e.clientX
      }
    }
  }
}
</script>

<style>

</style>
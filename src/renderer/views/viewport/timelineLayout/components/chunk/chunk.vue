<template>
  <div
    ref="chunkItem" 
    class="chunk-container" 
    :style="{'left':this.chunkInfo.left+'px',
            'width':this.chunkInfo.width+'px'}"
    @mousedown="chunkMouseDown"
    @mouseup="chunkMouseUp"
    @mousemove="chunkMouseMove"
  >
    <div
      class="width-right-ctrl"
      @mousedown="rightCtrlMouseDown"
    />
    <div
      class="width-left-ctrl"
      @mousedown="leftCtrlMouseDown"
    />
  </div>
</template>

<script>
export default {
  props: {
    leftLimit: {
      type: Number,
      default: 0
    },
    widthMinLimit: {
      type: Number,
      default: 50
    },
    chunkInfo: {
      type: Object,
      default: function () {
        return {
          left: 0,
          width: 100
        }
      }
    }
  },
  data: function () {
    return {
      isWidthChange: false, // right ctrl
      isWidthPostion: false, // left ctrl
      isMove: false, // chunk move ctrl
      lastXPostion: 0 // clentX last value
    }
  },
  methods: {
    chunkMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isMove = true
    },
    chunkMouseUp (e) {
      this.isMove = false
      this.isWidthChange = false
      this.isWidthPostion = false
      window.removeEventListener('mousemove', this.move, true)
    },
    chunkMouseMove (e) {
      window.addEventListener('mousemove', this.move, true)
      e.stopPropagation()
    },
    rightCtrlMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isWidthChange = true
      e.stopPropagation()
    },
    leftCtrlMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isWidthPostion = true
      e.stopPropagation()
    },
    move (e) {
      // chunk move
      let el = this.$refs.chunkItem
      let currentLeft = parseInt(el.style.left.split('p')[0])
      let currentWidth = el.getBoundingClientRect().width
      if (this.isMove) {
        let moveX = e.clientX - this.lastXPostion
        el.style.left = currentLeft + moveX + 'px'
      }
      // right ctrl
      if (this.isWidthChange) {
        let move = e.clientX - this.lastXPostion
        el.style.width = currentWidth + move + 'px'
      }
      // left ctrl
      if (this.isWidthPostion) {
        let move = e.clientX - this.lastXPostion
        el.style.left = currentLeft + move + 'px'
        el.style.width = currentWidth - move + 'px'
      }
      this.lastXPostion = e.clientX
    }
  }
}
</script>
<template>
  <div
    ref="chunkItem" 
    class="chunk-container" 
    :style="{'left':(this.chunkInfo.startSecond * 100 /2)+'px',
            'width':((this.chunkInfo.endSecond - this.chunkInfo.startSecond) * 100 /2 )+'px'}"
    @mousedown="chunkMouseDown"
    @mouseup="closeMove"
    @mousemove="move"
  >
    <div
      class="width-right-ctrl"
      @mousedown="rightCtrlMouseDown"
      @mouseup="closeMove"
    />
    <div
      class="width-left-ctrl"
      @mousedown="leftCtrlMouseDown"
      @mouseup="closeMove"
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
    rightLimit: {
      type: Number,
      default: 100
    },
    widthMinLimit: {
      type: Number,
      default: 50
    },
    chunkInfo: {
      type: Object,
      default: function () {
        return {
          startSecond: 0,
          endSecond: 100
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
  mounted () {
    window.addEventListener('mouseup', this.closeMove, false)
  },
  destroyed () {
    window.removeEventListener('mouseup', this.closeMove, false)
  },
  methods: {
    initTrackEvent (e) {
    },
    chunkMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isMove = true
    },
    closeMove (e) {
      this.isMove = false
      this.isWidthChange = false
      this.isWidthPostion = false
      window.removeEventListener('mousemove', this.move, false)
    },
    rightCtrlMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isWidthChange = true
      window.addEventListener('mousemove', this.move, false)
      e.stopPropagation()
    },
    leftCtrlMouseDown (e) {
      this.lastXPostion = e.clientX
      this.isWidthPostion = true
      window.addEventListener('mousemove', this.move, false)
      e.stopPropagation()
    },
    move (e) {
      // chunk move
      let currentLeft = parseInt(this.$refs.chunkItem.style.left.split('p')[0])
      let currentWidth = this.$refs.chunkItem.getBoundingClientRect().width
      if (this.isMove) {
        let moveX = e.clientX - this.lastXPostion
        this.$refs.chunkItem.style.left = currentLeft + moveX + 'px'
        this.updateSubtitles(currentWidth, currentLeft)
      }
      // right ctrl
      if (this.isWidthChange) {
        let move = e.clientX - this.lastXPostion
        this.$refs.chunkItem.style.width = currentWidth + move + 'px'
        this.updateSubtitles(currentWidth, currentLeft)
      }
      // left ctrl
      if (this.isWidthPostion) {
        let move = e.clientX - this.lastXPostion
        this.$refs.chunkItem.style.left = currentLeft + move + 'px'
        this.$refs.chunkItem.style.width = currentWidth - move + 'px'
        this.updateSubtitles(currentWidth, currentLeft)
      }
      this.lastXPostion = e.clientX
      e.stopPropagation()
    },
    updateSubtitles (currentWidth, currentLeft) {
      this.chunkInfo.endSecond = ((currentLeft + currentWidth) / 100) * 2
      this.chunkInfo.startSecond = (currentLeft / 100) * 2
      this.$emit('updateSubtitle')
      this.limitCheck(this.$refs.chunkItem, currentWidth, currentLeft)
    },
    limitCheck (el, currentWidth, currentLeft) {
      // width limit
      let thanWidth = this.widthMinLimit
      // left border limit
      let thanLeft = this.leftLimit * 100 / 2
      // left border limit value
      let thanRight = this.rightLimit * 100 / 2
      // current width cannot be less than the minimum width
      if (currentWidth < thanWidth) {
        el.style.width = thanWidth + 'px'
      }
      // current left border cannot be less than the limitLeft value
      if (currentLeft < thanLeft) {
        el.style.left = thanLeft <= 0 ? 0 : thanLeft + 'px'
      }
      // current right border cannot be greater than the limitRight value
      if (thanRight <= currentLeft + currentWidth) {
        el.style.left = currentLeft - 1 + 'px'
        el.style.width = currentWidth + 'px'
      }
    }
  }
}
</script>
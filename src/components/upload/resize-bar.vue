<template>
  <div ref="bar" class="g-resize-bar">
    <div class="g-resize-highlight" :style="{width: left + '%',}"></div>
    <button class="circle-btn" @touchstart.self="drag" @mousedown.self="drag" :style="{left: left + '%',}"></button>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .g-resize-bar{
    position: absolute;
    bottom: size(0);
    margin: size(17) auto;
    height: size(6);
    border-radius: size(3);
    width:size(280);
    margin-left: size(-140);
    left: 50%;
    background-color: #a8f9ca;
    box-shadow: 0 size(2) size(3) size(-1) rgba(0,0,0,.3);
  }
  .g-resize-highlight{
    position: absolute;
    left: 0;
    top:0;
    height: size(6);
    background-color: #27ae60;
    border-radius: size(3);
  }
  .circle-btn{
    display: block;
    position: absolute;
    left:0;
    top: size(-18);
    width: size(40);
    height: size(40);
    margin-left: size(-7);
    background-color: #fff;
    border-radius: size(20);
    box-shadow: 0 size(2) size(3) size(-2) rgba(0,0,0,.6), 0 size(-2) size(3) size(-2) rgba(0,0,0,.55);
    border-width: 0;
  }
</style>

<script>
import helper from './lib/helper'
import drag from './lib/drag'

export default {
  props: {
    minProgress: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      progress: 100,
      left: 100
    }
  },

  methods: {
    setProgress (num) {
      this.left = num
    },

    drag (e) {
      e.preventDefault()
      e.stopPropagation()
      const $el = e.target
      this.el = $el
      const $container = this.$el.parentElement
      const self = this
      const isMobile = helper.isMobile
      const width = this.$refs.bar.clientWidth
      console.log(width)
      const coor = {
        x: (isMobile ? e.touches[0]['clientX'] : e.clientX) - $el.offsetLeft,
        y: (isMobile ? e.touches[0]['clientY'] : e.clientY) - $el.offsetTop,
        maxLeft: width,
        maxTop: parseInt($container.style.height) - parseInt($el.style.height),
        minLeft: 0,
        minTop: 0
      }
      const move = function (ev) {
        const newCoor = drag(ev, self.el, coor)
        // console.log(newCoor)
        if (newCoor) {
          if ((newCoor.left / width) < self.minProgress) {
            return
          }
          self.progress = newCoor.left / width
          self.left = newCoor.left / width * 100

          self.$emit('resize', self.progress)
        }
      }
      const stopMove = function (ev) {
        self.el = null
        if (isMobile) {
          document.removeEventListener('touchmove', move, false)
          document.removeEventListener('touchend', stopMove, false)
          return
        }
        document.removeEventListener('mousemove', move, false)
        document.removeEventListener('mouseup', stopMove, false)
      }
      if (isMobile) {
        document.addEventListener('touchmove', move, false)
        document.addEventListener('touchend', stopMove, false)
        return
      }
      document.addEventListener('mousemove', move, false)
      document.addEventListener('mouseup', stopMove, false)
    }
  }
}
</script>

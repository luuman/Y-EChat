<template>
  <a @click="animate" :href="toLink" class="cov-button-ripple" :class="{active: animate_button.toggle}">
    <slot></slot>
    <span class="cov-ripple" :class="{'animate': animate_button.animate}"></span>
  </a>
</template>
<script>
  export default {
    props: {
      toLink: String,
      toName: String
    },
    data () {
      return {
        animate_button: {
          animate: false,
          toggle: false
        }
      }
    },
    methods: {
      animate (e) {
        this.animate_button.animate = true
        this.animate_button.toggle = true
        if (this.toName) {
          this.$router.push(`/${this.toName}`)
        }
        let button = e.target
        let ripple = button.querySelector('.cov-ripple')
        if (ripple) {
          let d = Math.max(button.offsetHeight, button.offsetWidth)
          let x = e.layerX - ripple.offsetWidth / 2
          let y = e.layerY - ripple.offsetHeight / 2
          ripple.setAttribute('style', `height: ${d}px; width: ${d}px; top: ${y}px; left: ${x}px;`)
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this.animate_button.animate = false
          }, 660)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '../../assets/scss/mixin.scss';
  .cov-button-ripple {
    background: transparent;
    border: none;
    -webkit-tap-highlight-color: transparent;
    color: #000;
    position: relative;
    padding: 0 size(16);
    display: inline-block;
    font-weight: 500;
    // text-transform: uppercase;
    letter-spacing: 0;
    overflow: hidden;
    will-change: box-shadow,transform;
    -webkit-transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: size(36);
    vertical-align: middle;
    min-width: size(64);
    *{
      pointer-events: none;
    }
    &:hover {
      // background-color: hsla(0,0%,62%,.2);
    }
    &.active{
      // background-color: hsla(0,0%,62%,.2);
    }
  }
  .cov-ripple {
    display: block;
    position: absolute;
    background: hsla(0, 0%, 65%, 0.66);
    border-radius: 100%;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
    &.animate {
      animation: ripple 0.65s linear;
    }
  }
  @keyframes ripple {
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }
</style>

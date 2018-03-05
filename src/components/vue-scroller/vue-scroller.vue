<template>
  <div class="infinite-scroll">
    <div class="loader" v-show="loading">
      <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
      </svg>
    </div>
    <span v-show="loading" class="infinite-scroll-text">{{loadingText}}</span>
  </div>
</template>
<script>
  // import Scroll from './scroll.js'
  export default {
    // mixins: [Scroll],
    components: {
    },
    data () {
      return {
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '正在加载...'
      },
      scroller: {
        type: [ HTMLDocument, Element, Window ],
        default: window
      }
    },
    mounted () {
      this.$bindScroll()
    },
    watch: {
      scroller (scroller, oldScroller) {
        if (scroller === oldScroller) return
        this.$unbindScroll(oldScroller)
        this.$bindScroll(scroller)
      }
    },
    beforeDestroy () {
      this.$unbindScroll()
    },
    methods: {
      $bindScroll () {
        if (!this.scroller) return
        this._handleScroll = (e) => {
          if (this.onScroll) this.onScroll()
          // 滑动屏幕回调函数
        }
        this.scroller.addEventListener('scroll', this._handleScroll)
      },
      $unbindScroll (scroller) {
        scroller = scroller || this.scroller
        if (this._handleScroll) scroller.removeEventListener('scroll', this._handleScroll)
      },
      onScroll () {
        if (this.loading) return
        const scroller = this.scroller
        const isWindow = scroller === window
        const scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
        const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight
        let h = scrollHeight - scrollTop - 5
        let sh = isWindow ? window.innerHeight : scroller.offsetHeight
        console.log(sh)
        // 滑动距离大于内容高度触发加载事件
        if (h <= sh) {
          this.$emit('load')
        }
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .infinite-scroll {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
    line-height: 36px;
    width: 100%;
  }

  .infinite-scroll-text {
    margin-left: 16px;
    font-size: 16px;
  }
  .loader {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .loader-path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
  .loader-circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes color {
    0%,
    100% {
      stroke: #FFD300;
    }
    40% {
      stroke: #5B7492;
    }
    66% {
      stroke: #FFD300;
    }
    80%,
    90% {
      stroke: #acb9c8;
    }
  }
</style>

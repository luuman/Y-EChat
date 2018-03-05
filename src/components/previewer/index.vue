<template>
	<div class="action">
	  <img :class="`preimg${Num}`" v-for="(item, index) in list" :src="`${item.src}?imageView2/1/w/750/h/400/q/100`" width="100" @click="show(index)">
	  <preview :list="list" ref="previewer" :options="options"></preview>
	</div>
</template>
<script>
  import Preview from './previewer.vue'
  function getRandomNum (lbound, ubound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound)
  }
  export default {
    components: {
      Preview
    },
    props: {
      list: Array
    },
    data () {
      return {
        Num: getRandomNum(1, 100),
        options: {}
      }
    },
    mounted () {
      let self = this
      this.options = {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll(`.preimg${self.Num}`)[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    },
    watch: {
    },
    methods: {
      show (index) {
        this.$refs.previewer.show(index)
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .action{
    width: 100%;
    img{
      width: 100%;
      // float: left;
      vertical-align: bottom;
    }
  }
</style>

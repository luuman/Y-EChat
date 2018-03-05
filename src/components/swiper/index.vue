<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div @click="toLink(str.url)" class="swiper-slide" v-for="str in img">
        <img :src="str.imgUrl">
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-white"></div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import Swiper from 'swiper'
  export default {
    data () {
      return {
      }
    },
    props: {
      img: Array
    },
    watch: {
    },
    components: {},
    mounted () {
      this.$nextTick(() => {
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true,
          speed: 600,
          autoplay: 4000,
          onTouchEnd: function () {
            swiper.startAutoplay()
          }
        })
      })
    },
    methods: {
      toLink (SRC) {
        if (window.Boolean(SRC)) {
          window.location.href = SRC
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .swiper-container {
    width: 100%;
    height: size(190);
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        // height: 100%;
      }
    }
    .swiper-pagination-white{
      .swiper-pagination-bullet{
        background: transparent;
      }
      .swiper-pagination-bullet-active{
        background: #FFF;
      }
    }
    .swiper-pagination-bullet {
      width: size(10);
      height: size(10);
      display: inline-block;
      border: size(1) solid #FFF;
      border-radius: 50%;
      margin: 0 size(5);
      opacity: 1;
    }
  }
</style>

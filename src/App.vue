<template>
  <div class="container">
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import 'ASSET/scss/mreset.scss'
  import '../node_modules/progressive-image/dist/index.css'
  export default {
    data: () => ({
      includedComponents: ''
    }),
    mounted () {
      // console.log(this.$route.meta)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import './assets/scss/mixin.scss';
  .container{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .view{
    width: size(375);
    overflow: hidden;
  }
  // .router-slid-enter-active, .router-slid-leave-active {
  //   transition: all .4s;
  // }
  // .router-slid-enter, .router-slid-leave-active {
  //   transform: translate3d(2rem, 0, 0);
  //   opacity: 0;
  // }
</style>

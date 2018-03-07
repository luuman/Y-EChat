<template>
  <div class="view">
    <heads :Title="$route.meta.title"></heads>
  </div>
</template>
<script>
  import Heads from 'COMPONENT/head'
  export default {
    components: {
      Heads
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    watch: {
    },
    methods: {},
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .view{
    width: 100%;
    height: 100%;
    // margin-top: size(80);
    overflow: scroll;
    background: #233b4c;
  }
</style>

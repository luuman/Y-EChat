<template>
  <div class="">
    <heads :Title="$route.meta.title"></heads>
    的范德萨空间发的说法
  </div>
</template>
<script>
  import Heads from 'COMPONENT/head'
  // import API from 'API'
  export default {
    components: {
      Heads
    },
    methods: {
      link (links) {
        this.$router.push({name: links})
      },
      back (isNo) {
        this.backs = isNo
      }
    },
    mounted () {
    },
    data () {
      return {
        backs: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
</style>

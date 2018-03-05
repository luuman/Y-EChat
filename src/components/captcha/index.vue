<template>
  <div @click="captcha"><img :src="imgSrc"></div>
</template>
<script>
  function getRandomNum (lbound, ubound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound)
  }
  let Url = `${window.location.origin}/captcha/info/get`
  export default {
    data () {
      return {
        imgSrc: ''
      }
    },
    mounted () {
      this.captcha()
    },
    methods: {
      captcha () {
        let data = getRandomNum(1, 100)
        this.imgSrc = `${Url}?key=${data}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
</style>

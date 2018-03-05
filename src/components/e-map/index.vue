<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="data"></use>
  </svg>
</template>
<script>
  export default {
    props: {
      data: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../assets/scss/mixin.scss';
  .icon{
    width: size(20);
    height: size(20);
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

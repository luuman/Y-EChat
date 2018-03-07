<template>
  <div class="view">
  </div>
</template>
<script>
  // import Heads from 'COMPONENT/heads'
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      link (links) {
        this.$router.push({name: links})
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
</style>

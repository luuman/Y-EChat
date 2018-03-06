<template>
  <div>
    <div class="header">
      <p class="title">盈科大类销售统计</p>
      <p class="tab">
        <span :class="[{'active': this.active == 0}]" @click="changeTab(0)">类型统计</span>
        <span :class="[{'active': this.active == 1}]" @click="changeTab(1)">出游人饼图</span>
        <span :class="[{'active': this.active == 2}]" @click="changeTab(2)">柱状图</span>
      </p>
    </div>
    <div class="table_area" v-show="this.active == 0">
      111
    </div>
    <div class="pie_area" v-show="this.active == 1">
      222
    </div>
    <div class="bar_area" v-show="this.active == 2">
      333
    </div>
  </div>
</template>
<script>
  // import Heads from 'COMPONENT/heads'
  export default {
    components: {
    },
    data () {
      return {
        active: 0
      }
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      changeTab: function (num) {
        this.active = num
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';

  .active {
    border-bottom: 1px solid red;
  }
</style>

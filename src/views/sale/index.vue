<template>
  <div>
    <heads :Title="$route.meta.title"></heads>
    <!-- <eLine :people="people" :rebate="rebate" :business="business" :time="time"></eLine> -->
    <div class="nav">
      <router-link active-class replace to="/Sale/Line">月份统计</router-link>
      <router-link active-class replace to="/Sale/Sector">各省订单</router-link>
      <router-link active-class replace to="/Sale/Maps">地区分布</router-link>
      <router-link active-class replace to="/Sale/Bar">销售统计</router-link>
    </div>
    <router-view></router-view>
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
        people: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        rebate: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 682.2, 48.7, 18.8, 6.0, 2.3],
        business: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        time: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
  .nav{
    width: 100%;
    height: size(45);
    background: #f1f1f1;
    box-shadow: 0.2px 0.4px 0 0 #eeeeee;
    a{
      width: 25%;
      line-height: size(45);
      text-align: center;
      display: block;
      float: left;
      text-decoration: none;
      color: #666666;
    }
    a.router-link-active{
      color: #ff7e00;
    }
  }
</style>

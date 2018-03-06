<template>
  <div>
    <ul class="nav">
      <li @click="link('Sale')" class="sale">
        <p><i></i><span>年终销售统计图表</span></p>
      </li>
      <li @click="link('Sale')" class="classify">
        <p><i></i><span>盈科大类销售统计</span></p>
      </li>
      <li @click="link('Sale')" class="year">
        <p><i></i><span>盈科年终销售统计</span></p>
      </li>
      <li @click="link('Sale')" class="basis">
        <p><i></i><span>销售同比环比</span></p>
      </li>
      <li @click="link('Sale')" class="having">
        <p><i></i><span>盈科所有数据统计</span></p>
      </li>
    </ul>
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
        console.log(links)
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .nav{
    li{
      width: size(313);
      height: size(80);
      border-radius: size(4);
      margin: auto;
      margin-top: size(10);
      @include font-size(16px);
      p{
        padding-top: size(30);
        line-height: size(20);
        i{
          width: size(20);
          height: size(20);
          display: inline-block;
          margin-right: size(20);
          float: left;
          margin-left: size(20);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
        }
        span{
          color: #FFF;
          line-height: size(20);
          display: block;
          float: left;
        }
      }
    }
    .sale{
      background-image: linear-gradient(to right, #586ef7, #51caff);
      i{
        background-image: url(../../assets/img/nav/sale.png);
      }
    }
    .classify{
      background-image: linear-gradient(to right, #fcb600, #fcd300);
      i{
        background-image: url(../../assets/img/nav/classify.png);
      }
    }
    .year{
      background-image: linear-gradient(to right, #f66351, #ff9b2f);
      i{
        background-image: url(../../assets/img/nav/year.png);
      }
    }
    .basis{
      background-image: linear-gradient(to right, #7970ff, #b57ff7);
      i{
        background-image: url(../../assets/img/nav/basis.png);
      }
    }
    .having{
      background-image: linear-gradient(to right, #00bb9c, #5ee89e);
      i{
        background-image: url(../../assets/img/nav/having.png);
      }
    }
  }
</style>

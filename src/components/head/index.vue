<template>
  <div class="head">
    <span class="nav"  @click="back(true)"></span>
    <p class="title">{{Title}}</p>
    <span class="down" @click="download()"></span>
    <div class="navs" v-if="backs">
      <div class="back" @click="back(false)">
        <span></span>
      </div>
      <ul>
        <li @click="link('Sale')" class="sales">
          <p><i></i><span>年终销售统计图表</span></p>
        </li>
        <li @click="link('Classify')" class="classify">
          <p><i></i><span>盈科大类销售统计</span></p>
        </li>
        <li @click="link('Year')" class="year">
          <p><i></i><span>盈科年终销售统计</span></p>
        </li>
        <li @click="link('Basis')" class="basis">
          <p><i></i><span>销售同比环比</span></p>
        </li>
        <li @click="link('Having')" class="having">
          <p><i></i><span>盈科所有数据统计</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // import API from 'API'
  export default {
    methods: {
      link (links) {
        this.backs = false
        this.$router.push({name: links})
      },
      back (isNo) {
        this.backs = isNo
      },
      download () {
        if (this.$route.path === '/Basis') {

        }
      }
    },
    data () {
      return {
        backs: false
      }
    },
    props: {
      Title: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .icon{
    width: size(20);
    height: size(20);
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .head{
    width: 100%;
    height: size(45);
    position: relative;
    background: #FFF;
    .title{
      @include font-size(16px);
      line-height: size(45);
      text-align: center;
      color: #333333;
    }
    .nav{
      position: absolute;
      left: 0;
      top: 0;
      width: size(45);
      height: size(45);
      background: url(../../assets/img/nav.png) no-repeat center;
      background-size: size(20);
    }
    .down{
      position: absolute;
      right: 0;
      top: 0;
      width: size(45);
      height: size(45);
      background: url(../../assets/img/down.png) no-repeat center;
      background-size: size(20);
    }
  }
  .navs{
    position: fixed;
    left: 0;
    top: 0;
    width: size(290);
    height: 100%;
    opacity: 0.97;
    background-color: #3e8fe6;
    box-shadow: 0 0 36.5px 4.1px rgba(0, 0, 0, 0.29);
    z-index: 100;
    .back{
      height: size(45);
      span{
        right: 0;
        top: 0;
        display: block;
        height: size(45);
        width: size(45);
        background: url(../../assets/img/back.png) no-repeat center;
        background-size: size(20);
      }
    }
    li{
      width: 100%;
      height: size(60);
      border-radius: size(4);
      margin: auto;
      @include font-size(14px);
      p{
        padding-top: size(20);
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
    .sales{
      i{
        background-image: url(../../assets/img/nav/sale.png);
      }
    }
    .classify{
      i{
        background-image: url(../../assets/img/nav/classify.png);
      }
    }
    .year{
      i{
        background-image: url(../../assets/img/nav/year.png);
      }
    }
    .basis{
      i{
        background-image: url(../../assets/img/nav/basis.png);
      }
    }
    .having{
      i{
        background-image: url(../../assets/img/nav/having.png);
      }
    }
  }
</style>

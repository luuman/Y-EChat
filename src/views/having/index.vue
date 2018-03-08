<template>
  <div class="view">
    <heads :Title="$route.meta.title"></heads>
    <div class="top">
      <p class="title">数据汇总</p>
      <div class="box">
        <div class="new">
          <p>
            <span class="total">￥{{shows}}</span>
            <span class="text">营业额</span>
          </p>
          <p>
            <span class="total">￥{{shows}}</span>
            <span class="text">返佣</span>
          </p>
          <p>
            <span class="total">￥{{shows}}</span>
            <span class="text">出游人</span>
          </p>
        </div>
      </div>
      <div class="list">
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
        <div class="item" @click="info('')">
          <p>山东山东山东省</p>
          <p>营业额<span> ¥109780.00000000</span></p>
          <p>出游人 6890000000</p>
          <p><a href="javascript:;">更多</a><i>></i></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Heads from 'COMPONENT/head'
  import API from 'API'
  export default {
    components: {
      Heads
    },
    data () {
      return {
        shows: 0,
        date: new Date().getFullYear()
      }
    },
    mounted () {
      API.AllGpMonth().then(res => {
        if (res.flag === 20000) {
        }
      }, (err) => {
        console.log(err)
      })
    },
    watch: {
    },
    methods: {
      info () {
        this.$router.push({name: 'YearInfo'})
      }
    },
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
    // background: #233b4c;
  }
  .list{
    .item{
      width: 100%;
      height: size(45);
      border-bottom: solid size(1) #EEE;
      p{
        // width: size(90);
        float: left;
        @include font-size(14px);
        text-align: left;
        color: #666;
        line-height: size(45);
        padding-right: size(10);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span{
          color: #ff0000;
        }
        i{
          width: size(10);
          color: #666;
          padding-left: size(10);
        }
        a{
          color: #3366cc;
        }
        &:nth-child(4n+1){
          width: size(60);
          padding-left: size(10);
        }
        &:nth-child(4n+2){
          width: size(135);
        }
        &:nth-child(4n+3){
          width: size(90);
        }
        &:nth-child(4n+4){
          width: size(50);
          padding-right: 0;
        }
      }
    }
  }
  .top{
    width: size(375);
    height: size(130);
    background-image: linear-gradient(30deg, #01bb9c, #34d49d);
    .title{
      @include font-size(14px);
      line-height: size(40);
      font-weight: 500;
      text-align: center;
      color: #ffffff;
    }
    .box{
      margin: size(10) size(20);
      .last{
        border-bottom: solid size(1) rgba(255, 255, 255, 0.3);
      }
      .new, .last{
        overflow: hidden;
        p{
          width: size(110);
          height: size(50);
          margin: size(10) 0;
          float: left;
          span.total{
            @include font-size(13px);
            display: block;
            line-height: size(20);
            text-align: center;
          }
          span.text{
            @include font-size(13px);
            display: block;
            color: #dddddd;
            line-height: size(30);
            text-align: center;
          }
          &:nth-child(n+1){
            border-right: solid size(1) rgba(255, 255, 255, 0.3);
            span.total{
              color: #edf716;
            }
          }
          &:nth-child(n+2){
            border-right: solid size(1) rgba(255, 255, 255, 0.3);
            span.total{
              color: #06ff00;
            }
          }
          &:nth-child(n+3){
            border-right: none;
            span.total{
              color: #fffc00;
            }
          }
        }
      }
    }
  }
</style>

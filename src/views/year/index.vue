<template>
  <div class="view">
    <heads :Title="$route.meta.title" @down="down"></heads>
    <div class="top">
      <p class="title">年度销售榜</p>
      <div class="box">
        <div class="last">
          <p>
            <span class="total">￥{{last.turnover}}</span>
            <span class="text">{{date - 1}}年营业额</span>
          </p>
          <p>
            <span class="total">￥{{last.rebate}}</span>
            <span class="text">{{date - 1}}年返佣</span>
          </p>
          <p>
            <span class="total">￥{{last.travelnum}}</span>
            <span class="text">{{date - 1}}年出游人</span>
          </p>
        </div>
        <div class="new">
          <p>
            <span class="total">￥{{news.turnover}}</span>
            <span class="text">{{date}}年营业额</span>
          </p>
          <p>
            <span class="total">￥{{news.rebate}}</span>
            <span class="text">{{date}}年返佣</span>
          </p>
          <p>
            <span class="total">￥{{news.travelnum}}</span>
            <span class="text">{{date}}年出游人</span>
          </p>
        </div>
      </div>
      <div class="list">
        <div class="item" @click="info(item.provinceName)" v-for="item in yearList">
          <p>{{item.provinceName}}</p>
          <p>营业额<span> ¥{{item.turnover}}</span></p>
          <p>出游人{{item.travelnum}}</p>
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
        last: {
          turnover: 0,
          rebate: 0,
          travelnum: 0
        },
        news: {
          turnover: 0,
          rebate: 0,
          travelnum: 0
        },
        yearList: [],
        date: new Date().getFullYear()
      }
    },
    mounted () {
      API.queryRevenue('turnover', this.date, '', '', '').then(res => {
        if (res.flag === 20000) {
          res.data.companyRevenue.parmList.forEach((v) => {
            this.news.turnover += Number(v.turnover)
            this.news.rebate += Number(v.rebate)
            this.news.travelnum += Number(v.travelnum)
            this.yearList.push({
              provinceName: v.provinceName,
              turnover: v.turnover,
              travelnum: v.travelnum
            })
          })
        }
      }, (err) => {
        console.log(err)
      })
      API.queryRevenue('turnover', this.date - 1, '', '', '').then(res => {
        if (res.flag === 20000) {
          res.data.companyRevenue.parmList.forEach((v) => {
            this.last.turnover += Number(v.turnover)
            this.last.rebate += Number(v.rebate)
            this.last.travelnum += Number(v.travelnum)
          })
        }
      }, (err) => {
        console.log(err)
      })
    },
    watch: {
    },
    methods: {
      info (info) {
        if (info === null) return
        this.$router.push({name: 'YearInfo', params: { city: info }})
      },
      down () {
        console.log('dfdf')
        let url = `${window.location.origin}/ykly-analysis-web/analysis/travel/export/exportBranchTurnoverEveryYear?dataType=branchTurnoverEveryYear`
        // API.downTurnover().then(res => {
        //   // window.open(res)
        // }, (err) => {
        //   console.log(err)
        // })
        let iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
          document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
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
        height: 100%;
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
    height: size(200);
    background-image: linear-gradient(30deg, #4d34f4, #825eec);
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
              color: #fe7023;
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

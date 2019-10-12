<template>
  <div class="view">
    <heads :Title="$route.meta.title" :down="down" :show="true"></heads>
    <div class="top">
      <p class="title">环比同比汇总</p>
      <!-- <div class="box">
        <div class="last">
          <p>
            <span class="total">￥{{news.turnover}}</span>
            <span class="text">{{date}}年营业额</span>
          </p>
          <p>
            <span :class="{total: true, one: huans.replace('%','') > 0}">{{news.turnoverYearonyear}}<i></i></span>
            <span class="text">同比(营业额)％</span>
          </p>
          <p>
            <span :class="{total: true, one: huans.replace('%','') > 0}">{{news.turnoverMonthonmonth}}<i></i></span>
            <span class="text">环比(营业额)％</span>
          </p>
        </div>
        <div class="last">
          <p>
            <span class="total">￥{{news.rebate}}</span>
            <span class="text">{{date}}年返佣</span>
          </p>
          <p>
            <span :class="{total: true, one: huans.replace('%','') > 0}">{{news.rebateYearonyear}}<i></i></span>
            <span class="text">同比(返佣)％</span>
          </p>
          <p>
            <span :class="{total: true, one: huans.replace('%','') > 0}">{{news.rebateMonthonmonth}}<i></i></span>
            <span class="text">环比(返佣)％</span>
          </p>
        </div>
        <div class="new">
          <p>
            <span class="total">￥{{news.travelnum}}</span>
            <span class="text">{{date}}年出游人</span>
          </p>
          <p>
            <span :class="{total: true, one: huans.replace('%','') > 0}">{{news.travelnumYearonyear}}<i></i></span>
            <span class="text">同比(出游人)％</span>
          </p>
          <p>
            <span :class="{total: true, one: huan.replace('%','') > 0}">{{news.travelnumMonthonmonth}}<i></i></span>
            <span class="text">环比(出游人)％</span>
          </p>
        </div>
      </div> -->
      <div class="box">
        <div class="new">
          <p>
            <span class="total">￥{{news.turnover}}</span>
            <span class="text">营业额</span>
          </p>
          <p>
            <span class="total">￥{{news.rebate}}</span>
            <span class="text">返佣</span>
          </p>
          <p>
            <span class="total">￥{{news.travelnum}}</span>
            <span class="text">出游人</span>
          </p>
        </div>
      </div>
      <div class="list">
        <div class="item" @click="info(item)" v-for="item in yearList">
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
        huan: '-100%',
        huans: '20%',
        down: `${window.location.origin}/ykly-analysis-web/analysis/travel/export/exportBranchRateEveryYear?dataType=branchRateEveryYear`,
        news: {
          turnover: 0,
          turnoverYearonyear: 0,
          turnoverMonthonmonth: 0,
          rebate: 0,
          rebateYearonyear: 0,
          rebateMonthonmonth: 0,
          travelnum: 0,
          travelnumYearonyear: 0,
          travelnumMonthonmonth: 0
        },
        yearList: [],
        date: new Date().getFullYear(),
        month: '01'
      }
    },
    mounted () {
      API.queryRevenue('rate', this.date, this.month, '', '').then(res => {
        if (res.flag === 20000) {
          res.data.companyRevenue.parmList.forEach((v) => {
            this.news.turnover += Number(v.turnover)
            this.news.rebate += Number(v.rebate)
            this.news.travelnum += Number(v.travelnum)
            // this.news.turnover += Number(v.turnover)
            // this.news.turnoverYearonyear += Number(v.turnoverYearonyear)
            // this.news.turnoverMonthonmonth += Number(v.turnoverMonthonmonth)
            // this.news.rebate += Number(v.rebate)
            // this.news.rebateYearonyear += Number(v.rebateYearonyear)
            // this.news.rebateMonthonmonth += Number(v.rebateMonthonmonth)
            // this.news.travelnum += Number(v.travelnum)
            // this.news.travelnumYearonyear += Number(v.travelnumYearonyear)
            // this.news.travelnumMonthonmonth += Number(v.travelnumMonthonmonth)
            this.yearList.push({
              provinceName: v.provinceName,
              turnover: v.turnover,
              turnoverYearonyear: v.turnoverYearonyear,
              turnoverMonthonmonth: v.turnoverMonthonmonth,
              rebate: v.rebate,
              rebateYearonyear: v.rebateYearonyear,
              rebateMonthonmonth: v.rebateMonthonmonth,
              travelnum: v.travelnum,
              travelnumYearonyear: v.travelnumYearonyear,
              travelnumMonthonmonth: v.travelnumMonthonmonth
            })
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
        if (!info.provinceName) return
        this.$router.push({name: 'BasisInfo', params: { city: JSON.stringify(info) }})
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
        height: 100%;
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
    background-image: linear-gradient(30deg, #fb5747, #fd9a2b);
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
            color: #FFF;
          }
          span.text{
            @include font-size(13px);
            display: block;
            color: #FFF;
            line-height: size(30);
            text-align: center;
          }
          &:nth-child(n+1){
            border-right: solid size(1) rgba(255, 255, 255, 0.3);
          }
          &:nth-child(n+2){
            border-right: solid size(1) rgba(255, 255, 255, 0.3);
          }
          &:nth-child(n+2), &:nth-child(n+3){
            span.total{
              color: #fffc00;
              i{
                width: size(18);
                height: size(12);
                display: inline-block;
                vertical-align: middle;
                line-height: size(20);
                margin-left: size(6);
                background-image: url(../../assets/img/base/down.png);
                background-repeat: no-repeat;
                background-size: 40%;
                background-position: center;
              }
            }
            span.one{
              color: #06ff00;
              i{
                background-image: url(../../assets/img/base/up.png);
              }
            }
          }
          &:nth-child(n+3){
            border-right: none;
          }
        }
      }
    }
  }
</style>

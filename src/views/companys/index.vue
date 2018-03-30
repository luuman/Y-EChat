<template>
  <div class="view">
    <heads :Title="$route.meta.title" :down="down" :show="false"></heads>
    <div class="list">
      <div class="item" @click="info(item.provinceName)" v-for="item in yearList">
        <p>{{item.provinceName}}</p>
        <p>营业额<span> ¥{{item.turnover}}</span></p>
        <p>出游人{{item.travelnum}}</p>
        <p>返佣{{item.rebate}}</p>
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
        down: `${window.location.origin}/ykly-analysis-web/analysis/travel/export/exportBranchTurnoverEveryYear?dataType=branchTurnoverEveryYear`,
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
      API.queryRevenue('branchSort', this.date - 1, '', '', '').then(res => {
        if (res.flag === 20000) {
          res.data.companyRevenue.parmList.forEach((item, index) => {
            if (index > 9) return
            this.yearList.push({
              provinceName: item.branchName,
              turnover: item.turnover,
              travelnum: item.travelnum,
              rebate: item.rebate
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
        // if (info === null) return
        // this.$router.push({name: 'YearInfo', params: { city: info }})
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
    width: 100%;
    overflow: auto;
    .item{
      width: size(680);
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
          width: size(300);
          padding-left: size(10);
        }
        &:nth-child(4n+2){
          width: size(140);
        }
        &:nth-child(4n+3){
          width: size(100);
        }
        &:nth-child(4n+4){
          width: size(100);
          padding-right: 0;
        }
      }
    }
  }
</style>

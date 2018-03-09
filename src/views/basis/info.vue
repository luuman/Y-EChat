<template>
  <div class="">
    <heads :Title="title"></heads>
    <div class="table">
      <div class="th">
        <div class="box1">分公司</div>
        <div class="box2">营业部</div>
        <div class="box3">营业额-{{date}}/{{months}}(元)</div>
        <div class="box3">同比(营业额)(%)</div>
        <div class="box3">环比(营业额)(%)</div>
        <div class="box3">返佣-{{date}}/{{months}}(元)</div>
        <div class="box3">同比(返佣)(%)</div>
        <div class="box3">环比(返佣)(%)</div>
        <div class="box3">出游人数-{{date}}/{{months}}</div>
        <div class="box3">同比(人数)(%)</div>
        <div class="box3">环比(人数)(%)</div>
      </div>
      <div v-if="!showNo" :class="{td: true, num: item.companyName === '汇总'}" v-for="(item, index) in cityList">
        <div class="box" v-if="!item.show">
          <div class="box1" @click="show(item.companyName, index)"><i class="add"></i>{{item.companyName}}</div>
          <div class="box2"></div>
          <div class="box3">{{item.turnover | format}}</div>
          <div class="box3">{{item.turnoverYearonyear | formatFixed}}<i :class="{up: ups(item.turnoverYearonyear)}"></i></div>
          <div class="box3">{{item.turnoverMonthonmonth | formatFixed}}<i :class="{up: ups(item.turnoverMonthonmonth)}"></i></div>
          <div class="box3">{{item.rebate | format}}</div>
          <div class="box3">{{item.rebateYearonyear | formatFixed}}<i :class="{up: ups(item.rebateYearonyear)}"></i></div>
          <div class="box3">{{item.rebateMonthonmonth | formatFixed}}<i :class="{up: ups(item.rebateMonthonmonth)}"></i></div>
          <div class="box3">{{item.travelnum | format}}</div>
          <div class="box3">{{item.travelnumYearonyear | formatFixed}}<i :class="{up: ups(item.travelnumYearonyear)}"></i></div>
          <div class="box3">{{item.travelnumMonthonmonth | formatFixed}}<i :class="{up: ups(item.travelnumMonthonmonth)}"></i></div>
        </div>
        <div class="boxz" v-if="item.show">
          <div class="box1" @click="show(item.companyName, index)">box<span><i class="subtract"></i>{{item.companyName}}</span></div>
          <div class="boxs">
            <div :class="{num: items.branchName === '汇总'}" v-for="items in item.list">
              <div class="box2">{{items.branchName}}</div>
              <div class="box3">{{items.turnover | format}}</div>
              <div class="box3">{{items.turnoverYearonyear | formatFixed}}<i :class="{up: ups(items.turnoverYearonyear)}"></i></div>
              <div class="box3">{{items.turnoverMonthonmonth | formatFixed}}<i :class="{up: ups(items.turnoverMonthonmonth)}"></i></div>
              <div class="box3">{{items.rebate | format}}</div>
              <div class="box3">{{items.rebateYearonyear | formatFixed}}<i :class="{up: ups(items.rebateYearonyear)}"></i></div>
              <div class="box3">{{items.rebateMonthonmonth | formatFixed}}<i :class="{up: ups(items.rebateMonthonmonth)}"></i></div>
              <div class="box3">{{items.travelnum | format}}</div>
              <div class="box3">{{items.travelnumYearonyear | formatFixed}}<i :class="{up: ups(items.travelnumYearonyear)}"></i></div>
              <div class="box3">{{items.travelnumMonthonmonth | formatFixed}}<i :class="{up: ups(items.travelnumMonthonmonth)}"></i></div>
            </div>
          </div>
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
    filters: {
      format (num) {
        // console.log(num)
        return Number(num).toFixed().replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, ' ')
      },
      formatFixed (num) {
        if (num === null) return 0
        return Number(String(num).replace('%', '')).toFixed() + '%'
        // return Number((num).replace('%', '')).toFixed()
      }
    },
    methods: {
      ups (data) {
        if (!data) return true
        return (data.replace('%', '') > 0)
      },
      show (name, index) {
        if (name === '汇总') return
        let citys = this.cityList[index]
        if (citys.show === true) {
          this.cityList[index].show = false
        } else {
          citys.show = true
          API.queryRevenue('rate', this.date, this.months, this.title, name).then(res => {
            if (res.flag === 20000) {
              res.data.companyRevenue.parmList.forEach((v) => {
                this.cityList[index].list.push({
                  branchName: v.branchName,
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
              console.log(this.cityList[index].list)
              this.cityList[index].list.push({
                branchName: '汇总',
                turnover: citys.turnover,
                turnoverYearonyear: citys.turnoverYearonyear,
                turnoverMonthonmonth: citys.turnoverMonthonmonth,
                rebate: citys.rebate,
                rebateYearonyear: citys.rebateYearonyear,
                rebateMonthonmonth: citys.rebateMonthonmonth,
                travelnum: citys.travelnum,
                travelnumYearonyear: citys.travelnumYearonyear,
                travelnumMonthonmonth: citys.travelnumMonthonmonth
              })
            }
          }, (err) => {
            console.log(err)
          })
          console.log(citys)
        }
      },
      back (isNo) {
        this.backs = isNo
      }
    },
    mounted () {
      API.queryRevenue('rate', this.date, this.months, this.title, '').then(res => {
        if (res.flag === 20000) {
          let last = {
            companyName: '汇总',
            show: false,
            turnover: this.params.turnover,
            turnoverYearonyear: this.params.turnoverYearonyear,
            turnoverMonthonmonth: this.params.turnoverMonthonmonth,
            rebate: this.params.rebate,
            rebateYearonyear: this.params.rebateYearonyear,
            rebateMonthonmonth: this.params.rebateMonthonmonth,
            travelnum: this.params.travelnum,
            travelnumYearonyear: this.params.travelnumYearonyear,
            travelnumMonthonmonth: this.params.travelnumMonthonmonth,
            list: []
          }
          res.data.companyRevenue.parmList.forEach((v) => {
            last.turnover += Number(v.turnover)
            last.rebate += Number(v.rebate)
            last.travelnum += Number(v.travelnum)
            this.cityList.push({
              companyName: v.companyName,
              turnover: v.turnover,
              turnoverYearonyear: v.turnoverYearonyear,
              turnoverMonthonmonth: v.turnoverMonthonmonth,
              rebate: v.rebate,
              rebateYearonyear: v.rebateYearonyear,
              rebateMonthonmonth: v.rebateMonthonmonth,
              travelnum: v.travelnum,
              travelnumYearonyear: v.travelnumYearonyear,
              travelnumMonthonmonth: v.travelnumMonthonmonth,
              show: false,
              list: []
            })
          })
          this.cityList.push(last)
        }
      }, (err) => {
        console.log(err)
      })
    },
    data () {
      return {
        title: JSON.parse(this.$route.params.city).provinceName,
        params: JSON.parse(this.$route.params.city),
        backs: false,
        showNo: false,
        cityList: [],
        cityLists: [],
        date: new Date().getFullYear(),
        // months: new Date().getMonth()
        months: '01'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .table{
    width: 100%;
    overflow: auto;
    .th{
      height: size(40);
      background-color: #3e8fe6;
      div{
        color: #FFF;
      }
    }
    .td .box{
      div{
        color: #666;
        border-bottom: solid size(1) #EEE;
        &.box3,&.box2{
          border-right: solid size(1) #EEE;
          text-align: right;
        }
      }
    }
    .boxz{
      width: size(1480);
      overflow: hidden;
      position: relative;
      // float: left;
      .box1, .boxs{
        float: left;
      }
      .box1{
        @include font-size(13px);
        height: 100%;
        span{
          position: absolute;
          width: size(200);
          height: 100%;
          background: #FFF;
          left: 0;
          box-sizing: border-box;
          top: 0;
          line-height: 100%;
          border-right: solid size(1) #EEE;
          border-bottom: solid size(1) #EEE;
          padding-left: size(10);
          padding-right: size(10);
          min-height: size(40);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:after {
            display:inline-block;
            width:0;
            height:100%;
            vertical-align:middle;
            content:"";
          }
        }
      }
      .boxs{
        width: size(1280);
        .num{
          background: rgba(255, 235, 63, 0.15);
        }
        div{
          height: size(40);
          div{
            float: left;
            text-align: right;
            @include font-size(13px);
            height: size(40);
            border-right: solid size(1) #EEE;
            border-bottom: solid size(1) #EEE;
            line-height: size(40);
            box-sizing: border-box;
            padding-left: size(10);
            padding-right: size(10);
          }
          .box2{
            text-align: left;
          }
        }
      }
    }
    .th,.td .box{
      width: size(1480);
      height: size(40);
      div{
        float: left;
        @include font-size(13px);
        height: size(40);
        line-height: size(40);
        box-sizing: border-box;
        padding-left: size(10);
        padding-right: size(10);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .box1, .box2{
      width: size(200);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .box3{
      width: size(120);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .num .box{
      background: rgba(255, 235, 63, 0.15);
    }
    .subtract, .add{
      width: size(15);
      height: size(15);
      display: inline-block;
      vertical-align: middle;
      margin-right: size(6);
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
    }
    .num .add{
      display: none;
    }
    .subtract{
      background-image: url(../../assets/img/subtract.png);
    }
    .add{
      background-image: url(../../assets/img/add.png);
    }
    .box3{
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
        &.up{
          background-image: url(../../assets/img/base/up.png);
        }
      }
    }
  }
</style>

<template>
  <div class="">
    <heads :Title="$route.params.city" :show="false"></heads>
    <div class="table">
      <div class="th">
        <div class="box1">分公司</div>
        <div class="box2">营业部</div>
        <!-- <div class="box3">营业额-{{date - 1}}(元)</div> -->
        <div class="box4">营业额(元)</div>
        <!-- <div class="box5">返佣-{{date - 1}}(元)</div> -->
        <div class="box6">返佣(元)</div>
        <!-- <div class="box7">出游人数-{{date - 1}}</div> -->
        <div class="box8">出游人</div>
      </div>
      <div v-if="!showNo" :class="{td: true, num: item.companyName === '汇总'}" v-for="(item, index) in cityList">
        <div class="box" v-if="!item.show">
          <div class="box1" @click="show(item.companyName, index)"><i class="add"></i>{{item.companyName}}</div>
          <div class="box2"></div>
          <!-- <div class="box3">{{item.turnovers | format}}</div> -->
          <div class="box4">{{item.turnover | format}}</div>
          <!-- <div class="box5">{{item.rebates | format}}</div> -->
          <div class="box6">{{item.rebate | format}}</div>
          <!-- <div class="box7">{{item.travelnums | format}}</div> -->
          <div class="box8">{{item.travelnum | format}}</div>
        </div>
        <div class="boxz" v-if="item.show">
          <div class="box1" @click="show(item.companyName, index)">box<span><i class="subtract"></i>{{item.companyName}}</span></div>
          <div class="boxs">
            <div :class="{num: items.branchName === '汇总'}" v-for="items in item.list">
              <div class="box2">{{items.branchName}}</div>
              <!-- <div class="box3">{{items.turnovers | format}}</div> -->
              <div class="box4">{{items.turnover | format}}</div>
              <!-- <div class="box5">{{items.rebates | format}}</div> -->
              <div class="box6">{{items.rebate | format}}</div>
              <!-- <div class="box7">{{items.travelnums | format}}</div> -->
              <div class="box8">{{items.travelnum | format}}</div>
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
        return Number(num).toFixed().replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, ' ')
      }
    },
    methods: {
      show (name, index) {
        if (name === '汇总') return
        let citys = this.cityList[index]
        if (citys.show === true) {
          this.cityList[index].show = false
        } else {
          citys.show = true
          API.queryRevenue('turnover', '', '', this.$route.params.city, name).then(res => {
            if (res.flag === 20000) {
              this.cityList[index].list = []
              res.data.companyRevenue.parmList.forEach((v) => {
                this.cityList[index].list.push({
                  branchName: v.branchName,
                  turnover: v.turnover,
                  rebate: v.rebate,
                  travelnum: v.travelnum
                })
              })
              this.cityList[index].list.push({
                branchName: '汇总',
                turnover: citys.turnover,
                rebate: citys.rebate,
                travelnum: citys.travelnum
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
      API.queryRevenue('turnover', '', '', this.$route.params.city, '').then(res => {
        if (res.flag === 20000) {
          let last = {
            companyName: '汇总',
            turnover: 0,
            rebate: 0,
            travelnum: 0,
            show: false,
            list: []
          }
          res.data.companyRevenue.parmList.forEach((v) => {
            last.turnover += Number(v.turnover)
            last.rebate += Number(v.rebate)
            last.travelnum += Number(v.travelnum)
            this.cityList.push({
              companyName: v.companyName,
              turnover: v.turnover,
              rebate: v.rebate,
              travelnum: v.travelnum,
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
        backs: false,
        showNo: false,
        cityList: [],
        cityLists: [],
        date: new Date().getFullYear()
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
        &:nth-child(8n+3), &:nth-child(8n+4), &:nth-child(8n+5), &:nth-child(8n+6), &:nth-child(8n+7), &:nth-child(8n+8){
          border-right: solid size(1) #EEE;
          text-align: right;
        }
      }
    }
    .boxz{
      width: size(760);
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
        width: size(560);
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
      width: size(760);
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
    .box3, .box4, .box5, .box6, .box7, .box8{
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
  }
</style>

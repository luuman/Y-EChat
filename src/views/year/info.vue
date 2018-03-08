<template>
  <div class="">
    <heads :Title="$route.params.city"></heads>
    <div class="table">
      <div class="th">
        <div>分公司</div>
        <div>营业部</div>
        <div>营业额-{{date - 1}}(元)</div>
        <div>营业额-{{date}}(元)</div>
        <div>返佣-{{date - 1}}(元)</div>
        <div>返佣-{{date}}(元)</div>
        <div>出游人数-{{date - 1}}</div>
        <div>出游人-{{date}}</div>
      </div>
      <div v-if="!showNo" :class="{td: true, num: item.companyName === '汇总'}" v-for="item in cityList">
        <div @click="show(item.companyName)">{{item.companyName}}</div>
        <div></div>
        <div>{{item.turnovers | format}}</div>
        <div>{{item.turnover | format}}</div>
        <div>{{item.rebates | format}}</div>
        <div>{{item.rebate | format}}</div>
        <div>{{item.travelnums | format}}</div>
        <div>{{item.travelnum | format}}</div>
      </div>
      <div v-if="showNo" class="td" v-for="item in cityLists">
        <div></div>
        <div>{{item.branchName}}</div>
        <div>{{item.turnovers}}</div>
        <div>{{item.turnover}}</div>
        <div>{{item.rebates}}</div>
        <div>{{item.rebate}}</div>
        <div>{{item.travelnums}}</div>
        <div>{{item.travelnum}}</div>
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
      show (name) {
        this.showNo = true
        API.queryRevenue('turnover', this.date, '', this.$route.params.city, name).then(res => {
          if (res.flag === 20000) {
            API.queryRevenue('turnover', this.date - 1, '', this.$route.params.city, name).then(ress => {
              if (ress.flag === 20000) {
                res.data.companyRevenue.parmList.forEach((v) => {
                  let citys = {
                    turnover: 0,
                    rebate: 0,
                    travelnum: 0
                  }
                  ress.data.companyRevenue.parmList.forEach((l) => {
                    if (v.branchName === l.branchName) {
                      citys.turnover = l.turnover
                      citys.rebate = l.rebate
                      citys.travelnum = l.travelnum
                    }
                  })
                  this.cityLists.push({
                    branchName: v.branchName,
                    turnover: v.turnover,
                    turnovers: citys.turnover,
                    rebate: v.rebate,
                    rebates: citys.rebate,
                    travelnums: citys.travelnum,
                    travelnum: v.travelnum,
                    list: []
                  })
                })
                console.log(this.cityLists)
              }
            }, (errs) => {
              console.log(errs)
            })
          }
        }, (err) => {
          console.log(err)
        })
      },
      back (isNo) {
        this.backs = isNo
      }
    },
    mounted () {
      API.queryRevenue('turnover', this.date, '', this.$route.params.city, '').then(res => {
        if (res.flag === 20000) {
          API.queryRevenue('turnover', this.date - 1, '', this.$route.params.city, '').then(ress => {
            if (ress.flag === 20000) {
              let last = {
                companyName: '汇总',
                turnover: 0,
                turnovers: 0,
                rebate: 0,
                rebates: 0,
                travelnums: 0,
                travelnum: 0,
                list: []
              }
              res.data.companyRevenue.parmList.forEach((v) => {
                let citys = {
                  turnover: 0,
                  rebate: 0,
                  travelnum: 0
                }
                ress.data.companyRevenue.parmList.forEach((l) => {
                  if (v.companyName === l.companyName) {
                    citys.turnover = l.turnover
                    citys.rebate = l.rebate
                    citys.travelnum = l.travelnum
                  }
                })
                console.log(Number(citys.turnover))
                last.turnover += Number(v.turnover)
                last.turnovers += Number(citys.turnover)
                last.rebate += Number(v.rebate)
                last.rebates += Number(citys.rebate)
                last.travelnums += Number(citys.travelnum)
                last.travelnum += Number(v.travelnum)
                this.cityList.push({
                  companyName: v.companyName,
                  turnover: v.turnover,
                  turnovers: citys.turnover,
                  rebate: v.rebate,
                  rebates: citys.rebate,
                  travelnums: citys.travelnum,
                  travelnum: v.travelnum,
                  list: []
                })
              })
              this.cityList.push(last)
            }
          }, (errs) => {
            console.log(errs)
          })
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
      background-color: #3e8fe6;
      div{
        color: #FFF;
      }
    }
    .td{
      div{
        color: #666;
        border-bottom: solid size(1) #EEE;
        &:nth-child(8n+3), &:nth-child(8n+4), &:nth-child(8n+5), &:nth-child(8n+6), &:nth-child(8n+7), &:nth-child(8n+8){
          border-right: solid size(1) #EEE;
          text-align: right;
        }
      }
    }
    .tb{
      div{
        color: #666;
        border-bottom: solid size(1) #EEE;
        &:nth-child(8n+3), &:nth-child(8n+4), &:nth-child(8n+5), &:nth-child(8n+6), &:nth-child(8n+7), &:nth-child(8n+8){
          border-right: solid size(1) #EEE;
        }
      }
    }
    .th,.td{
      width: size(1800);
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
        &:nth-child(8n+1){
          width: size(200);
        }
        &:nth-child(8n+2){
          width: size(200);
        }
        &:nth-child(8n+3){
          width: size(100);
        }
        &:nth-child(8n+4){
          width: size(200);
        }
        &:nth-child(8n+5){
          width: size(200);
        }
        &:nth-child(8n+6){
          width: size(200);
        }
        &:nth-child(8n+7){
          width: size(200);
        }
        &:nth-child(8n+8){
          width: size(200);
        }
      }
      &.num{
        background: #ffeb3f;
      }
    }
  }
</style>

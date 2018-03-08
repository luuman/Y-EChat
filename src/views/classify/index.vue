<template>
  <div>
    <div class="header">
      <heads :Title="$route.meta.title"></heads>
      <p class="tab">
        <span :class="[{'active': this.active == 0}]" @click="changeTab(0)">类型统计</span>
        <span :class="[{'active': this.active == 1}]" @click="changeTab(1)">出游人饼图</span>
        <span :class="[{'active': this.active == 2}]" @click="changeTab(2)">柱状图</span>
      </p>
    </div>
    <div class="table_area" v-show="this.active == 0">
      <table>
        <tr class="tab_title">
          <td style="width: 18%;">产品类型</td>
          <td>营业额(2017/元)</td>
          <td>营业额(2018/元)</td>
          <td>返佣(2017/元)</td>
          <td>返佣(2018/元)</td>
          <td>出游人数(2017)</td>
          <td>出游人数(2018)</td>
        </tr>
        <tr v-for="item in this.tableData" >
          <td v-for="item2 in item">{{item2}}</td>
        </tr>
      </table>
    </div>
    <div class="pie_area" v-show="this.active == 1">
      <div id="pie"></div>
    </div>
    <div class="bar_area" v-show="this.active == 2">
      <div id="bar"></div>
    </div>
  </div>
</template>
<script>
  import Heads from 'COMPONENT/head'
  import echarts from 'echarts'
  import API from 'API'
  export default {
    components: {
      Heads
    },
    data () {
      return {
        active: 0,
        tableData: [],
        pieLegendData: [],
        pieSeriesData: [],
        barLegendData: [],
        barSeriesTotal: [],
        barSeriesRebate: [],
        barSeriesPeople: []
      }
    },
    mounted () {
      this.loadData(0)
    },
    watch: {
    },
    methods: {
      changeTab: function (num) {
        this.active = num
        this.loadData(num)
      },
      pieInit: function () {
        var myChart = echarts.init(document.getElementById('pie'))
        var option = {
          title: {
            text: '2018出游人数饼状图'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: 0,
            data: this.pieLegendData
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '20%',
            containLabel: true
          },
          series: [{
            name: '出游人数-2018',
            type: 'pie',
            radius: '55%',
            center: ['50%', '43%'],
            data: this.pieSeriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      },
      barInit: function () {
        var myChart = echarts.init(document.getElementById('bar'))
        var option = {
          title: {
            text: '2018柱状图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            bottom: 0,
            data: ['营业额', '返佣', '出游人数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.barLegendData
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额'
            },
            {
              type: 'value',
              name: '出游人数'
            }
          ],
          series: [
            {
              name: '营业额',
              type: 'bar',
              stack: '金额',
              data: this.barSeriesTotal
            },
            {
              name: '返佣',
              type: 'bar',
              stack: '金额',
              data: this.barSeriesRebate
            },
            {
              name: '出游人数',
              type: 'bar',
              yAxisIndex: 1,
              stack: '人数',
              data: this.barSeriesPeople
            }
          ]
        }
        myChart.setOption(option)
      },
      loadData: function (num) {
        if (num === 0) {
          API.loadSaleByOrdertype('2017', '', '').then(res1 => {
            console.log(res1)
            API.loadSaleByOrdertype('2018', '', '').then(res2 => {
              console.log(res2)
              for (let i = 0; i < res1.data.reportList.length; i++) {
                for (let j = 0; j < res2.data.reportList.length; j++) {
                  if (res1.data.reportList[i].categoryLargeName === res2.data.reportList[j].categoryLargeName) {
                    this.tableData.push([res1.data.reportList[i].categoryLargeName, res1.data.reportList[i].turnoverTotal, res2.data.reportList[j].turnoverTotal, res1.data.reportList[i].rebateTotal, res2.data.reportList[j].rebateTotal, res1.data.reportList[i].peopleTotal, res2.data.reportList[j].peopleTotal])
                  }
                }
              }
              console.log(this.tableData)
            })
          })
        } else if (num === 1) {
          API.loadSaleByOrdertype('2018', '', '').then(res => {
            console.log(res)
            this.pieLegendData = res.data.reportList.map((v, i) => v.categoryLargeName)
            this.pieSeriesData = res.data.reportList.map((v, i) => {
              return {value: v.peopleTotal, name: v.categoryLargeName}
            })
            this.pieInit()
          })
        } else if (num === 2) {
          API.loadSaleByOrdertype('2018', '', '').then(res => {
            console.log(res)
            this.barLegendData = res.data.reportList.map((v, i) => v.categoryLargeName)
            this.barSeriesTotal = res.data.reportList.map((v, i) => v.turnoverTotal)
            this.barSeriesRebate = res.data.reportList.map((v, i) => v.rebateTotal)
            this.barSeriesPeople = res.data.reportList.map((v, i) => v.peopleTotal)
            this.barInit()
          })
        }
      }
    },
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';

  .header {
    .tab {
      width: 90%;
      margin: 0 auto;
      display: flex;
      padding-bottom: size(10);
      span {
        display: inline-block;
        flex: 1;
        text-align: center;
        padding: size(10);
        @include font-size(16px);
      }
      .active {
        border-bottom: size(2) solid red;
      }
    }
  }
  .table_area {
    overflow-x: scroll;
    table {
      width: 100%;
      .tab_title {
        td {
          text-align: center;
          width: 14%;
        }
      }
      td {
        border: 1px solid #ccc;
        text-align: right;
        width: size(300);
        height: size(40);
      }
      tr:nth-child(odd) {
        background: #369ddf;
      }
      tr:nth-child(even) {
        background: #2656cf;
      }
      td:nth-child(1) {
        text-align: center;
      }
    }
  }
  .pie_area {
    div {
      width: size(375);
      height: 500px;
    }
  }
  .bar_area {
    div {
      width: size(375);
      height: 500px;
    }
  }
</style>

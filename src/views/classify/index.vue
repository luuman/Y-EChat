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
        <thead>
          <tr>
            <td>产品类型</td>
            <td>营业额(2017/元)</td>
            <td>营业额(2018/元)</td>
            <td>返佣(2017/元)</td>
            <td>返佣(2018/元)</td>
            <td>出游人数(2017)</td>
            <td>出游人数(2018)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>dadasd</td>
          </tr>
        </tbody>
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
        active: 0
      }
    },
    mounted () {
      this.loadData()
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
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '姓名',
            type: 'pie',
            radius: '45%',
            center: ['50%', '50%'],
            data: [
              {value: 5, name: '直接访问'},
              {value: 10, name: '邮件营销'}
            ],
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
      loadData: function (num) {
        API.loadSaleByOrdertype('2018').then(res => {
          console.log(res)
        })
        this.pieInit()
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
      td {
        border: 1px solid #ccc;
        text-align: center;
        width: size(300);
      }
    }
  }
  .pie_area {
    div {
      width: size(375);
      height: 400px;
    }
  }
</style>

<template>
  <div id='line' style='width: 100%;height:400px;'></div>
</template>
<script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/map'
  import 'echarts/map/js/china.js'
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: '正在加载...'
      },
      people: {
        type: Array,
        default: []
      },
      rebate: {
        type: Array,
        default: []
      },
      business: {
        type: Array,
        default: []
      },
      time: {
        type: Array,
        default: []
      }
    },
    mounted () {
      console.log(this.business.reduce((num1, num2) => {
        return num1 > num2 ? num1 : num2
      }))
      var myChart = echarts.init(document.getElementById('line'), 'dark')
      var colors = ['#5abff0', '#726be3', '#45b17f']
      var symbolSize = 10
      var option = {
        title: {
          text: '盈科旅游月份统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: '#233b4c',
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'cross'}
        },
        grid: {
          // right: '30%'
        },
        // toolbox: {
        //   feature: {
        //     dataView: {show: true, readOnly: false},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        legend: {
          data: ['返佣额', '营业额', '出游人数'],
          bottom: '10px'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.time
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '返佣额',
            min: 0,
            max: Math.max.apply({}, this.business),
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '营业额',
            min: 0,
            max: Math.max.apply({}, this.business),
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '出游人数',
            min: 0,
            max: Math.max.apply({}, this.people),
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '返佣额',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: this.rebate
          },
          {
            name: '营业额',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            yAxisIndex: 1,
            data: this.business
          },
          {
            name: '出游人数',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            yAxisIndex: 2,
            data: this.people
          }
        ]
      }
      myChart.setOption(option)
    },
    watch: {
    },
    methods: {},
    filters: {}
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../assets/scss/mixin.scss';
</style>

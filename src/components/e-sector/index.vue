<template>
  <div id='line' style='width: 100%;height:400px;'></div>
</template>
<script>
  import echarts from 'echarts'
  // import 'echarts/lib/chart/map'
  // import 'echarts/map/js/china.js'
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
      ForOrder: {
        type: Array,
        default: []
      },
      city: {
        type: Array,
        default: []
      }
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('line'), 'dark')
      var option = {
        title: {
          text: '各省订单数',
          // subtext: '二级',
          left: 'center',
          // textStyle: {
          //   color: '#fff'
          // },
          x: 'center'
        },
        backgroundColor: '#223b4d',
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}: {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          type: 'scroll',
          height: 40,
          textStyle: {
            color: '#fff'
          },
          pageIconColor: '#fff',
          pageIconInactiveColor: '#d94e5d',
          pageTextStyle: '#fff',
          pageIcons: {
            // horizontal: ['M2,0L12,-11L12,10z', 'M2,0L-12,-11L-12,10z']
          },
          // height:120,
          // itemWidth:8,
          // itemHeight:8,
          // itemGap:10,
          // textStyle:{
          //   fontSize:10
          // },
          data: this.city
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: {show: true},
        //     dataView: {show: true, readOnly: false},
        //     magicType: {
        //       show: true,
        //       type: ['pie', 'funnel']
        //     },
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        calculable: true,
        series: [
          {
            name: '订单数',
            type: 'pie',
            // radius: [20, 110],
            // center: ['50%', '40%'],
            roseType: 'radius',
            // animationEasing: 'cubicOut',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            // tooltip: {
            //   textStyle: {
            //     color: '#fff'
            //   },
            // },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.ForOrder
          }
          // ,
          // {
          //   name: '面积模式',
          //   type: 'pie',
          //   radius: [30, 110],
          //   center: ['75%', '50%'],
          //   roseType: 'area',
          //   data: [
          //     {value:10, name: 'rose1'},
          //     {value:5, name: 'rose2'},
          //     {value:15, name: 'rose3'},
          //     {value:25, name: 'rose4'},
          //     {value:20, name: 'rose5'},
          //     {value:35, name: 'rose6'},
          //     {value:30, name: 'rose7'},
          //     {value:40, name: 'rose8'}
          //   ]
          // }
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

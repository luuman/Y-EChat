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
          data: ['安徽省', '北京市', '福建省', '甘肃省', '广东省', '广西壮族自治区', '贵州省', '海南省', '河北省', '河南省', '黑龙江省', '湖北省', '吉林省', '江苏省', '江西省', '辽宁省', '内蒙古自治区', '青海省', '山东省', '山西省', '陕西省', '上海市', '四川省', '天津市', '浙江省', '重庆市']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
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
            data: [
              {
                value: 27,
                name: '安徽省'
              },
              {
                value: 695,
                name: '北京市'
              },
              {
                value: 361,
                name: '福建省'
              },
              {
                value: 176,
                name: '甘肃省'
              },
              {
                value: 749,
                name: '广东省'
              },
              {
                value: 61,
                name: '广西壮族自治区'
              },
              {
                value: 7,
                name: '贵州省'
              },
              {
                value: 40,
                name: '海南省'
              },
              {
                value: 1812,
                name: '河北省'
              },
              {
                value: 3191,
                name: '河南省'
              },
              {
                value: 350,
                name: '黑龙江省'
              },
              {
                value: 160,
                name: '湖北省'
              },
              {
                value: 4,
                name: '吉林省'
              },
              {
                value: 680,
                name: '江苏省'
              },
              {
                value: 259,
                name: '江西省'
              },
              {
                value: 162,
                name: '辽宁省'
              },
              {
                value: 70,
                name: '内蒙古自治区'
              },
              {
                value: 1,
                name: '青海省'
              },
              {
                value: 3165,
                name: '山东省'
              },
              {
                value: 3810,
                name: '山西省'
              },
              {
                value: 206,
                name: '陕西省'
              },
              {
                value: 67,
                name: '上海市'
              },
              {
                value: 115,
                name: '四川省'
              },
              {
                value: 486,
                name: '天津市'
              },
              {
                value: 197,
                name: '浙江省'
              },
              {
                value: 24,
                name: '重庆市'
              }
            ]
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

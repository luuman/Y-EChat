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
      // var name_title = '投票统计'
      // var subname = '气泡是对应的参与人数'
      var nameColor = '#fff'
      var nameFontFamily = '楷体'
      var nameFontSize = 52
      var mapName = 'china'
      var geoCoordMap = {}
      // var toolTipData = []
      var sum = 0
      var max = 0
      var data = [
        {
          num: 250,
          value: 318630,
          name: '安徽'
        },
        {
          num: 2354,
          value: 10015673.53,
          name: '北京'
        },
        {
          num: 1210,
          value: 6525695,
          name: '福建'
        },
        {
          num: 753,
          value: 1552766.68,
          name: '甘肃'
        },
        {
          num: 5158,
          value: 7648394.580000002,
          name: '广东'
        },
        {
          num: 690,
          value: 1161176,
          name: '广西'
        },
        {
          num: 48,
          value: 102151,
          name: '贵州'
        },
        {
          num: 786,
          value: 1105081,
          name: '海南'
        },
        {
          num: 10505,
          value: 15881133.72,
          name: '河北'
        },
        {
          num: 25254,
          value: 19303646.48,
          name: '河南'
        },
        {
          num: 2330,
          value: 6946765,
          name: '黑龙江'
        },
        {
          num: 642,
          value: 107261.68999999997,
          name: '湖北'
        },
        {
          num: 20,
          value: 479482,
          name: '吉林'
        },
        {
          num: 6422,
          value: 14788416.4,
          name: '江苏'
        },
        {
          num: 3965,
          value: 11207160,
          name: '江西'
        },
        {
          num: 762,
          value: 1712556,
          name: '辽宁'
        },
        {
          num: 211,
          value: 617230.15,
          name: '内蒙古'
        },
        {
          num: 2,
          value: 7000,
          name: '青海'
        },
        {
          num: 17376,
          value: 39107755.550000004,
          name: '山东'
        },
        {
          num: 16499,
          value: 18810575.359999996,
          name: '山西'
        },
        {
          num: 1064,
          value: 1812741,
          name: '陕西'
        },
        {
          num: 607,
          value: 551822.0999999997,
          name: '上海'
        },
        {
          num: 854,
          value: 1451012,
          name: '四川'
        },
        {
          num: 1939,
          value: 4109312,
          name: '天津'
        },
        {
          num: 2980,
          value: 5957535.75,
          name: '浙江'
        },
        {
          num: 66,
          value: 22324,
          name: '重庆'
        }
      ]
      data.forEach(function (v) {
        sum = sum + v.value
        if (max < v.num) {
          max = v.num
        }
      })
      function randomDatas (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: data[i].num || 0
            })
          }
        }
        console.log(res)
        return res
      }
      var mapFeatures = echarts.getMap(mapName).geoJson.features
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
        data.push({
          name: name,
          value: 0
        })
      })
      myChart.setOption({
        series: [{
          type: 'map',
          map: 'china'
        }]
      })
      var convertData = function (data) {
        console.log(data)
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value || 0)
            })
          }
        }
        console.log(res)
        return res
      }

      var option = {
        title: {
          text: '地图分布',
          // subtext: '中国的八大区分布',
          sublink: '#',
          itemGap: 30,
          left: 'center',
          // textStyle: {
          //   color: '#1a1b4e',
          //   fontStyle: 'normal',
          //   fontWeight: 'bold',
          //   fontSize: 30
          // },
          // subtextStyle: {
          //   color: '#58d9df',
          //   fontStyle: 'normal',
          //   fontWeight: 'bold',
          //   fontSize: 16
          // },
          textStyle: {
            color: nameColor,
            fontFamily: nameFontFamily,
            fontSize: nameFontSize
          }
        },
        backgroundColor: '#223b4d',
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: max,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#e6e6e6', '#b583c2', '#9e63ad', '#884897']
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        geo: {
          map: 'china',
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              color: '#c1c4c8'
            },
            emphasis: {
              show: false,
              color: '#292929'
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: '营业额',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            // symbolSize: 10,
            // showEffectOn: 'render',
            // rippleEffect: {
            //   brushType: 'stroke'
            // },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                var rem = params.value + ''
                var a = rem.split(',')[2]
                a = params.name + '<br>营业额:' + a
                return a
              }
            },
            itemStyle: {
              normal: {
                // 标志颜色
                color: '#F62157'
              }
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            symbolSize: function (val) {
              if (val[2] === 0) return 0
              return 5 + (val[2] / sum) * 100
            }
          },
          {
            name: '出游人数',
            type: 'map',
            // mapType: 'china',
            geoIndex: 0,
            coordinateSystem: 'geo',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: '#FFF'
              }
            },
            data: randomDatas(data)
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

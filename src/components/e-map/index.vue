<template>
  <div id='line' style='width: 100%;height:600px;'></div>
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
      citys: {
        type: Array,
        default: []
      }
    },
    mounted () {
      var myChart = echarts.init(document.getElementById('line'), 'dark')
      // var name_title = '投票统计'
      // var subname = '气泡是对应的参与人数'
      var nameColor = '#fff'
      var nameFontFamily = '楷体'
      // var nameFontSize = 52
      var mapName = 'china'
      var geoCoordMap = {}
      // var toolTipData = []
      var sum = 0
      var max = 0
      var data = this.citys
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
        return res
      }
      var mapFeatures = echarts.getMap(mapName).geoJson.features
      mapFeatures.forEach(function (v) {
        console.log(v)
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
            fontFamily: nameFontFamily
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

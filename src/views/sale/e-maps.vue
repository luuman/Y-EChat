<template>
  <div>
    <eLine :people="people" :rebate="rebate" :business="business" :times="times"></eLine>
  </div>
</template>
<script>
  import eLine from 'COMPONENT/e-map'
  import API from 'API'
  export default {
    components: {
      eLine
    },
    data () {
      return {
        people: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        rebate: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 682.2, 48.7, 18.8, 6.0, 2.3],
        business: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        times: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        time: new Date().getFullYear() - 1
      }
    },
    mounted () {
      API.GpProvince(this.time, '', '').then(res => {
        if (res.flag === 20000) {
          console.log(res.data.reportList)
          res.data.reportList.forEach((v) => {
            if (v.provinceName === null) {
              v.provinceName = '全部'
            }
            this.date.push(v.provinceName)
            this.people.push(v.peopleTotal)
            this.rebate.push(v.rebateTotal)
            this.business.push(v.turnoverTotal)
          })
          console.log(this.time)
        }
      }, (err) => {
        console.log(err)
      })
    },
    watch: {
    },
    methods: {},
    filters: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
</style>

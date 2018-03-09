<template>
  <div>
    <eLine v-if="people.length" :people="people" :rebate="rebate" :business="business" :time="time" :date="date"></eLine>
  </div>
</template>
<script>
  import eLine from 'COMPONENT/e-bar'
  import API from 'API'
  export default {
    components: {
      eLine
    },
    data () {
      return {
        people: [],
        rebate: [],
        business: [],
        date: [],
        time: new Date().getFullYear() - 1
      }
    },
    mounted () {
      API.GpProvince(new Date().getFullYear() - 1, '', '').then(res => {
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

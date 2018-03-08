<template>
  <div>
    <eLine v-if="city.length" :city="city" :ForOrder="ForOrder"></eLine>
  </div>
</template>
<script>
  import eLine from 'COMPONENT/e-sector'
  import API from 'API'
  export default {
    components: {
      eLine
    },
    data () {
      return {
        city: [],
        ForOrder: []
      }
    },
    mounted () {
      API.queryForOrderCount('').then(res => {
        if (res.flag === 20000) {
          console.log(res.data.reportList)
          res.data.reportList.forEach((v) => {
            this.city.push(v.provinceName)
            this.ForOrder.push({
              value: v.orderQuantity,
              name: v.provinceName
            })
          })
          console.log(this.ForOrder)
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

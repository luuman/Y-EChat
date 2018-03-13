<template>
  <div>
    <eLine v-if="people.length" :citys="people"></eLine>
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
        people: [],
        times: new Date().getFullYear() - 1
      }
    },
    mounted () {
      API.GpProvince('', '', '').then(res => {
        if (res.flag === 20000) {
          console.log(res.data.reportList)
          res.data.reportList.forEach((v) => {
            if (v.provinceName === null) {
              return
            }
            this.people.push({
              num: v.peopleTotal,
              value: v.turnoverTotal,
              name: v.provinceName.replace(/[市|省|自治区|壮族治区]/, '')
            })
          })
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

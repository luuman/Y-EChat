<template>
  <div>
    <eLine v-if="people.length" :people="people" :rebate="rebate" :business="business" :time="time"></eLine>
    <div class="more">
      <p>摘要：1.截至目前，盈科旅游下属分公司<span>{{list.company}}</span>家，营业部<span>{{list.department}}</span>家，计{{list.companyDepartment}}家。其中<span>{{list.onlineDepartment}}</span>家营业部分公司产生线上业务。</p>
      <p>2. 自2016年以来盈科旅游线上平台总体营业额<span>{{list.turnover}}</span>元，总体返佣<span>{{list.rebate}}</span>元。</p>
      <p>3. 近三年出行人次计<span>{{list.peopleNumber}}</span>，其中2016年<span>{{list.peopleNumber2016}}</span>人次，2017年<span>{{list.peopleNumber2017}}</span>人次，2018年<span>{{list.peopleNumber2018}}</span>人次（截止{{new Date().getMonth()}}月{{new Date().getDate()}}日）。</p>
    </div>
  </div>
</template>
<script>
  import eLine from 'COMPONENT/e-line'
  import API from 'API'
  export default {
    components: {
      eLine
    },
    data () {
      return {
        list: [1232, 7793, 12323, 12321, 432324, 434322],
        people: [],
        rebate: [],
        business: [],
        time: []
      }
    },
    mounted () {
      API.queryForAbstract().then(res => {
        this.list = res.data.data
      }, (err) => {
        console.log(err)
      })
      API.AllGpMonth().then(res => {
        if (res.flag === 20000) {
          console.log(res.data.reportList)
          res.data.reportList.forEach((v) => {
            this.time.push(v.theMonth)
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
  .more{
    width: size(341);
    background-color: rgba(255, 255, 255, 0.08);
    padding: size(18);
    box-sizing: border-box;
    margin: auto;
    margin-bottom: size(40);
    p{
      @include font-size(14px);
      line-height: 1.71;
      text-align: left;
      color: #8f9897;
      opacity: 1;
    }
    span{
      color: #ff7e00;
    }
  }
</style>

<template>
  <div>
    <eLine v-if="people.length" :people="people" :rebate="rebate" :business="business" :time="time"></eLine>
    <div class="more">
      <p>摘要：1.截至目前，盈科旅游下属分公司<span>{{list[0]}}</span>家，营业部<span>{{list[1]}}</span>家，其中<span>{{list[3]}}</span>家营业部分公司产生线上业务。</p>
      <p>2.截至目前，盈科旅游下属分公司<span>{{list[4]}}</span>家，营业部<span>{{list[5]}}</span>家，其中<span>{{list[6]}}</span>家营业部分公司产生线上业务。</p>
      <p>2. 自2016年以来盈科旅游线上平台总体营业额184037493元，总体返佣17626172元。</p>
      <p>3. 近三年出行人次计107829，其中2016年2385人次，2017年101349人次，2018年4095人次（截止2月9日）。</p>
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

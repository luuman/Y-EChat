<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div class="top" @click="_onHide">每日签到</div>
      <div class="sign">
        <ul><li :class="{s0: signs === 0, s1: signs === 1, s2: signs === 1 && key+1 <= signNum, sings: key+1 <= signNum}" v-for="(signs, key) in sign"></li></ul>
      </div>
      <div class="join" @click="Sign" v-if="isSign === 0">签到</div>
      <div class="join" @click="_onHide" v-if="isSign === 1">关闭</div>
      <!-- <div class="footer"></div> -->
      <!-- <div @click="_onHide" class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  import API from 'API'
  import {setLocal, getLocal} from 'UTIL/tool'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
      signNum: Number,
      isSign: Number,
      maskTransition: {
        type: String,
        default: 'vue-mask'
      },
      dialogTransition: {
        type: String,
        default: 'vue-dialog'
      }
    },
    mounted () {
    },
    data: () => ({
      sign: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      // signNum: 12,
      showValue: false
    }),
    watch: {
      value (val) {
        this.showValue = val
      },
      showValue (val) {
        this.$emit('input', val)
      },
      buttons (val) {
        if (!val.length) {
          this.activate()
          console.log('activate')
        }
      }
    },
    computed: {
    },
    methods: {
      activate: function () {
        // let self = this
        if (!this.buttons || !this.buttons.length) {
          setTimeout(() => {
            this.showValue = false
            // this._deferred.resolve()
          }, ANIMATION_TIME + Number(this.remindDuration))
        }
        // return this._deferred.promise
      },
      _onHide () {
        this.showValue = false
      },
      Luck () {
        let userId = getLocal('noLign')
        API.LuckDraw(userId, 5, 0).then((res) => {})
      },
      Sign () {
        API.Sign().then((res) => {
          if (res.flag === 20000) {
            // this.showValue = false
            this.$parent.Sign.isSign = 1
            this.$parent.Sign.signcount = this.signNum + 1
            let sign = JSON.parse(getLocal('noSign'))
            sign.isSign = 1
            sign.signcount++
            if (sign.signcount === 8 || sign.signcount === 26) {
              console.log('8')
              // this.VoteValue = true
              this.$parent.VoteInfo = true
              // this.Luck()
            }
            setLocal('noSign', sign)
          } else if (res.flag === 26000) {
            console.log('26000')
            this.$parent.types = 2
            this.$parent.ruleValue = true
          }
        }, (res) => {})
      }
    },
    created () {
      if (typeof this.value !== 'undefined') {
        this.showValue = this.value
      }
    },
    components: {VDialog}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/scss/mixin.scss';
  .vue-popout{
    // border-radius: size(6);
    // box-shadow: 0 size(3) 0 0 #bfbfbf;
    padding-bottom: size(40);
    border: size(1) solid #2196d3;
    box-shadow: 0 0 size(10) size(1) #2196d3;
    .top{
      height: size(32);
      color: #FFF;
      @include font-size(20px);
      line-height: size(32);
      background: url(../../assets/img/top-title.png) no-repeat;
      background-size: 100%;
    }
    .sign{
      height: size(150);
      width: size(200);
      margin: size(40) auto;
      background: url(../../assets/img/sign_bg.png) center no-repeat;
      background-size: 100%;
      overflow: hidden;
      ul{
        .s0{
          background-image: url(../../assets/img/sign.png);
          background-size: size(16);
        }
        .sings{
          background-image: url(../../assets/img/sign0.png);
        }
        .s1{
          background-image: url(../../assets/img/sign1.png);
          background-size: size(40);
        }
        .s2{
          background-image: url(../../assets/img/sign2.png);
          background-size: size(40);
        }
        li{
          background-position: center;
          background-size: size(20);
          background-repeat: no-repeat;
          display: block;
          // float: left;
          width: size(30);
          height: size(30);
          // border: 1px solid #aaa;
          &:nth-child(12n+1), &:nth-child(12n+2), &:nth-child(12n+3), &:nth-child(12n+4), &:nth-child(12n+5), &:nth-child(12n+6){
            float: left;
          }
          &:nth-child(12n+7), &:nth-child(12n+8), &:nth-child(12n+9), &:nth-child(12n+10), &:nth-child(12n+11), &:nth-child(12n+12){
            float: right;
          }
          // &:nth-child(6n), &:nth-child(6n-1), &:nth-child(6n-2), &:nth-child(6n-3), &:nth-child(6n-4), &:nth-child(6n-5){
          //   float: right;
          // }
          // &:nth-child(6n+1), &:nth-child(6n+2), &:nth-child(6n+3), &:nth-child(6n+4), &:nth-child(6n+5), &:nth-child(6n+6){
          //   float: left;
          // }
        }
      }
    }
    .join{
      width: size(140);
    }
    .footer{
      background: #0f75e1;
      height: size(10);
      border-radius: 0 0 size(6) size(6);
    }
  }
</style>

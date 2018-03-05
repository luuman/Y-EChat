<template>
  <VDialog class="vue-alert" v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
    <div class="vue-popout">
      <div class="top" @click="_onHide">竞猜规则</div>
      <div class="main">
        <h1>魅力中国城<br>三重<span>惊喜大奖</span>等你拿</h1>
        <ul>
          <li><span>① 竞猜抽奖</span>赛程共分26期，活动参与者有26次竞猜机会，每次竞猜成功均有一次抽奖机会，并获得城市卡一张。活动参与者可根据活动规则收集后悔药，竞猜失败可以使用后悔药，亦享有抽奖机会，并获得城市卡。</li>
          <li><span>② 集卡抽奖</span>竞猜成功和使用后悔药均可获得城市卡片，每当城市卡片收集至6张、16张、26张，对应有不同等级的惊喜奖品等你来抽取！</li>
          <li><span>③ 签到有惊喜</span>活动参与者可参与每日签到活动，累积签到次数达到8次和23次，均可获得抽取惊喜奖品的机会。</li>
        </ul>
        <h1>免责声明</h1>
        <ul>
          <li>① 严厉禁止一切作弊行为，对于恶意参与者，盈科旅游有权取消其奖励资格，并保留追究其法律责任的权利。</li>
          <li>② 如果出现因网络传输故障等非人力可控导致的信息延迟或错误，盈科旅游不承担任何责任。</li>
          <li>③ 如遇不可抗力因素，或者活动和国家法律法规冲突，一切以法律为上。若导致本次活动因故无法进行时，盈科旅游有权决定取消、终止、修改或暂停本活动。</li>
          <li>④ 本次活动参与者应仔细阅读本声明，一旦参与此活动，即被视为对本声明全部内容认可和接受。</li>
          <li>⑤ 如果活动奖品与国家法律、法规产生冲突，则一切以国家法律为准。</li>
          <li>⑥ 本活动的解释权在法律规定的范围内归盈科旅游所有。</li>
        </ul>
      </div>
      <!-- <div class="footer"></div> -->
      <!-- <div @click="_onHide" class="close"></div> -->
    </div>
  </VDialog>
</template>
<script>
  import VDialog from 'COMPONENT/v-dialog/luck'
  const ANIMATION_TIME = 800
  export default {
    props: {
      value: Boolean,
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
    .main{
      height: size(300);
      overflow: scroll;
      padding: 0 size(20);
      h1{
        @include font-size(14px);
        line-height: size(20);
        font-weight: bold;
        color: #FFF;
        padding-top: size(10);
        span{
          font-weight: bold;
          color: #ffe374;
          @include font-size(12px);
        }
      }
      li{
        @include font-size(10px);
        color: #FFF;
        line-height: size(16);
        padding-top: size(10);
        text-align: left;
        span{
          font-weight: bold;
          color: #ffe374;
          @include font-size(12px);
          display: block;
        }
      }
    }
    .footer{
      background: #0f75e1;
      height: size(10);
      border-radius: 0 0 size(6) size(6);
    }
  }
</style>
